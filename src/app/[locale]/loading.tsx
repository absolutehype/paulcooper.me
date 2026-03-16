/**
 * Next.js Suspense fallback — shown immediately when navigating to this route,
 * before React hydrates. Renders a CSS-animated spinner matching PageLoader's
 * appearance so there's no visible gap between navigation and PageLoader mounting.
 */
export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--colour-bg)",
      }}
    >
      <div style={{ position: "relative", width: 44, height: 44 }}>
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          style={{ color: "var(--colour-text-primary)" }}
        >
          <style>{`
            @keyframes loading-cover-spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
          <circle
            cx="22"
            cy="22"
            r="18"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.12"
          />
          <g
            style={{
              transformBox: "fill-box",
              transformOrigin: "50% 50%",
              animation: "loading-cover-spin 1.4s linear infinite",
            }}
          >
            {/* strokeDasharray: ~25% arc (28px dash of 113px circumference) */}
            <circle
              cx="22"
              cy="22"
              r="18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="28 85"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
