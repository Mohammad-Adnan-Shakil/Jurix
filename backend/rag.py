import psycopg2
import os
import requests
from fastembed import TextEmbedding
from dotenv import load_dotenv

load_dotenv()

EMBEDDING_MODEL = "BAAI/bge-small-en-v1.5"
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
LLM_MODEL = "openrouter/auto"

_embedder = None

def get_embedder():
    global _embedder
    if _embedder is None:
        _embedder = TextEmbedding(EMBEDDING_MODEL)
    return _embedder


def retrieve(query: str, top_k: int = 5) -> list[dict]:
    embedder = get_embedder()
    query_embedding = list(embedder.embed([query]))[0].tolist()

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
                    "content": "You are Jurix, an Indian legal AI assistant. Rules: (1) Answer in 3-5 sentences maximum. (2) Start your response with the actual legal answer immediately — no preamble, no thinking out loud, no meta-commentary. (3) Never say 'The user is asking', 'I need to', 'Let me', 'Looking at', 'Based on the provided'. (4) Cite sources inline as [1], [2]. (5) If context is insufficient, state the legal principle from your knowledge directly."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "max_tokens": 350,
            "temperature": 0.1
        },
        timeout=60
    )


    data = response.json()


    if "error" in data:
        return f"Error: {data['error'].get('message', 'Unknown error')}"


    if "choices" not in data:
        return f"Unexpected response from model."


    content = data["choices"][0]["message"]["content"].strip()


    # Aggressively strip chain-of-thought leakage
    leak_phrases = [
        "The user is asking",
        "I need to answer",
        "Let me examine",
        "Let me check",
        "Looking at the provided",
        "Based on the provided",
        "I need to work",
        "Since the text",
    ]


    for phrase in leak_phrases:
        if phrase.lower() in content[:200].lower():
            # Find first real sentence starting with a legal statement
            legal_starters = [
                "The Supreme Court",
                "In Maneka Gandhi",
                "Article ",
                "The Court held",
                "Under ",
                "Section ",
                "This case",
                "The right",
                "According to",
                "It was held",
            ]
            for starter in legal_starters:
                idx = content.find(starter)
                if 0 < idx < 600:
                    content = content[idx:]
                    break
            break


    return content


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