import json
import os
import requests
from dotenv import load_dotenv
from tqdm import tqdm

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free"

INPUT_FILE = "data/dataset/jurix_instructions.jsonl"
OUTPUT_FILE = "data/dataset/jurix_instructions_filled.jsonl"
SAMPLE_SIZE = 50


def extract_user_prompt(chatml_text: str) -> str:
    try:
        return chatml_text.split("<|im_start|>user")[1].split("<|im_end|>")[0].strip()
    except:
        return ""


def generate_output(user_prompt: str) -> str:
    try:
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
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a legal expert specializing in Indian law. Provide accurate, concise responses based on the legal text provided. Be direct and factual. 2-4 sentences maximum."
                    },
                    {
                        "role": "user",
                        "content": user_prompt
                    }
                ],
                "max_tokens": 300,
                "temperature": 0.3
            },
            timeout=30
        )

        if response.status_code != 200:
            print(f"  [!] HTTP {response.status_code}: {response.text[:100]}")
            return None

        return response.json()["choices"][0]["message"]["content"].strip()

    except Exception as e:
        print(f"  [!] Error: {e}")
        return None


def build_chatml(user_prompt: str, assistant_output: str) -> str:
    return f"""<|im_start|>system
You are Jurix, a legal assistant specializing in Indian law. Answer accurately based on the provided legal text.
<|im_end|>
<|im_start|>user
{user_prompt}
<|im_end|>
<|im_start|>assistant
{assistant_output}
<|im_end|>"""


def run_generation():
    with open(INPUT_FILE, encoding='utf-8') as f:
        all_pairs = [json.loads(line) for line in f]

    print(f"\n[Jurix Output Generator]")
    print(f"Total pairs available: {len(all_pairs)}")
    print(f"Generating outputs for: {SAMPLE_SIZE} pairs")
    print(f"Model: {MODEL}\n")

    sample = all_pairs[:SAMPLE_SIZE]
    filled = []
    failed = 0

    for pair in tqdm(sample, desc="Generating"):
        user_prompt = extract_user_prompt(pair["text"])

        if not user_prompt:
            failed += 1
            continue

        output = generate_output(user_prompt)

        if not output:
            failed += 1
            continue

        filled.append({"text": build_chatml(user_prompt, output)})

    with open(OUTPUT_FILE, 'a', encoding='utf-8') as f:
        for pair in filled:
            f.write(json.dumps(pair, ensure_ascii=False) + '\n')

    print(f"\n[Done]")
    print(f"Successfully filled: {len(filled)}")
    print(f"Failed: {failed}")
    print(f"Saved to: {OUTPUT_FILE}")


if __name__ == "__main__":
    run_generation()