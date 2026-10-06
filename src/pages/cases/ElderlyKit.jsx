import { useState } from "react";
import { KT } from "./khwanThong.js";

/* Live versions of the care center components. The Thai text is Khwan Thong drawn as outlines
   (khwanThong.js), so it matches the real screens without shipping the font. Only things that
   are controls in the real design react to hover and clicks; status badges stay static. */

/* One word in Khwan Thong, sized like text (1em tall line box) and colored by currentColor. */
function T({ w, bold = false, size = 1 }) {
  const g = KT[`${bold ? "Bold" : "Regular"}:${w}`];
  if (!g) return null;
  return (
    <svg
      className="kt"
      viewBox={`0 0 ${g.w} ${g.h}`}
      style={{ height: `${size * 1.25}em`, width: `${((size * 1.25 * g.w) / g.h).toFixed(3)}em` }}
      role="img"
      aria-label={w}
    >
      <path d={g.d} fill="currentColor" />
    </svg>
  );
}

const FILTERS = ["รออนุมัติ", "อนุมัติ", "ไม่อนุมัติ"];
const DAYS = [
  ["เสาร์", "23"],
  ["อาทิตย์", "24"],
  ["จันทร์", "25"],
  ["อังคาร", "26"],
];

export function ElderlyLiveKit() {
  const [filter, setFilter] = useState(0);
  const [day, setDay] = useState(0);
  const [given, setGiven] = useState(false);

  return (
    <div className="ek" aria-label="Care center components you can try">
      <div className="ek-cell">
        <button type="button" className="ek-primary">
          <T w="เข้าสู่ระบบ" bold size={1.1} />
        </button>
        <p className="ek-cap">Primary button</p>
      </div>

      <div className="ek-cell">
        <label className="ek-field">
          <span className="ek-label">
            <T w="ชื่อผู้ใช้" bold size={1.05} />
          </span>
          <span className="ek-input">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
              <path d="M4.5 20c1.2-3.6 4-5.2 7.5-5.2s6.3 1.6 7.5 5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input type="text" aria-label="Username" />
          </span>
        </label>
        <p className="ek-cap">Text field with icon</p>
      </div>

      <div className="ek-cell ek-tint">
        <div className="ek-filters" role="tablist" aria-label="Request status">
          {FILTERS.map((f, i) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === i}
              className={filter === i ? "on" : undefined}
              onClick={() => setFilter(i)}
            >
              <T w={f} bold />
            </button>
          ))}
        </div>
        <p className="ek-cap">Status filters · mobile</p>
      </div>

      <div className="ek-cell ek-tint">
        <div className="ek-dates" role="tablist" aria-label="Day">
          {DAYS.map(([d, n], i) => (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={day === i}
              className={day === i ? "on" : undefined}
              onClick={() => setDay(i)}
            >
              <T w={d} size={0.8} />
              <T w={n} bold size={1.7} />
            </button>
          ))}
        </div>
        <p className="ek-cap">Date chips · mobile</p>
      </div>

      <div className="ek-cell">
        <div className={`ek-dose${given ? " given" : ""}`}>
          <T w="นางสมพร ใจดี" size={1.15} />
          <div className="ek-dose-row">
            <T w="2 เม็ด" />
            {given ? (
              <span className="ek-badge good ek-pop" role="status">
                <T w="รับประทานแล้ว" size={0.85} />
              </span>
            ) : (
              <button
                type="button"
                className="ek-give"
                onClick={() => {
                  setGiven(true);
                  setTimeout(() => setGiven(false), 2600);
                }}
              >
                <T w="ให้ยา" bold />
              </button>
            )}
          </div>
        </div>
        <p className="ek-cap">Medication card · tap ให้ยา to record the dose</p>
      </div>

      <div className="ek-cell">
        <div className="ek-badges">
          <span className="ek-badge good">
            <T w="รับประทานแล้ว" size={0.85} />
          </span>
          <span className="ek-badge late">
            <T w="รับประทานล่าช้า" size={0.85} />
          </span>
          <span className="ek-badge missed">
            <T w="ไม่ได้รับประทาน" size={0.85} />
          </span>
        </div>
        <p className="ek-cap">Status badges · display only</p>
      </div>
    </div>
  );
}
