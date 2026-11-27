import { desc, eq, or } from "drizzle-orm";
import { db } from "@/db";
import {
  auditRequest,
  booking,
  business,
  contactLead,
  post,
  project,
  review,
  session,
  testimonial,
  user,
} from "@/db/schema";

async function safe<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run();
  } catch {
    return fallback;
  }
}

export type BusinessRow = typeof business.$inferSelect;
export type AuditRow = typeof auditRequest.$inferSelect;
export type BookingRow = typeof booking.$inferSelect;
export type LeadRow = typeof contactLead.$inferSelect;
export type TestimonialRow = typeof testimonial.$inferSelect;
export type ReviewRow = typeof review.$inferSelect;
export type ProjectRow = typeof project.$inferSelect;
export type PostRow = typeof post.$inferSelect;

export async function getUserBusinesses(userId: string) {
  return safe(
    () => db.select().from(business).where(eq(business.ownerId, userId)).orderBy(desc(business.createdAt)),
    [],
  );
}

export async function getUserAudits(userId: string, email: string) {
  return safe(
    () =>
      db
        .select()
        .from(auditRequest)
        .where(or(eq(auditRequest.userId, userId), eq(auditRequest.email, email)))
        .orderBy(desc(auditRequest.createdAt)),
    [],
  );
}

export async function getUserBookings(userId: string, email: string) {
  return safe(
    () =>
      db
        .select()
        .from(booking)
        .where(or(eq(booking.userId, userId), eq(booking.email, email)))
        .orderBy(desc(booking.createdAt)),
    [],
  );
}

export async function getUserLeads(userId: string, email: string) {
  return safe(
    () =>
      db
        .select()
        .from(contactLead)
        .where(or(eq(contactLead.userId, userId), eq(contactLead.email, email)))
        .orderBy(desc(contactLead.createdAt)),
    [],
  );
}

export async function listAllAudits() {
  return safe(() => db.select().from(auditRequest).orderBy(desc(auditRequest.createdAt)), []);
}

export async function listAllLeads() {
  return safe(() => db.select().from(contactLead).orderBy(desc(contactLead.createdAt)), []);
}

export async function listAllBookings() {
  return safe(() => db.select().from(booking).orderBy(desc(booking.createdAt)), []);
}

export async function listAllTestimonials() {
  return safe(() => db.select().from(testimonial).orderBy(desc(testimonial.createdAt)), []);
}

export async function listAllReviews() {
  return safe(() => db.select().from(review).orderBy(desc(review.createdAt)), []);
}

export async function listAllProjects() {
  return safe(() => db.select().from(project).orderBy(desc(project.createdAt)), []);
}

export async function listAllPosts() {
  return safe(() => db.select().from(post).orderBy(desc(post.createdAt)), []);
}

export async function listUsers() {
  return safe(
    () =>
      db
        .select({ id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt })
        .from(user)
        .orderBy(desc(user.createdAt))
        .limit(100),
    [],
  );
}

export async function listAllBusinesses() {
  return safe(
    () =>
      db
        .select({
          id: business.id,
          ownerId: business.ownerId,
          name: business.name,
          website: business.website,
          category: business.category,
          city: business.city,
          description: business.description,
          goals: business.goals,
          createdAt: business.createdAt,
          ownerName: user.name,
          ownerEmail: user.email,
        })
        .from(business)
        .leftJoin(user, eq(business.ownerId, user.id))
        .orderBy(desc(business.createdAt)),
    [],
  );
}

export async function getAdminCounts() {
  const [users, businesses, audits, leads, bookings, pendingReviews, testimonials, projects, posts] =
    await Promise.all([
      safe(async () => (await db.select({ id: user.id }).from(user)).length, 0),
      safe(async () => (await db.select({ id: business.id }).from(business)).length, 0),
      safe(async () => (await db.select({ id: auditRequest.id }).from(auditRequest)).length, 0),
      safe(async () => (await db.select({ id: contactLead.id }).from(contactLead)).length, 0),
      safe(async () => (await db.select({ id: booking.id }).from(booking)).length, 0),
      safe(
        async () =>
          (await db.select({ id: review.id }).from(review).where(eq(review.published, false))).length,
        0,
      ),
      safe(async () => (await db.select({ id: testimonial.id }).from(testimonial)).length, 0),
      safe(async () => (await db.select({ id: project.id }).from(project)).length, 0),
      safe(async () => (await db.select({ id: post.id }).from(post)).length, 0),
    ]);

  const [pendingAudits, newLeads, openBookings] = await Promise.all([
    safe(
      async () =>
        (await db.select({ id: auditRequest.id }).from(auditRequest).where(eq(auditRequest.status, "pending"))).length,
      0,
    ),
    safe(
      async () =>
        (await db.select({ id: contactLead.id }).from(contactLead).where(eq(contactLead.status, "new"))).length,
      0,
    ),
    safe(
      async () =>
        (await db.select({ id: booking.id }).from(booking).where(eq(booking.status, "requested"))).length,
      0,
    ),
  ]);

  return {
    users,
    businesses,
    audits,
    leads,
    bookings,
    pendingReviews,
    testimonials,
    projects,
    posts,
    pendingAudits,
    newLeads,
    openBookings,
  };
}

export async function getRecentSessions() {
  return safe(
    () =>
      db
        .select({ id: session.id, userId: session.userId, createdAt: session.createdAt })
        .from(session)
        .orderBy(desc(session.createdAt))
        .limit(10),
    [],
  );
}

