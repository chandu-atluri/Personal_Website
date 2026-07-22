import Link from "next/link";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import StatCounter from "@/components/StatCounter";
import { getAllProjects } from "@/lib/projects";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/content/site";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredProjects = await getAllProjects()
    .then((projects) => projects.filter((p) => p.featured).slice(0, 3))
    .catch(() => []);
  const recentPosts = await getAllPosts()
    .then((posts) => posts.slice(0, 3))
    .catch(() => []);

  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mx-auto grid max-w-xs grid-cols-2 gap-4">
          {site.stats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Projects
            </h2>
            <Link
              href="/projects"
              className="text-sm font-medium text-accent hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {recentPosts.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 pb-24">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Recent writing
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-accent hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
