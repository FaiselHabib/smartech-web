import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function Topbar({
  email,
  name,
}: {
  email: string | null;
  name: string | null;
}) {
  const initials = (name || email || "?")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-brand-teal/10">
      <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 lg:hidden">
          <div className="size-8 rounded-lg bg-brand-tealDeep grid place-items-center">
            <span className="text-brand-mint font-bold text-sm">S</span>
          </div>
          <p className="text-sm font-semibold text-brand-teal">Smartech Admin</p>
        </div>

        <div className="flex items-center gap-3 ms-auto">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-brand-teal/60 hover:text-brand-teal transition"
          >
            <ExternalLink className="size-3.5" />
            عرض الموقع العام
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-full bg-brand-gradient text-white grid place-items-center text-xs font-semibold shadow-soft">
              {initials}
            </div>
            <div className="leading-tight hidden sm:block">
              <p className="text-xs font-medium text-brand-teal">
                {name || "أدمن"}
              </p>
              <p className="text-[10px] text-brand-teal/50">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
