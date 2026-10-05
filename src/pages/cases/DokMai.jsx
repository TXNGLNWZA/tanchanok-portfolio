import { CaseStudy, Sec } from "../../components/CaseStudy.jsx";
import { Img } from "../../components/Img.jsx";
import { Process } from "../../components/DesignSystem.jsx";

const GARDEN = ["dokmai-sunflower", "dokmai-tulip", "dokmai-lily", "dokmai-hibiscus", "dokmai-grass", "dokmai-scarecrow"];

const PROCESS = [
  { title: "Concept", text: "Turn favorite songs into a garden you grow.", tags: ["Idea"] },
  { title: "Illustrate", text: "Drew every flower by hand in crayon.", tags: ["Hand illustration"] },
  { title: "UI design", text: "Designed search, flower picker and garden screens.", tags: ["Mobile web", "UI exploration"] },
];

export default function DokMai({ project }) {
  return (
    <CaseStudy
      project={project}
      summary="The idea: your favorite songs become a garden you grow, decorate and share. Pick a song, choose a flower, and plant it in your plot."
      facts={[
        ["Role", "UI design and illustration"],
        ["Type", "UI exploration"],
        ["Platform", "Mobile web"],
      ]}
    >
      <div
        className="cs-hero p-cream"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,2.2fr)",
          gap: "4%",
          alignItems: "center",
        }}
      >
        <Img name="dokmai-picker" alt="Choosing a marigold for your garden" zoom />
        <Img name="dokmai-screens" alt="Song search, garden grid and farm detail screens" zoom />
      </div>

      <Sec title="Design process">
        <div className="cs-text">
          <p>A small UI exploration, led by the illustrations.</p>
        </div>
        <Process steps={PROCESS} />
      </Sec>

      <Sec title="How it works">
        <div className="cs-text">
          <p>
            You search for a song you love, pick the flower that matches it, and plant it in your garden
            grid while the song plays. Gardens can be decorated and shared with friends.
          </p>
        </div>
      </Sec>

      <Sec title="Drawn by hand">
        <div className="cs-text">
          <p>
            I hand-illustrated every flower in DOK-MAI. The crayon texture keeps the interface warm and
            personal, closer to a sketchbook than an app store screenshot.
          </p>
        </div>
        <div className="garden mt">
          {GARDEN.map((k) => (
            <Img key={k} name={k} alt={k === "dokmai-scarecrow" ? "Hand-drawn scarecrow" : "Hand-drawn flower"} />
          ))}
        </div>
      </Sec>
    </CaseStudy>
  );
}
