import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Chandu Atluri.",
};

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    label: "GitHub",
    value: site.github.replace("https://", ""),
    href: site.github,
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="font-mono text-sm text-cyber">$ sudo hire-me</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Get in touch
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
        Have a question, an opportunity, or just want to talk about Zero Trust and
        cloud security? I&apos;d love to hear from you &mdash; email is the fastest way
        to reach me.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {channels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target={channel.href.startsWith("http") ? "_blank" : undefined}
            rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="glow-border group rounded-2xl border border-border bg-surface p-6"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              {channel.label}
            </p>
            <p className="mt-2 text-sm font-medium text-foreground transition-colors group-hover:text-cyber">
              {channel.value}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
