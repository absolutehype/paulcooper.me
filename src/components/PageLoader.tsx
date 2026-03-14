"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const isInitialized = useRef(false);

  // Hide after initial page load
  useEffect(() => {
    const t = setTimeout(() => {
      setIsLoading(false);
      isInitialized.current = true;
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  // Show on route transitions
  useEffect(() => {
    if (!isInitialized.current) return;
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
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
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            style={{ color: "var(--colour-text-primary)" }}
          >
            {/* Faint track */}
            <circle
              cx="22"
              cy="22"
              r="18"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.12"
            />
            {/* Rotating arc */}
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
    </AnimatePresence>
  );
}
