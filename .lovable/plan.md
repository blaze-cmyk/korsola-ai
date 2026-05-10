## Replace card 1 video and update aspect ratio

**File swap**
- Overwrite `public/videos/how/card_1.mp4` with the new upload (`ghjfgtyufghjk.mp4`, 1820×2160).

**`src/components/marketing/lp/LpHowItWorks.tsx`**
- Change the placeholder `div` className from `aspect-[4/5] rounded-[28px] bg-[#0f0f10] overflow-hidden` to `aspect-[1820/2160] rounded-[28px] bg-[#0f0f10] overflow-hidden`.
- Applies to all 3 cards (kept identical so the row stays visually aligned). Cards 2 and 3 remain empty dark placeholders, just slightly taller than before.