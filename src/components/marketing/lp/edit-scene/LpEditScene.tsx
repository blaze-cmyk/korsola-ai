import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { PromptBarMock, type SlotRefs } from "./PromptBarMock";
import { FakeCursor } from "./FakeCursor";
import { PROMPT_TEXT, VIDEO_1_SRC, VIDEO_3_SRC } from "./scene-assets";

type Rect = { x: number; y: number; w: number; h: number };
const ZERO: Rect = { x: 0, y: 0, w: 0, h: 0 };

function clamp(v: number, lo = 0, hi = 1) {
  return Math.max(lo, Math.min(hi, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function rectFor(stageEl: HTMLElement, el: HTMLElement | null): Rect {
  if (!el) return ZERO;
  const sr = stageEl.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
}

/** Centered 9:16 portrait — "twice 205×364" ≈ 410×728, capped to viewport. */
function centerRect(stageW: number, stageH: number): Rect {
  const w = Math.min(410, stageW * 0.5, (stageH - 200) * 9 / 16);
  const h = w * 16 / 9;
  // Slight downward bias so heading sits above with breathing room
  const y = Math.max(96, (stageH - h) / 2 + 24);
  const x = (stageW - w) / 2;
  return { x, y, w, h };
}

export function LpEditScene() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const barWrapRef = useRef<HTMLDivElement>(null);

  const slots: SlotRefs = {
    bar: useRef<HTMLDivElement>(null),
    videoSlot: useRef<HTMLDivElement>(null),
    productSlot: useRef<HTMLDivElement>(null),
    textarea: useRef<HTMLDivElement>(null),
    generate: useRef<HTMLDivElement>(null),
  };

  // --- measured rects ---------------------------------------------------
  const stageSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const centerR = useRef<Rect>(ZERO);
  const videoSlotR = useRef<Rect>(ZERO);
  const productSlotR = useRef<Rect>(ZERO);
  const textareaR = useRef<Rect>(ZERO);
  const generateR = useRef<Rect>(ZERO);

  const [, force] = useState(0);
  useEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const sr = stage.getBoundingClientRect();
      stageSize.current = { w: sr.width, h: sr.height };
      centerR.current = centerRect(sr.width, sr.height);
      videoSlotR.current = rectFor(stage, slots.videoSlot.current);
      productSlotR.current = rectFor(stage, slots.productSlot.current);
      textareaR.current = rectFor(stage, slots.textarea.current);
      generateR.current = rectFor(stage, slots.generate.current);
      force((n) => n + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    if (barWrapRef.current) ro.observe(barWrapRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // --- scroll progress --------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const p = scrollYProgress;

  // --- generation latch -------------------------------------------------
  const [generating, setGenerating] = useState(false);
  const [complete, setComplete] = useState(false);
  const timerRef = useRef<number | null>(null);

  useMotionValueEvent(p, "change", (v) => {
    if (v >= 0.6 && !generating && !complete) {
      setGenerating(true);
      timerRef.current = window.setTimeout(() => {
        setGenerating(false);
        setComplete(true);
      }, 1800);
    }
    if (v < 0.55 && (generating || complete)) {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      setGenerating(false);
      setComplete(false);
    }
  });

  // --- BACKGROUND: white → dark (ink) ---------------------------------
  // Crossfade as video starts shrinking (Act II).
  const bgColor = useTransform(
    p,
    [0.16, 0.30],
    ["rgb(255,255,255)", "rgb(11,11,12)"], // ink ~ #0b0b0c
  );

  // --- VIDEO 1 transforms (centered 9:16 → small chip) -----------------
  const v1X = useTransform(p, (v) => {
    const t = clamp((v - 0.18) / (0.32 - 0.18));
    return lerp(centerR.current.x, videoSlotR.current.x, t);
  });
  const v1Y = useTransform(p, (v) => {
    const t = clamp((v - 0.18) / (0.32 - 0.18));
    return lerp(centerR.current.y, videoSlotR.current.y, t);
  });
  const v1W = useTransform(p, (v) => {
    const t = clamp((v - 0.18) / (0.32 - 0.18));
    return lerp(centerR.current.w, videoSlotR.current.w || 64, t);
  });
  const v1H = useTransform(p, (v) => {
    const t = clamp((v - 0.18) / (0.32 - 0.18));
    return lerp(centerR.current.h, videoSlotR.current.h || 64, t);
  });
  const v1Radius = useTransform(p, [0.18, 0.32], [18, 12]);

  // --- PromptBar opacity ------------------------------------------------
  // Bar is BEHIND video1 from the very start (so video1 visually shrinks INTO it),
  // then fades out once we hand off to video3.
  const barOpacity = useTransform(p, [0, 0.06, 0.78, 0.86], [0, 1, 1, 0]);
  // Bar slides slightly upward once generation kicks in to make room for the queue/result
  const barShiftY = useTransform(p, [0.55, 0.66], [0, -120]);
  const productOpacity = useTransform(p, [0.40, 0.46], [0, 1]);

  // --- Heading: white text on dark, dark text on white ------------------
  // Heading sits ABOVE the video on white bg; fades during transition.
  const headingOpacity = useTransform(p, [0, 0.14, 0.20, 1], [1, 1, 0, 0]);
  const headingColor = useTransform(
    p,
    [0, 0.18],
    ["rgb(11,11,12)", "rgb(255,255,255)"],
  );

  // --- FakeCursor path: off-right → product slot → textarea → generate -
  const cursorX = useTransform(p, (v) => {
    const stageW = stageSize.current.w;
    if (v < 0.34) return stageW + 80;
    if (v < 0.46) {
      const t = clamp((v - 0.34) / 0.12);
      return lerp(stageW + 80, productSlotR.current.x + productSlotR.current.w / 2, t);
    }
    if (v < 0.50) {
      const t = clamp((v - 0.46) / 0.04);
      return lerp(
        productSlotR.current.x + productSlotR.current.w / 2,
        textareaR.current.x + 24,
        t,
      );
    }
    if (v < 0.6) {
      const t = clamp((v - 0.50) / 0.10);
      return lerp(
        textareaR.current.x + 24,
        generateR.current.x + generateR.current.w / 2,
        t,
      );
    }
    return generateR.current.x + generateR.current.w / 2;
  });
  const cursorY = useTransform(p, (v) => {
    if (v < 0.34) return productSlotR.current.y + productSlotR.current.h / 2;
    if (v < 0.46) {
      return productSlotR.current.y + productSlotR.current.h / 2;
    }
    if (v < 0.50) {
      const t = clamp((v - 0.46) / 0.04);
      return lerp(
        productSlotR.current.y + productSlotR.current.h / 2,
        textareaR.current.y + 16,
        t,
      );
    }
    if (v < 0.6) {
      const t = clamp((v - 0.50) / 0.10);
      return lerp(
        textareaR.current.y + 16,
        generateR.current.y + generateR.current.h / 2,
        t,
      );
    }
    return generateR.current.y + generateR.current.h / 2;
  });
  const cursorOpacity = useTransform(p, [0.32, 0.36, 0.62, 0.66], [0, 1, 1, 0]);

  // Chanel image rides with cursor from off-right → product slot, then drops
  const chanelDocked = useTransform(p, [0.44, 0.46], [0, 1]);
  const chanelX = useTransform(p, (v) => {
    if (v >= 0.46) return productSlotR.current.x;
    return cursorX.get() - 32;
  });
  const chanelY = useTransform(p, (v) => {
    if (v >= 0.46) return productSlotR.current.y;
    return cursorY.get() - 32;
  });
  const chanelOpacity = useTransform(p, [0.32, 0.36, 0.46, 0.47], [0, 1, 1, 0]);

  const typingProgress = useTransform(p, [0.50, 0.60], [0, 1]);

  const [pressed, setPressed] = useState(false);
  useMotionValueEvent(p, "change", (v) => setPressed(v >= 0.595 && v < 0.615));

  // --- VIDEO 3 — emerges at SAME centered 9:16 rect, holds, plays -----
  const v3X = useTransform(p, (v) => {
    const t = clamp((v - 0.66) / (0.78 - 0.66));
    return lerp(videoSlotR.current.x, centerR.current.x, t);
  });
  const v3Y = useTransform(p, (v) => {
    const t = clamp((v - 0.66) / (0.78 - 0.66));
    return lerp(videoSlotR.current.y, centerR.current.y, t);
  });
  const v3W = useTransform(p, (v) => {
    const t = clamp((v - 0.66) / (0.78 - 0.66));
    return lerp(videoSlotR.current.w || 64, centerR.current.w, t);
  });
  const v3H = useTransform(p, (v) => {
    const t = clamp((v - 0.66) / (0.78 - 0.66));
    return lerp(videoSlotR.current.h || 64, centerR.current.h, t);
  });
  const v3Radius = useTransform(p, [0.66, 0.78], [12, 18]);
  const v3Opacity = useTransform(p, [0.66, 0.70], [0, 1]);

  const [mountV3, setMountV3] = useState(false);
  useMotionValueEvent(p, "change", (v) => {
    if (v > 0.45 && !mountV3) setMountV3(true);
  });

  // ---------------------- REDUCED MOTION FALLBACK ----------------------
  if (reduce) {
    return (
      <section className="bg-white text-ink py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display font-extrabold tracking-tight text-3xl md:text-5xl leading-[1.05] text-ink">
            Edit any video with{" "}
            <span className="font-serif italic font-normal">a sentence</span>.
          </h2>
          <video
            src={VIDEO_3_SRC}
            autoPlay muted loop playsInline
            className="mt-10 w-full max-w-md mx-auto aspect-[9/16] object-cover rounded-2xl"
          />
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Mobile fallback */}
      <section className="bg-white text-ink py-16 md:hidden">
        <div className="max-w-md mx-auto px-5 text-center">
          <h2 className="font-display font-extrabold text-ink tracking-tight text-3xl leading-[1.05]">
            Edit any video with{" "}
            <span className="font-serif italic font-normal">a sentence</span>.
          </h2>
          <p className="mt-3 text-ink/70 text-[14px]">
            Drop a clip. Add a product. Type the change. Korsola handles the rest.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <video src={VIDEO_1_SRC} autoPlay muted loop playsInline className="aspect-[9/16] w-full object-cover rounded-2xl" />
            <video src={VIDEO_3_SRC} autoPlay muted loop playsInline className="aspect-[9/16] w-full object-cover rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Desktop scroll-pinned scene */}
      <section
        ref={sectionRef}
        data-edit-scene
        className="relative hidden md:block"
        style={{ height: "650vh" }}
      >
        <motion.div
          ref={stageRef}
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ backgroundColor: bgColor }}
        >
          {/* HEADING — above the centered video on white bg */}
          <motion.div
            className="absolute inset-x-0 top-[6%] z-30 px-6 text-center pointer-events-none"
            style={{ opacity: headingOpacity, color: headingColor }}
          >
            <h2 className="font-display font-extrabold tracking-tight text-4xl md:text-6xl lg:text-7xl leading-[1.02]">
              Edit any video with{" "}
              <span className="font-serif italic font-normal">a sentence</span>.
            </h2>
            <motion.p
              className="mt-3 text-[15px] md:text-[17px] max-w-xl mx-auto"
              style={{ color: headingColor, opacity: 0.7 }}
            >
              Drop a clip. Add a product. Type the change. Korsola handles the rest.
            </motion.p>
          </motion.div>

          {/* VIDEO 1 — centered 9:16 → chip */}
          <motion.div
            className="absolute top-0 left-0 overflow-hidden bg-black z-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]"
            style={{
              x: v1X, y: v1Y, width: v1W, height: v1H, borderRadius: v1Radius,
            }}
          >
            <video
              src={VIDEO_1_SRC}
              autoPlay muted loop playsInline preload="metadata"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* PROMPT BAR */}
          <motion.div
            ref={barWrapRef}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 px-6"
            style={{ opacity: barOpacity }}
          >
            <PromptBarMock
              slots={slots}
              promptText={PROMPT_TEXT}
              typingProgress={typingProgress}
              productOpacity={productOpacity}
              generating={generating}
              generatePressed={pressed}
            />
          </motion.div>

          {/* CHANEL image being dragged in by cursor */}
          <motion.div
            className="absolute top-0 left-0 w-16 h-16 rounded-xl overflow-hidden border border-white/30 shadow-2xl z-[55] pointer-events-none"
            style={{ x: chanelX, y: chanelY, opacity: chanelOpacity }}
          >
            <img src="/videos/edit-scene/chanel.jpg" alt="" className="w-full h-full object-cover" />
          </motion.div>

          {/* FAKE CURSOR */}
          <FakeCursor x={cursorX} y={cursorY} opacity={cursorOpacity} pressed={pressed ? 1 : 0} />

          {/* VIDEO 3 — chip → centered 9:16 (same dims as video1) */}
          {mountV3 && (
            <motion.div
              className="absolute top-0 left-0 overflow-hidden bg-black z-40 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]"
              style={{
                x: v3X, y: v3Y, width: v3W, height: v3H,
                borderRadius: v3Radius,
                opacity: complete ? v3Opacity : 0,
                pointerEvents: complete ? "auto" : "none",
              }}
            >
              <video
                src={VIDEO_3_SRC}
                autoPlay muted loop playsInline preload="auto"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </motion.div>
      </section>
    </>
  );
}
