import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pages = [
  { id: 'home', content: 'src/content/ja/home.ts', source: 'src/pages/index.astro' },
  { id: 'roadmap', content: 'src/content/ja/roadmap.ts', source: 'src/pages/roadmap/index.astro' },
  { id: 'map', content: 'src/content/ja/map.ts', source: 'src/pages/map/index.astro' },
  { id: 'runes', content: 'src/content/ja/runes.ts', source: 'src/pages/systems/runes/index.astro' },
  { id: 'multiplayer', content: 'src/content/ja/multiplayer.ts', source: 'src/pages/multiplayer/index.astro' },
  { id: 'builds', content: 'src/content/ja/builds.ts', source: 'src/pages/builds/index.astro' },
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function normalizeSource(value) {
  return value
    .replace(/routeId="[^"]+"/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function hash(value) {
  return createHash('sha256').update(normalizeSource(value)).digest('hex');
}

let failed = false;

for (const page of pages) {
  const content = read(page.content);
  const match = content.match(/source_hash:\s*'([^']+)'/);
  if (!match) {
    console.error(`[i18n:stale] ${page.id}: missing source_hash`);
    failed = true;
    continue;
  }
  const expected = match[1];
  const current = hash(read(page.source));
  if (expected !== current) {
    console.error(`[i18n:stale] ${page.id}: SOURCE_STALE expected=${expected} current=${current}`);
    failed = true;
  } else {
    console.log(`[i18n:stale] ${page.id}: current`);
  }
}

if (failed) process.exit(1);
