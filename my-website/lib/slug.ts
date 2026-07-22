import type { SupabaseClient } from "@supabase/supabase-js";

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function uniqueSlug(
  supabase: SupabaseClient,
  table: string,
  title: string
): Promise<string> {
  const base = slugify(title);
  if (!base) throw new Error("Title must contain at least one letter or number.");

  let slug = base;
  let suffix = 2;
  while (true) {
    const { data } = await supabase
      .from(table)
      .select("slug")
      .eq("slug", slug)
      .maybeSingle();
    if (!data) return slug;
    slug = `${base}-${suffix}`;
    suffix += 1;
  }
}
