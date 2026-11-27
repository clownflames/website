import { eq } from "drizzle-orm";
import { db } from "@/db";
import { business } from "@/db/schema";
import { fail, ok, readJson, str } from "@/lib/api";
import { getCurrentUser, isAdmin } from "@/lib/session";

type Params = { id: string };

export async function PATCH(request: Request, { params }: { params: Promise<Params> }) {
  const user = await getCurrentUser();
  if (!user) return fail("Please sign in.", 401);

  const { id } = await params;
  const [existing] = await db.select().from(business).where(eq(business.id, id)).limit(1);
  if (!existing) return fail("Business not found.", 404);
  if (existing.ownerId !== user.id && !isAdmin(user)) return fail("Not authorised.", 403);

  const body = await readJson(request);
  const website = str(body.website, 300);

  try {
    await db
      .update(business)
      .set({
        name: str(body.name, 160) || existing.name,
        website: website ? (/^https?:\/\//i.test(website) ? website : "https://" + website) : null,
        category: str(body.category, 120) || null,
        city: str(body.city, 120) || null,
        description: str(body.description, 1000) || null,
        goals: str(body.goals, 300) || null,
      })
      .where(eq(business.id, id));
    return ok({ updated: true });
  } catch {
    return fail("Could not update that business.", 500);
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<Params> }) {
  const user = await getCurrentUser();
  if (!user) return fail("Please sign in.", 401);

  const { id } = await params;
  const [existing] = await db.select().from(business).where(eq(business.id, id)).limit(1);
  if (!existing) return fail("Business not found.", 404);
  if (existing.ownerId !== user.id && !isAdmin(user)) return fail("Not authorised.", 403);

  try {
    await db.delete(business).where(eq(business.id, id));
    return ok({ deleted: true });
  } catch {
    return fail("Could not delete that business.", 500);
  }
}
