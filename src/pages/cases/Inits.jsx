import { CaseStudy, Sec } from "../../components/CaseStudy.jsx";
import { Img, Photo } from "../../components/Img.jsx";
import { Process } from "../../components/DesignSystem.jsx";

const PROCESS = [
  { title: "Design", text: "Made posters, name tags and the club shirt.", tags: ["Posters", "Merch"] },
  { title: "Launch", text: "Each recruitment poster had a QR code to apply.", tags: ["QR sign-up"] },
  { title: "Screen", text: "Screened every application.", tags: ["Applications"] },
  { title: "Interview", text: "Ran structured interviews and mentored new members.", tags: ["Interviews", "Mentoring"] },
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
        <div className="g2" style={{ alignItems: "center" }}>
          <Photo name="inits-workshop-poster" alt="Workshop poster for How to Train Your AI" />
          <div className="plated p-blue" style={{ display: "flex", gap: "6%", justifyContent: "center" }}>
            <Img
              name="inits-nametag-dark"
              alt="Dark name tag design"
              zoom
              style={{ width: "40%", transform: "rotate(-4deg)" }}
            />
            <Img
              name="inits-nametag-light"
              alt="Light name tag design"
              zoom
              style={{ width: "40%", transform: "rotate(4deg)" }}
            />
          </div>
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
