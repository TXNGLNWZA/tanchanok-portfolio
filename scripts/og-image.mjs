/* Regenerates public/og-image.jpg, the image shown when the site link is shared
   (LinkedIn, Line, Facebook, X). It builds the site, serves it locally and screenshots the
   real home hero at 1200x630, so the preview always matches the site.

   Run: npm run og   (also runs from the pre-commit hook in .githooks/)
   Needs Google Chrome or Edge installed; set CHROME_PATH to point at another browser. */
import { existsSync } from "node:fs";
import { build, preview } from "vite";
import puppeteer from "puppeteer-core";

const OUT = "public/og-image.jpg";
const PORT = 4317;
const BROWSERS = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].filter(Boolean);

const executablePath = BROWSERS.find((p) => existsSync(p));
if (!executablePath) {
  console.warn("og-image: no Chrome or Edge found, skipping. Set CHROME_PATH to regenerate.");
  process.exit(0);
}

await build({ logLevel: "warn" });
const server = await preview({ preview: { port: PORT, strictPort: true }, logLevel: "warn" });
const browser = await puppeteer.launch({ executablePath });
try {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle0" });
  // Only the hero: no header, facts strip or buttons (nothing to click in a preview)
  await page.addStyleTag({
    content: `
      header.top, .skip, .h2-facts, .h2 .btns { display: none !important; }
      .h2-outer { min-height: 630px !important; height: 630px; }
      .h2 { padding-block: 0 !important; grid-template-areas: "text show" !important; }
    `,
  });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 2500)); // let images load and fireflies spread out
  await page.screenshot({ path: OUT, type: "jpeg", quality: 88 });
  console.log(`og-image: wrote ${OUT}`);
} finally {
  await browser.close();
  await new Promise((r) => server.httpServer.close(r));
}
