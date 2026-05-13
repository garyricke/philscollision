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
    a: "Wait 30 days before machine washing or waxing. In that window, hand wash with mild soap, avoid commercial brush washes, and keep tree sap and bird droppings off the finish.",
  },
];
