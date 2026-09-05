import fs from 'node:fs';
import path from 'node:path';

import * as sourceData from '../src/data/sources.ts';

const {
  latestApplied,
  previousApplied,
  latestAppliedPatch,
  patch111Preview,
  comingNextAnnouncements,
} = sourceData;

const root = process.cwd();
const dist = path.join(root, 'dist');
const requiredRoutes = ['/', '/roadmap/', '/multiplayer/', '/guides/combat-system/', '/ja/roadmap/', '/ja/multiplayer/'];
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
  if (latestAppliedPatch.version !== '1.0.11' || latestAppliedPatch.appliedDate !== '2026-09-03') {
    fail('latestApplied must be official 1.0.11 applied on 2026-09-03');
  }
  if (latestAppliedPatch.status !== 'RELEASED') {
    fail(`latestAppliedPatch must be RELEASED, got ${latestAppliedPatch.status || 'missing'}`);
  }

  if (previousApplied?.version !== '1.0.10' || previousApplied?.status !== 'RELEASED' || previousApplied?.appliedDate !== '2026-08-19') {
    fail('previousApplied must retain released 1.0.10 applied on 2026-08-19');
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

if ('nextAnnouncedPatch' in sourceData) {
  fail('1.0.11 must not remain in an active nextAnnouncedPatch slot after application');
}

if (patch111Preview?.version !== '1.0.11' || patch111Preview?.status !== 'HISTORICAL_ANNOUNCEMENT' || !patch111Preview?.href) {
  fail('the 1.0.11 preview must remain as historical announcement provenance');
}

const expectedComingNext = ['Ryza (Playable Hero)', 'Othello Hero Quest', 'Hunt Hell Mode'];
if (!Array.isArray(comingNextAnnouncements) || comingNextAnnouncements.length !== expectedComingNext.length) {
  fail('comingNextAnnouncements must retain the three separately announced items');
} else {
  for (const [index, item] of comingNextAnnouncements.entries()) {
    if (item.name !== expectedComingNext[index] || item.status !== 'ANNOUNCED' || item.releaseDate !== null || item.source !== patch111Preview.href) {
      fail(`${item.name || `coming-next item ${index + 1}`}: must remain ANNOUNCED / DATE_UNKNOWN preview evidence`);
    }
  }

  const roadmapContracts = [
    {
      route: '/roadmap/',
      currentStatus: 'Latest applied / released',
      previousStatus: 'Released / previous',
      comingNextStatus: 'Announced / date unknown',
      visibleComingNext: expectedComingNext,
      staleClaims: [
        '1.0.11 is announced and planned',
        'Planned, not released',
        'Announced / planned: 1.0.11',
      ],
    },
    {
      route: '/ja/roadmap/',
      currentStatus: '最新適用済み / リリース済み',
      previousStatus: '適用済み / 過去の更新',
      comingNextStatus: '今後の予定 / 日程未定',
      visibleComingNext: ['プレイアブル英雄 Ryza', 'Othello Hero Quest', 'Hunt Hell Mode'],
      staleClaims: [
        '1.0.11は公式予告です',
        '予定であり、未適用です',
        '公式予告 / 適用予定: 1.0.11',
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

if (process.exitCode) process.exit(process.exitCode);
console.log(`[freshness] all current/latest claims agree on ${latestAppliedPatch.version}`);
