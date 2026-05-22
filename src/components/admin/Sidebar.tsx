"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Newspaper,
  Inbox,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOutAction } from "@/app/admin/actions/auth";

const nav = [
  { href: "/admin", label: "نظرة عامة", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "المشاريع", icon: FolderKanban },
  { href: "/admin/blog", label: "المدونة", icon: Newspaper },
  { href: "/admin/requests", label: "الطلبات", icon: Inbox },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:start-0 lg:z-40 bg-brand-tealDeep text-white">
      <div className="flex items-center gap-2 px-6 h-16 border-b border-white/5">
        <div className="size-8 rounded-lg bg-brand-mint/15 ring-1 ring-brand-mint/30 grid place-items-center">
          <span className="text-brand-mint font-bold text-sm">S</span>
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold">Smartech</p>
          <p className="text-[10px] text-white/50 uppercase tracking-widest">
            Admin Panel
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                active
                  ? "bg-brand-mint/15 text-brand-mint ring-1 ring-brand-mint/30"
                  : "text-white/70 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 space-y-1 border-t border-white/5">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 hover:bg-white/5 hover:text-white transition"
        >
          <ExternalLink className="size-4" />
          عرض الموقع
        </Link>
        <form action={signOutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-rose-300 hover:bg-rose-500/10 transition"
          >
            <LogOut className="size-4" />
            تسجيل الخروج
          </button>
        </form>
      </div>
    </aside>
  );
}
