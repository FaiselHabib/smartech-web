"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Premium animated Smartech brand centerpiece for the hero section.
 *
 * Uses the OFFICIAL mint icon from /public/brand/icon-mint.png — no generated SVG.
 * Built from CSS + Framer Motion (lightweight, GPU-accelerated):
 *  - Rotating conic-gradient halo
 *  - Two counter-rotating dashed orbit rings
 *  - Soft floating motion on the icon
 *  - Pulsing radial glow
 *  - Glassmorphism plate
 */
export function AnimatedBrandMark({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[460px]", className)}>
      {/* Outer ambient glow */}
      <div className="absolute inset-0 -z-10 rounded-full bg-brand-mint/25 blur-[80px] animate-pulse [animation-duration:4s]" />

      {/* Conic rotating halo (large) */}
      <motion.div
        aria-hidden
        className="absolute inset-2 rounded-full opacity-60 [mask-image:radial-gradient(closest-side,transparent_55%,black_60%,black_70%,transparent_75%)]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, #39D2C0 90deg, transparent 180deg, #7FE3D6 270deg, transparent 360deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      />

      {/* Orbit ring 1 (dashed, slow CW) */}
      <motion.div
        aria-hidden
        className="absolute inset-6 rounded-full border-2 border-dashed border-brand-mint/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 36, ease: "linear", repeat: Infinity }}
      >
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full bg-brand-mint shadow-[0_0_20px_rgba(57,210,192,0.9)]" />
      </motion.div>

      {/* Orbit ring 2 (thinner, CCW) */}
      <motion.div
        aria-hidden
        className="absolute inset-12 rounded-full border border-brand-teal/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        <span className="absolute top-1/2 -right-1 -translate-y-1/2 size-2 rounded-full bg-brand-teal shadow-[0_0_14px_rgba(7,59,74,0.7)]" />
        <span className="absolute bottom-2 left-3 size-1.5 rounded-full bg-brand-mint/80" />
      </motion.div>

      {/* Inner mint halo behind icon — no plate, fully transparent */}
      <div className="absolute inset-[22%] rounded-full bg-brand-mint/25 blur-3xl" />
      <div className="absolute inset-[28%] rounded-full bg-brand-mint/20 blur-2xl" />

      {/* Center icon — floating.
          Outer wrapper fills the ENTIRE orbit container (inset-0) so its flex
          centerpoint is the exact geometric center of the orbit on every device.
          Inner wrapper has an EXPLICIT width (as % of the orbit container) plus
          aspect-square — eliminating the indefinite-parent percentage bug that
          caused the icon to drift on mobile WebKit/Blink. */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      >
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
          className="relative aspect-square w-[44%] sm:w-[56%] flex items-center justify-center"
        >
          {/* Image-level glow halo — now anchored to a definite-size parent */}
          <div className="absolute inset-0 -m-6 rounded-full bg-brand-mint/45 blur-2xl" />
          <Image
            src="/brand/icon-mint.png"
            alt="Smartech"
            width={420}
            height={420}
            priority
            sizes="(max-width: 768px) 220px, 360px"
            className="relative block h-full w-full select-none drop-shadow-[0_18px_30px_rgba(57,210,192,0.45)]"
          />
        </motion.div>
      </motion.div>

      {/* Floating chips */}
      <FloatingChip
        delay={0}
        className="-top-2 right-2 sm:right-4"
        label="Smartech Systems"
        sub="أنظمة + برمجة"
        dot="bg-brand-mint"
      />
      <FloatingChip
        delay={0.5}
        className="bottom-1 left-1 sm:left-4"
        label="Smartech Media"
        sub="إنتاج إعلامي"
        dot="bg-brand-mint"
        dark
      />
      <FloatingChip
        delay={1}
        className="top-1/2 -right-2 sm:-right-6 -translate-y-1/2"
        label="AI"
        sub="حلول ذكية"
        dot="bg-fuchsia-500"
      />
    </div>
  );
}

function FloatingChip({
  className,
  label,
  sub,
  dot,
  dark,
  delay = 0,
}: {
  className?: string;
  label: string;
  sub: string;
  dot: string;
  dark?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.6, delay: 0.4 + delay },
        y: { duration: 4, ease: "easeInOut", repeat: Infinity, delay },
      }}
      className={cn(
        "absolute z-10 flex items-center gap-3 rounded-2xl border shadow-glass px-3.5 py-2.5 backdrop-blur-xl",
        dark ? "bg-brand-teal/90 text-white border-white/10" : "bg-white/90 border-brand-teal/10",
        className,
      )}
    >
      <span className={cn("size-2 rounded-full", dot)} />
      <div className="text-start">
        <div className="text-[12px] sm:text-[13px] font-bold">{label}</div>
        <div className={cn("text-[10px] sm:text-[11px]", dark ? "text-white/70" : "text-muted-foreground")}>
          {sub}
        </div>
      </div>
    </motion.div>
  );
}
