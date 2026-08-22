import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const componentPath = join(root, 'src/components/AdsterraNativeBanner.astro');
const containerId = 'container-5b0f9dec680f68b542b2049fa6fc069d';
const scriptSrc = 'https://pl30970443.profitableratecpmnetwork.com/5b0f9dec680f68b542b2049fa6fc069d/invoke.js';
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

assert(existsSync(componentPath), 'AdsterraNativeBanner component is missing');

const component = readFileSync(componentPath, 'utf8');
assert(component.includes(scriptSrc), 'Adsterra script src is missing or changed');
assert(component.includes("setAttribute('async', 'async')"), 'Adsterra script must keep async="async"');
assert(component.includes("setAttribute('data-cfasync', 'false')"), 'Adsterra script must keep data-cfasync="false"');
assert(component.includes(containerId), 'Adsterra container ID is missing or changed');
assert(component.includes('AstroAdsterraNativeBannerLoaded'), 'Component needs a page-level duplicate-load guard');

const layout = readFileSync(join(root, 'src/layouts/BaseLayout.astro'), 'utf8');
assert(!layout.includes(scriptSrc), 'BaseLayout must not globally inject the Adsterra script');
assert(!layout.includes(containerId), 'BaseLayout must not globally inject the Adsterra container');

for (const page of rolloutPages) {
  const source = readFileSync(join(root, page), 'utf8');
  assert(source.includes("AdsterraNativeBanner"), `${page} must import/use AdsterraNativeBanner`);
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
  const usesAdsterra = source.includes('AdsterraNativeBanner');
  const shouldUseAdsterra = rolloutPages.includes(page);
  assert(
    usesAdsterra === shouldUseAdsterra,
    `${page} ${shouldUseAdsterra ? 'must include' : 'must not include'} AdsterraNativeBanner`,
  );
}

console.log('Adsterra Native Banner rollout checks passed');
