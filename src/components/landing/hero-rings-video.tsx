"use client";

import { useEffect, useRef } from "react";

/*
 * The hero rings, rendered as three real rings (Dom, 2026-11-07: « remet le vibe à la Code Metal,
 * moins intense, plus slick », then « met un anneau iron » on the glass-and-gold study).
 * It replaced the wireframe gyroscope, which replaced the engraved video and the 3D loop.
 *
 * The same three bands as the logo: two rings of frosted glass and a polished gold ring.
 * Each is a flat band with rounded edges turned on its own axis, lit by a soft room
 * so the glass bends what is behind it and the gold catches the light.
 *
 * They turn slowly on their own and faster while the page scrolls (Dom, 2026-11-02:
 * « vrm slow si sa bouge sans scroll »). Drawn only while the hero is on screen.
 * The 3D library loads after the page, on its own. Reduced motion: one still frame.
 * Without WebGL or JavaScript, the still image under the canvas stays.
 */

type Band = {
  R: number;
  w: number;
  t: number;
  tilt: readonly [number, number, number];
  spin: readonly [number, number, number];
};

const HALF_PI = Math.PI / 2;
const BANDS: readonly Band[] = [
  // A spin on z alone turns a band within itself and shows nothing; each ring tumbles on x or y
  // too, so all three move from the first frame (Dom, 2026-11-07: « l'anneau blanc ... bouger au
  // début comme les autres »). The glass ring is a little smaller (« un peu plus petit »).
  { R: 0.9, w: 0.19, t: 0.05, tilt: [0.35 + HALF_PI, -0.25, 0], spin: [0.09, 0.06, 0] },
  { R: 0.72, w: 0.22, t: 0.06, tilt: [1.05 + HALF_PI, 0.3, 0.2], spin: [-0.06, 0.11, 0] },
  { R: 0.5, w: 0.26, t: 0.07, tilt: [-0.6 + HALF_PI, 0.9, -0.3], spin: [0.07, 0.05, 0.16] },
];
const FALLBACK_BG = "#e7e5e2";

const IDLE_RATE = 1;
const MAX_RATE = 7;
const GAIN = 0.12; // rate added per pixel scrolled in one frame
const EASE = 0.1;
const SETTLE = 0.05;

/** The first opaque background colour up the tree, so the glass refracts the page it sits on. */
function pageBackground(el: HTMLElement | null): string {
  let node: HTMLElement | null = el;
  while (node) {
    const c = window.getComputedStyle(node).backgroundColor;
    if (c && c !== "transparent" && !/rgba\(.*,\s*0\)$/.test(c)) return c;
    node = node.parentElement;
  }
  return FALLBACK_BG;
}

export function HeroRingsVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let cleanup: (() => void) | null = null;

    const start = async () => {
      let THREE: typeof import("three");
      let RoomEnvironment: typeof import("three/examples/jsm/environments/RoomEnvironment.js").RoomEnvironment;
      try {
        THREE = await import("three");
        ({ RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js"));
      } catch (err: unknown) {
        console.warn("hero rings: 3D library did not load, the still image stays", err);
        return;
      }
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" });
      } catch (err: unknown) {
        console.warn("hero rings: WebGL unavailable, the still image stays", err);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(pageBackground(canvas.parentElement));
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTarget = pmrem.fromScene(new RoomEnvironment(), 0.04);
      scene.environment = envTarget.texture;
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
      camera.position.set(0, 0, 4.4);
      const key = new THREE.DirectionalLight(0xffffff, 1.2);
      key.position.set(-2, 3, 4);
      scene.add(key);

      // A flat band with rounded edges, turned around its axis: a ring you could wear, not a tube.
      const bandGeometry = (b: Band) => {
        const pts: import("three").Vector2[] = [];
        const r = Math.min(b.t, b.w) * 0.45;
        const steps = 6;
        const corner = (cx: number, cy: number, a0: number) => {
          for (let i = 0; i <= steps; i++) {
            const a = a0 + (i / steps) * HALF_PI;
            pts.push(new THREE.Vector2(cx + Math.cos(a) * r, cy + Math.sin(a) * r));
          }
        };
        corner(b.R - r, -b.w / 2 + r, -HALF_PI);
        corner(b.R - r, b.w / 2 - r, 0);
        corner(b.R - b.t + r, b.w / 2 - r, HALF_PI);
        corner(b.R - b.t + r, -b.w / 2 + r, Math.PI);
        const first = pts[0];
        if (first) pts.push(first.clone());
        const g = new THREE.LatheGeometry(pts, 220);
        g.computeVertexNormals();
        return g;
      };

      // Two rings of frosted glass and one of polished gold (Dom, 2026-11-07: the iron ring
      // « blanche transparent comme l'autre finalement »).
      const glass = () =>
        new THREE.MeshPhysicalMaterial({
          color: 0xffffff, metalness: 0, roughness: 0.22, transmission: 1, thickness: 0.22, ior: 1.45,
          iridescence: 0.45, iridescenceIOR: 1.3, iridescenceThicknessRange: [180, 520],
          clearcoat: 1, clearcoatRoughness: 0.2, envMapIntensity: 1.1,
        });
      const materials = [
        glass(),
        glass(),
        new THREE.MeshPhysicalMaterial({ color: 0xc9a14e, metalness: 1, roughness: 0.18, clearcoat: 0.6, envMapIntensity: 1.25 }),
      ];
      const geometries = BANDS.map(bandGeometry);
      const group = new THREE.Group();
      scene.add(group);
      const meshes = BANDS.map((b, i) => {
        const mesh = new THREE.Mesh(geometries[i], materials[i]);
        mesh.rotation.set(b.tilt[0], b.tilt[1], b.tilt[2]);
        group.add(mesh);
        return mesh;
      });

      const size = () => {
        const rect = canvas.getBoundingClientRect();
        const w = Math.max(1, rect.width);
        const h = Math.max(1, rect.height);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };

      // Phase accumulates so a change of speed never jumps the drawing.
      let phase = 6;
      const draw = () => {
        meshes.forEach((m, i) => {
          const b = BANDS[i];
          if (!b) return;
          m.rotation.set(b.tilt[0] + phase * b.spin[0], b.tilt[1] + phase * b.spin[1], b.tilt[2] + phase * b.spin[2]);
        });
        group.rotation.y = Math.sin(phase * 0.12) * 0.25;
        renderer.render(scene, camera);
      };

      size();
      draw();
      // The rendering now carries the picture: the still under it goes.
      canvas.parentElement?.setAttribute("data-engraved", "");
      const onResize = () => {
        size();
        draw();
      };
      window.addEventListener("resize", onResize);

      let raf = 0;
      let io: IntersectionObserver | null = null;
      const release = () => {
        io?.disconnect();
        if (raf) window.cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        geometries.forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        envTarget.dispose();
        pmrem.dispose();
        renderer.dispose();
      };

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        let rate = IDLE_RATE;
        let target = IDLE_RATE;
        let lastY = window.scrollY;
        let last = 0;
        let visible = false;

        const tick = (now: number) => {
          raf = 0;
          if (!visible) return;
          const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
          last = now;
          const y = window.scrollY;
          const dy = Math.abs(y - lastY);
          lastY = y;
          if (dy > 0) target = Math.min(MAX_RATE, Math.max(target, IDLE_RATE + dy * GAIN));
          target += (IDLE_RATE - target) * SETTLE;
          rate += (target - rate) * EASE;
          phase += dt * rate;
          draw();
          raf = window.requestAnimationFrame(tick);
        };

        io = new IntersectionObserver(
          ([entry]) => {
            visible = Boolean(entry?.isIntersecting);
            if (visible) {
              lastY = window.scrollY;
              last = 0;
              if (!raf) raf = window.requestAnimationFrame(tick);
            }
          },
          { threshold: 0 },
        );
        io.observe(canvas);
      }

      if (disposed) release();
      else cleanup = release;
    };

    start().catch((err: unknown) => console.warn("hero rings: render failed, the still image stays", err));

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-gyro absolute inset-0 h-full w-full" aria-hidden="true" />;
}
