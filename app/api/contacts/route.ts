import { db } from "@/db";
import { contactLead } from "@/db/schema";
import { fail, ok, readJson, str } from "@/lib/api";
import { getCurrentUser } from "@/lib/session";

export async function POST(request: Request) {
  const body = await readJson(request);

  const name = str(body.name, 120);
  const email = str(body.email, 160);
  const message = str(body.message, 4000);

  if (!name || !email || !message) {
    return fail("Please share your name, email and a short message.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail("Please enter a valid email address.");
  }

  const user = await getCurrentUser();

  try {
    await db.insert(contactLead).values({
      userId: user?.id ?? null,
      name,
      email,
      phone: str(body.phone, 40) || null,
      company: str(body.company, 160) || null,
      subject: str(body.subject, 160) || null,
      message,
      source: "contact_form",
    });
    return ok({ received: true }, 201);
  } catch {
    return fail(
      "We could not send your message right now. Please email hello@erstiantech.com directly.",
      500,
    );
  }
}
