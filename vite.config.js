import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/* Adds a fingerprint of public/og-image.jpg to its URL in index.html (%OG_VERSION%).
   LinkedIn, Line and Facebook cache link previews by image URL, so a new image gets a new
   URL and is fetched again instead of the old cached one. */
function ogVersion() {
  return {
    name: "og-version",
    transformIndexHtml(html) {
      const hash = createHash("md5").update(readFileSync("public/og-image.jpg")).digest("hex").slice(0, 8);
      return html.replaceAll("%OG_VERSION%", hash);
    },
  };
}

// Relative base so the build works at a domain root or a GitHub Pages sub-path.
export default defineConfig({
  base: "./",
  plugins: [react(), ogVersion()],
});
