"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.4 }}
      className="glow-border group flex flex-col rounded-2xl border border-border bg-surface p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
        <span className="shrink-0 rounded-full border border-cyber/30 bg-cyber/10 px-2.5 py-1 font-mono text-xs font-semibold text-cyber">
          {project.metric.value}
        </span>
      </div>
      <p className="text-xs text-muted">{project.metric.label}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-foreground/5 px-2.5 py-1 text-xs font-medium text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
