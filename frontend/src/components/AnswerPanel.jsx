import { useState, useRef } from "react";

export default function AnswerPanel({ result, onNewQuery, onBack }) {
  const [activeSource, setActiveSource] = useState(null);
  const [input, setInput] = useState("");
  const [pulsingCitation, setPulsingCitation] = useState(null);
  const sourceRefs = useRef([]);

  const handleCitationClick = (idx) => {
    setActiveSource(idx);
    setPulsingCitation(idx);
    setTimeout(() => setPulsingCitation(null), 800);
    // Scroll source card into view
    sourceRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const renderAnswer = (text) => {
    // Strip markdown bold/italic asterisks
    text = text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
    const parts = text.split(/(\[\d+\])/g);
    return parts.map((part, i) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const idx = parseInt(match[1]) - 1;
        const isPulsing = pulsingCitation === idx;
        const isActive = activeSource === idx;
        return (
          <span
            key={i}
            onClick={() => handleCitationClick(idx)}
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "13px",
              color: isActive || isPulsing ? "#C9A84C" : "#9CA3AF",
              background: isActive ? "rgba(201,168,76,0.12)" : "rgba(201,168,76,0.06)",
              border: `1px solid ${isActive ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.15)"}`,
              borderRadius: "4px",
              padding: "1px 6px",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "inline-block",
              margin: "0 2px",
              textShadow: isPulsing ? "0 0 12px rgba(201,168,76,0.9)" : "none",
              animation: isPulsing ? "citePulse 0.8s ease" : "none",
            }}
          >
            {part}
          </span>
        );
      }
      return <span key={i} style={{ color: "#E5E7EB", lineHeight: "2" }}>{part}</span>;
    });
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    onNewQuery(input.trim());
    setInput("");
    setActiveSource(null);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") { e.preventDefault(); handleSubmit(); }
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#0A0A0F",
      overflow: "hidden",
      fontFamily: "Inter, sans-serif",
    }}>

      {/* LEFT — Source Panel */}
      <div style={{
        width: "300px",
        flexShrink: 0,
        background: "#0F0F14",
        borderRight: "1px solid rgba(201,168,76,0.1)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
        {/* Back button */}
        <div style={{
          padding: "20px 20px 0",
        }}>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              color: "#6B7280",
              fontSize: "12px",
              cursor: "pointer",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.05em",
              padding: "0",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            onMouseEnter={(e) => e.target.style.color = "#C9A84C"}
            onMouseLeave={(e) => e.target.style.color = "#6B7280"}
          >
            ← New search
          </button>
        </div>

        {/* Header */}
        <div style={{
          padding: "16px 20px 14px",
          borderBottom: "1px solid rgba(201,168,76,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <span style={{ fontSize: "10px", color: "#6B7280", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Sources
          </span>
          <span style={{
            fontSize: "10px",
            color: "#C9A84C",
            fontFamily: "JetBrains Mono, monospace",
            background: "rgba(201,168,76,0.08)",
            padding: "2px 8px",
            borderRadius: "10px",
          }}>
            {result.sources.length} judgements
          </span>
        </div>

        {/* Source cards */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {result.sources.map((src, i) => {
            const isActive = activeSource === i;
            return (
              <div
                key={i}
                ref={(el) => (sourceRefs.current[i] = el)}
                onClick={() => setActiveSource(isActive ? null : i)}
                style={{
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: isActive ? "rgba(201,168,76,0.07)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isActive ? "rgba(201,168,76,0.35)" : "rgba(255,255,255,0.04)"}`,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: isActive ? "0 0 20px rgba(201,168,76,0.08)" : "none",
                }}
              >
                {/* Number + citation */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "11px",
                    color: isActive ? "#C9A84C" : "#6B7280",
                    background: isActive ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.05)",
                    padding: "2px 8px",
                    borderRadius: "6px",
                    transition: "all 0.25s",
                    flexShrink: 0,
                  }}>
                    [{i + 1}]
                  </span>
                  <span style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "10px",
                    color: "#E8D5A3",
                    opacity: 0.7,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                    {src.citation}
                  </span>
                </div>

                {/* Title */}
                <p style={{
                  fontSize: "11px",
                  color: "#9CA3AF",
                  lineHeight: "1.5",
                  marginBottom: "10px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                  {src.title}
                </p>

                {/* Similarity bar */}
                <div style={{ marginBottom: "8px" }}>
                  <div style={{
                    height: "2px",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${src.similarity * 100}%`,
                      background: `linear-gradient(to right, #C9A84C, #E8D5A3)`,
                      borderRadius: "2px",
                      transition: "width 0.6s ease",
                    }} />
                  </div>
                  <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "4px",
                  }}>
                    <span style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "10px",
                      color: "#6B7280",
                    }}>
                      {(src.similarity * 100).toFixed(0)}% match
                    </span>
                  </div>
                </div>

                {/* Link */}
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontSize: "11px",
                    color: isActive ? "#C9A84C" : "#6B7280",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#C9A84C"}
                  onMouseLeave={(e) => e.currentTarget.style.color = isActive ? "#C9A84C" : "#6B7280"}
                >
                  View on Indian Kanoon →
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT — Answer Panel */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top bar */}
        <div style={{
          padding: "20px 36px",
          borderBottom: "1px solid rgba(201,168,76,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          background: "rgba(255,255,255,0.01)",
        }}>
          <span style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "26px",
            fontWeight: 600,
            color: "#C9A84C",
            letterSpacing: "-0.5px",
          }}>
            Jurix
          </span>
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            color: "#374151",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            Indian Legal Intelligence
          </span>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "36px" }}>

          {/* Question */}
          <div style={{
            marginBottom: "32px",
            paddingBottom: "28px",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}>
            <div style={{
              fontSize: "10px",
              color: "#6B7280",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <div style={{ width: "16px", height: "1px", background: "#C9A84C", opacity: 0.5 }} />
              Question
            </div>
            <p style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#F9FAFB",
              lineHeight: "1.5",
              maxWidth: "680px",
            }}>
              {result.query}
            </p>
          </div>

          {/* Answer */}
          <div>
            <div style={{
              fontSize: "10px",
              color: "#6B7280",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <div style={{ width: "16px", height: "1px", background: "#C9A84C", opacity: 0.5 }} />
              Answer
            </div>
            <div style={{
              fontSize: "15px",
              lineHeight: "2",
              color: "#D1D5DB",
              maxWidth: "720px",
            }}>
              {renderAnswer(result.answer)}
            </div>
          </div>
        </div>

        {/* Bottom input */}
        <div style={{
          padding: "16px 36px",
          borderTop: "1px solid rgba(201,168,76,0.08)",
          background: "rgba(255,255,255,0.01)",
          flexShrink: 0,
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: "14px",
            padding: "10px 16px",
            backdropFilter: "blur(10px)",
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask a follow-up question..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#FFFFFF",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                caretColor: "#C9A84C",
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              style={{
                background: input.trim() ? "linear-gradient(135deg, #C9A84C, #B8942E)" : "rgba(201,168,76,0.1)",
                color: input.trim() ? "#0A0A0F" : "#C9A84C",
                border: "none",
                borderRadius: "9px",
                padding: "8px 18px",
                fontSize: "13px",
                fontWeight: 700,
                fontFamily: "Inter, sans-serif",
                cursor: input.trim() ? "pointer" : "not-allowed",
                transition: "all 0.2s",
                boxShadow: input.trim() ? "0 2px 12px rgba(201,168,76,0.25)" : "none",
              }}
            >
              Ask →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes citePulse {
          0% { text-shadow: none; }
          40% { text-shadow: 0 0 16px rgba(201,168,76,1); }
          100% { text-shadow: 0 0 8px rgba(201,168,76,0.5); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 2px; }
        input::placeholder { color: #374151; }
      `}</style>
    </div>
  );
}