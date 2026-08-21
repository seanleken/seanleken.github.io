import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getSortedPosts } from "@/lib/posts";
import { SITE_NAME, SITE_DESCRIPTION } from "@/consts";

export async function GET(context: APIContext) {
  const posts = await getSortedPosts();

  return rss({
    title: `${SITE_NAME} | Writing`,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: posts.map(({ entry }) => ({
      title: entry.data.title,
      description: entry.data.excerpt,
      pubDate: new Date(entry.data.date),
      link: `/writing/${entry.id}/`,
      categories: entry.data.tags,
    })),
  });
}
