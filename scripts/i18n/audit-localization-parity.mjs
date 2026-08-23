import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const site = 'https://dragonswordguide.com';
const routes = [
  { id: 'home', en: '/', ja: '/ja/' },
  { id: 'roadmap', en: '/roadmap/', ja: '/ja/roadmap/' },
  { id: 'map', en: '/map/', ja: '/ja/map/' },
  { id: 'runes', en: '/systems/runes/', ja: '/ja/systems/runes/' },
  { id: 'multiplayer', en: '/multiplayer/', ja: '/ja/multiplayer/' },
  { id: 'builds', en: '/builds/', ja: '/ja/builds/' },
];
const expectedJaNav = [
  { routeId: 'home', label: 'ガイド', href: '/ja/' },
  { routeId: 'map', label: 'マップ', href: '/ja/map/' },
  { routeId: 'runes', label: 'ルーン', href: '/ja/systems/runes/' },
  { routeId: 'multiplayer', label: 'マルチプレイ', href: '/ja/multiplayer/' },
  { routeId: 'builds', label: 'ビルド', href: '/ja/builds/' },
  { routeId: 'roadmap', label: 'アップデート', href: '/ja/roadmap/' },
];
const blockedSharedEnglish = [
  'Official media',
  'Preview Trailer',
  'Open on YouTube',
  'Read guide',
  'Related guides',
  'Sources & verification',
  'Keep exploring Orbis',
  'Search markers',
  'Search name or region',
  'Map marker summary',
  'Unofficial schematic map',
  'Not to exact in-game scale',
  'No matching locations',
  'Official verified',
  'First-hand verified',
  'Source corroborated',
  'Not yet verified',
];

function fail(message) {
  console.error(`[i18n:audit] ${message}`);
  process.exitCode = 1;
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function fileFor(urlPath) {
  return path.join(dist, urlPath.replace(/^\//, ''), 'index.html');
}

function readBuilt(urlPath) {
  const file = fileFor(urlPath);
  if (!fs.existsSync(file)) {
    fail(`${urlPath}: missing built HTML`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

function absolute(urlPath) {
  return `${site}${urlPath}`;
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function extractNav(html) {
  const nav = html.match(/<nav class="site-nav"[\s\S]*?data-global-nav[\s\S]*?<\/nav>/)?.[0] || '';
  return [...nav.matchAll(/<a href="([^"]+)" data-route-id="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((match) => ({
    href: match[1],
    routeId: match[2],
    label: stripTags(match[3]),
  }));
}

function hasAlternate(html, lang, href) {
  return html.includes(`rel="alternate" hreflang="${lang}" href="${href}"`);
}

function canonical(html) {
  return html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] || '';
}

function assertJaShell(route, html) {
  assert(html.includes('<html lang="ja">'), `${route.ja}: missing lang=ja`);
  assert(canonical(html) === absolute(route.ja), `${route.ja}: canonical mismatch`);
  assert(hasAlternate(html, 'en', absolute(route.en)), `${route.ja}: missing en hreflang`);
  assert(hasAlternate(html, 'ja', absolute(route.ja)), `${route.ja}: missing ja hreflang`);
  assert(hasAlternate(html, 'x-default', absolute(route.en)), `${route.ja}: missing x-default hreflang`);
  assert(html.includes('data-site-header') && html.includes('data-locale="ja"'), `${route.ja}: missing locale-aware header`);
  assert(html.includes('data-site-footer') && html.includes('data-locale="ja"'), `${route.ja}: missing locale-aware footer`);
  assert(html.includes('aria-label="言語"'), `${route.ja}: missing localized language switcher`);
  assert(html.includes('非公式ファンガイド'), `${route.ja}: missing Japanese shell label`);
  assert(html.includes('DragonSword Guide は'), `${route.ja}: missing Japanese footer copy`);
  assert(html.includes('プライバシー') && html.includes('利用規約'), `${route.ja}: footer legal links not localized`);
}

function assertJaNav(route, html) {
  const nav = extractNav(html);
  assert(nav.length === expectedJaNav.length, `${route.ja}: global nav item count mismatch ${JSON.stringify(nav)}`);
  expectedJaNav.forEach((expected, index) => {
    const actual = nav[index] || {};
    assert(
      actual.href === expected.href && actual.routeId === expected.routeId && actual.label === expected.label,
      `${route.ja}: global nav mismatch at ${index} ${JSON.stringify(actual)}`,
    );
  });
  const navHtml = html.match(/<nav class="site-nav"[\s\S]*?data-global-nav[\s\S]*?<\/nav>/)?.[0] || '';
  assert(!navHtml.includes('/characters/'), `${route.ja}: Japanese nav links to English Characters without fallback label`);
  assert(!navHtml.includes('/teams/'), `${route.ja}: Japanese nav links to English Teams without fallback label`);
}

for (const route of routes) {
  const html = readBuilt(route.ja);
  assertJaShell(route, html);
  assertJaNav(route, html);
  for (const phrase of blockedSharedEnglish) {
    assert(!html.includes(phrase), `${route.ja}: untranslated shared UI phrase "${phrase}"`);
  }
}

const jaHome = readBuilt('/ja/');
assert(jaHome.includes('data-official-media'), '/ja/: missing OfficialMedia component');
assert(jaHome.includes('公式メディア'), '/ja/: missing localized official media eyebrow');
assert(jaHome.includes('プレビュートレーラー'), '/ja/: missing localized preview trailer label');
assert(jaHome.includes('YouTubeで見る'), '/ja/: missing localized YouTube CTA');
assert(jaHome.includes('https://www.youtube.com/watch?v=bvqGAuu-ZIM'), '/ja/: official video URL changed or missing');

const enHome = readBuilt('/');
assert(enHome.includes('Official media'), '/: English official media regressed');
assert(enHome.includes('Preview Trailer'), '/: English preview trailer regressed');
assert(enHome.includes('Open on YouTube'), '/: English YouTube CTA regressed');

const enDictionary = fs.readFileSync(path.join(root, 'src/i18n/dictionaries/en.ts'), 'utf8');
const jaDictionary = fs.readFileSync(path.join(root, 'src/i18n/dictionaries/ja.ts'), 'utf8');
for (const key of ['officialMedia', 'nav', 'shell', 'languageSwitcher']) {
  assert(enDictionary.includes(key), `English dictionary missing ${key}`);
  assert(jaDictionary.includes(key), `Japanese dictionary missing ${key}`);
}

if (process.exitCode) process.exit(process.exitCode);
console.log('[i18n:audit] localization parity checks passed');
