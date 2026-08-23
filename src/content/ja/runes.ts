import { sourceRevisionGitCommit, sourcePages } from '../../i18n/sourceRevision';

export const runesJa = {
  routeId: 'runes',
  title: 'ドラゴンソード:アウェイクニング ルーン - 上限・ルーン合成・ビルドでの扱い',
  description: 'ドラゴンソード:アウェイクニングのルーンについて、所持上限500、4星ルーン合成から5星が出る可能性、未検証のドロップ率や最適ルートを分けて解説します。',
  h1: 'ドラゴンソード:アウェイクニング ルーン',
  translation: {
    locale: 'ja',
    source_locale: 'en',
    source_url: sourcePages.runes.sourceUrl,
    source_file: sourcePages.runes.sourceFile,
    source_revision: sourceRevisionGitCommit,
    source_hash: '973c6589363be3a30404cddf954b1af39efc1d6a69c86ef10c17c0bc47ea246b',
    source_updated_at: sourcePages.runes.sourceUpdatedAt,
    translation_status: 'AI_TRANSLATED',
    last_translated_at: '2026-08-23',
  },
} as const;
