import { useState, useEffect, useRef } from "react";

const SUGGESTIONS = [
  "What did the Supreme Court hold in Maneka Gandhi v. Union of India?",
  "Explain the basic structure doctrine from Kesavananda Bharati",
  "What is the rarest of rare test for death penalty in India?",
  "What did Puttaswamy v. Union of India decide about privacy?",
];

const STATS = [
  { value: "50", label: "Landmark Cases" },
  { value: "3,417", label: "Judgement Chunks" },
  { value: "80.2%", label: "Answer Relevance" },
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

export default function Hero({ onQuery, error, onEval }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const submit = () => {
    if (!input.trim()) return;
    onQuery(input.trim());
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const fill = (s) => {
    setInput(s);
    textareaRef.current?.focus();
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#0A0A0F", overflow: "hidden" }}>
      <ParticleCanvas />

      {/* Radial gold ambient light */}
      <div style={{
        position: "fixed",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* Eval nav link */}
      {onEval && (
        <button
          onClick={onEval}
          style={{
            position: "fixed",
            top: "20px",
            right: "32px",
            background: "none",
            border: "none",
            color: "#6B7280",
            fontSize: "13px",
            fontFamily: "Inter, sans-serif",
            cursor: "pointer",
            letterSpacing: "0.03em",
            zIndex: 50,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
        >
          Eval
        </button>
      )}

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 10,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        textAlign: "center",
      }}>

        {/* Badge */}
        <div style={{
          marginBottom: "32px",
          padding: "6px 16px",
          borderRadius: "20px",
          background: "rgba(201,168,76,0.07)",
          border: "1px solid rgba(201,168,76,0.2)",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C9A84C", animation: "pulse 2s ease-in-out infinite" }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#C9A84C", letterSpacing: "0.08em" }}>
            Indian Supreme Court · Fine-tuned LLM
          </span>
        </div>

        {/* Wordmark */}
        <h1 style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(64px, 10vw, 96px)",
          fontWeight: 600,
          color: "#C9A84C",
          letterSpacing: "-3px",
          lineHeight: 1,
          marginBottom: "16px",
          textShadow: "0 0 60px rgba(201,168,76,0.3)",
        }}>
          Jurix
        </h1>

        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "11px",
          color: "#6B7280",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}>
          AI Legal Intelligence
        </p>

        <p style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          color: "#4B5563",
          marginBottom: "48px",
        }}>
          Trained on Indian court judgements · Every answer cited
        </p>

        {/* Input */}
        <div style={{
          width: "100%",
          maxWidth: "700px",
          background: "rgba(255,255,255,0.025)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(201,168,76,0.2)",
          borderRadius: "20px",
          boxShadow: "0 0 40px rgba(201,168,76,0.08), 0 0 80px rgba(201,168,76,0.04), inset 0 1px 0 rgba(255,255,255,0.05)",
          padding: "6px",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
          onFocus={() => {}}
        >
          <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", padding: "14px 18px" }}>
            <textarea
              ref={textareaRef}
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
                color: "#FFFFFF",
                fontFamily: "Inter, sans-serif",
                fontSize: "15px",
                lineHeight: "1.65",
                resize: "none",
                caretColor: "#C9A84C",
              }}
            />
            <button
              onClick={submit}
              disabled={!input.trim()}
              style={{
                flexShrink: 0,
                background: input.trim() ? "linear-gradient(135deg, #C9A84C, #B8942E)" : "rgba(201,168,76,0.12)",
                color: input.trim() ? "#0A0A0F" : "#C9A84C",
                border: "none",
                borderRadius: "12px",
                padding: "11px 22px",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "Inter, sans-serif",
                cursor: input.trim() ? "pointer" : "not-allowed",
                letterSpacing: "0.02em",
                transition: "all 0.2s",
                boxShadow: input.trim() ? "0 4px 20px rgba(201,168,76,0.3)" : "none",
              }}
            >
              Ask →
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#EF4444", marginTop: "12px" }}>
            {error}
          </p>
        )}

        {/* Suggestions */}
        <div style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          justifyContent: "center",
          maxWidth: "700px",
        }}>
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => fill(s)}
              style={{
                background: "rgba(201,168,76,0.05)",
                border: "1px solid rgba(201,168,76,0.18)",
                color: "#E8D5A3",
                borderRadius: "24px",
                padding: "7px 16px",
                fontSize: "12px",
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(201,168,76,0.12)";
                e.target.style.borderColor = "rgba(201,168,76,0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(201,168,76,0.05)";
                e.target.style.borderColor = "rgba(201,168,76,0.18)";
              }}
            >
              {s.length > 54 ? s.slice(0, 54) + "..." : s}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{
          marginTop: "72px",
          width: "1px",
          height: "48px",
          background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)",
        }} />

        {/* Stats */}
        <div style={{
          marginTop: "32px",
          display: "flex",
          gap: "72px",
          alignItems: "center",
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "40px",
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
                marginTop: "6px",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        textarea::placeholder { color: #374151; }
      `}</style>
    </div>
  );
}