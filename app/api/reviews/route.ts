import { db } from "@/db";
import { review } from "@/db/schema";
import { fail, num, ok, readJson, str } from "@/lib/api";

export async function POST(request: Request) {
  const body = await readJson(request);

  const authorName = str(body.authorName, 120);
  const message = str(body.message, 2000);

  if (!authorName || !message) {
    return fail("Please add your name and a short review.");
  }

  const rawRating = num(body.rating) ?? 5;
  const rating = Math.min(5, Math.max(1, Math.round(rawRating)));

  try {
    await db.insert(review).values({
      authorName,
      email: str(body.email, 160) || null,
      company: str(body.company, 160) || null,
      rating,
      message,
      published: false,
    });
    return ok({ received: true }, 201);
  } catch {
    return fail("We could not save your review right now. Please try again later.", 500);
  }
}
