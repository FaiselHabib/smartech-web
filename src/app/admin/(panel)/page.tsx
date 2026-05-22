import Link from "next/link";
import {
  FolderKanban,
  Newspaper,
  Inbox,
  TrendingUp,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { requireAdmin } from "@/lib/auth/admin-guard";
import { AdminCard } from "@/components/admin/ui/Card";
import {
  ContentStatusBadge,
  RequestStatusBadge,
} from "@/components/admin/ui/StatusBadge";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const { supabase, profile } = await requireAdmin();

  const [
    projectsTotal,
    projectsPublished,
    postsTotal,
    postsPublished,
    requestsTotal,
    requestsNew,
    latestProjects,
    latestRequests,
  ] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase
      .from("projects")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase
      .from("blog_posts")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("contact_requests")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("contact_requests")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("projects")
      .select("id, slug, title_ar, status, category, updated_at")
      .order("updated_at", { ascending: false })
      .limit(5),
    supabase
      .from("contact_requests")
      .select("id, full_name, phone, project_type, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    {
      label: "المشاريع",
      total: projectsTotal.count ?? 0,
      sub: `${projectsPublished.count ?? 0} منشور`,
      href: "/admin/projects",
      icon: FolderKanban,
      tone: "from-brand-mint to-brand-mintLight",
    },
    {
      label: "المقالات",
      total: postsTotal.count ?? 0,
      sub: `${postsPublished.count ?? 0} منشور`,
      href: "/admin/blog",
      icon: Newspaper,
      tone: "from-brand-teal to-brand-tealMid",
    },
    {
      label: "الطلبات",
      total: requestsTotal.count ?? 0,
      sub: `${requestsNew.count ?? 0} جديد`,
      href: "/admin/requests",
      icon: Inbox,
      tone: "from-amber-500 to-orange-400",
    },
    {
      label: "حالة المنصة",
      total: "تشغيل",
      sub: "كل الخدمات تعمل",
      icon: TrendingUp,
      tone: "from-emerald-500 to-emerald-400",
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold text-brand-teal">
          أهلاً، {profile.full_name || "أدمن"} 👋
        </h1>
        <p className="text-sm text-brand-teal/60 mt-1">
          هذه نظرة سريعة على المحتوى والطلبات في الموقع.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          const inner = (
            <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-brand-teal/10 h-full transition group-hover:-translate-y-0.5 group-hover:shadow-glass">
              <div
                className={`size-10 rounded-xl bg-gradient-to-br ${s.tone} text-white grid place-items-center mb-4 shadow-soft`}
              >
                <Icon className="size-5" />
              </div>
              <p className="text-xs text-brand-teal/55">{s.label}</p>
              <p className="text-2xl font-semibold text-brand-teal mt-1">
                {s.total}
              </p>
              <p className="text-[11px] text-brand-teal/50 mt-0.5">{s.sub}</p>
            </div>
          );
          return s.href ? (
            <Link key={s.label} href={s.href} className="group">
              {inner}
            </Link>
          ) : (
            <div key={s.label} className="group">
              {inner}
            </div>
          );
        })}
      </section>

      {/* Quick actions */}
      <section className="grid sm:grid-cols-3 gap-3">
        <Link
          href="/admin/projects/new"
          className="group flex items-center justify-between rounded-2xl bg-brand-tealDeep text-white p-4 hover:bg-brand-tealMid transition"
        >
          <div>
            <p className="text-xs text-white/60">مشروع جديد</p>
            <p className="font-medium mt-0.5">أضف مشروع للبورتفوليو</p>
          </div>
          <div className="size-10 rounded-xl bg-brand-mint/20 text-brand-mint grid place-items-center group-hover:bg-brand-mint group-hover:text-brand-tealDeep transition">
            <Plus className="size-5" />
          </div>
        </Link>

        <Link
          href="/admin/blog/new"
          className="group flex items-center justify-between rounded-2xl bg-white p-4 ring-1 ring-brand-teal/10 hover:ring-brand-mint/40 transition"
        >
          <div>
            <p className="text-xs text-brand-teal/55">مقال جديد</p>
            <p className="font-medium mt-0.5 text-brand-teal">
              اكتب محتوى للمدونة
            </p>
          </div>
          <div className="size-10 rounded-xl bg-brand-mintSoft text-brand-teal grid place-items-center group-hover:bg-brand-mint group-hover:text-white transition">
            <Plus className="size-5" />
          </div>
        </Link>

        <Link
          href="/admin/requests"
          className="group flex items-center justify-between rounded-2xl bg-white p-4 ring-1 ring-brand-teal/10 hover:ring-brand-mint/40 transition"
        >
          <div>
            <p className="text-xs text-brand-teal/55">صندوق الوارد</p>
            <p className="font-medium mt-0.5 text-brand-teal">
              متابعة طلبات العملاء
            </p>
          </div>
          <div className="size-10 rounded-xl bg-amber-100 text-amber-600 grid place-items-center group-hover:bg-amber-500 group-hover:text-white transition">
            <Inbox className="size-5" />
          </div>
        </Link>
      </section>

      {/* Latest activity */}
      <section className="grid lg:grid-cols-2 gap-6">
        <AdminCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-brand-teal">آخر المشاريع</h2>
            <Link
              href="/admin/projects"
              className="text-xs text-brand-mint hover:text-brand-teal flex items-center gap-1"
            >
              الكل <ArrowLeft className="size-3.5" />
            </Link>
          </div>
          {latestProjects.data?.length ? (
            <ul className="space-y-1">
              {latestProjects.data.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/admin/projects/${p.id}`}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-brand-mintSoft/40 transition"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-brand-teal truncate">
                        {p.title_ar}
                      </p>
                      <p className="text-[11px] text-brand-teal/50">
                        {p.category}
                      </p>
                    </div>
                    <ContentStatusBadge status={p.status} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-brand-teal/55">لا توجد مشاريع بعد.</p>
          )}
        </AdminCard>

        <AdminCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-brand-teal">آخر الطلبات</h2>
            <Link
              href="/admin/requests"
              className="text-xs text-brand-mint hover:text-brand-teal flex items-center gap-1"
            >
              الكل <ArrowLeft className="size-3.5" />
            </Link>
          </div>
          {latestRequests.data?.length ? (
            <ul className="space-y-1">
              {latestRequests.data.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-brand-mintSoft/40 transition"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-brand-teal truncate">
                      {r.full_name}
                    </p>
                    <p className="text-[11px] text-brand-teal/50 truncate">
                      {r.phone} · {r.project_type}
                    </p>
                  </div>
                  <RequestStatusBadge status={r.status} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-brand-teal/55">لا توجد طلبات بعد.</p>
          )}
        </AdminCard>
      </section>
    </div>
  );
}
