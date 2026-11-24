"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProjectCardMotionProps {
  children: React.ReactNode;
  className?: string;
}

const MAX_TILT_DEG = 4;

export function ProjectCardMotion({
  children,
  className,
}: ProjectCardMotionProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const spotlightRef = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number | null>(null);
  const [canTilt, setCanTilt] = React.useState(false);

  React.useEffect(() => {
    const fineMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setCanTilt(fineMq.matches && !reduceMq.matches);
    };
    update();
    fineMq.addEventListener("change", update);
    reduceMq.addEventListener("change", update);
    return () => {
      fineMq.removeEventListener("change", update);
      reduceMq.removeEventListener("change", update);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const resetSurface = React.useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const card = wrapperRef.current;
    const spot = spotlightRef.current;
    if (card) {
      card.style.transform = "";
    }
    if (spot) {
      spot.style.opacity = "0";
    }
  }, []);

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!canTilt || event.pointerType !== "mouse") return;
      const card = wrapperRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 2 * MAX_TILT_DEG;
      const rotateX = (0.5 - py) * 2 * MAX_TILT_DEG;
      const spotX = Math.round(px * 100);
      const spotY = Math.round(py * 100);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      // Mutate direct element styles without React state or inherited CSS vars
      rafRef.current = requestAnimationFrame(() => {
        if (wrapperRef.current) {
          wrapperRef.current.style.transform = `perspective(920px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
        }
        if (spotlightRef.current) {
          spotlightRef.current.style.opacity = "1";
          spotlightRef.current.style.background = `radial-gradient(360px circle at ${spotX}% ${spotY}%, color-mix(in oklab, var(--accent-decorative) 12%, transparent), transparent 65%)`;
        }
      });
    },
    [canTilt]
  );

  // Reset transform before Link click triggers ViewTransition snapshot
  const handlePointerDown = React.useCallback(() => {
    if (canTilt) {
      resetSurface();
    }
  }, [canTilt, resetSurface]);

  return (
    <div
      ref={wrapperRef}
      onPointerMove={canTilt ? handlePointerMove : undefined}
      onPointerLeave={canTilt ? resetSurface : undefined}
      onPointerDown={canTilt ? handlePointerDown : undefined}
      className={cn(
        "relative h-full rounded-xl transition-transform duration-200 ease-[var(--ease-out)]",
        className
      )}
    >
      {children}
      {canTilt ? (
        <div
          ref={spotlightRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 ease-[var(--ease-out)]"
        />
      ) : null}
    </div>
  );
}
