"use client";

import { useEffect, useRef } from "react";

/*
 * The opening object: a solid gold seal turning slowly inside a ring of glass (Dom, 2026-11-08:
 * « le sceau, fond clair »). It replaced the glass-and-gold rings, which replaced the wireframe
 * gyroscope, the engraved video and the 3D loop.
 *
 * Every word engraved on it is true and already on the site (Dom: « des trucs écrits relevant,
 * no bs »): the promise around the rim, VERIFY WITHOUT TRUSTING US; the two signatures of the
 * seal on the inner ring, as the example dossier card names them (Ed25519 + ML-DSA-65); and the
 * verdict with its limit in the centre, PROVED / WITHIN DECLARED BOUNDS, as the dossier card says
 * « proved, within the declared model and hypotheses ». No decorative formula.
 *
 * The engraving is drawn once on a canvas in the site's own fonts and used as a relief map.
 * It turns slowly on its own and faster while the page scrolls (Dom, 2026-11-02: « vrm slow si
 * sa bouge sans scroll »). Drawn only while the hero is on screen. The 3D library loads after
 * the page, on its own. Reduced motion: one still frame. Without WebGL or JavaScript, the still
 * image under the canvas stays.
 */

const RIM = "VERIFY WITHOUT TRUSTING US · VERIFY WITHOUT TRUSTING US · ";
const INNER = "SIGNED Ed25519 + ML-DSA-65 · POST-QUANTUM · ";
const FALLBACK_BG = "#e7e5e2";
const SEAL_R = 1.15;

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

/** A font family the site has loaded (next/font sets it as a CSS variable), with a fallback. */
function siteFont(variable: string, fallback: string): string {
  const v = window.getComputedStyle(document.body).getPropertyValue(variable).trim();
  return v ? `${v}, ${fallback}` : fallback;
}

/** The engraving: grey = flat gold, white = raised. Drawn at 1024 px, used as a relief map. */
function engraving(): HTMLCanvasElement | null {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 1024;
  const g = c.getContext("2d");
  if (!g) return null;
  const mono = siteFont("--font-jetbrains", "ui-monospace, monospace");
  const serif = siteFont("--font-eb-garamond", "Georgia, serif");
  g.fillStyle = "#808080";
  g.fillRect(0, 0, 1024, 1024);
  g.strokeStyle = "#ffffff";
  for (const [r, w] of [[470, 10], [380, 4], [300, 3]] as const) {
    g.lineWidth = w;
    g.beginPath();
    g.arc(512, 512, r, 0, Math.PI * 2);
    g.stroke();
  }
  g.fillStyle = "#ffffff";
  g.textAlign = "center";
  g.textBaseline = "middle";
  const ring = (txt: string, rad: number, size: number) => {
    g.font = `600 ${size}px ${mono}`;
    const n = txt.length;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2;
      g.save();
      g.translate(512 + Math.cos(a) * rad, 512 + Math.sin(a) * rad);
      g.rotate(a + Math.PI / 2);
      g.fillText(txt.charAt(i), 0, 0);
      g.restore();
    }
  };
  ring(RIM, 425, 46);
  ring(INNER, 340, 30);
  g.font = `500 132px ${serif}`;
  g.fillText("PROVED", 512, 480);
  g.font = `500 34px ${mono}`;
  g.fillText("WITHIN DECLARED BOUNDS", 512, 590);
  return c;
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
        // The engraving uses the site's fonts: wait for them, or the canvas draws a fallback.
        await document.fonts.ready;
      } catch (err: unknown) {
        console.warn("hero seal: 3D library did not load, the still image stays", err);
        return;
      }
      if (disposed) return;
      const art = engraving();
      if (!art) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" });
      } catch (err: unknown) {
        console.warn("hero seal: WebGL unavailable, the still image stays", err);
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
      camera.position.set(0, 0, 6.4);
      const key = new THREE.DirectionalLight(0xffffff, 1.3);
      key.position.set(-3, 4, 5);
      scene.add(key);

      const relief = new THREE.CanvasTexture(art);
      relief.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      const faceMat = new THREE.MeshPhysicalMaterial({ color: 0xc9a14e, metalness: 1, roughness: 0.24, bumpMap: relief, bumpScale: 3.2, clearcoat: 0.5, envMapIntensity: 1.3 });
      const edgeMat = new THREE.MeshPhysicalMaterial({ color: 0xc9a14e, metalness: 1, roughness: 0.3, envMapIntensity: 1.3 });
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff, metalness: 0, roughness: 0.1, transmission: 1, thickness: 0.3, ior: 1.5,
        iridescence: 0.4, iridescenceIOR: 1.3, iridescenceThicknessRange: [180, 520], clearcoat: 1, envMapIntensity: 1.1,
      });
      const discGeo = new THREE.CylinderGeometry(SEAL_R, SEAL_R, 0.2, 160);
      const faceGeo = new THREE.CircleGeometry(SEAL_R, 160);
      const haloGeo = new THREE.TorusGeometry(1.48, 0.03, 16, 160);

      // The edge is a cylinder; each face is a flat disc, so the lettering reads upright, never mirrored.
      const seal = new THREE.Group();
      const disc = new THREE.Mesh(discGeo, edgeMat);
      disc.rotation.x = Math.PI / 2;
      const front = new THREE.Mesh(faceGeo, faceMat);
      front.position.z = 0.101;
      const back = new THREE.Mesh(faceGeo, faceMat);
      back.position.z = -0.101;
      back.rotation.y = Math.PI;
      seal.add(disc, front, back);
      scene.add(seal);
      const halo = new THREE.Mesh(haloGeo, glassMat);
      scene.add(halo);

      const size = () => {
        const rect = canvas.getBoundingClientRect();
        const w = Math.max(1, rect.width);
        const h = Math.max(1, rect.height);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // Keep the whole seal and its ring in frame on a narrow (portrait) box.
        camera.position.z = w < h ? 6.4 * Math.min(1.6, h / w) : 6.4;
        camera.updateProjectionMatrix();
      };

      // Phase accumulates so a change of speed never jumps the drawing.
      let phase = 2;
      const draw = () => {
        seal.rotation.y = Math.sin(phase * 0.35) * 0.75;
        seal.rotation.x = Math.sin(phase * 0.23) * 0.18;
        halo.rotation.x = 1.2 + Math.sin(phase * 0.3) * 0.2;
        halo.rotation.y = phase * 0.25;
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
        [discGeo, faceGeo, haloGeo].forEach((g) => g.dispose());
        [faceMat, edgeMat, glassMat].forEach((m) => m.dispose());
        relief.dispose();
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

    start().catch((err: unknown) => console.warn("hero seal: render failed, the still image stays", err));

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-gyro absolute inset-0 h-full w-full" aria-hidden="true" />;
}
