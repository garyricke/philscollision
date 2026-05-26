/**
 * Cloudinary delivery helper. All hand-curated site images live under
 * the `phils-collision/` folder on the `dsbllwpbh` cloud. Browsers receive
 * AVIF/WebP automatically via `f_auto,q_auto`.
 *
 * Auto-generated Vimeo poster thumbnails still live in `/public/thumbs/` —
 * see scripts/generate-thumbs.mjs.
 */

const BASE = "https://res.cloudinary.com/dsbllwpbh/image/upload";

/** Compose a delivery URL with `f_auto,q_auto` and an optional max width. */
export const cld = (publicId: string, w?: number) =>
  `${BASE}/${w ? `f_auto,q_auto,w_${w}` : "f_auto,q_auto"}/phils-collision/${publicId}`;

/** Build a responsive `srcset` string across the given widths. */
export const cldSrcSet = (publicId: string, widths: number[]) =>
  widths.map((w) => `${cld(publicId, w)} ${w}w`).join(", ");
