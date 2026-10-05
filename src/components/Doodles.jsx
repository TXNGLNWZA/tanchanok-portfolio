/* Hand-drawn motifs from the original design. */

export const Arrow = ({ rot = 0, w = 60 }) => (
  <svg
    width={w}
    height={w * 0.6}
    viewBox="0 0 100 60"
    fill="none"
    aria-hidden="true"
    style={{ transform: `rotate(${rot}deg)` }}
  >
    <path
      d="M4 8c10 30 30 44 58 30 12-6 14-22 2-22s-10 20 6 28c9 5 18 5 26 2"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M86 38l10 8-12 4"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Star = ({ fill = "var(--sun)" }) => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <path
      fill={fill}
      d="M50 2l8 26 22-16-8 26 26 4-24 12 16 22-26-8-4 28-12-24-18 20 2-28-28 2 20-18L2 42l28-6-12-24 24 14z"
    />
  </svg>
);

/* Handwritten note with a curly arrow, positioned absolutely by `style`. */
export const Note = ({ children, style, rot = -4, arrowRot = 0, arrowFirst = false }) => (
  <span className="note hand" style={{ ...style, transform: `rotate(${rot}deg)` }} aria-hidden="true">
    {arrowFirst && <Arrow rot={arrowRot} w={46} />}
    {children}
    {!arrowFirst && <Arrow rot={arrowRot} w={46} />}
  </span>
);
