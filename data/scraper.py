import requests
import json
import time
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("IK_API_KEY")
BASE_URL = "https://api.indiankanoon.org"
OUTPUT_DIR = "data/raw"
os.makedirs(OUTPUT_DIR, exist_ok=True)

SEARCH_QUERIES = [
    "Article 21 personal liberty doctypes:supremecourt",
    "Article 14 equality before law doctypes:supremecourt",
    "contract act breach of contract doctypes:supremecourt",
    "IPC section 302 murder doctypes:supremecourt",
    "criminal procedure code bail doctypes:supremecourt",
    "fundamental rights constitution doctypes:supremecourt",
    "property law adverse possession doctypes:supremecourt",
    "habeas corpus writ petition doctypes:supremecourt",
    "res judicata civil procedure doctypes:supremecourt",
    "right to privacy constitution doctypes:supremecourt",
]

def search_judgements(query: str, pages: int = 3) -> list[dict]:
    results = []

    for page in range(pages):
        try:
            response = requests.post(
                f"{BASE_URL}/search/",
                data={"formInput": query, "pagenum": page},
                headers={"Authorization": f"Token {API_KEY}"}
            )

            if response.status_code != 200:
                print(f"  [!] Status {response.status_code} on page {page}")
                break

            data = response.json()
            docs = data.get("docs", [])

            if not docs:
                print(f"  [!] No docs on page {page}")
                break

            for doc in docs:
                # Only keep actual judgements, skip laws/statutes
                if doc.get("doctype") == 1000:
                    results.append({
                        "tid": doc["tid"],
                        "title": doc["title"],
                        "citation": doc.get("citation", ""),
                        "publishdate": doc.get("publishdate", ""),
                        "docsource": doc.get("docsource", ""),
                        "author": doc.get("author", ""),
                        "numcitedby": doc.get("numcitedby", 0),
                    })

            print(f"  [+] Page {page} → {len(docs)} docs")
            time.sleep(1)

        except Exception as e:
            print(f"  [!] Error: {e}")
            break

    return results


def fetch_judgement_text(tid: int) -> str | None:
    try:
        response = requests.post(
            f"{BASE_URL}/doc/{tid}/",
            headers={"Authorization": f"Token {API_KEY}"}
        )

        if response.status_code != 200:
            return None

        data = response.json()
        # API returns doc field with full HTML text
        text = data.get("doc", "")

        # Strip HTML tags
        from bs4 import BeautifulSoup
        soup = BeautifulSoup(text, "html.parser")
        return soup.get_text(separator="\n").strip()

    except Exception as e:
        print(f"  [!] Failed to fetch tid {tid}: {e}")
        return None


def run_pipeline(target: int = 100):
    seen_ids = set()
    collected = []

    # Load already saved IDs to resume if interrupted
    for fname in os.listdir(OUTPUT_DIR):
        if fname.endswith(".json"):
            seen_ids.add(fname.replace(".json", ""))

    print(f"\n[Jurix Scraper] Target: {target} | Already saved: {len(seen_ids)}\n")

    for query in SEARCH_QUERIES:
        if len(collected) + len(seen_ids) >= target:
            break

        print(f"[Query] {query}")
        results = search_judgements(query, pages=3)

        # Sort by most cited — higher quality judgements first
        results.sort(key=lambda x: x["numcitedby"], reverse=True)

        for result in results:
            if len(collected) + len(seen_ids) >= target:
                break

            tid = str(result["tid"])

            if tid in seen_ids:
                continue
            seen_ids.add(tid)

            print(f"  Fetching {tid} — {result['title'][:60]}")
            text = fetch_judgement_text(result["tid"])

            if not text or len(text) < 500:
                print(f"  [!] Skipping — too short")
                continue

            judgement = {
                "tid": tid,
                "title": result["title"],
                "citation": result["citation"],
                "publishdate": result["publishdate"],
                "docsource": result["docsource"],
                "author": result["author"],
                "url": f"https://indiankanoon.org/doc/{tid}/",
                "text": text
            }

            collected.append(judgement)

            out_path = os.path.join(OUTPUT_DIR, f"{tid}.json")
            with open(out_path, "w", encoding="utf-8") as f:
                json.dump(judgement, f, ensure_ascii=False, indent=2)

            total = len(collected) + len(seen_ids) - len(collected)
            print(f"  [✓] Saved ({len(collected)}/{target}) — cited by {result['numcitedby']} cases")
            time.sleep(1.5)

    print(f"\n[Done] Collected {len(collected)} new judgements → data/raw/")


if __name__ == "__main__":
    run_pipeline(target=100)