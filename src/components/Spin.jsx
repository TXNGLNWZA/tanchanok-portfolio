import { useEffect, useRef, useState } from "react";
import { Img } from "./Img.jsx";

/* A garment on a turntable: front and back artwork on the two faces of a 3D card. It turns
   slowly on its own; drag (or swipe) to spin it, or use the Front / Back buttons and the arrow
   keys. Only front and back views exist, so in between it is a flat card turning in 3D, not a
   modeled garment. Under prefers-reduced-motion it does not turn on its own. */
export function Spin({ front, back, alt, label, caption }) {
  const stage = useRef(null);
  const card = useRef(null);
  const angle = useRef(-24);
  const [side, setSide] = useState("front");

  useEffect(() => {
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let drag = null; // { x, start }
    let target = null; // angle to ease to after a button press
    let idleUntil = 0;

    const paint = () => {
      const a = angle.current;
      card.current.style.transform = `rotateY(${a.toFixed(2)}deg)`;
      // the floor shadow narrows as the shirt turns edge-on
      stage.current.style.setProperty("--turn", Math.abs(Math.cos((a * Math.PI) / 180)).toFixed(3));
      const facing = ((((a % 360) + 360) % 360) + 90) % 360 < 180 ? "front" : "back";
      setSide((s) => (s === facing ? s : facing));
    };
    const tick = (now) => {
      const dt = Math.min(50, now - last) / 16.7;
      last = now;
      if (target !== null) {
        angle.current += (target - angle.current) * (1 - Math.pow(0.86, dt));
        if (Math.abs(target - angle.current) < 0.2) target = null;
      } else if (!drag && !calm && now > idleUntil) {
        angle.current += 0.35 * dt;
      }
      paint();
      raf = requestAnimationFrame(tick);
    };

    const el = stage.current;
    const down = (e) => {
      drag = { x: e.clientX, start: angle.current };
      target = null;
      el.setPointerCapture(e.pointerId);
      el.classList.add("grabbing");
    };
    const move = (e) => {
      if (!drag) return;
      angle.current = drag.start + (e.clientX - drag.x) * 0.6;
    };
    const up = () => {
      if (!drag) return;
      drag = null;
      idleUntil = performance.now() + 2500; // pause the auto-turn after a drag
      el.classList.remove("grabbing");
    };
    const goTo = (deg) => {
      // nearest angle that shows the requested face
      const turns = Math.round((angle.current - deg) / 360);
      target = deg + turns * 360;
      idleUntil = performance.now() + 4000;
    };
    el.spinTo = goTo;

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    paint();
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, []);

  const show = (s) => stage.current?.spinTo(s === "front" ? 0 : 180);
  const keys = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      stage.current.spinTo(Math.round(angle.current / 45) * 45 + (e.key === "ArrowRight" ? 45 : -45));
    }
  };

  return (
    <figure className="spin">
      <div
        className="spin-stage"
        ref={stage}
        role="img"
        aria-label={`${alt}. Showing the ${side}.`}
        tabIndex={0}
        onKeyDown={keys}
      >
        <div className="spin-card" ref={card}>
          <div className="spin-face">
            <Img name={front} alt="" sizes="(max-width: 640px) 80vw, 420px" />
          </div>
          <div className="spin-face spin-back">
            <Img name={back} alt="" sizes="(max-width: 640px) 80vw, 420px" />
          </div>
        </div>
        <span className="spin-floor" aria-hidden="true" />
      </div>
      <div className="spin-controls" role="group" aria-label={label}>
        {["front", "back"].map((s) => (
          <button key={s} type="button" className={side === s ? "on" : undefined} aria-pressed={side === s} onClick={() => show(s)}>
            {s === "front" ? "Front" : "Back"}
          </button>
        ))}
      </div>
      <figcaption>
        {caption && <span className="spin-caption">{caption}</span>}
        <span className="spin-hint">Drag to turn the shirt, or tap Front and Back.</span>
      </figcaption>
    </figure>
  );
}
