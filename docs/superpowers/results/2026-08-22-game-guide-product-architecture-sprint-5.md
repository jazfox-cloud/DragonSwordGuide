# Game Guide Product Architecture Sprint 5 — Official Video Evidence Recovery

Date: 2026-08-22  
Project: DragonSwordGuide  
Pilot: `character:lute`  
Branch: `codex/game-guide-product-architecture-sprint-5`  
Public output: none

## 1. Executive Status

Sprint 5 recovered meaningful official Evidence B, but not enough to make the Lute vertical slice review-ready.

Overall gate:

`VERTICAL_SLICE_RESEARCH_READY`

This is an improvement from Sprint 4's `VERTICAL_SLICE_BLOCKED` because the first team-chain target can now move away from the weak `Lute → Roxy → Theresia` chain and use an official-video-backed candidate:

`Castella → Lute → Aria`

Still blocked from review/publication:

- exact current Lute Skill names/effects: not proven by A/B
- B-observed Lute Skill behavior: 0
- Equipment: C-level lead only
- Karma: C-level lead only
- exact Status/Signal chain IDs: not observed or reproduced

## 2. Official Channel Inventory

Authoritative official source records were created in:

`research/game-guide/pilot/sprint5-official-video-evidence.json`

Official channels recorded:

- HOUND13 official website: `source:hound13-official-site`
- Steam store page: `source:steam-dragonsword-awakening`
- Official DragonSword Awakening YouTube channel: `source:youtube-dragonsword-awakening-official`
- Official Steam News tag-combo announcement: `source:steam-news-tag-combo-lute-castella-aria`
- Official Lute gameplay YouTube video record: `source:youtube-video-lute-gameplay-preview`

The HOUND13 site identifies the official Steam and YouTube destinations. The Steam store identifies HOUND13 Inc. as developer/publisher and provides official game, story, and combat-system context.

## 3. Lute Official Video Evidence

Official Lute-related videos found:

| Video | Source | Evidence subtype | Status |
| --- | --- | --- | --- |
| `Lute Gameplay Preview - DragonSword : Awakening` | Official YouTube video ID recovered as `TpKD1N5K3yo` | `B-DESCRIPTION` | Metadata recovered; no direct frame capture |
| `Tag Combo Preview - [Lute & Castella & Aria]` | Official Steam News / embedded official video | `B-DESCRIPTION` | Official title recovered; full body/frame evidence limited |

No YouTube comments were used as evidence.

Third-party pages were used only as discovery/indexing leads where they contained embedded official players or indexed official video metadata. They were not promoted into production-ready facts.

## 4. Recovered Lute Facts

B-level facts recovered or strengthened:

- Lute is an official DragonSword: Awakening character.
- The game officially uses Status Ailments, Active Skills, Signal Skills, and Switching Signals.
- Official Lute video metadata presents Lute as a Johnny Mercenary recruit/member.
- Official Lute video metadata supports a sword-based combat identity.
- Official tag-combo evidence identifies Lute, Castella, and Aria in the same tag-combo preview.

Not recovered:

- exact skill names
- exact status application per skill
- cooldowns, multipliers, upgrade scaling, or rotation
- healing/support behavior as an A/B production fact

## 5. Skill Evidence

Exact current Lute Skill names proven by B:

`0`

The following remain C-level research leads only:

- Sword Slash
- Stun Slash
- Swordgrab
- Healing Circle

The sprint did not create a B-level exact Skill record because no official skill panel, labeled official caption, visible skill name, or first-hand current capture was available.

## 6. Equipment/Karma Evidence

Equipment result:

`C_LEVEL_ONLY`

Karma result:

`C_LEVEL_ONLY`

The competitor-reported Equipment/Karma candidates remain discovery leads:

- `equipment:holy-arbiter-lead`
- `karma:a-sword-summoned-for-a-friend-lead`

They do not satisfy A/B-required fields.

## 7. Official Combo Evidence

Official combo evidence was found for:

`Castella → Lute → Aria`

The evidence supports composition-level relation records, not exact status transfer or “best team” claims.

Relation records created:

- `team-relation:castella|lute|official-tag-combo|release-current-unknown-patch`
- `team-relation:lute|aria|official-tag-combo|release-current-unknown-patch`

Classification:

`observed_relation`

Evidence subtype:

`B-DESCRIPTION`

The relation confidence is `MEDIUM` because the official title/announcement establishes the composition, but direct frame/timestamp observation was not captured.

## 8. Castella/Aria Identity

Castella:

`EVIDENCE_B_IDENTITY_CONFIRMED`

Evidence basis: official Steam story text and official combo title.

Aria:

`EVIDENCE_B_IDENTITY_CONFIRMED`

Evidence basis: official combo title.

Neither character was expanded into a new pilot.

## 9. Roxy/Theresia Recheck

Roxy:

`C_LEVEL_ONLY`

Theresia:

`C_LEVEL_ONLY`

No official YouTube/Steam identity source was recovered in this sprint that is strong enough to make them the first vertical-chain target.

Decision:

Roxy/Theresia no longer block the first vertical slice because a stronger official-source chain exists.

## 10. Primary Team Chain Decision

Primary:

`Castella → Lute → Aria`

Secondary research chain:

`Lute → Roxy → Theresia`

Reason:

The primary chain has official video/Steam announcement support. The previous chain still depends on C-level or missing identity/relation evidence.

## 11. Evidence-Level Changes

Sprint 4:

- Evidence A skills: 0
- Evidence B skills: 0
- Team chain: blocked
- Required completeness: 1/8

Sprint 5:

- Evidence A count: 0
- Evidence B fact count: 7
- Evidence C lead count: 8
- Evidence B exact skill count: 0
- B-observed skill behavior count: 0
- Required completeness: 4/9

This is a genuine research improvement, not a publication approval.

## 12. Acquisition Task Updates

Updated task lifecycle:

- `acq-lute-skill-current-verification`: `PARTIALLY_COMPLETED`
- `acq-lute-karma-equipment-verification`: `BLOCKED`
- `acq-lute-roxy-theresia-team-relation`: `SUPERSEDED`
- `acq-roxy-theresia-official-identity`: `SUPERSEDED`
- `acq-lute-official-skill-panel-or-frame-review`: `BLOCKED`
- `acq-lute-equipment-karma-official-source`: `BLOCKED`

Counts:

- Completed: 0
- Partially completed: 1
- Superseded: 2
- Blocked: 3

## 13. Readiness Re-score

| Layer | Sprint 5 status |
| --- | --- |
| Lute Character | `RESEARCH_READY` |
| Lute Skills | `INCOMPLETE` |
| Equipment | `INCOMPLETE` |
| Karma | `INCOMPLETE` |
| Team Relation | `RESEARCH_READY` |
| Build artifact | `INCOMPLETE` |
| Overall | `VERTICAL_SLICE_RESEARCH_READY` |

The slice is now coherent enough to continue evidence acquisition around the official chain, but not enough for a review-ready Character → Build → Team Builder vertical.

## 14. Copyright/Reuse Boundary

Official video frames are classified as:

- internal verification: `INTERNAL_EVIDENCE_ONLY`
- public reuse: `PUBLIC_REUSE_UNCLEAR`
- public frame publication allowed: `false`

No public copyrighted frames were added.

## 15. Production Boundary

Confirmed:

- no public Lute page
- no public Build page
- no Team Builder
- no Character pages
- no new URL
- no sitemap change
- no navigation change
- no public SEO content change
- no production data exposure
- no deployment
- no publish

## 16. Remaining Gaps

Highest-value remaining gaps:

1. Direct official video review with timestamps for Lute skill/status behavior.
2. First-hand or official Lute Skill panel capture.
3. First-hand or official Equipment/Karma panel capture.
4. Direct observation of the Castella → Lute → Aria Status/Signal sequence.
5. Optional: official roster evidence for Roxy/Theresia if the secondary chain becomes relevant later.

## 17. Sprint 6 Recommendation

Proceed with a narrow capture sprint, not UI.

Recommended Sprint 6:

`Lute Official Video Timestamp Review + First-Hand Panel Capture Request`

Acceptance gate:

- at least one exact Lute Skill record becomes A/B-backed, or
- a timestamped official video observation proves a Status/Signal relation, or
- if neither is possible, the backlog should explicitly request user-provided in-game captures.

Do not build Character UI, Build UI, Team Builder UI, public URLs, or sitemap entries until exact Skills and Equipment/Karma are A/B-complete or explicitly scoped out by a later approved product decision.

## Validation

Sprint 5 test result:

`10/10 passed`

Result artifact:

`docs/superpowers/results/2026-08-22-game-guide-product-architecture-sprint-5-tests.json`
