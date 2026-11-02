/**
 * 17 weeks of social posts from the 23 Oct 2026 shop visit, one video per week.
 * Order alternates speakers; Ed's building tour runs early (it's dated), and
 * "47 years" lands the week of the open house (third week of January).
 * Captions are drafts for Ed's review; slugs match src/data/videos.ts.
 */

export const scheduleStart = new Date("2026-11-02T12:00:00"); // Monday of week 1

export const schedule: { slug: string; caption: string }[] = [
  { slug: "ed-the-expansion", caption: "6,500 sq ft of new shop is going up behind Phil's. New spray booth, new prep station, a full detail department. Ed says it plainly: \"My team has grown this shop.\"" },
  { slug: "russ-train-bumpers", caption: "Meet Russ, our head painter. Cars, motorcycles, forklifts… and Amtrak train bumpers." },
  { slug: "tony-the-atmosphere", caption: "Meet Tony Alvarez, our new service writer, on what it's like to work for Ed: quality and customer service, that's it." },
  { slug: "ed-inside-the-new-building", caption: "Walk the new building with Ed. Plumbing this week, concrete next, then 188 LED lights. \"It's going to be so bright.\"" },
  { slug: "russ-burn-a-hole", caption: "How a master painter trains: smashed fenders, a wool pad, and \"burn a hole into the paint. Now you know.\"" },
  { slug: "tony-equipped-better", caption: "Tony has walked through hundreds of shops. His verdict: Phil's is equipped better than 90% of them." },
  { slug: "ed-best-body-shop", caption: "Best Body Shop in Schererville, 2026. \"You've seen my team. You see what we put out.\"" },
  { slug: "russ-no-corporate-rhetoric", caption: "\"Everyone takes care of everybody else here.\" Russ on why Phil's is a rare place to work." },
  { slug: "tony-why-phils", caption: "He's seen the best shops in Chicagoland. Then he met Ed. \"We kind of just clicked.\"" },
  { slug: "russ-two-booths", caption: "Two paint booths = more cars out the door. Russ can't wait for the new building." },
  { slug: "russ-dont-ever-give-up", caption: "25 years on the spray gun, and Russ is still learning. His advice to anyone starting out: don't ever give up." },
  { slug: "ed-47-years", caption: "47 years in the industry, and Ed wants to go out with a bang. Everything he's building is for the next generation." },
  { slug: "tony-i-can-do-it-all", caption: "Paint, frame, bodywork, reassembly, detail: Tony can do it all. And he says this team is all you can ask for." },
  { slug: "ed-why-phils-is-different", caption: "No sign-on bonuses. No contracts. Just a team that wants to be here, and work everybody can see." },
  { slug: "russ-prep-is-everything", caption: "Paint that won't peel, chip, or fade starts with prep. Russ does the steps some shops skip." },
  { slug: "russ-safe-place-or-panic-room", caption: "The paint booth: \"Either my safe place or the panic room.\"" },
  { slug: "russ-learn-by-mistakes", caption: "Nobody gets bodywork or paint right the first time. Russ on teaching, and why the trade needs young people." },
];

/** "Nov 2" style label for the Monday of a 1-based week number. */
export const weekOf = (week: number) => {
  const d = new Date(scheduleStart);
  d.setDate(d.getDate() + (week - 1) * 7);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
