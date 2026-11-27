import { eq } from "drizzle-orm";
import { db } from "@/db";
import { business } from "@/db/schema";
import { fail, ok, readJson, str } from "@/lib/api";
import { getCurrentUser } from "@/lib/session";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return fail("Please sign in to add a business.", 401);

  const body = await readJson(request);
  const name = str(body.name, 160);
  if (!name) return fail("Please add a business name.");

  const website = str(body.website, 300);
  const normalised = website && !/^https?:\/\//i.test(website) ? "https://" + website : website;

  try {
    const [created] = await db
      .insert(business)
      .values({
        ownerId: user.id,
        name,
        website: normalised || null,
        category: str(body.category, 120) || null,
        city: str(body.city, 120) || null,
        description: str(body.description, 1000) || null,
        goals: str(body.goals, 300) || null,
      })
      .returning({ id: business.id });
    return ok({ id: created?.id ?? null }, 201);
  } catch {
    return fail("We could not save that business. Please try again.", 500);
  }
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return fail("Please sign in.", 401);
  try {
    const rows = await db.select().from(business).where(eq(business.ownerId, user.id));
    return ok(rows);
  } catch {
    return ok([]);
  }
}
