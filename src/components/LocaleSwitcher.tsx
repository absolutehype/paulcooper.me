"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";

interface LocaleLinkProps {
  locale: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Renders a locale switch link that immediately shows a full-screen cover
 * on click — before React processes the navigation. The cover lives in the
 * old React tree and stays visible until the new tree commits (by which
 * point PageLoader is already mounted and covering the content).
 *
 * This solves the React 18 startTransition problem: the router keeps the
 * old UI visible and swaps atomically to the new content, so loading.tsx
 * never has a chance to show. The synchronous state update here forces the
 * cover to paint on the same frame as the click.
 */
export function LocaleLink({ locale, children, className }: LocaleLinkProps) {
  const router = useRouter();
  const [covering, setCovering] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCovering(true);
    // Defer navigation one frame so the cover paints first
    requestAnimationFrame(() => {
      router.push("/", { locale });
    });
  };

  return (
    <>
      {covering && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            backgroundColor: "var(--colour-bg)",
          }}
        />
      )}
      <button onClick={handleClick} className={className}>
        {children}
      </button>
    </>
  );
}
