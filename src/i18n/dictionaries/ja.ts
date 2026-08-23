export const ja = {
  brand: 'DragonSword Guide',
  skipLabel: '日本語',
  nav: [
    { routeId: 'home', label: 'ガイド', href: '/ja/', localized: true },
    { routeId: 'map', label: 'マップ', href: '/ja/map/', localized: true },
    { routeId: 'runes', label: 'ルーン', href: '/ja/systems/runes/', localized: true },
    { routeId: 'multiplayer', label: 'マルチプレイ', href: '/ja/multiplayer/', localized: true },
    { routeId: 'builds', label: 'ビルド', href: '/ja/builds/', localized: true },
    { routeId: 'roadmap', label: 'アップデート', href: '/ja/roadmap/', localized: true },
  ],
  shell: {
    ariaHome: 'DragonSword Guide 日本語ホーム',
    primaryNav: 'メインナビゲーション',
    note: '非公式ファンガイド',
    footerText: 'DragonSword Guide は、DragonSword: Awakening の非公式ファンガイドです。マップ、ビルド、チーム編成、進行、戦闘システム、最新アップデートを、出典と検証状況を分けて整理します。',
    disclaimer: 'DragonSword Guide は Hound13 Inc. と提携しておらず、同社による承認・後援を受けていない非公式ファンサイトです。',
    steam: 'Steam',
    discord: '公式Discord',
    youtube: '公式YouTube',
    privacy: 'プライバシー',
    terms: '利用規約',
  },
  officialMedia: {
    eyebrow: '公式メディア',
    label: 'プレビュートレーラー',
    title: 'DragonSword: Awakening プレビュートレーラー',
    cta: 'YouTubeで見る',
  },
  languageSwitcher: {
    label: '言語',
    current: '現在の言語',
  },
} as const;
