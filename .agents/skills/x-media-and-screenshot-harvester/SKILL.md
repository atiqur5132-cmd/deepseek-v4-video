---
name: x-media-and-screenshot-harvester
description: Mastery in collecting 99% authentic, high-resolution screenshots and video clips from X (Twitter), GitHub, and tech blogs to use as real visuals in Remotion videos.
---

# X (Twitter) Media & Screenshot Harvester Skill

This skill governs how to collect real-world visual proof (tweets, benchmark comparisons, code snippets, architectural diagrams, and video demos) from X (Twitter), GitHub, and technical articles.

## 1. High-Resolution Screenshot Harvesting
To make the Remotion video look ultra-crisp at 1080p or 4K:
- **Browser Subagent / Automated Script:** Use `browser_subagent` or a Playwright/Puppeteer script to visit target URLs (e.g., specific X posts, GitHub release pages).
- **Dark Mode Requirement:** Always enforce dark mode when taking screenshots of X posts (`cookie: theme=dark` or clicking dark theme toggle) so it blends seamlessly with the video's dark tech aesthetic.
- **Device Scale Factor (DPI):** Capture screenshots at `deviceScaleFactor: 2` or `3` to prevent blurriness when zooming (`Ken Burns effect`).
- **Target Element Trimming:** Crop specifically to the tweet container or table card rather than capturing unnecessary browser clutter.
- **Storage Location:** Save all harvested PNGs directly inside `public/screenshots/` with descriptive names:
  - `public/screenshots/scene1_deepseek_announcement.png`
  - `public/screenshots/scene2_benchmark_table.png`

## 2. Video Downloading (`yt-dlp` Integration)
When X posts or blogs contain screen recordings, benchmark demos, or live generations:
- Use `yt-dlp` via terminal commands (`run_command`) to download the exact video stream.
- Command pattern:
  ```powershell
  python -m yt_dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" --output "public/clips/scene3_demo.%(ext)s" "https://x.com/username/status/..."
  ```
- If Python `yt-dlp` is not installed or requires updating, install/update it via `pip install --upgrade yt-dlp` or download the standalone binary.

## 3. Visual Verification Table
For every script scene, maintain an inventory mapping:
| Scene # | Visual Type | Source URL / Description | Target File in `public/` | Status |
| :--- | :--- | :--- | :--- | :--- |
| Scene 1 | Tweet PNG | `@deepseek_ai` release post | `public/screenshots/s1_tweet.png` | Ready / Pending |
| Scene 2 | Video MP4 | LiveCodeBench demo clip | `public/clips/s2_benchmark.mp4` | Ready / Pending |
