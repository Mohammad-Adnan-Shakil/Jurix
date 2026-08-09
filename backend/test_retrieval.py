import psycopg2
import os
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

load_dotenv()

MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"

def retrieve(query: str, top_k: int = 5):
    model = SentenceTransformer(MODEL_NAME)
    query_embedding = model.encode(query).tolist()

    conn = psycopg2.connect(os.getenv("NEON_DATABASE_URL"))
    cur = conn.cursor()

    cur.execute("""
        SELECT title, citation, chunk_text, url,
               1 - (embedding <=> %s::vector) AS similarity
        FROM judgement_chunks
        ORDER BY embedding <=> %s::vector
        LIMIT %s
    """, (query_embedding, query_embedding, top_k))

    results = cur.fetchall()
    cur.close()
    conn.close()
    return results

if __name__ == "__main__":
    query = "What is the right to personal liberty under Article 21?"
    print(f"Query: {query}\n")
    print("=" * 60)

    results = retrieve(query)

    for i, (title, citation, chunk_text, url, similarity) in enumerate(results):
        print(f"\n[{i+1}] Similarity: {similarity:.4f}")
        print(f"Case: {title}")
        print(f"Citation: {citation}")
        print(f"URL: {url}")
        print(f"Excerpt: {chunk_text[:200]}...")
        print("-" * 60)