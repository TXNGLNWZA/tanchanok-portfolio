import { CaseStudy, Sec } from "../../components/CaseStudy.jsx";
import { Img } from "../../components/Img.jsx";
import { Process } from "../../components/DesignSystem.jsx";

const pad = "clamp(2rem,6vw,4rem)";

const PROCESS = [
  { title: "Study", text: "Look at the subject: a club, a museum, a university.", tags: ["Research"] },
  { title: "One idea", text: "Pick one idea from it: brackets, an elephant, a dome.", tags: ["Concept"] },
  { title: "Build the mark", text: "Build the logo around that single idea.", tags: ["Logo design"] },
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

      <Sec title="INITS">
        <div className="cs-text">
          <p>
            The official logo of INITS. The code brackets in the mark represent the club's coding roots.
          </p>
        </div>
        <div className="mt plated p-paper" style={{ padding: pad }}>
          <Img name="logo-inits" alt="INITS logo" style={{ width: "min(560px,90%)", margin: "0 auto" }} />
        </div>
      </Sec>

      <Sec title="Museum Diary">
        <div className="cs-text">
          <p>
            Designed with Thai cultural identity at its core. The illustration of people subtly forms the
            shape of an elephant.
          </p>
        </div>
        <div
          className="mt plated p-paper"
          style={{ padding: pad, display: "flex", alignItems: "center", justifyContent: "center", gap: "6%" }}
        >
          <Img name="logo-elephant" alt="Elephant silhouette" style={{ width: "min(120px,20%)" }} />
          <Img name="logo-museum-diary" alt="Museum Diary logo" style={{ width: "min(460px,65%)" }} />
        </div>
      </Sec>

      <Sec title="Digital Technology and Innovation">
        <div className="cs-text">
          <p>
            A logo designed for a competition. The design draws on the university's iconic dome as a
            visual anchor.
          </p>
        </div>
        <div className="mt plated p-ink" style={{ padding: pad }}>
          <Img
            name="logo-dti"
            alt="Digital Technology and Innovation logo"
            style={{ width: "min(460px,90%)", margin: "0 auto" }}
          />
        </div>
      </Sec>
    </CaseStudy>
  );
}
