import { useEffect } from "react";

/* Content eases up into place the first time it scrolls into view.
   Off under prefers-reduced-motion; without JS everything is simply visible. */
const TARGETS = [
  ".cs-hero",
  ".cs-sec > :not(.process):not(.flow):not(.info-cards):not(.stats):not(.fixes)",
  ".info-cards > li",
  ".stats > div",
  ".fixes > .fix",
  ".process > li",
  ".flow > li",
  "#work .divider",
  ".work-grid > .card",
  ".mini-grid > .card",
  "main > section .barhead",
  "main > section > .cs-text",
  ".xp > li",
  ".about > *",
  ".contact",
].join(",");

export function useReveal(root, key) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("motion");
    const els = [...root.current.querySelectorAll(TARGETS)].filter((el) => !el.classList.contains("in"));
    const seen = new Map();
    els.forEach((el) => {
      const n = seen.get(el.parentNode) || 0;
      seen.set(el.parentNode, n + 1);
      el.style.setProperty("--rv-delay", `${(n % 6) * 80}ms`);
      el.classList.add("rv");
    });
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [root, key]);
}
