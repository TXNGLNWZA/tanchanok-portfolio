import { useEffect, useRef, useState } from "react";

/* Sticky "on this page" bar for case studies. Reads the section headings from the page,
   scrolls to one on click, and highlights the section being read. Buttons, not #links:
   the hash is the router. */
export function Toc({ root }) {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(0);
  const bar = useRef(null);

  useEffect(() => {
    const secs = [...root.current.querySelectorAll(".cs-sec")];
    setItems(secs.map((s) => s.querySelector("h2")?.textContent || ""));
    const onScroll = () => {
      const line = innerHeight * 0.35;
      let i = 0;
      secs.forEach((s, n) => s.getBoundingClientRect().top < line && (i = n));
      setActive(i);
      // reading progress through the case study, 0..1
      const r = root.current.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
      bar.current?.style.setProperty("--progress", p.toFixed(3));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [root]);

  // keep the active chip visible in the horizontal scroller. Scroll only the bar:
  // scrollIntoView here would cancel a smooth page scroll in progress.
  useEffect(() => {
    const row = bar.current?.querySelector(".toc-inner");
    const chip = row?.querySelector(`[data-i="${active}"]`);
    if (chip) row.scrollTo({ left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  const go = (i) => {
    const s = root.current.querySelectorAll(".cs-sec")[i];
    const h = s?.querySelector("h2");
    if (!s) return;
    // move focus for keyboard users only once the smooth scroll is done; focusing earlier cancels it
    const focus = () => {
      h.setAttribute("tabindex", "-1");
      h.focus({ preventScroll: true });
    };
    if ("onscrollend" in window) addEventListener("scrollend", focus, { once: true });
    else setTimeout(focus, 900);
    s.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  if (!items.length) return null;
  return (
    <nav className="toc" aria-label="On this page" ref={bar}>
      <div className="toc-inner">
        <span className="toc-label">On this page</span>
        {items.map((t, i) => (
          <button
            type="button"
            key={t + i}
            data-i={i}
            className={i === active ? "on" : undefined}
            aria-current={i === active ? "true" : undefined}
            onClick={() => go(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <span className="toc-progress" aria-hidden="true" />
    </nav>
  );
}
