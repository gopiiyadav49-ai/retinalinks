"use client";

import dynamic from "next/dynamic";

interface HeroDioramaProps {
  onActivePanelChange?: (index: number) => void;
}

const HeroDiorama = dynamic<HeroDioramaProps>(() => import("@/components/HeroDiorama"), {
  ssr: false,
  loading: () => (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
  ),
});

export default HeroDiorama;
