// Placeholder clips borrowed from the existing reel carousel.
// Swap to dedicated `/videos/edit-scene/video1.mp4` etc. when ready.
export const VIDEO_1_SRC = "/videos/reels/v1.mp4";
export const VIDEO_3_SRC = "/videos/reels/v4.mp4";

// Placeholder square product image — solid gradient until real Chanel asset uploaded.
export const PRODUCT_IMG_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'>
       <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
         <stop offset='0' stop-color='#1a1a1a'/><stop offset='1' stop-color='#3b3b3b'/>
       </linearGradient></defs>
       <rect width='80' height='80' rx='12' fill='url(#g)'/>
       <text x='50%' y='54%' text-anchor='middle' fill='#fff'
         font-family='Playfair Display, serif' font-size='14' font-style='italic'>Chanel</text>
     </svg>`,
  );

export const PROMPT_TEXT =
  "Swap the lipstick for this Chanel necklace, keep the same actor, same lighting, same beat.";
