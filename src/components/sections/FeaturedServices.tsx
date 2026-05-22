"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/Section";
import { systemsServices, mediaServices } from "@/content/services";
import { ServiceIcon } from "@/components/brand/ServiceIcon";

export function FeaturedServices() {
  const featured = [
    ...systemsServices.slice(0, 3),
    ...mediaServices.slice(0, 3),
  ];

  return (
    <Section>
      <div className="container-pad">
        <SectionHeader
          eyebrow="خدماتنا"
          title={
            <>
              خدمات تُغطّي كل ما يحتاجه{" "}
              <span className="text-gradient">مشروعك</span>
            </>
          }
          description="من الكود إلى الكاميرا — فريق متخصّص لكل خدمة، وعقلية واحدة تجمعنا: الجودة."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <Link
                href={s.division === "systems" ? "/systems" : "/media"}
                className="group relative block h-full overflow-hidden rounded-3xl border border-brand-teal/10 bg-white/80 backdrop-blur p-6 transition-all hover:-translate-y-1 hover:border-brand-mint/40 hover:shadow-glass"
              >
                <div className="absolute -top-20 -left-20 size-48 rounded-full bg-brand-mint/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-mintSoft text-brand-teal">
                    <ServiceIcon name={s.icon} className="size-5" />
                  </span>
                  <span
                    className={`text-[10px] font-bold tracking-widest uppercase ${
                      s.division === "systems"
                        ? "text-brand-mint"
                        : "text-brand-teal"
                    }`}
                  >
                    {s.division === "systems" ? "Systems" : "Media"}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-brand-teal">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {s.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal">
                  المزيد
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-brand-teal/15 bg-white px-5 py-2.5 text-sm font-semibold text-brand-teal hover:border-brand-mint/50 transition"
          >
            عرض كل الخدمات
            <ArrowLeft className="size-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
