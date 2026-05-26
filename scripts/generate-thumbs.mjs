#!/usr/bin/env node
/**
 * generate-thumbs.mjs
 *
 * For each video in src/data/videos.ts, fetch a proper portrait (720x1280)
 * thumbnail from Vimeo's CDN and save it to public/thumbs/{vimeoId}.jpg.
 *
 * vumbnail.com only serves a 16:9 center-crop, which butchers vertical videos
 * when displayed in a portrait card. The Vimeo CDN serves true aspect when you
 * request the right size suffix.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const VIDEOS_FILE = resolve(__dirname, "../src/data/videos.ts");
const OUT_DIR = resolve(__dirname, "../public/thumbs");
const TARGET_SIZE = "720x1280";

async function extractVimeoIds() {
  const src = await readFile(VIDEOS_FILE, "utf8");
  const ids = new Set();
  for (const m of src.matchAll(/vimeoId:\s*"(\d+)"/g)) ids.add(m[1]);
  return [...ids];
}

async function fetchPortraitUrl(vimeoId) {
  const oembed = await fetch(
    `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}`,
  );
  if (!oembed.ok) throw new Error(`oembed ${vimeoId}: ${oembed.status}`);
  const data = await oembed.json();
  // thumbnail_url ends in `_NxN?region=...` — swap the size for a portrait one.
  return data.thumbnail_url.replace(/_\d+x\d+/, `_${TARGET_SIZE}`);
}

async function downloadOne(vimeoId) {
  const url = await fetchPortraitUrl(vimeoId);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`thumb ${vimeoId}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(resolve(OUT_DIR, `${vimeoId}.jpg`), buf);
  return buf.length;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const ids = await extractVimeoIds();
  console.log(`Fetching ${ids.length} portrait thumbnails…`);
  for (const id of ids) {
    try {
      const bytes = await downloadOne(id);
      console.log(`  ✓ ${id}.jpg (${(bytes / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`  ✗ ${id}: ${err.message}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
