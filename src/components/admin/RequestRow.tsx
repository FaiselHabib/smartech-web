"use client";

import * as React from "react";
import { Mail, MessageCircle, Phone, Trash2, ChevronDown } from "lucide-react";
import { RequestStatusBadge } from "@/components/admin/ui/StatusBadge";
import { ConfirmButton } from "@/components/admin/ui/ConfirmButton";
import {
  updateRequestStatusAction,
  deleteRequestAction,
} from "@/app/admin/actions/requests";
import type { ContactRequestRow, RequestStatus } from "@/lib/supabase/types";

const STATUS_OPTIONS: { value: RequestStatus; label: string }[] = [
  { value: "new", label: "جديد" },
  { value: "in_progress", label: "قيد المعالجة" },
  { value: "replied", label: "تم الرد" },
  { value: "closed", label: "مغلق" },
];

export function RequestRow({ req }: { req: ContactRequestRow }) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState<RequestStatus>(req.status);
  const [pending, startTransition] = React.useTransition();

  const waNumber = req.phone.replace(/[^\d+]/g, "");
  const waLink = `https://wa.me/${waNumber.replace(/^\+/, "")}?text=${encodeURIComponent(
    `مرحباً ${req.full_name}، شكراً لتواصلك مع Smartech Group.`,
  )}`;
  const mailto = req.email
    ? `mailto:${req.email}?subject=${encodeURIComponent(
        "بخصوص طلبك لدى Smartech Group",
      )}`
    : null;

  function onChangeStatus(s: RequestStatus) {
    setStatus(s);
    startTransition(async () => {
      await updateRequestStatusAction(req.id, s);
    });
  }

  return (
    <div className="border-b border-brand-teal/10 last:border-0">
      <div className="grid grid-cols-12 items-center gap-3 px-5 py-3 hover:bg-brand-mintSoft/20 transition">
        <div className="col-span-12 md:col-span-4 min-w-0">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 text-start w-full"
          >
            <ChevronDown
              className={`size-4 text-brand-teal/40 transition ${
                open ? "rotate-180" : ""
              }`}
            />
            <div className="min-w-0">
              <p className="font-medium text-brand-teal truncate">
                {req.full_name}
              </p>
              <p className="text-[11px] text-brand-teal/50 truncate">
                {req.phone}
                {req.email ? ` · ${req.email}` : ""}
              </p>
            </div>
          </button>
        </div>

        <div className="col-span-6 md:col-span-2 text-xs text-brand-teal/70">
          {req.project_type}
        </div>

        <div className="col-span-6 md:col-span-2">
          <RequestStatusBadge status={status} />
        </div>

        <div className="hidden md:block md:col-span-2 text-[11px] text-brand-teal/55">
          {new Date(req.created_at).toLocaleDateString("ar-SA")}
        </div>

        <div className="col-span-12 md:col-span-2 flex items-center justify-end gap-1.5">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            className="grid place-items-center size-8 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition"
          >
            <MessageCircle className="size-4" />
          </a>
          {mailto && (
            <a
              href={mailto}
              title="بريد إلكتروني"
              className="grid place-items-center size-8 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white transition"
            >
              <Mail className="size-4" />
            </a>
          )}
          <a
            href={`tel:${waNumber}`}
            title="اتصال"
            className="grid place-items-center size-8 rounded-full bg-brand-mintSoft text-brand-teal hover:bg-brand-mint hover:text-white transition"
          >
            <Phone className="size-4" />
          </a>
        </div>
      </div>

      {open && (
        <div className="px-12 pb-5 -mt-1 grid gap-4 text-sm text-brand-teal/80">
          {req.message && (
            <div>
              <p className="text-xs text-brand-teal/50 mb-1">الرسالة</p>
              <p className="whitespace-pre-line bg-brand-mintSoft/40 rounded-xl p-3.5 leading-relaxed">
                {req.message}
              </p>
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            {req.company && (
              <p>
                <span className="text-brand-teal/50">الشركة: </span>
                {req.company}
              </p>
            )}
            {req.budget && (
              <p>
                <span className="text-brand-teal/50">الميزانية: </span>
                {req.budget}
              </p>
            )}
            {req.timeline && (
              <p>
                <span className="text-brand-teal/50">المدة: </span>
                {req.timeline}
              </p>
            )}
            {req.source_page && (
              <p>
                <span className="text-brand-teal/50">المصدر: </span>
                {req.source_page}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <label className="text-xs text-brand-teal/55">الحالة:</label>
              <select
                value={status}
                disabled={pending}
                onChange={(e) => onChangeStatus(e.target.value as RequestStatus)}
                className="rounded-full bg-white px-3 h-9 text-xs ring-1 ring-brand-teal/15 focus:ring-brand-mint outline-none"
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            <form action={deleteRequestAction.bind(null, req.id)}>
              <ConfirmButton confirmLabel="تأكيد الحذف">
                <Trash2 className="size-3.5" />
                حذف
              </ConfirmButton>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
