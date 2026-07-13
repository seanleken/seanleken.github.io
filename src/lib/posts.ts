import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = join(process.cwd(), "content/posts");

export type Frontmatter = {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  cover?: string;
};

export type PostMeta = Frontmatter & {
  slug: string;
  readingTime: string;
};

export type Post = PostMeta & {
  content: string;
};

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"));
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...(data as Frontmatter),
    slug: realSlug,
    content,
    readingTime: readingTime(content).text,
  };
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}
