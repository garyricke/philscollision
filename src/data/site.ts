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

  email: "info@philscollisioncenter.com", // TODO: confirm with client

  // Hours — TODO: confirm with client; placeholders below match typical body shop hours
  hours: [
    { day: "Mon", open: "7:30", close: "17:30" },
    { day: "Tue", open: "7:30", close: "17:30" },
    { day: "Wed", open: "7:30", close: "17:30" },
    { day: "Thu", open: "7:30", close: "17:30" },
    { day: "Fri", open: "7:30", close: "17:30" },
    { day: "Sat", open: "8:00", close: "12:00" },
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
