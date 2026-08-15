export default function Loading() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0F",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "24px",
    }}>
      <span style={{
        fontFamily: "Cormorant Garamond, serif",
        fontSize: "56px",
        fontWeight: 600,
        color: "#C9A84C",
        letterSpacing: "-1px",
      }}>
        Jurix
      </span>

      {/* Animated dots */}
      <div style={{ display: "flex", gap: "8px" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#C9A84C",
              animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <p style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "13px",
        color: "#6B7280",
        letterSpacing: "0.05em",
      }}>
        Searching Indian legal corpus...
      </p>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-12px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}