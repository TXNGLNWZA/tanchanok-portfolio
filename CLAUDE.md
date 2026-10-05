# Tanchanok Juntongkaew — Portfolio

Personal portfolio for Tanchanok Juntongkaew, a UI/UX designer who builds with React.
Audience: recruiters and hiring managers for UX/UI design roles (she is not looking for frontend roles). They skim, so the
home page must show who she is, her strongest work, and how to contact her within seconds.

## Stack and how to run

React 19 + Vite. No router library, no CSS framework; plain CSS with class names.

- `index.html` — Vite entry: fonts, meta, `#root`
- `src/main.jsx` — mounts `<App>`, imports `styles.css`
- `src/App.jsx` — hash router, header, `<main>`, `CASES` map (slug -> page component)
- `src/data.js` — `IMG_SIZES` image registry, `PROJECTS`, `EMAIL`, `LINKEDIN`
- `src/styles.css` — all styles, design tokens at the top
- `src/pages/Home.jsx` — home page (hero, work cards, experience, about, contact)
- `src/pages/cases/*.jsx` — one file per case study
- `src/components/` — `Img`/`Photo`, `Lightbox`, `CaseStudy`/`Sec`/`BeforeAfter`, `Eyes`,
  `Toc`, `useReveal`, `Walkthrough` (clickable prototype demo), `Story` (`InfoCards`, `StatTiles`,
  `FixCards`), `DesignSystem` (`Process` timeline, `Annotated`, `Flow`, `Swatches`, `TypeSpecimens`, `Kit`, `KitGroups`),
  `Doodles` (`Arrow`, `Star`, `Note`)
- `public/assets/images/*.webp` — all images, named `<project>-<what>.webp`

```
npm install
npm run dev        # local dev server
npm run build      # production build into dist/
npm run preview    # serve dist/ locally
```

Deployed with GitHub + Vercel: pushing to `main` redeploys. Link previews use
`public/og-image.jpg` (1200x630) and the Open Graph tags in `index.html`, whose URLs must be
absolute and match the live address; update both if the domain changes.
Deploy `dist/` to GitHub Pages, Netlify or Vercel (build command `npm run build`, output `dist`).
`base: "./"` in `vite.config.js` makes it work at a domain root or a sub-path. Hash routing means
no server rewrites are needed.

## How the app works

- **Routing:** hash-based. `#/` home, `#/work`, `#/about`, `#/contact`, `#/experience` render home
  and scroll to that section. `#/work/<slug>` renders a case study. See `useHashPath()` and the
  layout effect in `App.jsx` (sets title, scroll, focuses the case study `h1`).
- **Projects:** `PROJECTS` in `data.js` holds card data (slug, title, short, desc, role, years).
  Order in the array = order of the "Next project" links.
- **Case studies:** each is a component wrapped in `<CaseStudy project summary facts>` (back link,
  title, facts, "Next project"). Inside, use `<Sec title>` (section with bar heading),
  `<BeforeAfter id before after>`, `<Photo>`, `<Img>`.
- **Images:** always use `<Img name alt className zoom style>`. `name` must exist in `IMG_SIZES`
  in `data.js` with its pixel width/height. `zoom` opens the lightbox on click.
- **Hero:** `Hero` in `Home.jsx` (`.h2-*` styles) fills the first screen (`min-height: 100svh`
  minus the header; compact rules for short screens) so the work section starts after a scroll.
  Name with the eyes, lead, CTAs, the cut-out bulb on a navy block (no single
  featured project: Tanchanok did not want one project singled out), and a facts strip. No scroll cue icon (Tanchanok removed it). 
- **Home sections** are full-width `.band`s (`<section className="band band-<id>"><div className="wrap">`);
  Process and About get the `--tint-blue` band so each part reads as its own page.
- **Fireflies:** `<FireflyField>` sits only in the home hero (Tanchanok found them cluttered on
  every page): 16 glowing yellow dots that wander and, while the mouse is over the hero,
  gradually gather and circle around the pointer, then drift off a few seconds after it stops.
  Off under reduced motion; paused when the tab is hidden.
- **Home order:** hero → My design process → Work → Experience → About → Contact. Process comes
  first so readers know how she works before they open the case studies.
- **Back to where you were:** opening a case study remembers its slug (`lastCase` in `App.jsx`);
  coming back to `#/work` or `#/` (back link or browser back) scrolls to and focuses that card
  instead of the top of the Work section.
- **Eyes on the Ö:** the two dots above the O in the hero name follow the pointer (`Eyes.jsx`).
  This is the signature detail, taken from "PORTFÖLIO" in her original design.
  Disabled under `prefers-reduced-motion`.

### Adding a project

1. Add images to `public/assets/images/` as WebP (see image rules) and register them in `IMG_SIZES`.
2. Add an entry to `PROJECTS`.
3. Create `src/pages/cases/YourProject.jsx` and add it to `CASES` in `App.jsx` under its slug.
4. Add a card to `Home.jsx` (feature cards in `.work-grid`, graphic work in `.mini-grid`).

## Design system

Derived from her original portfolio design (a long collage-style Figma/Canva page). Keep it.

- **Colors** (tokens in `:root`, dark-mode overrides below them):
  paper `#F5F5F5` (bg), navy `#0D3B66` (ink and blocks), sun yellow `#F5D93B` (accents,
  underlines, focus ring), slate `#86A1B5` (dividers, surname, heading bars), lime `#BCC54A`.
  Plate tints: `--tint-blue`, `--tint-cream`, fixed `.p-sun`, `.p-paper` (white), `.p-ink` (dark).
- **Type:** Poppins for everything; Gochi Hand for short handwritten notes only
  ("that's me!", annotations). Never use the hand font for long text; it is hard to read on phones.
- **Motifs:** heading with a slate vertical bar (`.barhead`), centered heading between two lines
  (`.divider`), handwritten notes with curly arrows, cut-out images with transparent backgrounds,
  yellow sticker badges.
- **Design process:** the home page (`#/process`) and every case study have a "Design process"
  section using `<Process steps>` (title, short text, method chips). Steps must come from facts
  already on the site or in her CV.
- **Case-study sections:** always heading (`<Sec>`) → plain paragraph in `.cs-text` → visuals.
  No handwritten intro lines and no body text placed below the images; captions go in
  `<figcaption>`. The hand font is only for small annotations on images and cards.
- **Motion:** content eases up the first time it scrolls into view (`useReveal.js`, selectors in
  `TARGETS`), process dots pop in, annotation lines draw in, fireflies drift in the home hero and slowly gather at the pointer, the bulb floats. All of it is off under
  `prefers-reduced-motion` and the page is fully visible without JS. Keep motion subtle.
- **Case-study navigation:** `<Toc>` (inside `CaseStudy`) is a sticky "On this page" bar built from
  the `<Sec>` headings, with a yellow reading-progress line. It uses buttons, not `#id` links,
  because the hash is the router.
- **Prototype demos:** `<Walkthrough steps done>` steps through real screens in a phone or browser
  frame; `hot: [x, y, w, h]` (0..1 of the screen image) is the tap target. Demo screens are
  `demo-eld-*` (Figma frames from the project report) and `demo-trm-*` (TRIPPED phone screens with Phuket sample data, cropped
  out of the iPhone mockups embedded in her pitch deck `Downloads/Tripped_วช.pdf`).
- **Annotated screens:** `<Annotated img callouts>` puts numbered callouts with leader lines on a
  phone screen (x, y as 0..1 of the image). Labels must describe only what is on the screen.
- Must stay responsive (breakpoints 860px and 640px), keyboard accessible, and work in dark mode.

## Image rules

- WebP, quality ~74. Max long edge: 1400px for wide screenshots, ~900px for photos,
  ~560px for square tiles, ~400px for small illustrations.
- Keep transparency for cut-outs (phones, flowers, merch).
- Any image can also get a sharper `<name>@2x.webp` (up to 2× width, never upscaled past the
  original; max 2800px). Add it to `HI_RES` in `data.js` with the @2x file's real width. The
  page gets a `srcset`, so high-density screens load the @2x file, and the lightbox always
  does. Pass `sizes` to `<Img>` with the width the image is shown at (default assumes full
  content width) so small thumbnails stay on the 1x file.
- Originals: her portfolio PDF (`Portfolio-Tanchanok_Juntongkaew (1).pdf`) embeds most images
  at higher resolution than the site used. Extract with pypdfium2 (`get_bitmap(render=True)`
  keeps transparency; use `render=False` for photos whose layout mask crops them). The
  Elderly care UI screens are embedded at the same low resolution; their Figma exports live in
  `OneDrive/Desktop/ภาพประกอบ/Management system for an elderly care center/` (desktop
  1920×1080 = admin views, mobile 390px = caregiver views, plus the on-site photos). Admin
  screens go in a 16:9 laptop frame so the sidebar is not cropped.
  When replacing a file, keep its name and update `IMG_SIZES` / `HI_RES`.

## Content sources and rules

- Elderly care facts (problem, 4 testing rounds and dates, design changes, 32 test scenarios,
  310 automated tests, satisfaction 3.75/5 from 3 users, owner 4.25, caregivers 3.50, next steps)
  come from her project report `Downloads/68kts02.pdf`. Its report page N is PDF page N + 20;
  before/after screens are on report pages 54 to 65, mobile flows on 150 to 176. Do not publish
  the names of center staff or owners from the report, and keep the problem statement neutral.
- TRIPPED name: her team was called Duck, so TRIPPED = TRIP + PED (เป็ด, duck).
- TRIPPED numbers come from the pitch deck: 70% of Thai travelers use apps to plan trips (Wongnai
  study), 86% of ASEAN travelers choose AI as a trip-planning assistant (Travel Insights 2024), both
  confirmed by Tanchanok; market 72M / 53M / 7M (13.5%).

- Facts come from her CV and original portfolio. Do not invent metrics, outcomes, team sizes
  or tools that aren't stated.
- Contact: email tanchanok.ju@gmail.com, LinkedIn linkedin.com/in/tanchanokjtk.
  The phone number is intentionally not on the public site.
- Copy style: plain English, sentence case, active voice, no filler.

## Open items (confirm with Tanchanok)

- Hero says "CS graduate" (CV lists graduation May 2026). Revert to "student" if not graduated.
- Art Team years: original design said 2022–2023, CV says Aug 2023 – May 2024. Site uses 2023–2024.
- TRIPPED award year is 2025 (Thailand Research Expo 2025), confirmed by Tanchanok. The CV's
  "NRCT 2024" is the year she worked on the project, not the award year; update the CV to match.
- DOK-MAI role/year is not in the CV. Site says "UI design and illustration", "UI exploration".
- Contact section says she is open to UX/UI design roles (confirmed: UX/UI only, no status pill in the hero).
- No resume download yet. To add: put the PDF in `assets/` and link it from the hero and contact.
- TRIPPED design system: Agbalumo (script headline) confirmed by Tanchanok. Playfair Display,
  Montserrat and Inter were identified visually from the Figma exports; confirm. Pages, routes
  and `#071386` / `#071069` come from the TRIPPED React source; other colors were sampled
  from the designs. `tripped-pdf-*` and `tripped-guide-p1..6` are rendered from the original
  Lampang itinerary PDFs in the TRIPPED frontend repo (`public/`).
- Elderly care design system: font Khwan Thong confirmed by Tanchanok. It is not a web font,
  so type specimens and components are crops of the 1920px login screenshot. Colors were sampled
  from the screens.
- The DTI competition logo image contains the typo "Innovtion" (in the artwork itself).
- Experience items without case studies (TU room booking system, True Corporation internship,
  therapy card game) could become case studies if she has visuals.
