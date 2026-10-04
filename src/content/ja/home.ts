import { sourceRevisionGitCommit, sourcePages } from '../../i18n/sourceRevision';

export const homeJa = {
  routeId: 'home',
  title: 'ドラゴンソード:アウェイクニング 攻略ガイド - マップ・ビルド・ロードマップ',
  description: 'ドラゴンソード:アウェイクニングの非公式攻略ガイド。インタラクティブマップ、ビルド、ルーン、マルチプレイ、ロードマップを出典と検証状況つきで整理します。',
  h1: 'ドラゴンソード:アウェイクニング 攻略ガイド',
  translation: {
    locale: 'ja',
    source_locale: 'en',
    source_url: sourcePages.home.sourceUrl,
    source_file: sourcePages.home.sourceFile,
    source_revision: sourceRevisionGitCommit,
    source_hash: '9241029a2385c22900e3303daa5ecca1d229f214618df3abb1ce29c8ab2eb1d3',
    source_updated_at: sourcePages.home.sourceUpdatedAt,
    translation_status: 'AI_TRANSLATED',
    last_translated_at: '2026-10-04',
  },
} as const;
