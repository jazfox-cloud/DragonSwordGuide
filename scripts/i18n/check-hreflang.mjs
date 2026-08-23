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

function fail(message) {
  console.error(`[i18n:hreflang] ${message}`);
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
    fail(`${urlPath}: missing built HTML at ${file}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

function absolute(urlPath) {
  return `${site}${urlPath}`;
}

function hasAlternate(html, lang, href) {
  return html.includes(`rel="alternate" hreflang="${lang}" href="${href}"`);
}

function h1Text(html) {
  return html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, '').trim() || '';
}

function titleText(html) {
  return html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim() || '';
}

function metaDescription(html) {
  return html.match(/<meta name="description" content="([^"]+)"/)?.[1] || '';
}

function canonical(html) {
  return html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] || '';
}

function schemaBlocks(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => match[1]);
}

function assertJaPublicationGate(route, html) {
  assert(html.includes('<html lang="ja">'), `${route.ja}: missing html lang ja`);
  assert(canonical(html) === absolute(route.ja), `${route.ja}: canonical mismatch`);
  assert(hasAlternate(html, 'en', absolute(route.en)), `${route.ja}: missing en hreflang`);
  assert(hasAlternate(html, 'ja', absolute(route.ja)), `${route.ja}: missing ja hreflang`);
  assert(hasAlternate(html, 'x-default', absolute(route.en)), `${route.ja}: missing x-default hreflang`);
  assert(titleText(html).includes('ドラゴンソード'), `${route.ja}: title not localized`);
  assert(metaDescription(html).includes('ドラゴンソード'), `${route.ja}: description not localized`);
  assert(h1Text(html).includes('ドラゴンソード'), `${route.ja}: h1 not localized`);
  assert(html.includes('非公式ファンガイド'), `${route.ja}: localized shell missing`);
  assert(html.includes('DragonSword Guide は'), `${route.ja}: localized footer missing`);
  assert(html.includes('id="source-revision-data"'), `${route.ja}: missing source revision metadata`);
  assert(!html.includes('PENDING_SOURCE_HASH'), `${route.ja}: pending source hash`);
  assert(!html.includes('Coming soon'), `${route.ja}: placeholder detected`);
  assert(!html.includes('近日公開'), `${route.ja}: placeholder detected`);
  assert(schemaBlocks(html).some((block) => block.includes('"inLanguage":"ja"')), `${route.ja}: localized schema missing`);
}

function assertEnReciprocal(route, html) {
  assert(html.includes('<html lang="en">'), `${route.en}: missing html lang en`);
  assert(canonical(html) === absolute(route.en), `${route.en}: canonical mismatch`);
  assert(hasAlternate(html, 'en', absolute(route.en)), `${route.en}: missing en self hreflang`);
  assert(hasAlternate(html, 'ja', absolute(route.ja)), `${route.en}: missing ja hreflang`);
  assert(hasAlternate(html, 'x-default', absolute(route.en)), `${route.en}: missing x-default hreflang`);
}

function readXml(name) {
  const file = path.join(dist, name);
  if (!fs.existsSync(file)) {
    fail(`missing ${name}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

for (const route of routes) {
  const enHtml = readBuilt(route.en);
  const jaHtml = readBuilt(route.ja);
  assertEnReciprocal(route, enHtml);
  assertJaPublicationGate(route, jaHtml);
}

const sitemapIndex = readXml('sitemap-index.xml');
const sitemapEn = readXml('sitemap-en.xml');
const sitemapJa = readXml('sitemap-ja.xml');
assert(sitemapIndex.includes(`${site}/sitemap-en.xml`), 'sitemap index missing English sitemap');
assert(sitemapIndex.includes(`${site}/sitemap-ja.xml`), 'sitemap index missing Japanese sitemap');

for (const route of routes) {
  const jaCount = (sitemapJa.match(new RegExp(`<loc>${absolute(route.ja).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>`, 'g')) || []).length;
  assert(jaCount === 1, `${route.ja}: expected once in sitemap-ja, got ${jaCount}`);
  assert(sitemapEn.includes(`<loc>${absolute(route.en)}</loc>`), `${route.en}: missing in sitemap-en`);
  assert(fs.existsSync(fileFor(route.en)), `${route.en}: sitemap URL has no built file`);
  assert(fs.existsSync(fileFor(route.ja)), `${route.ja}: sitemap URL has no built file`);
}

assert(!sitemapJa.includes('/ja/price/'), 'sitemap-ja includes unapproved /ja/price/');
assert(!sitemapJa.includes('/ja/teams/'), 'sitemap-ja includes unapproved /ja/teams/');
assert(!sitemapJa.includes('/ja/system-requirements/'), 'sitemap-ja includes unapproved /ja/system-requirements/');

if (process.exitCode) process.exit(process.exitCode);
console.log('[i18n:hreflang] all checks passed');
