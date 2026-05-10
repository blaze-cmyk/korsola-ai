import { useEffect, useRef, useState } from "react";

const VIDEOS = [
  "/videos/actors/studio_1.mp4",
  "/videos/actors/studio_2.mp4",
  "/videos/actors/studio_3.mp4",
  "/videos/actors/studio_4.mp4",
  "/videos/actors/studio_5.mp4",
  "/videos/actors/studio_6.mp4",
];

export function LpMarketingStudioCard() {
  const [index, setIndex] = useState(0);
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);

  // Advance when the active (center) video ends
  const handleEnded = () => {
    setIndex((i) => (i + 1) % VIDEOS.length);
  };

  // Ensure the new main video starts from beginning & plays
  useEffect(() => {
    const v = mainVideoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  }, [index]);

  // visible window: prev, current, next
  const prev = (index - 1 + VIDEOS.length) % VIDEOS.length;
  const next = (index + 1) % VIDEOS.length;

  const slots: { src: string; pos: "left" | "center" | "right"; key: string }[] = [
    { src: VIDEOS[prev], pos: "left", key: `l-${prev}` },
    { src: VIDEOS[index], pos: "center", key: `c-${index}` },
    { src: VIDEOS[next], pos: "right", key: `r-${next}` },
  ];

  return (
    <div
      className="rounded-3xl bg-[#0e0e10] border border-white/10 p-7 w-full mx-auto flex flex-col min-h-[623px]"
      style={{ maxWidth: 486 }}
    >
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-[380px] flex items-center justify-center">
          {slots.map(({ src, pos, key }) => {
            const isCenter = pos === "center";
            const translate =
              pos === "left" ? "-130%" : pos === "right" ? "130%" : "0%";
            return (
              <div
                key={key}
                className="absolute transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: `translateX(${translate}) scale(${isCenter ? 1 : 0.82})`,
                  zIndex: isCenter ? 20 : 10,
                  opacity: isCenter ? 1 : 0.55,
                }}
              >
                <div
                  className="relative rounded-2xl overflow-hidden bg-black shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]"
                  style={{
                    width: isCenter ? 220 : 180,
                    aspectRatio: "9 / 16",
                  }}
                >
                  <video
                    ref={isCenter ? mainVideoRef : undefined}
                    src={src}
                    autoPlay
                    muted
                    loop={!isCenter}
                    playsInline
                    preload="auto"
                    onEnded={isCenter ? handleEnded : undefined}
                    className="w-full h-full object-cover"
                  />
                  {!isCenter && (
                    <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* dots */}
      <div className="mt-3 flex justify-center gap-1.5">
        {VIDEOS.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-4 bg-white/85" : "w-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>

      <div className="mt-6">
        <h3 className="font-display font-extrabold text-white text-2xl">
          Marketing <span className="font-serif italic font-normal">studio</span>
        </h3>
        <p className="mt-2 text-white/60 text-[14px] leading-relaxed">
          No AI slop — generate realistic videos with Seedance 2.0 across every
          format you need: UGC, tutorial, unboxing, podcast, and more.
        </p>
      </div>
    </div>
  );
}
