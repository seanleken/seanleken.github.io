import Link from "next/link";
import { PostMeta } from "@/lib/posts";

type Props = {
  posts: PostMeta[];
};

export function WritingPreview({ posts }: Props) {
  const previewPosts = posts.slice(0, 2);

  if (previewPosts.length === 0) {
    return null;
  }

  return (
    <section id="writing">
      <div className="wrap sec-pad">
        <div className="sec-head">
          <div className="row">
            <div>
              <span className="eyebrow">// writing</span>
              <h2>Latest articles</h2>
            </div>
            <Link href="/writing" className="view-all">
              View all →
            </Link>
          </div>
        </div>
        <div className="posts">
          {previewPosts.map((post) => (
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
    </section>
  );
}
