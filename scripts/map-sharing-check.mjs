import fs from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';

const dist = new URL('../dist/', import.meta.url);
const image = fs.readFileSync(new URL('map/base-map-candidate-v2.png', dist));
for (const route of ['map/', 'ja/map/']) {
  test(`${route} exposes the real map image for sharing without changing map formats`, () => {
    const html = fs.readFileSync(new URL(`${route}index.html`, dist), 'utf8');
    const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => Object.fromEntries([...tag.matchAll(/([\w:]+)="([^"]*)"/g)].map(([, key, value]) => [key, value])));
    const get = (key) => metas.filter((meta) => meta.property === key);
    assert.equal(get('og:image').length, 1);
    assert.equal(get('og:image')[0].content, 'https://dragonswordguide.com/map/base-map-candidate-v2.png');
    assert.equal(get('og:image:width')[0]?.content, String(image.readUInt32BE(16)));
    assert.equal(get('og:image:height')[0]?.content, String(image.readUInt32BE(20)));
    assert.equal(get('og:image:type')[0]?.content, 'image/png');
    assert.ok(get('og:image:alt')[0]?.content.length > 0);
    assert.match(html, /<source[^>]*type="image\/webp"[^>]*>/);
    assert.match(html, /<img[^>]*src="\/map\/base-map-candidate-v2.png"/);
  });
}

test('PNG fallback stays below the decimal one-megabyte audit threshold at original dimensions', () => {
  assert.ok(image.length < 1_000_000, `PNG is ${image.length} bytes`);
  assert.equal(image.readUInt32BE(16), 1521);
  assert.equal(image.readUInt32BE(20), 1034);
});

test('the optional social image does not turn on for other site pages', () => {
  function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(new URL(`${entry.name}/`, dir)) : [new URL(entry.name, dir)]);
  }
  for (const file of walk(dist).filter((file) => file.pathname.endsWith('.html'))) {
    if (file.pathname === new URL('map/index.html', dist).pathname || file.pathname === new URL('ja/map/index.html', dist).pathname) continue;
    assert.doesNotMatch(fs.readFileSync(file, 'utf8'), /property="og:image"/);
  }
});
