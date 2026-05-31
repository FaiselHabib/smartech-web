"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Home, MessageCircle, Search } from "lucide-react";
import { site } from "@/lib/site";

const quickLinks = [
  { href: "/systems", label: "الأنظمة" },
  { href: "/portfolio", label: "الأعمال" },
  { href: "/services", label: "الخدمات" },
  { href: "/blog", label: "المدونة" },
];

export default function NotFound() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden pt-[140px] pb-20">
      <div className="absolute inset-0 -z-10 bg-hero-radial" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-40 mask-fade-b" />
      <div className="absolute -top-40 right-0 -z-10 size-[520px] rounded-full bg-brand-mint/25 blur-[120px]" />
      <div className="absolute bottom-0 -left-20 -z-10 size-[420px] rounded-full bg-brand-teal/10 blur-[110px]" />

      <div className="container-pad relative text-center">
        {/* Floating brand mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto size-32 sm:size-40"
        >
          <div className="absolute inset-0 rounded-full bg-brand-mint/30 blur-3xl" />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
            className="relative flex h-full w-full items-center justify-center"
          >
            <Image
              src="/brand/icon-mint.png"
              alt="Smartech"
              width={160}
              height={160}
              priority
              className="drop-shadow-[0_18px_30px_rgba(57,210,192,0.5)]"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-brand-mint/30 bg-brand-mintSoft px-4 py-1.5 text-xs font-semibold text-brand-teal"
        >
          <Search className="size-3.5" />
          صفحة غير موجودة
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-[88px] sm:text-[140px] leading-none font-extrabold text-gradient tracking-tight"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mx-auto mt-4 max-w-lg text-base sm:text-lg leading-8 text-muted-foreground text-balance"
        >
          الصفحة التي تبحث عنها انتقلت أو لم تعد متاحة — لكن لا تقلق، نحن هنا
          ونستطيع توجيهك إلى المسار الصحيح.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Button href="/" size="lg">
            <Home className="size-4" />
            العودة للرئيسية
            <ArrowLeft className="size-4" />
          </Button>
          <Button
            href={site.contact.whatsapp}
            size="lg"
            variant="outline"
            external
          >
            <MessageCircle className="size-4" />
            تواصل عبر واتساب
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="mt-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-teal/60">
            أو جرّب أحد هذه الأقسام
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-brand-teal/15 bg-white/80 backdrop-blur px-4 py-1.5 text-sm font-medium text-brand-teal transition-all hover:border-brand-mint/50 hover:bg-brand-mintSoft hover:-translate-y-0.5"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
