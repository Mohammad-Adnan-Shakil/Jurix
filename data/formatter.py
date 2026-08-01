import json
import os
import re
from bs4 import BeautifulSoup

INPUT_DIR = "data/cleaned"
OUTPUT_FILE = "data/dataset/jurix_instructions.jsonl"
os.makedirs("data/dataset", exist_ok=True)


def strip_html(text: str) -> str:
    return BeautifulSoup(text, "html.parser").get_text()


def format_chatml(instruction: str, input_text: str, output: str) -> dict:
    return {
        "text": f"""<|im_start|>system
You are Jurix, a legal assistant specializing in Indian law. Answer accurately based on the provided legal text.
<|im_end|>
<|im_start|>user
{instruction}

{input_text}
<|im_end|>
<|im_start|>assistant
{output}
<|im_end|>"""
    }


def generate_pairs(doc: dict) -> list[dict]:
    pairs = []
    title = strip_html(doc["title"])
    citation = doc.get("citation", "")
    chunks = doc["chunks"]

    for i, chunk in enumerate(chunks):
        chunk = strip_html(chunk).strip()
        if len(chunk) < 300:
            continue

        # Task 1 — Summarization (every chunk)
        pairs.append(format_chatml(
            instruction=f"Summarize the following excerpt from {title} ({citation}) in 2-3 sentences.",
            input_text=chunk,
            output=f"[PENDING — GPT-4o generated summary for chunk {i} of {title}]"
        ))

        # Task 2 — Key holding extraction (first 3 chunks only — most likely to have holdings)
        if i < 3:
            pairs.append(format_chatml(
                instruction=f"What is the key legal principle established in this excerpt from {title}?",
                input_text=chunk,
                output=f"[PENDING — GPT-4o generated holding for chunk {i} of {title}]"
            ))

        # Task 3 — Contextual Q&A (every other chunk to avoid redundancy)
        if i % 2 == 0:
            pairs.append(format_chatml(
                instruction=f"Based on this excerpt from {title} ({citation}), what did the court decide or observe?",
                input_text=chunk,
                output=f"[PENDING — GPT-4o generated answer for chunk {i} of {title}]"
            ))

    return pairs


def run_formatter():
    files = [f for f in os.listdir(INPUT_DIR) if f.endswith('.json')]
    print(f"\n[Jurix Formatter] Processing {len(files)} cleaned judgements\n")

    all_pairs = []

    for fname in files:
        with open(f"{INPUT_DIR}/{fname}", encoding='utf-8') as f:
            doc = json.load(f)

        pairs = generate_pairs(doc)
        all_pairs.extend(pairs)
        print(f"  [✓] {strip_html(doc['title'])[:55]} → {len(pairs)} pairs")

    # Write JSONL
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        for pair in all_pairs:
            f.write(json.dumps(pair, ensure_ascii=False) + '\n')

    print(f"\n[Done] {len(all_pairs)} instruction pairs → {OUTPUT_FILE}")
    print(f"Note: outputs are PENDING — next step is GPT-4o generation")


if __name__ == "__main__":
    run_formatter()