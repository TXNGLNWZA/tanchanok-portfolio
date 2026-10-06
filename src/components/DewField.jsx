import { useEffect, useMemo, useRef } from "react";

/* Day theme: dewdrops clinging to the leaves. Each drop twinkles silver-white on its own;
   the mouse is a sunbeam, so drops near the pointer catch the light and flash brighter and
   larger, then fade back as the beam moves on. Drops barely move, they only tremble.
   Off under prefers-reduced-motion (they stay as still glints). */
const COUNT = 26;
const BEAM = 230; // px radius the sunbeam lights up

export function DewField() {
  const box = useRef(null);
  const drops = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const r = (a, b) => a + Math.random() * (b - a);
        return {
          x: r(2, 98),
          y: r(4, 96),
          s: r(4, 9.5),
          tw: r(2.2, 5.5).toFixed(1),
          d: (-r(0, 6)).toFixed(1),
          rot: Math.round(r(0, 45)),
          key: i,
        };
      }),
    [],
  );

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const area = box.current.parentElement;
    const els = [...box.current.children];
    const glow = els.map(() => 0);
    const pointer = { x: -9999, y: -9999, on: false };
    let raf = 0;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(50, now - last) / 16.7;
      last = now;
      const r = area.getBoundingClientRect();
      els.forEach((el, i) => {
        let target = 0;
        if (pointer.on) {
          const cx = r.left + (drops[i].x / 100) * r.width;
          const cy = r.top + (drops[i].y / 100) * r.height;
          const d = Math.hypot(pointer.x - cx, pointer.y - cy);
          target = Math.max(0, 1 - d / BEAM);
          target *= target; // brightest right under the beam
        }
        // light comes quickly and leaves slowly, like a glint
        const k = target > glow[i] ? 0.25 : 0.04;
        glow[i] += (target - glow[i]) * (1 - Math.pow(1 - k, dt));
        el.style.setProperty("--b", glow[i].toFixed(3));
      });
      raf = requestAnimationFrame(tick);
    };
    const move = (e) => {
      if (e.pointerType === "touch") return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      const r = area.getBoundingClientRect();
      pointer.on = e.clientY >= r.top && e.clientY <= r.bottom;
    };
    const leave = () => (pointer.on = false);
    const vis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", vis);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", vis);
    };
  }, [drops]);

  return (
    <div className="dew-field" ref={box} aria-hidden="true">
      {drops.map((d) => (
        <span
          key={d.key}
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            "--s": `${d.s.toFixed(1)}px`,
            "--tw": `${d.tw}s`,
            "--d": `${d.d}s`,
            "--rot": `${d.rot}deg`,
          }}
        >
          <i />
        </span>
      ))}
    </div>
  );
}
