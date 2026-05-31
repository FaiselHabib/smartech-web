"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAnimationEnabled } from "@/lib/hooks/useAnimationEnabled";

/**
 * Premium animated Smartech brand centerpiece for the hero section.
 *
 * Uses the OFFICIAL mint icon from /public/brand/icon-mint.png — no generated SVG.
 *
 * MOBILE PERFORMANCE: continuous animations and the most expensive paint
 * effects (rotating conic gradient, large/animated blurs, backdrop-filter on
 * chips, the pulsing 80px ambient glow) are the main source of jank on phones.
 * We therefore:
 *   - gate every infinite Framer Motion loop behind `useAnimationEnabled()`
 *     (desktop + no reduced-motion) — on mobile the mark is fully STATIC,
 *   - drop the conic gradient entirely on mobile (`hidden sm:block`),
 *   - shrink blur radii on mobile,
 *   - drop backdrop-filter on the chips on mobile.
 * Desktop keeps the full premium look; the DOM/layout is identical, so there is
 * no layout shift.
 */
export function AnimatedBrandMark({ className }: { className?: string }) {
  const animate = useAnimationEnabled();
  const loop = (target: TargetAndTransition, duration: number) =>
    animate
      ? { animate: target, transition: { duration, ease: "linear" as const, repeat: Infinity } }
      : {};
  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[460px]", className)}>
      {/* Outer ambient glow — smaller blur on mobile, pulse only on desktop */}
      <div
        className={cn(
          "absolute inset-0 -z-10 rounded-full bg-brand-mint/25 blur-2xl sm:blur-[80px] [animation-duration:4s]",
          animate && "animate-pulse",
        )}
      />

      {/* Conic rotating halo (large) — desktop only; pure decoration, removed on mobile */}
      <motion.div
        aria-hidden
        className="hidden sm:block absolute inset-2 rounded-full opacity-60 [mask-image:radial-gradient(closest-side,transparent_55%,black_60%,black_70%,transparent_75%)]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, #39D2C0 90deg, transparent 180deg, #7FE3D6 270deg, transparent 360deg)",
        }}
        {...loop({ rotate: 360 }, 18)}
      />

      {/* Orbit ring 1 (dashed) — static on mobile, rotates on desktop */}
      <motion.div
        aria-hidden
        className="absolute inset-6 rounded-full border-2 border-dashed border-brand-mint/40"
        {...loop({ rotate: 360 }, 36)}
      >
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 size-3 rounded-full bg-brand-mint shadow-[0_0_20px_rgba(57,210,192,0.9)]" />
      </motion.div>

      {/* Orbit ring 2 (thinner) — static on mobile, rotates on desktop */}
      <motion.div
        aria-hidden
        className="absolute inset-12 rounded-full border border-brand-teal/15"
        {...loop({ rotate: -360 }, 28)}
      >
        <span className="absolute top-1/2 -right-1 -translate-y-1/2 size-2 rounded-full bg-brand-teal shadow-[0_0_14px_rgba(7,59,74,0.7)]" />
        <span className="absolute bottom-2 left-3 size-1.5 rounded-full bg-brand-mint/80" />
      </motion.div>

      {/* Inner mint halo behind icon — smaller blur on mobile */}
      <div className="absolute inset-[22%] rounded-full bg-brand-mint/25 blur-xl sm:blur-3xl" />
      <div className="absolute inset-[28%] rounded-full bg-brand-mint/20 blur-lg sm:blur-2xl" />

      {/* Center icon. Outer wrapper fills the orbit (inset-0) and flex-centers,
          guaranteeing the icon is centered on every device. Float/scale only on
          desktop. */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        animate={animate ? { y: [0, -10, 0] } : undefined}
        transition={animate ? { duration: 5, ease: "easeInOut", repeat: Infinity } : undefined}
      >
        <motion.div
          animate={animate ? { scale: [1, 1.03, 1] } : undefined}
          transition={animate ? { duration: 3.2, ease: "easeInOut", repeat: Infinity } : undefined}
          className="relative aspect-square w-[44%] sm:w-[56%] flex items-center justify-center"
        >
          {/* Image-level glow halo — smaller blur on mobile */}
          <div className="absolute inset-0 -m-6 rounded-full bg-brand-mint/45 blur-lg sm:blur-2xl" />
          <Image
            src="/brand/icon-mint.png"
            alt="Smartech"
            width={420}
            height={420}
            priority
            sizes="(max-width: 768px) 220px, 360px"
            className="relative block h-full w-full select-none drop-shadow-[0_8px_16px_rgba(57,210,192,0.35)] sm:drop-shadow-[0_18px_30px_rgba(57,210,192,0.45)]"
          />
        </motion.div>
      </motion.div>

      {/* Floating chips */}
      <FloatingChip
        animate={animate}
        delay={0}
        className="-top-2 right-2 sm:right-4"
        label="Smartech Systems"
        sub="أنظمة + برمجة"
        dot="bg-brand-mint"
      />
      <FloatingChip
        animate={animate}
        delay={0.5}
        className="bottom-1 left-1 sm:left-4"
        label="Smartech Media"
        sub="إنتاج إعلامي"
        dot="bg-brand-mint"
        dark
      />
      <FloatingChip
        animate={animate}
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
  animate,
}: {
  className?: string;
  label: string;
  sub: string;
  dot: string;
  dark?: boolean;
  delay?: number;
  animate?: boolean;
}) {
  return (
    <motion.div
      animate={animate ? { y: [0, -6, 0] } : undefined}
      transition={
        animate
          ? { y: { duration: 4, ease: "easeInOut", repeat: Infinity, delay } }
          : undefined
      }
      className={cn(
        // backdrop-blur only on desktop (sm+) — backdrop-filter is a top cause of
        // mobile paint/scroll jank. Chips use a near-solid background on mobile.
        "absolute z-10 flex items-center gap-3 rounded-2xl border shadow-glass px-3.5 py-2.5 sm:backdrop-blur-xl",
        dark ? "bg-brand-teal text-white border-white/10 sm:bg-brand-teal/90" : "bg-white border-brand-teal/10 sm:bg-white/90",
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
