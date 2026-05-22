"use client";

import { motion } from "framer-motion";
import { Award, MapPin, Sparkles, Users2 } from "lucide-react";

const stats = [
  { icon: Award, value: "+3", label: "سنوات خبرة", sub: "في السوق السعودي" },
  { icon: Sparkles, value: "+20", label: "مشروع منجز", sub: "أنظمة وميديا" },
  { icon: MapPin, value: "100%", label: "سعودي", sub: "من جدة إلى المملكة" },
  { icon: Users2, value: "Systems + Media", label: "فريق متكامل", sub: "تحت سقف واحد" },
];

export function TrustStats() {
  return (
    <section className="relative">
      <div className="container-pad">
        <div className="relative overflow-hidden rounded-[2rem] border border-brand-teal/10 bg-white shadow-glass">
          <div className="absolute inset-0 stripe-mint opacity-50" />
          <div className="absolute -top-20 -right-20 size-80 rounded-full bg-brand-mint/20 blur-3xl" />
          <div className="relative grid gap-px sm:grid-cols-2 lg:grid-cols-4 bg-brand-teal/10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-white p-7 sm:p-8"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand-mintSoft text-brand-teal">
                  <s.icon className="size-5" />
                </span>
                <div className="mt-4 text-2xl sm:text-[28px] font-extrabold text-brand-teal">
                  {s.value}
                </div>
                <div className="mt-1 text-sm font-semibold text-brand-teal">
                  {s.label}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
