# seanleken.github.io

Sean Pertet's personal portfolio — a Next.js site built around a "Light IDE"
design system: a light, code-forward aesthetic with a single violet accent,
monospace for anything structural, and no dark mode. Positions Sean as a senior
full-stack TypeScript engineer, with cloud/e-commerce experience as background
context rather than the headline.

Statically exported (`output: "export"`) and deployed to GitHub Pages.

## Stack

- **Framework:** Next.js (App Router), React 19, TypeScript (strict)
- **Styling:** hand-authored CSS — no Tailwind. Design tokens + one file per
  component/section under `src/app/styles/`
- **Animation:** Framer Motion, gated behind `useReducedMotion()`
- **Blog:** MDX (`content/posts/*.mdx`), compiled at request time with
  `next-mdx-remote`, syntax highlighting via `rehype-pretty-code` + Shiki
  (`github-light` theme), heading slugs via `rehype-slug`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000, Turbopack
```

```bash
npm run build    # static export to out/
npm run preview  # serve out/ locally to sanity-check the export
```

## Project structure

```
src/
  app/
    layout.tsx            # Fonts (Hanken Grotesk + JetBrains Mono), nav, footer
    page.tsx                # Home page
    globals.css              # Imports tokens.css + styles/layout + styles/components
    styles/
      tokens.css              # CSS custom properties — the whole palette, one accent
      layout/                  # Nav, footer, base reset
      components/              # One file per section (hero, projects, article, ...)
    _components/             # React components
      mdx/                     # MDX component map, code-block copy button, TOC, reading progress
    projects/page.tsx
    writing/
      page.tsx                 # Post index
      [slug]/page.tsx           # Individual post (MDX → HTML, SSG)
  lib/
    posts.ts                 # Reads content/posts/*.mdx — frontmatter + reading time
    headings.ts                # TOC heading extraction
    pretty-code.ts              # Shiki/rehype-pretty-code config
    constants.ts                 # Site metadata, contact info
content/posts/               # Blog content (MDX)
public/assets/                # Images
design/                        # Redesign brief + mockups (reference, not shipped)
```

## Writing a blog post

Add a `.mdx` file to `content/posts/` with frontmatter:

```mdx
---
title: "Post title"
date: "2026-01-01"
tags: ["tag-one", "tag-two"]
excerpt: "One or two sentences for the post index and previews."
cover: "/assets/blog/your-post/cover.jpg"
---

<Lead id="intro">
Opening paragraph.
</Lead>

## A section heading

Body copy. `##` headings are numbered automatically — title the last one
exactly `Conclusion` to get the unnumbered treatment.
```

`<Compare less="..." more="..." />` and `<Prompt label="...">...</Prompt>` are
available for callouts; fenced code blocks support `` ```ts title="file.ts" ``
for a filename tab. See `CLAUDE.md` for the full conventions (and the
recurring CSS gotcha worth knowing before touching `styles/`).

## Deployment

Deployed to GitHub Pages via `.github/workflows/deploy.yml`: pushing to `main`
runs `npm run build` (static export to `out/`) and publishes it with
`actions/deploy-pages`. No environment variables are required.

`next.config.ts` sets `output: "export"` and `images.unoptimized: true` — there's
no server at request time, so `next/image` serves files at their original size
instead of transforming them on demand. Keep source images sized close to their
real display size (see the Images note in `CLAUDE.md`).
