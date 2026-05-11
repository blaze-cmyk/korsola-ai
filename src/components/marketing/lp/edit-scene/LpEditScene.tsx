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
// Reserve top space for the persistent heading + "existing video" label.
const TOP_RESERVED = 260;
function centerRect(stageW: number, stageH: number): Rect {
  const available = stageH - TOP_RESERVED - 48;
  const h = Math.min(available, 620);
  const w = (h * 9) / 16;
  const y = TOP_RESERVED;
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
// (no heading-fade — heading stays put through the scene)
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

  // Latch played via timeupdate ≥6s OR a 6s wall-clock timer (in case timeupdate
  // is throttled / scroll moves the user past quickly), and as a hard fallback
  // when scroll itself crosses 0.32 — so the bar/dark bg ALWAYS reveals.
  const playTimerRef = useRef<number | null>(null);
  const latchPlayed = () => {
    setPlayed((wasPlayed) => {
      if (wasPlayed) return wasPlayed;
      setPlayedAtP(p.get());
      const el = v1Ref.current;
      if (el) el.pause();
      return true;
    });
  };

  useMotionValueEvent(p, "change", (v) => {
    if (v >= VIDEO_IN[1] && !v1Started) {
      setV1Started(true);
      const el = v1Ref.current;
      if (el) {
        el.currentTime = 0;
        el.play().catch(() => {});
      }
      // wall-clock fallback in case timeupdate never fires reliably
      if (playTimerRef.current) window.clearTimeout(playTimerRef.current);
      playTimerRef.current = window.setTimeout(latchPlayed, 6000);
    }
    // Hard scroll fallback — if user blew past, latch immediately
    if (v >= 0.32 && !played) {
      latchPlayed();
    }
    // Reverse: scrolled fully back → reset
    if (v < 0.04 && (v1Started || played)) {
      if (playTimerRef.current) window.clearTimeout(playTimerRef.current);
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
      if (!played && el.currentTime >= 6) latchPlayed();
    };
    el.addEventListener("timeupdate", onTime);
    return () => el.removeEventListener("timeupdate", onTime);
  }, [played]);

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
  // No slide. Centered from the start, just fades in. After `played`, docks into the bar slot.
  const v1X = useTransform(p, (v) => {
    if (!played || playedAtP == null) return m.center.x;
    const t = clamp((v - playedAtP) / 0.18);
    return lerp(m.center.x, m.videoSlot.x, t);
  });
  const v1Y = useTransform(p, (v) => {
    if (!played || playedAtP == null) return m.center.y;
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

  // "existing video" label below the heading — fades in with the clip,
  // fades out as the clip starts shrinking.
  const labelOpacity = useTransform(p, (v) => {
    const inT = clamp((v - VIDEO_IN[0]) / (VIDEO_IN[1] - VIDEO_IN[0]));
    if (!played || playedAtP == null) return inT;
    const outT = clamp((v - playedAtP) / 0.06);
    return inT * (1 - outT);
  });

  // Heading: stays visible the entire scene (congruent with other sections).

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
        style={{ height: "650vh" }}
      >
        <motion.div
          ref={stageRef}
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ backgroundColor: bgColor }}
        >
          {/* HEADING — always visible, congruent with other sections */}
          <div className="absolute inset-x-0 top-[5%] z-30 px-6 text-center pointer-events-none">
            <h2 className="font-display font-extrabold tracking-tight text-3xl md:text-5xl lg:text-6xl leading-[1.02] text-ink">
              Edit any video with{" "}
              <span className="font-serif italic font-normal">a sentence</span>.
            </h2>
            <p className="mt-2 text-[14px] md:text-[15px] max-w-xl mx-auto text-ink/60">
              Drop a clip. Add a product. Type the change. Korsola handles the rest.
            </p>
          </div>

          {/* "existing video" label — sits just above the clip, below the heading */}
          <motion.div
            className="absolute z-20 pointer-events-none text-center"
            style={{
              left: m.center.x,
              top: Math.max(180, m.center.y - 38),
              width: m.center.w,
              opacity: labelOpacity,
            }}
          >
            <span className="font-serif italic text-ink/70 text-[18px] md:text-[20px] tracking-tight">
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
