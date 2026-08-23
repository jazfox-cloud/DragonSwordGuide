import { localizedRoutes } from '../i18n/routes';
import { absoluteUrl } from '../i18n/seo';

const standaloneEnglishPaths = [
  '/guides/beginner/',
  '/guides/combat-system/',
  '/characters/',
  '/teams/',
  '/gameplay/',
  '/price/',
  '/system-requirements/',
  '/is-it-gacha/',
  '/privacy/',
  '/terms/',
];

function urlEntry(path: string, alternates = '') {
  return `  <url>
    <loc>${absoluteUrl(path)}</loc>
${alternates}  </url>`;
}

function alternateLinks(route: (typeof localizedRoutes)[number]) {
  return `    <xhtml:link rel="alternate" hreflang="en" href="${absoluteUrl(route.en)}" />
    <xhtml:link rel="alternate" hreflang="ja" href="${absoluteUrl(route.ja)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(route.en)}" />
`;
}

const paired = localizedRoutes.map((route) => urlEntry(route.en, alternateLinks(route)));
const standalone = standaloneEnglishPaths.map((path) => urlEntry(path));
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...paired, ...standalone].join('\n')}
</urlset>`;

export function GET() {
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
