"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  projects as staticProjects,
  projectFilters,
  type Project,
  type ProjectCategory,
} from "@/content/projects";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

type Filter = ProjectCategory | "all";

export function PortfolioGrid({ projects }: { projects?: Project[] } = {}) {
  const [active, setActive] = React.useState<Filter>("all");
  const list = projects ?? staticProjects;

  const filtered =
    active === "all" ? list : list.filter((p) => p.categories.includes(active));

  return (
    <div>
      {/* Filters */}
      <div className="mb-10 flex flex-wrap items-center gap-2 rounded-full border border-brand-teal/10 bg-white/70 backdrop-blur p-1.5 shadow-soft sm:w-fit">
        {projectFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value as Filter)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              active === f.value
                ? "bg-brand-gradient text-white shadow-brand"
                : "text-brand-teal hover:bg-brand-mintSoft",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.a
              key={p.slug}
              href={`#${p.slug}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group relative overflow-hidden rounded-3xl border border-brand-teal/10 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-mint/40 hover:shadow-glass"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-brand-mint/30 via-brand-mintSoft to-brand-teal/10">
                <div className="absolute inset-0 grid-bg opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute -inset-10 -z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,210,192,0.35),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-extrabold text-brand-teal/80 transition-transform duration-500 group-hover:scale-105">
                    {p.title}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute top-3 right-3 flex flex-wrap gap-1">
                  {p.categories.slice(0, 2).map((c) => (
                    <span
                      key={c}
                      className="rounded-full bg-white/90 backdrop-blur px-2 py-0.5 text-[10px] font-semibold text-brand-teal"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs text-muted-foreground">{p.year}</div>
                <h3 className="mt-1 text-lg font-bold text-brand-teal transition-colors group-hover:text-brand-tealDeep">
                  {p.title}
                </h3>
                <p className="mt-1 text-[13px] leading-6 text-muted-foreground line-clamp-2">
                  {p.tagline}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-teal transition-colors group-hover:text-brand-mint">
                  دراسة الحالة
                  <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
