import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distJaMap = path.join(root, 'dist/ja/map/index.html');
const distEnMap = path.join(root, 'dist/map/index.html');

function fail(message) {
  console.error(`[i18n:map] ${message}`);
  process.exitCode = 1;
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function read(file) {
  if (!fs.existsSync(file)) {
    fail(`missing ${file}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

const ja = read(distJaMap);
const en = read(distEnMap);

assert(!fs.existsSync(path.join(root, 'public/data/map/ja/chests')), 'duplicated Japanese chest coordinate folder exists');
assert(ja.includes('場所を検索'), 'Japanese map missing search label');
assert(ja.includes('宝箱'), 'Japanese map missing chest label');
assert(ja.includes('ウェイポイント'), 'Japanese map missing waypoint label');
assert(ja.includes('ダンジョン'), 'Japanese map missing dungeon label');
assert(ja.includes('フィールドボス') || ja.includes('ボス'), 'Japanese map missing boss label');
assert(ja.includes('おおよその位置'), 'Japanese map missing approximate status');
assert(ja.includes('複数ソースで確認'), 'Japanese map missing corroborated status');
assert(ja.includes('リセット'), 'Japanese map missing reset control');
assert(ja.includes('拡大'), 'Japanese map missing zoom in label');
assert(ja.includes('縮小'), 'Japanese map missing zoom out label');
assert(ja.includes("Eona's Legacy"), 'Japanese map should preserve unresolved Eona proper noun');
assert(ja.includes('Organa Statues'), 'Japanese map should preserve unresolved Organa proper noun');
assert(ja.includes("replace(/[^\\p{L}\\p{N}]+/gu"), 'map search normalizer must preserve Japanese characters');
assert(ja.includes('data-chest-manifest-url="/data/map/chests/manifest.json"'), 'Japanese map must reuse shared chest manifest');
assert(!ja.includes('/data/map/ja/chests/'), 'Japanese map must not use duplicated chest data');
assert(en.includes('Search markers'), 'English map search label regressed');
assert(en.includes('Treasure Chests'), 'English map chest label regressed');

if (process.exitCode) process.exit(process.exitCode);
console.log('[i18n:map] all checks passed');
