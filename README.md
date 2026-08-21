# portfolio-astro

Sean Pertet's personal portfolio — an Astro rebuild of
[seanleken.github.io](https://seanleken.github.io), built around a "Light IDE"
design system: a light, code-forward aesthetic with a single violet accent,
monospace for anything structural, and no dark mode.

Replaces a Next.js App Router version. React and Framer Motion are gone; the
site ships no framework JavaScript. See [`PLAN.md`](./PLAN.md) for the migration
scope, the decisions behind it, and what was verified.

## Stack

- **Framework:** Astro 7, static output
- **Language:** TypeScript (strict)
- **Styling:** hand-authored CSS — no Tailwind. Design tokens plus one file per
  component/section under `src/styles/`
- **Fonts:** Hanken Grotesk + JetBrains Mono, self-hosted via `@fontsource-variable`
- **Animation:** CSS transitions and one shared IntersectionObserver
- **Blog:** MDX via Content Collections, syntax highlighting through
  `rehype-pretty-code` + Shiki (`github-light`)

## Getting started

```bash
npm install
npm run dev      # http://localhost:4321
```

Or, without tying up the terminal:

```bash
npx astro dev --background
npx astro dev logs -f
npx astro dev stop
```

```bash
npm run build    # static build to dist/
npm run preview  # serve dist/ locally
```

## Writing a blog post

Add a `.mdx` file to `src/content/posts/` with frontmatter:

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

Frontmatter is validated by a zod schema in `src/content.config.ts`, so a typo
fails the build with a real error rather than rendering blank.

`<Compare less="..." more="..." />` and `<Prompt label="...">...</Prompt>` are
available for callouts; fenced code blocks support `` ```ts title="file.ts" ``
for a filename tab. See [`CLAUDE.md`](./CLAUDE.md) for full conventions — and
for the recurring CSS gotcha worth knowing before touching `src/styles/`.

## Deployment

Pushed to `main` → GitHub Actions runs `npm run build` and publishes `dist/`
to GitHub Pages. No environment variables required.

`public/.nojekyll` must stay: without it, Pages' Jekyll processing drops the
`_astro/` directory and the site loads unstyled.
