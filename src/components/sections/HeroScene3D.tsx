"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { ResolvedTheme } from "@/components/layout/ThemeProvider";

export interface SceneTelemetry {
  triangles: number;
  drawCalls: number;
  geometries: number;
  materials: number;
  initMs: number;
  framesRendered: number;
}

interface HeroScene3DProps {
  theme: ResolvedTheme;
  isActive: boolean;
  isFinePointer: boolean;
  pointerRef: React.RefObject<{ x: number; y: number }>;
  onTelemetry?: (stats: SceneTelemetry) => void;
  onContextLost?: () => void;
}

const PHI = (1 + Math.sqrt(5)) / 2;
const RAW_VERTICES: ReadonlyArray<[number, number, number]> = [
  [-1, PHI, 0],
  [1, PHI, 0],
  [-1, -PHI, 0],
  [1, -PHI, 0],
  [0, -1, PHI],
  [0, 1, PHI],
  [0, -1, -PHI],
  [0, 1, -PHI],
  [PHI, 0, -1],
  [PHI, 0, 1],
  [-PHI, 0, -1],
  [-PHI, 0, 1],
];

const NODE_RADIUS = 1.46;
const NODE_POSITIONS: ReadonlyArray<[number, number, number]> =
  RAW_VERTICES.map(([x, y, z]) => {
    const len = Math.hypot(x, y, z);
    return [
      (x / len) * NODE_RADIUS,
      (y / len) * NODE_RADIUS,
      (z / len) * NODE_RADIUS,
    ];
  });

const CYAN_NODE_INDICES = new Set([0, 3, 5, 9, 10]);

const BUS_PAIRS: ReadonlyArray<[number, number]> = [
  [0, 5],
  [1, 9],
  [5, 9],
  [9, 3],
  [3, 4],
  [4, 11],
  [11, 0],
  [10, 7],
  [7, 8],
  [8, 6],
  [6, 2],
  [2, 10],
];

// Reusable math objects outside render loop — zero per-frame allocations
const TEMP_OBJ = new THREE.Object3D();
const TEMP_COLOR = new THREE.Color();

interface ArchitecturalRigProps {
  theme: ResolvedTheme;
  isActive: boolean;
  isFinePointer: boolean;
  pointerRef: React.RefObject<{ x: number; y: number }>;
  mountStartRef: React.RefObject<number>;
  onTelemetry?: (stats: SceneTelemetry) => void;
}

function ArchitecturalRig({
  theme,
  isActive,
  isFinePointer,
  pointerRef,
  mountStartRef,
  onTelemetry,
}: ArchitecturalRigProps) {
  const rootGroupRef = React.useRef<THREE.Group>(null);
  const innerCoreRef = React.useRef<THREE.Group>(null);
  const ringRef = React.useRef<THREE.Mesh>(null);
  const nodesRef = React.useRef<THREE.InstancedMesh>(null);
  const elapsedRef = React.useRef(0);
  const framesRef = React.useRef(0);
  const reportedInitRef = React.useRef(false);

  const { gl, invalidate } = useThree();

  const palette = React.useMemo(
    () =>
      theme === "dark"
        ? {
            wireframe: "#3B63D6",
            wireOpacity: 0.62,
            coreFill: "#131D33",
            coreEdge: "#1DA4DF",
            bus: "#1DA4DF",
            busOpacity: 0.42,
            ring: "#3B63D6",
            ringOpacity: 0.36,
            nodePrimary: "#3B63D6",
            nodeAccent: "#1DA4DF",
            ambient: 0.75,
            keyIntensity: 1.5,
            rimColor: "#1DA4DF",
          }
        : {
            wireframe: "#233A8E",
            wireOpacity: 0.56,
            coreFill: "#E0F4FC",
            coreEdge: "#0369A1",
            bus: "#0369A1",
            busOpacity: 0.36,
            ring: "#233A8E",
            ringOpacity: 0.3,
            nodePrimary: "#233A8E",
            nodeAccent: "#0369A1",
            ambient: 0.95,
            keyIntensity: 1.35,
            rimColor: "#1DA4DF",
          },
    [theme]
  );

  // Build immutable shared geometries once and explicitly dispose on unmount
  const geometries = React.useMemo(() => {
    const outerIco = new THREE.IcosahedronGeometry(NODE_RADIUS, 0);
    const outerWireGeo = new THREE.EdgesGeometry(outerIco);
    outerIco.dispose();

    const coreSolidGeo = new THREE.OctahedronGeometry(0.54, 0);
    const coreEdgeGeo = new THREE.EdgesGeometry(coreSolidGeo);

    const nodeGeo = new THREE.OctahedronGeometry(0.105, 0);

    const segmentPoints: number[] = [];
    for (const [nx, ny, nz] of NODE_POSITIONS) {
      segmentPoints.push(0, 0, 0, nx * 0.94, ny * 0.94, nz * 0.94);
    }
    for (const [a, b] of BUS_PAIRS) {
      const [ax, ay, az] = NODE_POSITIONS[a];
      const [bx, by, bz] = NODE_POSITIONS[b];
      segmentPoints.push(ax, ay, az, bx, by, bz);
    }
    const busGeo = new THREE.BufferGeometry();
    busGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(segmentPoints, 3)
    );

    const ringGeo = new THREE.TorusGeometry(1.74, 0.011, 6, 48);

    return {
      outerWireGeo,
      coreSolidGeo,
      coreEdgeGeo,
      nodeGeo,
      busGeo,
      ringGeo,
    };
  }, []);

  React.useEffect(() => {
    return () => {
      geometries.outerWireGeo.dispose();
      geometries.coreSolidGeo.dispose();
      geometries.coreEdgeGeo.dispose();
      geometries.nodeGeo.dispose();
      geometries.busGeo.dispose();
      geometries.ringGeo.dispose();
    };
  }, [geometries]);

  // Configure instanced node transforms once
  React.useLayoutEffect(() => {
    const mesh = nodesRef.current;
    if (!mesh) return;
    NODE_POSITIONS.forEach(([x, y, z], index) => {
      TEMP_OBJ.position.set(x, y, z);
      TEMP_OBJ.rotation.set(index * 0.4, index * 0.7, 0);
      const scale = CYAN_NODE_INDICES.has(index) ? 1.12 : 0.92;
      TEMP_OBJ.scale.setScalar(scale);
      TEMP_OBJ.updateMatrix();
      mesh.setMatrixAt(index, TEMP_OBJ.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, []);

  // Update per-instance node colors on theme toggle without rebuilding geometry
  React.useEffect(() => {
    const mesh = nodesRef.current;
    if (!mesh) return;
    NODE_POSITIONS.forEach((_, index) => {
      TEMP_COLOR.set(
        CYAN_NODE_INDICES.has(index) ? palette.nodeAccent : palette.nodePrimary
      );
      mesh.setColorAt(index, TEMP_COLOR);
    });
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
    invalidate();
  }, [palette.nodeAccent, palette.nodePrimary, invalidate]);

  useFrame((_, rawDelta) => {
    framesRef.current += 1;

    if (!reportedInitRef.current && onTelemetry) {
      reportedInitRef.current = true;
      const start = mountStartRef.current || performance.now();
      const initMs = Math.max(1, Math.round(performance.now() - start));
      onTelemetry({
        triangles: gl.info.render.triangles,
        drawCalls: gl.info.render.calls,
        geometries: gl.info.memory.geometries,
        materials: 6,
        initMs,
        framesRendered: framesRef.current,
      });
    } else if (onTelemetry && framesRef.current % 30 === 0) {
      onTelemetry({
        triangles: gl.info.render.triangles,
        drawCalls: gl.info.render.calls,
        geometries: gl.info.memory.geometries,
        materials: 6,
        initMs: 0,
        framesRendered: framesRef.current,
      });
    }

    if (!isActive) return;

    const delta = Math.min(rawDelta, 0.05);
    elapsedRef.current += delta;
    const t = elapsedRef.current;

    const root = rootGroupRef.current;
    if (root) {
      const targetX = isFinePointer ? pointerRef.current.y * 0.24 : 0.14;
      const targetY =
        t * 0.16 + (isFinePointer ? pointerRef.current.x * 0.32 : 0);
      const damping = 1 - Math.exp(-4.2 * delta);
      root.rotation.x += (targetX - root.rotation.x) * damping;
      root.rotation.y += (targetY - root.rotation.y) * damping;
      root.position.y = Math.sin(t * 0.72) * 0.065;
    }

    const core = innerCoreRef.current;
    if (core) {
      core.rotation.y = -t * 0.28;
      core.rotation.z = t * 0.14;
    }

    const ring = ringRef.current;
    if (ring) {
      ring.rotation.z = t * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={palette.ambient} />
      <directionalLight
        position={[3.5, 4.2, 4.5]}
        intensity={palette.keyIntensity}
        color="#F8FAFC"
      />
      <directionalLight
        position={[-3.5, -2.2, -2.5]}
        intensity={0.7}
        color={palette.rimColor}
      />

      <group ref={rootGroupRef} rotation={[0.18, 0.35, 0]}>
        <lineSegments geometry={geometries.outerWireGeo}>
          <lineBasicMaterial
            color={palette.wireframe}
            transparent
            opacity={palette.wireOpacity}
          />
        </lineSegments>

        <lineSegments geometry={geometries.busGeo}>
          <lineBasicMaterial
            color={palette.bus}
            transparent
            opacity={palette.busOpacity}
          />
        </lineSegments>

        <instancedMesh
          ref={nodesRef}
          args={[geometries.nodeGeo, undefined, NODE_POSITIONS.length]}
        >
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.32}
            metalness={0.25}
            flatShading
          />
        </instancedMesh>

        <group ref={innerCoreRef}>
          <mesh geometry={geometries.coreSolidGeo}>
            <meshStandardMaterial
              color={palette.coreFill}
              roughness={0.42}
              metalness={0.35}
              flatShading
            />
          </mesh>
          <lineSegments geometry={geometries.coreEdgeGeo}>
            <lineBasicMaterial
              color={palette.coreEdge}
              transparent
              opacity={0.92}
            />
          </lineSegments>
        </group>

        <mesh
          ref={ringRef}
          geometry={geometries.ringGeo}
          rotation={[Math.PI * 0.37, 0.22, 0]}
        >
          <meshBasicMaterial
            color={palette.ring}
            transparent
            opacity={palette.ringOpacity}
          />
        </mesh>
      </group>
    </>
  );
}

export default function HeroScene3D({
  theme,
  isActive,
  isFinePointer,
  pointerRef,
  onTelemetry,
  onContextLost,
}: HeroScene3DProps) {
  const mountStartRef = React.useRef<number>(0);
  const cleanupRef = React.useRef<(() => void) | null>(null);

  React.useEffect(() => {
    mountStartRef.current = performance.now();
    return () => {
      cleanupRef.current?.();
    };
  }, []);

  return (
    <Canvas
      className="h-full w-full"
      dpr={isFinePointer ? [1, 1.75] : [1, 1.25]}
      frameloop={isActive ? "always" : "demand"}
      camera={{ position: [0, 0, 4.55], fov: 38, near: 0.1, far: 30 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        const canvasEl = gl.domElement;
        const handleLost = (event: Event) => {
          event.preventDefault();
          onContextLost?.();
        };
        canvasEl.addEventListener("webglcontextlost", handleLost, false);
        cleanupRef.current = () => {
          canvasEl.removeEventListener("webglcontextlost", handleLost);
        };
      }}
    >
      <ArchitecturalRig
        theme={theme}
        isActive={isActive}
        isFinePointer={isFinePointer}
        pointerRef={pointerRef}
        mountStartRef={mountStartRef}
        onTelemetry={onTelemetry}
      />
    </Canvas>
  );
}
