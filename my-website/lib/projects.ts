import { getSupabase } from "./supabase";
import { uniqueSlug } from "./slug";

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  metric: {
    value: string;
    label: string;
  };
  featured: boolean;
};

export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await getSupabase()
    .from("projects")
    .select(
      "slug, title, description, tags, metric_value, metric_label, featured"
    )
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map((row) => ({
    slug: row.slug,
    title: row.title,
    description: row.description,
    tags: row.tags,
    metric: {
      value: row.metric_value,
      label: row.metric_label,
    },
    featured: row.featured,
  }));
}

export async function createProject(input: {
  title: string;
  description: string;
  tags: string[];
  metricValue: string;
  metricLabel: string;
  featured: boolean;
}): Promise<Project> {
  const supabase = getSupabase();

  const slug = await uniqueSlug(
    supabase,
    "projects",
    input.title
  );

  const { count } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  const sortOrder = count ?? 0;

  const title = input.title.trim();
  const description = input.description.trim();
  const metricValue = input.metricValue.trim();
  const metricLabel = input.metricLabel.trim();

  const { error } = await supabase.from("projects").insert({
    slug,
    title,
    description,
    tags: input.tags,
    metric_value: metricValue,
    metric_label: metricLabel,
    featured: input.featured,
    sort_order: sortOrder,
  });

  if (error) throw new Error(error.message);

  return {
    slug,
    title,
    description,
    tags: input.tags,
    metric: {
      value: metricValue,
      label: metricLabel,
    },
    featured: input.featured,
  };
}
