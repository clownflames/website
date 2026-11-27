import { NextResponse } from "next/server";
import { eq, or } from "drizzle-orm";
import { db } from "@/db";
import { auditRequest } from "@/db/schema";
import { fail, ok, readJson, str } from "@/lib/api";
import { getCurrentUser, isAdmin } from "@/lib/session";

export async function POST(request: Request) {
  const body = await readJson(request);

  const businessName = str(body.businessName, 160);
  const website = str(body.website, 300);
  const contactName = str(body.contactName, 120);
  const email = str(body.email, 160);

  if (!businessName || !website || !contactName || !email) {
    return fail("Please fill in your business name, website, name and email.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail("Please enter a valid email address.");
  }

  const user = await getCurrentUser();

  try {
    const [created] = await db
      .insert(auditRequest)
      .values({
        userId: user?.id ?? null,
        businessName,
        website,
        category: str(body.category, 120) || null,
        city: str(body.city, 120) || null,
        contactName,
        email,
        phone: str(body.phone, 40) || null,
        goals: str(body.goals, 500) || null,
        challenges: str(body.challenges, 2000) || null,
      })
      .returning({ id: auditRequest.id });

    return ok({ id: created?.id ?? null }, 201);
  } catch {
    return fail(
      "We could not save your request right now. Please email hello@erstiantech.com and we will pick it up from there.",
      500,
    );
  }
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return fail("Please sign in.", 401);

  try {
    const rows = isAdmin(user)
      ? await db.select().from(auditRequest).limit(100).orderBy(auditRequest.createdAt)
      : await db
          .select()
          .from(auditRequest)
          .where(or(eq(auditRequest.userId, user.id), eq(auditRequest.email, user.email)))
          .limit(100)
          .orderBy(auditRequest.createdAt);
    return ok(rows);
  } catch {
    return NextResponse.json({ requests: [] });
  }
}
