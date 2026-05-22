"use client";

import { motion } from "framer-motion";
import type { Project } from "@/content/projects";
import { CheckCircle2, Lightbulb, Wrench } from "lucide-react";

export function ProjectCaseCard({ project, dark = false }: { project: Project; dark?: boolean }) {
  return (
    <motion.article
      id={project.slug}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-[2rem] ${
        dark
          ? "bg-white/5 border border-white/10 text-white"
          : "bg-white border border-brand-teal/10 shadow-soft"
      }`}
    >
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto bg-gradient-to-br from-brand-mint/30 via-brand-mintSoft to-brand-teal/10">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-extrabold text-brand-teal/80">
              {project.title}
            </span>
          </div>
          <div className="absolute top-4 right-4 flex flex-wrap gap-1.5">
            {project.categories.map((c) => (
              <span
                key={c}
                className="rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-brand-teal"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="lg:col-span-7 p-8 sm:p-10">
          <div className="text-xs font-bold tracking-widest uppercase text-brand-mint">
            {project.year} · Case Study
          </div>
          <h3 className={`mt-2 text-2xl sm:text-3xl font-extrabold ${dark ? "text-white" : "text-brand-teal"}`}>
            {project.title}
          </h3>
          <p className={`mt-2 ${dark ? "text-white/75" : "text-muted-foreground"}`}>{project.tagline}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Block
              icon={Lightbulb}
              label="المشكلة"
              text={project.problem}
              dark={dark}
            />
            <Block
              icon={Wrench}
              label="الحل"
              text={project.solution}
              dark={dark}
            />
            <Block
              icon={CheckCircle2}
              label="الأثر"
              text={project.impact}
              dark={dark}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className={`rounded-full px-3 py-1 text-[12px] font-medium ${
                  dark ? "bg-white/10 text-white" : "bg-brand-mintSoft text-brand-teal"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Block({
  icon: Icon,
  label,
  text,
  dark,
}: {
  icon: React.ElementType;
  label: string;
  text: string;
  dark: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 ${
        dark ? "bg-white/5 border border-white/10" : "bg-brand-mintSoft/60 border border-brand-mint/20"
      }`}
    >
      <div className="flex items-center gap-2">
        <Icon className={`size-4 ${dark ? "text-brand-mint" : "text-brand-teal"}`} />
        <div className={`text-xs font-bold ${dark ? "text-white" : "text-brand-teal"}`}>
          {label}
        </div>
      </div>
      <p className={`mt-1.5 text-[13px] leading-6 ${dark ? "text-white/75" : "text-muted-foreground"}`}>
        {text}
      </p>
    </div>
  );
}
