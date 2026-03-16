import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ExperienceEntry = {
  slug: string;
  title: string;
  company: string;
  startYear: number;
  endYear: number | null;
  durationYears: number;
  /** Fraction 0–1 relative to the longest role in the set — used for proportional spacing */
  durationFraction: number;
  contentHtml: string;
  order: number;
};

/**
 * Minimal markdown → HTML converter that handles paragraphs and unordered lists.
 * Sufficient for the structured CV content we store in the markdown files.
 */
function markdownToHtml(markdown: string): string {
  const blocks = markdown.trim().split(/\n{2,}/);
  return blocks
    .map((block) => {
      const lines = block.trim().split("\n");
      const isListBlock = lines.some((l) => l.trim().startsWith("- "));

      if (isListBlock) {
        const items = lines
          .filter((l) => l.trim().startsWith("- "))
          .map((l) => `<li>${l.trim().slice(2)}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }

      const text = lines.join(" ").trim();
      return text ? `<p>${text}</p>` : "";
    })
    .filter(Boolean)
    .join("");
}

export function getExperience(locale = "en"): ExperienceEntry[] {
  const localeDir = path.join(process.cwd(), "content/experience", locale);
  const fallbackDir = path.join(process.cwd(), "content/experience/en");
  const dir = fs.existsSync(localeDir) ? localeDir : fallbackDir;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const currentYear = new Date().getFullYear();

  const raw = files.map((file) => {
    const source = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(source);

    const endYear: number | null = data.endYear ?? null;
    const durationYears = (endYear ?? currentYear) - (data.startYear as number);

    return {
      slug: file.replace(".md", ""),
      title: data.title as string,
      company: data.company as string,
      startYear: data.startYear as number,
      endYear,
      durationYears,
      durationFraction: 0, // filled below
      contentHtml: markdownToHtml(content),
      order: data.order as number,
    };
  });

  const sorted = raw.sort((a, b) => a.order - b.order);
  const maxDuration = Math.max(...sorted.map((e) => e.durationYears), 1);

  return sorted.map((e) => ({
    ...e,
    durationFraction: e.durationYears / maxDuration,
  }));
}
