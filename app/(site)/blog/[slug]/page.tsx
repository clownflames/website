import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { CtaBand } from "@/components/site/cta-band";
import { ButtonLink } from "@/components/ui/button-link";
import { formatDate } from "@/lib/format";
import { getPostBySlug, getPosts } from "@/lib/queries";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt ?? undefined };
}

function renderContent(content: string) {
  return content.split(/\n{2,}/).map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("### ")) {
      return (
        <h3 className="mt-8 text-[1.15rem] font-semibold tracking-[-0.01em] text-ink" key={index}>
          {trimmed.slice(4)}
        </h3>
      );
    }
    if (trimmed.startsWith("## ")) {
      return (
        <h2 className="mt-10 text-[1.45rem] font-semibold tracking-[-0.02em] text-ink" key={index}>
          {trimmed.slice(3)}
        </h2>
      );
    }
    if (trimmed.startsWith("> ")) {
      return (
        <blockquote className="my-6 border-l-2 border-brand pl-5 text-[1.05rem] italic leading-8 text-ink/70" key={index}>
          {trimmed.slice(2)}
        </blockquote>
      );
    }
    if (/^(- |\* )/m.test(trimmed)) {
      const items = trimmed.split("\n").filter((line) => /^(- |\* )/.test(line));
      return (
        <ul className="my-5 space-y-2.5" key={index}>
          {items.map((item) => (
            <li className="flex gap-3 text-[0.95rem] leading-7 text-ink/65" key={item}>
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
              {item.replace(/^(- |\* )/, "")}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p className="mt-5 text-[1rem] leading-8 text-ink/65" key={index}>
        {trimmed}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const all = await getPosts();
  const related = all.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-line">
          <div className="paper-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="shell relative py-10 md:py-16">
            <nav className="flex flex-wrap items-center gap-2 text-xs text-ink/40">
              <Link className="hover:text-ink" href="/">Home</Link>
              <span>/</span>
              <Link className="hover:text-ink" href="/blog">Journal</Link>
              <span>/</span>
              <span className="text-ink/60">{post.category ?? "Article"}</span>
            </nav>

            <div className="mt-8 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-brand-soft px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-brand">
                  {post.category ?? "Journal"}
                </span>
                <span className="text-[0.72rem] text-ink/40">{formatDate(post.publishedAt)}</span>
                <span className="size-1 rounded-full bg-ink/20" />
                <span className="text-[0.72rem] text-ink/40">{post.readMinutes} min read</span>
              </div>
              <h1 className="mt-5 text-balance text-[2.2rem] font-semibold leading-[1.03] tracking-[-0.04em] sm:text-5xl">
                {post.title}
              </h1>
              {post.excerpt ? (
                <p className="mt-5 text-[1.05rem] leading-8 text-ink/55">{post.excerpt}</p>
              ) : null}
              <div className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                <span className="grid size-9 place-items-center rounded-full bg-ink text-[0.68rem] font-semibold text-lime">
                  ET
                </span>
                <div>
                  <p className="text-[0.8rem] font-semibold text-ink">{post.author}</p>
                  <p className="text-[0.68rem] text-ink/40">Erstian Technologies</p>
                </div>
                <a
                  className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[0.7rem] font-medium text-ink/55 hover:border-ink/20 hover:text-ink"
                  href={"mailto:?subject=" + encodeURIComponent(post.title) + "&body=" + encodeURIComponent("https://erstiantech.com/blog/" + post.slug)}
                >
                  <Icon name="mail" size={12} />
                  Share
                </a>
              </div>
            </div>
          </div>
        </header>

        <div className="shell py-10 md:py-14">
          <div className="grid gap-12 lg:grid-cols-[0.22fr_0.78fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-5">
                <div className="rounded-2xl border border-line bg-white p-4">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink/35">In this article</p>
                  <div className="mt-3 space-y-2">
                    {post.content
                      .split("\n")
                      .filter((line) => line.startsWith("## "))
                      .map((line) => (
                        <p className="text-[0.75rem] leading-5 text-ink/50" key={line}>
                          {line.slice(3)}
                        </p>
                      ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-cream p-4">
                  <p className="text-[0.7rem] font-semibold text-ink">Want this reviewed on your site?</p>
                  <p className="mt-1 text-[0.7rem] leading-5 text-ink/45">
                    Get a free, manual business audit within 48 hours.
                  </p>
                  <ButtonLink className="mt-3 w-full" href="/free-audit" size="sm" variant="dark">
                    Free audit
                  </ButtonLink>
                </div>
              </div>
            </aside>

            <div className="max-w-2xl">
              <div>{renderContent(post.content)}</div>

              <div className="mt-12 rounded-2xl border border-line bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-ink text-[0.7rem] font-semibold text-lime">ET</span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{post.author}</p>
                    <p className="text-[0.72rem] text-ink/40">
                      We build the websites, campaigns and systems behind growing businesses.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <ButtonLink href="/free-audit" size="sm">
                    Get a free audit
                  </ButtonLink>
                  <ButtonLink href="/contact" size="sm" variant="outline">
                    Talk to us
                  </ButtonLink>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5 text-xs text-ink/40">
                <Link className="inline-flex items-center gap-1.5 hover:text-ink" href="/blog">
                  <Icon name="arrow-right" size={13} />
                  All articles
                </Link>
                <a className="inline-flex items-center gap-1.5 hover:text-ink" href="mailto:hello@erstiantech.com">
                  <Icon name="mail" size={13} />
                  hello@erstiantech.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length ? (
        <section className="border-t border-line bg-cream/40">
          <div className="shell py-12 md:py-16">
            <div className="flex items-end justify-between">
              <h2 className="text-[1.5rem] font-semibold tracking-[-0.02em] text-ink">Keep reading</h2>
              <Link className="text-xs font-medium text-ink/45 hover:text-ink" href="/blog">
                View all
              </Link>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {related.map((item) => (
                <Link
                  className="group rounded-2xl border border-line bg-white p-5 transition-colors hover:border-ink/15"
                  href={"/blog/" + item.slug}
                  key={item.id}
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.12em] text-ink/35">
                    {item.category} · {item.readMinutes} min
                  </p>
                  <p className="mt-2 text-[1rem] font-semibold leading-snug text-ink group-hover:text-brand">{item.title}</p>
                  <p className="mt-2 line-clamp-2 text-[0.82rem] leading-6 text-ink/45">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
