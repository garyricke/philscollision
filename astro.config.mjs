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
      // Keep staff tools and utility pages (all noindex) out of the sitemap.
      filter: (page) =>
        !["/internal/", "/replies/", "/requests/", "/thank-you/"].some((p) => page.includes(p)),
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
