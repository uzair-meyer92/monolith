/* eslint-disable no-console */
import sharp from 'sharp';
import { readdir, mkdir, copyFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, parse } from 'node:path';

/* Pass --force to re-process every file. By default, files that already
   have a sibling .webp are skipped — protects backups from being
   overwritten by already-optimized JPGs. */
const FORCE = process.argv.includes('--force');

const SRC    = 'public/images';
const OUT    = 'public/images/optimized';
const BACKUP = 'public/images/_originals';

/* Per-image max widths sized to actual rendered dimensions × ~1.5 for retina.
   Hero:   full-bleed → 1800
   Works:  max card ≈ 480px desktop, modal up to 720px → 1200
   Bento:  max tile ≈ 600px → 1200
   Portrait: max in split-1-2 ≈ 600px → 1100 */
const widths = {
  'hero-landscape':              1200,
  'artist-portrait':             1100,
  'work-01-oxidised-steel':      1200,
  'work-01-detail':              1200,
  'work-01-detail-alt':          1200,
  'work-02-ground-study':        1200,
  'work-02-detail':              1200,
  'work-03-structural-fragment': 1200,
  'work-03-detail':              1200,
};
const DEFAULT_W = 1200;

/* Some images compress poorly because of fine texture (pigmented earth,
   surface detail). Push them harder. */
const overrides = {
  'work-02-ground-study': { width: 1100, jpgQ: 72, webpQ: 64 },
  'work-01-detail':       { width: 1100, jpgQ: 74, webpQ: 66 },
  'work-03-detail':       { width: 1100, jpgQ: 74, webpQ: 66 },
};

const fmt = (n) => (n / 1024).toFixed(1) + ' KB';

if (!existsSync(OUT))    await mkdir(OUT,    { recursive: true });
if (!existsSync(BACKUP)) await mkdir(BACKUP, { recursive: true });

const files = (await readdir(SRC))
  .filter((f) => /\.jpe?g$/i.test(f));

let totalIn = 0, totalWebp = 0, totalJpg = 0;

for (const f of files) {
  const { name } = parse(f);
  const inPath   = join(SRC, f);
  const ov       = overrides[name] || {};
  const width    = ov.width || widths[name] || DEFAULT_W;
  const webpQ    = ov.webpQ || 74;
  const jpgQ     = ov.jpgQ  || 78;

  /* Skip if already processed (a sibling .webp exists in SRC). */
  if (!FORCE && existsSync(join(SRC, `${name}.webp`))) {
    console.log(`↷ ${name.padEnd(34)}  already optimized, skipping`);
    continue;
  }

  const inSize = (await stat(inPath)).size;
  totalIn += inSize;

  await copyFile(inPath, join(BACKUP, f));

  /* WebP — primary modern format. effort:6 = max compression effort. */
  const webpPath = join(OUT, `${name}.webp`);
  await sharp(inPath)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: webpQ, effort: 6, smartSubsample: true })
    .toFile(webpPath);
  const webpSize = (await stat(webpPath)).size;
  totalWebp += webpSize;

  /* JPG fallback — MozJPEG, progressive, chroma-subsampled. */
  const jpgPath = join(OUT, `${name}.jpg`);
  await sharp(inPath)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: jpgQ, progressive: true, mozjpeg: true, chromaSubsampling: '4:2:0' })
    .toFile(jpgPath);
  const jpgSize = (await stat(jpgPath)).size;
  totalJpg += jpgSize;

  const savedJpg  = ((1 - jpgSize  / inSize) * 100).toFixed(0);
  const savedWebp = ((1 - webpSize / inSize) * 100).toFixed(0);
  console.log(
    `✓ ${name.padEnd(34)}  ${fmt(inSize).padStart(10)}  →  jpg ${fmt(jpgSize).padStart(9)} (-${savedJpg}%)  webp ${fmt(webpSize).padStart(9)} (-${savedWebp}%)`
  );
}

console.log('');
console.log(`Total in:   ${fmt(totalIn)}`);
console.log(`Total jpg:  ${fmt(totalJpg)}  (${((1 - totalJpg / totalIn) * 100).toFixed(0)}% smaller)`);
console.log(`Total webp: ${fmt(totalWebp)}  (${((1 - totalWebp / totalIn) * 100).toFixed(0)}% smaller)`);
console.log(`\nOptimized output: ${OUT}`);
console.log(`Originals backed up to: ${BACKUP}`);
