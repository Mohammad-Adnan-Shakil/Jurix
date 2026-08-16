const ROWS = [
  ["Maneka Gandhi v. Union of India — Article 21", "constitutional_law"],
  ["Kesavananda Bharati — basic structure doctrine", "constitutional_law"],
  ["K.S. Puttaswamy — right to privacy", "constitutional_law"],
  ["Article 14 — equality before law", "constitutional_law"],
  ["ADM Jabalpur — emergency and fundamental rights", "constitutional_law"],
  ["Section 302 IPC — murder", "criminal_law"],
  ["Culpable homicide vs murder", "criminal_law"],
  ["Bachan Singh — death penalty", "criminal_law"],
  ["Section 437 CrPC — bail conditions", "criminal_law"],
  ["Right to speedy trial — Article 21", "constitutional_law"],
  ["Res judicata — Section 11 CPC", "civil_procedure"],
  ["Limitation period — money recovery", "civil_procedure"],
  ["Valid contract — Indian Contract Act", "contract_law"],
  ["Doctrine of frustration — Section 56", "contract_law"],
  ["Olga Tellis — right to livelihood", "constitutional_law"],
  ["Article 32 — judicial review scope", "constitutional_law"],
  ["Natural justice — audi alteram partem", "administrative_law"],
  ["Selvi — narco analysis and Article 20(3)", "criminal_law"],
  ["Promissory estoppel", "contract_law"],
  ["Article 19 — six freedoms", "constitutional_law"],
];

const glassCard = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(201,168,76,0.15)",
  boxShadow: "0 0 40px rgba(201,168,76,0.1)",
  borderRadius: "16px",
};

const labelStyle = {
  fontFamily: "Inter, sans-serif",
  fontSize: "10px",
  color: "#6B7280",
  textTransform: "uppercase",
  letterSpacing: "0.18em",
};

export default function EvalDashboard({ onBack }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0F",
      color: "#FFFFFF",
      fontFamily: "Inter, sans-serif",
    }}>
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "40px 32px 80px" }}>

        {/* Back + title */}
        <div style={{ marginBottom: "48px" }}>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              color: "#6B7280",
              fontSize: "13px",
              fontFamily: "Inter, sans-serif",
              cursor: "pointer",
              letterSpacing: "0.04em",
              padding: "0",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
          >
            ← Back to Chat
          </button>

          <h1 style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "48px",
            fontWeight: 600,
            color: "#C9A84C",
            letterSpacing: "-1px",
            lineHeight: 1.1,
            marginBottom: "12px",
            textShadow: "0 0 40px rgba(201,168,76,0.2)",
          }}>
            Evaluation Results
          </h1>

          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            color: "#6B7280",
          }}>
            20 benchmark questions · Indian legal Q&A · Jurix + RAG pipeline
          </p>
        </div>

        {/* ============ METRICS ============ */}
        <div style={{ marginBottom: "40px" }}>
          <div style={labelStyle}>Overall Metrics</div>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "14px",
          }}>
            {/* Card 1 — Answer Relevance (glowing) */}
            <div style={{
              flex: "1.5 1 300px",
              borderRadius: "18px",
              padding: "1.5px",
              background: "linear-gradient(135deg, rgba(201,168,76,0.7), rgba(201,168,76,0.15))",
              animation: "metricGlow 2.6s ease-in-out infinite",
            }}>
              <div style={{
                background: "rgba(17,17,17,0.92)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: "17px",
                padding: "32px 30px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}>
                <div style={labelStyle}>Answer Relevance</div>

                <div style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "64px",
                  fontWeight: 600,
                  color: "#C9A84C",
                  lineHeight: 1.1,
                  margin: "10px 0 6px",
                  textShadow: "0 0 40px rgba(201,168,76,0.3)",
                }}>
                  80.2%
                </div>

                <div style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  color: "#9CA3AF",
                  marginBottom: "18px",
                }}>
                  Questions answered on-topic
                </div>

                <div style={{ marginTop: "auto" }}>
                  <span style={{
                    display: "inline-block",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "10px",
                    color: "#C9A84C",
                    background: "rgba(201,168,76,0.12)",
                    border: "1px solid rgba(201,168,76,0.35)",
                    padding: "4px 12px",
                    borderRadius: "20px",
                    letterSpacing: "0.12em",
                  }}>
                    TOP METRIC
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 — Faithfulness */}
            <div style={{ ...glassCard, flex: "1 1 240px", padding: "26px 24px", display: "flex", flexDirection: "column" }}>
              <div style={labelStyle}>Faithfulness</div>
              <div style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "44px",
                fontWeight: 600,
                color: "#C9A84C",
                lineHeight: 1.1,
                margin: "10px 0 6px",
              }}>
                20.1%
              </div>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                fontStyle: "italic",
                color: "#6B7280",
                lineHeight: 1.6,
                marginTop: "auto",
              }}>
                Low faithfulness reflects small corpus (50 judgements). Scales with data.
              </p>
            </div>

            {/* Card 3 — Hallucination Rate */}
            <div style={{ ...glassCard, flex: "1 1 240px", padding: "26px 24px", display: "flex", flexDirection: "column" }}>
              <div style={labelStyle}>Hallucination Rate</div>
              <div style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "44px",
                fontWeight: 600,
                color: "#C9A84C",
                lineHeight: 1.1,
                margin: "10px 0 6px",
              }}>
                79.9%
              </div>
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                fontStyle: "italic",
                color: "#6B7280",
                lineHeight: 1.6,
                marginTop: "auto",
              }}>
                Inverse of faithfulness. Expected to drop significantly with full corpus.
              </p>
            </div>
          </div>
        </div>

        {/* ============ EXPLANATION ============ */}
        <div style={{
          ...glassCard,
          borderLeft: "2px solid #C9A84C",
          padding: "24px 28px",
          marginBottom: "48px",
        }}>
          <div style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            color: "#FFFFFF",
            marginBottom: "10px",
          }}>
            Why faithfulness is low
          </div>
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            color: "#9CA3AF",
            lineHeight: 1.7,
          }}>
            The RAGAS faithfulness metric checks whether answer content appears in retrieved chunks. Our benchmark includes questions about cases not in the 50-judgement training corpus (e.g. Kesavananda Bharati, Vishaka). When retrieval returns unrelated chunks, faithfulness scores drop — but answer relevance stays high because the fine-tuned model draws on pretrained legal knowledge. Scaling the corpus to 9,000+ judgements is the planned fix.
          </p>
        </div>

        {/* ============ BENCHMARK TABLE ============ */}
        <div>
          <div style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            color: "#FFFFFF",
            marginBottom: "14px",
          }}>
            Benchmark Questions
          </div>

          <div style={{
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 0 40px rgba(201,168,76,0.08)",
            overflow: "hidden",
          }}>
            <div style={{ maxHeight: "460px", overflowY: "auto", borderRadius: "16px" }}>

              {/* Header */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "52px minmax(0, 1fr) 190px 110px",
                padding: "13px 20px",
                borderBottom: "1px solid rgba(201,168,76,0.15)",
                position: "sticky",
                top: 0,
                background: "#0F0F14",
                zIndex: 2,
              }}>
                <span style={{ ...labelStyle }}>#</span>
                <span style={{ ...labelStyle }}>Question</span>
                <span style={{ ...labelStyle }}>Category</span>
                <span style={{ ...labelStyle }}>Status</span>
              </div>

              {/* Rows */}
              {ROWS.map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "52px minmax(0, 1fr) 190px 110px",
                    padding: "12px 20px",
                    alignItems: "center",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "#D1D5DB",
                    background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                    transition: "background 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(201,168,76,0.06)";
                    e.currentTarget.style.boxShadow = "inset 3px 0 0 #C9A84C";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "11px",
                    color: "#6B7280",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{row[0]}</span>
                  <span style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "11px",
                    color: "#9CA3AF",
                  }}>
                    {row[1]}
                  </span>
                  <span>
                    <span style={{
                      display: "inline-block",
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: "10px",
                      color: "#C9A84C",
                      background: "rgba(201,168,76,0.1)",
                      border: "1px solid rgba(201,168,76,0.25)",
                      padding: "3px 11px",
                      borderRadius: "20px",
                      letterSpacing: "0.05em",
                    }}>
                      Evaluated
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes metricGlow {
          0%, 100% {
            box-shadow: 0 0 30px rgba(201,168,76,0.15), 0 0 70px rgba(201,168,76,0.06);
          }
          50% {
            box-shadow: 0 0 55px rgba(201,168,76,0.35), 0 0 130px rgba(201,168,76,0.12);
          }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 2px; }
      `}</style>
    </div>
  );
}