## Goal

Make **Create Video** mode in `VideoPromptBarInline` look and behave like Higgsfield's catalog: a curated, grouped model list with one display name per model (no provider names visible), and per-model upload UIs that change based on what each model actually accepts. Backend continues to do all provider routing.

---

## 1. New unified model catalog (UI-only metadata)

Add a new `VIDEO_CATALOG` array in `src/store/videoStore.ts` (alongside, not replacing, the existing `VIDEO_MODELS` which the backend keys still rely on). Each entry has:

```
id              → backend model key (matches VIDEO_MODEL_MAP in edge fn)
name            → user-facing name (NO provider in name)
family          → 'kling' | 'veo' | 'sora' | 'hailuo' | 'wan' | 'seedance' | 'grok' | 'pixverse' | 'ltx'
familyLabel     → 'Kling' | 'Google Veo' | 'OpenAI Sora 2' | 'Minimax Hailuo' | …
familyDesc      → e.g. 'Perfect motion with advanced video control'
featured        → bool (drives "Featured models" section)
badge           → 'NEW' | 'EXCLUSIVE' | undefined
resolution      → '720p' | '1080p' | '4K'
durationRange   → '3s-15s' | '5s-10s' | '1s-15s' | '4s-8s' | '2s-15s'
hasAudio        → bool (shows speaker icon)
uploadLayout    → 'none' | 'start-end' | 'single-required' | 'single-optional'
modes           → readonly ['text-to-video', ...]
```

Curated catalog (only models that actually route to a provider we have):

**Featured (top of dropdown):**
- Seedance 2.0 → `rw-seedance-1.5-pro` (NEW, 720p, 4s–15s) — single-optional
- Seedance 2.0 Fast → keep `rw-seedance-1.5-pro` for now (NEW) — single-optional
- Kling 3.0 → `kling-v3-pro` (EXCLUSIVE, 4K display, 3s–15s, audio) — start-end
- Google Veo 3.1 Lite → `veo-3.1-lite` (NEW, 1080p, 4s–8s, audio) — single-required
- Grok Imagine → backend key TBD; routed via Runware text-to-video (`xai:grok-imagine`) — single-optional

**All models (collapsible families with `>`):**
- **Minimax Hailuo** → `minimax-video` (single variant) — single-optional
- **Kling** → expands to: Kling 3.0 (`kling-v3-pro`), Kling 2.6 (`kling-v2.6-pro`), Kling O1 Video (`kling-v3-pro` aliased — or hide if not text-to-video), Kling 2.5 Turbo Pro (`kling-v2.5-turbo-pro`) — start-end
- **OpenAI Sora 2** → `rw-sora-2` — single-optional
- **Google Veo** → expands to: Veo 3.1 (`veo-3.1`), Veo 3.1 Fast (`veo-3.1-fast`), Veo 3.1 Lite (`veo-3.1-lite`) — Veo 3.1/Fast: start-end; Veo 3.1 Lite: single-required
- **Wan** → `pixverse-v6` placeholder until a real Wan provider is wired (or omit) — start-end
- **Seedance** → `rw-seedance-1.5-pro` — single-optional
- **Grok Imagine** → Runware `xai:grok-imagine@video` text-to-video variant — single-optional
- **Runway Gen-4.5** → `rw-runway-gen4.5` — single-optional
- **PixVerse V6** → `pixverse-v6` — start-end
- **LTX-2** → `ltx-2-19b` — start-end

**Skipped per your call:** HappyHorse, Higgsfield (no provider wired).

If a "family" has only one variant, clicking it selects directly (no expand step). If multiple, show `>` and reveal variants in a sub-panel.

---

## 2. Model dropdown redesign (Higgsfield-style)

Rewrite the model `PopoverContent` block in `src/components/generator/VideoPromptBarInline.tsx`:

```text
┌─────────────────────────────────────┐
│ 🔍 Search...                         │
├─────────────────────────────────────┤
│ ✦ Featured models                    │
│  [icon] Seedance 2.0  [NEW]          │
│         🏷 720p   ⏱ 4s-15s            │
│  [icon] Kling 3.0 🔊 [EXCLUSIVE]  ✓  │
│         🏷 4K     ⏱ 3s-15s            │
│  [icon] Google Veo 3.1 Lite [NEW]    │
│         🏷 1080p  ⏱ 4s-8s             │
│  [icon] Grok Imagine                 │
│         🏷 720p   ⏱ 1s-15s            │
├─────────────────────────────────────┤
│ 📹 All models                        │
│  [icon] Minimax Hailuo            >  │
│         High-dynamic, VFX-ready…     │
│  [icon] Kling                     >  │
│         Perfect motion with…         │
│  [icon] OpenAI Sora 2             >  │
│  [icon] Google Veo                >  │
│  [icon] Seedance                  >  │
│  [icon] Grok Imagine              >  │
└─────────────────────────────────────┘
```

Clicking a family with `>` slides in a variant sub-panel (image 3 style) listing the variants with chips + checkmark on the selected one. Selecting any variant updates `model` in the store and routes backend automatically.

Filter to only show entries whose `modes` includes `text-to-video` when the Create Video tab is active.

---

## 3. Per-model upload layouts (driven by `uploadLayout`)

Replace the current frame-uploader logic with a switch on `selectedModel.uploadLayout`:

- **`start-end`** (Kling 3.0, Kling 2.6, Veo 3.1, Veo 3.1 Fast, PixVerse, LTX, Wan) → image 4 layout: two equal slots `Start frame` + `End frame`, both labelled "Optional" badge top-right.
- **`single-required`** (Veo 3.1 Lite) → image 5 layout: one wide tile, no Optional badge, copy: **"Upload image or generate it"** with subtitle **"PNG, JPG or Paste from clipboard"**.
- **`single-optional`** (Grok Imagine, Sora 2, Hailuo, Seedance, Runway) → image 7 layout: same wide tile but with "Optional" badge top-right.
- **`none`** (pure text-to-video models) → no upload tile.

Both single-tile variants get a "generate it" inline link styled white/underlined that opens the existing image generator (or a placeholder action for now if not wired).

`onUploadAt(0)` accepts `image/*` for all Create Video layouts.

---

## 4. Backend (`supabase/functions/generate-video/index.ts`)

No structural change required for the curated list above — every selected `id` already exists in `VIDEO_MODEL_MAP`. Two small additions:

- Add a Grok Imagine **text-to-video** route: `"grok-imagine": { type: "runware", runwareModel: "xai:grok-imagine@video" }` so the Create Video Grok entry has a key distinct from `grok-imagine-edit`.
- (Optional later) wire real Wan / HappyHorse / Higgsfield endpoints when providers are added; for now they are simply absent from the catalog.

No provider name leaks to the UI — the catalog only carries the backend `id`.

---

## 5. Files touched

- `src/store/videoStore.ts` — add `VIDEO_CATALOG` with the curated entries + `uploadLayout` + family metadata. Keep `VIDEO_MODELS` for backward compat (sidebar / other panels).
- `src/components/generator/VideoPromptBarInline.tsx` — rewrite model dropdown (Featured + All models + family expand), rewrite frame-uploader block to switch on `uploadLayout`, add the "Upload image or generate it" tile component.
- `supabase/functions/generate-video/index.ts` — add `grok-imagine` text-to-video map entry.

---

## 6. Out of scope (per your answers)

- HappyHorse and Higgsfield models (no provider wired — skipped entirely, not shown as "coming soon").
- Provider names anywhere in the UI.
- Edit Video and Motion Control tabs (already done in previous turns, untouched).
