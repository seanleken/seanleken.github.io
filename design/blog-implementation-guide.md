# Blog implementation guide — Light IDE

Building the blog-post design in Next.js (App Router) with MDX. Covers the pipeline,
the custom blocks that aren't standard markdown, syntax highlighting mapped to the
palette, the sticky TOC, and the reading-progress bar.

> Package APIs in the MDX/remark ecosystem move fairly often. The architecture below
> is stable; check each package's current docs for exact option names before wiring up.

---

## 1. Decision: MDX, not plain markdown

Ordinary prose stays plain markdown. The three custom blocks — comparison callouts,
prompt blocks, and the chrome around code — need components, and MDX is the clean way
to get them. If you want to keep content as pure `.md` for portability, the alternative
is `remark-directive` with `:::compare` / `:::prompt` fences mapped to the same
components; noted at the end.

**Dependencies**

```bash
npm i next-mdx-remote gray-matter reading-time github-slugger \
      rehype-pretty-code shiki rehype-slug rehype-autolink-headings
```

- `next-mdx-remote/rsc` — compile MDX inside a server component
- `gray-matter` — parse frontmatter
- `reading-time` — the "7 min read" estimate
- `rehype-pretty-code` + `shiki` — build-time syntax highlighting
- `rehype-slug` — stable heading ids (uses github-slugger)
- `github-slugger` — generate matching ids for the TOC
- `rehype-autolink-headings` — optional anchor links on headings

---

## 2. Content shape

```
content/
  posts/
    claude-code-effectively.mdx
```

```mdx
---
title: How to use Claude Code effectively as a developer
date: 2026-03-24
tags: [ai, workflow]
excerpt: Practical strategies for getting the most out of AI-assisted development.
cover: /covers/claude-code.png
---

Claude Code has changed how I approach software development...

## Invest in a good CLAUDE.md

The single highest-leverage thing you can do is write a `CLAUDE.md`...

```ts title="CLAUDE.md"
## Commands
npm run dev      # start dev server
```

<Compare
  less="Improve the blog page"
  more="Add a reading-time estimate to each blog card. Calculate it from the excerpt word count."
/>

<Prompt label="exploration prompt">
  Read `src/app/_components/hero.tsx` and `src/app/page.tsx`, then tell me how the Hero component is used.
</Prompt>
```

Note the fence uses ` ```ts title="CLAUDE.md" ` — `rehype-pretty-code` reads that
`title=` and emits it as a caption you'll style into the filename tab.

---

## 3. The post page (server component)

`app/writing/[slug]/page.tsx`

```tsx
import fs from "node:fs/promises";
import path from "node:path";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import GithubSlugger from "github-slugger";

import { mdxComponents } from "@/components/mdx";
import { rehypePrettyCodeOptions } from "@/lib/pretty-code";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

import Toc from "@/components/toc";
import ReadingProgress from "@/components/reading-progress";

type Frontmatter = {
  title: string; date: string; tags: string[]; excerpt: string; cover?: string;
};

// Pull `## ` headings straight from the raw source so the TOC ids match rehype-slug.
function extractHeadings(raw: string) {
  const slugger = new GithubSlugger();
  const lines = raw.split("\n").filter((l) => l.startsWith("## "));
  return lines.map((l) => {
    const text = l.replace(/^##\s+/, "").trim();
    return { text, slug: slugger.slug(text) };
  });
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const file = path.join(process.cwd(), "content/posts", `${params.slug}.mdx`);
  const raw = await fs.readFile(file, "utf8");

  const headings = extractHeadings(raw);
  const minutes = readingTime(raw).text; // "7 min read"

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: raw,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, rehypePrettyCodeOptions],
        ],
      },
    },
    components: mdxComponents,
  });

  return (
    <>
      <ReadingProgress />
      <div className="shell">
        <header className="article-head">
          <a className="back" href="/writing">← back to writing</a>
          <div className="meta">
            <b>{frontmatter.date.replaceAll("-", ".")}</b> · {minutes} · {frontmatter.tags.join(" / ")}
          </div>
          <h1>{frontmatter.title}</h1>
          {/* cover image / placeholder */}
        </header>

        <div className="layout">
          <article className="article prose">{content}</article>
          <Toc headings={headings} />
        </div>
      </div>
    </>
  );
}
```

`generateStaticParams` reads the `content/posts` dir and returns `{ slug }` for each
file so posts are statically generated.

---

## 4. Syntax theme mapped to the palette

`lib/pretty-code.ts`

```ts
import type { Options } from "rehype-pretty-code";

export const rehypePrettyCodeOptions: Options = {
  // Start with a light theme, then override token colors in CSS (below) to hit
  // the exact violet / amber / green. Or pass a custom Shiki theme object here.
  theme: "github-light",
  keepBackground: false, // let our own CSS set the surface background
};
```

`rehype-pretty-code` inlines per-token colors from the theme. To force the palette
exactly, either supply a **custom Shiki theme** (a small JSON mapping scopes to your
hex values) as `theme`, or keep `github-light` and accept close-enough colors. The
container chrome is all yours via CSS:

```css
/* the figcaption rehype-pretty-code emits from title="..." becomes the tab */
figure[data-rehype-pretty-code-figure] {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 11px;
  overflow: hidden;
  margin: 24px 0;
}
figcaption[data-rehype-pretty-code-title] {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--ink);
  padding: 9px 14px;
  background: var(--surface-2);
  border-bottom: 1px solid var(--line);
}
figure[data-rehype-pretty-code-figure] pre {
  margin: 0;
  padding: 15px 18px;
  background: var(--surface);
  font-family: var(--mono);
  font-size: 13.5px;
  line-height: 1.8;
  overflow-x: auto;
}
```

For the little `TS` / `MD` badge in the tab, `rehype-pretty-code` sets
`data-language` on the figcaption — render it with a `::before` or a small plugin.

---

## 5. Code block copy button

Map `pre` to a tiny client component. It wraps the highlighted `<pre>` and adds the
copy control; the filename tab is the sibling figcaption from section 4.

`components/pre.tsx`

```tsx
"use client";
import { useRef, useState } from "react";

export function Pre(props: React.HTMLAttributes<HTMLPreElement>) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = ref.current?.innerText ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="cb-wrap">
      <button className="copy" onClick={copy} aria-label="Copy code">
        {copied ? "Copied" : "Copy"}
      </button>
      <pre ref={ref} {...props} />
    </div>
  );
}
```

`.cb-wrap { position: relative }` and `.copy { position: absolute; top: 8px; right: 10px }`.

---

## 6. Callout and prompt components

`components/mdx.tsx`

```tsx
import { Pre } from "./pre";

function Compare({ less, more }: { less: string; more: string }) {
  return (
    <div className="cmp">
      <div className="card less">
        <div className="tag">✗ less effective</div>
        <div className="ex">{less}</div>
      </div>
      <div className="card more">
        <div className="tag">✓ more effective</div>
        <div className="ex">{more}</div>
      </div>
    </div>
  );
}

function Prompt({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="prompt">
      {label && <span className="tag">{label}</span>}
      {children}
    </div>
  );
}

export const mdxComponents = {
  pre: Pre,
  Compare,
  Prompt,
};
```

The `.cmp`, `.prompt`, and inline-code (`.ic`) CSS is already in the mockup's
stylesheet — lift it directly. Map markdown inline `code` to `.ic` via a `code`
component or a global `.prose code` rule.

---

## 7. Auto-numbered section headings

Pure CSS counters — no plugin needed. Numbers stay correct if you reorder sections.

```css
.prose { counter-reset: section; }
.prose h2 { counter-increment: section; display: flex; gap: 14px; align-items: baseline; }
.prose h2::before {
  content: counter(section, decimal-leading-zero);
  font-family: var(--mono);
  font-size: 14px;
  color: var(--accent);
  font-weight: 500;
}
```

`decimal-leading-zero` gives you `01, 02, …`. To leave "Conclusion" unnumbered,
author it as `## Conclusion {.no-number}` (needs `rehype-mdx-import-media`/attribute
support, or just make it an `<h2 className="no-number">` in MDX) and add:

```css
.prose h2.no-number { counter-increment: none; }
.prose h2.no-number::before { content: none; }
```

---

## 8. Table of contents with scroll-spy

`components/toc.tsx`

```tsx
"use client";
import { useEffect, useState } from "react";

type Heading = { text: string; slug: string };

export default function Toc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.slug);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [headings]);

  return (
    <aside className="toc" aria-label="On this page">
      <div className="lbl">On this page</div>
      <ul>
        {headings.map((h, i) => (
          <li key={h.slug}>
            <a
              href={`#${h.slug}`}
              className={active === h.slug ? "active" : ""}
            >
              {String(i + 1).padStart(2, "0")} · {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
```

The `rootMargin` band is what makes "which section am I reading" feel right — it marks
a heading active once it's in the upper-middle of the viewport, not the moment it
touches the top. Tune to taste.

---

## 9. Reading progress bar

`components/reading-progress.tsx`

```tsx
"use client";
import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="progress" style={{ width: `${pct}%` }} />;
}
```

`.progress { position: fixed; top: 0; left: 0; height: 3px; background: var(--accent); z-index: 60 }`.

---

## 10. Tokens

Put the `:root` custom properties from the mockup into `app/globals.css` (or a
`tokens.css` imported once). Both the landing page and the blog then read from the same
variables, so a palette change is one edit. The `--sx-*` syntax variables only matter if
you go the custom-Shiki-theme route; with `github-light` they're unused.

---

## 11. File tree

```
app/
  globals.css              # tokens + all the mockup CSS
  writing/
    page.tsx               # post index (list)
    [slug]/
      page.tsx             # the post page (section 3)
components/
  mdx.tsx                  # component map: pre, Compare, Prompt (section 6)
  pre.tsx                  # copy-button code wrapper (section 5)
  toc.tsx                  # scroll-spy TOC (section 8)
  reading-progress.tsx     # progress bar (section 9)
lib/
  pretty-code.ts           # rehype-pretty-code options (section 4)
  posts.ts                 # listing + frontmatter helpers
content/
  posts/*.mdx
```

---

## Keeping content as plain `.md` (alternative)

If you'd rather not author MDX, swap MDX components for `remark-directive` and write:

```md
:::compare
- less: Improve the blog page
- more: Add a reading-time estimate to each blog card...
:::

:::prompt{label="exploration prompt"}
Read `src/app/_components/hero.tsx`...
:::
```

Add `remark-directive` to the remark plugins and a small custom remark plugin that turns
`containerDirective` nodes named `compare` / `prompt` into the same HTML the components
produce. Slightly more plumbing, but content stays pure markdown.

---

## Build order

1. Tokens + globals, confirm one post renders as plain prose.
2. `rehype-pretty-code` + the figure/figcaption CSS — code blocks and the filename tab.
3. `Pre` copy button.
4. `Compare` + `Prompt` components.
5. CSS-counter numbering.
6. `Toc` + `ReadingProgress` (the two client widgets).
7. Reading time in the header.

Each step is independently verifiable — exactly the small-steps approach the article
itself argues for.
