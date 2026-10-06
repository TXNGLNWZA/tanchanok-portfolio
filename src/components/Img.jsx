import { IMG } from "../data.js";
import { useLightbox } from "./Lightbox.jsx";

/* Every image goes through here. `name` must exist in IMG_SIZES (src/data.js).
   `zoom` wraps it in a button that opens the lightbox. `sizes` only matters for images
   with an @2x file (see HI_RES): "auto" lets the browser use the laid-out width of these
   lazy images; the fallback after it is for browsers without sizes="auto".
   `gallery` ({ name, alt, label }[]) and `index` make the lightbox page through a set. */
export function Img({ name, alt = "", className, zoom = false, style, sizes = "auto, (max-width: 1180px) 92vw, 1100px", gallery, index = 0 }) {
  const open = useLightbox();
  const d = IMG[name];
  if (!d) return null;
  const tag = (
    <img
      src={d.src}
      srcSet={d.srcSet}
      sizes={d.srcSet ? sizes : undefined}
      width={d.w}
      height={d.h}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      style={style}
    />
  );
  return zoom ? (
    <button type="button" className="zoom" aria-label={`Enlarge: ${alt}`} onClick={() => open(d.zoomSrc, alt, gallery || null, index)}>
      {tag}
    </button>
  ) : (
    tag
  );
}

export const Photo = ({ name, alt, sizes }) => (
  <figure className="photo">
    <Img name={name} alt={alt} zoom sizes={sizes} />
  </figure>
);
