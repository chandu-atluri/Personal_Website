"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { site } from "@/content/site";

type Command = {
  id: string;
  label: string;
  hint?: string;
  run: () => void;
};

export default function CommandPalette() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = useMemo(
    () => [
      { id: "home", label: "Go to Home", hint: "/", run: () => router.push("/") },
      {
        id: "projects",
        label: "Go to Projects",
        hint: "/projects",
        run: () => router.push("/projects"),
      },
      { id: "blog", label: "Go to Blog", hint: "/blog", run: () => router.push("/blog") },
      { id: "about", label: "Go to About", hint: "/about", run: () => router.push("/about") },
      {
        id: "contact",
        label: "Go to Contact",
        hint: "/contact",
        run: () => router.push("/contact"),
      },
      {
        id: "new-post",
        label: "New blog post",
        hint: "$ new-post",
        run: () => window.dispatchEvent(new Event("open-new-post-modal")),
      },
      {
        id: "theme",
        label: `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`,
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "email",
        label: `Email me (${site.email})`,
        run: () => {
          window.location.href = `mailto:${site.email}`;
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: site.github,
        run: () => window.open(site.github, "_blank", "noopener,noreferrer"),
      },
    ],
    [router, resolvedTheme, setTheme]
  );

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  function openPalette() {
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 10);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) {
          setOpen(false);
        } else {
          openPalette();
        }
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", openPalette);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", openPalette);
    };
  }, [open]);

  function handleQueryChange(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  function handleListKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[activeIndex];
      if (cmd) {
        cmd.run();
        setOpen(false);
      }
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 px-4 pt-24 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleListKeyDown}
            placeholder="Type a command or search…"
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-muted"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted">
            esc
          </kbd>
        </div>

        <ul className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-muted">No matches.</li>
          )}
          {filtered.map((cmd, i) => (
            <li key={cmd.id}>
              <button
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => {
                  cmd.run();
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                  i === activeIndex
                    ? "bg-cyber/10 text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                <span>{cmd.label}</span>
                {cmd.hint && (
                  <span className="font-mono text-xs text-muted">{cmd.hint}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
