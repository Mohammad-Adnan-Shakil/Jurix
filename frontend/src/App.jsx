import { useState } from "react";
import axios from "axios";
import Hero from "./components/Hero";
import AnswerPanel from "./components/AnswerPanel";

const API_URL = "http://localhost:8001";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuery = async (question) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/query`, { question });
      setResult({ ...res.data, query: question });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ background: "var(--bg)" }}
      >
        <div
          className="font-display text-5xl mb-6"
          style={{ color: "var(--gold)" }}
        >
          Jurix
        </div>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full animate-bounce"
              style={{
                background: "var(--gold)",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
        <p
          className="mt-4 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          Searching Indian legal corpus...
        </p>
      </div>
    );
  }

  if (result) {
    return <AnswerPanel result={result} onNewQuery={handleQuery} />;
  }

  return <Hero onQuery={handleQuery} />;
}