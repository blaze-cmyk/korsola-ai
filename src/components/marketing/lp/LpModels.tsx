import { useState } from "react";

const GoogleG = (props: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 340" className={props.className} aria-hidden="true">
    <path d="M0 170C0 76.3 76.3 0 170 0c37.8 0 73.7 12.2 103.7 35.2l-39.5 51.3c-18.6-14.3-40.8-21.8-64.2-21.8-58.1 0-105.3 47.2-105.3 105.3S111.9 275.3 170 275.3c46.8 0 86.4-30.7 100.2-72.9H170v-64.7h170V170c0 93.7-76.3 170-170 170S0 263.7 0 170" fill="currentColor" />
  </svg>
);

const ElevenIcon = (props: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={props.className} aria-hidden="true">
    <path d="M2 0h6v24H2zM16 0h6v24h-6z" fill="currentColor" />
  </svg>
);

const OpenAIIcon = (props: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={props.className} aria-hidden="true">
    <path d="M22.282 9.821a5.99 5.99 0 0 0-.516-4.91 6.05 6.05 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.99 5.99 0 0 0-3.998 2.9 6.05 6.05 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.05 6.05 0 0 0 6.515 2.9A5.99 5.99 0 0 0 13.26 24a6.06 6.06 0 0 0 5.772-4.206 6 6 0 0 0 3.997-2.9 6.06 6.06 0 0 0-.747-7.073zM13.26 22.43a4.48 4.48 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.8.8 0 0 0 .392-.681v-6.737l2.02 1.168a.07.07 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494M3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.77.77 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646M2.34 7.896a4.5 4.5 0 0 1 2.366-1.973V11.6a.77.77 0 0 0 .388.677l5.815 3.354-2.02 1.168a.08.08 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.08.08 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.78.78 0 0 0-.785 0L9.409 9.23V6.897a.07.07 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.8.8 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5Z" fill="currentColor" />
  </svg>
);

const KlingIcon = (props: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={props.className} aria-hidden="true">
    <path d="M21.973 15.22a287 287 0 0 1-2.218-1.758c-.4-.32-.825-.659-1.347-1.073 3.47-4.107 1.171-7.015-.336-8.523-1.883-1.884-4.869-2.44-7.824-1.922-3.49.613-6.526 2.806-8.331 6.02l-.317.562s3.7 2.937 4.357 3.455c-3.27 4.432-1.227 7.086-.223 8.091 1.477 1.477 3.952 2.296 6.207 2.296.62 0 1.256-.054 1.894-.166 3.49-.613 6.527-2.807 8.333-6.02l.317-.563-.507-.398zM5.264 9.508a317 317 0 0 0-1.706-1.355c1.608-2.515 4.11-4.224 6.948-4.722 1.782-.312 3.51-.112 4.96.548-3.776.91-7.148 3.758-8.802 6.645L5.262 9.507zm4.096-.265c2.787-3.17 6.368-4.578 7.995-3.146s.69 5.163-2.099 8.333c-2.787 3.17-6.368 4.577-7.995 3.146-1.627-1.433-.69-5.164 2.099-8.333m4.213 11.476c-1.783.313-3.509.113-4.96-.547 3.776-.91 7.149-3.758 8.801-6.644.548.435.988.785 1.402 1.116.534.427 1.046.835 1.704 1.355-1.608 2.516-4.109 4.225-6.947 4.722z" fill="currentColor" />
  </svg>
);

const FluxIcon = (props: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 345" className={props.className} aria-hidden="true">
    <path d="M349.391 147.163h-52.114l-52.113-73.418L82.594 302.52h52.227l110.341-155.352h52.113L186.935 302.52h52.369l110.087-155.355v73.417l-58.013 81.949v42.597h-30.154l-.001.002h-52.114l.001-.002h-52.439l-.004.006h-52.113l.004-.006H0L245.164 0zM490 345.13h-52.114l-.001-.002h-30.156v-42.44l-58.338-82.106v-73.417z" fill="currentColor" />
  </svg>
);

const SoraIcon = (props: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={props.className} fill="none" aria-hidden="true">
    <path d="M7.67095 7.21472V5.33148C7.67095 5.17263 7.73032 5.05389 7.86939 4.97473L11.6551 2.79464C12.1707 2.49726 12.7847 2.35873 13.4191 2.35873C15.7976 2.35873 17.3043 4.20239 17.3043 6.16425C17.3043 6.30278 17.3043 6.46164 17.2845 6.61996L13.3597 4.32059C13.1217 4.18207 12.8842 4.18207 12.6462 4.32059L7.67095 7.21472ZM16.5111 14.5487V10.0489C16.5111 9.77135 16.3918 9.57291 16.1544 9.43439L11.1791 6.54026L12.8045 5.60854C12.9431 5.52938 13.0623 5.52938 13.2009 5.60854L16.9866 7.78862C18.0766 8.42297 18.8099 9.77081 18.8099 11.0791C18.8099 12.5852 17.9183 13.9732 16.5106 14.5476L16.5111 14.5487ZM6.50122 10.5843L4.87578 9.63282C4.73725 9.55366 4.67735 9.43439 4.67735 9.27607V4.91536C4.67735 2.79464 6.30278 1.18899 8.5032 1.18899C9.33597 1.18899 10.1088 1.46659 10.763 1.96186L6.85797 4.22165C6.61996 4.36017 6.50122 4.55861 6.50122 4.8362V10.5843ZM9.99973 12.6061L7.67042 11.2978V8.52298L9.99973 7.21472L12.3285 8.52298V11.2978L9.99973 12.6061ZM11.4963 18.6318C10.6635 18.6318 9.89062 18.3542 9.23649 17.859L13.1415 15.5992C13.3795 15.4606 13.4982 15.2622 13.4982 14.9846V9.23649L15.1435 10.188C15.282 10.2672 15.3414 10.3864 15.3414 10.5448V14.9055C15.3414 17.0262 13.6961 18.6318 11.4963 18.6318ZM6.7986 14.2118L3.01286 12.0317C1.92282 11.3973 1.18953 10.0495 1.18953 8.74121C1.18953 7.21472 2.10146 5.84708 3.50868 5.27264V9.79167C3.50868 10.0693 3.62742 10.2677 3.86543 10.4062L8.8209 13.28L7.19546 14.2118C7.05694 14.2909 6.93766 14.2909 6.79913 14.2118H6.7986ZM6.58038 17.4626C4.34038 17.4626 2.69516 15.7778 2.69516 13.6967C2.69516 13.5384 2.71495 13.3795 2.73474 13.2212L6.63975 15.481C6.87776 15.6195 7.11577 15.6195 7.35325 15.481L12.3285 12.6072V14.4904C12.3285 14.6487 12.2691 14.768 12.1301 14.8472L8.34434 17.0278C7.82874 17.3252 7.21472 17.4637 6.58038 17.4637V17.4626ZM11.4963 19.8214C13.8946 19.8214 15.8966 18.1168 16.3528 15.857C18.5725 15.282 20 13.2009 20 11.0801C20 9.69272 19.4052 8.34488 18.335 7.37357C18.4339 6.95745 18.4938 6.5408 18.4938 6.12468C18.4938 3.29045 16.1945 1.1692 13.5384 1.1692C13.0035 1.1692 12.4879 1.24836 11.9723 1.42701C11.0801 0.55465 9.85104 0 8.50373 0C6.10542 0 4.10344 1.7046 3.64721 3.96438C1.42701 4.53935 0 6.62049 0 8.74121C0 10.1286 0.594764 11.4765 1.66502 12.4478C1.56607 12.8639 1.50616 13.2806 1.50616 13.6967C1.50616 16.5309 3.80553 18.6522 6.46164 18.6522C6.9965 18.6522 7.5121 18.573 8.02771 18.3944C8.91985 19.2667 10.1484 19.8214 11.4963 19.8214Z" fill="currentColor" />
  </svg>
);

type Model = {
  name: string;
  Icon: (p: { className?: string }) => JSX.Element;
  media: string;
  type: "video" | "image";
};

const models: Model[] = [
  { name: "ChatGPT", Icon: OpenAIIcon, media: "/videos/models/chatgpt.png", type: "image" },
  { name: "Nano Banana 2", Icon: GoogleG, media: "/videos/models/nano-banana-2.webm", type: "video" },
  { name: "Veo", Icon: GoogleG, media: "/videos/models/veo.webm", type: "video" },
  { name: "Kling 3.0", Icon: KlingIcon, media: "/videos/models/kling.webm", type: "video" },
  { name: "Flux", Icon: FluxIcon, media: "/videos/models/flux.webm", type: "video" },
  { name: "ElevenLabs", Icon: ElevenIcon, media: "/videos/models/elevenlabs.png", type: "image" },
  { name: "Nano Banana Pro", Icon: GoogleG, media: "/videos/models/nano-banana-pro.png", type: "image" },
  { name: "Sora 2 Pro", Icon: SoraIcon, media: "/videos/models/sora.png", type: "image" },
];

export function LpModels() {
  const [active, setActive] = useState<number>(1);

  return (
    <section className="bg-white py-20 md:py-28" style={{ fontFamily: "Manrope, sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="font-extrabold text-[#0f0f10] tracking-tight text-4xl md:text-6xl leading-[1.05]"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          With all the{" "}
          <span className="italic font-normal" style={{ fontFamily: "'Playfair Display', serif" }}>
            latest models
          </span>
        </h2>
        <p className="mt-5 text-[#5b5b60] text-[16px] md:text-[18px] max-w-xl mx-auto leading-relaxed">
          Get access to the world's leading AI companies so you never have to choose
          between the best models and the easiest workflow.
        </p>
      </div>

      {/* Desktop expand-on-hover slider */}
      <div className="hidden md:flex mt-14 gap-3 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto h-[420px]">
        {models.map((m, i) => {
          const isActive = active === i;
          return (
            <div
              key={m.name}
              onMouseEnter={() => setActive(i)}
              className={`relative rounded-2xl overflow-hidden bg-[#f4f1ec] cursor-pointer transition-[flex-grow,flex-basis] duration-700 ease-out ${
                isActive ? "flex-[4]" : "flex-[1]"
              }`}
            >
              {/* Media */}
              <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}>
                {m.type === "video" ? (
                  <video
                    src={m.media}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src={m.media} alt={m.name} className="w-full h-full object-cover" />
                )}
              </div>

              {/* Label */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-5 flex items-center gap-2 ${
                  isActive ? "text-white" : "text-[#0f0f10]"
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                )}
                <div className="relative flex items-center gap-2 whitespace-nowrap">
                  <m.Icon className="w-4 h-4 shrink-0" />
                  <span className="font-semibold text-[15px]">{m.name}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile horizontal scroll */}
      <div className="md:hidden mt-10 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-6 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {models.map((m) => (
          <div
            key={m.name}
            className="snap-start shrink-0 w-[260px] aspect-[3/4] rounded-2xl overflow-hidden relative bg-[#f4f1ec]"
          >
            {m.type === "video" ? (
              <video
                src={m.media}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <img src={m.media} alt={m.name} className="absolute inset-0 w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2 text-white">
              <m.Icon className="w-4 h-4 shrink-0" />
              <span className="font-semibold text-[14px]">{m.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
