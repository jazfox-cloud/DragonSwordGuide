export const sourceUrls = {
  steam: 'https://store.steampowered.com/app/4570720/DragonSword__Awakening/',
  announcements: 'https://steamcommunity.com/app/4570720/announcements/',
  roadmap: 'https://store.steampowered.com/news/app/4570720/view/678501715215911876',
  livestream: 'https://steamcommunity.com/app/4570720/announcements/',
  workshopRetraction: 'https://steamcommunity.com/games/4570720/announcements/detail/1841579228677116',
  youtube: 'https://www.youtube.com/@DragonSwordAwakening',
  discord: 'https://discord.gg/CzZ5ddkMVg',
};

export const patch107 = {
  label: 'Official update 1.0.7 (history)',
  date: 'August 5, 2026',
  href: sourceUrls.announcements,
};

export const patch108 = {
  label: 'Official update 1.0.8 (history)',
  date: 'August 6, 2026',
  href: sourceUrls.announcements,
};

export const patch109 = {
  version: '1.0.9',
  label: 'Official update 1.0.9 (previous)',
  date: 'August 12, 2026',
  href: 'https://steamcommunity.com/games/4570720/announcements/detail/1840944183775546',
};

export const patch110 = {
  version: '1.0.10',
  label: 'Official update 1.0.10 (previous)',
  date: 'August 19, 2026',
  isoDate: '2026-08-19',
  appliedDate: '2026-08-19',
  href: 'https://steamcommunity.com/games/4570720/announcements/detail/1841579228664485',
  status: 'RELEASED',
};

export const patch111 = {
  version: '1.0.11',
  label: 'Official update 1.0.11',
  date: 'September 3, 2026',
  isoDate: '2026-09-03',
  appliedDate: '2026-09-03',
  href: 'https://steamcommunity.com/games/4570720/announcements/detail/1842846814442045',
  status: 'RELEASED',
};

export const previousApplied = patch110;
export const latestApplied = patch111;
export const latestAppliedPatch = latestApplied;

export const patch111Preview = {
  version: '1.0.11',
  label: 'Official update 1.0.11 preview (historical)',
  announcedDate: 'August 28, 2026',
  targetDate: '2026-09-03',
  targetTimezone: 'KST',
  href: 'https://steamcommunity.com/games/4570720/announcements/detail/1842212951302260',
  status: 'HISTORICAL_ANNOUNCEMENT',
  scheduleConfidence: 'OFFICIAL_TARGET_SUBJECT_TO_CHANGE',
};

export const comingNextAnnouncements = [
  { name: 'Ryza (Playable Hero)', status: 'ANNOUNCED', releaseDate: null, source: patch111Preview.href },
  { name: 'Othello Hero Quest', status: 'ANNOUNCED', releaseDate: null, source: patch111Preview.href },
  { name: 'Hunt Hell Mode', status: 'ANNOUNCED', releaseDate: null, source: patch111Preview.href },
] as const;
