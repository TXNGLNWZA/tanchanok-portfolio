import { useTheme } from "./Theme.jsx";
import { FireflyField } from "./FireflyField.jsx";
import { DewField } from "./DewField.jsx";

/* The hero's atmosphere, one per theme.
   Night: moonglow and fireflies that gather at the pointer.
   Day: a misty pine forest, with sunbeams, drifting mist, foliage at the edges and dewdrops
   that glint where the pointer (the sunbeam) passes. */
export function HeroSky() {
  const { theme } = useTheme();
  if (theme === "dark") {
    return (
      <>
        <div className="sky sky-night" aria-hidden="true">
          <span className="moonglow" />
        </div>
        <FireflyField key="night" />
      </>
    );
  }
  return (
    <>
      <div className="sky sky-day" aria-hidden="true">
        <span className="rays" />
        <span className="mist m1" />
        <span className="mist m2" />
        <span className="mist m3" />
        <Foliage className="leaves leaves-l" />
        <Foliage className="leaves leaves-r" />
      </div>
      <DewField key="day" />
    </>
  );
}

/* A cluster of pine-dark leaves for the top corners, softly blurred like it is in the mist. */
function Foliage({ className }) {
  const leaf = "M0 0C18-26 54-34 86-22C62-2 30 10 0 0Z";
  const parts = [
    [0, 40, -18, 1.25, 0.95],
    [18, 92, 8, 1.05, 0.85],
    [-6, 140, 28, 0.95, 0.7],
    [60, 20, -42, 0.9, 0.75],
    [110, 6, -12, 0.8, 0.6],
    [40, 170, 46, 0.8, 0.55],
  ];
  return (
    <svg className={className} viewBox="0 0 220 240" fill="none">
      <path d="M-10 -10C30 40 40 120 20 250" stroke="currentColor" strokeWidth="5" opacity=".55" />
      {parts.map(([x, y, rot, sc, op], i) => (
        <path key={i} d={leaf} fill="currentColor" opacity={op} transform={`translate(${x} ${y}) rotate(${rot}) scale(${sc})`} />
      ))}
    </svg>
  );
}
