"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

type Phase = "spinner" | "flag" | "idle";

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
          {/* Union Jack */}
          <rect x="4" y="4" width="36" height="36" fill="#012169" />
          {/* White saltire (×) */}
          <rect
            x="4" y="20" width="36" height="4"
            fill="white"
            transform="rotate(45 22 22)"
          />
          <rect
            x="4" y="20" width="36" height="4"
            fill="white"
            transform="rotate(-45 22 22)"
          />
          {/* Red saltire (×, narrower, centred) */}
          <rect
            x="4" y="21" width="36" height="2"
            fill="#C8102E"
            transform="rotate(45 22 22)"
          />
          <rect
            x="4" y="21" width="36" height="2"
            fill="#C8102E"
            transform="rotate(-45 22 22)"
          />
          {/* White cross (+) */}
          <rect x="4" y="18.5" width="36" height="7" fill="white" />
          <rect x="18.5" y="4" width="7" height="36" fill="white" />
          {/* Red cross (+) */}
          <rect x="4" y="20" width="36" height="4" fill="#C8102E" />
          <rect x="20" y="4" width="4" height="36" fill="#C8102E" />
        </g>
      )}

      {locale === "fr" && (
        <g clipPath={`url(#${clipId})`}>
          {/* French tricolour — vertical */}
          <rect x="4" y="4" width="36" height="36" fill="#ED2939" />
          <rect x="4" y="4" width="24" height="36" fill="white" />
          <rect x="4" y="4" width="12" height="36" fill="#002395" />
        </g>
      )}

      {locale === "es" && (
        <g clipPath={`url(#${clipId})`}>
          {/* Spanish flag — horizontal bands */}
          <rect x="4" y="4" width="36" height="36" fill="#AA151B" />
          <rect x="4" y="13" width="36" height="18" fill="#F1BF00" />
        </g>
      )}
    </svg>
  );
}

export function PageLoader() {
  const [phase, setPhase] = useState<Phase>("spinner");
  const [flagLocale, setFlagLocale] = useState("en");
  const pathname = usePathname();
  const prevLocale = useRef("");
  const isInitialized = useRef(false);

  // Initial page load — show spinner then hide
  useEffect(() => {
    prevLocale.current = getLocale(pathname);
    const t = setTimeout(() => {
      setPhase("idle");
      isInitialized.current = true;
    }, 1400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Route / locale transitions
  useEffect(() => {
    if (!isInitialized.current) return;

    const newLocale = getLocale(pathname);
    const isLocaleChange = prevLocale.current !== newLocale;
    prevLocale.current = newLocale;

    if (isLocaleChange) {
      // Locale switch: spinner → flag → hide
      setFlagLocale(newLocale);
      setPhase("spinner");
      const t1 = setTimeout(() => setPhase("flag"), 650);
      const t2 = setTimeout(() => setPhase("idle"), 1250);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    } else {
      // Regular route change: spinner → hide
      setPhase("spinner");
      const t = setTimeout(() => setPhase("idle"), 700);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  return (
    <AnimatePresence>
      {phase !== "idle" && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
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
          {/* Fixed-size wrapper so spinner and flag can crossfade in place */}
          <div style={{ position: "relative", width: 44, height: 44 }}>
            <AnimatePresence initial={false}>
              {phase === "spinner" && (
                <motion.div
                  key="spinner"
                  style={{ position: "absolute", inset: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    style={{ color: "var(--colour-text-primary)" }}
                  >
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
                      stroke="currentColor"
                      strokeWidth="1"
                      opacity="0.12"
                    />
                    <motion.g
                      style={{ transformOrigin: "22px 22px" }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1.4,
                        ease: "linear",
                        repeat: Infinity,
                      }}
                    >
                      <motion.circle
                        cx="22"
                        cy="22"
                        r="18"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0.2 }}
                        animate={{ pathLength: [0.15, 0.75, 0.15] }}
                        transition={{
                          duration: 1.4,
                          ease: "easeInOut",
                          repeat: Infinity,
                        }}
                      />
                    </motion.g>
                  </svg>
                </motion.div>
              )}

              {phase === "flag" && (
                <motion.div
                  key="flag"
                  style={{ position: "absolute", inset: 0 }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <FlagCircle locale={flagLocale} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
