import { CaseStudy, Sec } from "../../components/CaseStudy.jsx";
import { Img } from "../../components/Img.jsx";
import { Process } from "../../components/DesignSystem.jsx";

const PROCESS = [
  { title: "Study", text: "Look at the subject: a club, a museum, a university.", tags: ["Research"] },
  { title: "One idea", text: "Pick one idea from it: brackets, an elephant, a dome.", tags: ["Concept"] },
  { title: "Build the mark", text: "Build the logo around that single idea.", tags: ["Logo design"] },
];

const LOGOS = [
  {
    name: "INITS",
    img: "logo-inits",
    alt: "INITS logo: code brackets around the letters",
    tone: "light",
    idea: "Code brackets",
    text: "The club's official logo. The brackets stand for its coding roots.",
  },
  {
    name: "Museum Diary",
    img: "logo-museum-diary",
    extra: "logo-elephant",
    alt: "Museum Diary logo, with people drawn to form an elephant",
    tone: "light",
    idea: "An elephant",
    text: "A concept brand with Thai identity at its core. The people in it form an elephant.",
  },
  {
    name: "Digital Technology and Innovation",
    img: "logo-dti",
    alt: "Digital Technology and Innovation logo built on the university dome",
    tone: "dark",
    idea: "The dome",
    text: "A competition entry anchored on the university's iconic dome.",
  },
];

export default function Logos({ project }) {
  return (
    <CaseStudy
      project={project}
      summary="A few identities, each built around one idea from its subject."
      facts={[
        ["Role", "Logo designer"],
        ["Includes", "Club identity, concept brand, competition entry"],
      ]}
    >
      <Sec title="Design process">
        <div className="cs-text">
          <p>Every logo here follows the same three steps.</p>
        </div>
        <Process steps={PROCESS} />
      </Sec>

      <Sec title="Selected logos">
        <div className="cs-text">
          <p>Three identities, each built around a single idea taken from its subject.</p>
        </div>
        <div className="logo-grid">
          {LOGOS.map((l) => (
            <figure key={l.name} className="logo-card">
              <div className={`logo-plate ${l.tone}`}>
                <Img name={l.img} alt={l.alt} zoom className="logo-mark" sizes="(max-width: 860px) 80vw, 320px" />
                {l.extra && (
                  <span className="logo-origin" aria-hidden="true">
                    <Img name={l.extra} alt="" sizes="60px" />
                    <svg width="26" height="40" viewBox="0 0 26 40" fill="none">
                      <path d="M6 38C4 26 8 14 18 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M11 5l7-1 0 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="hand">it started as an elephant</span>
                  </span>
                )}
              </div>
              <figcaption>
                <b>{l.name}</b>
                <span className="logo-idea">{l.idea}</span>
                {l.text}
              </figcaption>
            </figure>
          ))}
        </div>
      </Sec>
    </CaseStudy>
  );
}
