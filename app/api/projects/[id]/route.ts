import { eq } from "drizzle-orm";
import { db } from "@/db";
import { project } from "@/db/schema";
import { adminGuard } from "@/lib/admin-guard";
import { fail, ok, readJson, str } from "@/lib/api";

type Params = { id: string };

export async function PATCH(request: Request, { params }: { params: Promise<Params> }) {
  const guard = await adminGuard();
  if (!guard.user) return guard.response;
  const { id } = await params;
  const body = await readJson(request);

  try {
    const [existing] = await db.select().from(project).where(eq(project.id, id)).limit(1);
    if (!existing) return fail("Project not found.", 404);

    await db
      .update(project)
      .set({
        title: "title" in body ? str(body.title, 200) || existing.title : existing.title,
        category: "category" in body ? str(body.category, 120) || null : existing.category,
        summary: "summary" in body ? str(body.summary, 1000) || existing.summary : existing.summary,
        description: "description" in body ? str(body.description, 4000) || null : existing.description,
        tags: "tags" in body ? str(body.tags, 300) || null : existing.tags,
        accent: "accent" in body ? str(body.accent, 30) || existing.accent : existing.accent,
        year: "year" in body ? str(body.year, 20) || null : existing.year,
        featured: typeof body.featured === "boolean" ? body.featured : existing.featured,
        published: typeof body.published === "boolean" ? body.published : existing.published,
      })
      .where(eq(project.id, id));
    return ok({ updated: true });
  } catch {
    return fail("Could not update that project.", 500);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<Params> }) {
  const guard = await adminGuard();
  if (!guard.user) return guard.response;
  const { id } = await params;
  try {
    await db.delete(project).where(eq(project.id, id));
    return ok({ deleted: true });
  } catch {
    return fail("Could not delete that project.", 500);
  }
}
