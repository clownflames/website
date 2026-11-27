import { relations } from "drizzle-orm/_relations";
import { pgTable, text, timestamp, boolean, integer, index, uniqueIndex } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

/* ------------------------------------------------------------------ */
/* Business dashboard                                                  */
/* ------------------------------------------------------------------ */

export const business = pgTable(
  "business",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    ownerId: text("owner_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    website: text("website"),
    category: text("category"),
    city: text("city"),
    description: text("description"),
    goals: text("goals"),
    status: text("status").default("active").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("business_owner_idx").on(table.ownerId)],
);

/* ------------------------------------------------------------------ */
/* Free "View My Business" audit requests                              */
/* ------------------------------------------------------------------ */

export const auditRequest = pgTable(
  "audit_request",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
    businessName: text("business_name").notNull(),
    website: text("website").notNull(),
    category: text("category"),
    city: text("city"),
    contactName: text("contact_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    goals: text("goals"),
    challenges: text("challenges"),
    status: text("status").default("pending").notNull(),
    score: integer("score"),
    summary: text("summary"),
    growthIdeas: text("growth_ideas"),
    respondedAt: timestamp("responded_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("audit_request_user_idx").on(table.userId),
    index("audit_request_status_idx").on(table.status),
  ],
);

/* ------------------------------------------------------------------ */
/* Bookings + contact leads                                            */
/* ------------------------------------------------------------------ */

export const booking = pgTable(
  "booking",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
    businessId: text("business_id").references(() => business.id, { onDelete: "set null" }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    service: text("service"),
    preferredDate: text("preferred_date"),
    preferredTime: text("preferred_time"),
    message: text("message"),
    status: text("status").default("requested").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("booking_user_idx").on(table.userId)],
);

export const contactLead = pgTable(
  "contact_lead",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    company: text("company"),
    subject: text("subject"),
    message: text("message").notNull(),
    source: text("source").default("contact_form").notNull(),
    status: text("status").default("new").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("contact_lead_user_idx").on(table.userId)],
);

/* ------------------------------------------------------------------ */
/* Public content                                                      */
/* ------------------------------------------------------------------ */

export const testimonial = pgTable("testimonial", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  authorName: text("author_name").notNull(),
  role: text("role"),
  company: text("company"),
  quote: text("quote").notNull(),
  rating: integer("rating").default(5).notNull(),
  published: boolean("published").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const review = pgTable("review", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  authorName: text("author_name").notNull(),
  email: text("email"),
  company: text("company"),
  rating: integer("rating").default(5).notNull(),
  message: text("message").notNull(),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const project = pgTable(
  "project",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    category: text("category"),
    summary: text("summary"),
    description: text("description"),
    coverImage: text("cover_image"),
    url: text("url"),
    tags: text("tags"),
    accent: text("accent").default("violet").notNull(),
    year: text("year"),
    featured: boolean("featured").default(false).notNull(),
    published: boolean("published").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("project_slug_idx").on(table.slug)],
);

export const post = pgTable(
  "post",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    coverImage: text("cover_image"),
    category: text("category"),
    author: text("author").default("Erstian Team").notNull(),
    readMinutes: integer("read_minutes").default(5).notNull(),
    published: boolean("published").default(true).notNull(),
    publishedAt: timestamp("published_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("post_slug_idx").on(table.slug)],
);

/* ------------------------------------------------------------------ */
/* Relations                                                           */
/* ------------------------------------------------------------------ */

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  businesses: many(business),
  auditRequests: many(auditRequest),
  bookings: many(booking),
  leads: many(contactLead),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const businessRelations = relations(business, ({ one }) => ({
  owner: one(user, { fields: [business.ownerId], references: [user.id] }),
}));
