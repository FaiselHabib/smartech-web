import type { Metadata } from "next";
import { ToastProvider } from "@/components/admin/ui/Toast";

export const metadata: Metadata = {
  title: "لوحة التحكم — Smartech Group",
  robots: { index: false, follow: false },
};

/**
 * Root /admin shell.  Only adds the toast provider + RTL container.
 * The protected sidebar/topbar lives under (panel)/layout.tsx so the login
 * page can render without it.
 */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" className="font-sans">
      <ToastProvider>{children}</ToastProvider>
    </div>
  );
}
