import { VolumeX } from "lucide-react";

type Props = {
  src: string;
  caption?: string;
  className?: string;
};

export function VideoReel({ src, caption, className = "" }: Props) {
  return (
    <div
      className={`relative aspect-[9/16] shrink-0 rounded-2xl overflow-hidden bg-black shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] ${className}`}
    >
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <span className="absolute top-2 right-2 z-10 grid place-items-center w-7 h-7 rounded-full bg-white/85 backdrop-blur text-black/80 shadow">
        <VolumeX className="w-3.5 h-3.5" />
      </span>
      {caption && (
        <span className="absolute z-10 bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-black/40 backdrop-blur-sm text-white text-[12px] font-semibold text-center max-w-[92%] leading-tight drop-shadow">
          {caption}
        </span>
      )}
    </div>
  );
}
