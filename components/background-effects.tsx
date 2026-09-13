"use client"

import Lightfall from "./lightfall"

const LIGHTFALL_COLORS = ['#5700bf', '#5227ff', '#ff9ffc'];

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-black" />
      <Lightfall
        colors={LIGHTFALL_COLORS}
        backgroundColor="#000000"
        mouseInteraction={false}
        speed={0.5}
        streakCount={2}
        streakWidth={1}
        streakLength={1}
        density={0.6}
        twinkle={1}
        glow={1}
        backgroundGlow={0.5}
        zoom={3}
        mouseStrength={0.5}
        mouseRadius={1}
        opacity={1}
        lightMode={false}
      />
    </div>
  )
}
