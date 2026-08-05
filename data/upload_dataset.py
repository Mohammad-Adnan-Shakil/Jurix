from datasets import load_dataset
from huggingface_hub import login
from dotenv import load_dotenv
import os

load_dotenv()
login(token=os.getenv('HF_TOKEN'))

dataset = load_dataset('json', data_files='data/dataset/jurix_instructions_filled.jsonl')
dataset = dataset['train'].train_test_split(test_size=0.1, seed=42)

print(f"Train: {len(dataset['train'])} | Val: {len(dataset['test'])}")

dataset.push_to_hub('adnshkl/jurix-legal-instruct')
print('Pushed to Hub successfully')
print('Dataset at: https://huggingface.co/datasets/adnshkl/jurix-legal-instruct')