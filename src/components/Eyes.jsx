import { useEffect, useRef } from "react";

/* The two dots above the O in the hero name follow the pointer.
   Signature detail from "PORTFÖLIO" in the original design. */
export function Eyes() {
  const box = useRef(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0,
      pos = null;
    const look = () => {
      raf = 0;
      box.current?.querySelectorAll(".eye").forEach((eye) => {
        const r = eye.getBoundingClientRect(),
          g = eye.firstElementChild;
        const dx = pos.x - (r.left + r.width / 2),
          dy = pos.y - (r.top + r.height / 2);
        const a = Math.atan2(dy, dx),
          d = Math.min(1, Math.hypot(dx, dy) / 200) * r.width * 0.26;
        g.style.transform = `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d}px))`;
      });
    };
    const move = (e) => {
      pos = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(look);
    };
    addEventListener("pointermove", move, { passive: true });
    return () => {
      removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <span className="eyes" ref={box}>
      <span className="eye">
        <i></i>
      </span>
      <span className="eye">
        <i></i>
      </span>
    </span>
  );
}
