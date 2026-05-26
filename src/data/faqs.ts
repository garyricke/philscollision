/**
 * Frequently asked questions — used by /faqs/ and serialized into FAQPage JSON-LD
 * for rich results in Google search. Keep answers concise (1–3 sentences).
 */

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Do I have to use the body shop my insurance recommends?",
    a: "No. You always have the right to choose your own repair facility. We work directly with State Farm as a Direct Repair Program (DRP) partner and with every other major insurer.",
  },
  {
    q: "How long does a free estimate take?",
    a: "Most estimates take 15–20 minutes. Walk in during business hours or schedule online. We'll write the estimate while you wait, and email a copy for your records.",
  },
  {
    q: "Can you handle the insurance claim for me?",
    a: "Yes. We talk to your adjuster directly, document the damage with photos and pre-repair scans, and supplement the estimate if hidden damage is found during teardown. You get one point of contact: us.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Every repair is backed by a lifetime workmanship warranty, honored at any I-CAR certified shop nationwide.",
  },
  {
    q: "Are you I-CAR certified?",
    a: "Yes. Our technicians complete ongoing I-CAR training so repairs follow current manufacturer procedures — including ADAS calibration on modern vehicles.",
  },
  {
    q: "Do you do mechanical work, or only body?",
    a: "Both. We handle suspension, brakes, oil changes, door hardware, window regulators, and most of the mechanical work that surrounds a collision repair — under one roof.",
  },
  {
    q: "Can you match a custom paint color?",
    a: "Yes — including metallic flakes, pearls, and rare factory codes. Our painter has been color matching for 20 years using waterborne basecoats for accuracy and durability.",
  },
  {
    q: "How long will my car be in the shop?",
    a: "It depends on the severity of the damage and parts availability. We give you a realistic timeline at the estimate and update you at every milestone — most jobs come back when we said they would, often sooner.",
  },
  {
    q: "What if my car needs to be towed?",
    a: "We're partnered with Stan's Towing. One call to us and we'll arrange to have your vehicle brought to the shop directly.",
  },
  {
    q: "How do I care for fresh paint?",
    a: "Our booth bakes the paint, so it's fine to hand wash right away — but skip commercial brush washes, and don't wax for about three months while the finish fully cures.",
  },
  {
    q: "What should I bring to my estimate?",
    a: "Anything you've already received from the insurance company: emails, prior estimates, claim numbers, the adjuster's name and phone, and any pre-issued insurance checks. If you don't have any of that, no problem — just come in.",
  },
  {
    q: "What happens if you find more damage once you start the repair?",
    a: "It's very common — insurance estimates can only include what's visible in photos. Once we take the damaged area apart, we document any hidden damage with photos and submit a supplement to your insurer for approval. We keep you in the loop throughout.",
  },
  {
    q: "What if I notice something isn't right after I pick up my car?",
    a: "Call us or bring it back. Our goal is to restore your car to pre-accident condition, and the lifetime warranty backs that up — we'll make it right.",
  },
];
