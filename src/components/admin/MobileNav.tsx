"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Newspaper, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "الرئيسية", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "المشاريع", icon: FolderKanban },
  { href: "/admin/blog", label: "المدونة", icon: Newspaper },
  { href: "/admin/requests", label: "الطلبات", icon: Inbox },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-brand-teal/10">
      <div className="grid grid-cols-4">
        {items.map((it) => {
          const Icon = it.icon;
          const active = it.exact
            ? pathname === it.href
            : pathname?.startsWith(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "flex flex-col items-center justify-center py-2.5 text-[11px] gap-1 transition",
                active ? "text-brand-mint" : "text-brand-teal/60",
              )}
            >
              <Icon className="size-4" />
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
