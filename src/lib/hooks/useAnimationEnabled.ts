"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Returns `true` only on desktop-width devices whose user has NOT requested
 * reduced motion.
 *
 * Why: heavy continuous Framer Motion loops (rotating conic gradients, orbit
 * rings, floating chips) are the dominant cause of jank/long-tasks on phones.
 * Gating them purely on `prefers-reduced-motion` doesn't help, because the vast
 * majority of mobile users never enable that setting. Instead we gate on actual
 * viewport width so those animations simply never start on mobile.
 *
 * SSR and the very first client render return `false`, so the markup is
 * delivered in its lightweight/static form. On desktop the hook flips to `true`
 * after mount and the animations begin. Because the static and animated trees
 * share identical DOM/layout, there is no layout shift — only animation props
 * differ.
 */
export function useAnimationEnabled(minWidth = 768): boolean {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      setEnabled(false);
      return;
    }
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [prefersReduced, minWidth]);

  return enabled;
}
