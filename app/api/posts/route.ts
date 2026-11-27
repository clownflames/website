import { db } from "@/db";
import { post } from "@/db/schema";
import { adminGuard } from "@/lib/admin-guard";
import { fail, num, ok, readJson, str } from "@/lib/api";
import { slugify } from "@/lib/format";

export async function POST(request: Request) {
  const guard = await adminGuard();
  if (!guard.user) return guard.response;

  const body = await readJson(request);
  const title = str(body.title, 220);
  const content = str(body.content, 20000);
  const excerpt = str(body.excerpt, 500);
  if (!title || !content || !excerpt) return fail("Add a title, excerpt and article body.");

  const slug = slugify(str(body.slug, 140) || title) || "post-" + Date.now();

  try {
    const [created] = await db
      .insert(post)
      .values({
        title,
        slug,
        excerpt,
        content,
        category: str(body.category, 120) || null,
        author: str(body.author, 120) || "Erstian Team",
        readMinutes: Math.max(1, Math.round(num(body.readMinutes) ?? 5)),
        published: body.published === false ? false : true,
        publishedAt: new Date(),
      })
      .returning({ id: post.id });
    return ok({ id: created?.id ?? null }, 201);
  } catch {
    return fail("Could not publish that article. Check the slug is unique.", 500);
  }
}
