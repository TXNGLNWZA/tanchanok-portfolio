import { useState } from "react";
/* TRIPPED user flow and style guide.
   The flow follows the TRIPPED React build; colors and type come from
   the Figma designs and that build. */
import { Flow, Swatches, TypeSpecimens, Kit } from "../../components/DesignSystem.jsx";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Agbalumo&family=Inter:wght@500&family=Montserrat:wght@500;600;700&family=Playfair+Display:wght@700&display=swap";

const FLOW = [
  ["Search", "Pick a province and travel dates."],
  ["Choose a trip", "Compare two itineraries, each built around a theme like Nature | Culture | Society."],
  ["Get the guide", "Flip through the PDF, download it, or ask to customize the trip."],
];

export const UserFlow = () => <Flow steps={FLOW} label="TRIPPED user flow" />;

const COLORS = [
  ["Tripped blue", "#071386", "Brand, headings, buttons, icons, footer", "#fff"],
  ["Blue hover", "#071069", "Pressed and hover state", "#fff"],
  ["Deep teal", "#0E3D4D", "Editorial headings", "#fff"],
  ["Lavender", "#D3D6EE", "Cards and soft surfaces", "#071386"],
  ["Lime", "#CCF32F", "Accent call to action", "#071386"],
  ["White", "#FFFFFF", "Page background", "#071386"],
];

const t = (font, use, sample, fontFamily, fontWeight, color) => ({ font, use, sample, style: { fontFamily, fontWeight, color } });
const TYPE = [
  t("Agbalumo Regular", "Hero headline, mobile page titles", "Get ready to be Tripped.", "Agbalumo, cursive", 400, "#071386"),
  t("Playfair Display Bold", "Section titles", "Completed Journeys", "'Playfair Display', serif", 700, "#0E3D4D"),
  t("Montserrat Bold", "Page titles", "Choose your perfect trip", "Montserrat, sans-serif", 700, "#071386"),
  t("Montserrat Medium", "Navigation, inputs, buttons, footer", "Where to go ?  ·  Our Destinations", "Montserrat, sans-serif", 500, "#071386"),
  t("Inter Medium", "Small labels", "Trip Gallery", "Inter, sans-serif", 500, "#0E3D4D"),
];

export function StyleGuide() {
  return (
    <>
      <link rel="stylesheet" href={FONTS} precedence="default" />

      <Swatches colors={COLORS} />
      <TypeSpecimens rows={TYPE} />

      <Kit label="TRIPPED UI components">
        <figure>
          <label className="kit-input">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input type="text" placeholder="Where to go ?" aria-label="Sample search field" />
          </label>
          <figcaption>Search field · 2px blue border</figcaption>
        </figure>
        <figure>
          <button type="button" className="kit-btn">Search</button>
          <figcaption>Primary · 6px radius</figcaption>
        </figure>
        <figure>
          <button type="button" className="kit-btn pill">Explore More</button>
          <figcaption>Pill button</figcaption>
        </figure>
        <figure>
          <button type="button" className="kit-btn pill lime">
            See all journeys <span className="kit-arrow" aria-hidden="true">→</span>
          </button>
          <figcaption>Accent pill</figcaption>
        </figure>
        <figure>
          <DownloadButton />
          <figcaption>Download · round icon</figcaption>
        </figure>
        <figure>
          <span className="kit-tag">Nature | Culture | Society</span>
          <figcaption>Theme label · display only</figcaption>
        </figure>
      </Kit>
    </>
  );
}

/* Download icon: the arrow drops into the tray, then a check confirms, like the app's
   download success state. */
function DownloadButton() {
  const [state, setState] = useState("idle");
  const click = () => {
    if (state !== "idle") return;
    setState("busy");
    setTimeout(() => setState("done"), 650);
    setTimeout(() => setState("idle"), 2200);
  };
  return (
    <button type="button" className={`kit-icon ${state}`} onClick={click} aria-label={state === "done" ? "Downloaded" : "Download"}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <g className="kit-dl-arrow">
          <path d="M12 4v11m-5-5l5 5 5-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <path className="kit-dl-tray" d="M5 20h14" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        <path className="kit-dl-check" d="M6 12.5l4 4 8-9" stroke="#ccf32f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
