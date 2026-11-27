# Erstian Technologies — website, client portal & admin console

A complete company website for **Erstian Technologies** plus two private workspaces:

- **Client dashboard** — add businesses, track free "View My Business" audit requests and reports, see bookings and enquiries.
- **Admin console** — review audits, manage enquiries and bookings, curate testimonials, approve visitor reviews, publish portfolio projects and journal articles.

Built with Next.js App Router (via `vinext`) on Vite + Cloudflare Workers, React 19, Tailwind CSS v4, better-auth, Drizzle ORM and Neon Postgres.

---

## Quick start

```bash
npm install
```

Create `.env` in the project root:

```bash
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
BETTER_AUTH_SECRET="a-long-random-string"
BETTER_AUTH_URL="http://localhost:5173"
ADMIN_EMAILS="you@yourcompany.com"
```

Push the schema and seed the sample content:

```bash
npm run db:push
npm run seed
npm run dev
```

Open <http://localhost:5173>.

> **Windows:** if `npm` is blocked by the PowerShell execution policy, use `npm.cmd` instead.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Neon Postgres connection string used by Drizzle and better-auth. |
| `BETTER_AUTH_SECRET` | Yes | Signs session cookies. Generate with `openssl rand -base64 32`. |
| `BETTER_AUTH_URL` | Production | Public origin of the site, e.g. `https://erstiantech.com`. |
| `ADMIN_EMAILS` | Recommended | Comma-separated emails that can open `/admin`, even before their `role` is set to `admin`. |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | Optional | Enables GitHub sign-in. Omit to keep email + password only. |
| `SEED_ADMIN_EMAIL` | Optional | Used by `npm run seed` to promote an existing account to admin. |

### Making yourself an admin

1. Sign up normally on `/sign-up`.
2. Either add your email to `ADMIN_EMAILS` and restart, or run:

```bash
npm run seed -- you@example.com
```

3. Visit `/admin`. Non-admins are redirected to `/dashboard`.

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server (Cloudflare plugin) on port 5173. |
| `npm run build` | Production build of the Cloudflare Worker output. |
| `npm run start` | Preview the built output locally. |
| `npm run deploy` | Deploy to Cloudflare with `vinext-cloudflare`. |
| `npm run db:push` | Push `db/schema.ts` to Postgres with drizzle-kit. |
| `npm run db:studio` | Open Drizzle Studio against the database. |
| `npm run seed` | Insert sample testimonials, projects and articles; optionally promote an admin. |

---

## What is in the site

### Public pages

| Route | Page |
| --- | --- |
| `/` | Homepage: animated audit scorecard, services, work, process, testimonials, journal, FAQ. |
| `/services` | All nine practice areas in detail. |
| `/services/[slug]` | Individual service page with deliverables, outcomes and related services. |
| `/free-audit` | "View My Business" — free manual audit request, checklist, how it works, FAQ. |
| `/portfolio` | Selected builds (published projects). |
| `/blog`, `/blog/[slug]` | Journal index and article pages with table of contents. |
| `/testimonials` | Curated testimonials, rating summary and a visitor review form. |
| `/about` | Story, principles, process and service links. |
| `/contact` | Contact details and enquiry form. |
| `/book` | 20-minute intro call booking with preferred date and time. |
| `/sign-in`, `/sign-up` | Email + password authentication. |
| `/dashboard` | Client workspace (requires sign-in). |
| `/admin` | Admin console (requires admin role or `ADMIN_EMAILS`). |

### Client dashboard

- **Overview** — counts, businesses, latest audit, next call and recent enquiries.
- **My businesses** — add and remove businesses; each is owned by the signed-in user.
- **Audit requests** — live status tracker (`pending → in_review → completed`) and the full report once published.
- **Bookings** — requested slots and confirmation state.
- **Enquiries** — every message sent through the site, with replies going to the email on file.

### Admin console

- **Overview** — pending audits, new enquiries, booking requests, reviews awaiting moderation, content counts, newest accounts, daily routine.
- **Businesses** — every business added by clients, with owner, category, city, website, description and stated goal.
- **Audits** — filter by status, read the submitted context, write a score, summary and growth ideas, mark complete. The client sees it immediately.
- **Enquiries** — filter by status, reply by email, move `new → contacted → closed`.
- **Bookings** — confirm, complete or cancel requested calls.
- **Testimonials** — add, publish/unpublish and delete curated quotes.
- **Reviews** — approve or reject visitor-submitted reviews before they appear publicly.
- **Portfolio** — add projects with slug, category, tags, accent, year and featured flag.
- **Journal** — write articles in lightweight Markdown (`##` section headings, blank-line paragraphs, `- ` lists) and publish or draft them.

All admin actions go through route handlers that verify the session and admin role server-side; hiding a button is never the only defence.

---

## Project structure

```
app/
  (site)/            Public marketing pages and shared header/footer layout
  (auth)/            Split-screen sign-in / sign-up layout
  dashboard/         Client workspace (guarded by requireUser)
  admin/             Admin console (guarded by requireAdmin)
  api/               Audits, contacts, bookings, reviews, businesses, content
components/
  site/              Header, footer, navigation, cards, sections
  forms/             Public forms, auth forms, admin forms (client components)
  portal/            Workspace shell, navigation and UI primitives
  ui/                Buttons, fields, primitives
db/
  schema.ts          Drizzle schema (auth, businesses, audits, bookings, leads, content)
lib/
  auth.ts            better-auth server config
  auth-client.ts     better-auth browser client
  session.ts         requireUser / requireAdmin helpers
  queries.ts         Safe public reads with sample-data fallbacks
  portal.ts          Dashboard and admin queries
  content.ts         Company copy, services, FAQs, fallbacks
scripts/
  seed.ts            Idempotent sample content + admin promotion
```

---

## Data and fallbacks

Every public database read is wrapped so the marketing site still renders if the database is empty or unreachable. When the tables are empty, the homepage, portfolio, journal and testimonials show the sample content from `lib/content.ts`. Seeding replaces that with real rows; the fallbacks remain as a safety net.

The dashboard and admin console never use fallbacks — they require a real session.

## Design notes

- Warm paper background (`#f7f6f1`), ink (`#0a0c12`), violet (`#4f34e8`) and lime (`#d8f45c`).
- IBM Plex Sans, tight display tracking, rounded-2xl cards, dark CTA bands.
- No external image dependencies: project covers use generated gradients and initials.
- Respects reduced motion through Tailwind's motion-safe patterns and CSS transitions.
