import fs from 'node:fs';
import path from 'node:path';

import * as sourceData from '../src/data/sources.ts';

const { latestAppliedPatch, nextAnnouncedPatch } = sourceData;

const root = process.cwd();
const dist = path.join(root, 'dist');
const requiredRoutes = ['/', '/roadmap/', '/multiplayer/', '/ja/roadmap/', '/ja/multiplayer/'];
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
  if (latestAppliedPatch.status !== 'RELEASED') {
    fail(`latestAppliedPatch must be RELEASED, got ${latestAppliedPatch.status || 'missing'}`);
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

if (!nextAnnouncedPatch?.version || !nextAnnouncedPatch?.targetDate || !nextAnnouncedPatch?.href) {
  fail('nextAnnouncedPatch must expose version, targetDate, and official href');
} else {
  if (nextAnnouncedPatch.status !== 'PLANNED') {
    fail(`nextAnnouncedPatch must be PLANNED before application, got ${nextAnnouncedPatch.status || 'missing'}`);
  }
  if (nextAnnouncedPatch.targetDate !== '2026-09-03' || nextAnnouncedPatch.targetTimezone !== 'KST') {
    fail('nextAnnouncedPatch must retain the official 2026-09-03 KST target');
  }
  if (nextAnnouncedPatch.scheduleConfidence !== 'OFFICIAL_TARGET_SUBJECT_TO_CHANGE') {
    fail('nextAnnouncedPatch must retain the official subject-to-change schedule caveat');
  }

  const roadmapContracts = [
    {
      route: '/roadmap/',
      targetDate: 'September 3, 2026 KST',
      status: 'Announced / planned',
      staleClaims: [
        'future content has no confirmed release dates',
        'individual future release dates remain unconfirmed',
      ],
    },
    {
      route: '/ja/roadmap/',
      targetDate: '2026年9月3日 KST',
      status: '公式予告 / 適用予定',
      staleClaims: [
        '今後のコンテンツは個別日程が未確定です',
        '各項目の確定日程までは示していません',
      ],
    },
  ];

  for (const contract of roadmapContracts) {
    const file = htmlFile(contract.route);
    const text = visibleText(fs.readFileSync(file, 'utf8'));
    for (const expected of [nextAnnouncedPatch.version, contract.targetDate, contract.status]) {
      if (!text.includes(expected)) {
        fail(`${contract.route}: missing next-announced marker "${expected}"`);
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
