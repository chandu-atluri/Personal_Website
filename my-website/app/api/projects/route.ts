import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createProject } from "@/lib/projects";

export async function POST(req: NextRequest) {
  let body: {
    title?: string;
    description?: string;
    tags?: string;
    metricValue?: string;
    metricLabel?: string;
    featured?: boolean;
    password?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { title, description, tags, metricValue, metricLabel, featured, password } = body;

  const adminPassword = process.env.BLOG_ADMIN_PASSWORD;
  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  if (!title?.trim() || !description?.trim()) {
    return NextResponse.json(
      { error: "Title and description are required." },
      { status: 400 }
    );
  }

  try {
    const project = await createProject({
      title,
      description,
      tags: (tags ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      metricValue: metricValue?.trim() || "",
      metricLabel: metricLabel?.trim() || "",
      featured: Boolean(featured),
    });
    revalidatePath("/projects");
    revalidatePath("/");
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create project.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
