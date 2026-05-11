import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
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

export function LpEditScene() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const barWrapRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(false);

  const slots: SlotRefs = {
    bar: useRef<HTMLDivElement>(null),
    videoSlot: useRef<HTMLDivElement>(null),
    productSlot: useRef<HTMLDivElement>(null),
    textarea: useRef<HTMLDivElement>(null),
    generate: useRef<HTMLDivElement>(null),
  };

  // --- measured rects in stage-local coords -----------------------------
  const stageSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
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
      isMobileRef.current = sr.width < 768;
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

  // --- scroll progress ---------------------------------------------------
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const p = scrollYProgress;

  // --- generation latch (Act V → Act VI) --------------------------------
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

  // --- VIDEO 1 transforms (full-bleed → small chip) ---------------------
  // Act I (0 → 0.16) hold full bleed; Act II (0.16 → 0.30) shrink into slot.
  const v1Style = {
    x: useTransform(p, (v) => {
      const t = clamp((v - 0.16) / (0.3 - 0.16));
      return lerp(0, videoSlotR.current.x, t);
    }),
    y: useTransform(p, (v) => {
      const t = clamp((v - 0.16) / (0.3 - 0.16));
      return lerp(0, videoSlotR.current.y, t);
    }),
    width: useTransform(p, (v) => {
      const t = clamp((v - 0.16) / (0.3 - 0.16));
      return lerp(stageSize.current.w, videoSlotR.current.w || 64, t);
    }),
    height: useTransform(p, (v) => {
      const t = clamp((v - 0.16) / (0.3 - 0.16));
      return lerp(stageSize.current.h, videoSlotR.current.h || 64, t);
    }),
    borderRadius: useTransform(p, (v) => {
      const t = clamp((v - 0.16) / (0.3 - 0.16));
      return lerp(0, 12, t);
    }),
  };

  // --- PromptBar opacity / lift ----------------------------------------
  const barOpacity = useTransform(p, [0.14, 0.22, 0.85, 0.95], [0, 1, 1, 0]);
  const barY = useTransform(p, [0.14, 0.22], [40, 0]);
  const productOpacity = useTransform(p, [0.32, 0.42], [0, 1]);

  // --- FakeCursor path: off-right → product slot → textarea → generate --
  const cursorX = useTransform(p, (v) => {
    const stageW = stageSize.current.w;
    if (v < 0.30) return stageW + 80;
    if (v < 0.42) {
      const t = clamp((v - 0.3) / 0.12);
      return lerp(stageW + 80, productSlotR.current.x + productSlotR.current.w / 2, t);
    }
    if (v < 0.46) {
      const t = clamp((v - 0.42) / 0.04);
      return lerp(
        productSlotR.current.x + productSlotR.current.w / 2,
        textareaR.current.x + 24,
        t,
      );
    }
    if (v < 0.6) {
      const t = clamp((v - 0.46) / 0.14);
      return lerp(
        textareaR.current.x + 24,
        generateR.current.x + generateR.current.w / 2,
        t,
      );
    }
    return generateR.current.x + generateR.current.w / 2;
  });
  const cursorY = useTransform(p, (v) => {
    if (v < 0.30) return productSlotR.current.y + productSlotR.current.h / 2;
    if (v < 0.42) {
      const t = clamp((v - 0.3) / 0.12);
      return lerp(
        productSlotR.current.y + productSlotR.current.h / 2,
        productSlotR.current.y + productSlotR.current.h / 2,
        t,
      );
    }
    if (v < 0.46) {
      const t = clamp((v - 0.42) / 0.04);
      return lerp(
        productSlotR.current.y + productSlotR.current.h / 2,
        textareaR.current.y + 16,
        t,
      );
    }
    if (v < 0.6) {
      const t = clamp((v - 0.46) / 0.14);
      return lerp(
        textareaR.current.y + 16,
        generateR.current.y + generateR.current.h / 2,
        t,
      );
    }
    return generateR.current.y + generateR.current.h / 2;
  });
  const cursorOpacity = useTransform(p, [0.28, 0.32, 0.62, 0.66], [0, 1, 1, 0]);

  // Typing progress is an isolated motion value mapped from p
  const typingProgress = useTransform(p, [0.46, 0.6], [0, 1]);

  // Pressed state for Generate button (visual click)
  const [pressed, setPressed] = useState(false);
  useMotionValueEvent(p, "change", (v) => setPressed(v >= 0.595 && v < 0.615));

  // --- VIDEO 3 transforms (small in slot → full bleed) ------------------
  const v3Visible = complete; // gated by generation finish
  const v3Style = {
    x: useTransform(p, (v) => {
      const t = clamp((v - 0.66) / (0.86 - 0.66));
      return lerp(videoSlotR.current.x, 0, t);
    }),
    y: useTransform(p, (v) => {
      const t = clamp((v - 0.66) / (0.86 - 0.66));
      return lerp(videoSlotR.current.y, 0, t);
    }),
    width: useTransform(p, (v) => {
      const t = clamp((v - 0.66) / (0.86 - 0.66));
      return lerp(videoSlotR.current.w || 64, stageSize.current.w, t);
    }),
    height: useTransform(p, (v) => {
      const t = clamp((v - 0.66) / (0.86 - 0.66));
      return lerp(videoSlotR.current.h || 64, stageSize.current.h, t);
    }),
    borderRadius: useTransform(p, (v) => {
      const t = clamp((v - 0.66) / (0.86 - 0.66));
      return lerp(12, 0, t);
    }),
    opacity: useTransform(p, [0.66, 0.7], [0, 1]),
  };

  // --- Heading fade ----------------------------------------------------
  const headingOpacity = useTransform(p, [0, 0.55, 0.62, 0.92, 0.98], [1, 1, 0.6, 0.6, 0]);
  const headingScale = useTransform(p, [0, 0.3], [1, 0.92]);

  // --- Mount Video3 lazily ---------------------------------------------
  const [mountV3, setMountV3] = useState(false);
  useMotionValueEvent(p, "change", (v) => {
    if (v > 0.45 && !mountV3) setMountV3(true);
  });

  // ---------------------- REDUCED MOTION FALLBACK -----------------------
  if (reduce) {
    return (
      <section className="bg-ink text-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display font-extrabold tracking-tight text-3xl md:text-5xl leading-[1.05]">
            Edit any video with{" "}
            <span className="font-serif italic font-normal">a sentence</span>.
          </h2>
          <video
            src={VIDEO_3_SRC}
            autoPlay
            muted
            loop
            playsInline
            className="mt-10 w-full max-w-md mx-auto aspect-[9/16] object-cover rounded-2xl"
          />
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Mobile fallback — static stacked card */}
      <section className="bg-ink text-white py-16 md:hidden">
        <div className="max-w-md mx-auto px-5 text-center">
          <h2 className="font-display font-extrabold text-white tracking-tight text-3xl leading-[1.05]">
            Edit any video with{" "}
            <span className="font-serif italic font-normal">a sentence</span>.
          </h2>
          <p className="mt-3 text-white/75 text-[14px]">
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
        className="relative bg-ink text-white hidden md:block"
        style={{ height: "600vh" }}
      >
      <div
        ref={stageRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* VIDEO 1 — full bleed → chip */}
        <motion.div
          className="absolute top-0 left-0 overflow-hidden bg-black z-10"
          style={{
            x: v1Style.x,
            y: v1Style.y,
            width: v1Style.width,
            height: v1Style.height,
            borderRadius: v1Style.borderRadius,
          }}
        >
          <video
            src={VIDEO_1_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/30 pointer-events-none" />
        </motion.div>

        {/* HEADING — sits over video1 in Act I */}
        <motion.div
          className="absolute inset-x-0 top-[12%] z-30 px-6 text-center pointer-events-none"
          style={{ opacity: headingOpacity, scale: headingScale }}
        >
          <h2 className="font-display font-extrabold text-white tracking-tight text-4xl md:text-6xl lg:text-7xl leading-[1.02] drop-shadow-[0_6px_30px_rgba(0,0,0,0.6)]">
            Edit any video with{" "}
            <span className="font-serif italic font-normal">a sentence</span>.
          </h2>
          <p className="mt-4 text-white/75 text-[15px] md:text-[17px] max-w-xl mx-auto">
            Drop a clip. Add a product. Type the change. Korsola handles the rest.
          </p>
        </motion.div>

        {/* PROMPT BAR — centered, fades in Act II */}
        <motion.div
          ref={barWrapRef}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 px-6"
          style={{ opacity: barOpacity, y: barY }}
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

        {/* FAKE CURSOR */}
        <FakeCursor
          x={cursorX}
          y={cursorY}
          opacity={cursorOpacity}
          pressed={pressed ? 1 : 0}
        />

        {/* VIDEO 3 — slot → full bleed (mounts after typing) */}
        {mountV3 && (
          <motion.div
            className="absolute top-0 left-0 overflow-hidden bg-black z-40"
            style={{
              x: v3Style.x,
              y: v3Style.y,
              width: v3Style.width,
              height: v3Style.height,
              borderRadius: v3Style.borderRadius,
              opacity: v3Visible ? v3Style.opacity : 0,
              pointerEvents: v3Visible ? "auto" : "none",
            }}
          >
            <video
              src={VIDEO_3_SRC}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </div>
      </section>
    </>
  );
}
