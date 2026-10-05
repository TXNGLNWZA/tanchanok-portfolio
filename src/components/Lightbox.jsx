import { createContext, useCallback, useContext, useRef, useState } from "react";

const LightboxContext = createContext(() => {});
export const useLightbox = () => useContext(LightboxContext);

export function LightboxProvider({ children }) {
  const dialog = useRef(null);
  const [shown, setShown] = useState({ src: "", alt: "" });
  const open = useCallback((src, alt) => {
    setShown({ src, alt });
    dialog.current.showModal();
  }, []);
  return (
    <LightboxContext.Provider value={open}>
      {children}
      <dialog
        className="lb"
        ref={dialog}
        aria-label="Image preview"
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
      >
        <button type="button" aria-label="Close" onClick={() => dialog.current.close()}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
        </button>
        <img src={shown.src || undefined} alt={shown.alt} />
      </dialog>
    </LightboxContext.Provider>
  );
}
