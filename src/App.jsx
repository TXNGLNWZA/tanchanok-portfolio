import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { bySlug } from "./data.js";
import { LightboxProvider } from "./components/Lightbox.jsx";
import { useReveal } from "./components/useReveal.js";
import Home from "./pages/Home.jsx";
import ElderlyCare from "./pages/cases/ElderlyCare.jsx";
import Tripped from "./pages/cases/Tripped.jsx";
import DokMai from "./pages/cases/DokMai.jsx";
import ArtTeam from "./pages/cases/ArtTeam.jsx";
import Inits from "./pages/cases/Inits.jsx";
import Logos from "./pages/cases/Logos.jsx";

/* Case study page per project slug (slugs match PROJECTS in data.js). */
const CASES = {
  "elderly-care": ElderlyCare,
  tripped: Tripped,
  "dok-mai": DokMai,
  "art-team": ArtTeam,
  inits: Inits,
  logos: Logos,
};
const HOME_ANCHORS = ["work", "process", "about", "contact", "experience"];

/* ---------- ROUTER ----------
   Hash-based: #/ home, #/work|about|contact|experience scroll on home,
   #/work/<slug> renders a case study. */
const readPath = () => location.hash.replace(/^#\/?/, "");
function useHashPath() {
  const [path, setPath] = useState(readPath);
  useEffect(() => {
    const on = () => setPath(readPath());
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  return path;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(scrollY > 8);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`top${scrolled ? " scrolled" : ""}`} id="top">
      <div className="wrap">
        <a className="mark" href="#/">
          Tanchanok.<b>design</b>
          <i>WORK</i>
        </a>
        <nav className="nav" aria-label="Main">
          <a href="#/work">Work</a>
          <a href="#/about">About</a>
          <a href="#/contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  const path = useHashPath();
  const main = useRef(null);
  const wasHome = useRef(false);
  // the case study last opened, so coming back lands on its card instead of the top of Work
  const lastCase = useRef(null);
  const slug = path.match(/^work\/([\w-]+)$/)?.[1];
  const Case = slug && CASES[slug];
  // Home just mounted (first load or coming back from a case study): jump, don't animate.
  const fresh = !Case && !wasHome.current;
  useEffect(() => {
    wasHome.current = !Case;
  });

  useReveal(main, Case ? slug : "home");

  useLayoutEffect(() => {
    if (Case) {
      lastCase.current = slug;
      document.title = `${bySlug[slug].short} — Tanchanok Juntongkaew`;
      window.scrollTo({ top: 0, behavior: "instant" });
      main.current.querySelector("h1")?.focus({ preventScroll: true });
      return;
    }
    document.title = "Tanchanok Juntongkaew — UX/UI Designer";
    const from = lastCase.current;
    lastCase.current = null;
    if (fresh && from && (path === "work" || path === "")) {
      const card = main.current.querySelector(`a.card[href="#/work/${from}"]`);
      if (card) {
        card.scrollIntoView({ block: "center", behavior: "instant" });
        card.focus({ preventScroll: true });
        return;
      }
    }
    if (HOME_ANCHORS.includes(path)) {
      const raf = requestAnimationFrame(() =>
        document.getElementById(path)?.scrollIntoView({ behavior: fresh ? "instant" : "smooth" }),
      );
      return () => cancelAnimationFrame(raf);
    } else if (fresh || path === "") {
      window.scrollTo({ top: 0, behavior: fresh ? "instant" : "smooth" });
    }
  }, [path]);

  return (
    <LightboxProvider>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} ref={main}>
        {Case ? <Case key={slug} project={bySlug[slug]} /> : <Home />}
      </main>
    </LightboxProvider>
  );
}
