import type { Metadata } from "next";
import Timeline from "@/components/Timeline";
import CompanyLogo from "@/components/CompanyLogo";
import { experience, education } from "@/content/experience";
import { activeCertifications, previousCertifications } from "@/content/certifications";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Background, experience, and certifications for Chandu Atluri, CISSP.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="font-mono text-sm text-cyber">$ whoami</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        About me
      </h1>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
        <p>
          I&apos;m {site.name}, a {site.title.toLowerCase()} based in {site.location}.
          Over 8+ years in IT — the last 5 focused specifically on enterprise cloud
          security — I&apos;ve built my career around one question: how do you let
          teams move fast on GCP and Azure without leaving the front door open?
        </p>
        <p>
          That&apos;s meant architecting Zero Trust environments, modernizing IAM
          platforms, and standing up defense-in-depth controls for multi-tenant cloud
          workloads. I&apos;ve led security architecture reviews across 150+ cloud
          workloads, designed enterprise identity federation for Fortune 500 SSO
          rollouts, and automated cloud governance with Infrastructure-as-Code so
          security scales with engineering instead of trailing behind it.
        </p>
        <p>
          I hold a CISSP and a Master&apos;s in Cybersecurity from NYU, and I spend a
          fair amount of time these days on the security side of AI adoption —
          training teams on AI-related risk and helping them adopt it safely.
        </p>
      </div>

      <h2 className="mt-16 text-xl font-semibold tracking-tight text-foreground">
        Experience
      </h2>
      <div className="mt-8">
        <Timeline entries={experience} />
      </div>

      <h2 className="mt-16 text-xl font-semibold tracking-tight text-foreground">
        Education
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {education.map((item) => (
          <div
            key={item.degree}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5"
          >
            <CompanyLogo name={item.school} logo={item.logo} />
            <div>
              <p className="text-sm font-semibold text-foreground">{item.degree}</p>
              <p className="mt-1 text-sm text-muted">{item.school}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-xl font-semibold tracking-tight text-foreground">
        Certifications
      </h2>
      <p className="mt-2 text-sm text-muted">Active</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {activeCertifications.map((cert) => (
          <span
            key={cert.name}
            className="glow-border rounded-full border border-cyber/30 bg-cyber/10 px-3 py-1.5 text-xs font-medium text-cyber"
            title={cert.issuer}
          >
            {cert.name}
          </span>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted">Previously held</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {previousCertifications.map((cert) => (
          <span
            key={cert.name}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted/70"
            title={cert.issuer}
          >
            {cert.name}
          </span>
        ))}
      </div>
    </div>
  );
}
