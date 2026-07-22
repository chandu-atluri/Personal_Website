import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createPost } from "@/lib/posts";

export async function POST(req: NextRequest) {
  let body: { title?: string; excerpt?: string; content?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { title, excerpt, content, password } = body;

  const adminPassword = process.env.BLOG_ADMIN_PASSWORD;
  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json(
      { error: "Title and content are required." },
      { status: 400 }
    );
  }

  try {
    const post = await createPost({
      title,
      excerpt: excerpt?.trim() || title.trim(),
      content,
    });
    revalidatePath("/blog");
    revalidatePath("/");
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create post.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
