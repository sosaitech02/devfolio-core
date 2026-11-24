"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@/components/layout/ThemeProvider";
import type { SceneTelemetry } from "@/components/sections/HeroScene3D";

const HeroScene3D = dynamic(
  () => import("@/components/sections/HeroScene3D"),
  {
    ssr: false,
    loading: () => null,
  }
);

function HeroArchitectureFallback() {
  return (
    <svg
      viewBox="0 0 360 216"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className="h-full w-full select-none"
    >
      {/* Subtle architectural coordinate grid */}
      <g stroke="var(--border)" strokeWidth="0.75" opacity="0.65">
        <line x1="24" y1="54" x2="336" y2="54" strokeDasharray="3 5" />
        <line x1="24" y1="108" x2="336" y2="108" strokeDasharray="3 5" />
        <line x1="24" y1="162" x2="336" y2="162" strokeDasharray="3 5" />
        <line x1="90" y1="18" x2="90" y2="198" strokeDasharray="3 5" />
        <line x1="180" y1="18" x2="180" y2="198" strokeDasharray="3 5" />
        <line x1="270" y1="18" x2="270" y2="198" strokeDasharray="3 5" />
      </g>

      {/* Equatorial structural orbit */}
      <ellipse
        cx="180"
        cy="108"
        rx="116"
        ry="42"
        transform="rotate(-14 180 108)"
        stroke="var(--primary)"
        strokeWidth="1.1"
        strokeOpacity="0.34"
      />

      {/* Outer Cobalt wireframe hull */}
      <g stroke="var(--primary)" strokeWidth="1.25" strokeOpacity="0.62">
        <polygon points="180,26 254,68 254,148 180,190 106,148 106,68" />
        <polygon
          points="180,46 238,88 214,162 146,162 122,88"
          strokeOpacity="0.4"
        />
        <line x1="180" y1="26" x2="180" y2="66" />
        <line x1="254" y1="68" x2="216" y2="90" />
        <line x1="254" y1="148" x2="216" y2="126" />
        <line x1="180" y1="190" x2="180" y2="150" />
        <line x1="106" y1="148" x2="144" y2="126" />
        <line x1="106" y1="68" x2="144" y2="90" />
      </g>

      {/* Electric Cyan internal signal bus */}
      <g
        stroke="var(--accent-foreground)"
        strokeWidth="1.1"
        strokeOpacity="0.52"
      >
        <line x1="180" y1="108" x2="180" y2="26" />
        <line x1="180" y1="108" x2="254" y2="68" />
        <line x1="180" y1="108" x2="254" y2="148" />
        <line x1="180" y1="108" x2="180" y2="190" />
        <line x1="180" y1="108" x2="106" y2="148" />
        <line x1="180" y1="108" x2="106" y2="68" />
        <line x1="106" y1="68" x2="254" y2="148" strokeDasharray="3 4" />
        <line x1="254" y1="68" x2="106" y2="148" strokeDasharray="3 4" />
      </g>

      {/* Central modular architecture core */}
      <polygon
        points="180,76 208,108 180,140 152,108"
        fill="var(--surface-elevated)"
        stroke="var(--accent-foreground)"
        strokeWidth="1.5"
      />
      <polygon
        points="180,88 196,108 180,128 164,108"
        fill="var(--primary)"
        fillOpacity="0.22"
        stroke="var(--primary)"
        strokeWidth="1.1"
      />

      {/* Primary Cobalt nodes */}
      <g fill="var(--primary)">
        <circle cx="254" cy="68" r="4.5" />
        <circle cx="180" cy="190" r="4.5" />
        <circle cx="106" cy="148" r="4.5" />
        <circle cx="214" cy="162" r="3.5" opacity="0.85" />
        <circle cx="122" cy="88" r="3.5" opacity="0.85" />
      </g>

      {/* Electric Cyan accent nodes */}
      <g fill="var(--accent-decorative)">
        <circle cx="180" cy="26" r="5" />
        <circle cx="254" cy="148" r="5" />
        <circle cx="106" cy="68" r="5" />
        <circle cx="180" cy="108" r="4" />
      </g>
    </svg>
  );
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class HeroSceneErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

interface NetworkInformationLike {
  saveData?: boolean;
  effectiveType?: string;
}

interface NavigatorWithCapabilities extends Navigator {
  deviceMemory?: number;
  connection?: NetworkInformationLike;
}

type EligibilityReason =
  | "pending"
  | "eligible"
  | "reduced-motion"
  | "save-data"
  | "mobile-viewport"
  | "low-capability"
  | "no-webgl"
  | "runtime-error";

function probeWebGLSupport(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false });
    if (!gl) return false;
    const maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    const loseExt = gl.getExtension("WEBGL_lose_context");
    loseExt?.loseContext();
    return typeof maxTex === "number" && maxTex >= 2048;
  } catch {
    return false;
  }
}

function evaluateSceneEligibility(reducedMotion: boolean): EligibilityReason {
  if (reducedMotion) return "reduced-motion";
  if (typeof window === "undefined") return "pending";

  const nav = navigator as NavigatorWithCapabilities;
  if (
    nav.connection?.saveData ||
    nav.connection?.effectiveType === "2g" ||
    nav.connection?.effectiveType === "slow-2g"
  ) {
    return "save-data";
  }

  // Avoid forcing a ~245 KB gzipped WebGL bundle onto compact smartphones where
  // vertical touch scrolling, battery, and mobile LCP outweigh a decorative 3D canvas.
  const isCompactPhoneViewport = window.innerWidth < 640;
  const isCoarseCompactTablet =
    window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 768;
  if (isCompactPhoneViewport || isCoarseCompactTablet) {
    return "mobile-viewport";
  }

  const lowCores =
    typeof nav.hardwareConcurrency === "number" &&
    nav.hardwareConcurrency > 0 &&
    nav.hardwareConcurrency <= 2;
  const lowMemory =
    typeof nav.deviceMemory === "number" &&
    nav.deviceMemory > 0 &&
    nav.deviceMemory <= 2;

  if (lowCores || lowMemory) {
    return "low-capability";
  }

  if (!probeWebGLSupport()) {
    return "no-webgl";
  }

  return "eligible";
}

export function HeroSceneClient() {
  const { resolvedTheme } = useTheme();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pointerRef = React.useRef({ x: 0, y: 0 });

  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [isFinePointer, setIsFinePointer] = React.useState(false);
  const [eligibility, setEligibility] =
    React.useState<EligibilityReason>("pending");
  const [idleReady, setIdleReady] = React.useState(false);
  const [sceneReady, setSceneReady] = React.useState(false);
  const [isInView, setIsInView] = React.useState(true);
  const [isTabVisible, setIsTabVisible] = React.useState(true);
  const [telemetry, setTelemetry] = React.useState<SceneTelemetry | null>(null);

  // Detect reduced motion & fine pointer capabilities reactively
  React.useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineMq = window.matchMedia("(hover: hover) and (pointer: fine)");

    const sync = () => {
      const prefersReduced = motionMq.matches;
      setReducedMotion(prefersReduced);
      setIsFinePointer(fineMq.matches);
      setEligibility((prev) =>
        prev === "runtime-error"
          ? prev
          : evaluateSceneEligibility(prefersReduced)
      );
    };

    sync();
    motionMq.addEventListener("change", sync);
    fineMq.addEventListener("change", sync);
    return () => {
      motionMq.removeEventListener("change", sync);
      fineMq.removeEventListener("change", sync);
    };
  }, []);

  // Defer 3D chunk download until browser is idle after initial paint (protects LCP)
  React.useEffect(() => {
    if (eligibility !== "eligible") {
      return;
    }

    let cancelled = false;
    const mount = () => {
      if (!cancelled) setIdleReady(true);
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(mount, { timeout: 650 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = window.setTimeout(mount, 260);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [eligibility]);

  // Pause rendering when scrolled out of viewport
  React.useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Pause rendering when tab is hidden
  React.useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Fine-pointer-only parallax tracking without React re-renders
  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isFinePointer || event.pointerType !== "mouse") return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      pointerRef.current.x = Math.max(-1, Math.min(1, nx));
      pointerRef.current.y = Math.max(-1, Math.min(1, ny));
    },
    [isFinePointer]
  );

  const handlePointerLeave = React.useCallback(() => {
    pointerRef.current.x = 0;
    pointerRef.current.y = 0;
  }, []);

  const handleTelemetry = React.useCallback((stats: SceneTelemetry) => {
    setSceneReady(true);
    setTelemetry((prev) => ({
      triangles: stats.triangles,
      drawCalls: stats.drawCalls,
      geometries: stats.geometries,
      materials: stats.materials,
      initMs: stats.initMs > 0 ? stats.initMs : (prev?.initMs ?? 0),
      framesRendered: stats.framesRendered,
    }));
  }, []);

  const handleSceneError = React.useCallback(() => {
    setEligibility("runtime-error");
    setSceneReady(false);
  }, []);

  const shouldMount3D = eligibility === "eligible" && idleReady;
  const isActive =
    shouldMount3D && isInView && isTabVisible && !reducedMotion;
  const activeMode =
    shouldMount3D && sceneReady && eligibility === "eligible"
      ? "3d"
      : "fallback";

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      data-hero-scene=""
      data-scene-mode={activeMode}
      data-scene-eligibility={eligibility}
      data-scene-active={isActive ? "true" : "false"}
      data-scene-triangles={telemetry?.triangles ?? 0}
      data-scene-draw-calls={telemetry?.drawCalls ?? 0}
      data-scene-geometries={telemetry?.geometries ?? 0}
      data-scene-materials={telemetry?.materials ?? 0}
      data-scene-init-ms={telemetry?.initMs ?? 0}
      data-scene-frames={telemetry?.framesRendered ?? 0}
      onPointerMove={isFinePointer ? handlePointerMove : undefined}
      onPointerLeave={isFinePointer ? handlePointerLeave : undefined}
      className="relative h-[180px] w-full overflow-hidden rounded-lg border border-border bg-surface-elevated/55 sm:h-[208px]"
      style={{ touchAction: "pan-y" }}
    >
      {/* Static architectural SVG/CSS fallback — immediate SSR render, CLS = 0 */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-[var(--ease-out)]"
        style={{ opacity: activeMode === "3d" ? 0 : 1 }}
      >
        <HeroArchitectureFallback />
      </div>

      {/* Deferred WebGL 3D architectural scene (desktop/capable devices only) */}
      {shouldMount3D ? (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-[var(--ease-out)]"
          style={{ opacity: sceneReady ? 1 : 0 }}
        >
          <HeroSceneErrorBoundary onError={handleSceneError}>
            <HeroScene3D
              theme={resolvedTheme}
              isActive={isActive}
              isFinePointer={isFinePointer}
              pointerRef={pointerRef}
              onTelemetry={handleTelemetry}
              onContextLost={handleSceneError}
            />
          </HeroSceneErrorBoundary>
        </div>
      ) : null}
    </div>
  );
}
