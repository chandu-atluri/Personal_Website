"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const emptyForm = {
  title: "",
  description: "",
  tags: "",
  metricValue: "",
  metricLabel: "",
  featured: true,
  password: "",
};

export default function NewProjectModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onOpenRequest() {
      setForm(emptyForm);
      setStatus("idle");
      setError("");
      setOpen(true);
      setTimeout(() => titleRef.current?.focus(), 10);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("open-new-project-modal", onOpenRequest);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("open-new-project-modal", onOpenRequest);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/projects", {
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
      router.push("/projects");
      router.refresh();
    } catch {
      setError("Network error — is the site running?");
      setStatus("error");
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
        aria-label="New project"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl border border-border bg-surface shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <p className="font-mono text-sm text-cyber">$ new-project</p>
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
            <label htmlFor="p-title" className="text-xs font-medium text-muted">
              Title
            </label>
            <input
              ref={titleRef}
              id="p-title"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-cyber"
              placeholder="Personal Threat-Modeling CLI"
            />
          </div>

          <div>
            <label htmlFor="p-description" className="text-xs font-medium text-muted">
              Description
            </label>
            <textarea
              id="p-description"
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="mt-1 w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-cyber"
              placeholder="A short paragraph on what it is and why you built it."
            />
          </div>

          <div>
            <label htmlFor="p-tags" className="text-xs font-medium text-muted">
              Tags <span className="text-muted/60">(comma-separated)</span>
            </label>
            <input
              id="p-tags"
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-cyber"
              placeholder="GCP, Terraform, Zero Trust"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="p-metric-value" className="text-xs font-medium text-muted">
                Metric value
              </label>
              <input
                id="p-metric-value"
                value={form.metricValue}
                onChange={(e) =>
                  setForm((f) => ({ ...f, metricValue: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-cyber"
                placeholder="30%"
              />
            </div>
            <div>
              <label htmlFor="p-metric-label" className="text-xs font-medium text-muted">
                Metric label
              </label>
              <input
                id="p-metric-label"
                value={form.metricLabel}
                onChange={(e) =>
                  setForm((f) => ({ ...f, metricLabel: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-cyber"
                placeholder="fewer false positives"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              className="h-4 w-4 rounded border-border accent-accent"
            />
            Show on homepage
          </label>

          <div>
            <label htmlFor="p-password" className="text-xs font-medium text-muted">
              Admin password
            </label>
            <input
              id="p-password"
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-cyber"
            />
          </div>

          {status === "error" && <p className="text-sm text-red-500">{error}</p>}

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
