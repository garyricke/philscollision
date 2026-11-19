/**
 * Single source of truth for business info, navigation, and SEO defaults.
 * Edit this file to update NAP, hours, certifications, etc. across the site.
 */

export const site = {
  name: "Phil's Collision Center",
  shortName: "Phil's Collision",
  tagline: "Transforming accidents into masterpieces.",
  description:
    "Family-run collision repair and auto body shop in Schererville, Indiana. I-CAR certified, State Farm DRP partner, lifetime warranty. 45+ years of craftsmanship.",
  url: "https://www.philscollisioncenter.com",

  // NAP — keep formatted address consistent across the site for local SEO
  address: {
    street: "1530 Lincoln Hwy",
    city: "Schererville",
    region: "IN",
    postal: "46375",
    country: "US",
    // Approximate — used for the Google Maps embed only
    lat: 41.4789,
    lng: -87.4548,
  },

  phone: {
    display: "(219) 322-3363",
    tel: "+12193223363",
  },

  email: "philscollision@philscollisioncenter.com", // shop inbox, confirmed 2026-11-10

  // Hours — confirmed by Ed, 19 Nov 2026 (matches Google Business Profile).
  // 24-hour HH:MM here (used as-is in JSON-LD); displayed via formatHours().
  hours: [
    { day: "Mon", open: "08:00", close: "17:00" },
    { day: "Tue", open: "08:00", close: "17:00" },
    { day: "Wed", open: "08:00", close: "17:00" },
    { day: "Thu", open: "08:00", close: "17:00" },
    { day: "Fri", open: "08:00", close: "17:00" },
    { day: "Sat", open: "09:00", close: "12:00" },
    { day: "Sun", open: null, close: null },
  ],

  certifications: [
    {
      name: "I-CAR Certified",
      detail: "Industry-standard collision repair training",
    },
    {
      name: "State Farm DRP",
      detail: "Direct Repair Program partner",
    },
    {
      name: "Lifetime Warranty",
      detail: "Nationwide coverage on workmanship",
    },
  ],

  social: {
    // Add as the client provides them
    google: "https://www.google.com/maps?q=Phil's+Collision+Service+Schererville",
  },
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services/" },
  { label: "Before / After", href: "/before-after/" },
  { label: "Stories", href: "/stories/" },
  { label: "FAQs", href: "/faqs/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export const footerNav: NavItem[] = [
  { label: "Services", href: "/services/" },
  { label: "Before / After", href: "/before-after/" },
  { label: "Stories", href: "/stories/" },
  { label: "FAQs", href: "/faqs/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

/** "08:00" → "8\u00a0AM", "12:00" → "Noon", "17:30" → "5:30\u00a0PM" (non-breaking spaces). */
function to12h(t: string): string {
  const [h, m] = t.split(":").map(Number);
  if (h === 12 && m === 0) return "Noon";
  const hr = h % 12 || 12;
  return `${hr}${m ? `:${String(m).padStart(2, "0")}` : ""}\u00a0${h < 12 ? "AM" : "PM"}`;
}

/** Display string for one day's hours, e.g. "8 AM – 5 PM" or "Closed". */
export function formatHours(h: { open: string | null; close: string | null }): string {
  return h.open && h.close ? `${to12h(h.open)}\u00a0–\u00a0${to12h(h.close)}` : "Closed";
}
