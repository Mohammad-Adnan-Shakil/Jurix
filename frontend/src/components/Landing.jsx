import { Fragment, useEffect, useRef } from "react";

const STATS = [
  { value: "50", label: "Landmark Cases" },
  { value: "3,417", label: "Judgement Chunks" },
  { value: "80.2%", label: "Answer Relevance" },
  { value: "212", label: "Training Pairs" },
];

const STEPS = [
  {
    number: "01",
    title: "Ask",
    desc: "Type any Indian legal question — a case, section, constitutional article, or legal principle.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.1 9a2.9 2.9 0 1 1 3.5 2.9c-.8.3-1.2.9-1.2 1.8" />
        <circle cx="12" cy="16.8" r="0.9" fill="#C9A84C" stroke="none" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Retrieve",
    desc: "Jurix searches 3,417 chunks from 50 landmark Supreme Court judgements using semantic similarity.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Answer + Cite",
    desc: "The fine-tuned model generates a precise answer with inline [1][2] citations linking to actual judgement text on Indian Kanoon.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <rect x="8" y="12.5" width="3" height="3" rx="1" />
        <rect x="13" y="12.5" width="3" height="3" rx="1" />
      </svg>
    ),
  },
];

const PIPELINE = [
  { label: "Indian Kanoon API", sub: "20M+ judgements" },
  { label: "Data Pipeline", sub: "3,417 chunks" },
  { label: "QLoRA Fine-tuning", sub: "212 instruction pairs" },
  { label: "Mistral 7B Jurix", sub: "adnshkl/jurix-7b-legal" },
  { label: "RAG (pgvector)", sub: "Neon · all-MiniLM-L6-v2" },
  { label: "FastAPI", sub: "REST API · Render" },
  { label: "React UI", sub: "Vite · Vercel" },
];

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.5 + 0.5,
      o: Math.random() * 0.35 + 0.08,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.o})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${0.07 * (1 - d / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
    }} />
  );
}

const arrowStyle = {
  color: "#C9A84C",
  fontSize: "18px",
  opacity: 0.55,
  flexShrink: 0,
  fontFamily: "Inter, sans-serif",
};

const glassCard = {
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  border: "1px solid rgba(201,168,76,0.15)",
  boxShadow: "0 0 40px rgba(201,168,76,0.1)",
  borderRadius: "16px",
};

const sectionTitle = {
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "40px",
  fontWeight: 600,
  color: "#C9A84C",
  textAlign: "center",
  marginBottom: "16px",
  letterSpacing: "-0.5px",
  lineHeight: 1.2,
};

const sectionSub = {
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  color: "#6B7280",
  textAlign: "center",
  maxWidth: "560px",
  margin: "0 auto 56px",
  lineHeight: 1.7,
};

export default function Landing({ onEnterChat, onEnterEval }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#0A0A0F", color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}>
      <ParticleCanvas />

      {/* Ambient gold light */}
      <div style={{
        position: "fixed",
        top: "25%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px",
        height: "800px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      <div style={{ position: "relative", zIndex: 10 }}>

        {/* ============ NAVBAR ============ */}
        <nav style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          background: "rgba(10,10,15,0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(201,168,76,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 48px",
          zIndex: 50,
        }}>
          <span style={{ display: "flex", alignItems: "center" }}>
            <img src="/logo.svg" height="32" alt="Jurix" style={{ display: "inline-block" }} />
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            <button
              onClick={onEnterEval}
              style={{
                background: "none",
                border: "none",
                color: "#6B7280",
                fontSize: "13px",
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                letterSpacing: "0.03em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >
              Eval
            </button>
            <button
              onClick={onEnterChat}
              style={{
                background: "transparent",
                border: "1px solid rgba(201,168,76,0.5)",
                color: "#C9A84C",
                borderRadius: "10px",
                padding: "8px 20px",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(201,168,76,0.12)";
                e.currentTarget.style.boxShadow = "0 0 24px rgba(201,168,76,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Chat →
            </button>
          </div>
        </nav>

        {/* ============ HERO ============ */}
        <header style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 80px",
        }}>
          <div style={{ animation: "jurixFadeUp 0.7s ease both" }}>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "20px",
              border: "1px solid rgba(201,168,76,0.35)",
              background: "rgba(201,168,76,0.06)",
              marginBottom: "32px",
            }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%", background: "#C9A84C",
                animation: "jurixPulse 2s ease-in-out infinite",
              }} />
              <span style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                color: "#C9A84C",
                letterSpacing: "0.08em",
              }}>
                Fine-tuned Mistral 7B · Indian Supreme Court
              </span>
            </div>

            <h1 style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(46px, 7.5vw, 72px)",
              fontWeight: 600,
              color: "#C9A84C",
              maxWidth: "700px",
              lineHeight: 1.1,
              margin: "0 auto 24px",
              letterSpacing: "-1.5px",
              textShadow: "0 0 50px rgba(201,168,76,0.25)",
            }}>
              Indian Law, Answered with Evidence.
            </h1>

            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "17px",
              color: "#9CA3AF",
              maxWidth: "560px",
              lineHeight: 1.7,
              margin: "0 auto 44px",
            }}>
              Jurix combines a fine-tuned LLM with semantic retrieval over 3,417 Supreme Court judgement chunks — every answer cited, every source linked.
            </p>

            <button
              onClick={onEnterChat}
              style={{
                background: "linear-gradient(135deg, #C9A84C, #B8942E)",
                color: "#0A0A0F",
                border: "none",
                borderRadius: "14px",
                padding: "14px 32px",
                fontSize: "15px",
                fontWeight: 700,
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                letterSpacing: "0.02em",
                boxShadow: "0 0 40px rgba(201,168,76,0.25), 0 8px 30px rgba(201,168,76,0.15)",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 60px rgba(201,168,76,0.4), 0 8px 30px rgba(201,168,76,0.25)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 40px rgba(201,168,76,0.25), 0 8px 30px rgba(201,168,76,0.15)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Enter Chat →
            </button>

            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              color: "#6B7280",
              marginTop: "20px",
              letterSpacing: "0.02em",
            }}>
              No login required · Open source · Free to use
            </p>
          </div>
        </header>

        {/* ============ HOW IT WORKS ============ */}
        <section style={{ padding: "110px 24px" }}>
          <h2 style={sectionTitle}>How Jurix Works</h2>
          <p style={sectionSub}>From a plain-language question to a cited legal answer in three steps.</p>

          <div className="jurix-steps" style={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            gap: "18px",
            maxWidth: "1080px",
            margin: "0 auto",
          }}>
            {STEPS.map((step, i) => (
              <Fragment key={step.title}>
                {i > 0 && (
                  <div className="jurix-step-arrow" style={{ ...arrowStyle, alignSelf: "center" }}>
                    →
                  </div>
                )}
                <div style={{
                  ...glassCard,
                  flex: "1 1 0",
                  minWidth: "0",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                }}>
                  <div style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "12px",
                    color: "rgba(201,168,76,0.7)",
                    marginBottom: "16px",
                    letterSpacing: "0.1em",
                  }}>
                    {step.number}
                  </div>

                  <div style={{
                    width: "56px", height: "56px", borderRadius: "50%",
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid rgba(201,168,76,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "20px",
                  }}>
                    {step.icon}
                  </div>

                  <div style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    marginBottom: "10px",
                  }}>
                    {step.title}
                  </div>

                  <p style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "#6B7280",
                    lineHeight: 1.7,
                  }}>
                    {step.desc}
                  </p>
                </div>
              </Fragment>
            ))}
          </div>
        </section>

        {/* ============ ARCHITECTURE ============ */}
        <section style={{ padding: "90px 24px 110px" }}>
          <h2 style={sectionTitle}>Under the Hood</h2>
          <p style={sectionSub}>The end-to-end pipeline that powers every answer.</p>

          <div className="jurix-pipe" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "nowrap",
            gap: "8px",
            maxWidth: "1180px",
            margin: "0 auto",
          }}>
            {PIPELINE.map((node, i) => (
              <Fragment key={node.label}>
                {i > 0 && (
                  <div className="jurix-pipe-arrow" style={arrowStyle}>→</div>
                )}
                <div style={{
                  ...glassCard,
                  padding: "12px 16px",
                  textAlign: "center",
                  minWidth: "0",
                  flexShrink: 1,
                }}>
                  <div style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    color: "#F9FAFB",
                    whiteSpace: "nowrap",
                  }}>
                    {node.label}
                  </div>
                  <div style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "10px",
                    color: "#6B7280",
                    marginTop: "5px",
                    whiteSpace: "nowrap",
                  }}>
                    {node.sub}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </section>

        {/* ============ STATS ============ */}
        <section style={{ padding: "0 24px 110px" }}>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "clamp(40px, 8vw, 96px)",
            maxWidth: "1100px",
            margin: "0 auto",
          }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(34px, 5vw, 40px)",
                  fontWeight: 600,
                  color: "#C9A84C",
                  lineHeight: 1,
                  textShadow: "0 0 30px rgba(201,168,76,0.2)",
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  color: "#6B7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginTop: "8px",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="jurix-footer" style={{
          borderTop: "1px solid rgba(201,168,76,0.08)",
          padding: "24px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}>
          <span style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "18px",
            fontWeight: 600,
            color: "#C9A84C",
          }}>
            Jurix
          </span>

          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            color: "#6B7280",
          }}>
            Built by Mohammad Adnan Shakil · Presidency University Bengaluru
          </span>

          <div style={{ display: "flex", gap: "24px" }}>
            <a
              href="https://github.com/Mohammad-Adnan-Shakil/Jurix"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >
              GitHub →
            </a>
            <a
              href="https://huggingface.co/adnshkl/jurix-7b-legal"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >
              Model →
            </a>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes jurixFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes jurixPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @media (max-width: 860px) {
          .jurix-steps { flex-direction: column !important; align-items: center !important; }
          .jurix-steps > div[style] { max-width: 420px !important; }
          .jurix-step-arrow { transform: rotate(90deg) !important; }
          .jurix-pipe { flex-direction: column !important; align-items: center !important; }
          .jurix-pipe-arrow { transform: rotate(90deg) !important; }
          .jurix-footer { flex-direction: column !important; text-align: center !important; }
        }
      `}</style>
    </div>
  );
}

const linkStyle = {
  fontFamily: "Inter, sans-serif",
  fontSize: "12px",
  color: "#6B7280",
  textDecoration: "none",
  transition: "color 0.2s",
};