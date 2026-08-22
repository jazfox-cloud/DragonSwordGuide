import { EvidenceLevel, SourceType } from "../src/domain/game-guide/contracts.js";
import { buildFieldValue, buildSourceRecord, buildGameVersion, buildEntity } from "../src/domain/game-guide/factories.js";
import { evaluateGameGuideBundle } from "../src/domain/game-guide/evaluator.js";

function baseWrapper() {
  return {
    source_id: "source:official-patch",
    evidence_level: EvidenceLevel.B_OFFICIAL,
    game_version: "game-version:1.2.0",
    last_verified: "2026-08-21T00:00:00Z",
    public_allowed: true,
    editorial_judgment: {
      kind: "factual",
      basis_source_ids: ["source:official-patch"],
      game_version: "game-version:1.2.0",
      author_editor_status: "verified_reviewer",
      last_reviewed: "2026-08-21T00:00:00Z",
      confidence: "MEDIUM",
      public_allowed: true,
    },
  };
}

function makeBaseBundle() {
  const wrappers = baseWrapper();
  return {
    entities: {
      source_record: [
        buildSourceRecord({
          id: "source:official-patch",
          source_type: SourceType.OFFICIAL,
          url_or_reference: "https://example.invalid/official/patch-1.2.0",
          title: "Official patch note sample",
          publisher_or_owner: "Dragon Sword Publisher",
          retrieved_at: "2026-08-20T00:00:00Z",
          evidence_level_ceiling: EvidenceLevel.B_OFFICIAL,
          copyright_or_license_note: "internal synthetic fixture",
          public_allowed: true,
          version_relevance: "1.2.0",
          stale_or_recheck_status: "FRESH",
        }),
      ],
      game_version: [
        buildGameVersion({
          id: "game-version:1.2.0",
          version: "1.2.0",
          release_date: "2026-08-20",
          source_id: "source:official-patch",
          status: "CURRENT",
        }),
      ],
      combat_status: [
        buildEntity("combat_status", "combat-status:burn", {
          name: buildFieldValue("Burn", wrappers),
          description: buildFieldValue("Target suffers burn damage over time.", wrappers),
          duration: buildFieldValue("12 seconds", wrappers),
        }),
      ],
      skill: [
        buildEntity("skill", "skill:flame-shot", {
          name: buildFieldValue("Flame Shot", wrappers),
          description: buildFieldValue("Single-target magic burst.", wrappers),
          applies_status_ids: buildFieldValue(["combat-status:burn"], wrappers),
          character_id: buildFieldValue("character:aria-rune", wrappers),
          level: buildFieldValue("1", wrappers),
          damage_type: buildFieldValue("magic", wrappers),
          cooldown_seconds: buildFieldValue("8", wrappers),
          resource_cost: buildFieldValue("30mp", wrappers),
          synergies: buildFieldValue(["team relation"], wrappers),
        }),
      ],
      character: [
        buildEntity("character", "character:aria-rune", {
          name: buildFieldValue("Aria Rune", wrappers),
          role: buildFieldValue("DPS", wrappers),
          summary: buildFieldValue("A precision DPS character.", wrappers),
          skill_ids: buildFieldValue(["skill:flame-shot"], wrappers),
          status_ids: buildFieldValue(["combat-status:burn"], wrappers),
          team_relation_ids: buildFieldValue(["team-relation:aria-rune|luna-orb|starter_connector|1-2-0"], wrappers),
          build_recommendation_ids: buildFieldValue(["build-recommendation:aria-mid"], wrappers),
          lore: buildFieldValue("Synthetic lore", wrappers),
          counterplay_notes: buildFieldValue("Counter when shield active.", wrappers),
          rotation_notes: buildFieldValue("Rotate every 8 sec.", wrappers),
        }),
        buildEntity("character", "character:luna-orb", {
          name: buildFieldValue("Luna Orb", wrappers),
          role: buildFieldValue("Support", wrappers),
          summary: buildFieldValue("Synthetic support profile.", wrappers),
          skill_ids: buildFieldValue(["skill:flame-shot"], wrappers),
          status_ids: buildFieldValue(["combat-status:burn"], wrappers),
          team_relation_ids: buildFieldValue([], wrappers),
          lore: buildFieldValue("Synthetic lore placeholder.", wrappers),
          counterplay_notes: buildFieldValue("Avoid unverified assumptions.", wrappers),
          rotation_notes: buildFieldValue("Rotate as needed.", wrappers),
        }),
      ],
      build_recommendation: [
        buildEntity("build_recommendation", "build-recommendation:aria-mid", {
          name: buildFieldValue("Aria Midline", wrappers),
          summary: buildFieldValue("Balanced burst-focused build.", wrappers),
          build_type: buildFieldValue("mid", wrappers),
          character_ids: buildFieldValue(["character:aria-rune"], wrappers),
          role_specific_tips: buildFieldValue("Focus single target burst windows.", wrappers),
          rotation_rationale: buildFieldValue("Use cooldown rotation.", wrappers),
        }),
      ],
      team_relation: [
        buildEntity("team_relation", "team-relation:aria-rune|luna-orb|starter_connector|1-2-0", {
          from_character_id: buildFieldValue("character:aria-rune", {
            ...wrappers,
            evidence_level: EvidenceLevel.A_FIRST_HAND,
            editorial_judgment: {
              ...wrappers.editorial_judgment,
              kind: "factual",
            },
          }),
          to_character_id: buildFieldValue("character:luna-orb", wrappers),
          relation_type: buildFieldValue("STARTER_CONNECTOR", {
            ...wrappers,
            evidence_level: EvidenceLevel.A_FIRST_HAND,
            editorial_judgment: {
              ...wrappers.editorial_judgment,
              kind: "factual",
            },
          }),
          status_ids: buildFieldValue(["combat-status:burn"], wrappers),
          rationale: buildFieldValue("Starter synergy for burst windows.", wrappers),
          synergy_tags: buildFieldValue(["fire"], wrappers),
          official_relation: buildFieldValue(true, wrappers),
          observed_relation: buildFieldValue("Observed in official scenario.", {
            ...wrappers,
            editorial_judgment: {
              ...wrappers.editorial_judgment,
              kind: "derived",
            },
          }),
          editorial_recommendation: buildFieldValue("Use under burst windows.", {
            ...wrappers,
            editorial_judgment: {
              ...wrappers.editorial_judgment,
              kind: "recommendation",
            },
          }),
        }),
      ],
    },
  };
}

function summarize(label, bundle) {
  const out = evaluateGameGuideBundle(bundle);
  console.log(`\n=== ${label} ===`);
  console.log(`readiness: ${out.overall_readiness_state}`);
  console.log(`publication_gate: ${out.publication_gate}`);
  console.log(`blocking errors: ${out.evidence_errors.length}`);
  for (const issue of out.evidence_errors.slice(0, 8)) {
    console.log(`- ${issue.entity_type}:${issue.field} [${issue.code}] ${issue.message}`);
  }
  console.log(`acquisition tasks: ${out.acquisition_tasks.length}`);
  for (const task of out.acquisition_tasks.slice(0, 6)) {
    console.log(`- ACQ ${task.task_id} / ${task.field_ids.join(", ")} => ${task.publication_state}`);
  }
  console.log(`correction tasks: ${out.correction_tasks.length}`);
  for (const task of out.correction_tasks.slice(0, 6)) {
    console.log(`- COR ${task.task_id} / ${task.invalid_or_missing_field || ""}`);
  }
}

const base = makeBaseBundle();
const clone = (bundle) => structuredClone(bundle);

const scenarios = [
  {
    label: "01 incomplete character",
    bundle: (() => {
      const copy = clone(base);
      delete copy.entities.character[0].fields.summary;
      return copy;
    })(),
  },
  {
    label: "02 missing skill references",
    bundle: (() => {
      const copy = clone(base);
      copy.entities.character[0].fields.skill_ids = buildFieldValue(["skill:missing"], baseWrapper());
      return copy;
    })(),
  },
  {
    label: "03 invalid source reference",
    bundle: (() => {
      const copy = clone(base);
      copy.entities.character[0].fields.summary = buildFieldValue("Invalid source", {
        ...baseWrapper(),
        source_id: "source:missing",
      });
      return copy;
    })(),
  },
  {
    label: "04 missing required equipment field",
    bundle: {
      entities: {
        source_record: [base.entities.source_record[0]],
        game_version: [base.entities.game_version[0]],
        equipment: [
          buildEntity("equipment", "equipment:synthetic-sword", {
            name: buildFieldValue("Synthetic Sword", baseWrapper()),
          }),
        ],
      },
    },
  },
  {
    label: "05 optional-only gaps",
    bundle: (() => {
      const copy = clone(base);
      delete copy.entities.character[0].fields.lore;
      delete copy.entities.character[0].fields.counterplay_notes;
      delete copy.entities.character[0].fields.rotation_notes;
      return copy;
    })(),
  },
];

for (const item of scenarios) {
  summarize(item.label, item.bundle);
}

console.log("\nDemo result: contract-only layer emits structured readiness, blocking errors, tasks, and publication_gate only.");
