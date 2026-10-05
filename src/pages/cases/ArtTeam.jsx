import { CaseStudy, Sec } from "../../components/CaseStudy.jsx";
import { Img, Photo } from "../../components/Img.jsx";
import { Process } from "../../components/DesignSystem.jsx";

const HOUSES = [
  ["art-java-sketch", "art-java-final", "Java"],
  ["art-cpp-sketch", "art-cpp-final", "C++"],
  ["art-python-sketch", "art-python-final", "Python"],
  ["art-golang-sketch", "art-golang-final", "Golang"],
];

const PROCESS = [
  { title: "Brief", text: "Started from each faculty event and what it needed.", tags: ["Events", "Merch"] },
  { title: "Sketch", text: "Every crest started as a hand sketch.", tags: ["Hand sketches"] },
  { title: "Design", text: "Turned sketches into final artwork and posters.", tags: ["Logos", "Posters", "Infographics"] },
  { title: "Produce", text: "The T-shirt was produced and sold across the faculty.", tags: ["Print", "Event staff"] },
];

export default function ArtTeam({ project }) {
  return (
    <CaseStudy
      project={project}
      summary="As part of the Art Team on the student committee, I designed merchandise, house identities and event graphics for the Faculty of Science and Technology."
      facts={[
        ["Role", "Graphic designer, event staff"],
        ["Team", "Faculty Art Team"],
      ]}
    >
      <Sec title="Design process">
        <div className="cs-text">
          <p>Each piece went from a faculty event brief to something printed and used.</p>
        </div>
        <Process steps={PROCESS} />
      </Sec>

      <Sec title="Faculty merch">
        <div className="g2" style={{ alignItems: "center" }}>
          <figure className="plated p-sun">
            <Img name="art-tshirt" alt="Black faculty T-shirt, front and back" zoom />
            <figcaption>
              Co-designed the faculty T-shirt with the Art Team. It was produced and sold to students
              across the faculty.
            </figcaption>
          </figure>
          <figure
            className="plated p-blue"
            style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "1rem", alignItems: "center" }}
          >
            <Img name="art-charm" alt="Atom-shaped acrylic charm" />
            <Img name="art-keychain" alt="Heart-shaped keychains with an ERROR tag" zoom />
            <figcaption style={{ gridColumn: "1/-1" }}>Designed a matching keychain to complete the collection.</figcaption>
          </figure>
        </div>
        <div className="plated p-ink mt" style={{ display: "flex", justifyContent: "center" }}>
          <Img name="art-barcode" alt="Science and Technology barcode graphic" style={{ width: "min(520px,100%)" }} />
        </div>
      </Sec>

      <Sec title="House logos">
        <div className="cs-text">
          <p>
            Four houses for the faculty's orientation program, each named after a programming language
            and its animal. Every crest started as a hand sketch.
          </p>
        </div>
        <div className="houses mt">
          {HOUSES.map(([s, f, n]) => (
            <div className="pair" key={n}>
              <div>
                <span>Sketch</span>
                <Img name={s} alt={`${n} house crest sketch`} zoom />
              </div>
              <div>
                <span>Final</span>
                <Img name={f} alt={`${n} house crest, final`} zoom />
              </div>
            </div>
          ))}
        </div>
      </Sec>

      <Sec title="Event graphics">
        <div className="cs-text">
          <p>
            I served as staff for the faculty's house sports competition and orientation event, while
            designing the posters and infographics that promoted them.
          </p>
        </div>
        <div className="g2 mt">
          <Photo name="art-quattro-poster" alt="Quattro Partite wizard tournament poster" />
          <Photo name="art-advisor-graphic" alt="Advisor meeting announcement graphic" />
        </div>
        <div className="g3 mt">
          <Photo name="art-treasure-1" alt="Treasure Hunt game title screen" />
          <Photo name="art-treasure-3" alt="Treasure Hunt how-to-play screen" />
          <Photo name="art-treasure-2" alt="Treasure Hunt start menu" />
        </div>
        <div className="g3 mt">
          <Photo name="art-staff-costumes" alt="Staff in wizard costumes at the event" />
          <Photo name="art-stage" alt="The team on stage at Quattro Partite" />
          <Photo name="art-staff-night" alt="Staff group photo at night" />
        </div>
      </Sec>
    </CaseStudy>
  );
}
