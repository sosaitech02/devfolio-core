"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface MotionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export function MotionReveal({
  children,
  className,
  delay = 0,
}: MotionRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.12 });
  const [shouldAnimateOnEnter, setShouldAnimateOnEnter] = React.useState(false);

  // Never hide SSR content or elements already inside the initial viewport.
  // Only progressively animate elements that start below the fold on mount.
  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.96) {
      setShouldAnimateOnEnter(true);
    }
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || !shouldAnimateOnEnter) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{
        duration: 0.28,
        delay: Math.min(delay, 0.18),
        ease: EASE_OUT,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
