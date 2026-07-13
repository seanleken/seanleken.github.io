import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

import { mdxComponents } from "@/app/_components/mdx/mdx";
import { rehypePrettyCodeOptions } from "@/lib/pretty-code";
import { getAllPosts, getPostSlugs, getPostBySlug } from "@/lib/posts";
import { extractHeadings } from "@/lib/headings";
import { Toc } from "@/app/_components/mdx/toc";
import { ReadingProgress } from "@/app/_components/mdx/reading-progress";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const slugs = getPostSlugs();

  if (!slugs.includes(`${slug}.mdx`)) {
    return notFound();
  }

  const post = getPostBySlug(slug);
  const headings = extractHeadings(post.content);

  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, rehypePrettyCodeOptions]],
      },
    },
    components: mdxComponents,
  });

  return (
    <>
      <ReadingProgress />
      <main>
        <div className="shell">
          <div className="article-head">
            <Link className="back" href="/writing">
              ← back to writing
            </Link>
            <div className="meta">
              <b>{post.date.replaceAll("-", ".")}</b> &middot; {post.readingTime} &middot;{" "}
              {post.tags.join(" / ")}
            </div>
            <h1>{post.title}</h1>
            <div className="byline">
              <Image
                className="av"
                src="/assets/headshot.jpg"
                alt="Sean Pertet"
                width={30}
                height={30}
              />
              Sean Pertet &middot; Senior Full-Stack Engineer
            </div>
            {post.cover && (
              <div className="cover">
                <Image src={post.cover} alt={post.title} fill sizes="720px" priority />
              </div>
            )}
          </div>

          <div className="layout">
            <article className="article">{content}</article>
            <Toc headings={headings} />
          </div>
        </div>

        <section className="foot-cta">
          <div className="inner">
            <h3>Building something in TypeScript?</h3>
            <p>I&apos;m open to senior full-stack roles and interesting contract work.</p>
            <Link className="btn" href="/#contact">
              Get in touch →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const slugs = getPostSlugs();

  if (!slugs.includes(`${slug}.mdx`)) {
    return notFound();
  }

  const post = getPostBySlug(slug);
  const title = `${post.title} | Sean Pertet`;

  return {
    title,
    description: post.excerpt,
    openGraph: {
      title,
      description: post.excerpt,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
