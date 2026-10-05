import { useRef, useState } from "react";
import { PROJECTS } from "../data.js";
import { Img } from "./Img.jsx";
import { Toc } from "./Toc.jsx";

/* Page frame for a case study: back link, title, summary, facts, then the
   sections passed as children, then the "Next project" link. */
export function CaseStudy({ project, summary, facts, children }) {
  const i = PROJECTS.findIndex((p) => p.slug === project.slug);
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const body = useRef(null);
  return (
    <div className="wrap">
      <a className="back" href="#/work">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 5l-7 7 7 7"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        All work
      </a>
      <div className="cs-head">
        <h1 tabIndex={-1}>{project.title}</h1>
        <p className="sum">{summary}</p>
        <dl className="facts">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <Toc root={body} />
      <div ref={body}>{children}</div>
      <div className="next">
        <a href={`#/work/${next.slug}`}>
          <small>Next project</small>
          <strong>{next.short}</strong>
        </a>
        <a href="#/work" className="back" style={{ margin: 0 }}>
          Back to all work
        </a>
      </div>
    </div>
  );
}

/* Section with the slate bar heading. */
export function Sec({ title, sub, children }) {
  return (
    <div className="cs-sec">
      <div className="barhead">
        <div>
          <h2>{title}</h2>
          {sub && <p>{sub}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

/* Before/after tabs. `before` and `after` are { img, alt, text, extra? }.
   `extra` renders full width under that panel only (e.g. screens that only exist after). */
export function BeforeAfter({ id, before, after }) {
  const [active, setActive] = useState("before");
  const tabs = useRef({});
  const order = ["before", "after"];
  const onKey = (e, which) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = order[(order.indexOf(which) + 1) % order.length];
    setActive(n);
    tabs.current[n].focus();
  };
  return (
    <div className="ba">
      <div className="seg" role="tablist" aria-label="Compare versions">
        {order.map((which) => (
          <button
            key={which}
            ref={(el) => (tabs.current[which] = el)}
            role="tab"
            id={`${id}-t-${which}`}
            aria-controls={`${id}-${which}`}
            aria-selected={active === which}
            tabIndex={active === which ? 0 : -1}
            onClick={() => setActive(which)}
            onKeyDown={(e) => onKey(e, which)}
          >
            {which === "before" ? "Before" : "After"}
          </button>
        ))}
      </div>
      {order.map((which) => {
        const d = which === "before" ? before : after;
        return (
          <div
            key={which}
            className="ba-panel"
            id={`${id}-${which}`}
            role="tabpanel"
            aria-labelledby={`${id}-t-${which}`}
            hidden={active !== which}
          >
            <div className="plated">
              <Img name={d.img} alt={d.alt} zoom />
            </div>
            <div>
              <span className="ba-label">{which === "before" ? "Before" : "After"}</span>
              <p>{d.text}</p>
            </div>
            {d.extra && <div className="ba-extra">{d.extra}</div>}
          </div>
        );
      })}
    </div>
  );
}
