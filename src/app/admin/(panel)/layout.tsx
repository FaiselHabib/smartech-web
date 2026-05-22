import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";
import { MobileNav } from "@/components/admin/MobileNav";
import { requireAdmin } from "@/lib/auth/admin-guard";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await requireAdmin();

  return (
    <div className="min-h-dvh bg-brand-mintSoft/20">
      <Sidebar />
      <div className="lg:ps-64">
        <Topbar email={profile.email} name={profile.full_name} />
        <main className="px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-10">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
