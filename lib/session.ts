import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
};

function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return null;
    const u = session.user as { id: string; name: string; email: string; image?: string | null; role?: string };
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      image: u.image ?? null,
      role: u.role ?? "user",
    };
  } catch {
    return null;
  }
}

export function isAdmin(user: SessionUser | null): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;
  return adminEmails().includes(user.email.toLowerCase());
}

export async function requireUser(nextPath = "/dashboard"): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in?next=" + encodeURIComponent(nextPath));
  }
  return user;
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser("/admin");
  if (!isAdmin(user)) {
    redirect("/dashboard");
  }
  return user;
}
