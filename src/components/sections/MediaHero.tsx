"use client";

import { motion } from "framer-motion";
import {
  Plane,
  Camera,
  Sparkles,
  Film,
  Play,
  Circle,
  Aperture,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const capabilities = [
  { icon: Plane, label: "أسطول درون احترافي 4K" },
  { icon: Camera, label: "كاميرات سينمائية + عدسات احترافية" },
  { icon: Sparkles, label: "مونتاج بمساعدة الذكاء الاصطناعي" },
  { icon: Film, label: "استوديو خاص ومواقع تصوير في جدة" },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

export function MediaHero() {
  return (
    <section className="relative overflow-hidden bg-brand-tealDeep text-white pt-[140px] pb-20">
      {/* Cinematic backdrop */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(57,210,192,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(57,210,192,0.10),transparent_60%)]" />
      {/* Scanline overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.7) 0, rgba(255,255,255,0.7) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* Soft grain via noise pattern */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.12] mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.4) 0.5px, transparent 0.5px)",
          backgroundSize: "3px 3px",
        }}
      />
      <div className="absolute -top-20 right-0 -z-10 size-[520px] rounded-full bg-brand-mint/15 blur-[120px]" />
      <div className="absolute -bottom-32 -left-32 -z-10 size-[460px] rounded-full bg-brand-mint/10 blur-[120px]" />

      <div className="container-pad relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-3.5 py-1.5 text-xs font-semibold text-brand-mint"
            >
              <Circle className="size-2 fill-red-500 text-red-500" />
              REC · Smartech Media
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.9, ease: easeOut }}
              className="mt-6 text-4xl sm:text-5xl lg:text-[68px] font-extrabold leading-[1.05] tracking-tight text-balance"
            >
              إنتاج إعلامي{" "}
              <span className="text-brand-mint">سينمائي</span> يرفع قيمة
              مشروعك بصرياً
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.8, ease: easeOut }}
              className="mt-6 max-w-xl text-base sm:text-lg leading-8 text-white/75 text-balance"
            >
              نُنتج محتوى مرئي بأسلوب موحّد لعلامتك التجارية — درون، فيديوهات
              تعريفية، تصوير عقاري، توثيق مشاريع، ومحتوى سوشيال.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.8, ease: easeOut }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button href="/contact" size="lg">
                <Play className="size-4 fill-current" />
                ابدأ إنتاجك معنا
              </Button>
              <Button href="/portfolio" size="lg" variant="outline" className="bg-white/5 text-white border-white/15 hover:bg-white/10 hover:border-brand-mint/40">
                شاهد أعمالنا
              </Button>
            </motion.div>
          </div>

          {/* Visual: cinematic frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.1, ease: easeOut }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] mx-auto max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl">
              {/* Viewport letterbox */}
              <div className="absolute inset-x-0 top-0 h-8 bg-black/40 z-10" />
              <div className="absolute inset-x-0 bottom-0 h-8 bg-black/40 z-10" />

              {/* Top status bar */}
              <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-white/80">
                <span className="inline-flex items-center gap-1.5">
                  <motion.span
                    className="size-1.5 rounded-full bg-red-500"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  />
                  REC 4K · 23.976
                </span>
                <span>F2.8 · ISO 400</span>
              </div>

              {/* Bottom hud */}
              <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-white/80">
                <span>CAM_01</span>
                <span>00:12:34</span>
              </div>

              {/* Composition */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/35 via-brand-teal/30 to-brand-tealDeep" />
              <div className="absolute inset-0 grid-bg opacity-30" />
              {/* Rule-of-thirds guides */}
              <div className="absolute inset-x-0 top-1/3 h-px bg-white/10" />
              <div className="absolute inset-x-0 top-2/3 h-px bg-white/10" />
              <div className="absolute inset-y-0 left-1/3 w-px bg-white/10" />
              <div className="absolute inset-y-0 left-2/3 w-px bg-white/10" />

              {/* Center aperture animation */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 24, ease: "linear", repeat: Infinity }}
              >
                <Aperture
                  className="size-32 text-white/15"
                  strokeWidth={1}
                />
              </motion.div>

              {/* Floating camera badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
                className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-black/30 backdrop-blur px-3 py-2"
              >
                <Camera className="size-4 text-brand-mint" />
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/90">
                  Cinema
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
                className="absolute right-4 bottom-12 inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-black/30 backdrop-blur px-3 py-2"
              >
                <Plane className="size-4 text-brand-mint" />
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/90">
                  Drone 4K
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Capabilities strip — animated */}
        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: easeOut }}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all hover:border-brand-mint/40 hover:bg-white/[0.07] hover:-translate-y-0.5"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-mint text-brand-teal transition-transform group-hover:scale-110">
                <c.icon className="size-5" />
              </span>
              <span className="text-sm font-medium text-white/90">{c.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
