/**
 * Vertical customer & staff videos (Vimeo-hosted originals + Cloudinary-hosted shop-visit cuts).
 *
 * Videos are served as native `<video>` elements with the source pointing at
 * Vimeo's progressive-redirect MP4 URLs (signed but non-expiring on the Pro
 * account). This avoids loading the Vimeo iframe/player JS and lets us attach
 * our own VTT captions via `<track>`.
 *
 * - `mp4Url` is the direct 1080p stream from Vimeo's CDN.
 * - `vimeoId` is kept for poster thumbnails (vumbnail.com) and any future need
 *   to fall back to the iframe player.
 * - `pullQuote` is the punchy line shown under the video tile.
 * - VTT captions live at `/captions/{slug}.vtt`, generated from the transcript
 *   markdown by scripts/generate-vtt.mjs (run via `npm run captions`).
 */

export type VideoRole = "customer" | "staff" | "owner" | "neighbor";
export type VideoFeature = "hero" | "stories" | "about";
export type VideoTheme =
  | "family"
  | "repeat"
  | "insurance"
  | "classic"
  | "behind"
  | "expansion";

export type Video = {
  slug: string;
  /** Vimeo-hosted videos only; Cloudinary-hosted videos set `poster` instead. */
  vimeoId?: string;
  /** Direct 1080p MP4 URL (Vimeo progressive or Cloudinary). */
  mp4Url: string;
  /** Poster image URL; defaults to the pre-fetched Vimeo thumbnail. */
  poster?: string;
  /** Draft cuts awaiting Ed's sign-off: shown only on /internal/videos/, never on public pages. */
  draft?: boolean;
  speaker: string;
  role: VideoRole;
  /** Short headline shown on the video card (≤ 6 words). */
  title: string;
  /** Verbatim pull quote from the speaker's own words. */
  pullQuote: string;
  /** Where on the site the video should appear. */
  features: VideoFeature[];
  /** Editorial themes used by the Stories filter pills. */
  themes: VideoTheme[];
};

/** Human-readable labels for each theme — drives pill copy. */
export const themeLabels: Record<VideoTheme, string> = {
  family: "Family feel",
  repeat: "Repeat customers",
  insurance: "Insurance work",
  classic: "Classic & custom",
  behind: "Behind the scenes",
  expansion: "The new building",
};

// All MP4 URLs share this prefix/suffix shape; only the ID and signature differ.
const mp4 = (id: string, sig: string) =>
  `https://player.vimeo.com/progressive_redirect/playback/${id}/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=${sig}`;

// Shop-visit cuts (23 Oct 2026) live on Cloudinary under phils-collision/social/.
// Captions are burned in; the poster is the frame at 1.2 s (speaker + hook title).
const CLD_VIDEO = "https://res.cloudinary.com/dsbllwpbh/video/upload";
// Bump after re-uploading the cuts so browsers and the CDN fetch the new renders.
const CLD_REV = 4;
const cldVideo = (slug: string) => ({
  mp4Url: `${CLD_VIDEO}/q_auto/phils-collision/social/${slug}.mp4?v=${CLD_REV}`,
  poster: `${CLD_VIDEO}/so_1.2,f_auto,q_auto,w_720/phils-collision/social/${slug}.jpg?v=${CLD_REV}`,
});

const allVideos: Video[] = [
  {
    slug: "eds-story",
    vimeoId: "1133508853",
    mp4Url: mp4("1133508853", "83204db66dc1c9f57164cf329f08d6877474cba9fbe23d9073525ddadc0bd86e"),
    speaker: "Ed Kalinowski",
    role: "owner",
    title: "45 years in the trade",
    pullQuote: "I'm a die-and-breed in this industry.",
    features: ["hero", "about"],
    themes: ["behind", "insurance"],
  },
  {
    slug: "ivan-master-painter",
    vimeoId: "1133493356",
    mp4Url: mp4("1133493356", "364f6a637a3c839639f3dd870c4c295339119108d7dd6ad163492f6cda2bdf9c"),
    speaker: "Ivan",
    role: "staff",
    title: "20 years on the spray gun",
    pullQuote: "I do it with a lot of respect.",
    features: ["hero", "stories", "about"],
    themes: ["behind"],
  },
  {
    slug: "eds-chevelle",
    vimeoId: "1133493325",
    mp4Url: mp4("1133493325", "e9e969f25268445840f2d589a8f93c53a3d0bf68292f5c29a8afd8c47572c530"),
    speaker: "Ed (on a '65 Chevelle)",
    role: "owner",
    title: "Four years of frame-off",
    pullQuote: "The cream of the crop. Flawless.",
    features: ["stories"],
    themes: ["classic", "behind"],
  },
  {
    slug: "ward",
    vimeoId: "1133493499",
    mp4Url: mp4("1133493499", "0eb126b07870e17d00cc1fbbbaf0cb18d0d3a44f1fbc7a449ca3393d50c0f328"),
    speaker: "Ward Brown",
    role: "staff",
    title: "Working with the insurers",
    pullQuote: "We nail that so they're happy.",
    features: ["stories", "about"],
    themes: ["insurance", "behind"],
  },
  {
    slug: "chef-q",
    vimeoId: "1191523043",
    mp4Url: mp4("1191523043", "bd2e6fc030445e678d7cf4b351c4f24c3891f405cf9f0432cf8e44311af6c490"),
    speaker: "Chef Q",
    role: "customer",
    title: "We met by accident",
    pullQuote: "If it's a ding, it ain't no thing, baby.",
    features: ["stories"],
    themes: ["repeat", "family"],
  },
  {
    slug: "bobby-rare-lexus",
    vimeoId: "1191522689",
    mp4Url: mp4("1191522689", "8592a407c71acd6b13b9b64468b68a62d8e57ca2926bb8464a10ec93b9528dcc"),
    speaker: "Bobby Charalambos",
    role: "customer",
    title: "A rare Lexus, done right",
    pullQuote: "These guys are like family to me now.",
    features: ["stories"],
    themes: ["family", "repeat", "classic"],
  },
  {
    slug: "greg-m",
    vimeoId: "1191521894",
    mp4Url: mp4("1191521894", "ab505fcdc52fd35311932de033f89e197e359a353196e9c810d138cfe9e519ca"),
    speaker: "Greg Malik",
    role: "customer",
    title: "Better than when it came in",
    pullQuote: "It raised the value taking it out of here.",
    features: ["stories"],
    themes: ["family", "repeat", "insurance"],
  },
  {
    slug: "jim-n",
    vimeoId: "1191520643",
    mp4Url: mp4("1191520643", "3ef6a4c08d5687191ae7b284b4f54689c6f4715a35e6bfd694a1e4fa02a8c4e3"),
    speaker: "Jim Nowak",
    role: "customer",
    title: "Through the toughest days",
    pullQuote: "We're not a client and a repair guy — we're family.",
    features: ["stories"],
    themes: ["family", "repeat", "insurance"],
  },
  {
    slug: "rod-t",
    vimeoId: "1191520640",
    mp4Url: mp4("1191520640", "d00ee306b9b4d5d684e068727718fc86ad8f37d52c7243d79f70f31f460e3a5a"),
    speaker: "Ron Kepple",
    role: "customer",
    title: "Custom color match",
    pullQuote: "Could not be happier.",
    features: ["stories"],
    themes: ["classic"],
  },
  {
    slug: "terry-cadillac",
    vimeoId: "1191520685",
    mp4Url: mp4("1191520685", "601850dcb438b0af926e00ee723f5c1319b712b1524830233f120ebde616748a"),
    speaker: "Terry",
    role: "customer",
    title: "Not just a PO number",
    pullQuote: "I was a customer. I was a friend.",
    features: ["stories"],
    themes: ["family", "repeat"],
  },
  {
    slug: "gary-e",
    vimeoId: "1191520641",
    mp4Url: mp4("1191520641", "06b283bd746dcdb5a99c51f2a5778c96b80b48a06666e1a793006b004aaf233b"),
    speaker: "Gary Eckert",
    role: "customer",
    title: "Donuts as a thank-you",
    pullQuote: "They treat you like you're family.",
    features: ["stories"],
    themes: ["family"],
  },
  {
    slug: "harrison-landscape",
    vimeoId: "1191520642",
    mp4Url: mp4("1191520642", "ce32690f32f67a5e15592d3cd6a4e0ffb4d62ce1b75e3643ffcaa6938d52afc3"),
    speaker: "Harrison",
    role: "customer",
    title: "Better than from factory",
    pullQuote: "It looked better than it did from factory.",
    features: ["stories"],
    themes: ["family"],
  },
  {
    slug: "tim-duffin",
    vimeoId: "1133493472",
    mp4Url: mp4("1133493472", "17e7fc4420b58e30e06a259c95c5acd8bc53420b3dee798dcf3da9c1361ca5ac"),
    speaker: "Tim Duffin",
    role: "customer",
    title: "Twice this year",
    pullQuote: "Good people. They care about what they do.",
    features: ["stories"],
    themes: ["family", "repeat", "insurance"],
  },
  {
    slug: "sal",
    vimeoId: "1133493387",
    mp4Url: mp4("1133493387", "fbd799b7cfa5f70a73084edc97a017e6a46ca0efea9f7441d549303fc883aad1"),
    speaker: "Sal Nuzzo",
    role: "customer",
    title: "$21,000 of damage, fixed like new",
    pullQuote: "They fixed it like it was brand new.",
    features: ["stories"],
    themes: ["repeat", "insurance"],
  },
  {
    slug: "chuck-purnick",
    vimeoId: "1133493294",
    mp4Url: mp4("1133493294", "ce961ffe5b03e5f6a31a3cd142922fc516d88705fe686e208cf1471c888c5e55"),
    speaker: "Chuck Pernick",
    role: "customer",
    title: "Three vehicles, three wins",
    pullQuote: "When he's done, the car looks better than new.",
    features: ["stories"],
    themes: ["classic", "repeat", "insurance"],
  },
  {
    slug: "scott-allen",
    vimeoId: "1133493419",
    mp4Url: mp4("1133493419", "a90f8bf073961e5ce990e4746d6b5cec468882ee0f8a841e6f432602bdb5cf93"),
    speaker: "Scott Allen",
    role: "neighbor",
    title: "The neighbor's take",
    pullQuote: "He matched us in cleanliness and finished product.",
    features: ["stories"],
    themes: ["family", "repeat"],
  },
  {
    slug: "terry-martha-haley",
    vimeoId: "1133493445",
    mp4Url: mp4("1133493445", "1b31c7428f1532e8e94aee7263f802d9bbc5ea29a19218beb51904f39f60b965"),
    speaker: "Terry & Martha Haley",
    role: "customer",
    title: "Married 53 years, customers since the accident",
    pullQuote: "You'd have thought we'd known him forever.",
    features: ["stories"],
    themes: ["family"],
  },

  // ---- Shop visit, 23 Oct 2026: Ed on the expansion, the paint shop, the front office ----
  {
    slug: "ed-the-expansion",
    ...cldVideo("ed-the-expansion"),
    speaker: "Ed Kalinowski",
    role: "owner",
    title: "6,500 sq ft of new shop",
    pullQuote: "My team has grown this shop. I can double my volume.",
    features: ["stories"],
    themes: ["expansion", "behind"],
  },
  {
    slug: "ed-inside-the-new-building",
    ...cldVideo("ed-inside-the-new-building"),
    speaker: "Ed Kalinowski",
    role: "owner",
    title: "Inside the new building",
    pullQuote: "I have 188 LED light bulbs coming in this place. It's going to be so bright.",
    features: ["stories"],
    themes: ["expansion"],
  },
  {
    slug: "ed-47-years",
    ...cldVideo("ed-47-years"),
    speaker: "Ed Kalinowski",
    role: "owner",
    title: "Going out with a bang",
    pullQuote: "47 years in the industry, I want to go out of it with a bang.",
    features: ["stories"],
    themes: ["expansion", "family"],
  },
  {
    slug: "ed-why-phils-is-different",
    ...cldVideo("ed-why-phils-is-different"),
    speaker: "Ed Kalinowski",
    role: "owner",
    title: "Why Phil's is different",
    pullQuote: "Their quality can't come nowhere near what we can do.",
    features: ["stories"],
    themes: ["behind"],
  },
  {
    slug: "ed-best-body-shop",
    ...cldVideo("ed-best-body-shop"),
    speaker: "Ed Kalinowski",
    role: "owner",
    title: "Best body shop in Schererville",
    pullQuote: "You've seen my team. You see what we put out. Everybody else sees it.",
    features: ["stories"],
    themes: ["behind"],
  },
  {
    slug: "russ-train-bumpers",
    ...cldVideo("russ-train-bumpers"),
    speaker: "Russ",
    role: "staff",
    title: "Cars, bikes… train bumpers",
    pullQuote: "We paint motorcycles. We paint Amtrak train bumpers.",
    features: ["stories"],
    themes: ["behind", "classic"],
  },
  {
    slug: "russ-dont-ever-give-up",
    ...cldVideo("russ-dont-ever-give-up"),
    speaker: "Russ",
    role: "staff",
    title: "25 years on the spray gun",
    pullQuote: "For new people, the most important thing is don't ever give up.",
    features: ["stories"],
    themes: ["behind"],
  },
  {
    slug: "russ-no-corporate-rhetoric",
    ...cldVideo("russ-no-corporate-rhetoric"),
    speaker: "Russ",
    role: "staff",
    title: "No corporate rhetoric",
    pullQuote: "Everyone takes care of everybody else here.",
    features: ["stories"],
    themes: ["behind", "family"],
  },
  {
    slug: "russ-two-booths",
    ...cldVideo("russ-two-booths"),
    speaker: "Russ",
    role: "staff",
    title: "Two booths, more cars",
    pullQuote: "With two booths you can really operate more.",
    features: ["stories"],
    themes: ["expansion", "behind"],
  },
  {
    slug: "russ-prep-is-everything",
    ...cldVideo("russ-prep-is-everything"),
    speaker: "Russ",
    role: "staff",
    title: "Paint that won't peel",
    pullQuote: "I want the maximum durability on that car.",
    features: ["stories"],
    themes: ["behind"],
  },
  {
    slug: "russ-burn-a-hole",
    ...cldVideo("russ-burn-a-hole"),
    speaker: "Russ",
    role: "staff",
    title: "How a master painter trains",
    pullQuote: "Burn a hole into the paint. Now you know.",
    features: ["stories"],
    themes: ["behind"],
  },
  {
    slug: "russ-safe-place-or-panic-room",
    ...cldVideo("russ-safe-place-or-panic-room"),
    speaker: "Russ",
    role: "staff",
    title: "Safe place or panic room",
    pullQuote: "It's either my safe place or the panic room.",
    features: ["stories"],
    themes: ["behind"],
  },
  {
    slug: "russ-learn-by-mistakes",
    ...cldVideo("russ-learn-by-mistakes"),
    speaker: "Russ",
    role: "staff",
    title: "Learn by your mistakes",
    pullQuote: "It takes a lot to stay with it.",
    features: ["stories"],
    themes: ["behind"],
  },
  {
    slug: "tony-equipped-better",
    ...cldVideo("tony-equipped-better"),
    speaker: "Tony Alvarez",
    role: "staff",
    title: "Equipped better than 90%",
    pullQuote: "We're equipped better than 90% of the shops that I've even visited.",
    features: ["stories"],
    themes: ["behind"],
  },
  {
    slug: "tony-the-atmosphere",
    ...cldVideo("tony-the-atmosphere"),
    speaker: "Tony Alvarez",
    role: "staff",
    title: "What it's like to work for Ed",
    pullQuote: "He just focuses on quality and customer service. That's it.",
    features: ["stories"],
    themes: ["behind", "family"],
  },
  {
    slug: "tony-why-phils",
    ...cldVideo("tony-why-phils"),
    speaker: "Tony Alvarez",
    role: "staff",
    title: "He's seen the best shops",
    pullQuote: "The energy was right and the timing was right.",
    features: ["stories"],
    themes: ["behind"],
  },
  {
    slug: "tony-i-can-do-it-all",
    ...cldVideo("tony-i-can-do-it-all"),
    speaker: "Tony Alvarez",
    role: "staff",
    title: "\"I can do it all\"",
    pullQuote: "He's got a really solid team, a great painter, great set of guys.",
    features: ["stories"],
    themes: ["behind"],
  },
];

/** Published videos: everything public-facing reads from this. */
export const videos = allVideos.filter((v) => !v.draft);
/** Draft cuts for the internal review page. */
export const draftVideos = allVideos.filter((v) => v.draft);

export const heroVideos = videos.filter((v) => v.features.includes("hero"));
export const storyVideos = videos.filter((v) => v.features.includes("stories"));
export const aboutVideos = videos.filter((v) => v.features.includes("about"));

export const vimeoThumbnailUrl = (vimeoId: string) =>
  // Portrait thumbnails are pre-fetched by scripts/generate-thumbs.mjs.
  `/thumbs/${vimeoId}.jpg`;
