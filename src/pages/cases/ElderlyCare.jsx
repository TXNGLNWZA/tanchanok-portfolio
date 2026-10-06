import { CaseStudy, Sec, BeforeAfter } from "../../components/CaseStudy.jsx";
import { Img, Photo } from "../../components/Img.jsx";
import { Process, Annotated, Swatches, TypeSpecimens, KitGroups } from "../../components/DesignSystem.jsx";
import { Walkthrough } from "../../components/Walkthrough.jsx";
import { ElderlyLiveKit } from "./ElderlyKit.jsx";
import { InfoCards, StatTiles, FixCards } from "../../components/Story.jsx";

const PROCESS = [
  { title: "Research", text: "Talked with caregivers and staff on-site.", tags: ["Field visits", "Interviews"] },
  { title: "Define", text: "Mapped how the center really works.", tags: ["Workflows", "Requirements"] },
  { title: "Design", text: "Designed the screens and a prototype in Figma.", tags: ["Wireframes", "Figma prototype"] },
  { title: "Test", text: "Four rounds on-site with the owner and the head caregiver.", tags: ["On-site usability testing", "Satisfaction survey"] },
  { title: "Build", text: "Built reusable React components.", tags: ["React", "REST APIs", "Automated tests"] },
];

const PROBLEMS = [
  {
    title: "Everything on paper",
    text: "Supplies, medicine and shift handovers were all written down by hand, so records could be lost, damaged or hard to look back through.",
  },
  {
    title: "Stock that didn't add up",
    text: "Staff signed for what they took, but the amounts written down didn't always match what left the shelf, so counts drifted.",
  },
  {
    title: "Doses hard to check",
    text: "There was no easy way to confirm afterwards that each resident got their medicine on time, so a missed dose could go unnoticed.",
  },
];

const ROUNDS = [
  { title: "19 Feb 2026", text: "Walked the people who would use it through the Figma prototype.", tags: ["Figma prototype"] },
  { title: "5 Mar 2026", text: "Tried the prototype on a phone, at the center.", tags: ["Mobile"] },
  { title: "12 Mar 2026", text: "Retested the revised prototype: phone with the head caregiver, computer with the owner.", tags: ["Mobile", "Desktop"] },
  { title: "20 Mar 2026", text: "Tested the working web app, then met the owner and head caregiver for final feedback.", tags: ["Web app"] },
];

const FIXES = [
  {
    title: "Inventory list",
    before: "elderly-fix-list-before",
    after: "elderly-fix-list-after",
    alt: "Supplies list",
    found: "The withdrawal chart at the top went unused. Staff cared about the list and each item's status.",
    changed: "Removed the chart. Added search, status filters and shortcuts to add, transfer and return items.",
  },
  {
    title: "Moving stock to a sub-store",
    before: "elderly-fix-transfer-before",
    after: "elderly-fix-transfer-after",
    alt: "Transfer screen",
    found: "The transfer screen used a different layout from the inventory list, so staff had to learn it again.",
    changed: "Reused the same table, with minus and plus buttons on each row to set the amount.",
  },
  {
    title: "Shift schedule",
    before: "elderly-fix-shift-before",
    after: "elderly-fix-shift-after",
    alt: "Shift schedule",
    found: "One row per resident made the table far too long. During testing the center also began grouping residents.",
    changed: "Rows became groups, split into day and night shifts, with the day's tasks set on the same screen.",
  },
];

const DEMO = [
  {
    img: "demo-eld-1",
    alt: "Caregiver's supplies list on a phone, with a cart button on each row",
    device: "phone",
    title: "Pick an item",
    text: "A caregiver opens the supplies list and taps the cart next to what a resident needs.",
    action: "Add diapers to the request",
    hot: [0.74, 0.295, 0.22, 0.055],
  },
  {
    img: "demo-eld-2",
    alt: "Request summary with an empty field for the resident's name",
    device: "phone",
    title: "Say who it's for",
    text: "The request summary lists the items and asks which resident they're for.",
    action: "Choose the resident",
    hot: [0.03, 0.495, 0.94, 0.065],
  },
  {
    img: "demo-eld-3",
    alt: "Request summary with the resident chosen and a send button",
    device: "phone",
    title: "Send the request",
    text: "With the resident chosen, one button sends the request for approval.",
    action: "Send the request",
    hot: [0.04, 0.735, 0.92, 0.07],
  },
  {
    img: "demo-eld-4",
    alt: "Caregiver's request status list with pending requests",
    device: "phone",
    title: "Track it",
    text: "The request waits under Pending in the caregiver's status list.",
    action: "Switch to the owner's view",
    hot: [0.03, 0.255, 0.94, 0.11],
  },
  {
    img: "demo-eld-5",
    alt: "Owner's request list on desktop with approve and reject buttons",
    device: "desktop",
    title: "See every request",
    text: "On the desktop, the owner sees every waiting request in one list.",
    action: "Open the supplies request",
    hot: [0.2, 0.13, 0.5, 0.15],
  },
  {
    img: "demo-eld-6",
    alt: "Request detail: requester, resident, items, amount asked, stock left and amount to approve",
    device: "desktop",
    title: "Approve with the stock in view",
    text: "The detail shows who asked, who it's for and how much is left in stock. The owner sets the amount and approves.",
    action: "Approve",
    hot: [0.885, 0.9, 0.095, 0.06],
  },
];

const RESULTS = [
  { value: "4", label: "Rounds of on-site testing" },
  { value: "32/32", label: "Test scenarios passed" },
  { value: "310", label: "Automated tests passed" },
  { value: "3.75/5", label: "Average satisfaction, 3 users" },
];

const COLORS = [
  ["Deep plum", "#2C1B47", "Text, headings, active menu and filters", "#fff"],
  ["Orchid", "#9256A1", "Primary buttons, sub-menus, breadcrumb links", "#fff"],
  ["Lilac", "#C5AAF3", "Mobile backgrounds, table headers", "#2C1B47"],
  ["Night violet", "#241445", "Login background", "#fff"],
  ["White", "#FFFFFF", "Cards and pages", "#2C1B47"],
  ["Status: good", "#C9E8A8", "Taken, normal stock", "#2C1B47"],
  ["Status: late", "#FCDB87", "Taken late, running low", "#2C1B47"],
  ["Status: missed", "#FEEDEC", "Not taken", "#2C1B47"],
];

const DOSE_CALLOUTS = [
  { label: "Pick the day", x: 0.17, y: 0.235, side: "left" },
  { label: "Doses grouped by meal, with a head count", x: 0.2, y: 0.355, side: "left" },
  { label: "Each resident and their dose", x: 0.3, y: 0.51, side: "left" },
  { label: "Filter the report", x: 0.84, y: 0.16, side: "right" },
  { label: "Button to record the dose", x: 0.73, y: 0.447, side: "right" },
];

const REUSE = [
  ["elderly-add-after", "Supplies"],
  ["elderly-form-medication", "Medication"],
  ["elderly-form-resident", "Resident"],
];

const KIT = [
  {
    title: "Navigation",
    items: [
      {
        img: "elderly-lib-nav",
        alt: "Admin menu states: default, expanded and each selected sub-page",
        name: "Admin menu",
        note: "Every state: default, expanded, and each selected sub-page.",
        wide: true,
        tint: true,
      },
    ],
  },
  {
    title: "Forms",
    items: [
      {
        img: "elderly-lib-units",
        alt: "Unit dropdown: empty, open list and each selected unit",
        name: "Unit dropdown",
        note: "Empty, open, and every unit the center stocks.",
        wide: true,
        tint: true,
      },
      {
        img: "elderly-lib-owner",
        alt: "Radio choice between center-owned and resident-owned supplies and medicine",
        name: "Item owner",
        note: "Center stock or the resident's own, for supplies and medicine.",
        tint: true,
      },
      { img: "elderly-lib-types", alt: "Radio group for item type", name: "Item type", note: "One choice per item.", tint: true },
    ],
  },
  {
    title: "Tables",
    items: [
      { img: "elderly-ui-thead", alt: "Lilac table header with sortable columns", name: "Table header", note: "Sortable columns.", wide: true },
    ],
  },
];

const TYPE = [
  { font: "Khwan Thong", use: "Page titles", img: "elderly-type-heading", alt: "Page title in Khwan Thong" },
  { font: "Khwan Thong", use: "Body text", img: "elderly-type-body", alt: "Body text in Khwan Thong" },
  { font: "Khwan Thong", use: "Form labels", img: "elderly-type-label", alt: "Form label in Khwan Thong" },
];

export default function ElderlyCare({ project }) {
  return (
    <CaseStudy
      project={project}
      summary="An elderly care center needed one system to track supplies, medication, residents and staff shifts. I worked on it from the first field visit to the React frontend."
      facts={[
        ["Role", "Business analyst, UX/UI designer, frontend developer"],
        ["Team", "2 students, 2 faculty advisors"],
        ["Users", "Center owner, head caregiver, caregivers"],
        ["Tools", "Figma, React, Tailwind CSS, shadcn/ui, REST APIs"],
        ["Status", "Pilot tested at the center"],
      ]}
    >
      <div className="cs-hero p-navy">
        <Img name="elderly-hero" alt="The system's login screen on laptop and phone" zoom />
      </div>

      <Sec title="The problem">
        <div className="cs-text">
          <p>
            On our field visits we watched how the center ran day to day and asked the owner, the head
            caregiver and caregivers where things went wrong. Three problems kept coming up.
          </p>
        </div>
        <InfoCards items={PROBLEMS} label="Problems found on site" />
        <div className="cs-text mt">
          <p>
            <b>The goal:</b> one web app that replaces the paper, keeps stock counts current, and lets the
            owner check every dose.
          </p>
        </div>
      </Sec>

      <Sec title="What I worked on">
        <div className="cs-text">
          <p>
            I started by talking with caregivers and staff to understand where medication tracking and
            care coordination broke down, then mapped the center's real workflows before designing
            anything.
          </p>
        </div>
        <ul className="cs-list">
          <li>
            <b>Inventory:</b> stock-in, withdrawal, transfer, and borrowing and return of supplies
          </li>
          <li>
            <b>Medication tracking</b> with photo-based verification
          </li>
          <li>
            <b>Health records</b> for each resident
          </li>
          <li>
            <b>Staff scheduling</b> with shift exchange
          </li>
        </ul>
        <div className="cs-text mt">
          <p>
            On the build side, I made responsive, reusable React components for the scheduling and
            inventory modules, with role-based views for caregivers and administrators, connected to
            backend services through REST APIs.
          </p>
        </div>
      </Sec>

      <Sec title="Design process">
        <div className="cs-text">
          <p>I followed the work from the first field visit to the React frontend in five steps.</p>
        </div>
        <Process steps={PROCESS} />
      </Sec>

      <Sec title="Testing where the work happens">
        <div className="cs-text">
          <p>
            I took the prototype out of Figma and into the actual care center, testing directly with
            the owner and the head caregiver on-site and watching how they really used each screen
            before calling it done. We ran four rounds: three on the prototype, one on the working app.
          </p>
        </div>
        <Process steps={ROUNDS} label="Testing rounds" />
        <div className="g2 mt">
          <Photo name="elderly-testing-1" alt="Walking a caregiver through the prototype on a laptop" />
          <Photo name="elderly-visit-residents" alt="The team visiting residents at the care center" />
          <Photo name="elderly-office" alt="Observing staff at the center's office computer" />
          <Photo name="elderly-testing-2" alt="Reviewing a screen with the head caregiver" />
        </div>
      </Sec>

      <Sec title="Designed for two roles">
        <div className="cs-text">
          <p>
            Administrators and caregivers need different things from the same data, so the system has
            two views. Administrators use the desktop version to manage inventory, medication and
            resident records. Caregivers use the mobile version for their daily reports, the medication
            round, medicine stock and the status of their requests.
          </p>
        </div>
        <figure className="plated p-blue mt">
          <Img
            name="elderly-admin"
            alt="Admin medication report on a laptop: each dose with its status and a photo as proof"
            zoom
            sizes="(max-width: 940px) 100vw, 1000px"
            style={{ maxWidth: "min(900px,100%)", margin: "0 auto" }}
          />
          <figcaption>
            Admin, desktop: the medication report lists every dose with its status (taken, taken late
            or not taken) and a photo as proof.
          </figcaption>
        </figure>
        <figure className="plated p-blue mt">
          <Img
            name="elderly-caregiver"
            alt="Caregiver screens on four phones: home, medication round, medicine stock and request status"
            zoom
          />
          <figcaption>
            Caregiver, mobile: daily reports, the medication round for each meal with a button to record
            each dose, medicine stock, and the status of every request.
          </figcaption>
        </figure>
        <Annotated
          img="elderly-phone-dose"
          alt="Caregiver medication round screen on a phone"
          callouts={DOSE_CALLOUTS}
        />
      </Sec>

      <Sec title="Try the prototype">
        <div className="cs-text">
          <p>
            One request, start to finish: a caregiver asks for supplies on a phone and the owner approves
            it on a desktop. These are the real prototype screens; the sample names and items change
            between screens.
          </p>
        </div>
        <Walkthrough
          steps={DEMO}
          label="Supplies request prototype"
          done="Approved. The stock count updates and the caregiver sees the result."
        />
      </Sec>

      <Sec title="Feature breakdown">
        <div className="cs-text">
          <p>
            Adding new items. Supplies, medication, residents and caregivers all enter the system through
            the same kind of form.
          </p>
        </div>
        <BeforeAfter
          id="f1"
          before={{
            img: "elderly-add-before",
            alt: "Original add-item modal dialog",
            text: "The modal was compact, but too cramped to fit all the required fields.",
          }}
          after={{
            img: "elderly-add-after",
            alt: "Redesigned full-page add-item form with grouped sections",
            text: "Rebuilt as a full-page form, with the fields grouped into clear sections. The same layout was then reused for every other add-item screen in the system, for consistency.",
            extra: (
              <div className="reuse">
                {REUSE.map(([name, label]) => (
                  <figure key={name}>
                    <Img name={name} alt={`Add ${label.toLowerCase()} form`} zoom sizes="(max-width: 640px) 92vw, 340px" />
                    <figcaption>{label}</figcaption>
                  </figure>
                ))}
              </div>
            ),
          }}
        />

      </Sec>

      <Sec title="Approving withdrawals">
        <div className="cs-text">
          <p>The center owner reviews and approves every request to withdraw supplies.</p>
        </div>
        <BeforeAfter
          id="f2"
          before={{
            img: "elderly-withdraw-before",
            alt: "Original notification pop-up covering the supplies list",
            text: "A pop-up notification that covered the screen behind it and didn't show enough, like remaining stock, to approve with confidence.",
          }}
          after={{
            img: "elderly-withdraw-after",
            alt: "Redesigned request list and request detail screens on two laptops",
            text: "Every request in one list, with approve and reject on each. The detail view shows who asked, who it's for, and the stock left next to each item, so the owner can set the approved amount without switching screens.",
          }}
        />
      </Sec>

      <Sec title="More fixes from testing">
        <div className="cs-text">
          <p>
            Each round of testing changed the design. Besides the two changes above, these three came
            straight from watching the owner and caregivers use the screens.
          </p>
        </div>
        <FixCards items={FIXES} />
      </Sec>

      <Sec title="Results">
        <div className="cs-text">
          <p>
            The system passed every test scenario we wrote, from logging in to shift swaps and daily
            reports. In a satisfaction survey (13 to 24 April 2026), the owner gave it 4.25 out of 5 and the
            two caregivers 3.50. Scheduling scored highest (4.80) and the add-resident form lowest (2.75),
            which matched feedback that the form asks for too much at once. The owner worked on a
            desktop and the caregivers on phones, which may explain part of the gap.
          </p>
          <p>
            With three people this is a pilot signal, not a statistic. The system has been tested at the
            center but isn't in full daily use yet.
          </p>
        </div>
        <StatTiles items={RESULTS} label="Results" />
        <h3 className="sg-h">What I would do next</h3>
        <ul className="cs-list">
          <li>Make the add-resident form easier to fill in.</li>
          <li>Make error messages clearer, so people can fix a wrong field quickly.</li>
          <li>Save medicine and resident records more reliably.</li>
          <li>Speed up how quickly the system responds.</li>
        </ul>
      </Sec>

      <Sec title="Design system">
        <div className="cs-text">
          <p>
            One purple palette and one Thai typeface, Khwan Thong, are shared by every screen, from
            the login page to inventory and requests.
          </p>
        </div>
        <Swatches colors={COLORS} />
        <TypeSpecimens rows={TYPE} />
        <h3 className="sg-h">Try the components</h3>
        <ElderlyLiveKit />
        <KitGroups groups={KIT} label="Care center UI components" />
      </Sec>
    </CaseStudy>
  );
}
