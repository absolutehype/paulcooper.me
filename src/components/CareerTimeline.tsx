"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
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

function TimelineDot() {
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
      <div
        className="absolute inset-0 rounded-full"
        style={{ border: "1.5px solid var(--colour-text-primary)", opacity: 0.35 }}
      />
      <div
        className="w-[7px] h-[7px] rounded-full"
        style={{ backgroundColor: "var(--colour-text-primary)" }}
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

  return (
    <motion.div
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

      {/* dot — centre at pt + 7.5px (half of 15px motion.div) = ~20px, matching
           the visual centre of the text-xl/leading-snug year label */}
      <div className="flex-shrink-0 w-10 flex justify-center pt-[13px]">
        <TimelineDot />
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
          {/* track */}
          <div
            className="absolute top-0 bottom-0 left-5 md:left-[168px] w-px pointer-events-none"
            style={{ backgroundColor: "var(--colour-text-primary)", opacity: 0.1 }}
          />
          {/* scroll-driven fill */}
          <motion.div
            className="absolute top-0 bottom-0 left-5 md:left-[168px] w-px origin-top pointer-events-none"
            style={{
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
