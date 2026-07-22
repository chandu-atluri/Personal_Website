import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import TurndownService from "turndown";

const turndown = new TurndownService({ headingStyle: "atx" });

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const password = formData.get("password");
  const file = formData.get("file");

  const adminPassword = process.env.BLOG_ADMIN_PASSWORD;
  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  if (!file.name.toLowerCase().endsWith(".docx")) {
    return NextResponse.json(
      { error: "Only .docx Word documents are supported." },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const { value: html } = await mammoth.convertToHtml({ buffer });
    const markdown = turndown.turndown(html).trim();

    if (!markdown) {
      return NextResponse.json(
        { error: "Couldn't find any text in that document." },
        { status: 400 }
      );
    }

    const firstHeading = markdown.match(/^#{1,2}\s+(.+)$/m);
    return NextResponse.json({
      markdown,
      suggestedTitle: firstHeading?.[1]?.trim(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to parse document.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
