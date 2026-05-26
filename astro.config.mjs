// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.philscollisioncenter.com",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/internal/"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Use Astro's built-in Sharp service for AVIF/WebP
    service: { entrypoint: "astro/assets/services/sharp" },
  },
});
