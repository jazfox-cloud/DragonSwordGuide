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
    source_hash: 'af9794b3d2addcfe45457dbf65cd0fe5c69f4791dc4684e5a28aef7dec0da6fb',
    source_updated_at: sourcePages.home.sourceUpdatedAt,
    translation_status: 'AI_TRANSLATED',
    last_translated_at: '2026-11-02',
  },
} as const;
