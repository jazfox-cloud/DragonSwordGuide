# DragonSword Awakening SEO — Map Evidence Acquisition Sprint

## 1. Executive Status

**BLOCKED.** Research artifacts were created, but first-hand verification could not be performed in this workspace. Evidence A records: 0. No public URL, page, metadata, sitemap or source code was changed.

## 2. Evidence Backlog Summary

- Backlog candidates: **8**.
- Evidence B broad-fact leads: **3** — Orbis caves, Orbis dungeons, watchtower cellars.
- Evidence C-only leads: **5** — WIP chest map, underground/city chest uncertainty, windmill unfogging, Eona’s Legacy tower markers, Goddess Statues of Organa.
- Verified location records: **0**.
- Coordinates/screenshots/routes: none verified.

The backlog deliberately records leads, not factual location claims.

## 3. Verification Sample

Selected sample size: **8**. It spans chests, landmarks, quest/location, fast-travel, caves and dungeons. Candidates were selected from repeated community demand and broad official context; no obscure marker was added merely to reach a quota.

## 4. First-Hand Verification Result

**`FIRST_HAND_VERIFICATION_BLOCKED`**. No playable game session, local save, screenshot capture, video capture or first-hand navigation log is available in this environment. Therefore:

- Evidence A records: **0**.
- No candidate is `VERIFIED` or `VERIFIED_CURRENT`.
- No coordinates, exact totals, route steps or completeness claims were invented.

## 5. Verified Records

There are no verified records in this sprint. The JSON artifact contains `records: []` and keeps four non-verified leads for follow-up. Broad official statements about Orbis caves, dungeons and watchtower cellars remain Evidence B context only; they do not constitute location records.

## 6. Evidence Policy

Evidence A requires first-hand gameplay/map proof and reproducible navigation. Evidence B supports only explicit official claims. Evidence C supports demand, candidate discovery and terminology, not exact coordinates, totals or completeness. Full policy: [`map-evidence-policy.md`](../../research/map/map-evidence-policy.md).

## 7. Completeness Boundary

The only acceptable future claim at this stage is **“community-reported leads; not yet verified.”** A future partial guide may say “verified sample” or “currently documented locations” only after Evidence A/B records exist. “Complete map,” “all chests,” “every location,” “100% complete,” “official map” and “all markers” are prohibited.

## 8. Maintenance Model

Use Markdown/JSON records with game version, first/last verified dates, source, evidence level, current status and stale/recheck flag. Use `VERIFIED_CURRENT`, `COMMUNITY_LEAD`, `NEEDS_RECHECK`, `STALE` and `REJECTED`. No database is needed for the first sample.

## 9. Static Locations Guide Re-score

| Dimension | Score |
|---|---:|
| Search Validation | 20/25 |
| Evidence Strength | 6/25 |
| User Value | 17/20 |
| Maintenance Feasibility | 8/15 |
| SERP Fit | 9/10 |
| Cannibalization Safety | 4/5 |
| **Total** | **64/100** |

Decision: **`RESEARCH_REQUIRED`**. The product shape is useful, but Evidence Strength is below 18 and the five-verified-record minimum is not met.

## 10. Interactive Map Re-score

| Dimension | Score |
|---|---:|
| Search Validation | 23/30 |
| SERP Independence | 18/20 |
| Evidence Strength | 6/20 |
| User Value | 16/20 |
| Cannibalization Safety | 6/10 |
| **Total** | **69/100** |

Decision: **`RESEARCH_REQUIRED`**. Static-guide demand does not automatically make an interactive map feasible. Marker density, reliable map anchoring, repeatable schema and a maintenance workflow are still missing.

## 11. Exact Blocking Evidence

The blocker is not demand. It is the absence of:

1. First-hand screenshots or gameplay captures for individual markers.
2. Reproducible navigation steps from a named area or landmark.
3. A verified marker inventory across at least five records.
4. Exact or honestly bounded location precision.
5. Current game-version/date proof and a recheck workflow.

## 12. Future URL Gate

**`FIRST_HAND_VERIFICATION_BLOCKED`**

`/locations/` is not approved for a future build sprint. `/interactive-map/` is not justified. The next gate requires at least five genuinely verified records and Evidence Strength ≥18/25.

## 13. Next 3 Actions

1. Human plays the current build and captures five bounded records with screenshots, region, route, version and verification date.
2. Reconcile each first-hand record against the community lead and official context; mark unsupported claims `REJECTED` or `NEEDS_RECHECK`.
3. Re-score the Static Locations Guide and interactive map only after the evidence records exist; keep all public pages unchanged.

## 14. Research Artifacts

- [`map-evidence-backlog.md`](../../research/map/map-evidence-backlog.md)
- [`map-evidence-records.json`](../../research/map/map-evidence-records.json)
- [`map-evidence-policy.md`](../../research/map/map-evidence-policy.md)

## 15. Technical Health and Validation

- Homepage: HTTP 200.
- `/map/`: HTTP 200.
- Sitemap index: HTTP 200.
- No production source file changed.
- JSON validity and `git diff --check` are required after artifact creation.
