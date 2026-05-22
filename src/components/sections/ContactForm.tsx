"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { site } from "@/lib/site";
import { submitContactRequestAction } from "@/app/actions/contact";

const projectTypes = [
  { value: "software", label: "مشروع برمجي" },
  { value: "media", label: "مشروع إعلامي" },
  { value: "both", label: "الاثنين معاً" },
  { value: "consultation", label: "استشارة" },
];

const budgets = ["أقل من 10 آلاف", "10–30 ألف", "30–80 ألف", "+80 ألف"];

export function ContactForm() {
  const pathname = usePathname();
  const [type, setType] = React.useState("software");
  const [submitted, setSubmitted] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const name = String(fd.get("name") || "");
    const company = String(fd.get("company") || "");
    const phone = String(fd.get("phone") || "");
    const email = String(fd.get("email") || "");
    const budget = String(fd.get("budget") || "");
    const message = String(fd.get("message") || "");

    // 1) Persist to Supabase via Server Action.
    const payload = new FormData();
    payload.set("full_name", name);
    payload.set("phone", phone);
    if (email) payload.set("email", email);
    if (company) payload.set("company", company);
    payload.set("project_type", type);
    if (budget) payload.set("budget", budget);
    if (message) payload.set("message", message);
    if (pathname) payload.set("source_page", pathname);

    const res = await submitContactRequestAction(null, payload);

    if (!res || !res.ok) {
      setError(res?.error ?? "تعذّر حفظ الطلب — حاول مرة أخرى");
      setPending(false);
      return;
    }

    // 2) Then open WhatsApp as the customer-facing channel.
    const text = encodeURIComponent(
      `طلب مشروع جديد عبر الموقع\n\n` +
        `الاسم: ${name}\n` +
        `الشركة: ${company}\n` +
        `الجوال: ${phone}\n` +
        `البريد: ${email}\n` +
        `نوع المشروع: ${projectTypes.find((t) => t.value === type)?.label}\n` +
        `الميزانية: ${budget}\n` +
        `التفاصيل: ${message}`,
    );
    window.open(`${site.contact.whatsapp}?text=${text}`, "_blank");

    setSubmitted(true);
    setPending(false);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-brand-mint/30 bg-brand-mintSoft p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-brand-mint" />
        <h3 className="mt-4 text-xl font-extrabold text-brand-teal">
          تم استلام طلبك بنجاح
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          فُتحت محادثة واتساب لإرسال التفاصيل لفريقنا. سنرد عليك خلال أقرب وقت.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Type selector */}
      <div>
        <label className="text-sm font-semibold text-brand-teal mb-2 block">
          نوع المشروع
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {projectTypes.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setType(t.value)}
              className={`rounded-2xl border px-3 py-2.5 text-sm font-medium transition-all ${
                type === t.value
                  ? "border-brand-mint bg-brand-mintSoft text-brand-teal shadow-soft"
                  : "border-brand-teal/10 bg-white text-muted-foreground hover:border-brand-mint/40"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="الاسم الكامل" placeholder="مثال: فهد العتيبي" required />
        <Field name="company" label="الشركة (اختياري)" placeholder="اسم الشركة" />
        <Field name="phone" label="رقم الجوال" placeholder="+966 ..." required type="tel" />
        <Field
          name="email"
          label="البريد الإلكتروني"
          placeholder="you@company.com"
          required
          type="email"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-brand-teal mb-2 block">
          الميزانية التقريبية
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {budgets.map((b) => (
            <label
              key={b}
              className="cursor-pointer rounded-2xl border border-brand-teal/10 bg-white px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:border-brand-mint/40 has-[:checked]:border-brand-mint has-[:checked]:bg-brand-mintSoft has-[:checked]:text-brand-teal text-center"
            >
              <input type="radio" name="budget" value={b} className="sr-only" />
              {b}
            </label>
          ))}
        </div>
      </div>

      <Field
        name="message"
        label="فكرة المشروع"
        placeholder="اكتب وصفاً مختصراً للمشروع والأهداف..."
        textarea
      />

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            جاري الإرسال…
          </>
        ) : (
          <>
            إرسال الطلب
            <ArrowLeft className="size-4" />
          </>
        )}
      </Button>
      {error && (
        <p className="text-xs text-rose-600 bg-rose-50 ring-1 ring-rose-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        بإرسال الطلب فأنت توافق على التواصل معك عبر القناة المناسبة.
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  placeholder,
  required,
  type = "text",
  textarea,
}: {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-brand-teal mb-2 block">
        {label} {required && <span className="text-brand-mint">*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={5}
          required={required}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-brand-teal/10 bg-white px-4 py-3 text-sm leading-7 outline-none transition-all placeholder:text-muted-foreground/60 focus:border-brand-mint focus:ring-2 focus:ring-brand-mint/30"
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-brand-teal/10 bg-white px-4 h-12 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-brand-mint focus:ring-2 focus:ring-brand-mint/30"
        />
      )}
    </label>
  );
}
