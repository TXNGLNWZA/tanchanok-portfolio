import { useState } from "react";
import { Img } from "./Img.jsx";

/* Clickable prototype demo built from real screens. Each step shows one screen in a phone or
   browser frame with a pulsing hotspot on the thing to tap; tapping it (or Next) moves on.
   steps: { img, alt, device: "phone" | "desktop", title, text, action, hot: [x, y, w, h] }[]
   hot is the tap target as fractions 0..1 of the screen image. done: text shown at the end. */
export function Walkthrough({ steps, done, label }) {
  const [i, setI] = useState(0);
  const end = i >= steps.length;
  const step = steps[Math.min(i, steps.length - 1)];
  const go = (n) => setI(Math.max(0, Math.min(steps.length, n)));
  const [x, y, w, h] = step.hot;

  return (
    <div className={`wt${steps.some((s) => s.device === "phone") ? " has-phone" : ""}`} role="group" aria-label={label}>
      <div className="wt-stage">
        <div className={`wt-device ${step.device}${end ? " is-done" : ""}`}>
          {step.device === "desktop" && (
            <span className="wt-chrome" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          )}
          <div className="wt-screen">
            <Img
              key={step.img}
              name={step.img}
              alt={step.alt}
              className="wt-img"
              sizes={step.device === "phone" ? "260px" : "(max-width: 860px) 92vw, 720px"}
            />
            {!end && (
              <button
                type="button"
                className="wt-hot"
                style={{ left: `${x * 100}%`, top: `${y * 100}%`, width: `${w * 100}%`, height: `${h * 100}%` }}
                onClick={() => go(i + 1)}
                aria-label={step.action}
              />
            )}
          </div>
          {end && (
            <div className="wt-done" role="status">
              <b>Done</b>
              <p>{done}</p>
              <button type="button" className="btn primary wt-btn" onClick={() => go(0)}>
                Start again
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="wt-side">
        <p className="wt-count" aria-live="polite">
          {end ? "Flow complete" : `Step ${i + 1} of ${steps.length}`}
        </p>
        <ol className="wt-steps">
          {steps.map((s, n) => (
            <li key={s.title} className={n === i ? "on" : n < i ? "past" : undefined}>
              <button type="button" onClick={() => go(n)} aria-current={n === i ? "step" : undefined}>
                <span className="wt-n" aria-hidden="true">
                  {n < i ? "✓" : n + 1}
                </span>
                <span>
                  <b>{s.title}</b>
                  {n === i && <span className="wt-text">{s.text}</span>}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <div className="wt-nav">
          <button type="button" className="btn ghost wt-btn" onClick={() => go(i - 1)} disabled={i === 0}>
            Back
          </button>
          {end ? (
            <button type="button" className="btn primary wt-btn" onClick={() => go(0)}>
              Start again
            </button>
          ) : (
            <button type="button" className="btn primary wt-btn" onClick={() => go(i + 1)}>
              {step.action}
            </button>
          )}
        </div>
        <p className="wt-hint">Tap the highlighted spot on the screen, or use the buttons.</p>
      </div>
    </div>
  );
}
