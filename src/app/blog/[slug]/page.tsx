import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { PostBody } from "@/app/_components/post-body";
import DateFormatter from "@/app/_components/date-formatter";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <article className="py-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-portfolio-blue hover:underline mb-8 transition-colors duration-200"
          >
            ← Back to Blog
          </Link>

          <header className="mb-12 max-w-3xl">
            <div className="text-sm font-mono text-portfolio-slate dark:text-portfolio-light-slate mb-4">
              <DateFormatter dateString={post.date} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-portfolio-navy dark:text-white mb-6">
              {post.title}
            </h1>
          </header>

          <div className="mb-12 rounded-lg overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1300}
              height={630}
              className="w-full"
              priority
            />
          </div>

          <PostBody content={content} />
        </article>
      </div>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Sean Pertet`;

  return {
    title,
    description: post.excerpt,
    openGraph: {
      title,
      description: post.excerpt,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
