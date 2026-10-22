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
    source_hash: '6919487333fb9165996b8bb4a2bdc24e55324471bd56a00b19d617c569da9e72',
    source_updated_at: sourcePages.home.sourceUpdatedAt,
    translation_status: 'AI_TRANSLATED',
    last_translated_at: '2026-10-22',
  },
} as const;
