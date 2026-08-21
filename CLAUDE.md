# CLAUDE.md

Sean Pertet's personal portfolio site — an **Astro** application built around the
**"Light IDE" design system**: a light, code-forward aesthetic that positions Sean
as a senior full-stack TypeScript engineer (cloud/e-commerce is background
context, not the headline). Blog is MDX-based.

## Commands

```bash
npm run dev      # Dev server (http://localhost:4321)
npm run build    # Static build to dist/
npm run preview  # Serve dist/ locally to sanity-check the output
npm run og       # Regenerate public/assets/og-image.png
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
from memory.** Astro moves fast, this project tracks a recent version, and
several APIs here (the Markdown processor in particular) changed shape recently
enough that a plausible-sounding answer from memory is likely to be a deprecated
one. Search the docs; don't guess.

## Deployment

Statically built and deployed to GitHub Pages — `.github/workflows/deploy.yml`
runs `npm run build` and publishes `dist/` on every push to `main`. There is no
server at request time, so anything needing one (SSR endpoints, middleware,
on-demand rendering) is off the table without adding an adapter.

`public/.nojekyll` **must stay** — without it, GitHub Pages' Jekyll processing
silently drops the `_astro/` directory (leading underscore) and the site loads
with no CSS.

`seanleken.github.io` is a *user* Pages site served from the domain root, so
`astro.config.mjs` needs no `base` path.

## Architecture

- **Framework:** Astro (static output)
- **Language:** TypeScript (strict)
- **Styling:** hand-authored CSS, no Tailwind (deliberate — see below)
- **Animation:** CSS transitions plus one shared IntersectionObserver.
  **No client-side framework** — see below before adding one.
- **Blog:** MDX in `src/content/posts`, via Content Collections

## Project structure

```
src/
  layouts/Base.astro        # Fonts, nav, footer, <head> metadata
  pages/
    index.astro               # Home — assembles portfolio sections
    projects.astro
    404.astro
    rss.xml.ts                 # Feed
    writing/
      index.astro                # Post index
      [slug].astro                # Individual post — MDX + TOC + reading progress
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
  data/projects.ts            # Projects page content
  lib/                        # posts.ts (queries + date format), headings.ts (TOC)
  content.config.ts           # Collection definitions + zod schemas
  content/posts/              # MDX blog content
  assets/                     # Images processed by <Image /> at build time
  consts.ts                   # Site metadata, contact info, SITE_URL
scripts/make-og-image.mjs     # Generates the social card
public/                       # Served as-is: favicons, manifest, robots.txt, .nojekyll
```

**`src/assets/` vs `public/`** — anything `<Image />` should optimise goes in
`src/assets/` and is imported. Only files needing a stable, absolute URL
(favicons, manifest, `robots.txt`, `.nojekyll`) belong in `public/`.

## Key conventions

**No client-side framework**
- Astro components render to HTML at build time. There are no islands, and the
  site ships zero framework JavaScript. Keep it that way unless there's a real
  reason not to.
- The four interactive behaviours are plain `<script>` tags in their own
  components: mobile nav toggle, reading-progress bar, TOC scroll-spy, and the
  code-block copy button.
- Scroll reveals use one shared IntersectionObserver adding an `.in-view` class.
  Don't reach for a library to add an animation — check whether CSS does it.
- **Reveal styles are scoped behind a `.js` class** that an inline script in
  `Base.astro` sets on `<html>` before paint. The starting state is `opacity: 0`,
  so an unscoped rule would leave content permanently invisible whenever
  JavaScript fails to run. Keep new reveal rules under `.js`.

**Styling — no Tailwind**
- Every class is hand-authored. Reintroducing Tailwind would just add a preflight
  reset fighting these styles; don't.
- One accent only: `--accent` (`#7C3AED` in `tokens.css`). Don't add a second
  brand colour — the whole site recolours from that one variable.
- Mono (`var(--mono)`) for labels, dates, tags, code, filenames. Sans
  (`var(--sans)`) for everything else. Sentence case everywhere.
- No dark mode — deliberate. Don't add one without being asked.
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
  text in its own `<p>`, so a `<p>` wrapper produces nested `<p>` tags, which is
  invalid HTML. Easy mistake to reintroduce; don't.
- `##` headings become numbered sections automatically via CSS counters
  (`.sec-h`/`.num` in `article.css`) — don't hand-number them. Title the final
  section exactly `Conclusion` to get the unnumbered `h2.plain` treatment.
- Custom components available in MDX: `<Compare less="..." more="..." />` and
  `<Prompt label="...">...</Prompt>`. Fenced code blocks support
  `` ```ts title="filename.ts" `` for the filename tab.
- Reading time and TOC headings are automatic. Reading time comes back from
  **`remarkPluginFrontmatter`** (returned by `render()`), *not* `entry.data` —
  plugin-injected frontmatter doesn't land on the collection entry.
- **`og:image` for a post is resolved through `getImage()`**, not the raw `cover`
  frontmatter path. Covers live in `src/assets/` and are content-hashed at build
  time, so the frontmatter path is not a URL that resolves — using it directly
  gives every post a broken link preview.

**Markdown pipeline**
- Astro's default processor is Sätteri, and `markdown.remarkPlugins`/
  `rehypePlugins` are deprecated. This project deliberately opts into
  `unified()` via `markdown.processor`, because `rehype-pretty-code` (which
  renders the `title="file.ts"` tabs) has no Sätteri equivalent.
- `markdown.syntaxHighlight: false` is required — otherwise Astro's built-in
  Shiki runs first and hands `rehype-pretty-code` pre-tokenised output.
- Astro generates heading ids itself; `rehype-slug` is not needed.
- **Heading slugs are load-bearing.** Published posts have links pointing at
  them. Don't change how they're generated.
- Smart punctuation is on (Astro's default), so prose gets curly quotes and
  apostrophes. Disable with `unified({ smartypants: false })` if that ever needs
  to change.

**Animations**
- CSS transitions driven by an `.in-view` class, plus `@keyframes` for the hero.
- Because the motion is entirely CSS, a plain
  `@media (prefers-reduced-motion: reduce)` block genuinely covers it. Keep it
  that way: JS-driven animation would need its own gating and is easy to miss.

**Images**
- Use `<Image />` from `astro:assets` with imports from `src/assets/`. It resizes,
  converts to modern formats, and emits `srcset` at build time.
- Every image container (`.portrait`, `.proj-preview`, `.cover`,
  `.proj-card .preview`) is `position: relative` with the child styled
  `width: 100%; height: 100%; object-fit: cover`. The container already does the
  sizing — don't wrap images in extra Astro-specific markup to "fix" it.

## Site identity

- **Owner:** Sean Pertet — Senior Full-Stack TypeScript Engineer based in Nairobi, Kenya
- **Contact:** seanleken43@gmail.com
- **Positioning:** full-stack TypeScript first; cloud/e-commerce experience is
  background context, not the headline
