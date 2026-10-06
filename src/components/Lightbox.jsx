import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IMG } from "../data.js";

const LightboxContext = createContext(() => {});
export const useLightbox = () => useContext(LightboxContext);

/* One shared <dialog> for enlarged images. open(src, alt) shows a single image;
   open(src, alt, gallery, index) shows an image from a set ({ name, alt, label }[]),
   with previous / next buttons (no previous on the first, no next on the last), a counter and
   the arrow keys. The page behind does not scroll while the lightbox is open. */
export function LightboxProvider({ children }) {
  const dialog = useRef(null);
  const [shown, setShown] = useState({
    src: "",
    alt: "",
    gallery: null,
    index: 0,
  });

  const open = useCallback((src, alt, gallery = null, index = 0) => {
    setShown({ src, alt, gallery, index });
    document.documentElement.classList.add("lb-open");
    dialog.current.showModal();
  }, []);

  const go = useCallback((step) => {
    setShown((s) => {
      if (!s.gallery) return s;
      const index = s.index + step;
      if (index < 0 || index >= s.gallery.length) return s;
      const item = s.gallery[index];
      return { ...s, index, src: IMG[item.name].zoomSrc, alt: item.alt };
    });
  }, []);

  useEffect(() => {
    const d = dialog.current;
    const key = (e) => {
      if (!d.open) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [go]);

  // preload the neighbours so flipping is instant
  useEffect(() => {
    const g = shown.gallery;
    if (!g) return;
    for (const step of [1, -1]) {
      const it = g[shown.index + step];
      if (it) new Image().src = IMG[it.name].zoomSrc;
    }
  }, [shown]);

  const g = shown.gallery;
  return (
    <LightboxContext.Provider value={open}>
      {children}
      <dialog
        className="lb"
        ref={dialog}
        aria-label={g ? "Image gallery" : "Image preview"}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        onClose={() => document.documentElement.classList.remove("lb-open")}
      >
        <button
          type="button"
          className="lb-close"
          aria-label="Close"
          onClick={() => dialog.current.close()}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 5l14 14M19 5L5 19"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <img src={shown.src || undefined} alt={shown.alt} draggable="false" />
        {g && (
          <>
            {shown.index > 0 && (
              <button
                type="button"
                className="lb-nav lb-prev"
                aria-label="Previous image"
                onClick={() => go(-1)}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M15 5l-7 7 7 7"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
            {shown.index < g.length - 1 && (
              <button
                type="button"
                className="lb-nav lb-next"
                aria-label="Next image"
                onClick={() => go(1)}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
            <p className="lb-count" aria-live="polite">
              <b>
                {shown.index + 1} / {g.length}
              </b>
              {g[shown.index].label && <span>{g[shown.index].label}</span>}
            </p>
          </>
        )}
      </dialog>
    </LightboxContext.Provider>
  );
}
