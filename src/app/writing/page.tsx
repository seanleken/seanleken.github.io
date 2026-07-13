import Link from "next/link";
import { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing | Sean Pertet",
  description: "Notes on full-stack TypeScript engineering, architecture, and workflow.",
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <main>
      <div className="wrap sec-pad">
        <div className="sec-head">
          <span className="eyebrow">// writing</span>
          <h2>Writing</h2>
        </div>
        <div className="posts">
          {posts.map((post) => (
            <article className="post" key={post.slug}>
              <div className="post-meta">
                <b>{post.date.replaceAll("-", ".")}</b> &middot; {post.readingTime}
                {post.tags.length > 0 && <> &middot; {post.tags.join(" / ")}</>}
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <Link href={`/writing/${post.slug}`} className="read">
                Read →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
