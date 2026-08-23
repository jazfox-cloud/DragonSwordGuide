const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://dragonswordguide.com/sitemap-en.xml</loc></sitemap>
  <sitemap><loc>https://dragonswordguide.com/sitemap-ja.xml</loc></sitemap>
</sitemapindex>`;

export function GET() {
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
