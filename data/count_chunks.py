import json, os

total_chunks = 0
for fname in os.listdir('data/cleaned'):
    with open(f'data/cleaned/{fname}', encoding='utf-8') as f:
        d = json.load(f)
    total_chunks += d['num_chunks']
    print(f"{d['num_chunks']:>4} chunks — {d['title'][:55]}")

print(f"\nTotal chunks across 50 judgements: {total_chunks}")