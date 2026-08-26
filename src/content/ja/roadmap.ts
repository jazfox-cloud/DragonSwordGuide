import { sourceRevisionGitCommit, sourcePages } from '../../i18n/sourceRevision';

export const roadmapJa = {
  routeId: 'roadmap',
  title: 'ドラゴンソード:アウェイクニング ロードマップ - 最新アップデートと今後の予定',
  description: 'ドラゴンソード:アウェイクニングのロードマップ、リリース済みアップデート、発表済みの予定、未確定の内容を分けて確認できます。',
  h1: 'ドラゴンソード:アウェイクニング ロードマップ',
  translation: {
    locale: 'ja',
    source_locale: 'en',
    source_url: sourcePages.roadmap.sourceUrl,
    source_file: sourcePages.roadmap.sourceFile,
    source_revision: sourceRevisionGitCommit,
    source_hash: 'b1e2fe3d4268b6f6264af418e181b2c5b432b188eddc149beb36b20b02c8a6e9',
    source_updated_at: sourcePages.roadmap.sourceUpdatedAt,
    translation_status: 'AI_TRANSLATED',
    last_translated_at: '2026-08-26',
  },
} as const;
