"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useInView,
} from "motion/react";
import type { ExperienceEntry } from "@/lib/experience";

// ─── helpers ────────────────────────────────────────────────────────────────

function formatDuration(years: number): string {
  if (years < 1) return "< 1 year";
  return `${years} year${years !== 1 ? "s" : ""}`;
}

function formatRange(startYear: number, endYear: number | null): string {
  return endYear ? `${startYear}–${endYear}` : `${startYear}–Present`;
}

// ─── dot ────────────────────────────────────────────────────────────────────

function TimelineDot({ isActive }: { isActive: boolean }) {
  return (
    <motion.div
      // Explicit 15×15 size so the IntersectionObserver has a real bounding box
      // and the outer ring (inset-0) fills it correctly.
      className="relative flex items-center justify-center w-[15px] h-[15px]"
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, type: "spring", stiffness: 180, damping: 16 }}
      viewport={{ amount: 0.5 }}
    >
      {/* Outer ring — pulses when the timeline has scrolled past this entry */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: "1.5px solid var(--colour-text-primary)" }}
        animate={
          isActive
            ? { opacity: [0.3, 0.52, 0.3], scale: [1, 1.28, 1] }
            : { opacity: 0.3, scale: 1 }
        }
        transition={
          isActive
            ? { duration: 3.2, ease: [0.45, 0, 0.55, 1], repeat: Infinity, repeatType: "loop" }
            : { duration: 0.7, ease: "easeOut" }
        }
      />
      {/* Inner dot — brightens when active */}
      <motion.div
        className="w-[7px] h-[7px] rounded-full"
        style={{ backgroundColor: "var(--colour-text-primary)" }}
        animate={{ opacity: isActive ? 1 : 0.6 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}

// ─── content renderer ────────────────────────────────────────────────────────
/*
 * Content is always sourced from local markdown files authored by the site
 * owner, never from user-supplied input, so rendering pre-processed HTML
 * here is safe. The markdownToHtml function in lib/experience.ts only emits
 * <p>, <ul> and <li> tags — no script/iframe/event-handler attributes.
 */

function EntryContent({ html }: { html: string }) {
  return (
    <div
      className="tl-prose text-md md:text-lg leading-relaxed"
      style={{ color: "var(--colour-text-primary)", opacity: 0.82 }}
      // Content is trusted: parsed from owner-authored markdown via
      // markdownToHtml() which emits only <p>/<ul>/<li> — no user input.
      dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
    />
  );
}

// ─── entry ──────────────────────────────────────────────────────────────────

function TimelineEntry({ entry }: { entry: ExperienceEntry }) {
  const bottomPad = Math.round(72 + entry.durationFraction * 56);

  // Dot becomes "active" (pulsing) once the entry's top edge has crossed
  // 45% from the top of the viewport — i.e. the timeline fill has reached it.
  const ref = useRef<HTMLDivElement>(null);
  const isActive = useInView(ref, { margin: "0px 0px -55% 0px" });

  return (
    <motion.div
      ref={ref}
      className="flex"
      style={{ paddingBottom: bottomPad }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.12 }}
    >
      {/* year label (desktop) */}
      <div className="hidden md:block flex-shrink-0 w-[148px] pr-8 text-right">
        <span
          className="sticky block text-xl leading-snug tabular-nums"
          style={{ top: "7rem", color: "var(--colour-text-primary)", opacity: 0.6 }}
        >
          {entry.startYear}
        </span>
      </div>

      {/* dot — centre aligns with the cap-height of the text-xl year label.
           calc(1.2rem - 7.5px): 1.2rem ≈ visual cap-height offset for text-xl/leading-snug
           in Cormorant Garamond; 7.5px = half the 15px dot. */}
      <div className="flex-shrink-0 w-10 flex justify-center" style={{ paddingTop: "calc(1.2rem - 7.5px)" }}>
        <TimelineDot isActive={isActive} />
      </div>

      {/* content */}
      <div className="flex-1 min-w-0 pl-6">
        <p
          className="md:hidden text-sm mb-3 tabular-nums"
          style={{ color: "var(--colour-text-primary)", opacity: 0.45 }}
        >
          {formatRange(entry.startYear, entry.endYear)}
        </p>

        <div className="mb-5">
          <h3 className="text-xl md:text-2xl leading-snug">
            {entry.title}
          </h3>
          <div
            className="flex flex-wrap items-baseline gap-x-2 mt-1.5 text-sm md:text-base"
            style={{ color: "var(--colour-text-primary)", opacity: 0.6 }}
          >
            <span>{entry.company}</span>
            <span aria-hidden>·</span>
            <span className="tabular-nums">
              {formatRange(entry.startYear, entry.endYear)}
            </span>
            <span aria-hidden>·</span>
            <span>{formatDuration(entry.durationYears)}</span>
          </div>
        </div>

        <EntryContent html={entry.contentHtml} />
      </div>
    </motion.div>
  );
}

// ─── main ────────────────────────────────────────────────────────────────────

export function CareerTimeline({ entries, heading = "Experience" }: { entries: ExperienceEntry[]; heading?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 18,
    restDelta: 0.001,
  });

  return (
    <section className="w-full border-t border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] transition">
      <div className="container max-w-[960px] mx-auto px-10 md:px-20 py-16 md:py-24 lg:py-32">

        <motion.h2
          className="text-2xl md:text-4xl mb-16 md:mb-20 text-center"
          style={{ fontStyle: "italic", color: "var(--colour-text-primary)" }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ amount: 0.5 }}
        >
          {heading}
        </motion.h2>

        <div ref={containerRef} className="relative">
          {/* track — on mobile: left-5 (1.25rem = centre of the w-10 dot column).
               on desktop: 148px (year label) + half of w-10 (1.25rem) = 148px + 1.25rem,
               ensuring the line sits at the exact horizontal centre of the dot. */}
          <div
            className="absolute top-0 bottom-0 w-px pointer-events-none md:hidden"
            style={{ left: "1.25rem", backgroundColor: "var(--colour-text-primary)", opacity: 0.1 }}
          />
          <div
            className="absolute top-0 bottom-0 w-px pointer-events-none hidden md:block"
            style={{ left: "calc(148px + 1.25rem)", backgroundColor: "var(--colour-text-primary)", opacity: 0.1 }}
          />
          {/* scroll-driven fill */}
          <motion.div
            className="absolute top-0 bottom-0 w-px origin-top pointer-events-none md:hidden"
            style={{
              left: "1.25rem",
              backgroundColor: "var(--colour-text-primary)",
              opacity: 0.55,
              scaleY: lineScaleY,
            }}
          />
          <motion.div
            className="absolute top-0 bottom-0 w-px origin-top pointer-events-none hidden md:block"
            style={{
              left: "calc(148px + 1.25rem)",
              backgroundColor: "var(--colour-text-primary)",
              opacity: 0.55,
              scaleY: lineScaleY,
            }}
          />

          {entries.map((entry) => (
            <TimelineEntry key={entry.slug} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
