#!/usr/bin/env node
/**
 * generate-vtt.mjs
 *
 * Reads the transcript markdown in `plan/Phils Maint Start 11_26_2025.md`
 * and writes one WebVTT caption file per video into `public/captions/`.
 *
 * The source file uses markdown-escaped arrows (`\-\-\>`) and trailing two-space
 * markdown line breaks; we strip those and emit standards-compliant VTT.
 *
 * Mapping from the source heading (e.g. `### **Chef Q**`) to the slug used in
 * src/data/videos.ts is defined in HEADING_TO_SLUG below — keep them in sync.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE = resolve(__dirname, "../plan/Phils Maint Start 11_26_2025.md");
const OUT_DIR = resolve(__dirname, "../public/captions");

const HEADING_TO_SLUG = {
  "Chef Q": "chef-q",
  "Bobby_Rare_Lexus_V1": "bobby-rare-lexus",
  "Greg_M_V1": "greg-m",
  "Jim_N_V1": "jim-n",
  "Rod_T_V1": "rod-t",
  "Terry_Cadillac_V1": "terry-cadillac",
  "Gary_E_V1": "gary-e",
  "Harrison_landscape_V1": "harrison-landscape",
  "Ivan_Master_Painter_V1": "ivan-master-painter",
  "Eds_Chevelle_V1": "eds-chevelle",
  "Ed_s_Story_V2": "eds-story",
  "Tim-Duffin_V1": "tim-duffin",
  "Sal_V1": "sal",
  "chuck_purnick_V2": "chuck-purnick",
  "Scott_Allen_V1": "scott-allen",
  "Terry_Martha_Haley_V2": "terry-martha-haley",
  "Ward_V1": "ward",
};

/**
 * Strip markdown escapes/whitespace artifacts from a raw transcript block and
 * emit standards-compliant WebVTT.
 */
function toVtt(block) {
  // Unescape markdown — arrows are written `\--\>` in the source. Underscores
  // and asterisks come through escaped too. Also drop trailing two-space
  // markdown line-breaks.
  const cleaned = block
    .replace(/\\--\\>/g, "-->")
    .replace(/\\>/g, ">")
    .replace(/\\_/g, "_")
    .replace(/\\\*/g, "*")
    .replace(/[ \t]+$/gm, "");

  const lines = cleaned.split(/\r?\n/);

  // Find the WEBVTT line and take everything after it.
  const startIdx = lines.findIndex((l) => l.trim() === "WEBVTT");
  if (startIdx === -1) return null;

  const body = lines.slice(startIdx + 1);

  // Parse cues: optional numeric line, then `start --> end`, then text lines
  // until a blank line.
  const cues = [];
  let i = 0;
  while (i < body.length) {
    while (i < body.length && body[i].trim() === "") i++;
    if (i >= body.length) break;

    let cueId = null;
    if (/^\d+$/.test(body[i].trim())) {
      cueId = body[i].trim();
      i++;
    }
    if (i >= body.length) break;

    const timingMatch = body[i].match(
      /^(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})/
    );
    if (!timingMatch) {
      i++;
      continue;
    }
    const timing = `${timingMatch[1]} --> ${timingMatch[2]}`;
    i++;

    const textLines = [];
    while (i < body.length && body[i].trim() !== "") {
      textLines.push(body[i].trim());
      i++;
    }
    if (textLines.length === 0) continue;

    // Skip zero-duration cues that occasionally appear at the tail of transcripts.
    if (timingMatch[1] === timingMatch[2]) continue;

    cues.push({ id: cueId, timing, text: textLines.join("\n") });
  }

  if (cues.length === 0) return null;

  const out = ["WEBVTT", ""];
  cues.forEach((cue, idx) => {
    out.push(cue.id ?? String(idx + 1));
    out.push(cue.timing);
    out.push(cue.text);
    out.push("");
  });
  return out.join("\n");
}

async function main() {
  const md = await readFile(SOURCE, "utf8");

  // Split on `### **...**` headings. Capture group 1 is the heading text.
  const parts = md.split(/^###\s+\*\*([^*]+)\*\*\s*$/m);
  // parts = [preamble, heading1, block1, heading2, block2, ...]

  await mkdir(OUT_DIR, { recursive: true });

  let written = 0;
  let skipped = 0;
  for (let p = 1; p < parts.length; p += 2) {
    // Markdown escapes underscores in headings (`Bobby\_Rare\_Lexus_V1`); strip
    // them before looking up the slug.
    const heading = parts[p].trim().replace(/\\_/g, "_");
    const block = parts[p + 1] ?? "";

    const slug = HEADING_TO_SLUG[heading];
    if (!slug) {
      console.warn(`! No slug mapped for heading "${heading}" — skipping`);
      skipped++;
      continue;
    }

    const vtt = toVtt(block);
    if (!vtt) {
      console.warn(`! No cues parsed for "${heading}" (${slug}) — skipping`);
      skipped++;
      continue;
    }

    const outPath = resolve(OUT_DIR, `${slug}.vtt`);
    await writeFile(outPath, vtt, "utf8");
    console.log(`✓ ${slug}.vtt  (${vtt.match(/-->/g)?.length ?? 0} cues)`);
    written++;
  }

  console.log(`\nWrote ${written} VTT files to ${OUT_DIR}`);
  if (skipped > 0) console.log(`Skipped ${skipped} blocks`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
