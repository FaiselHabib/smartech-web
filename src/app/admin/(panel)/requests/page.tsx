import { Inbox, Search } from "lucide-react";
import { requireAdmin } from "@/lib/auth/admin-guard";
import { AdminCard } from "@/components/admin/ui/Card";
import { RequestRow } from "@/components/admin/RequestRow";
import type { RequestStatus, RequestType } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function RequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; type?: string }>;
}) {
  const { supabase } = await requireAdmin();
  const { q, status, type } = await searchParams;

  let query = supabase
    .from("contact_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (q) {
    query = query.or(
      `full_name.ilike.%${q}%,phone.ilike.%${q}%,email.ilike.%${q}%,message.ilike.%${q}%`,
    );
  }
  if (status) query = query.eq("status", status as RequestStatus);
  if (type) query = query.eq("project_type", type as RequestType);

  const { data: requests, error } = await query;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-brand-teal flex items-center gap-2">
          <Inbox className="size-6 text-brand-mint" /> طلبات العملاء
        </h1>
        <p className="text-sm text-brand-teal/60 mt-1">
          كل الطلبات الواردة من نموذج التواصل ونموذج عرض السعر.
        </p>
      </div>

      <AdminCard>
        <form className="grid sm:grid-cols-4 gap-3" method="get">
          <div className="sm:col-span-2 relative">
            <Search className="absolute end-3 top-1/2 -translate-y-1/2 size-4 text-brand-teal/40" />
            <input
              name="q"
              defaultValue={q ?? ""}
              placeholder="ابحث بالاسم، الجوال، البريد، أو الرسالة…"
              className="w-full rounded-xl border border-brand-teal/15 bg-white px-3.5 py-2.5 text-sm pe-9 focus:border-brand-mint focus:outline-none focus:ring-2 focus:ring-brand-mint/30"
            />
          </div>
          <select
            name="status"
            defaultValue={status ?? ""}
            className="rounded-xl border border-brand-teal/15 bg-white px-3.5 py-2.5 text-sm focus:border-brand-mint focus:outline-none focus:ring-2 focus:ring-brand-mint/30"
          >
            <option value="">كل الحالات</option>
            <option value="new">جديد</option>
            <option value="in_progress">قيد المعالجة</option>
            <option value="replied">تم الرد</option>
            <option value="closed">مغلق</option>
          </select>
          <select
            name="type"
            defaultValue={type ?? ""}
            className="rounded-xl border border-brand-teal/15 bg-white px-3.5 py-2.5 text-sm focus:border-brand-mint focus:outline-none focus:ring-2 focus:ring-brand-mint/30"
          >
            <option value="">كل الأنواع</option>
            <option value="general">عام</option>
            <option value="quote">عرض سعر</option>
            <option value="software">برمجة</option>
            <option value="media">إعلامي</option>
            <option value="both">برمجة + إعلامي</option>
            <option value="consultation">استشارة</option>
          </select>
        </form>
      </AdminCard>

      <AdminCard padding={false}>
        {error && (
          <p className="p-6 text-sm text-rose-600">خطأ: {error.message}</p>
        )}

        {!requests?.length ? (
          <div className="p-10 text-center">
            <div className="size-14 rounded-2xl bg-brand-mintSoft text-brand-mint grid place-items-center mx-auto mb-4">
              <Inbox className="size-6" />
            </div>
            <p className="text-sm text-brand-teal/60">
              لا توجد طلبات تطابق الفلترة الحالية.
            </p>
          </div>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-12 gap-3 px-5 py-2.5 bg-brand-mintSoft/40 text-xs text-brand-teal/60 font-medium">
              <div className="col-span-4">العميل</div>
              <div className="col-span-2">النوع</div>
              <div className="col-span-2">الحالة</div>
              <div className="col-span-2">التاريخ</div>
              <div className="col-span-2 text-end">إجراءات</div>
            </div>
            {requests.map((r) => (
              <RequestRow key={r.id} req={r} />
            ))}
          </>
        )}
      </AdminCard>
    </div>
  );
}
