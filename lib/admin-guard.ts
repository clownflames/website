import { fail } from "@/lib/api";
import { getCurrentUser, isAdmin } from "@/lib/session";

export async function adminGuard() {
  const user = await getCurrentUser();
  if (!user) return { user: null, response: fail("Please sign in.", 401) };
  if (!isAdmin(user)) return { user: null, response: fail("You do not have access to that action.", 403) };
  return { user, response: null };
}
