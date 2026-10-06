import { useState } from "react";
/* Shared building blocks for the "User flow / Design process" and "Design system"
   sections of case studies. Content lives in each case study. */
import { Img } from "./Img.jsx";

/* Numbered steps joined by arrows. steps: [title, text][] */
export function Flow({ steps, label }) {
  return (
    <ol className="flow" aria-label={label} style={{ "--flow-cols": steps.length }}>
      {steps.map(([title, text], i) => (
        <li key={title}>
          <span className="flow-num">{i + 1}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </li>
      ))}
    </ol>
  );
}

/* Design process timeline: dots on one line, each stage with its methods as chips.
   steps: { title, text, tags? }[] */
export function Process({ steps, label = "Design process" }) {
  return (
    <ol className="process" aria-label={label} style={{ "--steps": steps.length }}>
      {steps.map((s, i) => (
        <li key={s.title}>
          <span className="process-dot" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          {s.tags && (
            <ul className="process-tags">
              {s.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}

/* Annotated screen: a phone image with numbered callouts joined to points on the screen.
   callouts: { label, x, y, side }[] — x, y are 0..1 of the image, side is "left" | "right".
   Narrow screens show numbered dots on the image and the labels as a list below. */
export function Annotated({ img, alt, callouts, width = 300 }) {
  return (
    <figure className="annot" style={{ "--imgw": `${width}px` }}>
      <div className="annot-stage">
        <div className="annot-img">
          <Img name={img} alt={alt} zoom sizes={`${width}px`} />
          {callouts.map((c, i) => (
            <span key={i} className="annot-dot" style={{ left: `${c.x * 100}%`, top: `${c.y * 100}%` }} aria-hidden="true">
              {i + 1}
            </span>
          ))}
        </div>
        {callouts.map((c, i) => (
          <span
            key={c.label}
            className={`annot-call ${c.side}`}
            style={{ "--x": c.side === "left" ? c.x : 1 - c.x, top: `${c.y * 100}%`, "--d": `${i * 90}ms` }}
            aria-hidden="true"
          >
            <span className="annot-pill">
              <b>{i + 1}</b>
              {c.label}
            </span>
            <span className="annot-line" />
          </span>
        ))}
      </div>
      <ol className="annot-list">
        {callouts.map((c) => (
          <li key={c.label}>{c.label}</li>
        ))}
      </ol>
    </figure>
  );
}

/* colors: [name, hex, use, textColorOnSwatch][] */
export function Swatches({ colors }) {
  const [copied, setCopied] = useState(null);
  const copy = async (hex) => {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      /* clipboard blocked: still show the feedback */
    }
    setCopied(hex);
    setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1400);
  };
  return (
    <>
      <h3 className="sg-h">Color</h3>
      <ul className="swatches">
        {colors.map(([name, hex, use, on]) => (
          <li key={hex}>
            <button
              type="button"
              className={`chip${copied === hex ? " copied" : ""}`}
              style={{ background: hex, color: on }}
              onClick={() => copy(hex)}
              aria-label={`Copy ${name} ${hex}`}
            >
              <span>Aa</span>
              <span className="chip-copy" aria-hidden="true">
                {copied === hex ? "Copied!" : "Copy"}
              </span>
            </button>
            <b>{name}</b>
            <code>{hex}</code>
            <span>{use}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/* rows: { font, use, sample, style } for live text, or { font, use, img, alt } for a
   crop of the real design (fonts that can't be loaded on the web). */
export function TypeSpecimens({ rows }) {
  return (
    <>
      <h3 className="sg-h">Typography</h3>
      <div className="type">
        {rows.map((r) => (
          <div className="type-row" key={r.use}>
            <div className="type-meta">
              <b>{r.font}</b>
              <span>{r.use}</span>
            </div>
            <div className="type-sample" style={r.style}>
              {r.img ? <Img name={r.img} alt={r.alt} className="type-img" /> : r.sample}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* Components as labelled cards in groups.
   groups: { title, items: { img, alt, name, note?, wide?, tint? }[] }[] */
export function KitGroups({ groups, label }) {
  return (
    <>
      <h3 className="sg-h">Components</h3>
      <div aria-label={label}>
        {groups.map((g) => (
          <div className="kit-group" key={g.title} role="group" aria-label={g.title}>
            <h4>{g.title}</h4>
            <div className="kit-grid">
              {g.items.map((it) => (
                <figure className={`kit-card${it.wide ? " wide" : ""}`} key={it.img}>
                  <div className={`kit-tile${it.tint ? " tint" : ""}`}>
                    <Img name={it.img} alt={it.alt} zoom />
                  </div>
                  <figcaption>
                    <b>{it.name}</b>
                    {it.note && <span>{it.note}</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export function Kit({ label, children }) {
  return (
    <>
      <h3 className="sg-h">Components</h3>
      <div className="kit" aria-label={label}>
        {children}
      </div>
    </>
  );
}
