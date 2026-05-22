"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedBrandMark } from "@/components/brand/AnimatedBrandMark";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[120px] pb-16 sm:pt-[150px] sm:pb-24 lg:pb-28">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-hero-radial" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-50 mask-fade-b" />
      <div className="absolute -top-32 right-0 -z-10 size-[520px] rounded-full bg-brand-mint/25 blur-[120px]" />
      <div className="absolute top-40 -left-20 -z-10 size-[380px] rounded-full bg-brand-teal/10 blur-[100px]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-l from-transparent via-brand-mint/40 to-transparent" />

      <div className="container-pad relative">
        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7 text-center lg:text-start">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-mint/30 bg-white/70 backdrop-blur px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold text-brand-teal"
            >
              <Sparkles className="size-3.5 text-brand-mint" />
              شركة سعودية · أنظمة + ميديا تحت سقف واحد
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-[44px] sm:text-[60px] lg:text-[76px] leading-[1.02] font-extrabold tracking-tight text-brand-teal text-balance"
            >
              سمارتك جروب
              <br />
              <span className="text-gradient">نبني الأنظمة</span>{" "}
              <span className="text-brand-teal/80 font-bold">و</span>{" "}
              <span className="text-gradient">نصنع المحتوى</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl mx-auto lg:mx-0 text-[15px] sm:text-lg leading-8 text-muted-foreground text-balance"
            >
              شركة سعودية تجمع بين الحلول البرمجية والإنتاج الإعلامي لمساعدة
              المشاريع على النمو رقمياً وظهورياً — من الفكرة إلى الإطلاق.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <Button href="/contact" size="lg">
                ابدأ مشروعك
                <ArrowLeft className="size-4" />
              </Button>
              <Button href="/portfolio" size="lg" variant="outline">
                <Play className="size-4" />
                شاهد أعمالنا
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.56, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 grid max-w-md mx-auto lg:mx-0 grid-cols-3 gap-6 text-center lg:text-start"
            >
              {[
                { value: "+3", label: "سنوات خبرة" },
                { value: "+20", label: "مشروع منجز" },
                { value: "2", label: "أقسام متخصّصة" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl sm:text-3xl font-extrabold text-gradient">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs sm:text-[13px] text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual — animated official brand mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <AnimatedBrandMark />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
