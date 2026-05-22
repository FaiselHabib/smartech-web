import { cn } from "@/lib/utils";
import type { ContentStatus, RequestStatus } from "@/lib/supabase/types";

const contentMap: Record<ContentStatus, { label: string; klass: string }> = {
  draft: { label: "مسودة", klass: "bg-amber-50 text-amber-700 ring-amber-200" },
  published: {
    label: "منشور",
    klass: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
};

const requestMap: Record<RequestStatus, { label: string; klass: string }> = {
  new: { label: "جديد", klass: "bg-sky-50 text-sky-700 ring-sky-200" },
  in_progress: {
    label: "قيد المعالجة",
    klass: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  replied: {
    label: "تم الرد",
    klass: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  closed: {
    label: "مغلق",
    klass: "bg-slate-100 text-slate-600 ring-slate-200",
  },
};

const pill =
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1";

export function ContentStatusBadge({ status }: { status: ContentStatus }) {
  const v = contentMap[status];
  return <span className={cn(pill, v.klass)}>{v.label}</span>;
}

export function RequestStatusBadge({ status }: { status: RequestStatus }) {
  const v = requestMap[status];
  return <span className={cn(pill, v.klass)}>{v.label}</span>;
}
