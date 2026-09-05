'use client'

import { useEffect, useRef } from 'react'

// ─── GLSL: Vertex Shader ─────────────────────────────────────────────────────
// Trivial fullscreen-quad pass-through.

const VERT = /* glsl */`
  attribute vec2 a_pos;
  void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

// ─── GLSL: Fragment Shader ───────────────────────────────────────────────────
// Domain-warped fractal brownian motion in the site palette.
// All "interactivity" (mouse warp, spotlight, cinematic fade) lives here
// as uniforms so the CPU only updates 4 floats per frame.

const FRAG = /* glsl */`
  precision mediump float;

  uniform float u_time;
  uniform vec2  u_res;
  uniform vec2  u_mouse;       // canvas UV, 0..1, Y-flipped to match GLSL
  uniform float u_spot;        // 0 = cinematic (no spotlight), 1 = interactive

  // ── Gradient noise (smoother than value noise) ──────────────────────────
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
  }
  float gnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return 0.5 + 0.5 * mix(
      mix(dot(hash2(i),           f),           dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
      mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)), dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x),
      u.y
    );
  }

  // ── FBM: 5 octaves with a rotation matrix to break directional bias ──────
  const mat2 ROT = mat2(1.6, 1.2, -1.2, 1.6);
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * gnoise(p); p = ROT * p; a *= 0.48; }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    uv.y = 1.0 - uv.y;
    float t = u_time * 0.09;

    // ── Mouse warp: gentle domain displacement near the cursor ───────────
    vec2  md  = uv - u_mouse;
    float md2 = dot(md, md);                                // squared distance
    vec2  warp = md * 0.07 * max(0.0, 1.0 - md2 * 7.0) * u_spot;

    // ── Domain-warped FBM (two warp passes) ──────────────────────────────
    vec2 q = vec2(fbm(uv * 2.2 + vec2(0.0, 0.0) + t       + warp),
                  fbm(uv * 2.2 + vec2(5.2, 1.3) + t * 0.75 + warp));
    vec2 r = vec2(fbm(uv * 2.2 + 4.0 * q + vec2(1.7, 9.2) + t * 0.45),
                  fbm(uv * 2.2 + 4.0 * q + vec2(8.3, 2.8) + t * 0.28));
    float n = fbm(uv * 1.5 + 2.5 * r + t * 0.18);

    // ── Palette ───────────────────────────────────────────────────────────
    // Cream base dominates; other colors are very soft washes.
    // IMPORTANT: Keep multipliers LOW — this effect should be "felt, not seen."
    // Do not raise smoothstep lower bounds or multipliers above these values
    // or the background will tip into an oversaturated orange/muddy wash.
    vec3 cream    = vec3(0.992, 0.973, 0.941);   // #FDF8F0
    vec3 peach    = vec3(0.961, 0.776, 0.647);   // #F5C6A5
    vec3 pink     = vec3(0.941, 0.722, 0.769);   // #F0B8C4
    vec3 lav      = vec3(0.765, 0.749, 0.941);   // #C3BFF0
    vec3 mint     = vec3(0.663, 0.863, 0.851);   // #A9DCD9
    vec3 butter   = vec3(0.973, 0.914, 0.659);   // #F8E9A8

    vec3 col = cream;
    // Wide thresholds keep cream dominant; multipliers cap each color's contribution
    col = mix(col, peach,  smoothstep(0.48, 0.72, n) * 0.28);
    col = mix(col, pink,   smoothstep(0.55, 0.75, n) * 0.18);
    col = mix(col, lav,    smoothstep(0.58, 0.82, n) * 0.22);
    col = mix(col, mint,   smoothstep(0.65, 0.88, n) * 0.16);
    col = mix(col, butter, smoothstep(0.22, 0.50, 1.0 - n) * 0.14);

    // ── Cursor spotlight ──────────────────────────────────────────────────
    // Very subtle warm glint — keep spotAmt low so it doesn't wash out text.
    float spotR   = length(uv - u_mouse);
    float spotAmt = smoothstep(0.52, 0.0, spotR) * u_spot * 0.06;
    col = mix(col, vec3(1.0, 0.968, 0.914), spotAmt);

    gl_FragColor = vec4(col, 1.0);
  }
`

// ─── WebGL helpers ────────────────────────────────────────────────────────────

function makeShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type)
  if (!s) return null
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn('[HeroAtmosphere] Shader error:', gl.getShaderInfoLog(s))
    gl.deleteShader(s)
    return null
  }
  return s
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HeroAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Mobile/touch: skip entirely — WebGL is wasted on pointer:coarse devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    // ── WebGL context ──────────────────────────────────────────────────────
    // Request low-power (integrated GPU), disable alpha compositing for speed.
    const gl = canvas.getContext('webgl', {
      alpha:           false,
      antialias:       false,
      depth:           false,
      stencil:         false,
      powerPreference: 'low-power',
    }) as WebGLRenderingContext | null

    if (!gl) {
      // WebGL unavailable — gracefully degrade (page still renders fine)
      console.info('[HeroAtmosphere] WebGL unavailable, skipping atmosphere.')
      return
    }

    // ── Compile shaders ────────────────────────────────────────────────────
    const vert = makeShader(gl, gl.VERTEX_SHADER,   VERT)
    const frag = makeShader(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vert || !frag) return

    const prog = gl.createProgram()!
    gl.attachShader(prog, vert)
    gl.attachShader(prog, frag)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn('[HeroAtmosphere] Program link error:', gl.getProgramInfoLog(prog))
      return
    }
    gl.useProgram(prog)

    // ── Fullscreen quad: two triangles covering clip space ─────────────────
    // (-1,-1) to (1,1) — maps exactly to the canvas surface.
    const vbo = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,   1, -1,  -1,  1,
      -1,  1,   1, -1,   1,  1,
    ]), gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uTime  = gl.getUniformLocation(prog, 'u_time')
    const uRes   = gl.getUniformLocation(prog, 'u_res')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')
    const uSpot  = gl.getUniformLocation(prog, 'u_spot')

    // ── Sizing ─────────────────────────────────────────────────────────────
    let W = canvas.offsetWidth || window.innerWidth
    let H = canvas.offsetHeight || window.innerHeight
    canvas.width  = W
    canvas.height = H
    gl.viewport(0, 0, W, H)

    // ── Interactive state ──────────────────────────────────────────────────
    // mouseX/Y are normalised UV coords (0..1), Y flipped for GLSL convention.
    let mouseX   = 0.5
    let mouseY   = 0.5
    let lastMove = Date.now()
    let isCine   = false
    let spotVal  = 1.0                // animated value, lerps 0..1
    const IDLE   = 3000              // ms until cinematic mode

    const T0 = performance.now()
    let animId: number

    // ── Draw loop ──────────────────────────────────────────────────────────
    const draw = () => {
      const t = (performance.now() - T0) / 1000.0

      // Cinematic gate
      if (!isCine && Date.now() - lastMove > IDLE) isCine = true
      const spotTarget = isCine ? 0.0 : 1.0
      const spotRate   = isCine ? 0.015 : 0.06
      spotVal += (spotTarget - spotVal) * spotRate

      gl.uniform1f(uTime,  t)
      gl.uniform2f(uRes,   W, H)
      gl.uniform2f(uMouse, mouseX, mouseY)
      gl.uniform1f(uSpot,  spotVal)
      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animId = requestAnimationFrame(draw)
    }
    draw()

    // ── Event listeners ────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseX = (e.clientX - r.left)  / W
      mouseY = 1.0 - (e.clientY - r.top) / H   // GLSL Y is bottom-up
      if (isCine) isCine = false
      lastMove = Date.now()
    }

    const onResize = () => {
      W = canvas.offsetWidth  || window.innerWidth
      H = canvas.offsetHeight || window.innerHeight
      canvas.width  = W
      canvas.height = H
      gl.viewport(0, 0, W, H)
    }

    window.addEventListener('mousemove', onMove,   { passive: true })
    window.addEventListener('resize',   onResize,  { passive: true })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize',   onResize)
      gl.deleteBuffer(vbo)
      gl.deleteProgram(prog)
      gl.deleteShader(vert)
      gl.deleteShader(frag)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:       'absolute',
        inset:          0,
        width:          '100%',
        height:         '100%',
        zIndex:         0,
        pointerEvents:  'none',
        display:        'block',
      }}
    />
  )
}
