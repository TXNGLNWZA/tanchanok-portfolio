import { bySlug as p, EMAIL, LINKEDIN } from "../data.js";
import { Img } from "../components/Img.jsx";
import { Star } from "../components/Doodles.jsx";
import { Eyes } from "../components/Eyes.jsx";
import { FireflyField } from "../components/FireflyField.jsx";
import { Process } from "../components/DesignSystem.jsx";

const PROCESS = [
  { title: "Research", text: "Talk to the people who will use it, on-site when I can.", tags: ["Interviews", "Field visits"] },
  { title: "Define", text: "Turn what I learn into requirements and flows.", tags: ["BRD", "Swimlane flows", "Sequence diagrams", "Use cases"] },
  { title: "Design", text: "Shape the flow, then the screens.", tags: ["Wireframes", "UX flows", "Figma"] },
  { title: "Test", text: "Watch real users try the prototype.", tags: ["Usability testing"] },
  { title: "Build", text: "Build the interface so what ships matches what was tested.", tags: ["React", "Tailwind CSS"] },
];

const shadow = "0 10px 24px rgba(0,0,0,.18)";

function Meta({ slug }) {
  return (
    <p className="meta">
      <span>{p[slug].role}</span>
      <span>{p[slug].years}</span>
    </p>
  );
}

/* Hero: fills the first screen. */
function Hero() {
  return (
    <div className="h2-outer">
      <FireflyField />
      <div className="wrap h2">
        <div className="h2-text">
          <div className="h2-namebox">
            <h1 className="h2-name" aria-label="Tanchanok Juntongkaew">
              TANCHAN
              <span className="o">
                O<Eyes />
              </span>
              K<span className="h2-surname">JUNTONGKAEW</span>
            </h1>
          </div>
          <div className="h2-intro">
            <Img name="me" alt="Tanchanok Juntongkaew" className="h2-me" sizes="72px" />
            <p className="h2-lead">
              <b>UX/UI Designer</b> With a background in Computer Science, I turn complex problems into
              simple, intuitive experiences.
            </p>
          </div>
          <div className="btns">
            <a className="btn primary" href="#/work">
              See my work
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a className="btn ghost" href={`mailto:${EMAIL}`}>
              Email me
            </a>
            <a className="h2-link" href={LINKEDIN} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="h2-art" aria-hidden="true">
          <span className="h2-panel" />
          <span className="h2-ring" />
          <Img name="hero-bulb" className="h2-bulb" sizes="(max-width: 860px) 70vw, 460px" />
        </div>

        <dl className="h2-facts">
          <div>
            <dt>Education</dt>
            <dd>B.Sc. Computer Science, Thammasat University</dd>
          </div>
          <div>
            <dt>Recognition</dt>
            <dd>Silver Medal, Thailand Research Expo 2025</dd>
          </div>
          <div>
            <dt>Approach</dt>
            <dd>Research, design and build, end to end</dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>Figma, React, Tailwind CSS</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <section id="process" className="band band-process" aria-labelledby="process-h">
        <div className="wrap">
        <div className="barhead">
          <div>
            <h2 id="process-h">My design process</h2>
          </div>
        </div>
        <div className="cs-text">
          <p>The same five steps run through every project below, from the care center system to TRIPPED.</p>
        </div>
        <Process steps={PROCESS} />
        </div>
      </section>

      <section id="work" className="band band-work" aria-labelledby="work-h">
        <div className="wrap">
        <div className="divider">
          <h2 id="work-h">My design journey</h2>
        </div>
        <div className="work-grid">
          <a className="card feature" href="#/work/elderly-care">
            <div className="plate p-navy">
              <Img
                name="elderly-card"
                alt="Login screen of the care center system on a laptop and a phone"
                style={{ width: "86%", marginTop: "4%" }}
              />
            </div>
            <div>
              <h3>{p["elderly-care"].title}</h3>
              <p className="desc">{p["elderly-care"].desc}</p>
              <Meta slug="elderly-care" />
              <span className="hand" style={{ display: "block", marginTop: "1rem", fontSize: "1.25rem" }}>
                tested on-site with real caregivers
              </span>
              <span className="go">Read the case study</span>
            </div>
          </a>
          <a className="card" href="#/work/tripped">
            <div className="plate p-blue">
              <Img
                name="tripped-card"
                alt="TRIPPED home screen on a laptop and the trip picker on a phone"
                style={{ width: "88%", marginTop: "8%" }}
              />
              <span className="badge" aria-hidden="true">
                Silver
                <br />
                Medal!
              </span>
            </div>
            <h3>{p.tripped.title}</h3>
            <p className="desc">{p.tripped.desc}</p>
            <Meta slug="tripped" />
            <span className="go">Read the case study</span>
          </a>
          <a className="card" href="#/work/dok-mai">
            <div className="plate p-cream">
              <Img name="dokmai-picker" alt="DOK-MAI flower picker screen" style={{ width: "30%" }} />
              <Img
                name="dokmai-sunflower"
                style={{ position: "absolute", width: "15%", left: "10%", bottom: "12%", transform: "rotate(-8deg)" }}
              />
              <Img
                name="dokmai-tulip"
                style={{ position: "absolute", width: "13%", right: "11%", top: "12%", transform: "rotate(6deg)" }}
              />
              <Img name="dokmai-grass" style={{ position: "absolute", width: "15%", right: "9%", bottom: "8%" }} />
            </div>
            <h3>{p["dok-mai"].title}</h3>
            <p className="desc">{p["dok-mai"].desc}</p>
            <Meta slug="dok-mai" />
            <span className="go">Read the case study</span>
          </a>
        </div>

        <div className="barhead subhead">
          <div>
            <h2>Graphic and brand work</h2>
          </div>
        </div>
        <div className="mini-grid">
          <a className="card" href="#/work/art-team">
            <div className="plate p-sun">
              <Img name="art-tshirt" alt="Faculty T-shirt front and back" style={{ width: "86%" }} />
            </div>
            <h3>{p["art-team"].title}</h3>
            <p className="desc">{p["art-team"].desc}</p>
            <span className="go">View project</span>
          </a>
          <a className="card" href="#/work/inits">
            <div className="plate p-blue">
              <Img
                name="inits-recruit-retro"
                alt="INITS recruitment poster"
                style={{ width: "52%", transform: "rotate(-5deg) translateX(-18%)", boxShadow: shadow }}
              />
              <Img
                name="inits-recruit-robot"
                style={{
                  position: "absolute",
                  width: "44%",
                  right: "10%",
                  top: "22%",
                  transform: "rotate(6deg)",
                  boxShadow: "0 10px 24px rgba(0,0,0,.2)",
                }}
              />
            </div>
            <h3>{p.inits.title}</h3>
            <p className="desc">{p.inits.desc}</p>
            <span className="go">View project</span>
          </a>
          <a className="card" href="#/work/logos">
            <div className="plate p-paper" style={{ flexDirection: "column", gap: "12%" }}>
              <Img name="logo-inits" alt="INITS logo" style={{ width: "62%" }} />
              <Img name="logo-museum-diary" alt="Museum Diary logo" style={{ width: "62%" }} />
            </div>
            <h3>{p.logos.title}</h3>
            <p className="desc">{p.logos.desc}</p>
            <span className="go">View project</span>
          </a>
        </div>
        </div>
      </section>

      <section id="experience" className="band band-experience" aria-labelledby="xp-h">
        <div className="wrap">
        <div className="barhead">
          <div>
            <h2 id="xp-h">Experience</h2>
          </div>
        </div>
        <ol className="xp">
          <li>
            <span className="when">Aug 2025 – Apr 2026</span>
            <div>
              <h3>Business Analyst, UX/UI Designer and Frontend Developer</h3>
              <p className="org">Management System for Elderly Care Center</p>
              <p className="what">
                Field research with caregivers, system workflows, and reusable React components for
                inventory, medication and scheduling. <a href="#/work/elderly-care">See the case study</a>
              </p>
            </div>
          </li>
          <li>
            <span className="when">Aug 2025 – Jan 2026</span>
            <div>
              <h3>UX/UI Designer Lead</h3>
              <p className="org">Thammasat University Lampang Campus</p>
              <p className="what">
                Led the design team for a university room booking system: task allocation, design
                direction, end-to-end flows across devices, and the design guidelines that kept every
                screen consistent and accessible.
              </p>
            </div>
          </li>
          <li>
            <span className="when">Jun 2025 – Jul 2025</span>
            <div>
              <h3>Developer Intern</h3>
              <p className="org">True Corporation, Strategic Project &amp; Leadership Development Team</p>
              <p className="what">
                Researched, designed and built a 360° evaluation tracking system with role-based
                dashboards, real-time status and automated scoring. Shipped full-stack with React, REST
                APIs, Vercel and Render.
              </p>
            </div>
          </li>
          <li>
            <span className="when">May 2025 – Jun 2025</span>
            <div>
              <h3>UX/UI Designer</h3>
              <p className="org">AI-based travel recommendation system (TRIPPED), NRCT Silver Medal 2025</p>
              <p className="what">
                Designed personalized trip-planning flows and the auto-generated PDF itineraries.{" "}
                <a href="#/work/tripped">See the case study</a>
              </p>
            </div>
          </li>
          <li>
            <span className="when">Aug 2024 – May 2025</span>
            <div>
              <h3>UX/UI Designer</h3>
              <p className="org">Digital therapy card game for schizophrenia (NSC 2025)</p>
              <p className="what">
                Turned an offline tool used in psychiatric care centers into a mobile card game with
                high-contrast, easy-to-read screens and progress tracking, tested with patients and social
                workers.
              </p>
            </div>
          </li>
          <li>
            <span className="when">Aug 2024 – May 2026</span>
            <div>
              <h3>Head of People Team</h3>
              <p className="org">INITS, Innovation Network Integrating Technology for Society</p>
              <p className="what">
                Ran recruitment and interviews, mentored members on goals and skills, and built a member
                tracking database. <a href="#/work/inits">See the design work</a>
              </p>
            </div>
          </li>
        </ol>
        </div>
      </section>

      <section id="about" className="band band-about" aria-labelledby="about-h">
        <div className="wrap">
        <div className="barhead">
          <div>
            <h2 id="about-h">About me</h2>
          </div>
        </div>
        <div className="about">
          <div>
            <p className="lead">
              I'm a UX/UI designer with a background in Computer Science. I enjoy turning complex
              problems into simple, intuitive experiences.
            </p>
            <p>
              My experience in business analysis and frontend development helps me connect user needs,
              business requirements and what is technically possible, at every step of the design
              process.
            </p>
            <p>
              My favorite projects put me in the room with real users, like sitting with caregivers at an
              elderly care center to watch how they actually used each screen. Outside of product work I
              design posters, merch and logos, and I draw the occasional flower.
            </p>
            <div className="edu">
              <b>Thammasat University</b>Bachelor of Science in Computer Science, 2022–2026
            </div>
          </div>
          <div className="skills">
            <h3>Design and research</h3>
            <Chips items={["Figma", "FigJam", "Wireframing", "UX flows", "User journey mapping", "Usability testing"]} />
            <h3>Analysis</h3>
            <Chips
              items={[
                "Requirement analysis",
                "Business requirements documents (BRD)",
                "Business flows (swimlane diagrams)",
                "Sequence diagrams",
                "Use case diagrams",
                "BPMN",
              ]}
            />
            <h3>Build</h3>
            <Chips items={["React.js", "JavaScript", "Tailwind CSS", "shadcn/ui", "REST APIs"]} />
          </div>
        </div>
        </div>
      </section>

      <section id="contact" className="band band-contact" aria-labelledby="contact-h">
        <div className="wrap">
        <div className="contact">
          <h2 id="contact-h">Let's build something people enjoy using.</h2>
          <p>Open to UX/UI design roles. The fastest way to reach me is email.</p>
          <div className="btns">
            <a className="btn primary" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <a className="btn ghost" href={LINKEDIN} target="_blank" rel="noopener">
              LinkedIn
            </a>
          </div>
          <div className="star">
            <Star />
          </div>
        </div>
        </div>
      </section>
    </>
  );
}

const Chips = ({ items }) => (
  <ul className="chips">
    {items.map((s) => (
      <li key={s}>{s}</li>
    ))}
  </ul>
);
