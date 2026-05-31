"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-brand-teal/10 shadow-soft"
          : "bg-transparent",
      )}
    >
      <div className="container-pad flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3.5 py-2 rounded-full text-[14px] font-medium transition-colors",
                  active
                    ? "text-brand-teal"
                    : "text-muted-foreground hover:text-brand-teal",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-gradient" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Button href={`tel:${site.contact.phone}`} variant="outline" size="sm">
            <Phone className="size-4" />
            اتصل بنا
          </Button>
          <Button href="/contact" size="sm">
            ابدأ مشروعك
          </Button>
        </div>

        <button
          onClick={() => setOpen((s) => !s)}
          aria-label="القائمة"
          className="lg:hidden inline-flex size-11 items-center justify-center rounded-full border border-brand-teal/10 bg-white/80 backdrop-blur"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-300",
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container-pad pb-6">
          <div className="rounded-3xl border border-brand-teal/10 bg-white/95 backdrop-blur-xl p-4 shadow-glass">
            <nav className="flex flex-col">
              {nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-4 py-3 rounded-2xl text-[15px] font-medium transition-colors",
                      active
                        ? "bg-brand-mintSoft text-brand-teal"
                        : "text-muted-foreground hover:bg-brand-mintSoft/60",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button href={`tel:${site.contact.phone}`} variant="outline" size="sm">
                <Phone className="size-4" /> اتصال
              </Button>
              <Button href="/contact" size="sm">
                ابدأ مشروعك
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
