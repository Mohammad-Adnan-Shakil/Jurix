from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag import answer
import uvicorn

app = FastAPI(title="Jurix API", version="1.0.0")

# Allow React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://jurix-tau.vercel.app", "http://localhost:5173", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    question: str

class Source(BaseModel):
    title: str
    citation: str
    url: str
    similarity: float

class QueryResponse(BaseModel):
    answer: str
    sources: list[Source]

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "Jurix API"}

@app.post("/api/query", response_model=QueryResponse)
def query(request: QueryRequest):
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    result = answer(request.question)

    return QueryResponse(
        answer=result["answer"],
        sources=[Source(**s) for s in result["sources"]]
    )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)