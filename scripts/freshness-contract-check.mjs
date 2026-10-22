import fs from 'node:fs';
import path from 'node:path';
import * as sources from '../src/data/sources.ts';

const root = process.cwd();
const dist = path.join(root, 'dist');
const { latestApplied, latestAppliedPatch, previousApplied, update11Preview, releasedUpdate11Features } = sources;
const changedRoutes = ['/', '/ja/', '/roadmap/', '/ja/roadmap/', '/characters/'];
function fail(message) { console.error(`[freshness] ${message}`); process.exitCode = 1; }
function html(route) { return fs.readFileSync(path.join(dist, route.replace(/^\//, ''), 'index.html'), 'utf8'); }
function text(value) { return value.replace(/<script\b[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&(?:nbsp|amp|quot|#39);/g, ' ').replace(/\s+/g, ' ').trim(); }
function files(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(path.join(dir, e.name)) : e.name.endsWith('.html') ? [path.join(dir, e.name)] : []); }
function link(body, label, href) {
  return [...body.matchAll(/<a\b([^>]+)>([\s\S]*?)<\/a>/g)].some(([, attrs, title]) => attrs.includes(`href="${href}"`) && text(title) === label);
}

// Offline consistency only. Weekly official-source review is still required to detect new releases.
if (latestApplied !== latestAppliedPatch) fail('latestAppliedPatch must alias the authoritative latestApplied record');
for (const record of [latestApplied, previousApplied]) {
  if (record?.status !== 'RELEASED' || !record?.appliedDate || !record?.href) fail('current and previous patches require released records, application dates and final-notes URLs');
}
if (latestApplied === previousApplied || latestApplied?.version === previousApplied?.version) fail('current and previous patches must be distinct');
if (update11Preview?.status !== 'HISTORICAL_ANNOUNCEMENT' || update11Preview?.targetDate !== '2026-10-15' || !update11Preview?.replayHref) fail('retain the 1.1 preview as historical provenance, not an active schedule');
if (sources.patch111Preview?.status !== 'HISTORICAL_ANNOUNCEMENT') fail('retain the earlier 1.0.11 preview as history');
if ('plannedUpdate11' in sources || 'nextAnnouncedPatch' in sources || 'comingNextAnnouncements' in sources) fail('released announcements must leave active planned slots');
if (!releasedUpdate11Features || releasedUpdate11Features.length !== 3 || releasedUpdate11Features.some(x => x.status !== 'RELEASED' || x.appliedDate !== sources.update110.appliedDate || x.source !== sources.update110.href)) fail('the three previously scheduled 1.1 features require final-release evidence');

const stale = [
  /1\.0\.12 remains (?:the )?latest applied/i,
  /(?:Version )?1\.1 (?:is scheduled|has not yet been confirmed applied)/i,
  /Ryza is scheduled with Version 1\.1/i,
  /Version 1\.1は.{0,25}配信予定/,
  /1\.0\.12は適用済みの最新/,
  /Version 1\.1 \/ (?:scheduled, not yet applied|配信予定・未適用)/,
];
for (const route of [...changedRoutes, '/multiplayer/']) {
  const body = html(route);
  for (const pattern of stale) if (pattern.test(text(body)) || pattern.test(body.match(/<head>[\s\S]*?<\/head>/)?.[0] || '')) fail(`${route}: obsolete schedule/latest claim ${pattern}`);
  if (!text(body).includes(latestAppliedPatch.version)) fail(`${route}: missing shared current patch ${latestAppliedPatch.version}`);
}
// Include metadata as well as visible copy; allow old versions only in explicitly historical sections.
const freshnessPatterns = [
  /latest(?: official)? (?:update|patch|applied update|applied patch)[^.!?\n]{0,60}\b(\d+\.\d+\.\d+)\b/giu,
  /\b(\d+\.\d+\.\d+)\b[^.!?\n]{0,40}(?:is|as) the latest(?: official)? (?:update|patch)/giu,
  /current (?:update|patch|version)[^.!?\n]{0,60}\b(\d+\.\d+\.\d+)\b/giu,
  /最新(?:適用済み|アップデート)[^。！？\n]{0,35}?\b(\d+\.\d+\.\d+)\b/gu,
];
for (const file of files(dist)) {
  const body = fs.readFileSync(file, 'utf8');
  const copy = text(body) + ' ' + [...body.matchAll(/<meta[^>]+content="([^"]+)"/g)].map(m => m[1]).join(' ');
  for (const pattern of freshnessPatterns) for (const match of copy.matchAll(pattern)) if (match[1] !== latestAppliedPatch.version) fail(`${path.relative(root, file)}: stale current/latest claim ${match[1]}`);
}

// A historical feature citation must never silently follow the moving latest-patch pointer.
for (const [route, label, patch] of [
  ['/multiplayer/', 'Official Steam update notes 1.0.7', { href: sources.patch107.resolvedHref }],
  ['/multiplayer/', 'Official update notes 1.0.11', { href: sources.patch111.resolvedHref }],
  ['/multiplayer/', 'Official update notes 1.0.10', { href: sources.patch110.resolvedHref }],
  ['/ja/multiplayer/', '公式1.0.11アップデート', sources.patch111],
  ['/ja/multiplayer/', '公式1.0.10アップデート', sources.patch110],
  ['/guides/combat-system/', 'Official update notes 1.0.11', sources.patch111],
  ['/roadmap/', 'Official update notes 1.0.12', sources.patch112],
  ['/roadmap/', 'Official update notes 1.0.11', sources.patch111],
  ['/ja/roadmap/', '公式1.0.12アップデート', sources.patch112],
  ['/ja/roadmap/', '公式1.0.11アップデート', sources.patch111],
  ['/roadmap/', 'Official update notes 1.1.0', sources.update110],
  ['/roadmap/', 'Official update notes 1.1.1', sources.update111],
  ['/ja/roadmap/', '公式1.1.0アップデート', sources.update110],
  ['/ja/roadmap/', '公式1.1.1アップデート', sources.update111],
]) if (!patch?.href || !link(html(route), label, patch.href)) fail(`${route}: ${label} must link to its own final announcement`);

for (const route of ['/roadmap/', '/ja/roadmap/']) {
  const copy = text(html(route));
  for (const expected of ['1.1.1', '1.1.0', '1.0.12', 'Jerome', 'Veronica', 'Logan']) if (!copy.includes(expected)) fail(`${route}: missing release/history/unknown-date distinction ${expected}`);
}
const characters = html('/characters/');
for (const expected of ['Ryza was added in Update 1.1.0', 'Quest #53, “Reunion,”', '19 launch Heroes', 'exact release dates and release order unknown']) if (!text(characters).includes(expected)) fail(`/characters/: missing bounded status ${expected}`);
if (sources.update110 && !characters.includes(`href="${sources.update110.href}"`)) fail('/characters/: final 1.1.0 notes must support the release claim');
for (const route of changedRoutes) if (!html(route).includes('"dateModified":"2026-10-22"')) fail(`${route}: editorial date must match this reviewed change`);

for (const [route, title, h1] of [
  ['/', 'DragonSword Awakening Wiki — Builds, Map &amp; Characters', 'DragonSword Awakening Guides'],
  ['/ja/', 'ドラゴンソード:アウェイクニング 攻略ガイド - マップ・ビルド・ロードマップ', 'ドラゴンソード:アウェイクニング 攻略ガイド'],
  ['/roadmap/', 'DragonSword Awakening Roadmap: Latest Updates &amp; Future Plans', 'DragonSword Awakening Roadmap'],
  ['/ja/roadmap/', 'ドラゴンソード:アウェイクニング ロードマップ - 最新アップデートと今後の予定', 'ドラゴンソード:アウェイクニング ロードマップ'],
  ['/characters/', 'DragonSword Awakening Characters — Launch Roster &amp; Ryza', 'DragonSword Awakening Characters'],
]) {
  const body = html(route);
  if (!body.includes(`<title>${title}</title>`)) fail(`${route}: title mismatch`);
  if (!body.includes(`<link rel="canonical" href="https://dragonswordguide.com${route}">`)) fail(`${route}: canonical changed`);
  if ([...body.matchAll(/<h1\b/g)].length !== 1 || !text(body).includes(h1)) fail(`${route}: H1 mismatch`);
}
if (process.exitCode) process.exit(process.exitCode);
console.log(`[freshness] current patch ${latestAppliedPatch.version}; final notes, historical citations, retired schedules and EN/JA entries agree`);
