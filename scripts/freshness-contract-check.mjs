import fs from 'node:fs';
import path from 'node:path';

import * as sourceData from '../src/data/sources.ts';

const {
  latestApplied,
  previousApplied,
  latestAppliedPatch,
  patch111Preview,
  plannedUpdate11,
  comingNextAnnouncements,
} = sourceData;

const root = process.cwd();
const dist = path.join(root, 'dist');
const requiredRoutes = ['/', '/roadmap/', '/multiplayer/', '/ja/roadmap/'];
const freshnessPatterns = [
  /latest(?: official)? (?:update|patch)[^.!?\n]{0,160}\b(\d+\.\d+\.\d+)\b/giu,
  /\b(\d+\.\d+\.\d+)\b[^.!?\n]{0,160}(?:is|as) the latest(?: official)? (?:update|patch)/giu,
  /current (?:update|patch|version)[^.!?\n]{0,160}\b(\d+\.\d+\.\d+)\b/giu,
  /最新[^。！？\n]{0,160}?\b(\d+\.\d+\.\d+)\b/gu,
  /\b(\d+\.\d+\.\d+)\b[^。！？\n]{0,160}最新/gu,
];

function fail(message) {
  console.error(`[freshness] ${message}`);
  process.exitCode = 1;
}

function htmlFile(urlPath) {
  return urlPath === '/'
    ? path.join(dist, 'index.html')
    : path.join(dist, urlPath.replace(/^\//, ''), 'index.html');
}

function visibleText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|amp|quot|#39);/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function allHtmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return allHtmlFiles(target);
    return entry.isFile() && entry.name.endsWith('.html') ? [target] : [];
  });
}

if (!latestAppliedPatch?.version || !latestAppliedPatch?.date || !latestAppliedPatch?.href) {
  fail('latestAppliedPatch must expose version, date, and official href');
} else {
  if (latestApplied !== latestAppliedPatch) {
    fail('latestAppliedPatch must alias the authoritative latestApplied record');
  }
  if (latestAppliedPatch.version !== '1.0.12' || latestAppliedPatch.appliedDate !== '2026-09-10') {
    fail('latestApplied must be official 1.0.12 applied on 2026-09-10');
  }
  if (latestAppliedPatch.status !== 'RELEASED') {
    fail(`latestAppliedPatch must be RELEASED, got ${latestAppliedPatch.status || 'missing'}`);
  }

  if (previousApplied?.version !== '1.0.11' || previousApplied?.status !== 'RELEASED' || previousApplied?.appliedDate !== '2026-09-03') {
    fail('previousApplied must retain released 1.0.11 applied on 2026-09-03');
  }

  for (const route of requiredRoutes) {
    const file = htmlFile(route);
    if (!fs.existsSync(file)) {
      fail(`${route}: missing built HTML`);
      continue;
    }
    const html = fs.readFileSync(file, 'utf8');
    if (!visibleText(html).includes(latestAppliedPatch.version)) {
      fail(`${route}: does not render shared latest patch ${latestAppliedPatch.version}`);
    }
  }

  for (const file of allHtmlFiles(dist)) {
    const text = visibleText(fs.readFileSync(file, 'utf8'));
    for (const pattern of freshnessPatterns) {
      for (const match of text.matchAll(pattern)) {
        const claimedVersion = match[1];
        if (claimedVersion !== latestAppliedPatch.version) {
          fail(`${path.relative(root, file)}: stale latest/current claim ${claimedVersion}; shared latest is ${latestAppliedPatch.version}`);
        }
      }
    }
  }
}

if (
  plannedUpdate11?.version !== '1.1'
  || plannedUpdate11?.targetDate !== '2026-10-15'
  || plannedUpdate11?.status !== 'SCHEDULED_NOT_RELEASED'
  || plannedUpdate11?.scheduleConfidence !== 'OFFICIAL_TARGET_SUBJECT_TO_CHANGE'
  || !plannedUpdate11?.noticeHref
  || !plannedUpdate11?.replayHref
) {
  fail('plannedUpdate11 must retain the official October 15 target without becoming an applied release');
}

// Feature-specific citations must retain their historical patch after latest advances.
for (const [route, label, patch] of [
  ['/multiplayer/', 'Official update notes 1.0.11', sourceData.patch111],
  ['/multiplayer/', 'Official update notes 1.0.10', sourceData.patch110],
  ['/ja/multiplayer/', '公式1.0.11アップデート', sourceData.patch111],
  ['/ja/multiplayer/', '公式1.0.10アップデート', sourceData.patch110],
  ['/guides/combat-system/', 'Official update notes 1.0.11', sourceData.patch111],
  ['/roadmap/', 'Official update notes 1.0.12', latestAppliedPatch],
  ['/ja/roadmap/', '公式1.0.12アップデート', latestAppliedPatch],
]) {
  const html = fs.readFileSync(htmlFile(route), 'utf8');
  const links = [...html.matchAll(/<a\b([^>]+)>([\s\S]*?)<\/a>/g)];
  if (!links.some(([, attributes, labelHtml]) => attributes.includes(`href="${patch.href}"`) && visibleText(labelHtml) === label)) {
    fail(`${route}: ${label} must link to its own official announcement`);
  }
}

if ('nextAnnouncedPatch' in sourceData) {
  fail('1.0.11 must not remain in an active nextAnnouncedPatch slot after application');
}

if (patch111Preview?.version !== '1.0.11' || patch111Preview?.status !== 'HISTORICAL_ANNOUNCEMENT' || !patch111Preview?.href) {
  fail('the 1.0.11 preview must remain as historical announcement provenance');
}

const expectedComingNext = ['Ryza (Playable Hero)', 'Othello Hero Quest', 'Hunt Hell Difficulty'];
if (!Array.isArray(comingNextAnnouncements) || comingNextAnnouncements.length !== expectedComingNext.length) {
  fail('comingNextAnnouncements must retain the three separately announced items');
} else {
  for (const [index, item] of comingNextAnnouncements.entries()) {
    if (
      item.name !== expectedComingNext[index]
      || item.status !== 'SCHEDULED_NOT_RELEASED'
      || item.targetDate !== plannedUpdate11.targetDate
      || item.source !== plannedUpdate11.replayHref
    ) {
      fail(`${item.name || `coming-next item ${index + 1}`}: must retain the official 1.1 schedule without becoming released`);
    }
  }

  const roadmapContracts = [
    {
      route: '/roadmap/',
      currentStatus: 'Latest applied / released',
      previousStatus: 'Released / previous',
      comingNextStatus: 'Scheduled / not yet applied',
      visibleComingNext: expectedComingNext,
      staleClaims: [
        '1.0.11 is announced and planned',
        'Planned, not released',
        'Announced / planned: 1.0.11',
        'Othello Hero Quest and Hunt Hell Mode still have no confirmed release dates',
      ],
    },
    {
      route: '/ja/roadmap/',
      currentStatus: '最新適用済み / リリース済み',
      previousStatus: '適用済み / 過去の更新',
      comingNextStatus: '配信予定 / 未適用',
      visibleComingNext: ['プレイアブル英雄 ライザ', 'Othello Hero Quest', '討伐ヘル難易度'],
      staleClaims: [
        '1.0.11は公式予告です',
        '予定であり、未適用です',
        '公式予告 / 適用予定: 1.0.11',
        'Ryza、Othello Hero Quest、Hunt Hell Modeは日程未定',
      ],
    },
  ];

  for (const contract of roadmapContracts) {
    const file = htmlFile(contract.route);
    const text = visibleText(fs.readFileSync(file, 'utf8'));
    for (const expected of [latestAppliedPatch.version, previousApplied.version, contract.currentStatus, contract.previousStatus, contract.comingNextStatus, ...contract.visibleComingNext]) {
      if (!text.includes(expected)) {
        fail(`${contract.route}: missing applied/history/coming-next marker "${expected}"`);
      }
    }
    for (const staleClaim of contract.staleClaims) {
      if (text.toLowerCase().includes(staleClaim.toLowerCase())) {
        fail(`${contract.route}: stale sweeping date claim "${staleClaim}"`);
      }
    }
  }
}

const charactersHtml = fs.readFileSync(htmlFile('/characters/'), 'utf8');
const charactersText = visibleText(charactersHtml);
const ryzaTeaserHref = 'https://steamcommunity.com/games/4570720/announcements/detail/1844115010490208';
for (const expected of [
  'Ryza is scheduled with Version 1.1 for October 15, 2026, but the update is not yet applied.',
  'Quest #53, “Reunion,” grants Ryza as its completion reward.',
  'Players who already completed that story point are scheduled to receive her directly in their inventory when the update goes live.',
  'Jerome, Veronica and Logan remain planned for the second half of 2026, with exact release dates and release order unknown.',
]) {
  if (!charactersText.includes(expected)) {
    fail(`/characters/: missing bounded Ryza freshness marker "${expected}"`);
  }
}
if (!charactersHtml.includes(`href="${ryzaTeaserHref}"`)) {
  fail('/characters/: official Ryza teaser must be cited as Evidence B');
}
if (plannedUpdate11?.replayHref && !charactersHtml.includes(`href="${plannedUpdate11.replayHref}"`)) {
  fail('/characters/: official LIVE STREAM #7 replay must be cited as Evidence B');
}

for (const [route, expected] of [
  ['/', 'Version 1.1 target · October 15, 2026'],
  ['/ja/', 'Version 1.1は2026年10月15日配信予定'],
  ['/roadmap/', 'Version 1.1 target: October 15, 2026'],
  ['/ja/roadmap/', 'Version 1.1 配信予定: 2026年10月15日'],
]) {
  const text = visibleText(fs.readFileSync(htmlFile(route), 'utf8'));
  if (!text.includes(expected)) fail(`${route}: missing 1.1 schedule marker "${expected}"`);
}

for (const route of ['/', '/ja/', '/roadmap/', '/ja/roadmap/', '/characters/']) {
  const html = fs.readFileSync(htmlFile(route), 'utf8');
  if (!html.includes('"dateModified":"2026-10-04"')) {
    fail(`${route}: dateModified must match the 2026-10-04 evidence refresh`);
  }
  if (!html.includes(`href="${plannedUpdate11.replayHref}"`)) {
    fail(`${route}: official LIVE STREAM #7 replay must remain linked`);
  }
}

for (const [route, title, canonical, h1] of [
  ['/', 'DragonSword Awakening Wiki — Builds, Map &amp; Characters', 'https://dragonswordguide.com/', 'DragonSword Awakening Guides'],
  ['/ja/', 'ドラゴンソード:アウェイクニング 攻略ガイド - マップ・ビルド・ロードマップ', 'https://dragonswordguide.com/ja/', 'ドラゴンソード:アウェイクニング 攻略ガイド'],
  ['/roadmap/', 'DragonSword Awakening Roadmap: Latest Updates &amp; Future Plans', 'https://dragonswordguide.com/roadmap/', 'DragonSword Awakening Roadmap'],
  ['/ja/roadmap/', 'ドラゴンソード:アウェイクニング ロードマップ - 最新アップデートと今後の予定', 'https://dragonswordguide.com/ja/roadmap/', 'ドラゴンソード:アウェイクニング ロードマップ'],
  ['/characters/', 'All DragonSword Awakening Characters — 19-Hero Directory', 'https://dragonswordguide.com/characters/', 'All DragonSword Awakening Characters'],
]) {
  const html = fs.readFileSync(htmlFile(route), 'utf8');
  if (!html.includes(`<title>${title}</title>`)) fail(`${route}: protected title changed`);
  if (!html.includes(`<link rel="canonical" href="${canonical}">`)) fail(`${route}: protected canonical changed`);
  if (!html.includes(`<h1`)) fail(`${route}: H1 missing`);
  if (!visibleText(html).includes(h1)) fail(`${route}: protected H1 changed`);
}

if (process.exitCode) process.exit(process.exitCode);
console.log(`[freshness] all current/latest claims agree on ${latestAppliedPatch.version}`);
