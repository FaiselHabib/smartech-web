import Link from "next/link";
import { Plus, Search, Newspaper } from "lucide-react";
import { requireAdmin } from "@/lib/auth/admin-guard";
import { AdminCard } from "@/components/admin/ui/Card";
import { ContentStatusBadge } from "@/components/admin/ui/StatusBadge";

export const dynamic = "force-dynamic";

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { q, status } = await searchParams;

  let query = supabase
    .from("blog_posts")
    .select(
      "id, slug, title_ar, status, cover_image, category, published_at, updated_at",
    )
    .order("updated_at", { ascending: false });

  if (q) query = query.or(`title_ar.ilike.%${q}%,slug.ilike.%${q}%`);
  if (status === "draft" || status === "published")
    query = query.eq("status", status);

  const { data: posts, error } = await query;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-brand-teal flex items-center gap-2">
            <Newspaper className="size-6 text-brand-mint" /> المدونة
          </h1>
          <p className="text-sm text-brand-teal/60 mt-1">
            إدارة المقالات والمحتوى التحريري.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand-gradient text-white px-5 h-11 text-sm font-medium shadow-brand hover:-translate-y-0.5 transition"
        >
          <Plus className="size-4" />
          مقال جديد
        </Link>
      </div>

      <AdminCard>
        <form className="grid sm:grid-cols-3 gap-3" method="get">
          <div className="sm:col-span-2 relative">
            <Search className="absolute end-3 top-1/2 -translate-y-1/2 size-4 text-brand-teal/40" />
            <input
              name="q"
              defaultValue={q ?? ""}
              placeholder="ابحث بالعنوان أو الـ slug…"
              className="w-full rounded-xl border border-brand-teal/15 bg-white px-3.5 py-2.5 text-sm pe-9 focus:border-brand-mint focus:outline-none focus:ring-2 focus:ring-brand-mint/30"
            />
          </div>
          <select
            name="status"
            defaultValue={status ?? ""}
            className="rounded-xl border border-brand-teal/15 bg-white px-3.5 py-2.5 text-sm focus:border-brand-mint focus:outline-none focus:ring-2 focus:ring-brand-mint/30"
          >
            <option value="">كل الحالات</option>
            <option value="published">منشور</option>
            <option value="draft">مسودة</option>
          </select>
        </form>
      </AdminCard>

      <AdminCard padding={false}>
        {error && (
          <p className="p-6 text-sm text-rose-600">خطأ: {error.message}</p>
        )}

        {!posts?.length ? (
          <div className="p-10 text-center">
            <div className="size-14 rounded-2xl bg-brand-mintSoft text-brand-mint grid place-items-center mx-auto mb-4">
              <Newspaper className="size-6" />
            </div>
            <p className="text-sm text-brand-teal/60">
              لا توجد مقالات بعد — ابدأ بكتابة أوّل مقال.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-brand-mintSoft/40 text-brand-teal/70">
                <tr>
                  <th className="text-start font-medium px-5 py-3">المقال</th>
                  <th className="text-start font-medium px-5 py-3 hidden md:table-cell">
                    التصنيف
                  </th>
                  <th className="text-start font-medium px-5 py-3">الحالة</th>
                  <th className="text-start font-medium px-5 py-3 hidden lg:table-cell">
                    تاريخ النشر
                  </th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-teal/10">
                {posts.map((p) => (
                  <tr key={p.id} className="hover:bg-brand-mintSoft/20">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="size-10 rounded-lg overflow-hidden bg-brand-mintSoft ring-1 ring-brand-teal/10 shrink-0">
                          {p.cover_image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.cover_image}
                              alt=""
                              className="size-full object-cover"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/admin/blog/${p.id}`}
                            className="font-medium text-brand-teal hover:text-brand-mint truncate block"
                          >
                            {p.title_ar}
                          </Link>
                          <p className="text-[11px] text-brand-teal/45 truncate">
                            /{p.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell text-brand-teal/70 text-xs">
                      {p.category || "—"}
                    </td>
                    <td className="px-5 py-3">
                      <ContentStatusBadge status={p.status} />
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell text-brand-teal/55 text-xs">
                      {p.published_at
                        ? new Date(p.published_at).toLocaleDateString("ar-SA")
                        : "—"}
                    </td>
                    <td className="px-5 py-3 text-end">
                      <Link
                        href={`/admin/blog/${p.id}`}
                        className="inline-flex items-center justify-center rounded-full px-3 h-8 text-xs text-brand-teal bg-brand-mintSoft hover:bg-brand-mint hover:text-white transition"
                      >
                        تعديل
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>
    </div>
  );
}
