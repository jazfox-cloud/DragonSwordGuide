import { sourceRevisionGitCommit, sourcePages } from '../../i18n/sourceRevision';

export const multiplayerJa = {
  routeId: 'multiplayer',
  title: 'ドラゴンソード:アウェイクニングはマルチプレイ対応？協力プレイの確認状況',
  description: 'ドラゴンソード:アウェイクニングのオンライン協力プレイ、マッチング、Raids、ストーリー協力、オープンワールド協力、PvPの確認状況を整理します。',
  h1: 'ドラゴンソード:アウェイクニングはマルチプレイ対応？',
  translation: {
    locale: 'ja',
    source_locale: 'en',
    source_url: sourcePages.multiplayer.sourceUrl,
    source_file: sourcePages.multiplayer.sourceFile,
    source_revision: sourceRevisionGitCommit,
    source_hash: 'b076e2d7cff81e6e248e1457e092defc4e8f5882f914fbe9865812402d851624',
    source_updated_at: sourcePages.multiplayer.sourceUpdatedAt,
    translation_status: 'AI_TRANSLATED',
    last_translated_at: '2026-09-04',
  },
} as const;
