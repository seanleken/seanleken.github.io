---
title: "How to Use Claude Code Effectively as a Developer"
excerpt: "Practical strategies for getting the most out of AI-assisted development — from project setup to complex refactors."
coverImage: "/assets/blog/how-to-use-claude-code-effectively/cover.jpg"
date: "2026-03-24"
author:
  name: Sean Pertet
  picture: "/assets/blog/authors/sean.jpg"
ogImage:
  url: "/assets/blog/how-to-use-claude-code-effectively/cover.jpg"
---

## Introduction

Claude Code has changed how I approach software development. Using it daily across several personal and professional projects, I've developed a set of habits that make the collaboration significantly more effective.

This post covers the practical strategies I've found most useful.

## 1. Invest in a Good CLAUDE.md

The single highest-leverage thing you can do is write a `CLAUDE.md` file at your project root. Claude Code reads this at the start of every session, so it's your way of providing persistent context without repeating yourself.

A good `CLAUDE.md` should cover:

- **Commands** — how to run, build, and test the project
- **Architecture** — the tech stack and key directories
- **Conventions** — naming patterns, import aliases, styling approach
- **What to avoid** — things Claude shouldn't change without asking

```markdown
## Commands
npm run dev      # Start dev server
npm run build    # Production build

## Conventions
- Use @/* path alias, never relative imports
- All components are TypeScript strict mode
- Dark mode via Tailwind `dark:` variant — always pair with light class
```

The more specific, the better. Vague guidance gets vague results.

## 2. Be Explicit About Scope

Claude Code will do exactly what you ask — which means unclear requests produce sprawling changes. The more precisely you define the task, the cleaner the output.

**Less effective:**
> "Improve the blog page"

**More effective:**
> "Add a reading time estimate to each blog card. Calculate it from the excerpt word count. Match the existing date formatter style."

Specificity also prevents over-engineering. If you just want a bug fixed, say so — Claude won't then refactor everything around it.

## 3. Read Before You Edit

Before asking Claude to modify a component, make sure it has read the relevant files first. Claude Code reads files on demand, so if you jump straight to "change X", it may not have enough context about how X fits into the broader system.

A useful habit: start sessions on unfamiliar parts of the codebase with an exploration prompt before any edit request.

> "Read `src/app/_components/hero.tsx` and `src/app/page.tsx`, then tell me how the Hero component is used."

This surfaces assumptions early and prevents changes that technically work in isolation but break something upstream.

## 4. Use It for the Tasks You'd Otherwise Avoid

The biggest productivity gain comes from tasks you keep deprioritising because they feel tedious:

- Writing TypeScript types for an API response you've been using loosely typed
- Adding metadata and Open Graph tags to every page
- Extracting a magic number into a named constant across twenty files
- Writing a seed script for local development

These tasks are high-value but low-excitement. Claude handles them well, and getting them done removes friction for everything that comes after.

## 5. Review Diffs, Not Just Output

It's tempting to accept changes because the result *looks* right. But the diff is where the real information is. Scan every change — not to distrust Claude, but because:

- You'll catch unintended side effects (a removed prop, a changed default value)
- You'll understand your own codebase better
- You'll spot when Claude has made an assumption that doesn't match your intent

This is especially important for refactors touching multiple files. The overall direction may be right while a specific change is subtly wrong.

## 6. Iterate in Small Steps

Chaining complex instructions in a single prompt tends to produce worse results than breaking the work into steps. Each step gives you a checkpoint to verify before moving on.

For example, when building the projects page on this portfolio:

1. First: fetch the GitHub repos and understand the content
2. Then: explore the existing component patterns to match the style
3. Then: create the card component
4. Then: create the page using that component
5. Finally: wire up the navigation link

Doing this all in one shot would have produced something functional but probably misaligned with the existing design system. Staged steps produce tighter results.

## 7. Give Feedback Freely

If Claude does something you don't like — a pattern you disagree with, a response style that doesn't fit — say so directly. It adjusts within the session and, if you tell it to remember, across sessions.

The model is not precious about its choices. "Don't do X, do Y instead" is more useful than silently undoing the change and hoping the next attempt is different.

## Conclusion

Claude Code works best as a skilled collaborator. Give it real context, be precise about what you want, review what it produces, and build on each step deliberately.

The aim is to spend more time on decisions that require your judgement, and less on the mechanical work surrounding them.
