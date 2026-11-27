import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { post, project, review, testimonial } from "@/db/schema";
import { fallbackPosts, fallbackProjects, fallbackTestimonials } from "@/lib/content";

export type TestimonialItem = {
  id: string;
  authorName: string;
  role: string | null;
  company: string | null;
  quote: string;
  rating: number;
};

export type ReviewItem = {
  id: string;
  authorName: string;
  company: string | null;
  rating: number;
  message: string;
  createdAt: Date | string;
};

export type ProjectItem = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  summary: string | null;
  tags: string | null;
  accent: string;
  year: string | null;
  featured: boolean;
};

export type PostItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  author: string;
  readMinutes: number;
  publishedAt: Date | string;
};

async function safe<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run();
  } catch {
    return fallback;
  }
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  const rows = await safe(
    () =>
      db
        .select()
        .from(testimonial)
        .where(eq(testimonial.published, true))
        .orderBy(asc(testimonial.sortOrder), desc(testimonial.createdAt))
        .limit(6),
    [],
  );
  const list = rows.length ? rows : fallbackTestimonials;
  return list.map((item) => ({
    id: item.id,
    authorName: item.authorName,
    role: item.role ?? null,
    company: item.company ?? null,
    quote: item.quote,
    rating: item.rating,
  }));
}

export async function getProjects(): Promise<ProjectItem[]> {
  const rows = await safe(
    () =>
      db
        .select()
        .from(project)
        .where(eq(project.published, true))
        .orderBy(desc(project.featured), desc(project.createdAt))
        .limit(12),
    [],
  );
  const list = rows.length ? rows : fallbackProjects;
  return list.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    category: item.category ?? null,
    summary: item.summary ?? null,
    tags: item.tags ?? null,
    accent: item.accent ?? "violet",
    year: item.year ?? null,
    featured: Boolean(item.featured),
  }));
}

export async function getProjectsCount() {
  return safe(async () => {
    const rows = await db.select().from(project);
    return rows.length;
  }, 0);
}

export async function getPosts(): Promise<PostItem[]> {
  const rows = await safe(
    () =>
      db
        .select()
        .from(post)
        .where(eq(post.published, true))
        .orderBy(desc(post.publishedAt))
        .limit(12),
    [],
  );
  const list = rows.length ? rows : fallbackPosts;
  return list.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt ?? null,
    content: item.content,
    category: item.category ?? null,
    author: item.author,
    readMinutes: item.readMinutes,
    publishedAt: item.publishedAt,
  }));
}

export async function getPostBySlug(slug: string): Promise<PostItem | null> {
  const fromDb = await safe(async () => {
    const rows = await db
      .select()
      .from(post)
      .where(eq(post.slug, slug))
      .limit(1);
    return rows[0] ?? null;
  }, null);
  if (fromDb) {
    return {
      id: fromDb.id,
      title: fromDb.title,
      slug: fromDb.slug,
      excerpt: fromDb.excerpt ?? null,
      content: fromDb.content,
      category: fromDb.category ?? null,
      author: fromDb.author,
      readMinutes: fromDb.readMinutes,
      publishedAt: fromDb.publishedAt,
    };
  }
  const fallback = fallbackPosts.find((item) => item.slug === slug);
  if (!fallback) return null;
  return {
    id: fallback.id,
    title: fallback.title,
    slug: fallback.slug,
    excerpt: fallback.excerpt,
    content: fallback.content,
    category: fallback.category,
    author: fallback.author,
    readMinutes: fallback.readMinutes,
    publishedAt: fallback.publishedAt,
  };
}
export async function getPublishedReviews(): Promise<ReviewItem[]> {
  const rows = await safe(
    () =>
      db
        .select()
        .from(review)
        .where(eq(review.published, true))
        .orderBy(desc(review.createdAt))
        .limit(24),
    [],
  );
  return rows.map((item) => ({
    id: item.id,
    authorName: item.authorName,
    company: item.company ?? null,
    rating: item.rating,
    message: item.message,
    createdAt: item.createdAt,
  }));
}
