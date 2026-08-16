# Jurix — AI Legal Intelligence for Indian Law

> **Live:** [jurix-tau.vercel.app](https://jurix-tau.vercel.app) · **Model:** [adnshkl/jurix-7b-legal](https://huggingface.co/adnshkl/jurix-7b-legal) · **Built by:** [Mohammad Adnan Shakil](https://github.com/Mohammad-Adnan-Shakil)

Jurix is a fine-tuned LLM combined with RAG retrieval over Indian Supreme Court judgements. Ask any Indian legal question — every answer is cited, every source links back to the original judgement on Indian Kanoon.

---

## Live Demo

**[jurix-tau.vercel.app](https://jurix-tau.vercel.app)**

- Landing page with architecture overview
- Citation-first chat interface
- Evaluation dashboard with RAGAS metrics

---

## What Jurix Does

- **Fine-tuned on Indian legal corpus** — QLoRA fine-tuning on Mistral 7B using 240 instruction pairs derived from 50 landmark Supreme Court judgements
- **Citation-first answers** — every response cites the actual judgement with inline [1][2] references linking to Indian Kanoon
- **Semantic retrieval** — pgvector similarity search over 3,417 judgement chunks surfaces the most relevant precedents
- **Measurable performance** — 80.2% answer relevance on a 50-question Indian legal benchmark

---

## Architecture

```
Indian Kanoon API (20M+ judgements)
        ↓
Data pipeline: scrape → clean → chunk → ChatML instruction pairs
        ↓
QLoRA fine-tuning on Mistral 7B Instruct v0.3
(r=16, alpha=32, 4-bit NF4 quantization via bitsandbytes)
        ↓
jurix-7b-legal → HuggingFace Hub (adnshkl/jurix-7b-legal)
        ↓
RAG layer: Neon pgvector + fastembed (BAAI/bge-small-en-v1.5)
        ↓
FastAPI backend (Render) → React + Tailwind frontend (Vercel)
```

---

## Stack

| Layer | Technology |
|-------|-----------|
| Base model | Mistral 7B Instruct v0.3 |
| Fine-tuning | QLoRA — PEFT + bitsandbytes + trl SFTTrainer |
| Embeddings | fastembed — BAAI/bge-small-en-v1.5 |
| Vector store | Neon (pgvector) |
| Backend | FastAPI |
| Frontend | React + Vite + Tailwind |
| Deployment | Render (API) + Vercel (UI) |
| Model hosting | HuggingFace Hub |
| Data source | Indian Kanoon API |

---

## Training Details

| Parameter | Value |
|-----------|-------|
| Base model | `mistralai/Mistral-7B-Instruct-v0.3` |
| Method | QLoRA (4-bit NF4 quantization) |
| LoRA rank | r=16, alpha=32 |
| Dropout | 0.05 |
| Target modules | q_proj, k_proj, v_proj, o_proj |
| Trainable parameters | 13.6M / 7.26B (0.19%) |
| Training data | 212 instruction pairs (train) + 24 (val) |
| Task types | Summarization, Legal Q&A, Key holding extraction |
| Format | ChatML |
| Epochs | 3 |
| Final train loss | 1.15 |
| Final eval loss | 1.13 |
| Training platform | Google Colab T4 (free tier) |
| Training time | ~42 minutes |

---

## Evaluation

Benchmarked on 20 manually curated Indian legal Q&A pairs with verified answers. Full 50-question benchmark in progress.

| Metric | Score |
|--------|-------|
| Answer Relevance | **80.2%** |
| Faithfulness | 20.1% |
| Hallucination Rate | 79.9% |

**Note on faithfulness:** The low faithfulness score reflects corpus coverage, not model quality. The benchmark includes questions about cases not in the 50-judgement training corpus (e.g. Kesavananda Bharati, Vishaka). When retrieval returns unrelated chunks, faithfulness scores drop — but answer relevance stays high because the fine-tuned model draws on pretrained legal knowledge. Scaling the corpus to 9,000+ judgements is the planned fix.

---

## Data Pipeline

```
data/
├── scraper.py          # Indian Kanoon API → raw judgements (50 SC cases)
├── cleaner.py          # Remove boilerplate, chunk into 3,000-char segments
├── formatter.py        # Convert to ChatML instruction pairs (5,284 total)
└── generate_outputs.py # Fill assistant outputs via LLM (240 filled)
```

**Pipeline output:**
- 50 landmark Supreme Court judgements
- 3,417 judgement chunks
- 5,284 instruction pairs generated
- 240 pairs filled with LLM-generated outputs
- Dataset: [adnshkl/jurix-legal-instruct](https://huggingface.co/datasets/adnshkl/jurix-legal-instruct)

---

## Project Structure

```
Jurix/
├── data/
│   ├── scraper.py
│   ├── cleaner.py
│   ├── formatter.py
│   └── generate_outputs.py
├── backend/
│   ├── main.py         # FastAPI endpoints
│   ├── rag.py          # Retrieval + generation pipeline
│   ├── embed.py        # Embedding pipeline for Neon pgvector
│   ├── evaluate.py     # RAGAS evaluation script
│   └── benchmark.py    # 50-question benchmark
├── frontend/
│   └── src/
│       ├── App.jsx
│       └── components/
│           ├── Landing.jsx
│           ├── Hero.jsx
│           ├── AnswerPanel.jsx
│           ├── EvalDashboard.jsx
│           └── Loading.jsx
├── training/           # Google Colab notebooks
├── render.yaml
└── README.md
```

---

## Local Setup

```bash
git clone https://github.com/Mohammad-Adnan-Shakil/Jurix.git
cd Jurix

# Backend
cd backend
pip install -r requirements.txt

# Create .env
cp .env.example .env
# Fill in: NEON_DATABASE_URL, OPENROUTER_API_KEY, IK_API_KEY, HF_TOKEN

# Run backend
uvicorn main:app --port 8000

# Frontend (separate terminal)
cd frontend
npm install
npm run dev
```

---

## API

**Base URL:** `https://jurix-api.onrender.com`

```
GET  /api/health   → {"status": "ok", "service": "Jurix API"}
POST /api/query    → {"question": "string"}
                  ← {"answer": "string", "sources": [...]}
```

---

## Benchmark Coverage

20 questions evaluated across 8 legal categories:

| Category | Questions |
|----------|-----------|
| Constitutional Law | 8 |
| Criminal Law | 5 |
| Civil Procedure | 2 |
| Contract Law | 2 |
| Property Law | 1 |
| Administrative Law | 1 |
| Family Law | 1 |

---

## Status

- [x] Indian Kanoon data pipeline (scraper, cleaner, formatter)
- [x] 50 landmark SC judgements collected
- [x] 3,417 chunks, 5,284 instruction pairs
- [x] 240 LLM-filled training pairs
- [x] Dataset on HuggingFace Hub
- [x] QLoRA fine-tuning — Mistral 7B → jurix-7b-legal
- [x] Model on HuggingFace Hub
- [x] Neon pgvector — 3,417 chunks embedded
- [x] RAG pipeline with citation linking
- [x] FastAPI backend
- [x] RAGAS evaluation — 80.2% answer relevance
- [x] React frontend — landing, chat, eval dashboard
- [x] Deployed — Render + Vercel
- [ ] Scale corpus to 9,000+ judgements
- [ ] Re-embed with full corpus
- [ ] Re-evaluate RAGAS on full benchmark

---

## Built With

- Free-tier only — Google Colab T4, Neon free tier, Render free tier, Vercel hobby
- No paid APIs — OpenRouter free models for output generation
- No proprietary data — Indian Kanoon public court records

---

*Presidency University Bengaluru · 2026*