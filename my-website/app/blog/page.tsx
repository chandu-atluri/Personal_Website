import type { Metadata } from "next";
import Link from "next/link";
import NewPostButton from "@/components/NewPostButton";
import { formatPostDate, getAllPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on Zero Trust, cloud security architecture, and AI risk.",
};

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getAllPosts>> = [];
  let loadError = false;
  try {
    posts = await getAllPosts();
  } catch {
    loadError = true;
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-sm text-cyber">$ tail -f blog.log</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Blog
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            Notes on Zero Trust, cloud security architecture, and AI risk &mdash;
            newest first.
          </p>
        </div>
        <NewPostButton />
      </div>

      {loadError ? (
        <p className="mt-14 text-sm text-red-500">
          Couldn&apos;t load posts — the database isn&apos;t configured yet. See
          the README for Supabase setup.
        </p>
      ) : posts.length === 0 ? (
        <p className="mt-14 text-sm text-muted">
          Nothing published yet — click New post to write the first one.
        </p>
      ) : (
        <ol className="relative mt-14 border-l border-border pl-8">
          {posts.map((post, i) => (
            <li key={post.slug} className="pb-12 last:pb-0">
              <span
                className={`absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-background ${
                  i === 0 ? "animate-pulse-dot bg-cyber" : "bg-accent"
                }`}
              />
              <Link href={`/blog/${post.slug}`} className="group block">
                <p className="font-mono text-xs text-cyber">
                  {formatPostDate(post.date)}
                </p>
                <h2 className="mt-1.5 text-xl font-semibold text-foreground transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
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
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
