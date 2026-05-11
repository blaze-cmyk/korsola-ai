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

/** Centered 9:16 portrait — generous size so heading sits above with breathing room. */
function centerRect(stageW: number, stageH: number): Rect {
  const w = Math.min(420, stageW * 0.5, ((stageH - 220) * 9) / 16);
  const h = (w * 16) / 9;
  const y = Math.max(120, (stageH - h) / 2 + 32);
  const x = (stageW - w) / 2;
  return { x, y, w, h };
}

// ---- Scroll choreography (Act I only — rest will be wired next) ----
// 0.00 → 0.06   heading only, white bg, no video
// 0.06 → 0.18   video1 slides up into centered rect, "Existing video" label fades in
// 0.18 → ???    HOLD (latched). Video1 plays through to 6s. Bar STILL HIDDEN.
//               During hold the heading fades out so attention is on the clip.
// playedAt → +0.18  Shrink + bg darken + prompt-bar reveal
// (subsequent acts kept from previous version, gated behind `played`)
const HEAD_OUT = [0.10, 0.18];
const VIDEO_IN = [0.06, 0.18];

export function LpEditScene() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const barWrapRef = useRef<HTMLDivElement>(null);
  const v1Ref = useRef<HTMLVideoElement>(null);

  const slots: SlotRefs = {
    bar: useRef<HTMLDivElement>(null),
    videoSlot: useRef<HTMLDivElement>(null),
    productSlot: useRef<HTMLDivElement>(null),
    textarea: useRef<HTMLDivElement>(null),
    generate: useRef<HTMLDivElement>(null),
  };

  type Measured = {
    stage: { w: number; h: number };
    center: Rect;
    videoSlot: Rect;
    productSlot: Rect;
    textarea: Rect;
    generate: Rect;
  };
  const [m, setM] = useState<Measured>({
    stage: { w: 0, h: 0 },
    center: ZERO,
    videoSlot: ZERO,
    productSlot: ZERO,
    textarea: ZERO,
    generate: ZERO,
  });

  useEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const sr = stage.getBoundingClientRect();
      const next: Measured = {
        stage: { w: sr.width, h: sr.height },
        center: centerRect(sr.width, sr.height),
        videoSlot: rectFor(stage, slots.videoSlot.current),
        productSlot: rectFor(stage, slots.productSlot.current),
        textarea: rectFor(stage, slots.textarea.current),
        generate: rectFor(stage, slots.generate.current),
      };
      setM((prev) => {
        if (
          prev.stage.w === next.stage.w &&
          prev.stage.h === next.stage.h &&
          prev.videoSlot.x === next.videoSlot.x &&
          prev.videoSlot.y === next.videoSlot.y &&
          prev.productSlot.x === next.productSlot.x &&
          prev.generate.x === next.generate.x
        )
          return prev;
        return next;
      });
    };
    measure();
    const t1 = window.setTimeout(measure, 60);
    const t2 = window.setTimeout(measure, 240);
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    if (barWrapRef.current) ro.observe(barWrapRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  // --- scroll progress ---
  // Section height is large so each phase has room to breathe slowly.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const p = scrollYProgress;

  // --- Video1 playback control ---
  // Starts when scroll first passes the "centered" threshold; latches `played`
  // when timeupdate reaches 6s. While !played, all later phases are frozen.
  const [v1Started, setV1Started] = useState(false);
  const [played, setPlayed] = useState(false);
  const [playedAtP, setPlayedAtP] = useState<number | null>(null);

  useMotionValueEvent(p, "change", (v) => {
    if (v >= VIDEO_IN[1] && !v1Started) {
      setV1Started(true);
      const el = v1Ref.current;
      if (el) {
        el.currentTime = 0;
        el.play().catch(() => {});
      }
    }
    // Reverse: if user scrolls fully back, reset (so re-entry replays)
    if (v < 0.04 && (v1Started || played)) {
      setV1Started(false);
      setPlayed(false);
      setPlayedAtP(null);
      const el = v1Ref.current;
      if (el) {
        el.pause();
        el.currentTime = 0;
      }
    }
  });

  useEffect(() => {
    const el = v1Ref.current;
    if (!el) return;
    const onTime = () => {
      if (!played && el.currentTime >= 6) {
        setPlayed(true);
        setPlayedAtP(p.get());
        // freeze on last visible frame
        el.pause();
      }
    };
    el.addEventListener("timeupdate", onTime);
    return () => el.removeEventListener("timeupdate", onTime);
  }, [played, p]);

  // --- BACKGROUND: white → dark — only after played ---
  const bgColor = useTransform(p, (v) => {
    if (!played || playedAtP == null) return "rgb(255,255,255)";
    const t = clamp((v - playedAtP) / 0.08);
    // simple lerp between white and ink
    const r = Math.round(lerp(255, 11, t));
    const g = Math.round(lerp(255, 11, t));
    const b = Math.round(lerp(255, 12, t));
    return `rgb(${r},${g},${b})`;
  });

  // --- VIDEO 1 transforms ---
  // Phase A: slide up + fade in (offscreen below → centered).
  // Phase B (after played): centered → docked into bar slot.
  const v1X = useTransform(p, (v) => {
    if (!played || playedAtP == null) return m.center.x;
    const t = clamp((v - playedAtP) / 0.18);
    return lerp(m.center.x, m.videoSlot.x, t);
  });
  const v1Y = useTransform(p, (v) => {
    // slide up: starts 80px below center, ends at center
    if (!played || playedAtP == null) {
      const tIn = clamp((v - VIDEO_IN[0]) / (VIDEO_IN[1] - VIDEO_IN[0]));
      return lerp(m.center.y + 80, m.center.y, tIn);
    }
    const t = clamp((v - playedAtP) / 0.18);
    return lerp(m.center.y, m.videoSlot.y, t);
  });
  const v1W = useTransform(p, (v) => {
    if (!played || playedAtP == null) return m.center.w;
    const t = clamp((v - playedAtP) / 0.18);
    return lerp(m.center.w, m.videoSlot.w || 88, t);
  });
  const v1H = useTransform(p, (v) => {
    if (!played || playedAtP == null) return m.center.h;
    const t = clamp((v - playedAtP) / 0.18);
    return lerp(m.center.h, m.videoSlot.h || 88, t);
  });
  const v1Radius = useTransform(p, (v) => {
    if (!played || playedAtP == null) return 22;
    const t = clamp((v - playedAtP) / 0.18);
    return lerp(22, 12, t);
  });
  const v1Opacity = useTransform(p, VIDEO_IN, [0, 1]);

  // "Existing video" label — sits ABOVE the centered clip in Playfair italic,
  // fades in with the clip, fades out as the clip starts shrinking.
  const labelOpacity = useTransform(p, (v) => {
    const inT = clamp((v - VIDEO_IN[0]) / (VIDEO_IN[1] - VIDEO_IN[0]));
    if (!played || playedAtP == null) return inT;
    const outT = clamp((v - playedAtP) / 0.06);
    return inT * (1 - outT);
  });

  // Heading: visible at start, fades out as video takes over
  const headingOpacity = useTransform(p, [HEAD_OUT[0], HEAD_OUT[1]], [1, 0]);

  // --- Prompt Bar reveal — STRICTLY after played ---
  const barOpacity = useTransform(p, (v) => {
    if (!played || playedAtP == null) return 0;
    const t = clamp((v - (playedAtP + 0.04)) / 0.10);
    return t;
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
            <video
              src={VIDEO_1_SRC}
              autoPlay
              muted
              loop
              playsInline
              className="aspect-[9/16] w-full object-cover rounded-2xl"
            />
            <video
              src={VIDEO_3_SRC}
              autoPlay
              muted
              loop
              playsInline
              className="aspect-[9/16] w-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Desktop scroll-pinned scene — generous height keeps the pace slow */}
      <section
        ref={sectionRef}
        data-edit-scene
        className="relative hidden md:block"
        style={{ height: "900vh" }}
      >
        <motion.div
          ref={stageRef}
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ backgroundColor: bgColor }}
        >
          {/* HEADING */}
          <motion.div
            className="absolute inset-x-0 top-[12%] z-30 px-6 text-center pointer-events-none"
            style={{ opacity: headingOpacity }}
          >
            <h2 className="font-display font-extrabold tracking-tight text-4xl md:text-6xl lg:text-7xl leading-[1.02] text-ink">
              Edit any video with{" "}
              <span className="font-serif italic font-normal">a sentence</span>.
            </h2>
            <p className="mt-3 text-[15px] md:text-[17px] max-w-xl mx-auto text-ink/70">
              Drop a clip. Add a product. Type the change. Korsola handles the rest.
            </p>
          </motion.div>

          {/* "Existing video" label — sits ABOVE the centered clip in Playfair italic */}
          <motion.div
            className="absolute z-30 pointer-events-none text-center"
            style={{
              left: m.center.x,
              top: Math.max(60, m.center.y - 56),
              width: m.center.w,
              opacity: labelOpacity,
            }}
          >
            <span className="font-serif italic text-ink/80 text-[20px] md:text-[24px] tracking-tight">
              existing video
            </span>
          </motion.div>

          {/* PROMPT BAR (hidden until played) */}
          <motion.div
            ref={barWrapRef}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-[5] px-6"
            style={{ opacity: barOpacity }}
          >
            <PromptBarMock
              slots={slots}
              promptText={PROMPT_TEXT}
              typingProgress={useTransform(p, () => 0)}
              productOpacity={useTransform(p, () => 0)}
              generating={false}
              generatePressed={false}
            />
          </motion.div>

          {/* VIDEO 1 */}
          <motion.div
            className="absolute top-0 left-0 overflow-hidden bg-black z-[10] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)]"
            style={{
              x: v1X,
              y: v1Y,
              width: v1W,
              height: v1H,
              borderRadius: v1Radius,
              opacity: v1Opacity,
            }}
          >
            <video
              ref={v1Ref}
              src={VIDEO_1_SRC}
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
