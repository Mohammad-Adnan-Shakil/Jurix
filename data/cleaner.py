import json
import os
import re
from bs4 import BeautifulSoup

INPUT_DIR = "data/raw"
OUTPUT_DIR = "data/cleaned"
os.makedirs(OUTPUT_DIR, exist_ok=True)


def clean_text(text: str) -> str:
    # Remove equivalent citations block at top
    text = re.sub(r'Equivalent citations:.*?\n', '', text, flags=re.IGNORECASE)

    # Remove bench/author lines
    text = re.sub(r'^(Bench|Author|Coram):.*$', '', text, flags=re.MULTILINE | re.IGNORECASE)

    # Remove "Act Referred" and "Case Referred" sections
    text = re.sub(r'(Acts Referred|Cases Referred|Acts and Sections).*?(?=\n[A-Z])', '', text, flags=re.DOTALL | re.IGNORECASE)

    # Remove signature lines like "....J" or "Sd/-"
    text = re.sub(r'\.{3,}J\.?.*$', '', text, flags=re.MULTILINE)
    text = re.sub(r'Sd\/\-.*$', '', text, flags=re.MULTILINE)

    # Remove lines that are just dates, page numbers, or very short
    lines = text.split('\n')
    cleaned_lines = []
    for line in lines:
        stripped = line.strip()
        # Skip empty, too short, or pure number lines
        if len(stripped) < 20:
            continue
        # Skip lines that are just citation references like "[1]", "(2019)"
        if re.match(r'^[\[\(]\d+[\]\)]\.?$', stripped):
            continue
        cleaned_lines.append(stripped)

    text = '\n'.join(cleaned_lines)

    # Collapse multiple blank lines
    text = re.sub(r'\n{3,}', '\n\n', text)

    return text.strip()


def is_valid(text: str) -> bool:
    # Must be at least 1000 chars after cleaning
    if len(text) < 1000:
        return False
    # Must contain at least one legal keyword
    legal_keywords = ['held', 'court', 'appeal', 'petition',
                      'judgment', 'section', 'article', 'act']
    text_lower = text.lower()
    return any(kw in text_lower for kw in legal_keywords)


def chunk_text(text: str, max_chars: int = 3000) -> list[str]:
    """
    Split long judgements into chunks of ~3000 chars.
    Split on single or double newlines.
    """
    # Split on any newline sequence
    paragraphs = re.split(r'\n+', text)
    chunks = []
    current = []
    current_len = 0

    for para in paragraphs:
        para = para.strip()
        if not para:
            continue
        para_len = len(para)
        if current_len + para_len > max_chars and current:
            chunks.append('\n'.join(current))
            current = [para]
            current_len = para_len
        else:
            current.append(para)
            current_len += para_len

    if current:
        chunks.append('\n'.join(current))

    return [c for c in chunks if len(c) > 200]


def run_cleaner():
    files = [f for f in os.listdir(INPUT_DIR) if f.endswith('.json')]
    print(f"\n[Jurix Cleaner] Processing {len(files)} raw judgements\n")

    saved = 0
    skipped = 0

    for fname in files:
        in_path = os.path.join(INPUT_DIR, fname)

        with open(in_path, 'r', encoding='utf-8') as f:
            doc = json.load(f)

        raw_text = doc.get('text', '')
        cleaned = clean_text(raw_text)

        if not is_valid(cleaned):
            print(f"  [!] Skipping {fname} — failed validation")
            skipped += 1
            continue

        chunks = chunk_text(cleaned)

        output = {
            "tid": doc["tid"],
            "title": doc["title"],
            "citation": doc["citation"],
            "publishdate": doc["publishdate"],
            "docsource": doc["docsource"],
            "author": doc["author"],
            "url": doc["url"],
            "chunks": chunks,
            "num_chunks": len(chunks)
        }

        out_path = os.path.join(OUTPUT_DIR, fname)
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False, indent=2)

        saved += 1
        print(f"  [✓] {doc['title'][:55]} → {len(chunks)} chunks")

    print(f"\n[Done] {saved} cleaned | {skipped} skipped → data/cleaned/")


if __name__ == "__main__":
    run_cleaner()