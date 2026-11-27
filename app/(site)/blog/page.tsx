import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { CtaBand } from "@/components/site/cta-band";
import { formatDate } from "@/lib/format";
import { getPosts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Journal — practical notes on digital growth",
  description:
    "Practical, no-jargon writing on websites, WhatsApp automation, local SEO and building a digital engine for a small business.",
};

const gradients = [
  "from-[#4f34e8] via-[#7a5cff] to-[#c9b8ff]",
  "from-[#0f766e] via-[#2dd4bf] to-[#c8fff4]",
  "from-[#b45309] via-[#f59e0b] to-[#ffe6b0]",
];

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="paper-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="shell relative py-14 md:py-20">
          <p className="eyebrow flex items-center gap-2 text-brand">
            <span className="inline-block size-1.5 rounded-full bg-brand" />
            The journal
          </p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h1 className="max-w-3xl text-balance text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-[3.7rem]">
              Field notes for people running real businesses.
            </h1>
            <p className="max-w-md text-[0.95rem] leading-7 text-ink/55 lg:pb-2">
              No growth-hacking listicles. Just what we see working across clinics, stores, service
              businesses and software teams — written to be used this week.
            </p>
          </div>
        </div>
      </section>

      {featured ? (
        <section className="shell py-12 md:py-16">
          <Link
            className="group grid overflow-hidden rounded-2xl border border-line bg-white lg:grid-cols-[1.05fr_0.95fr]"
            href={"/blog/" + featured.slug}
          >
            <div className="relative flex min-h-[16rem] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#4f34e8] via-[#6a4dff] to-[#c9b8ff] p-7 text-white sm:p-9">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:44px_44px]" />
              <div className="relative flex items-center justify-between">
                <span className="rounded-full bg-white/15 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] backdrop-blur">
                  Featured · {featured.category ?? "Growth"}
                </span>
                <Icon className="text-white/70" name="sparkle" size={20} />
              </div>
              <div className="relative">
                <p className="text-[0.7rem] uppercase tracking-[0.16em] text-white/50">Erstian journal</p>
                <p className="mt-2 max-w-md text-[1.6rem] font-semibold leading-tight tracking-[-0.02em] sm:text-[2rem]">
                  {featured.title}
                </p>
              </div>
              <div className="relative mt-6 flex items-center gap-3 text-[0.7rem] text-white/60">
                <span>{formatDate(featured.publishedAt)}</span>
                <span className="size-1 rounded-full bg-white/30" />
                <span>{featured.readMinutes} min read</span>
              </div>
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-9">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink/35">Latest article</p>
              <p className="mt-3 text-[1.15rem] font-semibold leading-snug tracking-[-0.01em] text-ink">
                {featured.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-ink/50">{featured.excerpt}</p>
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-4 py-2 text-[0.78rem] font-medium text-paper transition-colors group-hover:bg-brand">
                Read the article
                <Icon name="arrow-up-right" size={14} />
              </span>
            </div>
          </Link>
        </section>
      ) : null}

      <section className="shell pb-14 md:pb-20">
        <div className="flex items-end justify-between border-t border-line pt-8">
          <h2 className="text-[1.4rem] font-semibold tracking-[-0.02em] text-ink">More from the journal</h2>
          <span className="text-[0.7rem] text-ink/35">{rest.length} articles</span>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, index) => (
            <Link
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-ink/15"
              href={"/blog/" + post.slug}
              key={post.id}
            >
              <div className={"relative h-36 overflow-hidden bg-gradient-to-br " + gradients[index % gradients.length]}>
                <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px]" />
                <span className="absolute left-4 top-4 rounded-full bg-black/20 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur">
                  {post.category ?? "Journal"}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[0.65rem] text-ink/35">
                  {formatDate(post.publishedAt)} · {post.readMinutes} min read
                </p>
                <p className="mt-2 text-[1rem] font-semibold leading-snug tracking-[-0.01em] text-ink group-hover:text-brand">
                  {post.title}
                </p>
                <p className="mt-2 line-clamp-3 text-[0.82rem] leading-6 text-ink/50">{post.excerpt}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-4 text-[0.72rem] font-semibold text-ink/45 group-hover:text-brand">
                  Read article
                  <Icon name="arrow-right" size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-line p-12 text-center text-sm text-ink/45">
            The first articles are being written. Check back soon.
          </p>
        ) : null}
      </section>

      <CtaBand />
    </>
  );
}
