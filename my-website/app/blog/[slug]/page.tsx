import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate, getPostBySlug } from "@/lib/posts";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <Link
        href="/blog"
        className="text-sm font-medium text-muted transition-colors hover:text-foreground"
      >
        &larr; Back to blog
      </Link>

      <header className="mt-6">
        <p className="text-sm font-medium text-accent">{formatPostDate(post.date)}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
      </header>

      <div
        className="prose prose-zinc mt-10 max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
