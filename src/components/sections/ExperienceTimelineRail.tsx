"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

interface ExperienceTimelineRailProps {
  children: React.ReactNode;
}

export function ExperienceTimelineRail({
  children,
}: ExperienceTimelineRailProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 68%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.002,
  });

  return (
    <div ref={containerRef} className="relative sm:pl-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-1.5 top-3 hidden w-0.5 rounded-full bg-border sm:block"
      >
        {prefersReducedMotion ? (
          <div className="h-full w-full rounded-full bg-gradient-to-b from-primary to-accent-decorative opacity-60" />
        ) : (
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="h-full w-full rounded-full bg-gradient-to-b from-primary via-primary to-accent-decorative"
          />
        )}
      </div>
      {children}
    </div>
  );
}
