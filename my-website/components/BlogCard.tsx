import Link from "next/link";
import { formatPostDate, type PostMeta } from "@/lib/posts";

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glow-border group block rounded-2xl border border-border bg-surface p-6"
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted">
        {formatPostDate(post.date)}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
        Read more
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:translate-x-0.5"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
