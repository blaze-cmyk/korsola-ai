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
      playTimerRef.current = window.setTimeout(latchPlayed, 11000);
    }
    // Hard scroll fallback — if user blew past, latch immediately
    if (v >= 0.28 && !played) {
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
      if (!played && el.currentTime >= 11) latchPlayed();
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
  // Centered from start (fades in). After `played`, docks into the bar slot
  // over a generous 0.00 → 0.12 lp window so it FINISHES before the cursor enters.
  const SHRINK = 0.12;
  const v1X = useTransform(p, (v) => {
    if (!played || playedAtP == null) return m.center.x;
    const t = clamp((v - playedAtP) / SHRINK);
    return lerp(m.center.x, m.videoSlot.x, t);
  });
  const v1Y = useTransform(p, (v) => {
    if (!played || playedAtP == null) return m.center.y;
    const t = clamp((v - playedAtP) / SHRINK);
    return lerp(m.center.y, m.videoSlot.y, t);
  });
  const v1W = useTransform(p, (v) => {
    if (!played || playedAtP == null) return m.center.w;
    const t = clamp((v - playedAtP) / SHRINK);
    return lerp(m.center.w, m.videoSlot.w || 88, t);
  });
  const v1H = useTransform(p, (v) => {
    if (!played || playedAtP == null) return m.center.h;
    const t = clamp((v - playedAtP) / SHRINK);
    return lerp(m.center.h, m.videoSlot.h || 88, t);
  });
  const v1Radius = useTransform(p, (v) => {
    if (!played || playedAtP == null) return 22;
    const t = clamp((v - playedAtP) / SHRINK);
    return lerp(22, 12, t);
  });
  const v1Opacity = useTransform(p, VIDEO_IN, [0, 1]);

  const labelOpacity = useTransform(p, (v) => {
    const inT = clamp((v - VIDEO_IN[0]) / (VIDEO_IN[1] - VIDEO_IN[0]));
    if (!played || playedAtP == null) return inT;
    const outT = clamp((v - playedAtP) / 0.04);
    return inT * (1 - outT);
  });

  // ============ ACT II/III timeline ============
  // lp is normalized to remaining scroll AFTER played latches, so it always
  // spans 0 → 1 regardless of where playedAtP landed.
  // 0.00 → 0.12  video1 shrinks into slot + bg darken + bar fade in
  // 0.18 → 0.30  cursor enters off-right (carrying Chanel) toward product slot
  // 0.30 → 0.34  cursor + Chanel land on product slot, Chanel docks
  // 0.36 → 0.50  cursor moves to textarea
  // 0.50 → 0.66  prompt types out
  // 0.66 → 0.74  cursor moves to GENERATE
  // 0.74 → 0.77  press flash
  // 0.74 → 0.88  queue card visible (generating)
  // 0.88 → 0.94  video3 reveals at center
  const PA = playedAtP ?? 0;
  const lp = (v: number) => {
    const remain = 1 - PA;
    if (remain <= 0.0001) return 1;
    return clamp((v - PA) / remain);
  };

  const barOpacity = useTransform(p, (v) => {
    if (!played) return 0;
    return clamp((lp(v) - 0.02) / 0.08);
  });

  const cursorOpacity = useTransform(p, (v) => {
    if (!played) return 0;
    const l = lp(v);
    if (l < 0.18 || l > 0.78) return 0;
    return 1;
  });
  const cursorX = useTransform(p, (v) => {
    if (!played) return 0;
    const l = lp(v);
    const stageW = m.stage.w;
    if (l < 0.18) return stageW + 80;
    if (l < 0.34) {
      const t = clamp((l - 0.18) / 0.16);
      return lerp(stageW + 80, m.productSlot.x + m.productSlot.w / 2, t);
    }
    if (l < 0.50) {
      const t = clamp((l - 0.36) / 0.14);
      return lerp(m.productSlot.x + m.productSlot.w / 2, m.textarea.x + 24, t);
    }
    if (l < 0.74) {
      const t = clamp((l - 0.66) / 0.08);
      return lerp(m.textarea.x + 24, m.generate.x + m.generate.w / 2, t);
    }
    return m.generate.x + m.generate.w / 2;
  });
  const cursorY = useTransform(p, (v) => {
    if (!played) return 0;
    const l = lp(v);
    if (l < 0.18) return m.stage.h * 0.55;
    if (l < 0.34) {
      const t = clamp((l - 0.18) / 0.16);
      return lerp(m.stage.h * 0.55, m.productSlot.y + m.productSlot.h / 2, t);
    }
    if (l < 0.50) {
      const t = clamp((l - 0.36) / 0.14);
      return lerp(m.productSlot.y + m.productSlot.h / 2, m.textarea.y + 18, t);
    }
    if (l < 0.74) {
      const t = clamp((l - 0.66) / 0.08);
      return lerp(m.textarea.y + 18, m.generate.y + m.generate.h / 2, t);
    }
    return m.generate.y + m.generate.h / 2;
  });

  // Chanel image rides with the cursor from off-right → product slot, then drops
  const chanelOpacity = useTransform(p, (v) => {
    if (!played) return 0;
    const l = lp(v);
    if (l < 0.18 || l > 0.345) return 0;
    return 1;
  });
  const chanelX = useTransform(p, () => cursorX.get() - 32);
  const chanelY = useTransform(p, () => cursorY.get() - 32);

  // Product slot icon reveal once dropped
  const productOpacity = useTransform(p, (v) => {
    if (!played) return 0;
    return clamp((lp(v) - 0.335) / 0.02);
  });

  // Typewriter progress
  const typingProgress = useTransform(p, (v) => {
    if (!played) return 0;
    return clamp((lp(v) - 0.50) / 0.16);
  });

  // Generate press flash
  const [pressed, setPressed] = useState(false);
  useMotionValueEvent(p, "change", (v) => {
    if (!played) return setPressed(false);
    const l = lp(v);
    setPressed(l >= 0.74 && l < 0.77);
  });

  // Generating queue + complete
  const [generating, setGenerating] = useState(false);
  const [complete, setComplete] = useState(false);
  useMotionValueEvent(p, "change", (v) => {
    if (!played) {
      setGenerating(false);
      setComplete(false);
      return;
    }
    const l = lp(v);
    setGenerating(l >= 0.74 && l < 0.88);
    setComplete(l >= 0.88);
  });

  // Video3 reveal (behind the bar at first)
  const v3Opacity = useTransform(p, (v) => {
    if (!played) return 0;
    return clamp((lp(v) - 0.88) / 0.06);
  });

  // ============ ACT IV — bar exits, video3 rises to hero ============
  // 0.94 → 1.00  prompt bar slides up + scales down + fades; video3 slides up
  const ACT4_IN = 0.94;
  const ACT4_OUT = 1.0;
  const barExitOpacity = useTransform(p, (v) => {
    if (!played) return 0;
    const l = lp(v);
    const fadeIn = clamp((l - 0.02) / 0.08);
    const fadeOut = clamp((l - ACT4_IN) / (ACT4_OUT - ACT4_IN));
    return fadeIn * (1 - fadeOut);
  });
  const barScale = useTransform(p, (v) => {
    if (!played) return 1;
    const t = clamp((lp(v) - ACT4_IN) / (ACT4_OUT - ACT4_IN));
    return lerp(1, 0.82, t);
  });
  const barY = useTransform(p, (v) => {
    if (!played) return 0;
    const t = clamp((lp(v) - ACT4_IN) / (ACT4_OUT - ACT4_IN));
    return lerp(0, -160, t);
  });
  const v3RiseY = useTransform(p, (v) => {
    if (!played) return 0;
    const t = clamp((lp(v) - ACT4_IN) / (ACT4_OUT - ACT4_IN));
    return lerp(0, -80, t);
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
        style={{ height: "1400vh" }}
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

          {/* PROMPT BAR */}
          <motion.div
            ref={barWrapRef}
            className="absolute inset-x-0 top-1/2 z-[20] px-6"
            style={{
              opacity: barExitOpacity,
              y: barY,
              scale: barScale,
              translateY: "-50%",
              transformOrigin: "center center",
            }}
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

          {/* CHANEL image being dragged in */}
          <motion.div
            className="absolute top-0 left-0 w-16 h-16 rounded-xl overflow-hidden border border-white/30 shadow-2xl z-[55] pointer-events-none"
            style={{ x: chanelX, y: chanelY, opacity: chanelOpacity }}
          >
            <img src="/videos/edit-scene/chanel.jpg" alt="" className="w-full h-full object-cover" />
          </motion.div>

          {/* FAKE CURSOR */}
          <FakeCursor x={cursorX} y={cursorY} opacity={cursorOpacity} pressed={pressed ? 1 : 0} />

          {/* QUEUE CARD */}
          {generating && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute top-0 left-0 overflow-hidden z-[35] bg-[#0f0f10] border border-white/10 grid place-items-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
              style={{
                x: m.center.x,
                y: m.center.y,
                width: m.center.w,
                height: m.center.h,
                borderRadius: 18,
              }}
            >
              <div className="flex flex-col items-center gap-3 text-white/85">
                <span className="relative grid place-items-center w-9 h-9">
                  <span className="absolute inset-0 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                </span>
                <span className="text-[12px] font-semibold tracking-[0.18em] uppercase">In queue · Generating</span>
                <span className="text-[11px] text-white/55">UGC · 9:16 · 720p · 8s</span>
              </div>
            </motion.div>
          )}

          {/* VIDEO 3 — final result at centered rect */}
          {complete && (
            <motion.div
              className="absolute top-0 left-0 overflow-hidden bg-black z-[40] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]"
              style={{
                x: m.center.x,
                y: m.center.y,
                width: m.center.w,
                height: m.center.h,
                borderRadius: 18,
                opacity: v3Opacity,
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
        </motion.div>
      </section>
    </>
  );
}
