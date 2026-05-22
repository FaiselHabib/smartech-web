import Link from "next/link";
import { LoginForm } from "./LoginForm";
import { Lock } from "lucide-react";

export const metadata = {
  title: "تسجيل الدخول — لوحة التحكم",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}) {
  const { redirect, error } = await searchParams;

  return (
    <div className="min-h-dvh grid place-items-center px-4 bg-gradient-to-b from-brand-mintSoft/40 via-white to-white">
      <div className="absolute inset-x-0 top-0 -z-10 h-[60vh] bg-hero-radial" />

      <div className="w-full max-w-md">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 mb-8 group"
        >
          <div className="size-10 rounded-xl bg-brand-tealDeep grid place-items-center">
            <span className="text-brand-mint font-bold text-lg">S</span>
          </div>
          <div className="leading-tight text-start">
            <p className="text-sm font-semibold text-brand-teal">Smartech</p>
            <p className="text-[10px] text-brand-teal/50 uppercase tracking-widest">
              Admin Panel
            </p>
          </div>
        </Link>

        <div className="rounded-3xl bg-white/95 backdrop-blur ring-1 ring-brand-teal/10 shadow-glass p-8">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="size-9 rounded-xl bg-brand-mint/15 text-brand-mint grid place-items-center">
              <Lock className="size-4" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-brand-teal">
                مرحباً مجدداً
              </h1>
              <p className="text-xs text-brand-teal/55">
                سجّل الدخول للوصول إلى لوحة التحكم
              </p>
            </div>
          </div>

          {error === "not_admin" && (
            <div className="mb-4 rounded-xl bg-rose-50 px-3.5 py-2.5 text-xs text-rose-700 ring-1 ring-rose-200">
              هذا الحساب لا يملك صلاحيات إدارية.
            </div>
          )}

          {error === "not_configured" && (
            <div className="mb-4 rounded-xl bg-amber-50 px-3.5 py-2.5 text-xs text-amber-800 ring-1 ring-amber-200">
              لم يتم إعداد Supabase بعد. راجع{" "}
              <span className="font-mono">SUPABASE_SETUP.md</span> لإضافة متغيّرات
              البيئة وتفعيل لوحة التحكم.
            </div>
          )}

          <LoginForm redirectTo={redirect} />

          <p className="mt-6 text-center text-[11px] text-brand-teal/45">
            هذه الصفحة مخصّصة لفريق Smartech فقط.
          </p>
        </div>

        <Link
          href="/"
          className="block text-center mt-5 text-xs text-brand-teal/60 hover:text-brand-teal"
        >
          ← العودة إلى الموقع
        </Link>
      </div>
    </div>
  );
}
