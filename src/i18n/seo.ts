import type { LocaleCode } from './locales';
import { getLocalizedPath, type RouteId } from './routes';

export const siteOrigin = 'https://dragonswordguide.com';

export function absoluteUrl(path: string) {
  return new URL(path, siteOrigin).toString();
}

export function getCanonical(routeId: RouteId, locale: LocaleCode) {
  const path = getLocalizedPath(routeId, locale);
  if (!path) throw new Error(`Missing published path for ${routeId}:${locale}`);
  return absoluteUrl(path);
}

export function getAlternates(routeId: RouteId) {
  const en = getLocalizedPath(routeId, 'en');
  const ja = getLocalizedPath(routeId, 'ja');
  if (!en || !ja) return [];
  return [
    { lang: 'en', href: absoluteUrl(en) },
    { lang: 'ja', href: absoluteUrl(ja) },
    { lang: 'x-default', href: absoluteUrl(en) },
  ];
}

export function getBreadcrumbSchema(
  locale: LocaleCode,
  items: { name: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    inLanguage: locale,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function getArticleSchema(locale: LocaleCode, page: {
  title: string;
  description: string;
  canonical: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    inLanguage: locale,
    headline: page.title,
    description: page.description,
    mainEntityOfPage: page.canonical,
    datePublished: page.datePublished,
    dateModified: page.dateModified,
    publisher: { '@type': 'Organization', name: 'DragonSword Guide' },
  };
}
