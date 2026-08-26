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
    source_hash: '5b2e43785ddd9c6bec7c67a31d9712e535d66c5aa42c5271bb3b952704cce9c9',
    source_updated_at: sourcePages.home.sourceUpdatedAt,
    translation_status: 'AI_TRANSLATED',
    last_translated_at: '2026-08-23',
  },
} as const;
