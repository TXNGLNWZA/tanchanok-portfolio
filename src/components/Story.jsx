import { Img } from "./Img.jsx";

/* Numbered cards for problems or findings. items: { title, text }[] */
export function InfoCards({ items, label }) {
  return (
    <ol className="info-cards" aria-label={label}>
      {items.map((it, i) => (
        <li key={it.title}>
          <span className="info-n" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3>{it.title}</h3>
          <p>{it.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* Big-number result tiles. items: { value, label }[] */
export function StatTiles({ items, label }) {
  return (
    <dl className="stats" aria-label={label}>
      {items.map((s) => (
        <div key={s.label}>
          <dt>{s.label}</dt>
          <dd>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* What testing found and what changed, with small before and after screens.
   items: { title, found, changed, before, after, alt }[] */
export function FixCards({ items }) {
  return (
    <div className="fixes">
      {items.map((f) => (
        <article key={f.title} className="fix">
          <h3>{f.title}</h3>
          <div className="fix-shots">
            <figure>
              <Img name={f.before} alt={`${f.alt}, before testing`} zoom sizes="(max-width: 640px) 44vw, 260px" />
              <figcaption>Before</figcaption>
            </figure>
            <span className="fix-arrow" aria-hidden="true">
              →
            </span>
            <figure>
              <Img name={f.after} alt={`${f.alt}, after testing`} zoom sizes="(max-width: 640px) 44vw, 260px" />
              <figcaption>After</figcaption>
            </figure>
          </div>
          <dl>
            <dt>Found</dt>
            <dd>{f.found}</dd>
            <dt>Changed</dt>
            <dd>{f.changed}</dd>
          </dl>
        </article>
      ))}
    </div>
  );
}
