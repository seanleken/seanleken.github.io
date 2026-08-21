import { getCollection, render, type CollectionEntry } from "astro:content";

export type PostMeta = {
  entry: CollectionEntry<"posts">;
  readingTime: string;
};

/**
 * Posts newest-first, each with its reading time resolved.
 *
 * Reading time is injected by the remark plugin into `remarkPluginFrontmatter`,
 * which only exists after `render()` — it is not on `entry.data`. Rendering
 * every post to build a list is fine at this scale (build-time only, a handful
 * of files); revisit if the blog grows into the hundreds.
 */
export async function getSortedPosts(): Promise<PostMeta[]> {
  const posts = await getCollection("posts");
  const withMeta = await Promise.all(
    posts.map(async (entry) => {
      const { remarkPluginFrontmatter } = await render(entry);
      return { entry, readingTime: remarkPluginFrontmatter.readingTime as string };
    }),
  );
  return withMeta.sort((a, b) => (a.entry.data.date > b.entry.data.date ? -1 : 1));
}

/** `2026-01-01` → `2026.01.01`, matching the site's mono date style. */
export function formatDate(date: string): string {
  return date.replaceAll("-", ".");
}
