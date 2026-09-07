---
name: youtube-script-and-audio-sync
description: Creating high-retention English tech commentary scripts and precisely calculating frame timestamps to synchronize voiceover audio with Remotion visual scenes.
---

# YouTube Script & Audio Sync Skill

This skill defines the methodology for writing viral-grade, retention-optimized English YouTube scripts for AI model analyses and calculating frame-by-frame synchronization when the user provides voiceover audio (`.mp3` / `.wav`).

## 1. High-Retention Tech Script Structure
- **0:00 - 0:15 (The Hook):** Start with an immediate, contrarian, or shocking statement. Show the biggest claim right away (e.g., *"1.6 Trillion parameters for 1/10th the cost of GPT-5.5"*). No long intros.
- **0:15 - 1:30 (Technical Breakdown):** Explain *why* and *how* the model works in clear terms. Use visual comparisons (e.g., `MLA` vs `Hybrid Attention`, `Active` vs `Total` parameters).
- **1:30 - 2:30 (Benchmarks & Showdown):** Compare directly against frontier competitors (OpenAI, Anthropic, Google). Highlight both pros and cons honestly.
- **2:30+ (Conclusion & Call to Action):** Discuss industry implications, open-weights self-hosting, and ask an engaging question for the comments.

## 2. Visual Cue Mapping
Every paragraph of the script MUST be paired with an exact **Visual Cue Table** specifying:
- **Scene Number & Estimated Time Window**
- **Visual Description (What shows on screen)**
- **Typography / Text Overlay (Animated titles)**
- **Required Asset Path (`public/...`)**

## 3. Exact Audio Timestamp Calculation
When the user places `voiceover.mp3` in the workspace (`public/voiceover.mp3`):
1. Inspect the audio file duration and exact word timestamps (or scene break timings).
2. Calculate frame ranges at `fps = 30` (or `60`):
   - Scene 1: `from = 0`, `durationInFrames = Math.round(startSec * fps)` to `Math.round(endSec * fps)`
3. Export these constants in a `sceneTimings.ts` config file inside the Remotion project so all `<Sequence>` components automatically align perfectly with the voiceover words!
