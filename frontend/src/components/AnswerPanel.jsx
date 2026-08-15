import { useState } from "react";

export default function AnswerPanel({ result, onNewQuery }) {
  const [input, setInput] = useState("");
  const [activeSource, setActiveSource] = useState(null);

  // Replace [1], [2] etc with clickable spans
  const renderAnswer = (text) => {
    const parts = text.split(/(\[\d+\])/g);
    return parts.map((part, i) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const idx = parseInt(match[1]) - 1;
        return (
          <span
            key={i}
            className={`font-mono text-sm cursor-pointer px-0.5 rounded transition-all duration-200 ${
              activeSource === idx ? "citation-active" : ""
            }`}
            style={{
              color: "var(--gold)",
              fontFamily: "JetBrains Mono, monospace",
            }}
            onClick={() => setActiveSource(activeSource === idx ? null : idx)}
          >
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        onNewQuery(input.trim());
        setInput("");
      }
    }
  };

  return (
    <div
      className="flex h-screen w-full"
      style={{ background: "var(--bg)" }}
    >
      {/* Source Panel — left */}
      <div
        className="w-80 flex-shrink-0 border-r flex flex-col"
        style={{
          background: "var(--elevated)",
          borderColor: "rgba(201, 168, 76, 0.1)",
        }}
      >
        {/* Header */}
        <div
          className="px-5 py-4 border-b"
          style={{ borderColor: "rgba(201, 168, 76, 0.1)" }}
        >
          <span
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            Sources
          </span>
        </div>

        {/* Source cards */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
          {result.sources.map((src, i) => (
            <div
              key={i}
              onClick={() => setActiveSource(activeSource === i ? null : i)}
              className="p-4 rounded-xl cursor-pointer transition-all duration-200"
              style={{
                background: activeSource === i
                  ? "rgba(201, 168, 76, 0.1)"
                  : "rgba(255,255,255,0.02)",
                border: activeSource === i
                  ? "1px solid rgba(201, 168, 76, 0.4)"
                  : "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Citation number */}
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="font-mono text-xs px-2 py-0.5 rounded"
                  style={{
                    background: "rgba(201, 168, 76, 0.15)",
                    color: "var(--gold)",
                  }}
                >
                  [{i + 1}]
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--gold-muted)" }}
                >
                  {src.citation}
                </span>
              </div>

              {/* Title */}
              <p
                className="text-xs leading-relaxed mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                {src.title.length > 70
                  ? src.title.slice(0, 70) + "..."
                  : src.title}
              </p>

              {/* Similarity */}
              <div className="flex items-center gap-2">
                <div
                  className="h-1 rounded-full flex-1"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <div
                    className="h-1 rounded-full"
                    style={{
                      width: `${src.similarity * 100}%`,
                      background: "var(--gold)",
                    }}
                  />
                </div>
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {(src.similarity * 100).toFixed(0)}%
                </span>
              </div>

              {/* Link */}
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs mt-2 inline-block hover:underline"
                style={{ color: "var(--gold)" }}
              >
                View judgement →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Answer Panel — right */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <div
          className="px-8 py-4 border-b flex items-center justify-between"
          style={{ borderColor: "rgba(201, 168, 76, 0.1)" }}
        >
          <span
            className="font-display text-2xl"
            style={{ color: "var(--gold)" }}
          >
            Jurix
          </span>
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: "var(--text-secondary)" }}
          >
            Indian Legal Intelligence
          </span>
        </div>

        {/* Question */}
        <div
          className="px-8 py-5 border-b"
          style={{ borderColor: "rgba(201, 168, 76, 0.1)" }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Question
          </p>
          <p className="text-base font-medium">{result.query}</p>
        </div>

        {/* Answer */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            Answer
          </p>
          <div
            className="text-base leading-8"
            style={{ color: "var(--text)", lineHeight: "2" }}
          >
            {renderAnswer(result.answer)}
          </div>
        </div>

        {/* New question input */}
        <div
          className="px-8 py-4 border-t"
          style={{ borderColor: "rgba(201, 168, 76, 0.1)" }}
        >
          <div className="glass rounded-xl p-1">
            <div className="flex items-center gap-3 px-4 py-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask another question..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "var(--text)" }}
              />
              <button
                onClick={() => {
                  if (input.trim()) {
                    onNewQuery(input.trim());
                    setInput("");
                  }
                }}
                className="text-xs px-4 py-1.5 rounded-lg font-medium"
                style={{
                  background: "var(--gold)",
                  color: "#0A0A0F",
                }}
              >
                Ask
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}