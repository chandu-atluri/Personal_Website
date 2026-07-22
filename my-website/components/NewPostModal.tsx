"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const emptyForm = { title: "", excerpt: "", content: "", password: "" };

export default function NewPostModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "error">(
    "idle"
  );
  const [uploadError, setUploadError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onOpenRequest() {
      setForm(emptyForm);
      setStatus("idle");
      setError("");
      setUploadStatus("idle");
      setUploadError("");
      setOpen(true);
      setTimeout(() => titleRef.current?.focus(), 10);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("open-new-post-modal", onOpenRequest);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("open-new-post-modal", onOpenRequest);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      setOpen(false);
      router.push(`/blog/${data.post.slug}`);
      router.refresh();
    } catch {
      setError("Network error — is the site running?");
      setStatus("error");
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!form.password) {
      setUploadStatus("error");
      setUploadError("Enter the admin password first, then upload.");
      return;
    }

    setUploadStatus("uploading");
    setUploadError("");

    try {
      const body = new FormData();
      body.append("file", file);
      body.append("password", form.password);

      const res = await fetch("/api/posts/parse-document", {
        method: "POST",
        body,
      });
      const data = await res.json();

      if (!res.ok) {
        setUploadStatus("error");
        setUploadError(data.error ?? "Couldn't parse that document.");
        return;
      }

      setForm((f) => ({
        ...f,
        title: f.title || data.suggestedTitle || f.title,
        content: f.content ? `${f.content}\n\n${data.markdown}` : data.markdown,
      }));
      setUploadStatus("idle");
    } catch {
      setUploadStatus("error");
      setUploadError("Network error while uploading.");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-16 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="New blog post"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl border border-border bg-surface shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <p className="font-mono text-sm text-cyber">$ new-post</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="text-muted transition-colors hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
          <div>
            <label htmlFor="title" className="text-xs font-medium text-muted">
              Title
            </label>
            <input
              ref={titleRef}
              id="title"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-cyber"
              placeholder="Zero Trust Isn't a Product"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="text-xs font-medium text-muted">
              Excerpt <span className="text-muted/60">(shown on the blog list)</span>
            </label>
            <input
              id="excerpt"
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-cyber"
              placeholder="One line summarizing the post"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-xs font-medium text-muted">
              Admin password
            </label>
            <input
              id="password"
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-cyber"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="content" className="text-xs font-medium text-muted">
                Content <span className="text-muted/60">(Markdown)</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  if (!form.password) {
                    setUploadStatus("error");
                    setUploadError("Enter the admin password first, then upload.");
                    return;
                  }
                  setUploadStatus("idle");
                  setUploadError("");
                  fileInputRef.current?.click();
                }}
                disabled={uploadStatus === "uploading"}
                className="inline-flex items-center gap-1 text-xs font-medium text-cyber transition-colors hover:text-foreground disabled:opacity-60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 17V3M12 3 7 8M12 3l5 5" />
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                </svg>
                {uploadStatus === "uploading" ? "Converting…" : "Upload .docx"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            <textarea
              id="content"
              required
              rows={8}
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              className="mt-1 w-full resize-y rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm text-foreground outline-none focus:border-cyber"
              placeholder="## Heading&#10;&#10;Write your post here, or upload a Word doc above."
            />
            {uploadStatus === "error" && (
              <p className="mt-1 text-xs text-red-500">{uploadError}</p>
            )}
          </div>

          {status === "error" && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
            >
              {status === "submitting" ? "Publishing…" : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
