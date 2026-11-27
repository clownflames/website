import { eq } from "drizzle-orm";
import { db } from "@/db";
import { booking } from "@/db/schema";
import { adminGuard } from "@/lib/admin-guard";
import { fail, ok, readJson, str } from "@/lib/api";

type Params = { id: string };

export async function PATCH(request: Request, { params }: { params: Promise<Params> }) {
  const guard = await adminGuard();
  if (!guard.user) return guard.response;
  const { id } = await params;
  const body = await readJson(request);
  const status = str(body.status, 40);
  if (!status) return fail("Choose a status.");

  try {
    await db.update(booking).set({ status }).where(eq(booking.id, id));
    return ok({ updated: true });
  } catch {
    return fail("Could not update that booking.", 500);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<Params> }) {
  const guard = await adminGuard();
  if (!guard.user) return guard.response;
  const { id } = await params;
  try {
    await db.delete(booking).where(eq(booking.id, id));
    return ok({ deleted: true });
  } catch {
    return fail("Could not delete that booking.", 500);
  }
}
