import { PortalShell } from "@/components/portal/shell";
import { isAdmin, requireUser } from "@/lib/session";

export const metadata = { title: "Dashboard", robots: { index: false, follow: false } };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser("/dashboard");
  return (
    <PortalShell adminAccess={isAdmin(user)} user={{ name: user.name, email: user.email, role: user.role }}>
      {children}
    </PortalShell>
  );
}
