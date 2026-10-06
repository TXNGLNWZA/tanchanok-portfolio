/* Runs after `vite build` (see the "build" script). The app renders in the browser, so the
   built index.html has an empty #root: crawlers, link-preview bots and AI summarizers that do
   not run JavaScript would see nothing. This fills in real HTML at build time:

   - dist/index.html            the home page (people still get the live React app on top)
   - dist/work/<slug>/index.html  one static page per case study, listed in sitemap.xml.
                                 Browsers are sent on to the app's /#/work/<slug> route.
   - dist/sitemap.xml, dist/robots.txt

   No browser needed, so it also runs on Vercel. */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { build } from "vite";

const SITE = "https://tanchanok-portfolio.vercel.app";
const SSR_DIR = "dist-ssr";

await build({ logLevel: "warn", build: { ssr: "src/entry-server.jsx", outDir: SSR_DIR, emptyOutDir: true } });
const { render, PROJECTS } = await import(pathToFileURL(resolve(SSR_DIR, "entry-server.js")).href);

const template = readFileSync("dist/index.html", "utf-8");
if (!template.includes('<div id="root"></div>')) throw new Error("prerender: empty #root not found in dist/index.html");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// home
writeFileSync("dist/index.html", template.replace('<div id="root"></div>', `<div id="root">${render("")}</div>`));

// case studies
for (const p of PROJECTS) {
  const url = `${SITE}/work/${p.slug}/`;
  const title = `${p.short} — Tanchanok Juntongkaew`;
  let html = template
    .replace('<div id="root"></div>', `<div id="root">${render(`work/${p.slug}`)}</div>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*"/, `$1${esc(p.desc)}"`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*"/, `$1${esc(title)}"`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*"/, `$1${esc(p.desc)}"`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*"/, `$1${url}"`)
    // the page sits two folders down, so relative asset paths need ../../
    .replace(/(["\s,(])\.\/(?=[\w@-])/g, "$1../../");
  html = html.replace(
    "<head>",
    `<head>
    <link rel="canonical" href="${url}" />
    <script>location.replace("../../#/work/${p.slug}");</script>`,
  );
  mkdirSync(`dist/work/${p.slug}`, { recursive: true });
  writeFileSync(`dist/work/${p.slug}/index.html`, html);
}

// sitemap and robots
const urls = [`${SITE}/`, ...PROJECTS.map((p) => `${SITE}/work/${p.slug}/`)];
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>
`,
);
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

rmSync(SSR_DIR, { recursive: true, force: true });
console.log(`prerender: home + ${PROJECTS.length} case studies, sitemap.xml, robots.txt`);
