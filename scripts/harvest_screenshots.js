const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('Launching Puppeteer for Retina Dark-Mode Screenshot Harvesting...');
  const screenshotsDir = path.join(__dirname, '../public/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set Retina Resolution (1920x1080 @ 2x scale) and Dark Mode
    await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);

    // 1. Capture DeepSeek Official GitHub Organization Page (Models & Open Weights proof)
    console.log('Navigating to https://github.com/deepseek-ai...');
    await page.goto('https://github.com/deepseek-ai', { waitUntil: 'networkidle2', timeout: 30000 });
    
    const screenshot1Path = path.join(screenshotsDir, 's1_tweet.png');
    await page.screenshot({ path: screenshot1Path, fullPage: false });
    console.log(`Saved official DeepSeek repo proof -> ${screenshot1Path}`);

    // 2. Capture DeepSeek-V3 / V4 repository specs & MoE architecture cards
    console.log('Navigating to https://github.com/deepseek-ai/DeepSeek-V3...');
    await page.goto('https://github.com/deepseek-ai/DeepSeek-V3', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Scroll down slightly to get the model specs / benchmark table
    await page.evaluate(() => window.scrollBy(0, 450));
    await new Promise(r => setTimeout(r, 1000));

    const screenshot2Path = path.join(screenshotsDir, 's2_benchmark.png');
    await page.screenshot({ path: screenshot2Path, fullPage: false });
    console.log(`Saved DeepSeek technical architecture proof -> ${screenshot2Path}`);

  } catch (err) {
    console.error('Error during screenshot harvesting:', err);
  } finally {
    await browser.close();
    console.log('Harvesting completed successfully!');
  }
})();
