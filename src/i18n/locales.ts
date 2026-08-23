export const locales = {
  en: {
    code: 'en',
    label: 'English',
    basePath: '',
    htmlLang: 'en',
    default: true,
  },
  ja: {
    code: 'ja',
    label: '日本語',
    basePath: '/ja',
    htmlLang: 'ja',
    default: false,
  },
} as const;

export type LocaleCode = keyof typeof locales;

export function isLocale(value: string): value is LocaleCode {
  return value === 'en' || value === 'ja';
}
