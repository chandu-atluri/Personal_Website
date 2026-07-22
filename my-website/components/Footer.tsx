import { site } from "@/content/site";

const socials = [
  { href: site.github, label: "GitHub" },
  { href: `mailto:${site.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/80">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <div className="flex items-center gap-5">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-foreground"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-muted/70 font-mono">
        Built with Next.js &amp; Tailwind CSS · press{" "}
        <kbd className="rounded border border-border px-1 py-px">⌘K</kbd> to explore
      </p>
    </footer>
  );
}
