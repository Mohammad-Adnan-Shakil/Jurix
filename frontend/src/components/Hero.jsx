import { useState } from "react";
import ParticleCanvas from "./ParticleCanvas";

const SUGGESTIONS = [
  "What did the Supreme Court hold in Maneka Gandhi v. Union of India?",
  "Explain the basic structure doctrine from Kesavananda Bharati",
  "What is the rarest of rare test for death penalty in India?",
  "What did Puttaswamy v. Union of India decide about privacy?",
];

export default function Hero({ onQuery }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    await onQuery(input.trim());
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "var(--bg)" }}>
      <ParticleCanvas />

      <div style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "0 24px",
        textAlign: "center",
      }}>

        {/* Wordmark */}
        <div style={{ marginBottom: "8px" }}>
          <span style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "80px",
            fontWeight: 600,
            color: "var(--gold)",
            letterSpacing: "-2px",
            lineHeight: 1,
          }}>
            Jurix
          </span>
        </div>

        {/* Tagline */}
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "12px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}>
          AI Legal Intelligence
        </p>
        <p style={{ color: "var(--text-secondary)", fontSize: "13px", marginBottom: "48px" }}>
          Trained on Indian court judgements · Cites every source
        </p>

        {/* Input box */}
        <div style={{
          width: "100%",
          maxWidth: "680px",
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(201, 168, 76, 0.25)",
          borderRadius: "16px",
          boxShadow: "0 0 40px rgba(201, 168, 76, 0.1)",
          padding: "4px",
        }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", padding: "12px 16px" }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask a question about Indian law..."
              rows={2}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                fontFamily: "Inter, sans-serif",
                fontSize: "15px",
                lineHeight: "1.6",
                resize: "none",
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={loading || !input.trim()}
              style={{
                background: loading || !input.trim() ? "rgba(201,168,76,0.2)" : "var(--gold)",
                color: loading || !input.trim() ? "var(--gold)" : "#0A0A0F",
                border: "none",
                borderRadius: "10px",
                padding: "10px 20px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                fontFamily: "Inter, sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              {loading ? "..." : "Ask →"}
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", maxWidth: "680px" }}>
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => setInput(s)}
              style={{
                background: "rgba(201,168,76,0.06)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "var(--gold-muted)",
                borderRadius: "20px",
                padding: "6px 14px",
                fontSize: "12px",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {s.length > 52 ? s.slice(0, 52) + "..." : s}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div style={{ marginTop: "64px", display: "flex", gap: "60px" }}>
          {[
            { value: "50", label: "Landmark cases" },
            { value: "3,417", label: "Judgement chunks" },
            { value: "80.2%", label: "Answer relevance" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "36px",
                fontWeight: 600,
                color: "var(--gold)",
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: "11px",
                color: "var(--text-secondary)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginTop: "4px",
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}