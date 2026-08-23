import { localizedRoutes } from '../i18n/routes';
import { absoluteUrl } from '../i18n/seo';

function urlEntry(route: (typeof localizedRoutes)[number]) {
  return `  <url>
    <loc>${absoluteUrl(route.ja)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${absoluteUrl(route.en)}" />
    <xhtml:link rel="alternate" hreflang="ja" href="${absoluteUrl(route.ja)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(route.en)}" />
  </url>`;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${localizedRoutes.map((route) => urlEntry(route)).join('\n')}
</urlset>`;

export function GET() {
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
