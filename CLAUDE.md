# CLAUDE.md

Sean Pertet's personal portfolio site — a Next.js App Router application built
around the **"Light IDE" design system**: a light, code-forward aesthetic that
positions Sean as a senior full-stack TypeScript engineer (cloud/e-commerce is
background context, not the headline). Blog is MDX-based.

Reference docs from the redesign are still in `design/` (`redesign-brief.md`,
`blog-implementation-guide.md`, and the static mockups `index.html`/
`blog-post.html`) — useful if extending the design system or the blog pipeline.

## Commands

```bash
npm run dev      # Start dev server with Turbopack (http://localhost:3000)
npm run build    # Build for production
npm start        # Serve production build
```

## Architecture

- **Framework:** Next.js (App Router) with React 19
- **Language:** TypeScript (strict mode)
- **Styling:** hand-authored CSS, no Tailwind (removed deliberately — see below)
- **Animation:** Framer Motion, gated behind `useReducedMotion()`
- **Blog:** MDX files in `/content/posts`, compiled at request time via
  `next-mdx-remote/rsc` + `rehype-slug` + `rehype-pretty-code` (Shiki,
  `github-light` theme)

## Project Structure

```
src/
  app/
    layout.tsx            # Root layout: fonts (Hanken Grotesk + JetBrains Mono), nav, footer
    page.tsx               # Home page — assembles portfolio sections
    globals.css             # 3 imports: tokens.css, styles/layout, styles/components
    styles/
      tokens.css             # :root custom properties — the whole palette, one accent (--accent)
      layout/                 # Site-wide chrome — base.css (reset), nav.css, footer.css (+ index.css barrel)
      components/             # One file per section — hero, capabilities, projects, timeline,
                               # writing, contact, article, buttons, sections (+ index.css barrel)
    _components/             # Shared React components
      mdx/                     # MDX-only: mdx.tsx (component map), pre.tsx (copy button),
                               # toc.tsx (scroll-spy), reading-progress.tsx
    projects/page.tsx        # Projects page
    writing/
      page.tsx                 # Writing index (all posts)
      [slug]/page.tsx           # Individual post — MDX compile + TOC + reading progress, SSG
  lib/
    posts.ts                 # Frontmatter + reading time, reads content/posts/*.mdx
    headings.ts                # Extracts ## headings from raw MDX for the TOC (skips fenced code blocks)
    pretty-code.ts              # rehype-pretty-code / Shiki options
    constants.ts                 # Site metadata, contact info, SITE_URL
content/posts/              # MDX blog content (frontmatter + body)
public/assets/               # Images — headshot, project screenshots, blog covers
```

## Key Conventions

**Client vs Server Components**
- Pages and layouts are Server Components by default
- Interactive components use `"use client"`: `Hero`, `Timeline`, `ProjectCard`
  (Framer Motion), `Navigation` (mobile toggle), and everything in
  `_components/mdx/` (TOC scroll-spy, reading progress, copy button)
- Prefer Server Components unless something needs state, effects, or browser APIs

**Styling — no Tailwind**
- Tailwind was removed during the redesign — every class is hand-authored,
  ported from the `design/` mockups. Reintroducing Tailwind utilities would
  just reintroduce a preflight reset fighting these styles; don't.
- One accent only: `--accent` (`#7C3AED` in `tokens.css`). Don't add a second
  brand color — the whole site recolors from that one variable.
- Mono (JetBrains Mono, `var(--mono)`) for labels, dates, tags, code, filenames.
  Hanken Grotesk (`var(--sans)`) for everything else. Sentence case everywhere.
- No dark mode — it was explicitly removed (`ThemeSwitcher` and all `dark:`
  variants deleted). Don't reintroduce it without being asked.
- **New component styles get their own file** in `src/app/styles/components/`
  (or `layout/` for nav/footer/base-reset concerns), added to that folder's
  `index.css` barrel — don't append to an existing unrelated file or dump
  styles into `globals.css` directly.
- **Padding/margin shorthand collisions are a real, recurring bug class here**:
  several section wrappers use `class="wrap sec-pad"` (two classes, same
  element). A shorthand `padding: 64px 0` on `.sec-pad` resets *all four*
  sides, silently zeroing out `.wrap`'s horizontal padding — invisible on wide
  desktop viewports (where `.wrap`'s `max-width` + `margin: 0 auto` still
  centers things) but a real full-bleed bug on mobile. This has bitten the
  project twice. Any class applied alongside `.wrap` (or any other class that
  sets its own padding/margin) must use longhand properties
  (`padding-top`/`padding-bottom`), never the shorthand.

**Imports**
- Use the `@/*` path alias (maps to `./src/*`) — never relative paths like `../../`

**Blog posts (MDX)**
- Add posts as `.mdx` files in `content/posts/`
- Frontmatter: `title`, `date`, `tags` (array), `excerpt`, `cover`
- Open the post with a `<Lead id="intro">...</Lead>` block for the first
  paragraph — it renders as a `<div>`, not `<p>`. MDX already wraps block-level
  text in its own `<p>`, so a `<p>` wrapper in the `Lead` component would
  produce invalid nested `<p>` tags (this was an actual bug, now fixed).
- `##` headings become numbered sections automatically via CSS counters
  (`.sec-h`/`.num` in `article.css`) — don't hand-number them. Title the final
  section exactly `Conclusion` to get the unnumbered `h2.plain` treatment.
- Custom components available in MDX: `<Compare less="..." more="..." />` and
  `<Prompt label="...">...</Prompt>` (see `_components/mdx/mdx.tsx`). Fenced
  code blocks support `` ```ts title="filename.ts" `` for the filename tab.
- Reading time and TOC heading extraction are automatic
  (`src/lib/posts.ts`, `src/lib/headings.ts`) — no manual bookkeeping needed.

**Animations**
- Framer Motion `motion.*` with `useInView`/`whileInView` for scroll-triggered effects
- Always gate animation props behind `useReducedMotion()` — spread `{}` instead
  of the animation props when the user prefers reduced motion, rather than
  relying on CSS `prefers-reduced-motion` alone (it doesn't touch JS-driven
  Framer Motion animations). See `hero.tsx`, `timeline.tsx`, `project-card.tsx`
  for the pattern.

**Images**
- Keep source assets close to their real display size. Oversized sources slow
  down `next/image`'s on-demand optimization — most visible as first-load
  latency on Vercel (the image optimization API transforms + caches per unique
  size on first request; bigger sources mean a slower cold-cache transform).
  Prefer JPEG over PNG for photos/screenshots unless transparency is needed.

## Site Identity

- **Owner:** Sean Pertet — Senior Full-Stack TypeScript Engineer based in Nairobi, Kenya
- **Contact:** seanleken43@gmail.com
- **Positioning:** full-stack TypeScript first; cloud/e-commerce experience is
  background context, not the headline
