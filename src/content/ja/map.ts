import { sourceRevisionGitCommit, sourcePages } from '../../i18n/sourceRevision';

export const mapJaPage = {
  routeId: 'map',
  title: 'ドラゴンソード:アウェイクニング インタラクティブマップ - オルビスの宝箱・ウェイポイント・ダンジョン',
  description: "ドラゴンソード:アウェイクニングのオルビスで、宝箱、ウェイポイント、ダンジョン、フィールドボス、Eona's Legacy、Organa Statueを検索・絞り込みできる非公式インタラクティブマップです。",
  h1: 'ドラゴンソード:アウェイクニング インタラクティブマップ',
  translation: {
    locale: 'ja',
    source_locale: 'en',
    source_url: sourcePages.map.sourceUrl,
    source_file: sourcePages.map.sourceFile,
    source_revision: sourceRevisionGitCommit,
    source_hash: '7ed1849d5716118c6cbea5ac5744db4d29acb7d58f73e726924af38384f19b3f',
    source_updated_at: sourcePages.map.sourceUpdatedAt,
    translation_status: 'AI_TRANSLATED',
    last_translated_at: '2026-08-23',
  },
} as const;
