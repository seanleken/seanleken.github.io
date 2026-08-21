import type { MarkdownHeading } from "astro";

export type Heading = {
  text: string;
  slug: string;
  numbered: boolean;
};

/**
 * Turns Astro's heading list into the TOC's shape.
 *
 * Astro already extracts headings (with slugs identical to the Next version's
 * github-slugger output), so this only re-applies the two conventions the
 * markup depends on: a synthetic "Introduction" entry — the <Lead id="intro">
 * block is a component, so it never appears as a heading — and "Conclusion"
 * rendered unnumbered.
 */
export function toTocHeadings(headings: MarkdownHeading[]): Heading[] {
  return [
    { text: "Introduction", slug: "intro", numbered: false },
    ...headings
      .filter((h) => h.depth === 2)
      .map((h) => ({
        text: h.text,
        slug: h.slug,
        numbered: h.text !== "Conclusion",
      })),
  ];
}
