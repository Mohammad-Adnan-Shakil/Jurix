import psycopg2
import os
import requests
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

load_dotenv()

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
LLM_MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free"

_embedder = None

def get_embedder():
    global _embedder
    if _embedder is None:
        _embedder = SentenceTransformer(EMBEDDING_MODEL)
    return _embedder


def retrieve(query: str, top_k: int = 5) -> list[dict]:
    embedder = get_embedder()
    query_embedding = embedder.encode(query).tolist()

    conn = psycopg2.connect(os.getenv("NEON_DATABASE_URL"))
    cur = conn.cursor()

    # Fetch more results then deduplicate by document
    cur.execute("""
        SELECT title, citation, chunk_text, url,
               1 - (embedding <=> %s::vector) AS similarity
        FROM judgement_chunks
        ORDER BY embedding <=> %s::vector
        LIMIT 25
    """, (query_embedding, query_embedding))

    rows = cur.fetchall()
    cur.close()
    conn.close()

    # Deduplicate — max 2 chunks per document
    seen = {}
    results = []
    for row in rows:
        title = row[0]
        count = seen.get(title, 0)
        if count < 2:
            seen[title] = count + 1
            results.append({
                "title": row[0],
                "citation": row[1],
                "chunk_text": row[2],
                "url": row[3],
                "similarity": round(float(row[4]), 4)
            })
        if len(results) >= top_k:
            break

    return results


def build_prompt(query: str, chunks: list[dict]) -> str:
    context = ""
    for i, chunk in enumerate(chunks):
        context += f"[{i+1}] {chunk['title']} ({chunk['citation']})\n"
        context += f"{chunk['chunk_text'][:500]}\n\n"

    return f"""<|im_start|>system
You are Jurix, a legal assistant specializing in Indian law. Answer the user's question based on the provided court judgements. Always cite the relevant case by number [1], [2] etc.
<|im_end|>
<|im_start|>user
Question: {query}

Relevant judgements:
{context}
<|im_end|>
<|im_start|>assistant
"""


def generate(prompt: str) -> str:
    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://github.com/adnshkl/jurix",
            "X-Title": "Jurix Legal AI"
        },
        json={
            "model": LLM_MODEL,
            "messages": [
                {
                    "role": "system",
                    "content": "You are Jurix, an Indian legal assistant. Answer directly and concisely based on the provided judgements. Never show your thinking process. Start your answer immediately with the legal holding or principle. Cite sources as [1], [2] etc."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "max_tokens": 400,
            "temperature": 0.1
        },
        timeout=60
    )

    data = response.json()

    # Handle error responses
    if "error" in data:
        error_msg = data["error"].get("message", "Unknown error")
        return f"LLM unavailable: {error_msg}"

    if "choices" not in data:
        return f"Unexpected response: {data}"

    return data["choices"][0]["message"]["content"].strip()


def answer(query: str) -> dict:
    chunks = retrieve(query, top_k=5)
    prompt = build_prompt(query, chunks)
    response = generate(prompt)

    return {
        "query": query,
        "answer": response,
        "sources": [
            {
                "title": c["title"],
                "citation": c["citation"],
                "url": c["url"],
                "similarity": c["similarity"]
            }
            for c in chunks
        ]
    }


if __name__ == "__main__":
    query = "Article 21 personal liberty passport impoundment procedure"
    print(f"Query: {query}\n")

    result = answer(query)

    print("ANSWER:")
    print(result["answer"])
    print("\nSOURCES:")
    for i, src in enumerate(result["sources"]):
        print(f"[{i+1}] {src['citation']} — {src['title'][:50]}")
        print(f"     {src['url']}")