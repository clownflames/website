import { db } from "@/db";
import { booking } from "@/db/schema";
import { fail, ok, readJson, str } from "@/lib/api";
import { getCurrentUser } from "@/lib/session";

export async function POST(request: Request) {
  const body = await readJson(request);

  const name = str(body.name, 120);
  const email = str(body.email, 160);
  const preferredDate = str(body.preferredDate, 40);
  const preferredTime = str(body.preferredTime, 60);

  if (!name || !email || !preferredDate || !preferredTime) {
    return fail("Please choose a date and time, and share your name and email.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail("Please enter a valid email address.");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
    return fail("Please choose a valid date.");
  }

  const user = await getCurrentUser();

  try {
    await db.insert(booking).values({
      userId: user?.id ?? null,
      name,
      email,
      phone: str(body.phone, 40) || null,
      service: str(body.service, 160) || null,
      preferredDate,
      preferredTime,
      message: str(body.message, 2000) || null,
      status: "requested",
    });
    return ok({ received: true }, 201);
  } catch {
    return fail(
      "We could not hold that slot right now. Please email hello@erstiantech.com and we will arrange it.",
      500,
    );
  }
}
