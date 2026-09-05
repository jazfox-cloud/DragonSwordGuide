# DragonSword Awakening 1.0.11 Applied Freshness Correction

Date: 2026-09-04 PDT

Sprint: `OFFICIAL_APPLIED_FRESHNESS_CORRECTION`

Scope: existing public fact owners only; no new URLs, keyword cluster, redesign, DNS, Cloudflare configuration, GSC or GA4 change.

## 1. Git / Source-of-Truth Preflight

- Original checkout: `/Users/jazfox/Documents/ChatGPT/DragonSwordGuide`
- Original branch / HEAD: `main` / `afdc9e719e0e0ac077b7f46a57bd9609f275fd32`
- Fetched `origin/main`: `bfbc8d07492245dd79aee8fda968aca54973e6f0`
- Divergence after fetch: original `main` was 2 commits ahead and 5 commits behind `origin/main`.
- Local-only commits preserved:
  - `afdc9e7 docs: plan status effects article pilot`
  - `58931d6 docs: design video-to-article pilot`
- Remote-only commits preserved: `27b73e9`, `2e2876a`, `d53d363`, `ad56295`, `bfbc8d0`.
- Original checkout contained modified `package.json`, map assets/report, `src/data/sources.ts`, Combat source and Roadmap source, plus numerous untracked user files.
- No pull, reset, rebase, overwrite or push was performed from the original checkout.
- Production worktree: `/private/tmp/dragonsword-1-0-11-applied`
- Production branch: `codex/1-0-11-applied-freshness`
- Worktree base: clean `origin/main` at `bfbc8d07492245dd79aee8fda968aca54973e6f0`.

## 2. Official Applied Evidence

Primary source: [Official Steam Update Notes 1.0.11](https://steamcommunity.com/games/4570720/announcements/detail/1842846814442045)

- Steam News API GID: `1842846814442045`
- Official API timestamp: `2026-09-03T02:57:52Z`
- Publisher-local timestamp: `2026-09-03 11:57:52 KST`
- Official displayed/application date used by the site: `2026-09-03`
- Official state: “Update 1.0.11 has been applied.”
- Previous applied version retained: 1.0.10, applied 2026-08-19.

### CONFIRMED_APPLIED

Only the following final-note facts are treated as applied 1.0.11 Evidence B:

- Localization: unnatural translations corrected.
- Just Dodge: triggers on a perfect Dodge; grants 1 second invincibility, 3 seconds guaranteed critical hits, 10% Active Skill Rage recovery, and recovery of half the Dodge Stamina cost; help documentation added.
- Controls: Lock-On control scheme, retention, target search and camera movement improved; search considers angle and range; stated major-activity monster tiers keep Lock-On at greater distances; an additional-jump grace period was added.
- Action: the Hero left on the field after switching keeps Super Armor from breaking for 1 second.
- Balance: the listed Lute, Aria, Tarte, Roxy, Astria, Kalsion and Dana changes.
- Multiplayer: Hunt/Raid Retry after final clear or party wipe for the party leader; departure notifications; fastest-response lobby search and removal of search-range settings; higher-version Quick Entry notice; invite-code leader-version mismatch notice; listed lobby fixes.
- System: the individually listed offline-achievement, Hero Record, Hero Codex preview, Familiar blur toggle, quest-guide duration, acquisition-cinematic, Special Challenge UI, material-source and Cooking-sort changes.
- Bug fixes: only the individually listed final-note fixes.

### PREVIEW_ONLY_OR_NOT_CONFIRMED

The August 28 preview remains historical announcement evidence. Its separate Coming Next items are absent from the final 1.0.11 notes and are not treated as applied:

- Ryza (Playable Hero)
- Othello Hero Quest
- Hunt Hell Mode

No video-only detail, hidden targeting logic, unstated timing, threshold, controller behavior, reward rule or other Preview inference was published as applied fact.

## 3. Preview vs Final Comparison

| Feature | Preview | Final Update Notes | Public-site action |
| --- | --- | --- | --- |
| Just Dodge | New feature, high level | Exact trigger and four effects confirmed | Added exact final-note mechanics only to Combat; Roadmap remains summarized |
| Lock-On | Control improvements, high level | Controls, retention, angle/range search and camera changes detailed | Added bounded final-note summary to Combat; no algorithm inference |
| Retry | Multiplayer Retry named | Leader can restart Hunt/Raid after final clear or party wipe | Updated EN/JA Multiplayer |
| Matchmaking | “Strengthened matchmaking” | Fastest-response lobby search; search-range setting removed | Replaced stale current search-range claim on EN/JA Multiplayer |
| Switching | Switching-play improvements, high level | One-second Super Armor protection after switching; listed hero interactions | Added only the one-second applied rule to Combat/Roadmap |
| Hero balance | Tarte, Lute, Aria, Roxy, Astria, Kalsion named | Those six receive listed changes; Dana is also included | Roadmap lists the final-note seven-Hero scope; no character-page expansion |
| QoL | Broad QoL preview | Individually listed System and Controls changes | Roadmap summary only; no new URL or broad rewrite |
| Bug fixes | Broad additional-fixes preview | Individual fixes enumerated | Roadmap says listed fixes; no unsupported details copied |

## 4. Shared Version Changes

- Added `patch111` as `RELEASED`, applied `2026-09-03`, linked to final Update Notes.
- `latestApplied` and the compatibility alias `latestAppliedPatch` now point to 1.0.11.
- `previousApplied` points to 1.0.10, still `RELEASED`, applied `2026-08-19`.
- Removed the active `nextAnnouncedPatch` slot.
- Preserved `patch111Preview` as `HISTORICAL_ANNOUNCEMENT` provenance.
- Added the three Coming Next items as `ANNOUNCED` with `releaseDate: null` and the Preview as their source.

## 5. EN Roadmap

- Title, H1, URL and canonical unchanged.
- Quick Answer, current-version badge, timeline and release sections now identify 1.0.11 as latest applied/released.
- 1.0.10 remains previous applied history.
- Last Verified and `dateModified` updated to 2026-09-04.
- Final Update Notes and historical Preview are attributed separately.

## 6. JA Roadmap

- Factual parity with EN: 1.0.11 is `最新適用済み / リリース済み`; 1.0.10 is `適用済み / 過去の更新`.
- Coming Next remains `今後の予定 / 日程未定`.
- Title, H1, URL, self-canonical, EN/JA hreflang and x-default unchanged.
- Translation source hash and revision date were refreshed.

## 7. Multiplayer

Claim audit:

| Claim | Classification | Action |
| --- | --- | --- |
| Hunt/Raid Retry after clear/wipe | `CONFIRMED_APPLIED_1_0_11` | Added |
| Fastest-response lobby search; search-range setting removed | `STALE_AFTER_1_0_11` for old current search-range wording | Replaced |
| Quick Entry and invite-code version notices | `CONFIRMED_APPLIED_1_0_11` | Added |
| Leader-unresponsive party disband from 1.0.10 | `STILL_CORRECT_PREVIOUS_BEHAVIOR` | Retained with historical 1.0.10 attribution |
| Full invite/menu sequence, player count, crossplay, shared progression/loot | `PREVIEW_ONLY_NOT_SAFE_TO_PUBLISH` or unverified | Kept explicitly unverified |

No title, H1, URL or CTR rewrite was made.

## 8. Combat / Signal Skills

- Existing Signal Skills / Status Effects title, H1, URL, Quick Answer and diagnostic flow remain intact.
- Added a bounded 1.0.11 section after the core Signal/Status guide content.
- Published only the four exact Just Dodge effects, the final-note Lock-On summary, and the exact one-second switching Super Armor rule.
- No hidden timing, internal threshold, targeting algorithm or undocumented controller behavior was inferred.

## 9. Homepage

- The homepage contained a stale “1.0.10 is applied” current card.
- It now says 1.0.11 is applied and continues to link to `/roadmap/`.
- No patch-news section, title/H1 rewrite or new URL was added.

## 10. Coming Next Boundary

- Ryza (Playable Hero): `ANNOUNCED / DATE_UNKNOWN`
- Othello Hero Quest: `ANNOUNCED / DATE_UNKNOWN`
- Hunt Hell Mode: `ANNOUNCED / DATE_UNKNOWN`
- None is classified as applied 1.0.11 content.
- No standalone page was created.

## 11. Repository Stale-Claim Audit

Repository-wide searches covered `1.0.10`, `1.0.11`, latest applied/patch, planned, September/Sep 3, and Japanese equivalents.

| Hit group | Classification | Result |
| --- | --- | --- |
| `src/data/sources.ts` | Correct current model / historical provenance | Updated |
| Homepage current-version card | Stale current-state claim | Corrected |
| EN/JA Roadmap current and planned blocks | Stale current-state claims | Corrected |
| EN/JA Multiplayer current search-range wording | Stale after 1.0.11 | Corrected; 1.0.7/1.0.10 history retained |
| Combat guide | Missing current applied facts | Bounded correction added |
| Characters page roadmap paragraph | Historical future-plan context; explicitly not current roster and no exact release date | Correct and untouched per scope |
| Freshness contract | Previous-state assertions | Replaced with applied/history/Coming Next invariants |
| Dated SEO/i18n/map reports and implementation briefs | Report/archive only | Not rewritten |

No remaining public surface claims that 1.0.10 is the latest applied patch.

## 12. Tests

- Baseline after clean checkout: `npm run build` PASS; `npm test` PASS for shared 1.0.10 state.
- TDD RED: the revised freshness contract failed on the old model, old active planned slot, missing historical Preview model, missing Coming Next model and missing Combat current version.
- TDD GREEN after implementation: `node scripts/freshness-contract-check.mjs` PASS — all current/latest claims agree on 1.0.11.
- `npm test`: PASS.
- `npm run i18n:stale`: PASS.
- `npm run i18n:audit`: PASS.
- `git diff --check`: PASS.

## 13. Build and SEO Safety

- `npm run build`: PASS, 23 static pages.
- Baseline sitemap: 16 EN + 6 JA URLs.
- Post-change sitemap: 16 EN + 6 JA URLs.
- Sitemap change: none.
- New URL count: 0.
- Generated-output audit: PASS on 7 required routes for one H1, title, self-canonical, no `noindex`, parseable JSON-LD and resolved local links.
- EN/JA hreflang and x-default: PASS through the existing hreflang and localization checks.
- `robots.txt`: PASS; crawl allowed and sitemap index declared.
- Official 1.0.11 source link: present on every changed current-version public surface.

## 14. Production Verification

Status: `PENDING_DEPLOYMENT`

- Content commit: PENDING
- Remote `origin/main`: PENDING
- Cloudflare Pages deployment/source SHA: PENDING
- Deployment timestamp: PENDING
- Preview smoke: PENDING
- Custom-domain smoke: PENDING
- Sitemap production counts: PENDING

## 15. Remaining Measurement Boundary

Do not evaluate SEO success from immediate post-deploy data. Attribution remains on hold until Roadmap, Multiplayer and Combat have been recrawled. `/guides/combat-system/` also recently changed its Signal Skills / Status Effects intent, so pre-recrawl performance cannot validate or reject the repositioning or this freshness correction.

```yaml
current_stage: LOCAL_VERIFIED
gate: PASS
surface_holds:
  - Ryza, Othello Hero Quest, and Hunt Hell Mode remain ANNOUNCED / DATE_UNKNOWN
  - SEO outcome attribution waits for recrawl of Roadmap, Multiplayer, and Combat
evidence:
  - Official Steam Update Notes 1.0.11 and News API timestamp
  - TDD RED then freshness-contract GREEN
  - npm test, build, i18n and sitemap verification
authorized_actions:
  - Commit scoped Sprint files
  - Push through existing GitHub-backed Cloudflare Pages production policy
blocked_actions:
  - New URLs or keyword clusters
  - DNS, Cloudflare configuration, GSC, GA4, indexing or sitemap-submission changes
next_action: Run final SEO/output checks, commit, push, and verify production
```
