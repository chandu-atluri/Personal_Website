"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import NetworkBackground from "@/components/NetworkBackground";
import Typewriter from "@/components/Typewriter";
import Terminal from "@/components/Terminal";
import { site } from "@/content/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid">
      <NetworkBackground />
      <div className="relative mx-auto grid max-w-5xl gap-12 px-6 pb-16 pt-20 sm:pb-24 sm:pt-28 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-4 flex items-center gap-2 font-mono text-sm text-cyber">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-cyber" />
            {site.location}
          </p>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            I secure the cloud — and make it{" "}
            <span className="text-glow bg-gradient-to-r from-accent to-cyber bg-clip-text text-transparent">
              a little more fun
            </span>{" "}
            to talk about.
          </h1>
          <p className="mt-5 min-h-14 text-lg text-muted sm:min-h-7">
            <Typewriter words={site.roles} />
          </p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
            {site.summary}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              View my work
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-cyber hover:text-cyber"
            >
              Get in touch
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center lg:justify-end"
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
