import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";
import DateFormatter from "@/app/_components/date-formatter";
import CoverImage from "@/app/_components/cover-image";

export const metadata: Metadata = {
  title: "Blog | Sean Pertet",
  description:
    "Articles about cloud architecture, GCP, e-commerce integrations, and development best practices.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="pt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <section className="py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-portfolio-navy dark:text-white mb-4">
            Blog
          </h1>
          <p className="text-portfolio-slate dark:text-portfolio-light-slate mb-12 max-w-2xl leading-relaxed">
            Thoughts on cloud architecture, infrastructure, and the craft of
            building great software.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function BlogCard({ post }: { post: Post }) {
  return (
    <article className="group border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden hover:border-portfolio-blue hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <Link href={`/blog/${post.slug}`}>
        <CoverImage title={post.title} src={post.coverImage} />
        <div className="p-6">
          <div className="text-sm font-mono text-portfolio-slate dark:text-portfolio-light-slate mb-2">
            <DateFormatter dateString={post.date} />
          </div>
          <h2 className="text-xl font-bold text-portfolio-navy dark:text-white group-hover:text-portfolio-blue transition-colors duration-200 mb-2">
            {post.title}
          </h2>
          <p className="text-portfolio-slate dark:text-portfolio-light-slate line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
