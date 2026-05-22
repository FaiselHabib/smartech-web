"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Code2,
  LayoutDashboard,
  Smartphone,
  Plane,
  Film,
  Clapperboard,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";

const divisions = [
  {
    href: "/systems",
    eyebrow: "Smartech Systems",
    title: "أنظمة برمجية تبني مشروعك من الفكرة إلى الإطلاق",
    description:
      "مواقع، تطبيقات، أنظمة داخلية، داشبورد، حلول ذكاء اصطناعي وصيانة.",
    bullets: [
      { icon: Code2, label: "تطوير مواقع وتطبيقات" },
      { icon: LayoutDashboard, label: "أنظمة داخلية وداشبورد" },
      { icon: Smartphone, label: "حلول AI ودعم فني" },
    ],
    color: "from-brand-mint/20 via-white to-white",
    accent: "bg-brand-mint",
    cardClass: "lg:translate-y-0",
  },
  {
    href: "/media",
    eyebrow: "Smartech Media",
    title: "إنتاج إعلامي يرفع قيمة مشروعك بصرياً",
    description:
      "درون، فيديوهات شركات، تصوير عقاري، توثيق مشاريع، ريلز، ومونتاج AI.",
    bullets: [
      { icon: Plane, label: "تصوير درون 4K" },
      { icon: Clapperboard, label: "فيديوهات تعريفية" },
      { icon: Film, label: "ريلز ومحتوى سوشيال" },
    ],
    color: "from-brand-teal to-brand-tealMid",
    accent: "bg-brand-mint",
    dark: true,
    cardClass: "lg:translate-y-8",
  },
];

export function DivisionCards() {
  return (
    <Section>
      <div className="container-pad">
        <SectionHeader
          eyebrow="أقسام الشركة"
          title={
            <>
              شركة واحدة <span className="text-gradient">قسمان متكاملان</span>
            </>
          }
          description="نُقدّم خدماتنا تحت مظلّة سمارتك جروب: قسم متخصّص في الأنظمة وآخر للإنتاج الإعلامي، ويعملان معاً لخدمة مشروعك بالكامل."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {divisions.map((d, i) => (
            <motion.div
              key={d.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={d.cardClass}
            >
              <Link
                href={d.href}
                className={`group relative block overflow-hidden rounded-[2rem] p-8 sm:p-10 transition-all hover:-translate-y-1 ${
                  d.dark
                    ? "bg-gradient-to-br from-brand-teal to-brand-tealMid text-white shadow-[0_30px_80px_-20px_rgba(7,59,74,0.6)]"
                    : "bg-gradient-to-br " + d.color + " border border-brand-teal/10 shadow-glass"
                }`}
              >
                {/* Decorative grid */}
                <div className="absolute inset-0 grid-bg opacity-20 mask-fade-b" />
                {/* Accent blob */}
                <div className="absolute -top-16 -left-16 size-60 rounded-full bg-brand-mint/30 blur-3xl" />

                <div className="relative">
                  <div
                    className={`text-xs font-bold tracking-[0.2em] uppercase ${
                      d.dark ? "text-brand-mint" : "text-brand-mint"
                    }`}
                  >
                    {d.eyebrow}
                  </div>
                  <h3
                    className={`mt-3 text-2xl sm:text-3xl font-extrabold leading-tight text-balance ${
                      d.dark ? "text-white" : "text-brand-teal"
                    }`}
                  >
                    {d.title}
                  </h3>
                  <p
                    className={`mt-3 max-w-md text-[15px] leading-7 ${
                      d.dark ? "text-white/75" : "text-muted-foreground"
                    }`}
                  >
                    {d.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {d.bullets.map(({ icon: Icon, label }) => (
                      <li
                        key={label}
                        className={`flex items-center gap-3 text-[14px] ${
                          d.dark ? "text-white/85" : "text-brand-teal"
                        }`}
                      >
                        <span
                          className={`inline-flex size-9 items-center justify-center rounded-xl ${
                            d.dark ? "bg-white/10" : "bg-brand-mintSoft"
                          }`}
                        >
                          <Icon className="size-4" />
                        </span>
                        {label}
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold ${
                      d.dark ? "text-brand-mint" : "text-brand-teal"
                    }`}
                  >
                    اكتشف القسم
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
