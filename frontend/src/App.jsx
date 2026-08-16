import { useState } from "react";
import axios from "axios";
import Landing from "./components/Landing";
import Hero from "./components/Hero";
import AnswerPanel from "./components/AnswerPanel";
import Loading from "./components/Loading";
import EvalDashboard from "./components/EvalDashboard";

const API_URL = "http://localhost:8001";

export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | hero | loading | answer | eval
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleQuery = async (question) => {
    setScreen("loading");
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/api/query`, { question });
      setResult({ ...res.data, query: question });
      setScreen("answer");
    } catch {
      setError("Backend not reachable. Is it running on port 8001?");
      setScreen("hero");
    }
  };

  if (screen === "loading") return <Loading />;
  if (screen === "answer") {
    return (
      <AnswerPanel
        result={result}
        onNewQuery={handleQuery}
        onBack={() => setScreen("hero")}
        onEval={() => setScreen("eval")}
      />
    );
  }
  if (screen === "eval") return <EvalDashboard onBack={() => setScreen("landing")} />;
  if (screen === "hero") return <Hero onQuery={handleQuery} error={error} onEval={() => setScreen("eval")} />;
  return (
    <Landing
      onEnterChat={() => setScreen("hero")}
      onEnterEval={() => setScreen("eval")}
    />
  );
}