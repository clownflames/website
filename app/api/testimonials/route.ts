import { db } from "@/db";
import { testimonial } from "@/db/schema";
import { adminGuard } from "@/lib/admin-guard";
import { fail, num, ok, readJson, str } from "@/lib/api";

export async function POST(request: Request) {
  const guard = await adminGuard();
  if (!guard.user) return guard.response;

  const body = await readJson(request);
  const authorName = str(body.authorName, 120);
  const quote = str(body.quote, 2000);
  if (!authorName || !quote) return fail("Add the client name and quote.");

  const rating = Math.min(5, Math.max(1, Math.round(num(body.rating) ?? 5)));
  const published = body.published === false || body.published === "false" ? false : true;

  try {
    const [created] = await db
      .insert(testimonial)
      .values({
        authorName,
        role: str(body.role, 120) || null,
        company: str(body.company, 160) || null,
        quote,
        rating,
        published,
        sortOrder: num(body.sortOrder) ?? 0,
      })
      .returning({ id: testimonial.id });
    return ok({ id: created?.id ?? null }, 201);
  } catch {
    return fail("Could not save that testimonial.", 500);
  }
}
