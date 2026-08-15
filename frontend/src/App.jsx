import { useState } from "react";
import axios from "axios";
import Hero from "./components/Hero";
import AnswerPanel from "./components/AnswerPanel";
import Loading from "./components/Loading";

const API_URL = "http://localhost:8001";

export default function App() {
  const [screen, setScreen] = useState("hero"); // hero | loading | answer
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleQuery = async (question) => {
    setScreen("loading");
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/api/query`, { question });
      setResult({ ...res.data, query: question });
      setScreen("answer");
    } catch (err) {
      setError("Backend not reachable. Is it running on port 8001?");
      setScreen("hero");
    }
  };

  if (screen === "loading") return <Loading />;
  if (screen === "answer") return <AnswerPanel result={result} onNewQuery={handleQuery} onBack={() => setScreen("hero")} />;
  return <Hero onQuery={handleQuery} error={error} />;
}