import psycopg2
import os
import json
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
from tqdm import tqdm

load_dotenv()

CLEANED_DIR = "data/cleaned"
MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"  # 384-dim, fast, good quality

def setup_table(conn):
    cur = conn.cursor()
    cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")
    cur.execute("""
        CREATE TABLE IF NOT EXISTS judgement_chunks (
            id SERIAL PRIMARY KEY,
            tid TEXT NOT NULL,
            title TEXT,
            citation TEXT,
            publishdate TEXT,
            docsource TEXT,
            url TEXT,
            chunk_index INTEGER,
            chunk_text TEXT,
            embedding vector(384)
        );
    """)
    cur.execute("""
        CREATE INDEX IF NOT EXISTS judgement_chunks_embedding_idx
        ON judgement_chunks
        USING ivfflat (embedding vector_cosine_ops)
        WITH (lists = 50);
    """)
    conn.commit()
    cur.close()
    print("[✓] Table and index ready")


def already_embedded(conn, tid):
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM judgement_chunks WHERE tid = %s", (tid,))
    count = cur.fetchone()[0]
    cur.close()
    return count > 0


def embed_and_store(conn, model):
    files = [f for f in os.listdir(CLEANED_DIR) if f.endswith('.json')]
    print(f"\n[Jurix Embedder] Processing {len(files)} judgements\n")

    total_chunks = 0

    for fname in tqdm(files, desc="Embedding"):
        with open(f"{CLEANED_DIR}/{fname}", encoding='utf-8') as f:
            doc = json.load(f)

        tid = doc["tid"]

        # Skip if already embedded
        if already_embedded(conn, tid):
            continue

        chunks = doc["chunks"]
        if not chunks:
            continue

        # Embed all chunks for this document at once (batched)
        embeddings = model.encode(chunks, batch_size=32, show_progress_bar=False)

        cur = conn.cursor()
        for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            cur.execute("""
                INSERT INTO judgement_chunks
                (tid, title, citation, publishdate, docsource, url, chunk_index, chunk_text, embedding)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                tid,
                doc.get("title", ""),
                doc.get("citation", ""),
                doc.get("publishdate", ""),
                doc.get("docsource", ""),
                doc.get("url", ""),
                i,
                chunk,
                embedding.tolist()
            ))

        conn.commit()
        cur.close()
        total_chunks += len(chunks)

    print(f"\n[Done] Embedded {total_chunks} chunks → Neon pgvector")


def main():
    print("Loading embedding model...")
    model = SentenceTransformer(MODEL_NAME)
    print(f"[✓] Model loaded: {MODEL_NAME}")

    conn = psycopg2.connect(os.getenv("NEON_DATABASE_URL"))
    setup_table(conn)
    embed_and_store(conn, model)
    conn.close()


if __name__ == "__main__":
    main()