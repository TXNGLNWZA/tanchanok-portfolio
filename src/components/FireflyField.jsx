import { useEffect, useRef } from "react";

/* Fireflies scattered over the home hero (they fill their parent). They wander on their own;
   when the mouse moves over the hero they slowly gather around the pointer, each at its own
   pace, and hover there. A few seconds after the mouse stops or leaves they drift off again.
   Off under prefers-reduced-motion. */
const COUNT = 16;
const GATHER_MS = 3500; // how long after the last mouse move they keep gathering

export function FireflyField() {
  const box = useRef(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [...box.current.children];
    const area = box.current.parentElement;
    let W = area.clientWidth;
    let H = area.clientHeight;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const flies = els.map(() => ({
      x: rnd(0, W),
      y: rnd(0, H),
      vx: rnd(-0.3, 0.3),
      vy: rnd(-0.3, 0.3),
      heading: rnd(0, Math.PI * 2),
      eager: rnd(0.45, 1), // some come quickly, some take their time
      ring: rnd(22, 70), // how close each one hovers to the pointer
      spin: Math.random() < 0.5 ? -1 : 1,
    }));
    const pointer = { x: 0, y: 0, at: -Infinity };
    let raf = 0;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(50, now - last) / 16.7;
      last = now;
      const gathering = now - pointer.at < GATHER_MS;
      for (let i = 0; i < flies.length; i++) {
        const f = flies[i];
        // wander: a slowly turning heading
        f.heading += rnd(-0.12, 0.12) * dt;
        f.vx += Math.cos(f.heading) * 0.012 * dt;
        f.vy += Math.sin(f.heading) * 0.012 * dt;

        if (gathering) {
          const dx = pointer.x - f.x;
          const dy = pointer.y - f.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d > f.ring) {
            // gentle pull, a bit stronger from far away so stragglers still arrive
            const pull = 0.032 * f.eager * Math.min(2, 0.6 + d / 300);
            f.vx += (dx / d) * pull * dt;
            f.vy += (dy / d) * pull * dt;
          } else {
            // close in: circle the pointer instead of piling onto it
            f.vx += (-dy / d) * 0.02 * f.spin * dt - (dx / d) * 0.008 * dt;
            f.vy += (dx / d) * 0.02 * f.spin * dt - (dy / d) * 0.008 * dt;
          }
        }

        // damping and a low top speed keep every move slow
        const damp = Math.pow(0.965, dt);
        f.vx *= damp;
        f.vy *= damp;
        const sp = Math.hypot(f.vx, f.vy);
        const max = gathering ? 2.6 : 0.6;
        if (sp > max) {
          f.vx *= max / sp;
          f.vy *= max / sp;
        }
        f.x += f.vx * dt;
        f.y += f.vy * dt;

        // wrap around the screen edges while wandering
        const m = 20;
        if (f.x < -m) f.x = W + m;
        else if (f.x > W + m) f.x = -m;
        if (f.y < -m) f.y = H + m;
        else if (f.y > H + m) f.y = -m;

        els[i].style.transform = `translate(${f.x.toFixed(1)}px, ${f.y.toFixed(1)}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    const move = (e) => {
      if (e.pointerType === "touch") return;
      const r = area.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      // only gather while the pointer is over the hero
      if (pointer.x >= 0 && pointer.y >= 0 && pointer.x <= r.width && pointer.y <= r.height) pointer.at = performance.now();
    };
    const leave = () => (pointer.at = -Infinity);
    const resize = () => {
      W = area.clientWidth;
      H = area.clientHeight;
    };
    // pause when the tab is hidden
    const vis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    addEventListener("pointermove", move, { passive: true });
    addEventListener("resize", resize);
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", vis);
    return () => {
      removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return (
    <div className="firefly-field" ref={box} aria-hidden="true">
      {Array.from({ length: COUNT }, (_, i) => (
        <span key={i}>
          <i
            style={{
              "--s": `${(3.5 + ((i * 37) % 50) / 10).toFixed(1)}px`,
              "--glow": `${(1.6 + ((i * 53) % 25) / 10).toFixed(1)}s`,
              "--d": `${(-((i * 71) % 40) / 10).toFixed(1)}s`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
