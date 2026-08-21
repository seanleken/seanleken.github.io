# CLAUDE.md

Sean Pertet's personal portfolio site — an **Astro** application built around the
**"Light IDE" design system**: a light, code-forward aesthetic that positions Sean
as a senior full-stack TypeScript engineer (cloud/e-commerce is background
context, not the headline). Blog is MDX-based.

This is a rebuild of the previous Next.js App Router version. `PLAN.md` holds the
migration scope, the decisions behind it, and what was verified — read it before
making structural changes.

## Commands

```bash
npm run dev      # Dev server (http://localhost:4321)
npm run build    # Static build to dist/
npm run preview  # Serve dist/ locally to sanity-check the output
```

**Prefer the background dev server** — it doesn't block the terminal:

```bash
npx astro dev --background
npx astro dev status     # is it running?
npx astro dev logs -f    # tail its output
npx astro dev stop
```

## Astro docs

An `astro-docs` MCP server is configured for this directory
(`mcp__astro-docs__search_astro_docs`). **Use it instead of recalling Astro APIs
from memory.** Astro moves fast and this project targets a recent version — the
first draft of `PLAN.md` was written against Astro 5 idioms and was wrong about
the Markdown pipeline in three separate places. Search the docs; don't guess.

## Deployment

Statically built and deployed to GitHub Pages — `.github/workflows/deploy.yml`
runs `npm run build` and publishes `dist/` on every push to `main`. There is no
server at request time, so anything needing one (SSR endpoints, middleware,
on-demand rendering) is off the table without adding an adapter.

`public/.nojekyll` **must stay** — without it, GitHub Pages' Jekyll processing
silently drops the `_astro/` directory (leading underscore) and the site loads
with no CSS. The Next version had the same requirement for `_next/`.

`seanleken.github.io` is a *user* Pages site served from the domain root, so
`astro.config.mjs` needs no `base` path.

## Architecture

- **Framework:** Astro 7 (static output)
- **Language:** TypeScript (strict)
- **Styling:** hand-authored CSS, no Tailwind (removed deliberately — see below)
- **Animation:** CSS transitions + one shared IntersectionObserver. **No React,
  no Framer Motion** — both were dropped in the rebuild.
- **Blog:** MDX in `src/content/posts`, via Content Collections

## Project structure

```
src/
  layouts/Base.astro        # Fonts, nav, footer, <head> metadata
  pages/
    index.astro               # Home — assembles portfolio sections
    projects.astro
    writing/
      index.astro               # Post index
      [slug].astro               # Individual post — MDX + TOC + reading progress
  styles/
    fonts.css                 # @fontsource imports; defines --font-sans/--font-mono
    global.css                 # Entry: fonts, tokens, layout, components
    tokens.css                  # :root custom properties — palette, one accent
    layout/                      # Site-wide chrome — base.css (reset), nav, footer
    components/                   # One file per section (+ index.css barrel)
  components/
    mdx/                      # MDX-only components (Lead, Compare, Prompt, Pre, H2)
  plugins/
    remark-reading-time.mjs   # Injects readingTime into frontmatter
  content.config.ts           # Collection definitions + zod schemas
  content/posts/              # MDX blog content
  assets/                     # Images processed by <Image /> at build time
  consts.ts                   # Site metadata, contact info, SITE_URL
public/                       # Served as-is: favicons, manifest, .nojekyll
```

**`src/assets/` vs `public/`** — anything `<Image />` should optimise goes in
`src/assets/` and is imported. Only files needing a stable, absolute URL
(favicons, manifest, `.nojekyll`) belong in `public/`.

## Key conventions

**No client-side framework**
- Astro components render to HTML at build time. There are no islands.
- The four interactive behaviours are plain `<script>` tags in their own
  components: mobile nav toggle, reading-progress bar, TOC scroll-spy, and the
  code-block copy button.
- Scroll reveals use one shared IntersectionObserver adding an `.in-view` class.
  Don't reach for a framework to re-add an animation — check whether CSS does it.

**Styling — no Tailwind**
- Every class is hand-authored, ported from the design mockups. Reintroducing
  Tailwind would just reintroduce a preflight reset fighting these styles; don't.
- One accent only: `--accent` (`#7C3AED` in `tokens.css`). Don't add a second
  brand colour — the whole site recolours from that one variable.
- Mono (`var(--mono)`) for labels, dates, tags, code, filenames. Sans
  (`var(--sans)`) for everything else. Sentence case everywhere.
- No dark mode — explicitly removed. Don't reintroduce it without being asked.
- **New component styles get their own file** in `src/styles/components/` (or
  `layout/` for nav/footer/reset concerns), added to that folder's `index.css`
  barrel — don't append to an unrelated file or dump styles into `global.css`.
- **Padding/margin shorthand collisions are a real, recurring bug class here.**
  Several section wrappers use `class="wrap sec-pad"` — two classes, one element.
  A shorthand `padding: 64px 0` on `.sec-pad` resets *all four* sides, silently
  zeroing `.wrap`'s horizontal padding: invisible on wide desktop viewports
  (where `.wrap`'s `max-width` + `margin: 0 auto` still centres things) but a
  real full-bleed bug on mobile. **This has bitten the project twice.** Any class
  applied alongside `.wrap` must use longhand (`padding-top`/`padding-bottom`),
  never the shorthand.

**Imports**
- Use the `@/*` path alias (maps to `./src/*`) — never relative paths like `../../`

**Blog posts (MDX)**
- Add posts as `.mdx` files in `src/content/posts/`
- Frontmatter: `title`, `date`, `tags` (array), `excerpt`, `cover` — validated by
  the zod schema in `content.config.ts`; a build error means the schema, not a
  mystery
- Open the post with a `<Lead id="intro">...</Lead>` block for the first
  paragraph. It renders a `<div>`, **not** a `<p>` — MDX already wraps block-level
  text in its own `<p>`, so a `<p>` wrapper would produce invalid nested `<p>`
  tags. This was an actual bug in the Next version; the same MDX rule applies here.
- `##` headings become numbered sections automatically via CSS counters
  (`.sec-h`/`.num` in `article.css`) — don't hand-number them. Title the final
  section exactly `Conclusion` to get the unnumbered `h2.plain` treatment.
- Custom components available in MDX: `<Compare less="..." more="..." />` and
  `<Prompt label="...">...</Prompt>`. Fenced code blocks support
  `` ```ts title="filename.ts" `` for the filename tab.
- Reading time and TOC headings are automatic. Reading time comes back from
  **`remarkPluginFrontmatter`** (returned by `render()`), *not* `entry.data` —
  plugin-injected frontmatter doesn't land on the collection entry.

**Markdown pipeline**
- Astro 7 made Sätteri the default processor and deprecated
  `markdown.remarkPlugins`/`rehypePlugins`. This project deliberately opts back
  into `unified()` via `markdown.processor`, because `rehype-pretty-code` (which
  renders the `title="file.ts"` tabs) has no Sätteri equivalent.
- `markdown.syntaxHighlight: false` is required — otherwise Astro's built-in
  Shiki runs first and hands `rehype-pretty-code` pre-tokenised output.
- Astro generates heading ids itself; `rehype-slug` is not needed. Its slugs are
  byte-identical to the Next version's `github-slugger` output (verified across
  all 16 real headings), so existing deep links still resolve.

**Animations**
- CSS transitions driven by an `.in-view` class, plus `@keyframes` for the hero.
- A plain `@media (prefers-reduced-motion: reduce)` block genuinely covers
  reduced motion here — unlike the Next version, which had to hand-gate every
  Framer Motion prop behind `useReducedMotion()` because CSS can't reach
  JS-driven animation.

**Images**
- Use `<Image />` from `astro:assets` with imports from `src/assets/`. It resizes,
  converts to modern formats, and emits `srcset` at build time.
- Every image container (`.portrait`, `.proj-preview`, `.cover`,
  `.proj-card .preview`) is `position: relative` with the child styled
  `width: 100%; height: 100%; object-fit: cover`. That's why the CSS ported from
  the Next version unchanged — don't "fix" it to use Astro-specific wrappers.

## Site identity

- **Owner:** Sean Pertet — Senior Full-Stack TypeScript Engineer based in Nairobi, Kenya
- **Contact:** seanleken43@gmail.com
- **Positioning:** full-stack TypeScript first; cloud/e-commerce experience is
  background context, not the headline
