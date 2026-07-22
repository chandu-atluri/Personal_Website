import Image from "next/image";

const MONOGRAM_COLORS = [
  "from-indigo-500 to-cyan-500",
  "from-cyan-500 to-emerald-500",
  "from-fuchsia-500 to-indigo-500",
  "from-amber-500 to-rose-500",
];

function monogram(name: string) {
  const clean = name.split("(")[0].trim();
  const words = clean.split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function colorFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash + name.charCodeAt(i)) % MONOGRAM_COLORS.length;
  return MONOGRAM_COLORS[hash];
}

export default function CompanyLogo({
  name,
  logo,
}: {
  name: string;
  logo?: string;
}) {
  if (logo) {
    return (
      <span className="flex h-11 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-white px-2.5 py-1.5">
        <Image
          src={logo}
          alt={`${name} logo`}
          width={120}
          height={32}
          className="h-full w-auto object-contain"
        />
      </span>
    );
  }

  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br font-mono text-sm font-semibold text-white ${colorFor(
        name
      )}`}
      aria-hidden="true"
    >
      {monogram(name)}
    </span>
  );
}
