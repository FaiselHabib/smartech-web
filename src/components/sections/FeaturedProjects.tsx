"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import {
  projects as staticProjects,
  type Project,
} from "@/content/projects";

export function FeaturedProjects({ projects }: { projects?: Project[] } = {}) {
  const featured = (projects ?? staticProjects).slice(0, 4);

  return (
    <Section className="bg-brand-mintSoft/50">
      <div className="absolute inset-0 -z-10 grid-bg opacity-50 mask-fade-b" />
      <div className="container-pad">
        <SectionHeader
          eyebrow="أعمالنا"
          title={
            <>
              مشاريع حقيقية، نتائج <span className="text-gradient">قابلة للقياس</span>
            </>
          }
          description="عيّنة من أعمال سمارتك جروب في قطاعات مختلفة — برمجة، تطبيقات، أنظمة، وإنتاج إعلامي."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {featured.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link
                href={`/portfolio#${p.slug}`}
                className="group relative block overflow-hidden rounded-[2rem] border border-brand-teal/10 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-glass"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-mint/30 via-brand-mintSoft to-brand-teal/10">
                  {/* Placeholder visual until real cover added */}
                  <div className="absolute inset-0 grid-bg opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-extrabold text-brand-teal/80">
                      {p.title}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-1.5">
                    {p.categories.slice(0, 2).map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-white/85 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-brand-teal"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-teal">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.tagline}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-brand-mintSoft px-2.5 py-1 text-[11px] font-medium text-brand-teal"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal group-hover:text-brand-mint">
                      التفاصيل
                      <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-white hover:bg-brand-tealMid transition"
          >
            عرض كل الأعمال
            <ArrowLeft className="size-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
