import Link from "next/link";
import { Post } from "@/interfaces/post";
import DateFormatter from "./date-formatter";

type Props = {
  posts: Post[];
};

export function BlogPreview({ posts }: Props) {
  const previewPosts = posts.slice(0, 3);

  if (previewPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-18">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-portfolio-navy dark:text-white">
            Latest Articles
          </h2>
          <Link
            href="/blog"
            className="text-portfolio-blue hover:underline font-medium transition-colors duration-200"
          >
            View All →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {previewPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="text-xs font-mono text-portfolio-light-slate mb-3">
                  <DateFormatter dateString={post.date} />
                </div>
                <h3 className="text-xl font-semibold text-portfolio-navy dark:text-white mb-2 hover:text-portfolio-blue transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-sm text-portfolio-slate dark:text-portfolio-light-slate line-clamp-3">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
