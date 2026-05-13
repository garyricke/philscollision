/**
 * The 17 vertical customer & staff videos.
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

export type Video = {
  slug: string;
  vimeoId: string;
  /** Direct 1080p MP4 URL from Vimeo (signed, persistent on Pro accounts). */
  mp4Url: string;
  speaker: string;
  role: VideoRole;
  /** Short headline shown on the video card (≤ 6 words). */
  title: string;
  /** Verbatim pull quote from the speaker's own words. */
  pullQuote: string;
  /** Where on the site the video should appear. */
  features: VideoFeature[];
};

// All MP4 URLs share this prefix/suffix shape; only the ID and signature differ.
const mp4 = (id: string, sig: string) =>
  `https://player.vimeo.com/progressive_redirect/playback/${id}/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=${sig}`;

export const videos: Video[] = [
  {
    slug: "eds-story",
    vimeoId: "1133508853",
    mp4Url: mp4("1133508853", "83204db66dc1c9f57164cf329f08d6877474cba9fbe23d9073525ddadc0bd86e"),
    speaker: "Ed Kalinowski",
    role: "owner",
    title: "45 years in the trade",
    pullQuote: "I'm a die-and-breed in this industry.",
    features: ["hero", "about"],
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
  },
];

export const heroVideos = videos.filter((v) => v.features.includes("hero"));
export const storyVideos = videos.filter((v) => v.features.includes("stories"));
export const aboutVideos = videos.filter((v) => v.features.includes("about"));

export const vimeoThumbnailUrl = (vimeoId: string) =>
  // vumbnail.com is a thin public redirector to Vimeo's hosted thumbnail.
  `https://vumbnail.com/${vimeoId}.jpg`;
