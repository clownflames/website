import { db } from "@/db";
import { project } from "@/db/schema";
import { adminGuard } from "@/lib/admin-guard";
import { fail, ok, readJson, str } from "@/lib/api";
import { slugify } from "@/lib/format";

export async function POST(request: Request) {
  const guard = await adminGuard();
  if (!guard.user) return guard.response;

  const body = await readJson(request);
  const title = str(body.title, 200);
  const summary = str(body.summary, 1000);
  if (!title || !summary) return fail("Add a project title and summary.");

  const slug = slugify(str(body.slug, 120) || title) || "project-" + Date.now();

  try {
    const [created] = await db
      .insert(project)
      .values({
        title,
        slug,
        category: str(body.category, 120) || null,
        summary,
        description: str(body.description, 4000) || null,
        tags: str(body.tags, 300) || null,
        coverImage: str(body.coverImage, 500) || null,
        url: str(body.url, 500) || null,
        accent: str(body.accent, 30) || "violet",
        year: str(body.year, 20) || null,
        featured: body.featured === true,
        published: body.published === false ? false : true,
      })
      .returning({ id: project.id });
    return ok({ id: created?.id ?? null }, 201);
  } catch {
    return fail("Could not add that project. Check the slug is unique.", 500);
  }
}
