"use client";

import { motion } from "framer-motion";
import type { Service } from "@/content/services";
import { Check } from "lucide-react";
import { ServiceIcon } from "@/components/brand/ServiceIcon";

export function ServiceGrid({
  services,
  variant = "light",
}: {
  services: Service[];
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <motion.div
          key={s.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          className={`relative overflow-hidden rounded-3xl p-7 transition-all hover:-translate-y-1 ${
            dark
              ? "border border-white/10 bg-white/5 hover:bg-white/[0.07] hover:border-brand-mint/40"
              : "border border-brand-teal/10 bg-white/80 backdrop-blur hover:border-brand-mint/40 hover:shadow-glass"
          }`}
        >
          <span
            className={`inline-flex size-12 items-center justify-center rounded-2xl ${
              dark
                ? "bg-brand-mint text-brand-teal"
                : "bg-brand-gradient text-white shadow-brand"
            }`}
          >
            <ServiceIcon name={s.icon} className="size-5" />
          </span>
          <h3
            className={`mt-5 text-lg font-bold ${
              dark ? "text-white" : "text-brand-teal"
            }`}
          >
            {s.title}
          </h3>
          <p
            className={`mt-2 text-sm leading-7 ${
              dark ? "text-white/70" : "text-muted-foreground"
            }`}
          >
            {s.description}
          </p>
          <ul className="mt-4 space-y-2">
            {s.highlights.map((h) => (
              <li
                key={h}
                className={`flex items-center gap-2 text-[13px] ${
                  dark ? "text-white/80" : "text-brand-teal"
                }`}
              >
                <Check
                  className={`size-3.5 ${
                    dark ? "text-brand-mint" : "text-brand-mint"
                  }`}
                />
                {h}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
