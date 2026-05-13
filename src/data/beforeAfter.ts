/**
 * Before/after pairs surfaced on the home page and the dedicated /before-after/ route.
 * Import the images from src/assets/ so Astro can optimize them (AVIF/WebP/responsive).
 */

import honda09Before from "~/assets/images/ba-09-honda-before.jpg";
import honda09After from "~/assets/images/ba-09-honda-after.jpg";
import equinox18Before from "~/assets/images/ba-18-equinox-before.jpg";
import equinox18After from "~/assets/images/ba-18-equinox-after.jpg";
import jeep17Before from "~/assets/images/ba-17-jeep-before.jpg";
import jeep17After from "~/assets/images/ba-17-jeep-after.jpg";
import edge20Before from "~/assets/images/ba-20-edge-before.jpg";
import edge20After from "~/assets/images/ba-20-edge-after.jpg";
import vw20Before from "~/assets/images/ba-20-vw-before.jpg";
import vw20After from "~/assets/images/ba-20-vw-after.jpg";

import type { ImageMetadata } from "astro";

export type BeforeAfterItem = {
  slug: string;
  vehicle: string;
  damage: string;
  before: ImageMetadata;
  after: ImageMetadata;
};

export const beforeAfter: BeforeAfterItem[] = [
  {
    slug: "20-vw",
    vehicle: "2020 Volkswagen",
    damage: "Front-end collision",
    before: vw20Before,
    after: vw20After,
  },
  {
    slug: "20-edge",
    vehicle: "2020 Ford Edge",
    damage: "Side panel impact",
    before: edge20Before,
    after: edge20After,
  },
  {
    slug: "17-jeep",
    vehicle: "2017 Jeep",
    damage: "Rear quarter damage",
    before: jeep17Before,
    after: jeep17After,
  },
  {
    slug: "18-equinox",
    vehicle: "2018 Chevrolet Equinox",
    damage: "Collision repair",
    before: equinox18Before,
    after: equinox18After,
  },
  {
    slug: "09-honda",
    vehicle: "2009 Honda",
    damage: "Rear-end restoration",
    before: honda09Before,
    after: honda09After,
  },
];
