import { CaseStudy, Sec } from "../../components/CaseStudy.jsx";
import { Img } from "../../components/Img.jsx";
import { Process, Annotated } from "../../components/DesignSystem.jsx";
import { Walkthrough } from "../../components/Walkthrough.jsx";
import { InfoCards } from "../../components/Story.jsx";

const GARDEN = ["dokmai-sunflower", "dokmai-tulip", "dokmai-lily", "dokmai-hibiscus", "dokmai-grass", "dokmai-scarecrow"];

const PROCESS = [
  { title: "Concept", text: "Turn favorite songs into a garden you grow.", tags: ["Idea"] },
  { title: "Illustrate", text: "Drew every flower by hand in crayon.", tags: ["Hand illustration"] },
  { title: "UI design", text: "Designed search, flower picker and garden screens.", tags: ["Mobile web", "UI exploration"] },
];

const DEMO = [
  {
    img: "demo-dok-search",
    alt: "Which song you picking? A search box and a list of songs with album covers",
    device: "phone",
    title: "Pick a song",
    text: "Search for a song you love, or pick one from the list.",
    action: "Choose Robber by The 1975",
    hot: [0.08, 0.385, 0.84, 0.09],
  },
  {
    img: "demo-dok-pick",
    alt: "Which component you picking? A hand-drawn marigold with arrows to browse and a Pick button",
    device: "phone",
    title: "Choose a flower",
    text: "Browse the hand-drawn flowers with the arrows. Each one comes with a short line, like the marigold's.",
    action: "Pick the marigold",
    hot: [0.3, 0.825, 0.4, 0.055],
  },
  {
    img: "demo-dok-garden",
    alt: "The Mustard garden: a grid of planted flowers, a music player, and Visit and Share butterflies",
    device: "phone",
    title: "Plant it in your garden",
    text: "The flower joins your plot while the song plays below. Every flower in the grid is a song.",
    action: "Visit other gardens",
    hot: [0.06, 0.24, 0.19, 0.09],
  },
  {
    img: "demo-dok-visit",
    alt: "A friend's farm card with a short description, under the song search",
    device: "phone",
    title: "Visit a friend's garden",
    text: "Look around other people's gardens and visit the ones you like.",
    action: "Visit this farm",
    hot: [0.36, 0.785, 0.28, 0.095],
  },
];

const GARDEN_CALLOUTS = [
  { label: "Visit other gardens", x: 0.14, y: 0.28, side: "left" },
  { label: "Each flower is a planted song", x: 0.3, y: 0.5, side: "left" },
  { label: "The song that is playing", x: 0.07, y: 0.775, side: "left" },
  { label: "Garden name", x: 0.82, y: 0.165, side: "right" },
  { label: "Share your garden", x: 0.86, y: 0.28, side: "right" },
  { label: "Play, pause and skip", x: 0.8, y: 0.845, side: "right" },
];

const CHOICES = [
  {
    title: "Sketched, not polished",
    text: "The search box, the garden grid and the buttons are drawn as rough pencil lines, so the interface matches the crayon flowers.",
  },
  {
    title: "Butterflies as buttons",
    text: "Visit and Share are hand-drawn butterflies, so even the navigation stays inside the garden.",
  },
  {
    title: "Music stays in view",
    text: "The player sits right under the garden, so the song keeps playing while you plant and look around.",
  },
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

      <Sec title="Try the prototype">
        <div className="cs-text">
          <p>Grow one flower, from picking a song to visiting a friend's garden, on the real screens.</p>
        </div>
        <Walkthrough steps={DEMO} label="DOK-MAI prototype" done="Your song is planted. Your garden grows one flower at a time." />
      </Sec>

      <Sec title="Inside the garden">
        <div className="cs-text">
          <p>The garden screen holds everything at once: your plot, the song playing, and ways to share it.</p>
        </div>
        <Annotated img="demo-dok-garden" alt="DOK-MAI garden screen on a phone" callouts={GARDEN_CALLOUTS} width={280} />
      </Sec>

      <Sec title="Design choices">
        <div className="cs-text">
          <p>Three decisions keep the whole app feeling like one hand-made garden.</p>
        </div>
        <InfoCards items={CHOICES} label="Design choices" />
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
