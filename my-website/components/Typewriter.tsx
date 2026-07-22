"use client";

import { useEffect, useState } from "react";

export default function Typewriter({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Skip the typing animation entirely; just show the first word statically.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setText(words[0] ?? "");
      return;
    }

    const current = words[wordIndex % words.length];
    const typingSpeed = deleting ? 35 : 65;
    const atEnd = !deleting && text === current;
    const atStart = deleting && text === "";

    const timeout = setTimeout(
      () => {
        if (atEnd) {
          setTimeout(() => setDeleting(true), 1200);
          return;
        }
        if (atStart) {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
          return;
        }
        setText((t) =>
          deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
        );
      },
      atEnd ? 1200 : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return (
    <span className="font-mono">
      {text}
      <span className="animate-caret text-cyber">_</span>
    </span>
  );
}
