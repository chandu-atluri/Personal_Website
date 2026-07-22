import { marked } from "marked";
import { getSupabase } from "./supabase";
import { uniqueSlug } from "./slug";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

export type Post = PostMeta & {
  contentHtml: string;
};

export function formatPostDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const { data, error } = await getSupabase()
    .from("posts")
    .select("slug, title, date, excerpt")
    .order("date", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await getSupabase()
    .from("posts")
    .select("slug, title, date, excerpt, content")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;

  return {
    slug: data.slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    contentHtml: marked.parse(data.content, { async: false }) as string,
  };
}

export async function createPost(input: {
  title: string;
  excerpt: string;
  content: string;
}): Promise<PostMeta> {
  const supabase = getSupabase();
  const slug = await uniqueSlug(supabase, "posts", input.title);

  const date = new Date().toISOString().slice(0, 10);
  const title = input.title.trim();
  const excerpt = input.excerpt.trim();
  const content = input.content.trim();

  const { error } = await supabase
    .from("posts")
    .insert({ slug, title, date, excerpt, content });

  if (error) throw new Error(error.message);

  return { slug, title, date, excerpt };
}
