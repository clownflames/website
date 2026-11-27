import { eq } from "drizzle-orm";
import { db } from "@/db";
import { auditRequest } from "@/db/schema";
import { adminGuard } from "@/lib/admin-guard";
import { fail, num, ok, readJson, str } from "@/lib/api";

type Params = { id: string };

export async function PATCH(request: Request, { params }: { params: Promise<Params> }) {
  const guard = await adminGuard();
  if (!guard.user) return guard.response;

  const { id } = await params;
  const body = await readJson(request);

  const [existing] = await db.select().from(auditRequest).where(eq(auditRequest.id, id)).limit(1);
  if (!existing) return fail("Audit request not found.", 404);

  const nextStatus = str(body.status, 40) || existing.status;
  const scoreValue = num(body.score);
  const completed = nextStatus === "completed";

  try {
    await db
      .update(auditRequest)
      .set({
        status: nextStatus,
        score: scoreValue === null ? existing.score : Math.min(100, Math.max(0, Math.round(scoreValue))),
        summary: "summary" in body ? str(body.summary, 4000) || null : existing.summary,
        growthIdeas: "growthIdeas" in body ? str(body.growthIdeas, 6000) || null : existing.growthIdeas,
        respondedAt: completed ? existing.respondedAt ?? new Date() : existing.respondedAt,
      })
      .where(eq(auditRequest.id, id));
    return ok({ updated: true });
  } catch {
    return fail("Could not update that request.", 500);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<Params> }) {
  const guard = await adminGuard();
  if (!guard.user) return guard.response;
  const { id } = await params;
  try {
    await db.delete(auditRequest).where(eq(auditRequest.id, id));
    return ok({ deleted: true });
  } catch {
    return fail("Could not delete that request.", 500);
  }
}
