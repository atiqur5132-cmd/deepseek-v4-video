---
name: github-actions-cloud-renderer
description: Automated setup and execution of rendering Remotion videos on GitHub Actions servers (cloud rendering) without putting CPU/GPU load on the local machine.
---

# GitHub Actions Cloud Renderer Skill

This skill guides the creation and management of automated CI/CD pipelines using **GitHub Actions** to render high-definition Remotion MP4 videos in the cloud and upload them as downloadable artifacts.

## 1. Why Cloud Rendering?
- Zero local CPU/VRAM/battery usage.
- Free GitHub accounts get **2,000 free action minutes/month** on private repositories (unlimited on public repositories).
- Rendering a 5–10 minute Remotion video at 1080p 30/60fps takes ~3 to 7 minutes on GitHub's Ubuntu VMs (2 vCPU, 7GB RAM).

## 2. Standard Workflow Architecture (`.github/workflows/render.yml`)
When building a Remotion project for the user, ALWAYS include or create the workflow file at `.github/workflows/render.yml`.

### Key steps handled by the workflow:
1. `actions/checkout@v4`: Fetch the codebase and assets (`public/` folder).
2. `actions/setup-node@v4`: Install Node.js (v20+).
3. Dependency Installation (`npm ci` or `npm install`).
4. Browser & System Dependencies (`npx remotion browser ensure` installs Chromium and Linux shared libraries needed for headless rendering).
5. Cloud Render Execution (`npx remotion render <CompositionId> out/video.mp4 --props=...`).
6. `actions/upload-artifact@v4`: Upload the generated `out/video.mp4` file as a downloadable artifact so the user can grab it with one click.

## 3. Workflow Triggering Methods
- **Manual Trigger (`workflow_dispatch`):** Allows the user to click "Run workflow" from the GitHub Actions tab in their browser or run `gh workflow run render.yml` from terminal.
- **Git Push (`push`):** Can optionally auto-render when code is pushed to `main` branch.

## 4. Reference Template (`resources/render.yml`)
Always reference the template inside `.agents/skills/github-actions-cloud-renderer/resources/render.yml` when generating or updating the project's GitHub workflow.
