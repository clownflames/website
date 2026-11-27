import { eq } from "drizzle-orm";
import { db } from "@/db";
import { review } from "@/db/schema";
import { adminGuard } from "@/lib/admin-guard";
import { fail, ok, readJson } from "@/lib/api";

type Params = { id: string };

export async function PATCH(request: Request, { params }: { params: Promise<Params> }) {
  const guard = await adminGuard();
  if (!guard.user) return guard.response;
  const { id } = await params;
  const body = await readJson(request);

  try {
    const [existing] = await db.select().from(review).where(eq(review.id, id)).limit(1);
    if (!existing) return fail("Review not found.", 404);
    await db
      .update(review)
      .set({ published: typeof body.published === "boolean" ? body.published : existing.published })
      .where(eq(review.id, id));
    return ok({ updated: true });
  } catch {
    return fail("Could not update that review.", 500);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<Params> }) {
  const guard = await adminGuard();
  if (!guard.user) return guard.response;
  const { id } = await params;
  try {
    await db.delete(review).where(eq(review.id, id));
    return ok({ deleted: true });
  } catch {
    return fail("Could not delete that review.", 500);
  }
}
