import { NextResponse } from "next/server";
import { db } from "@/db";
import { user } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  let database = false;
  try {
    await db.select({ id: user.id }).from(user).limit(1);
    database = true;
  } catch {
    database = false;
  }
  return NextResponse.json(
    { ok: true, database, timestamp: new Date().toISOString() },
    { status: 200, headers: { "cache-control": "no-store" } },
  );
}
