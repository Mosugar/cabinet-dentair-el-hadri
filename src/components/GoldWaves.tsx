"use client";

import { useEffect, useRef } from "react";

/*
  Vagues liquides dorées en WebGL (adapté du ShaderWaves de Wardd).
  Aucune dépendance. Si WebGL n'est pas dispo, le fond du parent reste visible.
*/

const VERT = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform vec3  uC1;
uniform vec3  uC2;
uniform vec3  uC3;
uniform vec2  uMouse;

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0) * 1.3;
  p += (uMouse - 0.5) * 0.3;
  float t = uTime;

  for (int i = 1; i < 5; i++) {
    float fi = float(i);
    p.x += 1.1 / fi * sin(fi * 0.7 * p.y + t * 0.6 + 0.3 * fi);
    p.y += 1.1 / fi * cos(fi * 0.6 * p.x + t * 0.45 + 0.5 * fi);
  }

  float field = p.x * 0.9 + p.y * 0.55;
  float s = sin(field * 4.5 + t * 0.5);
  float band = smoothstep(-0.45, 0.45, s);
  float seam = smoothstep(0.0, 0.2, abs(s));

  float shade = 0.5 + 0.5 * smoothstep(-1.0, 1.0, sin(field * 0.9 - t * 0.25));
  float gloss = pow(max(1.0 - abs(s - 0.55), 0.0), 8.0);

  // Or : du bronze au doré clair, avec un reflet satiné
  vec3 gold = mix(uC1, uC3, shade) + gloss * 0.35 * uC3;
  vec3 col = mix(uC2, gold, band * 0.9) * mix(0.3, 1.0, seam);
  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function GoldWaves({
  deep = "#8b5a1f",
  dark = "#0a0a0a",
  light = "#ecd36a",
  speed = 0.25,
  className = "",
}: {
  deep?: string;
  dark?: string;
  light?: string;
  speed?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("uRes");
    const uTime = u("uTime");
    const uMouse = u("uMouse");
    gl.uniform3fv(u("uC1"), hexToRgb(deep));
    gl.uniform3fv(u("uC2"), hexToRgb(dark));
    gl.uniform3fv(u("uC3"), hexToRgb(light));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const target = [0.5, 0.5];
    const cur = [0.5, 0.5];
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target[0] = (e.clientX - r.left) / r.width;
      target[1] = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);

    let raf = 0;
    let t = 4;
    let last = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) return;
      if (!reduce) t += dt * speed;
      cur[0] += (target[0] - cur[0]) * 0.04;
      cur[1] += (target[1] - cur[1]) * 0.04;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, cur[0], cur[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [deep, dark, light, speed]);

  return <canvas ref={canvasRef} className={`block size-full ${className}`} aria-hidden="true" />;
}
