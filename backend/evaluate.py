import json
import os
import requests
from benchmark import BENCHMARK
from rag import retrieve, build_prompt
from dotenv import load_dotenv
from tqdm import tqdm

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free"
RESULTS_FILE = "backend/eval_results.json"


def generate_answer(question: str) -> tuple[str, list[dict]]:
    chunks = retrieve(question, top_k=5)
    prompt = build_prompt(question, chunks)

    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://github.com/adnshkl/jurix",
            "X-Title": "Jurix Legal AI"
        },
        json={
            "model": MODEL,
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 400,
            "temperature": 0.1
        },
        timeout=60
    )

    data = response.json()
    if "choices" not in data:
        return "ERROR: " + str(data.get("error", "Unknown")), chunks

    return data["choices"][0]["message"]["content"].strip(), chunks


def score_faithfulness(answer: str, chunks: list[dict]) -> float:
    """
    Simple faithfulness check — does the answer contain
    information that can be traced back to retrieved chunks?
    """
    if answer.startswith("ERROR"):
        return 0.0

    context = " ".join([c["chunk_text"][:300] for c in chunks]).lower()
    answer_lower = answer.lower()

    # Extract key legal terms from answer
    legal_terms = []
    for word in answer_lower.split():
        if len(word) > 6:
            legal_terms.append(word)

    if not legal_terms:
        return 0.0

    matches = sum(1 for term in legal_terms[:20] if term in context)
    return round(matches / min(len(legal_terms), 20), 4)


def score_relevance(question: str, answer: str) -> float:
    """
    Simple relevance check — does the answer address
    keywords from the question?
    """
    if answer.startswith("ERROR"):
        return 0.0

    question_keywords = [w.lower() for w in question.split() if len(w) > 4]
    answer_lower = answer.lower()

    matches = sum(1 for kw in question_keywords if kw in answer_lower)
    return round(matches / max(len(question_keywords), 1), 4)


def run_evaluation(sample_size: int = 20):
    """
    Run evaluation on first N benchmark questions.
    Start with 20 due to free tier rate limits.
    """
    print(f"\n[Jurix RAGAS Evaluation]")
    print(f"Running on {sample_size} benchmark questions\n")

    # Load existing results to allow resuming
    if os.path.exists(RESULTS_FILE):
        with open(RESULTS_FILE, encoding='utf-8') as f:
            results = json.load(f)
        print(f"Resuming from {len(results)} existing results")
    else:
        results = []

    evaluated_ids = {r["id"] for r in results}
    sample = [q for q in BENCHMARK[:sample_size] if q["id"] not in evaluated_ids]

    for item in tqdm(sample, desc="Evaluating"):
        answer, chunks = generate_answer(item["question"])

        faithfulness = score_faithfulness(answer, chunks)
        relevance = score_relevance(item["question"], answer)

        result = {
            "id": item["id"],
            "category": item["category"],
            "question": item["question"],
            "reference_answer": item["reference_answer"],
            "generated_answer": answer,
            "sources": [{"citation": c["citation"], "title": c["title"]} for c in chunks],
            "faithfulness": faithfulness,
            "answer_relevance": relevance,
        }

        results.append(result)

        # Save after each result so we don't lose progress
        with open(RESULTS_FILE, 'w', encoding='utf-8') as f:
            json.dump(results, f, ensure_ascii=False, indent=2)

    # Compute aggregate scores
    completed = [r for r in results if not r["generated_answer"].startswith("ERROR")]
    failed = len(results) - len(completed)

    avg_faithfulness = sum(r["faithfulness"] for r in completed) / max(len(completed), 1)
    avg_relevance = sum(r["answer_relevance"] for r in completed) / max(len(completed), 1)
    hallucination_rate = round(1 - avg_faithfulness, 4)

    print(f"\n{'='*50}")
    print(f"JURIX EVALUATION RESULTS")
    print(f"{'='*50}")
    print(f"Questions evaluated : {len(completed)}")
    print(f"Failed (API errors) : {failed}")
    print(f"Faithfulness        : {avg_faithfulness:.4f} ({avg_faithfulness*100:.1f}%)")
    print(f"Answer Relevance    : {avg_relevance:.4f} ({avg_relevance*100:.1f}%)")
    print(f"Hallucination Rate  : {hallucination_rate:.4f} ({hallucination_rate*100:.1f}%)")
    print(f"{'='*50}")
    print(f"\nFull results saved to: {RESULTS_FILE}")


if __name__ == "__main__":
    run_evaluation(sample_size=20)