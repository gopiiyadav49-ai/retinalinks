"use client";

import React, { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PANELS, DOLLY_START_Z, DOLLY_END_Z } from "@/lib/dioramaData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ---- Diorama Scene with Crisp Vivid Image Textures & Focused Camera Dolly ----
function DioramaScene({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>;
}) {
  const { camera } = useThree();
  const smoothedZ = useRef(DOLLY_START_Z);
  const panelMeshesRef = useRef<(THREE.Mesh | null)[]>([]);
  const panelFramesRef = useRef<(THREE.Mesh | null)[]>([]);
  const panelTextsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Load all 6 project showcase preview textures
  const textures = useTexture(PANELS.map((p) => p.image));

  // Configure sRGB color space & texture filtering for punchy, razor-sharp rendering
  useEffect(() => {
    textures.forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      tex.needsUpdate = true;
    });
  }, [textures]);

  useFrame(() => {
    // 1. Single smooth lerp for camera dolly along Z
    const targetZ =
      DOLLY_START_Z + (DOLLY_END_Z - DOLLY_START_Z) * scrollProgress.current;
    smoothedZ.current += (targetZ - smoothedZ.current) * 0.1;
    camera.position.z = smoothedZ.current;
    const curZ = smoothedZ.current;

    // 2. Update panel opacities and visibility based on camera distance
    for (let i = 0; i < PANELS.length; i++) {
      const panel = PANELS[i];
      // Distance from camera to panel along Z (camera is in front when cameraDist > 0)
      const cameraDist = curZ - panel.z;
      // Distance from optimal 5.0 unit focal plane
      const distFromOptimal = cameraDist - 5.0;

      let targetOpacity = 0;
      let isBadgeVisible = false;

      if (cameraDist <= 0) {
        // Passed behind camera: completely invisible
        targetOpacity = 0;
        isBadgeVisible = false;
      } else if (cameraDist < 3.2) {
        // Passing camera: gracefully dissolve to reveal the next panel
        targetOpacity = Math.max(0, cameraDist / 3.2);
        isBadgeVisible = false;
      } else if (cameraDist <= 6.5) {
        // Active focal zone: fully opaque, crisp, and vibrant
        targetOpacity = 1.0;
        isBadgeVisible = Math.abs(distFromOptimal) < 1.6;
      } else if (cameraDist <= 16) {
        // Approaching background layer: soft depth fogging
        targetOpacity = Math.max(0.18, 0.95 - (cameraDist - 6.5) * 0.08);
        isBadgeVisible = false;
      } else {
        // Distant background
        targetOpacity = 0.08;
        isBadgeVisible = false;
      }

      // Main image mesh opacity
      const mesh = panelMeshesRef.current[i];
      if (mesh) {
        const mat = mesh.material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity += (targetOpacity - mat.opacity) * 0.15;
        }
      }

      // Sleek chassis frame opacity
      const frame = panelFramesRef.current[i];
      if (frame) {
        const mat = frame.material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity = targetOpacity * 0.9;
        }
      }

      // Title badge DOM display & opacity — strictly hide when not active to prevent stacking
      const textEl = panelTextsRef.current[i];
      if (textEl) {
        if (isBadgeVisible && targetOpacity > 0.6) {
          textEl.style.display = "inline-flex";
          const badgeAlpha = Math.max(0, 1 - Math.abs(distFromOptimal) / 1.6);
          textEl.style.opacity = badgeAlpha.toFixed(2);
        } else {
          textEl.style.display = "none";
          textEl.style.opacity = "0";
        }
      }
    }
  });

  return (
    <>
      {PANELS.map((p, i) => (
        <group key={p.id} position={[p.xOffset * 3.2, p.yOffset * 2.2, p.z]}>
          {/* Card Chassis Frame / Clay Border */}
          <mesh
            ref={(el) => {
              panelFramesRef.current[i] = el;
            }}
            position={[0, 0, -0.015]}
          >
            <planeGeometry args={[3.72, 2.4]} />
            <meshBasicMaterial
              color={p.color}
              transparent
              opacity={i === 0 ? 0.9 : 0.2}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Main Showcase Project Image (Razor-sharp, vivid, sRGB) */}
          <mesh
            ref={(el) => {
              panelMeshesRef.current[i] = el;
            }}
          >
            <planeGeometry args={[3.6, 2.28]} />
            <meshBasicMaterial
              map={textures[i]}
              transparent
              opacity={i === 0 ? 1 : 0.25}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Floating Badge Tag (Only shown on active focused card) */}
          <Html position={[-1.35, 1.38, 0.05]} style={{ pointerEvents: "none" }}>
            <div
              ref={(el) => {
                panelTextsRef.current[i] = el;
              }}
              style={{
                display: i === 0 ? "inline-flex" : "none",
                alignItems: "center",
                gap: "7px",
                padding: "6px 16px",
                borderRadius: "100px",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(12px)",
                boxShadow:
                  "0 6px 18px rgba(60, 40, 25, 0.18), 0 1px 3px rgba(0,0,0,0.08)",
                border: `1.5px solid ${p.color}`,
                fontWeight: 700,
                fontSize: "13px",
                color: "#2C2C2A",
                whiteSpace: "nowrap",
                opacity: i === 0 ? 1 : 0,
                fontFamily: "var(--font-display, sans-serif)",
                letterSpacing: "-0.01em",
                userSelect: "none",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: p.color,
                  boxShadow: `0 0 8px ${p.color}`,
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              {p.label}
            </div>
          </Html>
        </group>
      ))}
    </>
  );
}

// ---- Main HeroDiorama Component ----
export default function HeroDiorama({
  onActivePanelChange,
}: {
  onActivePanelChange?: (index: number) => void;
}) {
  const scrollProgress = useRef(0);

  useEffect(() => {
    // GSAP ScrollTrigger with 1:1 scrub
    const st = ScrollTrigger.create({
      trigger: "#hero-section",
      start: "top top",
      end: "+=3000",
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
        // Determine active panel closest to camera focal distance
        const currentZ =
          DOLLY_START_Z + (DOLLY_END_Z - DOLLY_START_Z) * self.progress;
        let closestIndex = 0;
        let closestDist = Infinity;
        PANELS.forEach((p, i) => {
          const d = Math.abs((currentZ - 5.0) - p.z);
          if (d < closestDist) {
            closestDist = d;
            closestIndex = i;
          }
        });
        onActivePanelChange?.(closestIndex);
      },
    });

    ScrollTrigger.refresh();

    return () => st.kill();
  }, [onActivePanelChange]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, DOLLY_START_Z], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance", alpha: true, antialias: true }}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <DioramaScene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
