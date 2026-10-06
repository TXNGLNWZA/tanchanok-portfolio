import { CaseStudy, Sec } from "../../components/CaseStudy.jsx";
import { Img, Photo } from "../../components/Img.jsx";
import { Process } from "../../components/DesignSystem.jsx";

const PROCESS = [
  { title: "Design", text: "Made posters, name tags and the club shirt.", tags: ["Posters", "Merch"] },
  { title: "Launch", text: "Each recruitment poster had a QR code to apply.", tags: ["QR sign-up"] },
  { title: "Screen", text: "Screened every application.", tags: ["Applications"] },
  { title: "Interview", text: "Ran structured interviews and mentored new members.", tags: ["Interviews", "Mentoring"] },
];

const TAGS = [
  {
    img: "inits-nametag-dark",
    tone: "staff",
    label: "Staff",
    text: "Black tag, so participants can spot who to ask for help.",
    alt: "Black staff name tag reading How to Train Your AI, Tang",
  },
  {
    img: "inits-nametag-light",
    tone: "guest",
    label: "Participant",
    text: "White tag with the same frame, so the set still feels like one.",
    alt: "White participant name tag reading How to Train Your AI, Tawan",
  },
];

export default function Inits({ project }) {
  return (
    <CaseStudy
      project={project}
      summary="INITS (Innovation Network Integrating Technology for Society) is a student tech club. Alongside leading the people team, I designed much of what members and applicants see."
      facts={[
        ["Role", "Head of People Team, designer"],
        ["People work", "Recruitment, interviews, mentoring, member tracking"],
      ]}
    >
      <Sec title="Design process">
        <div className="cs-text">
          <p>Design and people work fed each other: the posters brought in applicants, then I ran the recruitment.</p>
        </div>
        <Process steps={PROCESS} />
      </Sec>

      <Sec title="Workshop: How to Train Your AI">
        <div className="cs-text">
          <p>
            For the club's AI workshop I designed the poster and the name tags. The tags come in two
            colors so anyone in the room can tell at a glance who is running the workshop and who is
            taking part.
          </p>
        </div>
        <figure className="mt">
          <Img name="inits-workshop-poster" alt="Workshop poster for How to Train Your AI" zoom style={{ width: "100%", borderRadius: "14px" }} />
        </figure>
        <div className="lanyards mt">
          {TAGS.map((t) => (
            <figure key={t.img} className={`lanyard ${t.tone}`}>
              <div className="lanyard-hang">
                <svg className="lanyard-strap" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M8 0 L44 100 M92 0 L56 100" />
                </svg>
                <span className="lanyard-clip" aria-hidden="true" />
                <Img name={t.img} alt={t.alt} zoom className="lanyard-card" sizes="(max-width: 640px) 44vw, 300px" />
              </div>
              <figcaption>
                <b>{t.label}</b>
                {t.text}
              </figcaption>
            </figure>
          ))}
        </div>
        <figure className="mt">
          <Img
            name="inits-workshop-group"
            alt="Workshop participants and staff group photo"
            zoom
            style={{ borderRadius: "14px" }}
          />
          <figcaption>The poster, name tags and staff materials for the workshop.</figcaption>
        </figure>
      </Sec>

      <Sec title="Recruitment">
        <div className="cs-text">
          <p>
            Posters for recruiting new members, each with a QR code to apply. I also ran the recruitment
            process itself: screening applications and conducting structured interviews.
          </p>
        </div>
        <div className="g2 mt">
          <Photo name="inits-recruit-retro" alt="Retro desktop-style INITS recruitment poster" />
          <Photo name="inits-recruit-robot" alt="Robot-themed INITS recruitment poster" />
        </div>
      </Sec>

      <Sec title="The official shirt">
        <figure className="plated p-paper">
          <Img
            name="inits-shirt"
            alt="Navy INITS polo shirt, back and front"
            zoom
            style={{ maxWidth: "720px", margin: "0 auto" }}
          />
        </figure>
      </Sec>
    </CaseStudy>
  );
}
