/**
 * Curated 5-star reviews from Google (253 reviews total as of Nov 2025).
 *
 * Quotes are condensed from longer reviews for editorial cards. The full
 * source is in plan/Phils Collision-google-reviews.md.
 *
 * `image` is the Cloudinary public ID under phils-collision/gallery/. URLs
 * are composed at render time with f_auto,q_auto so browsers receive
 * AVIF/WebP automatically.
 */

export type Review = {
  quote: string;
  name: string;
  when: string;
  /** Cloudinary public ID slug under phils-collision/gallery/ */
  image: string;
};

export const reviews: Review[] = [
  {
    quote:
      "Their attention to detail and commitment to customer satisfaction truly set them apart.",
    name: "Rolando Bravo",
    when: "5 days ago",
    image: "buffing",
  },
  {
    quote:
      "It's rare to find a business that treats you like more than just another number — that's exactly what they did.",
    name: "Jennifer Miner",
    when: "a month ago",
    image: "reception",
  },
  {
    quote:
      "I felt super comfortable as a female there — some places in the past preferred to deal with my husband.",
    name: "Emily H.",
    when: "2 months ago",
    image: "bay",
  },
  {
    quote:
      "You'd never even know there was any damage. My car looked as good as the day I bought it.",
    name: "Alexa Mercuri",
    when: "3 months ago",
    image: "booth-inside",
  },
  {
    quote:
      "They worked with me to create a payment plan so I could still get my car back on the road.",
    name: "Danae Wilson",
    when: "6 months ago",
    image: "booth-neon",
  },
  {
    quote:
      "Repainted the nose of my 1994 Firebird Trans Am — matched the anniversary decal perfectly.",
    name: "EDV Ministries",
    when: "4 months ago",
    image: "paint-mix",
  },
  {
    quote:
      "They held my hand every step of the way — and that's important, since I lost my husband.",
    name: "A Phil's customer",
    when: "5 months ago",
    image: "workbench",
  },
  {
    quote: "Treated like family from day one. It showed no signs of ever having been repaired.",
    name: "Terry & Martha",
    when: "10 months ago",
    image: "chief-wall",
  },
  {
    quote:
      "If there was a six-star rating I would choose it. The metallic black paint match was spot on.",
    name: "Ron Koepl",
    when: "a year ago",
    image: "welders",
  },
];

const CLOUDINARY = "https://res.cloudinary.com/dsbllwpbh/image/upload";
/** Full-bleed background URL: auto format, auto quality, requested width. */
export const reviewImageUrl = (slug: string, w: number) =>
  `${CLOUDINARY}/f_auto,q_auto,w_${w}/phils-collision/gallery/${slug}`;
