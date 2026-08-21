# seanleken.github.io

Personal portfolio and blog for Sean Pertet, a senior full-stack TypeScript
engineer based in Nairobi. Static site built with Astro and served from GitHub
Pages at **[seanleken.github.io](https://seanleken.github.io)**.

The design is a light, code-forward system: one violet accent, monospace for
anything structural (labels, dates, tags, filenames), sentence case throughout,
and no dark mode.

## Stack

- **Astro**, static output
- **TypeScript**, strict
- **Hand-authored CSS** — design tokens plus one file per component or section.
  No Tailwind.
- **Hanken Grotesk** and **JetBrains Mono**, self-hosted via `@fontsource`
- **MDX** blog through content collections, with syntax highlighting from
  `rehype-pretty-code` and Shiki

No client-side framework. Pages render to HTML at build time; four small scripts
handle the mobile nav, table of contents, reading progress, and the code-block
copy buttons. Images are resized and converted to WebP during the build.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at <http://localhost:4321>. To run it without tying up the
terminal:

```bash
npx astro dev --background
npx astro dev logs -f
npx astro dev stop
```

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run og` | Regenerate the social preview image |

## Project structure

```
src/
  layouts/Base.astro     # <head> metadata, nav, footer
  pages/                  # One file per route
  components/              # Section components; mdx/ holds MDX-only ones
  styles/                   # tokens.css, then layout/ and components/
  content/posts/             # Blog posts (MDX)
  assets/                     # Images optimised at build time
  consts.ts                    # Site metadata and contact details
public/                    # Served as-is: favicons, manifest, robots.txt
```

Images that should be optimised go in `src/assets/` and are imported. Only files
needing a fixed, absolute URL belong in `public/`.

## Writing a post

Add an `.mdx` file to `src/content/posts/`:

```mdx
---
title: "Post title"
date: "2026-01-01"
tags: ["tag-one", "tag-two"]
excerpt: "One or two sentences for the index and previews."
cover: "/assets/blog/your-post/cover.jpg"
---

<Lead id="intro">
Opening paragraph.
</Lead>

## A section heading

Body copy. `##` headings are numbered automatically — title the last one exactly
`Conclusion` to get the unnumbered treatment.
```

Frontmatter is validated against a schema in `src/content.config.ts`, so a typo
fails the build with a real error instead of rendering blank. Reading time and
the table of contents are generated automatically.

`<Compare less="..." more="..." />` and `<Prompt label="...">...</Prompt>` are
available for callouts, and fenced code blocks take a filename tab:

````
```ts title="example.ts"
````

See [`CLAUDE.md`](./CLAUDE.md) for the full set of conventions.

## Deployment

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and publishes `dist/` to GitHub Pages. No environment
variables are needed.

`public/.nojekyll` must stay. Without it, Pages runs Jekyll, which silently drops
the `_astro/` directory and the site loads without styles.
