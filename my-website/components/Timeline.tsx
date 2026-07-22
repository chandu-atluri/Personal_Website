"use client";

import { motion } from "framer-motion";
import CompanyLogo from "@/components/CompanyLogo";
import type { ExperienceEntry } from "@/content/experience";

export default function Timeline({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <ol className="relative border-l border-border pl-8">
      {entries.map((entry, i) => (
        <motion.li
          key={`${entry.company}-${entry.role}`}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="mb-10 last:mb-0"
        >
          <span
            className={`absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-background ${
              entry.current ? "animate-pulse-dot bg-cyber" : "bg-accent"
            }`}
          />
          <div className="flex gap-4">
            <CompanyLogo name={entry.company} logo={entry.logo} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold text-foreground">{entry.role}</h3>
                <span className="font-mono text-xs text-cyber">
                  {entry.start} – {entry.end}
                </span>
              </div>
              <p className="text-sm text-muted">
                {entry.company} · {entry.location}
              </p>
            </div>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
