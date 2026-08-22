# Game Guide Product Architecture Sprint 6 — Lute Exact Evidence Capture

Date: 2026-08-22  
Project: DragonSwordGuide  
Pilot: `character:lute`  
Primary chain: `Castella → Lute → Aria`  
Branch: `codex/game-guide-product-architecture-sprint-6`  
Public output: none

## 1. Executive Status

Sprint 6 attempted to close the remaining exact evidence gaps through official-source review.

Final classification:

`OFFICIAL_EVIDENCE_EXHAUSTED_FIRST_HAND_REQUIRED`

Reason:

Official sources confirm the game, Lute, the general Status/Signal system, and the `Castella → Lute → Aria` combo composition. They did not expose enough timestamp-level UI or readable official text to prove exact Lute Skill names, exact Status/Signal identifiers, Equipment relation, or Karma relation.

No third-party claim was promoted.

## 2. Official Video Timestamp Evidence

Reviewed:

| Official video/source | Result |
| --- | --- |
| `Lute Gameplay Preview - DragonSword : Awakening` | Reviewed; no exact skill/status/signal field recovered |
| `Tag Combo Preview - [Lute & Castella & Aria]` | Reviewed; composition remains B-supported, exact chain IDs not recovered |

Timestamp evidence count:

`0`

The accessible official pages and trailer metadata did not provide reliable readable UI frames or timestamps. This triggers the sprint stop condition instead of continued browsing.

## 3. Exact Lute Skills

Exact Lute Skill B count:

`0`

Gate result:

`EXACT_LUTE_SKILL_B_EVIDENCE_NOT_FOUND`

Rejected for B promotion:

- Sword Slash
- Stun Slash
- Swordgrab
- Healing Circle

These remain C-level research leads because they come from third-party/community guide material, not readable official UI/video/caption/news text.

## 4. Status / Signal Evidence

Named Status IDs recovered:

`0`

Named Signal IDs recovered:

`0`

B-observed behavior count:

`0`

The Steam store still supports Status Ailments, Active Skills, Signal Skills, and Switching Signals as official systems. It does not identify exact Lute statuses, exact combo chain status IDs, or exact signal IDs for the pilot chain.

## 5. Equipment Evidence

Equipment status:

`NOT_FOUND`

The candidate `Holy Arbiter` remains a C-level research lead only.

## 6. Karma Evidence

Karma status:

`NOT_FOUND`

The candidate `A Sword Summoned for a Friend` remains a C-level research lead only.

## 7. Team Chain Detail

Primary chain remains:

`Castella → Lute → Aria`

Relation status:

- `Castella → Lute`: `COMPOSITION_B_CONFIRMED_EXACT_CHAIN_BLOCKED`
- `Lute → Aria`: `COMPOSITION_B_CONFIRMED_EXACT_CHAIN_BLOCKED`

The composition is official B-description evidence. Exact transition mechanics, Status IDs, and Signal IDs still require direct capture.

## 8. Human Capture Request Package

Required capture package:

### Lute Skill panel

Capture:

- full panel
- skill names
- descriptions
- currently selected skill
- game version if visible

### Lute Equipment screen

Capture:

- equipment screen
- item type
- compatibility/slot
- Lute identity visible if possible
- game version if visible

### Lute Karma screen

Capture:

- Karma screen
- Lute association
- description/effect text
- game version if visible

### Castella / Lute / Aria combo

Capture:

- Castella/Lute/Aria party
- transition sequence
- Status/Signal UI
- repeat attempt
- timestamps or short clips for Castella → Lute and Lute → Aria

## 9. Evidence Promotions

Allowed:

- `C → B` only through official primary source
- `C/B → A` only through genuine first-hand gameplay

Forbidden:

- multiple third-party agreement
- repeated AI extraction of the same claim
- competitor database structure
- animation-only exact-name inference

Promotions in Sprint 6:

`0`

## 10. Acquisition Task Status

Completed:

`0`

Blocked:

`5`

Superseded:

`2`

Blocked tasks now point to exact capture requirements:

- `acq-lute-skill-current-verification` → `capture:lute-skill-panel`
- `acq-lute-karma-equipment-verification` → `capture:lute-equipment-screen`, `capture:lute-karma-screen`
- `acq-lute-official-skill-panel-or-frame-review` → `capture:lute-skill-panel`
- `acq-lute-equipment-karma-official-source` → `capture:lute-equipment-screen`, `capture:lute-karma-screen`
- `acq-castella-lute-aria-exact-chain-capture` → `capture:castella-lute-aria-combo`

## 11. Readiness Matrix

| Layer | Required field | Current evidence | New evidence | Status |
| --- | --- | --- | --- | --- |
| Lute Character | name / identity | `B_OFFICIAL` | no change | `READY_FOR_REVIEW` |
| Lute Skills | exact names/descriptions/status relations | `C_COMMUNITY` | not found in official review | `INCOMPLETE` |
| Equipment | factual Lute relation | `C_COMMUNITY` | not found in official review | `INCOMPLETE` |
| Karma | factual Lute relation | `C_COMMUNITY` | not found in official review | `INCOMPLETE` |
| Castella identity | name | `B_OFFICIAL` | no change | `READY_FOR_REVIEW` |
| Aria identity | name | `B_OFFICIAL` | no change | `READY_FOR_REVIEW` |
| Team Relation | exact Status/Signal chain | `B_DESCRIPTION` composition | exact chain not found | `RESEARCH_READY` |
| Build artifact | Character → Build → Team relation | `B+C` | no exact build fields recovered | `INCOMPLETE` |

Required completeness:

`4/9`

Evidence completeness:

`0.44`

## 12. Reference Integrity

Reference integrity:

`PASS`

No dangling build references were introduced.

## 13. Production Boundary

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

## 14. Remaining Blockers

Remaining blockers are now first-hand/gameplay-capture blockers:

1. Lute exact skill names/descriptions.
2. Lute exact Status/Signal relationships.
3. Lute Equipment factual relation.
4. Lute Karma factual relation.
5. Castella → Lute → Aria exact transition/status/signal identifiers.

## 15. Sprint 7 Recommendation

Do not browse more generic third-party pages.

Sprint 7 should be a human/gameplay capture sprint:

`Sprint 7 — First-Hand Lute Panel + Combo Capture Intake`

Recommended acceptance:

- user supplies current in-game screenshots/clips for the four capture items, or
- the pilot remains blocked and no public product work starts.

Validation:

- Sprint 6 targeted tests: `9/9 passed`
- Production diff requirement: must remain empty
