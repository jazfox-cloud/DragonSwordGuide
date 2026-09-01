import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const htmlPath = path.join(root, 'dist/index.html');

function fail(message) {
  console.error(`[homepage:guide-entry] ${message}`);
  process.exit(1);
}

if (!fs.existsSync(htmlPath)) fail('missing dist/index.html; run npm run build first');

const html = fs.readFileSync(htmlPath, 'utf8');
const heroActions = html.match(/<div class="hero-actions"[^>]*>([\s\S]*?)<\/div>/)?.[1];

if (!heroActions) fail('rendered homepage is missing the hero action group');
if (!heroActions.includes('href="/guides/combat-system/"')) {
  fail('hero actions must link directly to the Signal Skills guide');
}
if (!heroActions.includes('Signal Skills Guide')) {
  fail('hero guide link must use a clear Signal Skills label');
}
if (!html.includes('Signal Skills &amp; Status Effects')) {
  fail('homepage cards must name the guide intent clearly');
}

console.log('[homepage:guide-entry] homepage guide entry contract passes');
