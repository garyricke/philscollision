/**
 * The 17 vertical customer & staff videos.
 *
 * - `vimeoId` is used to build embed URLs: https://player.vimeo.com/video/{vimeoId}
 * - `captionFile` points at /captions/{slug}.vtt — generated from the transcript
 *   markdown in plan/ by scripts/generate-vtt.mjs (run via `npm run captions`).
 * - `pullQuote` is the punchy line displayed under the video tile; pulled from
 *   the speaker's own words in the transcript.
 */

export type VideoRole = "customer" | "staff" | "owner" | "neighbor";
export type VideoFeature = "hero" | "stories" | "about";

export type Video = {
  slug: string;
  vimeoId: string;
  speaker: string;
  role: VideoRole;
  /** Short headline shown on the video card (≤ 6 words). */
  title: string;
  /** Verbatim pull quote from the speaker's own words. */
  pullQuote: string;
  /** Where on the site the video should appear. */
  features: VideoFeature[];
};

export const videos: Video[] = [
  {
    slug: "eds-story",
    vimeoId: "1133508853",
    speaker: "Ed Kalinowski",
    role: "owner",
    title: "45 years in the trade",
    pullQuote: "I'm a die-and-breed in this industry.",
    features: ["hero", "about"],
  },
  {
    slug: "ivan-master-painter",
    vimeoId: "1133493356",
    speaker: "Ivan",
    role: "staff",
    title: "20 years on the spray gun",
    pullQuote: "I do it with a lot of respect.",
    features: ["hero", "stories", "about"],
  },
  {
    slug: "eds-chevelle",
    vimeoId: "1133493325",
    speaker: "Ed (on a '65 Chevelle)",
    role: "owner",
    title: "Four years of frame-off",
    pullQuote: "The cream of the crop. Flawless.",
    features: ["stories"],
  },
  {
    slug: "ward",
    vimeoId: "1133493499",
    speaker: "Ward Brown",
    role: "staff",
    title: "Working with the insurers",
    pullQuote: "We nail that so they're happy.",
    features: ["stories", "about"],
  },
  {
    slug: "chef-q",
    vimeoId: "1191523043",
    speaker: "Chef Q",
    role: "customer",
    title: "We met by accident",
    pullQuote: "If it's a ding, it ain't no thing, baby.",
    features: ["stories"],
  },
  {
    slug: "bobby-rare-lexus",
    vimeoId: "1191522689",
    speaker: "Bobby Charalambos",
    role: "customer",
    title: "A rare Lexus, done right",
    pullQuote: "These guys are like family to me now.",
    features: ["stories"],
  },
  {
    slug: "greg-m",
    vimeoId: "1191521894",
    speaker: "Greg Malik",
    role: "customer",
    title: "Better than when it came in",
    pullQuote: "It raised the value taking it out of here.",
    features: ["stories"],
  },
  {
    slug: "jim-n",
    vimeoId: "1191520643",
    speaker: "Jim Nowak",
    role: "customer",
    title: "Through the toughest days",
    pullQuote: "We're not a client and a repair guy — we're family.",
    features: ["stories"],
  },
  {
    slug: "rod-t",
    vimeoId: "1191520640",
    speaker: "Ron Kepple",
    role: "customer",
    title: "Custom color match",
    pullQuote: "Could not be happier.",
    features: ["stories"],
  },
  {
    slug: "terry-cadillac",
    vimeoId: "1191520685",
    speaker: "Terry",
    role: "customer",
    title: "Not just a PO number",
    pullQuote: "I was a customer. I was a friend.",
    features: ["stories"],
  },
  {
    slug: "gary-e",
    vimeoId: "1191520641",
    speaker: "Gary Eckert",
    role: "customer",
    title: "Donuts as a thank-you",
    pullQuote: "They treat you like you're family.",
    features: ["stories"],
  },
  {
    slug: "harrison-landscape",
    vimeoId: "1191520642",
    speaker: "Harrison",
    role: "customer",
    title: "Better than from factory",
    pullQuote: "It looked better than it did from factory.",
    features: ["stories"],
  },
  {
    slug: "tim-duffin",
    vimeoId: "1133493472",
    speaker: "Tim Duffin",
    role: "customer",
    title: "Twice this year",
    pullQuote: "Good people. They care about what they do.",
    features: ["stories"],
  },
  {
    slug: "sal",
    vimeoId: "1133493387",
    speaker: "Sal Nuzzo",
    role: "customer",
    title: "$21,000 of damage, fixed like new",
    pullQuote: "They fixed it like it was brand new.",
    features: ["stories"],
  },
  {
    slug: "chuck-purnick",
    vimeoId: "1133493294",
    speaker: "Chuck Pernick",
    role: "customer",
    title: "Three vehicles, three wins",
    pullQuote: "When he's done, the car looks better than new.",
    features: ["stories"],
  },
  {
    slug: "scott-allen",
    vimeoId: "1133493419",
    speaker: "Scott Allen",
    role: "neighbor",
    title: "The neighbor's take",
    pullQuote: "He matched us in cleanliness and finished product.",
    features: ["stories"],
  },
  {
    slug: "terry-martha-haley",
    vimeoId: "1133493445",
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

export const vimeoEmbedUrl = (vimeoId: string) =>
  `https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&dnt=1`;

export const vimeoThumbnailUrl = (vimeoId: string) =>
  // Vimeo's oEmbed gives us a thumbnail — but a stable redirector is also exposed:
  `https://vumbnail.com/${vimeoId}.jpg`;
