"use client";

export default function NewPostButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-new-post-modal"))}
      className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03] active:scale-[0.98]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
      New post
    </button>
  );
}
