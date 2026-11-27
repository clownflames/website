import "dotenv/config";
import { fallbackPosts, fallbackProjects, fallbackTestimonials } from "../lib/content";

if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL. Add your Neon Postgres connection string to .env first.");
  process.exit(1);
}

const { db } = await import("../db");
const { eq } = await import("drizzle-orm");
const { post, project, testimonial, user } = await import("../db/schema");

async function seedTestimonials() {
  const existing = await db.select({ id: testimonial.id }).from(testimonial).limit(1);
  if (existing.length > 0) {
    console.log("· Testimonials already exist — skipped.");
    return;
  }
  await db.insert(testimonial).values(
    fallbackTestimonials.map((item, index) => ({
      authorName: item.authorName,
      role: item.role,
      company: item.company,
      quote: item.quote,
      rating: item.rating,
      published: true,
      sortOrder: index,
    })),
  );
  console.log("· Added " + fallbackTestimonials.length + " testimonials.");
}

async function seedProjects() {
  let added = 0;
  for (const item of fallbackProjects) {
    const existing = await db.select({ id: project.id }).from(project).where(eq(project.slug, item.slug)).limit(1);
    if (existing.length > 0) continue;
    await db.insert(project).values({
      title: item.title,
      slug: item.slug,
      category: item.category,
      summary: item.summary,
      description: item.description,
      coverImage: item.coverImage,
      url: item.url,
      tags: item.tags,
      accent: item.accent,
      year: item.year,
      featured: item.featured,
      published: item.published,
    });
    added += 1;
  }
  console.log("· Added " + added + " projects.");
}

async function seedPosts() {
  let added = 0;
  for (const item of fallbackPosts) {
    const existing = await db.select({ id: post.id }).from(post).where(eq(post.slug, item.slug)).limit(1);
    if (existing.length > 0) continue;
    await db.insert(post).values({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content,
      coverImage: item.coverImage,
      category: item.category,
      author: item.author,
      readMinutes: item.readMinutes,
      published: item.published,
      publishedAt: new Date(item.publishedAt),
    });
    added += 1;
  }
  console.log("· Added " + added + " articles.");
}

async function promoteAdmin() {
  const email = (process.argv[2] ?? process.env.SEED_ADMIN_EMAIL ?? "").trim().toLowerCase();
  if (!email) {
    console.log("· No admin email given. Create an account, then run: npm run seed -- you@example.com");
    return;
  }
  const updated = await db.update(user).set({ role: "admin" }).where(eq(user.email, email)).returning({ id: user.id });
  if (updated.length === 0) {
    console.log("· No account found for " + email + ". Sign up on the site first, then run this again.");
    return;
  }
  console.log("· Promoted " + email + " to admin.");
}

console.log("Seeding Erstian Technologies…");
await seedTestimonials();
await seedProjects();
await seedPosts();
await promoteAdmin();
console.log("Done.");
