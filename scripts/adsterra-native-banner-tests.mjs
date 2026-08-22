import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const nativeComponentPath = join(root, 'src/components/AdsterraNativeBanner.astro');
const bannerComponentPath = join(root, 'src/components/AdsterraBanner300x250.astro');
const nativeContainerId = 'container-5b0f9dec680f68b542b2049fa6fc069d';
const nativeScriptSrc = 'https://pl30970443.profitableratecpmnetwork.com/5b0f9dec680f68b542b2049fa6fc069d/invoke.js';
const bannerKey = '7299e0ee023fed5d547a36a72754aa84';
const bannerScriptSrc = 'https://www.highrevenueformat.com/7299e0ee023fed5d547a36a72754aa84/invoke.js';
const rolloutPages = [
  'src/pages/systems/runes/index.astro',
  'src/pages/roadmap/index.astro',
  'src/pages/builds/index.astro',
  'src/pages/guides/beginner/index.astro',
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(existsSync(nativeComponentPath), 'AdsterraNativeBanner component is missing');
assert(existsSync(bannerComponentPath), 'AdsterraBanner300x250 component is missing');

const nativeComponent = readFileSync(nativeComponentPath, 'utf8');
assert(nativeComponent.includes(nativeScriptSrc), 'Native script src is missing or changed');
assert(nativeComponent.includes("setAttribute('async', 'async')"), 'Native script must keep async="async"');
assert(nativeComponent.includes("setAttribute('data-cfasync', 'false')"), 'Native script must keep data-cfasync="false"');
assert(nativeComponent.includes(nativeContainerId), 'Native container ID is missing or changed');
assert(nativeComponent.includes('AstroAdsterraNativeBannerLoaded'), 'Native component needs a page-level duplicate-load guard');
assert(!nativeComponent.includes(bannerScriptSrc), 'Native component must not include the 300x250 banner script');

const bannerComponent = readFileSync(bannerComponentPath, 'utf8');
assert(bannerComponent.includes(bannerKey), '300x250 banner key is missing or changed');
assert(bannerComponent.includes(bannerScriptSrc), '300x250 banner script src is missing or changed');
assert(bannerComponent.includes('window.atOptions'), '300x250 banner must set atOptions only during its isolated load');
assert(bannerComponent.includes('AstroAdsterraBannerPreviousAtOptions'), '300x250 banner must restore the previous atOptions value');
assert(bannerComponent.includes('width: 300px'), '300x250 slot must reserve a 300px width');
assert(bannerComponent.includes('height: 250px'), '300x250 slot must reserve a 250px height');
assert(!bannerComponent.includes(nativeScriptSrc), '300x250 component must not include the Native script');

const layout = readFileSync(join(root, 'src/layouts/BaseLayout.astro'), 'utf8');
assert(!layout.includes(nativeScriptSrc), 'BaseLayout must not globally inject the Native script');
assert(!layout.includes(nativeContainerId), 'BaseLayout must not globally inject the Native container');
assert(!layout.includes(bannerScriptSrc), 'BaseLayout must not globally inject the 300x250 script');
assert(!layout.includes(bannerKey), 'BaseLayout must not globally inject the 300x250 key');
assert(!layout.includes('atOptions'), 'BaseLayout must not define Adsterra atOptions');

for (const page of rolloutPages) {
  const source = readFileSync(join(root, page), 'utf8');
  assert(source.includes("AdsterraNativeBanner"), `${page} must import/use AdsterraNativeBanner`);
  assert(source.includes("AdsterraBanner300x250"), `${page} must import/use AdsterraBanner300x250`);
  assert(source.indexOf('AdsterraNativeBanner') < source.indexOf('AdsterraBanner300x250'), `${page} must place Native before 300x250 banner`);
  const betweenAds = source.slice(source.indexOf('<AdsterraNativeBanner'), source.indexOf('<AdsterraBanner300x250'));
  assert(betweenAds.length > 80, `${page} must keep content between Native and 300x250 banner`);
  assert(!betweenAds.match(/<AdsterraNativeBanner\s*\/>\s*<AdsterraBanner300x250/), `${page} must not stack Native and 300x250 banners directly`);
}

const allPageFiles = [
  ...rolloutPages,
  'src/pages/index.astro',
  'src/pages/characters/index.astro',
  'src/pages/teams/index.astro',
  'src/pages/gameplay/index.astro',
  'src/pages/guides/combat-system/index.astro',
  'src/pages/price/index.astro',
  'src/pages/map/index.astro',
  'src/pages/is-it-gacha/index.astro',
  'src/pages/multiplayer/index.astro',
  'src/pages/system-requirements/index.astro',
  'src/pages/privacy/index.astro',
  'src/pages/terms/index.astro',
];

for (const page of allPageFiles) {
  const source = readFileSync(join(root, page), 'utf8');
  const usesAdsterra = source.includes('AdsterraNativeBanner') || source.includes('AdsterraBanner300x250');
  const shouldUseAdsterra = rolloutPages.includes(page);
  assert(
    usesAdsterra === shouldUseAdsterra,
    `${page} ${shouldUseAdsterra ? 'must include' : 'must not include'} rollout Adsterra components`,
  );
}

console.log('Adsterra rollout checks passed');
