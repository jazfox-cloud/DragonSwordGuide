import { sourceRevisionGitCommit, sourcePages } from '../../i18n/sourceRevision';

export const buildsJa = {
  routeId: 'builds',
  title: 'ドラゴンソード:アウェイクニング ビルド - ルーン・役割・チーム編成の考え方',
  description: 'ドラゴンソード:アウェイクニングのビルドを、英雄の役割、状態異常、シグナルスキル、ルーン、Karma、チーム編成の文脈で整理します。未検証の最強ビルドは掲載しません。',
  h1: 'ドラゴンソード:アウェイクニング ビルド',
  translation: {
    locale: 'ja',
    source_locale: 'en',
    source_url: sourcePages.builds.sourceUrl,
    source_file: sourcePages.builds.sourceFile,
    source_revision: sourceRevisionGitCommit,
    source_hash: '26666fe71a81eefc7b5e37d227ef6ecbb396f5d3350692cd555d5568efc5ddf7',
    source_updated_at: sourcePages.builds.sourceUpdatedAt,
    translation_status: 'AI_TRANSLATED',
    last_translated_at: '2026-08-23',
  },
} as const;
