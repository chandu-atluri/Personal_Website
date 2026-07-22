import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects built by Chandu Atluri.",
};

export default async function ProjectsPage() {
  let projects: Awaited<ReturnType<typeof getAllProjects>> = [];
  let loadError = false;
  try {
    projects = await getAllProjects();
  } catch {
    loadError = true;
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <p className="font-mono text-sm text-cyber">$ ls projects/</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Projects
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
        Things I&apos;m building outside of work — this list will grow over time.
      </p>

      {loadError ? (
        <p className="mt-12 text-sm text-red-500">
          Couldn&apos;t load projects — the database isn&apos;t configured yet.
        </p>
      ) : projects.length === 0 ? (
        <p className="mt-12 text-sm text-muted">
          Nothing here yet — first project coming soon.
        </p>
      ) : (
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
