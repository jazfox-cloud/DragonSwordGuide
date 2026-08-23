import type { LocaleCode } from './locales';

export const localizedRoutes = [
  { id: 'home', en: '/', ja: '/ja/', published: { en: true, ja: true } },
  { id: 'roadmap', en: '/roadmap/', ja: '/ja/roadmap/', published: { en: true, ja: true } },
  { id: 'map', en: '/map/', ja: '/ja/map/', published: { en: true, ja: true } },
  { id: 'runes', en: '/systems/runes/', ja: '/ja/systems/runes/', published: { en: true, ja: true } },
  { id: 'multiplayer', en: '/multiplayer/', ja: '/ja/multiplayer/', published: { en: true, ja: true } },
  { id: 'builds', en: '/builds/', ja: '/ja/builds/', published: { en: true, ja: true } },
] as const;

export type RouteId = (typeof localizedRoutes)[number]['id'];

export function getRoute(routeId: RouteId) {
  return localizedRoutes.find((route) => route.id === routeId);
}

export function getLocalizedPath(routeId: RouteId, locale: LocaleCode) {
  const route = getRoute(routeId);
  if (!route || !route.published[locale]) return null;
  return route[locale];
}

export function getCounterpartPath(routeId: RouteId, locale: LocaleCode) {
  return getLocalizedPath(routeId, locale === 'ja' ? 'en' : 'ja');
}
