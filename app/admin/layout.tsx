import { PortalShell } from "@/components/portal/shell";
import { requireAdmin } from "@/lib/session";

export const metadata = { title: "Admin console", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  return (
    <PortalShell admin user={{ name: user.name, email: user.email, role: user.role }}>
      {children}
    </PortalShell>
  );
}
