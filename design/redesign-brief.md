# Portfolio rebuild — redesign brief (Light IDE)

The single source of truth for rebuilding seanpertet.dev. Hand this to Claude Code as
the primary spec. It owns the whole redesign; the **blog implementation guide**
(`blog-implementation-guide.md`) is the detailed spec for the blog subsystem only and is
referenced from §5.5 rather than repeated here.

---

## 0. How to use this doc

- **Visual target:** `index.html` (landing) and `blog-post.html` (blog post) are
  finished static mockups of the target design. Match them. Their CSS is the reference
  implementation — port it, don't reinvent it.
- **Blog details:** everything about rendering markdown posts lives in
  `blog-implementation-guide.md`. Don't duplicate it; follow it.
- **Assumptions to verify first:** this brief assumes the current site is Next.js
  (App Router) with markdown blog posts. Before starting, read the actual repo and
  confirm the framework version, router, and blog pipeline. If reality differs, adapt
  and note the deltas.

---

## 1. Goal and priorities

Rebuild the portfolio to read as the work of a **senior full-stack TypeScript
engineer**, replacing the current generic dark dev-portfolio look.

Priorities, in order:

1. **Not generic** — must not read as a template.
2. **Not gloomy** — light, airy, high-contrast.
3. **Light theme** — no dark base.
4. **Nothing cringey** — restraint over cleverness.

Chosen direction: **Light IDE** — a refined light editor aesthetic. Code is a
first-class design element; the daily craft of a TS dev becomes the visual identity.

**Explicitly removed from the old site:**

- Skill bars and percentages (e.g. "Cloud Platforms — 95%") — gone entirely.
- The animated typing terminal hero — replaced by the editor card (§5.2).
- Dark slate (`#0F172A`) base and generic blue accent — replaced by the palette in §3.
- Cloud/e-commerce as the headline framing — demoted to context (§2).

---

## 2. Positioning and voice

Lead with full-stack TypeScript; keep cloud and e-commerce as background context, not
the headline. The existing work supports this honestly — Node/TS services, React/Next
front-ends, GraphQL/REST APIs, migrations, mentoring, architecture.

- **Headline:** "I ship type-safe products, end to end."
- **Sub:** senior full-stack TypeScript engineer, ~6 years, production systems across
  the stack — front-end to services to the APIs, data models, and types between them.
- **Capabilities** regroup around the stack (see §5.1); cloud collapses to one line.
- **Voice:** sentence case everywhere; plain, specific, no filler; mono for anything
  structural or technical (labels, dates, tags, code, file names).

---

## 3. Design system (source of truth)

All values below are already implemented in the mockup CSS. Lift them verbatim into a
single tokens file (`app/globals.css` or `tokens.css`) imported once, so landing and
blog share one palette.

### Color tokens

```
--paper:      #FBFBFD   /* page background (cool near-white, NOT cream) */
--surface:    #FFFFFF   /* cards, editor, raised */
--surface-2:  #F5F6FA   /* insets, tabs, code chrome */
--ink:        #1E2233   /* headings, strong text */
--read:       #30354A   /* long-form body text (blog) — high contrast */
--body:       #4A5069   /* secondary body */
--muted:      #8A90A6   /* metadata, mono labels */
--line:       #EAEBF0   /* hairline borders */
--line-2:     #F1F2F7
--accent:     #7C3AED   /* violet — the ONE accent */
--accent-soft:#F3EDFE   /* accent tint for badges */

/* syntax + callouts */
--sx-key: #7C3AED   --sx-type: #B45309   --sx-str: #0A7E4E
--sx-num: #C2410C   --sx-fn: #2563EB     --sx-comment: #8A90A6   --sx-punct: #64748B
--less: #B45309   --less-soft: #FBF3E6   --more: #0A7E4E   --more-soft: #E9F6EF
```

One accent only (`--accent`). It is swappable via this variable — the whole site
recolors from one edit. Do not introduce a second brand color.

### Typography

- Display / headings + body UI: **Hanken Grotesk** (400/500/600/700)
- Utility (labels, dates, tags, code, file names): **JetBrains Mono** (400/500)
- Load via Google Fonts (or self-host with `next/font` for performance — preferred in
  the rebuild).

Scale (from the mockups): hero h1 ~50px / blog h1 ~43px; section h2 ~26–28px; body 16.5px
(UI) / 18px (blog reading, line-height 1.72); mono labels 11–13px. Headings weight 700,
letter-spacing ~-0.025em, sentence case.

### Layout and motif vocabulary

- Content shell max-width ~1120px (landing) / ~1040px with a 720px reading column (blog).
- Hairline dividers between sections; generous vertical rhythm (~64px section padding).
- **Signature motifs**, used consistently:
  - `// section-name` mono eyebrows above each section heading.
  - Editor chrome (tab + filename + `TS`/`MD` badge + status bar) for code surfaces.
  - Small square/dot accents in `--accent` (timeline nodes, tag labels).
  - `⌘K`-style pill in the nav (see open decision §10 — currently decorative).

### Component patterns

- **Buttons:** primary = filled `--accent`; secondary = `--surface` with `--line`
  border. Mono label, 8px radius.
- **Tags:** mono, `--surface` bg, hairline border, 6px radius. Used for tech lists.
- **Cards:** `--surface`, hairline border, 12–14px radius; hover → border becomes
  `--accent`. Subtle shadow only on the hero editor card.
- **Timeline:** vertical hairline with square `--accent` nodes; mono dates.
- **Code block:** editor window — filename tab, light syntax, copy button, optional
  status bar. See blog guide §4–5.
- **Callouts:** comparison (`less`/`more`, amber vs green) and prompt (accent
  left-border). See blog guide §6.

### Do / don't

**Do:** light surfaces; one accent; mono for structural text; sentence case; hairlines;
high-contrast body; number sections only where a real sequence exists (the blog article,
the experience timeline).

**Don't:** skill bars or percentages; the typing-terminal hero; blue as the accent;
cream + terracotta; dense broadsheet columns; decorative `01/02/03` markers on
non-sequential content; mid-sentence bold (use inline code for names); gradients, glows,
or heavy shadows.

---

## 4. Assets and references

| File | Role |
|------|------|
| `index.html` | Finished landing mockup — visual + CSS reference |
| `blog-post.html` | Finished blog-post mockup — visual + CSS reference |
| `blog-implementation-guide.md` | Detailed blog subsystem spec (MDX, TOC, code blocks) |

The two HTML files are hand-written and self-contained. Their CSS is production-quality
and should be decomposed into tokens + component styles, not rewritten from scratch.

---

## 5. Page specifications

### 5.0 Shared chrome (nav + footer)

- **Nav:** sticky, translucent `--paper` with blur, hairline bottom border. Left: `TS`
  badge + "Sean Pertet". Right: mono links (Work, Projects, Writing, Contact) + `⌘K`
  pill. Mobile: collapse links behind a `menu` toggle.
- **Footer:** hairline top, `© 2026 Sean Pertet`, mono nav echo.

### 5.1 Landing (`/`)

Sections, in order (match `index.html`):

1. **Hero** — left: eyebrow, headline, lede, two CTAs, mono stack line, portrait
   placeholder. Right: the editor card (§5.2).
2. **Capabilities** (`// capabilities`, "The stack") — grouped mono-labelled tag lists,
   no bars: Frontend (TypeScript, React, Next.js, Tailwind); Backend (Node.js, tRPC,
   GraphQL, REST, Prisma); Data (PostgreSQL, Redis, SQL, Migrations); Tooling & DX
   (Turborepo, Vite, Vitest, Playwright, CI/CD). Infra as one dim line: GCP · Docker ·
   Terraform.
3. **Selected work** (`// selected work`) — one featured project (CrewBoard, full-stack:
   Next.js, TypeScript, Prisma, PostgreSQL, NextAuth, Tailwind) + a two-up row of
   secondary projects. Each: preview placeholder, description, tech tags, GitHub / Live
   links.
4. **Experience** (`// experience`) — timeline, mono dates, bullets reworded toward
   services / APIs / types / migrations (not integrations-and-e-commerce).
5. **Writing** (`// writing`) — two latest article cards, mono dates + reading time.
6. **Contact** (`// contact`) — headline, intro, email / phone / location in mono.

### 5.2 The editor card (hero signature)

A `who.ts` editor window: tab with `TS` badge + filename, line-number gutter, a
`type Engineer = { … }` signature standing in for a bio, light syntax highlighting, and a
`tsc — 0 errors` status bar. This is the one bold element — keep everything around it
quiet. In the real build, the syntax colors should come from the same highlighter used
in the blog (consistency), or be hand-tokenised to the `--sx-*` variables.

### 5.3 Projects page (`/projects`)

The current projects page is the strongest part of the old site — preserve its
structure (browser-framed project screenshots) but restyle to Light IDE: light cards,
hairlines, mono tech tags, `--accent` hover. Reframe descriptions toward the full-stack
TS angle where honest. Reuse real projects (CrewBoard, Kumo no Chaya, Frontline
Scholars, Moto, Trouvaille).

### 5.4 Writing index (`/writing`)

Post list: each row/card = mono date + reading time + tags, title, excerpt, "Read →".
Same card treatment as the landing "Writing" section. (Not yet mocked — build from the
card pattern.)

### 5.5 Blog post (`/writing/[slug]`)

Match `blog-post.html`. Full implementation — MDX pipeline, filename code blocks with
copy, comparison + prompt components, CSS-counter section numbering, sticky scroll-spy
TOC, reading-progress bar, high-contrast 720px reading column — is specified in
**`blog-implementation-guide.md`**. Follow it exactly.

---

## 6. Tech and migration

- **Assumed current:** Next.js App Router, markdown (`.md`) blog posts, Tailwind
  (likely), dark theme. **Verify against the repo.**
- **Target:** same framework; light theme; `.md` → `.mdx` for posts (blog guide §1);
  `next/font` for the two typefaces; tokens in one CSS file.
- **Keep:** information architecture (Home / Projects / Writing / Contact), the real
  content, the projects screenshots.
- **Replace:** the entire visual layer (palette, type, components), the hero, the skills
  section, all body-text contrast.
- **Migration order:** land the design system first (tokens + shared chrome), then
  page-by-page, blog last (it's the most involved).

---

## 7. Suggested repo `CLAUDE.md`

Drop this at the project root so future sessions inherit the rules (per the very
practice the blog article recommends):

```md
## Commands
npm run dev        # dev server
npm run build      # production build
npm run lint

## Architecture
- Next.js App Router. Routes in app/. Shared UI in components/. Tokens in app/globals.css.
- Blog posts are MDX in content/posts/. Pipeline documented in blog-implementation-guide.md.

## Design system (Light IDE)
- One accent only: --accent (#7C3AED). Never add a second brand color.
- Light surfaces. Mono (JetBrains Mono) for labels, dates, tags, code, filenames.
  Hanken Grotesk for everything else.
- Sentence case everywhere. High-contrast body text (--read for long-form).

## What to avoid
- No skill bars or percentages. No terminal-typing hero. No blue accent, no cream.
- No gradients, glows, or heavy shadows. No mid-sentence bold — use inline code.
- Number sections only where a real sequence exists.

## Reference
- index.html and blog-post.html are the visual target. Match them; reuse their CSS.
```

---

## 8. Build plan (milestones)

1. **Design system** — tokens file, fonts via `next/font`, shared nav + footer. One
   throwaway page proving buttons, tags, cards, and a code block render correctly.
2. **Landing** — all six sections (§5.1), editor card (§5.2), responsive + mobile nav.
3. **Projects page** — restyle existing structure (§5.3).
4. **Writing index** — post list (§5.4).
5. **Blog post** — full MDX build per the blog guide (§5.5). Do this last; it's the
   biggest.
6. **Polish pass** — accessibility, reduced motion, Lighthouse, cross-page consistency.

Work one milestone at a time; each is independently verifiable.

---

## 9. Quality floor

- Responsive to mobile (mockups include the breakpoints).
- Visible keyboard focus (`:focus-visible` outline in `--accent`, already in the CSS).
- `prefers-reduced-motion: reduce` respected (already stubbed).
- Semantic landmarks (`nav`, `main`, `article`, `aside`, `footer`); TOC is an `aside`
  with an accessible label.
- Images have alt text; placeholders get real alt once assets exist.
- No layout shift from font loading (`next/font` with `display: swap` + fallback
  metrics).

---

## 10. Open decisions (flag to Sean, don't guess)

- **`⌘K` pill:** currently decorative. Either wire a real command palette or remove it —
  a non-functional control can read as a tell.
- **Syntax theme:** ship with `github-light`, or invest in a custom Shiki theme to match
  `--sx-*` exactly? Recommend shipping with `github-light` first.
- **Second article title:** the mockup reworded the GCP piece to "Building scalable
  infrastructure that stays type-safe." Confirm or revert.
- **Portrait vs editor card:** hero currently shows both. If it feels crowded, keep the
  editor card and drop the portrait (or vice versa).
- **Serif body for the blog:** the current spec uses Hanken Grotesk (sans) for reading.
  If Sean later wants a more editorial feel, a serif reading face is a contained,
  reversible change (one variable + font load).
```
