import { en } from './en';
import { ja } from './ja';
import type { LocaleCode } from '../locales';

export const dictionaries = { en, ja } as const;

export function getDictionary(locale: LocaleCode) {
  return dictionaries[locale] || dictionaries.en;
}
