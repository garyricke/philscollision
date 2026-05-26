/**
 * Before/after pairs surfaced on the home page and the dedicated /before-after/ route.
 * Images are hosted on Cloudinary under phils-collision/ba/{slug}-{state}.
 */

export type BeforeAfterItem = {
  slug: string;
  vehicle: string;
  damage: string;
  /** Cloudinary slug under phils-collision/ba/ for the "before" image. */
  beforeId: string;
  /** Cloudinary slug under phils-collision/ba/ for the "after" image. */
  afterId: string;
};

export const beforeAfter: BeforeAfterItem[] = [
  {
    slug: "20-vw",
    vehicle: "2020 Volkswagen",
    damage: "Front-end collision",
    beforeId: "ba/vw-20-before",
    afterId: "ba/vw-20-after",
  },
  {
    slug: "20-edge",
    vehicle: "2020 Ford Edge",
    damage: "Side panel impact",
    beforeId: "ba/edge-20-before",
    afterId: "ba/edge-20-after",
  },
  {
    slug: "17-jeep",
    vehicle: "2017 Jeep",
    damage: "Rear quarter damage",
    beforeId: "ba/jeep-17-before",
    afterId: "ba/jeep-17-after",
  },
  {
    slug: "18-equinox",
    vehicle: "2018 Chevrolet Equinox",
    damage: "Collision repair",
    beforeId: "ba/equinox-18-before",
    afterId: "ba/equinox-18-after",
  },
  {
    slug: "09-honda",
    vehicle: "2009 Honda",
    damage: "Rear-end restoration",
    beforeId: "ba/honda-09-before",
    afterId: "ba/honda-09-after",
  },
];
