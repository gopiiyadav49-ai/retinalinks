// ─── HeroBubbles ─────────────────────────────────────────────────────────────
// Colorful gradient discs that float behind the hero text.
// Layering:  WebGL atmosphere (z:0) → HeroBubbles (z:2) → text (z:20)
//
// Design principles:
//   • Depth-of-field layering: large bubbles = less blur + higher opacity (closer),
//     small bubbles = more blur + lower opacity (farther back).
//   • All positioned with origin inside viewport — no negative offsets — so
//     overflow:hidden doesn't clip the color-dense centers.
//   • Blur values chosen so color stays concentrated, not diffused to invisible.
//   • Gradients go to transparent at 65% so two-tone blend is clearly visible.
//   • Each bubble uses a different keyframe + staggered delay — none in sync.
//
// @keyframes bubble-a/b/c/d are defined in globals.css (static, always available).

interface BubbleConfig {
  size: number
  gradient: string
  opacity: number
  top?: string
  left?: string
  right?: string
  bottom?: string
  animation: string
  blur: number
}

const BUBBLES: BubbleConfig[] = [
  // ── Large anchors — highest opacity, least blur (closest "layer") ──────────
  {
    // Top-left corner bloom: peach → vivid pink
    size: 440,
    gradient: 'radial-gradient(circle at 30% 30%, #F5C6A5 0%, #F0B8C4 42%, transparent 65%)',
    opacity: 0.50,
    top: '0%', left: '0%',
    animation: 'bubble-a 9s ease-in-out 0s infinite',
    blur: 38,
  },
  {
    // Bottom-right corner bloom: lavender → mint
    size: 420,
    gradient: 'radial-gradient(circle at 68% 65%, #C3BFF0 0%, #A9DCD9 44%, transparent 65%)',
    opacity: 0.48,
    bottom: '0%', right: '0%',
    animation: 'bubble-b 8.5s ease-in-out 2.2s infinite',
    blur: 36,
  },
  {
    // Top-right: butter → peach (warm tone, contrasts the cool bottom-right)
    size: 360,
    gradient: 'radial-gradient(circle at 65% 28%, #F5DDA0 0%, #F5C6A5 45%, transparent 65%)',
    opacity: 0.44,
    top: '0%', right: '0%',
    animation: 'bubble-c 9.5s ease-in-out 1s infinite',
    blur: 40,
  },
  {
    // Bottom-left: mint → lavender (cool counterpart to warm bottom-center)
    size: 380,
    gradient: 'radial-gradient(circle at 32% 70%, #A9DCD9 0%, #C3BFF0 46%, transparent 65%)',
    opacity: 0.42,
    bottom: '0%', left: '0%',
    animation: 'bubble-d 8s ease-in-out 3.5s infinite',
    blur: 42,
  },

  // ── Medium — mid-layer ─────────────────────────────────────────────────────
  {
    // Left-center: pink → butter (warm accent on left side)
    size: 280,
    gradient: 'radial-gradient(circle at 40% 50%, #F0B8C4 0%, #F5DDA0 48%, transparent 68%)',
    opacity: 0.40,
    top: '32%', left: '2%',
    animation: 'bubble-a 7.5s ease-in-out 4.2s infinite',
    blur: 44,
  },
  {
    // Right-center: lavender → pink (cool accent on right side)
    size: 260,
    gradient: 'radial-gradient(circle at 60% 50%, #C3BFF0 0%, #F0B8C4 46%, transparent 68%)',
    opacity: 0.38,
    top: '28%', right: '2%',
    animation: 'bubble-b 7s ease-in-out 1.6s infinite',
    blur: 46,
  },

  // ── Small accents — most blurred, least opaque (farthest back) ─────────────
  {
    // Top-center accent: vivid lavender → pink (sits between headline and top)
    size: 180,
    gradient: 'radial-gradient(circle at 50% 50%, #C3BFF0 0%, #F0B8C4 55%, transparent 75%)',
    opacity: 0.45,
    top: '6%', left: '34%',
    animation: 'bubble-c 5.8s ease-in-out 2.8s infinite',
    blur: 28,
  },
  {
    // Mid-field accent: butter → lavender (breaks up the center-right void)
    size: 150,
    gradient: 'radial-gradient(circle at 50% 50%, #F5DDA0 0%, #C3BFF0 58%, transparent 78%)',
    opacity: 0.42,
    top: '50%', left: '55%',
    animation: 'bubble-d 6.5s ease-in-out 0.5s infinite',
    blur: 24,
  },
]

export default function HeroBubbles() {
  return (
    // Above WebGL (z:0), below text/CTAs (z:20).
    // overflow:hidden prevents bubble blur from leaking outside the hero section.
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            background: b.gradient,
            borderRadius: '50%',
            opacity: b.opacity,
            filter: `blur(${b.blur}px)`,
            animation: b.animation,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
