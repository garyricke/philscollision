/**
 * Prepay maintenance: the last block, where its hours went, and the options for
 * the next one. Shown on /internal/prepay/.
 *
 * Hours come from Time (time.orbisdesign.com), projects "Phils 1" and "Phils
 * Collision", rounded to the nearest 15 minutes per day. Descriptions come from
 * Gary's "Phils Maint Start 11/26/2025" notes. Billing uses full effort (wall).
 * The website build was under-tracked; Gary added 10 hours (2.5 h on each build
 * day) on 2 Nov 2026, folded into those days below.
 */

export const lastBlock = {
  invoices: [
    { number: "03043691", amount: 2000, hours: 25, paid: "Nov 25, 2025" },
    { number: "03043693", amount: 2000, hours: 25, paid: "Nov 26, 2025" },
  ],
  started: "Nov 26, 2025",
  price: 4000,
  rate: 80,
  hours: 50,
};

export type LogEntry = { date: string; minutes: number; what: string; website?: boolean };

export const log: { period: string; entries: LogEntry[] }[] = [
  {
    period: "Nov – Dec 2025",
    entries: [
      { date: "Nov 25", minutes: 30, what: "Posted Scott Allen's (landscape) testimonial" },
      { date: "Dec 2", minutes: 90, what: "Christmas Facebook cover and 7×5 Christmas card" },
      { date: "Dec 9", minutes: 105, what: "\"Ed's Story\" post; custom GPT for answering reviews" },
      { date: "Dec 23", minutes: 15, what: "Chuck's Grand Prix video" },
      { date: "Dec 30", minutes: 60, what: "Ed's '65 Chevelle post; Facebook cover update" },
    ],
  },
  {
    period: "Jan – Mar 2026",
    entries: [
      { date: "Jan 6", minutes: 30, what: "Tim Duffin testimonial post" },
      { date: "Jan 13–14", minutes: 105, what: "Fender Bender article audio-brief videos" },
      { date: "Jan 20", minutes: 75, what: "AI-voiced intros for the testimonial series" },
      { date: "Jan 27", minutes: 75, what: "\"The Human Element\" infographic and post" },
      { date: "Feb 3–4", minutes: 75, what: "Google Reviews: Insurance post" },
      { date: "Feb 10", minutes: 60, what: "Google Reviews: final post" },
      { date: "Feb 17", minutes: 120, what: "Fender Bender article video, part 1" },
      { date: "Feb 24", minutes: 105, what: "Fender Bender article, part 2" },
      { date: "Feb 28", minutes: 240, what: "On site: 9 testimonial interviews and 360° b-roll (includes travel)" },
      { date: "Mar 3", minutes: 105, what: "Fender Bender part 3; spring Facebook cover" },
      { date: "Mar 10", minutes: 90, what: "Chef Q testimonial video" },
      { date: "Mar 17", minutes: 75, what: "Bobby's rare Lexus video" },
      { date: "Mar 24", minutes: 105, what: "Weekly testimonial video post" },
      { date: "Mar 31", minutes: 60, what: "Weekly testimonial video post" },
    ],
  },
  {
    period: "Apr – Jun 2026",
    entries: [
      { date: "Apr 1", minutes: 75, what: "Planning session: email list, lobby monitor, flowers, new sign, photo shoot" },
      { date: "Apr 7", minutes: 60, what: "Weekly testimonial video post" },
      { date: "Apr 14", minutes: 60, what: "Researched CCC export for the customer email list" },
      { date: "Apr 21", minutes: 60, what: "Harrison (landscaper and Jeep) video" },
      { date: "Apr 28", minutes: 60, what: "Terry (Cadillac) video" },
      { date: "May 5", minutes: 60, what: "Rod T video, the last of the testimonials" },
      { date: "May 12", minutes: 360, what: "New website started; all 16 testimonial videos loaded", website: true },
      { date: "May 25–26", minutes: 405, what: "Hero videos, Cloudinary images, carousels, FAQs, estimate form, review area", website: true },
      { date: "Jun 9", minutes: 225, what: "Gallery review page and photo updates", website: true },
      { date: "Jun 22–23", minutes: 360, what: "Website build", website: true },
    ],
  },
  {
    period: "Oct 2026",
    entries: [
      { date: "Oct 23", minutes: 225, what: "On-site shoot: drone, ground footage, 4 interviews" },
      { date: "Oct 30", minutes: 240, what: "Edited 17 short videos; review page" },
    ],
  },
];

export const usedMinutes = log.flatMap((p) => p.entries).reduce((s, e) => s + e.minutes, 0);
export const overageMinutes = Math.max(usedMinutes - lastBlock.hours * 60, 0);

/** Gary's standard prepay pricing. No expiration; monthly statements. */
export const packages = [
  { price: 5000, rate: 75, hours: 67, tag: "Best rate" },
  { price: 4000, rate: 80, hours: 50, tag: "Same as last time" },
  { price: 3000, rate: 88, hours: 34 },
  { price: 2500, rate: 93, hours: 27 },
  { price: 2000, rate: 100, hours: 20 },
].map((p) => ({ ...p, leftMinutes: p.hours * 60 - overageMinutes }));

/** "13:30" style. */
export const hm = (min: number) => `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;
export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
