"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

type Phase = "spinner" | "flag" | "idle";

// Module-level — survives React remounts, tracks locale across locale switches.
// When the [locale] layout remounts (new dynamic segment), this lets us detect
// that the previous locale was different from the current one.
let prevLocaleGlobal = "";

function getLocale(pathname: string): string {
  const match = pathname.match(/^\/(fr|es)(\/|$)/);
  return match ? match[1] : "en";
}

function FlagCircle({ locale }: { locale: string }) {
  const clipId = `loader-flag-clip-${locale}`;
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      style={{ color: "var(--colour-text-primary)" }}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="22" cy="22" r="18" />
        </clipPath>
      </defs>

      {/* Faint track — matches the spinner */}
      <circle
        cx="22"
        cy="22"
        r="18"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.12"
      />

      {locale === "en" && (
        <g clipPath={`url(#${clipId})`}>
          {/* White field (base) */}
          <rect x="0" y="0" width="44" height="44" fill="white" />
          {/*
           * Paths ported from source SVG (25 000×25 000 space, y-up).
           * Combined transform → 44×44 px:
           *   x_out =  0.00176 · x_path
           *   y_out = −0.00176 · y_path + 44
           */}
          <g transform="matrix(0.00176,0,0,-0.00176,0,44)">
            {/* Blue field — 8 triangles */}
            <path d="m 10365.2,24970.5 v -8916 L 346.258,25000 Z" fill="#273376" />
            <path d="M -3125,22896.9 5760.08,15343.6 H -3125 Z" fill="#273376" />
            <path d="M -3125,9699.2 V 783.301 L 6893.93,9728.8 Z" fill="#273376" />
            <path d="M 10365.2,7625.7 1480.11,72.4023 h 8885.09 z" fill="#273376" />
            <path d="m 14623.7,24970.5 v -8916 l 10019,8945.5 z" fill="#273376" />
            <path d="m 28113.9,22896.9 -8885.1,-7553.3 h 8885.1 z" fill="#273376" />
            <path d="M 14623.7,101.898 V 9017.9 L 24642.7,72.4023 Z" fill="#273376" />
            {/* Red cross */}
            <path
              d="M 14016.3,14662.3 V 25000 H 10921.7 V 14662.3 H -3113.91 V 10337.7 H 10921.7 V 0 h 3094.6 V 10337.7 H 28125 v 4324.6 H 14016.3"
              fill="#CC2628"
            />
            {/* Red counter-changed saltire — 4 offset slivers */}
            <path d="M 8610.09,15343.6 -3100.66,25000 V 23876.9 L 7195.33,15343.6 h 1414.76" fill="#CC2628" />
            <path d="M 44.8789,72.4023 10340.8,8605.6 V 9728.8 L -1369.89,72.4023 H 44.8789" fill="#CC2628" />
            <path d="M 28089.6,23876.9 V 25000 L 16378.8,15343.6 h 1414.8 l 10296,8533.3" fill="#CC2628" />
            <path d="M 16378.8,9728.8 28089.6,72.4023 V 1195.5 l -10296,8533.3 h -1414.8" fill="#CC2628" />
            {/* Final blue triangle — drawn over red to complete counter-change in lower-right */}
            <path d="m 28113.9,2175.4 -8885.1,7553.4 h 8885.1 z" fill="#273376" />
          </g>
        </g>
      )}

      {locale === "fr" && (
        <g clipPath={`url(#${clipId})`}>
          {/* French tricolour — vertical */}
          <rect x="0" y="0" width="44" height="44" fill="#ED2939" />
          <rect x="0" y="0" width="29" height="44" fill="white" />
          <rect x="0" y="0" width="15" height="44" fill="#002395" />
        </g>
      )}

      {locale === "es" && (
        <g clipPath={`url(#${clipId})`}>
          {/* Spanish flag — horizontal bands */}
          <rect x="0" y="0" width="44" height="44" fill="#AA151B" />
          <rect x="0" y="13" width="44" height="18" fill="#F1BF00" />
        </g>
      )}
    </svg>
  );
}

export function PageLoader() {
  const pathname = usePathname();
  const locale = getLocale(pathname);

  // Detect cross-locale mount at render time (before effects), using the
  // module-level variable which persists across layout remounts.
  const prevLocaleAtMount = prevLocaleGlobal;
  const isCrossLocaleMount = prevLocaleAtMount !== "" && prevLocaleAtMount !== locale;

  const [phase, setPhase] = useState<Phase>("spinner");
  const [flagLocale, setFlagLocale] = useState(locale);
  const isInitialized = useRef(false);

  // Mount effect: commit global locale, run phase sequence.
  useEffect(() => {
    const savedGlobal = prevLocaleGlobal;
    prevLocaleGlobal = locale;

    if (isCrossLocaleMount) {
      // Locale switch: spinner → flag → idle
      setFlagLocale(locale);
      const t1 = setTimeout(() => setPhase("flag"), 600);
      const t2 = setTimeout(() => {
        setPhase("idle");
        isInitialized.current = true;
      }, 1350);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        prevLocaleGlobal = savedGlobal; // restore for React StrictMode double-invoke
      };
    } else {
      // Initial load or same-locale hard navigation
      const t = setTimeout(() => {
        setPhase("idle");
        isInitialized.current = true;
      }, 1400);
      return () => {
        clearTimeout(t);
        prevLocaleGlobal = savedGlobal;
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Within-locale client navigations (layout persists — pathname changes in place).
  useEffect(() => {
    if (!isInitialized.current) return;
    setPhase("spinner");
    const t = setTimeout(() => setPhase("idle"), 700);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {phase !== "idle" && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.42, ease: "easeInOut" }}
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
          {/*
           * Icon wrapper — scales in with a soft spring overshoot on enter,
           * and gently scales back out on exit. Spinner and flag both inherit
           * this, so the whole icon breathes in/out with the overlay.
           */}
          <motion.div
            style={{ position: "relative", width: 44, height: 44 }}
            variants={{
              initial: { scale: 0.93 },
              animate: {
                scale: 1,
                transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
              },
              exit: {
                scale: 0,
                transition: { duration: 0.38, ease: [0.4, 0, 0.6, 1] },
              },
            }}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <AnimatePresence initial={false}>
              {phase === "spinner" && (
                <motion.div
                  key="spinner"
                  style={{ position: "absolute", inset: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                >
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    style={{ color: "var(--colour-text-primary)" }}
                  >
                    <style>{`
                      @keyframes page-loader-spin {
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
                    {/* CSS animation for rotation — immune to Framer Motion hydration/initial={false} */}
                    <g style={{
                      transformBox: "fill-box",
                      transformOrigin: "50% 50%",
                      animation: "page-loader-spin 1.4s linear infinite",
                    }}>
                      <motion.circle
                        cx="22"
                        cy="22"
                        r="18"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        animate={{ pathLength: [0.15, 0.75, 0.15] }}
                        transition={{
                          duration: 1.4,
                          ease: "easeInOut",
                          repeat: Infinity,
                        }}
                      />
                    </g>
                  </svg>
                </motion.div>
              )}

              {phase === "flag" && (
                <motion.div
                  key="flag"
                  style={{ position: "absolute", inset: 0 }}
                  initial={{ opacity: 0, scale: 0.72 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.38, ease: [0.34, 1.56, 0.64, 1] },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.92,
                    transition: { duration: 0.55, ease: "easeInOut" },
                  }}
                >
                  <FlagCircle locale={flagLocale} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
