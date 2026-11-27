import Link from "next/link";
import { Icon, StarRating } from "@/components/icons";
import { CtaBand } from "@/components/site/cta-band";
import { ProjectCard } from "@/components/site/project-card";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/service-card";
import { ButtonLink } from "@/components/ui/button-link";
import { company, faqs, processSteps, services, stats } from "@/lib/content";
import { getPosts, getProjects, getTestimonials } from "@/lib/queries";
import { formatDate } from "@/lib/format";

const auditRows = [
  { label: "Mobile experience", state: "good" },
  { label: "Search visibility", state: "warn" },
  { label: "Lead capture flow", state: "warn" },
  { label: "Trust & reviews", state: "good" },
];

const marqueeItems = [
  "Websites",
  "Performance ads",
  "WhatsApp automation",
  "SEO",
  "Branding",
  "CRM & ERP",
  "E-commerce",
  "Cloud hosting",
  "Video creative",
];

const differentiators = [
  {
    icon: "target",
    title: "Outcomes, not deliverables",
    body: "Every engagement starts with the number we are moving — enquiries, bookings, orders or cost per lead — and ends with proof it moved.",
  },
  {
    icon: "users",
    title: "Senior-led, small team",
    body: "You work directly with the strategist and developer doing the work. No account manager relay, no hand-off to interns.",
  },
  {
    icon: "layers",
    title: "One partner, whole stack",
    body: "Website, ads, automation, CRM and hosting under one roof — so nothing gets lost between three different vendors.",
  },
  {
    icon: "shield",
    title: "Built to keep running",
    body: "Backups, monitoring, security and documentation come standard. Your business should not depend on one freelancer's laptop.",
  },
];

export default async function HomePage() {
  const [testimonials, projects, posts] = await Promise.all([
    getTestimonials(),
    getProjects(),
    getPosts(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="pointer-events-none absolute -left-40 top-0 size-[38rem] rounded-full bg-brand/10 blur-[120px]" />
        <div className="shell relative grid gap-14 pb-16 pt-12 md:pb-24 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
          <div className="rise">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1.5 text-[0.72rem] font-medium text-ink/70 backdrop-blur">
              <span className="inline-flex size-1.5 rounded-full bg-lime ring-2 ring-lime/30" />
              Free business audit
              <span className="text-ink/25">·</span>
              Reply within 48 hours
            </div>

            <h1 className="mt-6 max-w-[38rem] text-balance text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[3.2rem] lg:text-[3.85rem]">
              We build the digital engine behind{" "}
              <span className="relative inline-block">
                <span className="relative z-10">growing businesses.</span>
                <span className="absolute inset-x-0 bottom-1 z-0 h-[0.42em] -rotate-[0.6deg] bg-lime" />
              </span>
            </h1>

            <p className="mt-6 max-w-[34rem] text-[1.02rem] leading-8 text-ink/60">
              Websites that convert, campaigns that pay for themselves, WhatsApp automation that
              never misses a lead, and custom software that runs the operation — from one team that
              is accountable for the result.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/free-audit" size="lg">
                View my business — free
                <Icon name="arrow-up-right" size={18} />
              </ButtonLink>
              <ButtonLink href="/services" size="lg" variant="outline">
                Explore services
                <Icon name="arrow-right" size={18} />
              </ButtonLink>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[0.78rem] text-ink/55">
              {["No cost, no obligation", "Reviewed manually", "48-hour reply"].map((item) => (
                <li className="flex items-center gap-1.5" key={item}>
                  <Icon className="text-brand" name="check" size={14} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Audit visual */}
          <div className="relative mx-auto w-full max-w-[30rem] lg:mx-0 lg:ml-auto">
            <div className="floaty relative rounded-[1.75rem] border border-white/10 bg-ink p-5 text-paper shadow-[0_40px_100px_-40px_rgba(10,12,18,0.7)] sm:p-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="grid size-7 place-items-center rounded-lg bg-lime text-ink">
                    <Icon name="search" size={15} />
                  </span>
                  Business audit
                </div>
                <span className="rounded-full border border-lime/30 bg-lime/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-lime">
                  Free
                </span>
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
                <div className="flex items-center gap-2 text-[0.72rem] text-paper/40">
                  <Icon name="globe" size={13} />
                  yourbusiness.com
                  <span className="ml-auto flex items-center gap-1 text-lime/80">
                    <span className="size-1.5 rounded-full bg-lime" /> live review
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-5">
                <div
                  className="relative grid size-[5.5rem] shrink-0 place-items-center rounded-full"
                  style={{ background: "conic-gradient(#d8f45c 0deg 295deg, rgba(255,255,255,0.12) 295deg 360deg)" }}
                >
                  <div className="grid size-[4.35rem] place-items-center rounded-full bg-ink">
                    <div className="text-center leading-none">
                      <p className="text-2xl font-semibold tracking-tight">82</p>
                      <p className="mt-1 text-[0.55rem] uppercase tracking-[0.14em] text-paper/40">score</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold">Growth readiness</p>
                  <p className="mt-1 text-xs leading-5 text-paper/45">
                    Strong foundation. Three fixes could unlock significantly more enquiries.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                {auditRows.map((row) => (
                  <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-[0.78rem]" key={row.label}>
                    <span className={row.state === "good" ? "text-lime" : "text-amber-300"}>
                      <Icon name={row.state === "good" ? "check" : "sparkle"} size={14} />
                    </span>
                    <span className="text-paper/70">{row.label}</span>
                    <span className="ml-auto text-[0.66rem] uppercase tracking-[0.12em] text-paper/30">
                      {row.state === "good" ? "Pass" : "Review"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-lime p-4 text-ink">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink/50">Top growth idea</p>
                <p className="mt-1.5 text-[0.82rem] font-medium leading-5">
                  Add a booking form above the fold and confirm every enquiry on WhatsApp within 5 minutes.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-2 hidden items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-lg sm:flex">
              <div className="flex -space-x-2">
                {["AM", "RK", "SP"].map((initials, index) => (
                  <span
                    className={
                      "grid size-8 place-items-center rounded-full border-2 border-white text-[0.62rem] font-semibold text-white " +
                      ["bg-brand", "bg-ink", "bg-[#0f766e]"][index]
                    }
                    key={initials}
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <div>
                <p className="text-[0.73rem] font-semibold text-ink">Reviewed by strategists</p>
                <p className="text-[0.66rem] text-ink/45">Not an automated scan</p>
              </div>
            </div>

            <div className="absolute -right-2 -top-4 hidden rotate-6 rounded-xl border border-line bg-white px-3.5 py-2 shadow-md sm:block">
              <p className="flex items-center gap-1.5 text-[0.7rem] font-semibold text-ink">
                <Icon className="text-brand" name="clock" size={13} />
                48h reply
              </p>
            </div>
          </div>
        </div>

        <div className="shell relative pb-10">
          <div className="grid divide-y divide-line rounded-2xl border border-line bg-white/60 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div className={"px-6 py-5 " + (index > 0 ? "sm:border-l sm:border-line" : "")} key={stat.label}>
                <p className="text-2xl font-semibold tracking-[-0.03em] text-ink">{stat.value}</p>
                <p className="mt-1 text-[0.78rem] font-medium text-ink/70">{stat.label}</p>
                <p className="mt-1 text-[0.7rem] leading-5 text-ink/40">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-b border-line bg-ink py-4">
        <div className="marquee-track items-center gap-10">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span className="flex shrink-0 items-center gap-10 text-[0.78rem] font-medium uppercase tracking-[0.2em] text-paper/55" key={item + index}>
              {item}
              <span className="size-1.5 rounded-full bg-lime" />
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <section className="shell py-16 md:py-24" id="services">
        <SectionHeading
          action={
            <ButtonLink href="/services" size="md" variant="outline">
              All services
              <Icon name="arrow-up-right" size={16} />
            </ButtonLink>
          }
          description="Nine connected practice areas. Start with the one that is costing you the most right now, and grow into the rest when it makes sense."
          eyebrow="What we do"
          title="One partner for everything digital."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* Free audit feature */}
      <section className="border-y border-line bg-cream/50">
        <div className="shell grid gap-12 py-16 md:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow flex items-center gap-2 text-brand">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              View my business
            </p>
            <h2 className="mt-4 max-w-lg text-balance text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-4xl lg:text-[2.9rem]">
              A free second opinion, from someone who does this every day.
            </h2>
            <p className="mt-5 max-w-lg text-[0.97rem] leading-7 text-ink/55">
              Submit your website and our team will go through it manually — like a customer would.
              You get a scored snapshot, the gaps we would fix first, and growth ideas for the next
              90 days. No cost, no pitch deck, no obligation.
            </p>

            <ol className="mt-8 space-y-5">
              {[
                { n: "01", t: "Share your business", d: "Website, city, what you sell and what you want more of." },
                { n: "02", t: "We review it manually", d: "A strategist checks clarity, speed, search, trust and follow-up." },
                { n: "03", t: "Get ideas within 48 hours", d: "A prioritised report by email, with the fixes that matter most." },
              ].map((step) => (
                <li className="flex gap-4" key={step.n}>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-ink/15 bg-white text-[0.7rem] font-semibold text-ink/60">
                    {step.n}
                  </span>
                  <div>
                    <p className="text-[0.95rem] font-semibold text-ink">{step.t}</p>
                    <p className="mt-1 text-sm leading-6 text-ink/50">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/free-audit" size="lg">
                Start my free audit
                <Icon name="arrow-up-right" size={18} />
              </ButtonLink>
              <span className="inline-flex items-center gap-1.5 text-xs text-ink/45">
                <Icon name="clock" size={14} />
                Reply within 48 hours
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[1.75rem] border border-line bg-white p-6 shadow-[0_30px_80px_-50px_rgba(10,12,18,0.45)] sm:p-8">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <p className="text-sm font-semibold text-ink">What we check</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-brand">
                  <Icon name="sparkle" size={12} />
                  Free review
                </span>
              </div>
              <ul className="mt-4 divide-y divide-line/70">
                {[
                  "Website clarity, speed and mobile experience",
                  "Search visibility and Google Business presence",
                  "Paid campaign and landing page readiness",
                  "Lead capture, WhatsApp and follow-up flow",
                  "Trust signals, reviews and conversion blockers",
                  "Three prioritised growth ideas for the next 90 days",
                ].map((item) => (
                  <li className="flex items-start gap-3 py-3 text-sm leading-6 text-ink/70" key={item}>
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-lime text-ink">
                      <Icon name="check" size={11} strokeWidth={2.4} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-paper px-4 py-3">
                <p className="text-xs text-ink/45">Delivered to your inbox</p>
                <p className="text-xs font-semibold text-ink">₹0 · within 48h</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-brand p-5 text-white shadow-xl sm:block">
              <Icon name="chart" size={22} />
              <p className="mt-3 text-[0.72rem] font-medium leading-5 opacity-80">
                Growth ideas,
                <br />
                ranked by impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="shell py-16 md:py-24">
        <SectionHeading
          eyebrow="Why Erstian"
          title="A partner that behaves like part of your team."
          description="We are not a page factory. We take responsibility for the whole journey — from the first impression to the follow-up that closes the deal."
        />
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {differentiators.map((item, index) => (
            <div className="flex gap-5 border-t border-line pt-6" key={item.title}>
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-white text-brand">
                <Icon name={item.icon} size={20} />
              </span>
              <div>
                <p className="text-[0.95rem] font-semibold text-ink">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-ink/50">{item.body}</p>
              </div>
              <span className="ml-auto hidden text-[0.7rem] font-medium tracking-[0.18em] text-ink/25 sm:block">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Work */}
      <section className="border-y border-line bg-white/60">
        <div className="shell py-16 md:py-24">
          <SectionHeading
            action={
              <ButtonLink href="/portfolio" size="md" variant="outline">
                View all work
                <Icon name="arrow-up-right" size={16} />
              </ButtonLink>
            }
            description="Selected engagements across healthcare, retail, real estate and SaaS. Every project starts with a business problem, not a template."
            eyebrow="Selected work"
            title="Built for outcomes you can measure."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="shell py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow flex items-center gap-2 text-brand">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              How we work
            </p>
            <h2 className="mt-4 text-balance text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-4xl lg:text-[2.85rem]">
              Clear scope. Visible progress. No surprises.
            </h2>
            <p className="mt-5 max-w-md text-[0.97rem] leading-7 text-ink/55">
              You always know what is being built, what it costs and how it will be measured. If
              something is not working, you hear it from us first.
            </p>
            <ButtonLink className="mt-7" href="/contact" variant="dark">
              Book an intro call
              <Icon name="arrow-up-right" size={17} />
            </ButtonLink>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {processSteps.map((step) => (
              <div className="bg-white p-7" key={step.step}>
                <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-brand">{step.step}</p>
                <p className="mt-4 text-[1rem] font-semibold text-ink">{step.title}</p>
                <p className="mt-2 text-sm leading-6 text-ink/50">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-ink py-16 text-paper md:py-24">
        <div className="shell">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow flex items-center gap-2 text-lime">
                <span className="inline-block size-1.5 rounded-full bg-lime" />
                Client words
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.06] tracking-[-0.035em] sm:text-4xl lg:text-[2.85rem]">
                The work speaks. So do the people behind it.
              </h2>
            </div>
            <Link className="inline-flex items-center gap-2 text-sm font-medium text-paper/60 hover:text-lime" href="/testimonials">
              Read all reviews
              <Icon name="arrow-up-right" size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.slice(0, 3).map((item) => (
              <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6" key={item.id}>
                <Icon className="text-lime/70" name="quote" size={24} />
                <blockquote className="mt-4 flex-1 text-[0.94rem] leading-7 text-paper/75">“{item.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="grid size-10 place-items-center rounded-full bg-lime/15 text-sm font-semibold text-lime">
                    {item.authorName
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-paper">{item.authorName}</p>
                    <p className="text-xs text-paper/45">
                      {[item.role, item.company].filter(Boolean).join(", ")}
                    </p>
                  </div>
                  <StarRating className="ml-auto text-lime" rating={item.rating} size={12} />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="shell py-16 md:py-24">
        <SectionHeading
          action={
            <ButtonLink href="/blog" size="md" variant="outline">
              All articles
              <Icon name="arrow-up-right" size={16} />
            </ButtonLink>
          }
          description="Practical notes on websites, ads, automation and search — written for owners, not for other agencies."
          eyebrow="Insights"
          title="Ideas you can act on this week."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((article) => (
            <Link
              className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-32px_rgba(10,12,18,0.3)]"
              href={"/blog/" + article.slug}
              key={article.id}
            >
              <div className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-brand">
                {article.category ?? "Insight"}
                <span className="size-1 rounded-full bg-ink/20" />
                <span className="text-ink/35">{article.readMinutes} min read</span>
              </div>
              <h3 className="mt-4 text-[1.1rem] font-semibold leading-snug tracking-[-0.015em] text-ink group-hover:text-brand">
                {article.title}
              </h3>
              <p className="mt-2.5 flex-1 text-sm leading-6 text-ink/50">{article.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs text-ink/40">
                <span>{formatDate(article.publishedAt)}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-ink group-hover:text-brand">
                  Read
                  <Icon name="arrow-right" size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-cream/40">
        <div className="shell grid gap-10 py-16 md:py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow flex items-center gap-2 text-brand">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              Questions
            </p>
            <h2 className="mt-4 text-balance text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-4xl">
              Before you send your website.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-ink/50">
              Still unsure about something? Write to us at{" "}
              <a className="font-medium text-brand hover:underline" href="mailto:hello@erstiantech.com">
                hello@erstiantech.com
              </a>{" "}
              and we will reply personally.
            </p>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <details className="group py-5" key={faq.q}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[0.95rem] font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line bg-white text-ink transition-transform duration-300 group-open:rotate-45">
                    <Icon name="plus" size={14} />
                  </span>
                </summary>
                <p className="mt-3 max-w-xl pr-10 text-sm leading-6 text-ink/55">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: company.name,
            description: company.description,
            email: company.email,
            slogan: company.tagline,
            areaServed: "India",
            knowsAbout: services.map((service) => service.title),
          }),
        }}
        type="application/ld+json"
      />
    </>
  );
}
