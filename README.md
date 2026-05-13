# Phil's Collision Center

Astro rebuild of [philscollisioncenter.com](https://www.philscollisioncenter.com/), migrating off Squarespace.

## Stack

- **[Astro 5](https://astro.build/)** — static site, ships near-zero JS
- **[Tailwind CSS v4](https://tailwindcss.com/)** — utility-first styling via `@tailwindcss/vite`
- **Vimeo** — lazy-loaded vertical video embeds with VTT captions
- **Netlify** — hosting + redirects

## Develop

```bash
npm install
npm run dev    # http://localhost:4321
npm run build  # → dist/
npm run preview
```

## Project structure

```
src/
  pages/         routes (one file = one page)
  layouts/       Base.astro — <html> shell, head, schema.org JSON-LD
  components/    Nav, Footer, VimeoEmbed, BeforeAfter, etc.
  data/          site.ts (NAP, hours), videos.ts (Vimeo IDs + transcripts)
  styles/        global.css (Tailwind import + custom tokens)
public/
  assets/        optimized images + logo
  captions/      VTT files generated from video transcripts
_source/         snapshot of old Squarespace site (gitignored)
plan/            client-provided source material (videos doc, etc.)
```

## Deploy

Netlify auto-detects Astro from `netlify.toml`. Push to the main branch → live. Push to any other branch → preview URL.

## Content updates

- **NAP / hours / business info:** edit `src/data/site.ts`
- **Add a video:** add an entry to `src/data/videos.ts` and drop a `.vtt` in `public/captions/`
- **Before/after pair:** add to `src/data/beforeAfter.ts` and place images in `public/assets/`
