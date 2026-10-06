import { renderToString } from "react-dom/server";
import App from "./App.jsx";

/* Build-time render (scripts/prerender.mjs): the page's HTML for a route, so crawlers, link
   previews and AI summarizers that do not run JavaScript still see the content. */
export const render = (path) => renderToString(<App initialPath={path} />);
export { PROJECTS } from "./data.js";
