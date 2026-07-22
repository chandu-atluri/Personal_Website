"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { site } from "@/content/site";
import { activeCertifications } from "@/content/certifications";
import { experience } from "@/content/experience";

type Line = { type: "input" | "output"; text: string };

const HELP_TEXT = [
  "Available commands:",
  "  whoami       who am I, professionally",
  "  skills       core technical skills",
  "  certs        active certifications",
  "  experience   work history, short version",
  "  contact      how to reach me",
  "  sudo hire-me you know what to do",
  "  theme        toggle light / dark mode",
  "  clear        clear the terminal",
  "  help         show this list again",
].join("\n");

function runCommand(
  raw: string,
  helpers: { toggleTheme: () => string; navigateContact: () => void }
): string {
  const cmd = raw.trim().toLowerCase();

  if (cmd === "") return "";
  if (cmd === "help") return HELP_TEXT;
  if (cmd === "whoami") {
    return `${site.name} — ${site.title} (${site.credential})\n${site.summary}`;
  }
  if (cmd === "skills") {
    return [
      "Cloud: Google Cloud Platform, Microsoft Azure",
      "Identity: Microsoft Entra ID, Cloud IAM, SAML/OAuth, SSO, RBAC",
      "Security: Zero Trust, VPC Service Controls, Conditional Access, MFA",
      "Automation: Terraform, ARM Templates, Jenkins, Infrastructure-as-Code",
    ].join("\n");
  }
  if (cmd === "certs") {
    return activeCertifications.map((c) => `[x] ${c.name} — ${c.issuer}`).join("\n");
  }
  if (cmd === "experience") {
    return experience
      .map((e) => `${e.start} – ${e.end}  ${e.role} @ ${e.company}`)
      .join("\n");
  }
  if (cmd === "contact") {
    return `email  ${site.email}\ngithub ${site.github}\n\ntip: try 'sudo hire-me'`;
  }
  if (cmd === "sudo hire-me") {
    helpers.navigateContact();
    return "Permission granted.\nRedirecting to /contact ...";
  }
  if (cmd === "theme") {
    return helpers.toggleTheme();
  }
  if (cmd === "sudo rm -rf /") {
    return "Nice try. Least-privilege access enforced. 🛡️";
  }
  return `command not found: ${raw}\nType 'help' to see available commands.`;
}

export default function Terminal() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [lines, setLines] = useState<Line[]>([
    {
      type: "output",
      text: `${site.name.split(" ")[0]}'s terminal — type 'help' to get started.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function toggleTheme() {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
    return `Theme switched to ${next}.`;
  }

  function submit(raw: string) {
    const trimmed = raw.trim();
    setLines((prev) => [...prev, { type: "input", text: raw }]);

    if (trimmed.toLowerCase() === "clear") {
      setLines([]);
      return;
    }

    const output = runCommand(trimmed, {
      toggleTheme,
      navigateContact: () => setTimeout(() => router.push("/contact"), 700),
    });
    if (output) {
      setLines((prev) => [...prev, { type: "output", text: output }]);
    }
    setHistory((prev) => [...prev, raw]);
    setHistoryIndex(null);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      submit(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex =
        historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  }

  const quickCommands = ["whoami", "skills", "certs", "sudo hire-me"];

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface/90 shadow-2xl shadow-black/10 backdrop-blur-sm dark:shadow-black/40"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 font-mono text-xs text-muted">chandu@cloud — zsh</span>
      </div>

      <div
        ref={scrollRef}
        className="h-64 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.type === "input"
                ? "text-foreground"
                : "whitespace-pre-wrap text-muted"
            }
          >
            {line.type === "input" ? (
              <span>
                <span className="text-cyber">➜</span> <span className="text-accent">~</span>{" "}
                {line.text}
              </span>
            ) : (
              line.text
            )}
          </div>
        ))}

        <div className="flex items-center gap-2 text-foreground">
          <span className="text-cyber">➜</span>
          <span className="text-accent">~</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal command input"
            className="flex-1 bg-transparent outline-none"
          />
          <span className="animate-caret text-cyber">_</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border px-4 py-2.5">
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => submit(cmd)}
            className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-cyber hover:text-cyber"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
