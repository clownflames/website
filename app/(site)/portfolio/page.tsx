import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { ProjectCard } from "@/components/site/project-card";
import { CtaBand } from "@/components/site/cta-band";
import { ButtonLink } from "@/components/ui/button-link";
import { getProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Selected websites, e-commerce builds, lead engines and custom software from Erstian Technologies.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();
  const [lead, ...rest] = projects;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="shell relative grid gap-8 py-14 md:py-20 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <p className="eyebrow flex items-center gap-2 text-brand">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              Selected work
            </p>
            <h1 className="mt-5 max-w-3xl text-balance text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[3.7rem]">
              Builds that earned their keep.
            </h1>
            <p className="mt-6 max-w-xl text-[1rem] leading-8 text-ink/60">
              A mix of delivered projects and representative builds. Where client approvals are
              pending, names and numbers are withheld — the thinking is the same.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink/40">What we build</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Websites", "E-commerce", "Lead engines", "CRM/ERP", "Brand systems", "Automation"].map((tag) => (
                <span className="rounded-full bg-cream px-2.5 py-1 text-[0.7rem] font-medium text-ink/55" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <ButtonLink className="mt-5 w-full" href="/contact" variant="dark">
              Start a project
              <Icon name="arrow-up-right" size={15} />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="shell py-14 md:py-20">
        {lead ? (
          <div className="grid gap-5 lg:grid-cols-2">
            <ProjectCard large project={lead} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {rest.slice(0, 2).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        ) : null}

        {rest.length > 2 ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.slice(2).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : null}

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line p-12 text-center">
            <p className="text-sm text-ink/45">Case studies are being prepared. Check back shortly.</p>
          </div>
        ) : null}

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-ink p-6 text-paper sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-[1.05rem] font-semibold">Your project could be next.</p>
            <p className="mt-1 text-sm text-paper/50">Tell us the goal. We will tell you what it takes.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/free-audit" variant="lime">
              Free business audit
            </ButtonLink>
            <ButtonLink href="/contact" variant="light">
              Talk to us
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
