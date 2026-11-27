import { eq } from "drizzle-orm";
import { db } from "@/db";
import { testimonial } from "@/db/schema";
import { adminGuard } from "@/lib/admin-guard";
import { fail, ok, readJson, str } from "@/lib/api";

type Params = { id: string };

export async function PATCH(request: Request, { params }: { params: Promise<Params> }) {
  const guard = await adminGuard();
  if (!guard.user) return guard.response;
  const { id } = await params;
  const body = await readJson(request);

  try {
    const [existing] = await db.select().from(testimonial).where(eq(testimonial.id, id)).limit(1);
    if (!existing) return fail("Testimonial not found.", 404);

    await db
      .update(testimonial)
      .set({
        published: typeof body.published === "boolean" ? body.published : existing.published,
        quote: "quote" in body ? str(body.quote, 2000) || existing.quote : existing.quote,
        authorName: "authorName" in body ? str(body.authorName, 120) || existing.authorName : existing.authorName,
        role: "role" in body ? str(body.role, 120) || null : existing.role,
        company: "company" in body ? str(body.company, 160) || null : existing.company,
      })
      .where(eq(testimonial.id, id));
    return ok({ updated: true });
  } catch {
    return fail("Could not update that testimonial.", 500);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<Params> }) {
  const guard = await adminGuard();
  if (!guard.user) return guard.response;
  const { id } = await params;
  try {
    await db.delete(testimonial).where(eq(testimonial.id, id));
    return ok({ deleted: true });
  } catch {
    return fail("Could not delete that testimonial.", 500);
  }
}
