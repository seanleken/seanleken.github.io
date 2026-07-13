import GithubSlugger from "github-slugger";

export type Heading = {
  text: string;
  slug: string;
  numbered: boolean;
};

/**
 * Pulls level-2 headings straight from the raw MDX source so the TOC ids
 * match rehype-slug's output (same slugger). Skips fenced code blocks so a
 * `## Commands` line inside an example ```md fence isn't mistaken for a
 * real section heading. "Introduction" is synthesized from the always-present
 * <Lead id="intro"> block; "Conclusion" is present but rendered unnumbered.
 */
export function extractHeadings(raw: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [{ text: "Introduction", slug: "intro", numbered: false }];

  let inFence = false;
  for (const line of raw.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (!inFence && line.startsWith("## ")) {
      const text = line.replace(/^##\s+/, "").trim();
      headings.push({
        text,
        slug: slugger.slug(text),
        numbered: text !== "Conclusion",
      });
    }
  }

  return headings;
}
