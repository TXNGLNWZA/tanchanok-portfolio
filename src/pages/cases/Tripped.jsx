import { CaseStudy, Sec } from "../../components/CaseStudy.jsx";
import { Img, Photo } from "../../components/Img.jsx";
import { Process } from "../../components/DesignSystem.jsx";
import { UserFlow, StyleGuide } from "./TrippedSystem.jsx";
import { Annotated } from "../../components/DesignSystem.jsx";
import { Walkthrough } from "../../components/Walkthrough.jsx";
import { StatTiles } from "../../components/Story.jsx";

const HOME_CALLOUTS = [
  { label: "TRIPPED logo", x: 0.14, y: 0.117, side: "left" },
  { label: "Destination photo", x: 0.2, y: 0.3, side: "left" },
  { label: "Where to go and when, in one box", x: 0.25, y: 0.505, side: "left" },
  { label: "Menu", x: 0.86, y: 0.117, side: "right" },
  { label: "Search", x: 0.75, y: 0.58, side: "right" },
  { label: "Trip gallery: completed journeys", x: 0.7, y: 0.755, side: "right" },
];

const DEMO = [
  {
    img: "demo-trm-where",
    alt: "Where to go: a search box with Phuket suggested below",
    device: "phone",
    title: "Pick a destination",
    text: "Type where you want to go and pick it from the suggestions.",
    action: "Choose Phuket",
    hot: [0.03, 0.19, 0.9, 0.05],
  },
  {
    img: "demo-trm-dates",
    alt: "Calendar for September 2025 with the 20th selected",
    device: "phone",
    title: "Pick your dates",
    text: "Choose the first and last day of the trip on the calendar.",
    action: "End the trip on the 29th",
    hot: [0.58, 0.515, 0.11, 0.06],
  },
  {
    img: "demo-trm-search",
    alt: "Home screen with Phuket and 20/09/2025 - 29/9/2025 filled in, and a search button",
    device: "phone",
    title: "Search",
    text: "Destination and dates are filled in. One button plans the trip.",
    action: "Search",
    hot: [0.1, 0.553, 0.8, 0.052],
  },
  {
    img: "demo-trm-choose",
    alt: "Choose your perfect trip: two Phuket guides, each tagged Nature, Culture, Society",
    device: "phone",
    title: "Choose a trip",
    text: "Two itineraries come back, each built around a theme. Pick the one that fits.",
    action: "Choose the first trip",
    hot: [0.12, 0.37, 0.76, 0.29],
  },
  {
    img: "demo-trm-guide",
    alt: "The Phuket guide cover, with a download button, a next page arrow and a customize box",
    device: "phone",
    title: "Flip through the guide",
    text: "The trip opens as a PDF guide. Swipe through the pages before deciding.",
    action: "Next page",
    hot: [0.855, 0.495, 0.12, 0.065],
  },
  {
    img: "demo-trm-timeline",
    alt: "The guide's timeline page, with a Customize your trip box below",
    device: "phone",
    title: "Customize it",
    text: "Want something different? Ask for it in plain words under the guide.",
    action: "Type a request",
    hot: [0.07, 0.843, 0.86, 0.05],
  },
  {
    img: "demo-trm-typed",
    alt: "Customize box with the request: can we include more exciting and adventurous activities?",
    device: "phone",
    title: "Send the request",
    text: "For example: can we include more exciting and adventurous activities?",
    action: "Send",
    hot: [0.83, 0.843, 0.12, 0.05],
  },
  {
    img: "demo-trm-guide",
    alt: "The Phuket guide cover with the download button at the top right",
    device: "phone",
    title: "Download it",
    text: "Happy with the plan? Download the guide to take on the trip.",
    action: "Download the guide",
    hot: [0.8, 0.185, 0.12, 0.06],
  },
];

const TRENDS = [
  { value: "70%", label: "Thai travelers who use apps to plan trips" },
  { value: "86%", label: "ASEAN travelers who choose AI as a trip-planning assistant" },
];

const MARKET = [
  { value: "72M", label: "ASEAN travelers who use AI" },
  { value: "53M", label: "AI-using travelers in our target countries" },
  { value: "7M", label: "First-wave tech-savvy users (13.5%)" },
];

const GUIDE_PAGES = [
  ["Cover", "Lampang guide cover: Culture, Nature, Peace, with four highlight photos"],
  ["Highlights", "Highlights page with four places, each with a photo and short write-up"],
  ["Place detail", "Ratsada Bridge detail page with activities and a location map"],
  ["Timeline", "Day-by-day timeline table with time, place, activity and notes"],
  ["Expenses", "Expense table per group and per person, with a donut chart by category"],
  ["Back cover", "Back cover: Plan, Explore, Discover"],
];

const GUIDE_GALLERY = GUIDE_PAGES.map(([label, alt], i) => ({ name: `tripped-guide-p${i + 1}`, alt, label }));

const logoTile = { aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center" };
const logoSize = { width: "min(46%, 180px)" };

const PROCESS = [
  { title: "Research", text: "Ran user research into how people plan trips.", tags: ["User research"] },
  { title: "Wireframe", text: "Laid out search, trip choice and the guide.", tags: ["Wireframes", "User flow"] },
  { title: "UI design", text: "Designed the interface for desktop and mobile.", tags: ["Figma", "Design system"] },
  { title: "Prototype", text: "Built responsive prototypes of the full flow.", tags: ["Responsive prototype"] },
  { title: "Showcase", text: "Presented at the Thailand Research Expo 2025.", tags: ["Silver Medal"] },
];

export default function Tripped({ project }) {
  return (
    <CaseStudy
      project={project}
      summary="An AI-based travel app that helps people plan trips through personalized itineraries, then generates a PDF guide for each trip."
      facts={[
        ["Role", "UX/UI designer"],
        ["Recognition", "Silver Medal, NRCT research competition 2025"],
      ]}
    >
      <div className="cs-hero p-blue">
        <Img
          name="tripped-devices-home"
          alt="TRIPPED home screen on a laptop and a phone, with destination search"
          zoom
        />
      </div>

      <Sec title="Design process">
        <div className="cs-text">
          <p>From research to a responsive prototype, then onto the expo stage.</p>
        </div>
        <Process steps={PROCESS} />
      </Sec>

      <Sec title="Why TRIPPED">
        <div className="cs-text">
          <p>
            Planning a trip means jumping between sites for places, hotels and routes, and it leaves people
            tired before they leave. We pitched TRIPPED as the opposite: one search, a full plan, and a
            guide to take along, built around three promises: convenient, comprehensive and confident.
          </p>
          <p>Travelers already plan on their phones, and more and more of them hand the planning to AI.</p>
        </div>
        <StatTiles items={TRENDS} label="How travelers plan" />
        <p className="source">
          Sources: a study of what keeps people using travel-planning apps (Wongnai case study); Travel
          Insights 2024.
        </p>
        <div className="cs-text mt">
          <p>
            We sized the first audience with the diffusion of innovation theory, starting from travelers
            in ASEAN who already use AI.
          </p>
        </div>
        <StatTiles items={MARKET} label="Who TRIPPED is for first" />
        <figure className="pitch mt">
          <Img
            name="tripped-pitch"
            alt="TRIPPED makes planning easy, ready for every trip: home search, choose your perfect trip and the Lampang guide on three phones, above a www.tripped.com search bar"
            zoom
            sizes="(max-width: 940px) 100vw, 900px"
          />
          <figcaption>
            I also designed this infographic to pitch the app in one picture: search, choose a trip, get the
            guide.
          </figcaption>
        </figure>
      </Sec>

      <Sec title="Planning a trip">
        <div className="cs-text">
          <p>
            I ran user research and designed the trip-planning interfaces, moving from wireframes to
            responsive prototypes for desktop and mobile. People search for a destination and dates,
            then choose between two itineraries built around what they care about: nature, culture or
            local life.
          </p>
        </div>
        <Annotated img="tripped-home" alt="TRIPPED home screen on a phone" callouts={HOME_CALLOUTS} width={280} />
        <figure className="plated p-blue mt">
          <Img
            name="tripped-devices-choose"
            alt="Choosing between two suggested itineraries on a laptop and a phone"
            zoom
          />
          <figcaption>
            The same choice on both screens: side by side on desktop, stacked on mobile.
          </figcaption>
        </figure>
      </Sec>

      <Sec title="User flow">
        <div className="cs-text">
          <p>Three screens, one straight path from search to a downloadable guide.</p>
        </div>
        <UserFlow />
      </Sec>

      <Sec title="Try the prototype">
        <div className="cs-text">
          <p>
            Plan a trip on a phone, from choosing a destination to downloading the guide. These are the
            real app screens; the sample guide changes between a few of them.
          </p>
        </div>
        <Walkthrough
          steps={DEMO}
          label="TRIPPED prototype"
          done="Download complete. The trip is planned and the guide is ready to go."
        />
      </Sec>

      <Sec title="A PDF guide for every trip">
        <div className="cs-text">
          <p>
            Each trip becomes a downloadable PDF itinerary with highlights, photos and short write-ups for
            destinations across Thailand.
          </p>
        </div>
        <figure className="plated p-blue mt">
          <Img
            name="tripped-desktop-preview"
            alt="Previewing the Phuket itinerary pages on desktop, with download and customize options"
            zoom
            sizes="(max-width: 940px) 100vw, 1000px"
            style={{ maxWidth: "min(860px,100%)", margin: "0 auto" }}
          />
          <figcaption>
            On desktop, people flip through the guide page by page before downloading it, and can ask
            to customize the trip.
          </figcaption>
        </figure>
        <div className="g2 mt" style={{ alignItems: "center" }}>
          <Img name="tripped-pdf-culture" alt="Lampang itinerary PDF, culture edition" zoom sizes="(max-width: 640px) 92vw, 540px" />
          <Img name="tripped-pdf-nature" alt="Lampang itinerary PDF, nature edition" zoom sizes="(max-width: 640px) 92vw, 540px" />
        </div>
        <h3 className="sg-h">Inside the guide: Lampang, culture edition</h3>
        <ol className="guide-pages">
          {GUIDE_PAGES.map(([label, alt], i) => (
            <li key={label}>
              <Img name={`tripped-guide-p${i + 1}`} alt={alt} zoom sizes="(max-width: 860px) 30vw, 180px" gallery={GUIDE_GALLERY} index={i} />
              <span>
                {i + 1}. {label}
              </span>
            </li>
          ))}
        </ol>
      </Sec>

      <Sec title="Design system">
        <div className="cs-text">
          <p>
            One small set of colors, type roles and components is shared by desktop and mobile. The
            values match the React build, which used Tailwind CSS, shadcn/ui and lucide icons: the
            brand blue ships as <code>bg-[#071386]</code> and <code>text-[#071386]</code>.
          </p>
        </div>
        <StyleGuide />
      </Sec>

      <Sec title="The logo">
        <div className="cs-text">
          <p>
            Our team was called Duck, so the name is a pun: TRIP plus PED, and ped (เป็ด) is Thai for
            duck. I designed the logo as a duck mark in three versions: brand blue for light screens, white
            for photos and the blue footer, and black.
          </p>
        </div>
        <div className="g3 mt" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
          <div className="plated p-paper" style={logoTile}>
            <Img name="tripped-duck-blue" alt="TRIPPED duck logo in brand blue" style={logoSize} />
          </div>
          <div className="plated" style={{ ...logoTile, background: "#071386" }}>
            <Img name="tripped-duck-white" alt="TRIPPED duck logo in white on brand blue" style={logoSize} />
          </div>
          <div className="plated" style={{ ...logoTile, background: "#d3d6ee" }}>
            <Img name="tripped-duck-black" alt="TRIPPED duck logo in black" style={logoSize} />
          </div>
        </div>
      </Sec>

      <Sec title="At the expo">
        <div className="cs-text">
          <p>
            We presented TRIPPED at the Thailand Research Expo 2025, where it was recognized in the NRCT
            research competition.
          </p>
        </div>
        <div className="award mt">
          <span className="award-badge" aria-hidden="true">
            <svg width="46" height="52" viewBox="4.5 1.5 15 21" fill="none">
              <path d="M8 2h8l-2 6h-4z" fill="#0d3b66" />
              <circle cx="12" cy="15" r="6.5" fill="#fff" stroke="#0d3b66" strokeWidth="1.6" />
              <path
                d="M12 11.6l1 2.1 2.3.3-1.7 1.6.4 2.3-2-1.1-2 1.1.4-2.3-1.7-1.6 2.3-.3z"
                fill="#86a1b5"
              />
            </svg>
          </span>
          <div>
            <p className="award-kicker">Award</p>
            <p className="award-title">Silver Medal</p>
            <p className="award-sub">NRCT research competition, Thailand Research Expo 2025</p>
          </div>
        </div>
        <div className="g2 mt expo-grid">
          <div className="expo-stack">
            <Photo
              name="tripped-expo-award"
              alt="The team with the award at the Thailand Research Expo"
              sizes="(max-width: 640px) 92vw, 540px"
            />
            <Photo
              name="tripped-certificate"
              alt="Silver Medal certificate from the National Research Council of Thailand, Higher Education Innovation Awards 2025"
              sizes="(max-width: 640px) 92vw, 540px"
            />
          </div>
          <figure className="photo expo-tall">
            <Img name="tripped-expo-booth" alt="Presenting TRIPPED at the booth" zoom sizes="(max-width: 640px) 92vw, 540px" />
          </figure>
        </div>
      </Sec>
    </CaseStudy>
  );
}
