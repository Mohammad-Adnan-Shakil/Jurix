# Jurix — AI Legal Intelligence for Indian Law

A fine-tuned LLM trained on Indian court judgements, combined with RAG retrieval over 20M+ legal documents. Jurix answers Indian legal questions with cited sources — more accurately than a general-purpose model.

## What it does

- **Fine-tuned on Indian legal corpus** — QLoRA fine-tuning on Mistral 7B using 20,000+ instruction pairs derived from Supreme Court and High Court judgements
- **Citation-first answers** — every response references the actual judgement it drew from
- **Measurable improvement** — RAGAS evaluation comparing Jurix vs base Mistral 7B vs GPT-4o on a 50-question Indian legal benchmark
- **RAG + fine-tuning combined** — retrieval over pgvector (Neon) surfaces relevant judgements; fine-tuned model reasons over them in Indian legal style

## Architecture

```
Indian Kanoon API (20M+ judgements)
        ↓
Data pipeline: scrape → clean → chunk → format as ChatML instruction pairs
        ↓
QLoRA fine-tuning on Mistral 7B Instruct v0.3
(r=16, alpha=32, 4-bit quantization via bitsandbytes)
        ↓
jurix-7b-legal (merged weights → HuggingFace Hub)
        ↓
RAG layer: pgvector similarity search (Neon) + sentence-transformers
        ↓
FastAPI backend → React + Tailwind frontend
        ↓
Deployed on Render + Vercel
```

## Stack

| Layer | Technology |
|-------|-----------|
| Base model | Mistral 7B Instruct v0.3 |
| Fine-tuning | QLoRA (PEFT + bitsandbytes + trl SFTTrainer) |
| Vector store | Neon (pgvector) |
| Embeddings | sentence-transformers |
| Backend | FastAPI |
| Frontend | React + Tailwind |
| Deployment | Render (API) + Vercel (UI) |
| Model hosting | HuggingFace Hub — `adnshkl/jurix-7b-legal` |

## Training details

| Parameter | Value |
|-----------|-------|
| Base model | `mistralai/Mistral-7B-Instruct-v0.3` |
| Method | QLoRA (4-bit NF4 quantization) |
| LoRA rank | r=16, alpha=32 |
| Target modules | q_proj, k_proj, v_proj, o_proj |
| Training data | 20,000 instruction pairs |
| Data source | Indian Kanoon (Supreme Court + High Courts) |
| Task types | Summarization, Legal Q&A, Key holding extraction |
| Format | ChatML |
| Epochs | 3 |
| Training platform | Google Colab (A100) |

## Evaluation

Benchmarked on 50 manually curated Indian legal Q&A pairs with verified answers.

| Model | Faithfulness | Answer Relevance | Hallucination Rate |
|-------|-------------|-----------------|-------------------|
| Mistral 7B base | — | — | — |
| Jurix (no RAG) | — | — | — |
| Jurix + RAG | — | — | — |
| GPT-4o + RAG | — | — | — |

*Evaluation in progress — results will be updated post-training.*

## Data pipeline

```
data/
├── scraper.py       # Indian Kanoon API → raw judgements
├── cleaner.py       # Remove boilerplate, chunk into 3000-char segments  
├── formatter.py     # Convert to ChatML instruction pairs (JSONL)
└── generate_outputs.py  # Generate assistant outputs via LLM
```

From 50 landmark Supreme Court judgements → 3,417 chunks → 5,284 instruction pairs.

## Project structure

```
jurix/
├── data/            # Data pipeline scripts
├── training/        # Colab notebooks for QLoRA fine-tuning
├── backend/         # FastAPI application
├── frontend/        # React + Tailwind UI
└── README.md
```

## Setup

```bash
git clone https://github.com/Mohammad-Adnan-Shakil/Jurix.git
cd Jurix
python -m venv jurix-env
jurix-env\Scripts\activate  # Windows
pip install -r requirements.txt
```

Create `.env`:
```
HF_TOKEN=your_huggingface_token
IK_API_KEY=your_indiankanoon_api_key
OPENROUTER_API_KEY=your_openrouter_key
```

Run data pipeline:
```bash
python data/scraper.py       # collect judgements
python data/cleaner.py       # clean and chunk
python data/formatter.py     # generate instruction pairs
python data/generate_outputs.py  # fill assistant outputs
```

## Model

Fine-tuned model will be available at: `adnshkl/jurix-7b-legal`

*Publishing after training and evaluation is complete.*

## Status

- [x] Data pipeline (scrape → clean → chunk → format)
- [x] 50 landmark SC judgements collected (3,417 chunks, 5,284 instruction pairs)
- [x] Output generation (240/240 pairs filled)
- [ ] QLoRA fine-tuning on Colab
- [ ] RAGAS evaluation
- [ ] FastAPI backend
- [ ] React frontend
- [ ] Deployment

---

Built by [Mohammad Adnan Shakil](https://github.com/Mohammad-Adnan-Shakil)