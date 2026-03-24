# CLAUDE.md

This is Sean Pertet's personal portfolio site — a Next.js App Router application showcasing cloud engineering work, career history, and a Markdown-based blog.

## Commands

```bash
npm run dev      # Start dev server with Turbopack (http://localhost:3000)
npm run build    # Build for production
npm start        # Serve production build
```

## Architecture

- **Framework:** Next.js (App Router) with React 19
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS with custom color palette and dark mode via `class` strategy
- **Animation:** Framer Motion for scroll-triggered and staggered animations
- **Blog:** File-based with Markdown files in `/_posts`, parsed via gray-matter + remark

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout: navigation, footer, theme switcher
    page.tsx            # Home page — assembles all portfolio sections
    blog/
      page.tsx          # Blog listing
      [slug]/page.tsx   # Individual post (SSG)
    _components/        # All shared React components
  lib/
    api.ts              # Blog post file system helpers
    constants.ts        # Site metadata (name, title, contact info)
    markdownToHtml.ts   # Markdown → HTML processor
  interfaces/           # TypeScript types (Post, Author)
/_posts/                # Markdown blog content (YAML frontmatter + body)
/public/assets/         # Images (headshot, OG image)
```

## Key Conventions

**Client vs Server Components**
- Pages and layouts are Server Components by default
- Interactive components use `"use client"` (Hero, Terminal, TechStack, ThemeSwitcher)
- Prefer keeping components as Server Components unless they need state, effects, or browser APIs

**Styling**
- Use Tailwind utility classes; avoid inline styles
- Custom colors are defined in `tailwind.config.ts`: `portfolio-navy`, `portfolio-blue`, `portfolio-emerald`, etc.
- Dark mode uses the `dark:` variant — always pair light and dark classes together

**Imports**
- Use the `@/*` path alias (maps to `./src/*`) — never use relative paths like `../../`

**Blog Posts**
- Add new posts as `.md` files in `/_posts/`
- Required frontmatter: `title`, `date`, `author`, `excerpt`, `coverImage`, `ogImage`
- Posts are sorted newest-first and statically generated at build time

**Animations**
- Use Framer Motion `motion.*` components with `useInView` for scroll-triggered effects
- Follow the staggered delay pattern already used in Hero and TechStack

## Site Identity

- **Owner:** Sean Pertet — Cloud Engineer based in Nairobi, Kenya
- **Contact:** seanleken43@gmail.com
- **Specialization:** GCP, event-driven architecture, enterprise e-commerce integrations
