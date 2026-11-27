import { eq } from "drizzle-orm";
import { db } from "@/db";
import { post } from "@/db/schema";
import { adminGuard } from "@/lib/admin-guard";
import { fail, ok, readJson, str } from "@/lib/api";

type Params = { id: string };

export async function PATCH(request: Request, { params }: { params: Promise<Params> }) {
  const guard = await adminGuard();
  if (!guard.user) return guard.response;
  const { id } = await params;
  const body = await readJson(request);

  try {
    const [existing] = await db.select().from(post).where(eq(post.id, id)).limit(1);
    if (!existing) return fail("Article not found.", 404);

    await db
      .update(post)
      .set({
        title: "title" in body ? str(body.title, 220) || existing.title : existing.title,
        excerpt: "excerpt" in body ? str(body.excerpt, 500) || existing.excerpt : existing.excerpt,
        content: "content" in body ? str(body.content, 20000) || existing.content : existing.content,
        category: "category" in body ? str(body.category, 120) || null : existing.category,
        author: "author" in body ? str(body.author, 120) || existing.author : existing.author,
        published: typeof body.published === "boolean" ? body.published : existing.published,
      })
      .where(eq(post.id, id));
    return ok({ updated: true });
  } catch {
    return fail("Could not update that article.", 500);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<Params> }) {
  const guard = await adminGuard();
  if (!guard.user) return guard.response;
  const { id } = await params;
  try {
    await db.delete(post).where(eq(post.id, id));
    return ok({ deleted: true });
  } catch {
    return fail("Could not delete that article.", 500);
  }
}
