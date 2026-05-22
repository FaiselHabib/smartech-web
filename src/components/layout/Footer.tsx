import Link from "next/link";
import { Mail, MapPin, Phone, Instagram } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { nav, site } from "@/lib/site";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19.6 6.32a5.74 5.74 0 0 1-3.4-1.13 5.74 5.74 0 0 1-2.18-3.5h-3.2v13.06a2.95 2.95 0 1 1-2.95-2.95c.3 0 .6.05.88.13V8.7a6.2 6.2 0 0 0-.88-.06 6.2 6.2 0 1 0 6.2 6.2V9.5a8.9 8.9 0 0 0 5.53 1.89V8.18a5.7 5.7 0 0 1 0-1.86z" />
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M.057 24l1.687-6.163A11.864 11.864 0 0 1 .002 11.92C0 5.336 5.335 0 11.92 0c3.18 0 6.167 1.24 8.413 3.488A11.82 11.82 0 0 1 23.94 11.93c0 6.585-5.335 11.92-11.92 11.92h-.005a11.9 11.9 0 0 1-5.7-1.452L.057 24zm6.597-3.807c1.676 1 3.276 1.6 5.392 1.602 5.448 0 9.886-4.434 9.889-9.885A9.86 9.86 0 0 0 12.05 2.02C6.6 2.02 2.16 6.454 2.16 11.91c0 1.86.523 3.66 1.512 5.214l-.999 3.648 3.981-1.58z" />
  </svg>
);

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 overflow-hidden bg-brand-teal text-white">
      <div className="absolute inset-0 -z-10 opacity-30 grid-bg" />
      <div className="absolute -top-32 -left-32 -z-10 size-[420px] rounded-full bg-brand-mint/20 blur-3xl" />
      <div className="container-pad py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="light" />
            <p className="mt-4 max-w-md text-[15px] leading-8 text-white/75">
              سمارتك جروب — شركة سعودية تجمع بين الحلول البرمجية والإنتاج
              الإعلامي لمساعدة المشاريع على النمو رقمياً وظهورياً.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={site.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساب"
                className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/15 transition"
              >
                <WhatsAppIcon className="size-5" />
              </a>
              <a
                href={site.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="إنستغرام"
                className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/15 transition"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href={site.contact.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تيك توك"
                className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/15 transition"
              >
                <TikTokIcon className="size-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold tracking-wider text-brand-mint">
              الشركة
            </h4>
            <ul className="mt-4 space-y-3 text-[15px]">
              {nav.slice(1).map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-white/75 hover:text-brand-mint transition"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-sm font-semibold tracking-wider text-brand-mint">
              تواصل معنا
            </h4>
            <ul className="mt-4 space-y-3 text-[15px]">
              <li>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="inline-flex items-center gap-2.5 text-white/85 hover:text-brand-mint transition"
                >
                  <Phone className="size-4 text-brand-mint" />
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2.5 text-white/85 hover:text-brand-mint transition"
                >
                  <Mail className="size-4 text-brand-mint" />
                  {site.contact.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-white/85">
                <MapPin className="size-4 text-brand-mint" />
                {site.contact.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/55">
            © {year} {site.nameEn}. جميع الحقوق محفوظة.
          </p>
          <p className="text-sm text-white/55">
            صُمّم وبُرمج داخلياً في سمارتك جروب — جدة
          </p>
        </div>
      </div>
    </footer>
  );
}
