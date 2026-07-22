"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mac, setMac] = useState(true);

  useEffect(() => {
    // navigator is unavailable during SSR; detect after mount to keep hydration in sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMac(/Mac|iPhone|iPad/.test(navigator.platform ?? navigator.userAgent));
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground"
        >
          Chandu Atluri
          <span className="rounded-full border border-cyber/30 bg-cyber/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-cyber">
            CISSP
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 sm:flex">
          <ul className="flex items-center gap-1">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-foreground"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="ml-2 flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-cyber hover:text-cyber"
            aria-label="Open command palette"
          >
            <span>Search</span>
            <kbd className="rounded border border-border px-1 py-px text-[10px]">
              {mac ? "⌘K" : "Ctrl K"}
            </kbd>
          </button>
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {open ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-border/80 px-6 py-3 sm:hidden">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-foreground/5 text-foreground"
                      : "text-muted hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
