import { buildFieldValue, buildSourceRecord, buildGameVersion, buildEntity } from "./factories.js";

function baseSource() {
  return buildSourceRecord({
    id: "source:official-patch",
    source_type: "official",
    url_or_reference: "https://example.invalid/official/patch-1.2.0",
    title: "Official patch note sample",
    publisher_or_owner: "Dragon Sword Publisher",
    retrieved_at: "2026-08-20T00:00:00Z",
    evidence_level_ceiling: "B_OFFICIAL",
    copyright_or_license_note: "internal synthetic fixture",
    public_allowed: true,
    version_relevance: "1.2.0",
    stale_or_recheck_status: "FRESH",
  });
}

function baseVersion() {
  return buildGameVersion({
    id: "game-version:1.2.0",
    version: "1.2.0",
    release_date: "2026-08-20",
    source_id: "source:official-patch",
    status: "CURRENT",
  });
}

function commonEntityFields({ source = "source:official-patch", version = "game-version:1.2.0" }) {
  return {
    source,
    version,
    makeSource: {
      source_id: source,
      evidence_level: "B_OFFICIAL",
      game_version: version,
      last_verified: "2026-08-21T00:00:00Z",
      public_allowed: true,
    },
  };
}

function completeBundleOverrides(optional = {}) {
  const c = commonEntityFields({ ...(optional.common || {}) });
  return {
    entities: {
      source_record: [baseSource()],
      game_version: [baseVersion()],
      combat_status: [
        buildEntity("combat_status", "combat-status:burn", {
          name: buildFieldValue("Burn", c.makeSource),
          description: buildFieldValue("Target suffers burn damage over time.", c.makeSource),
          duration: buildFieldValue("12 seconds", c.makeSource),
        }),
      ],
      skill: [
        buildEntity("skill", "skill:flame-shot", {
          name: buildFieldValue("Flame Shot", c.makeSource),
          description: buildFieldValue("Single-target magic burst.", c.makeSource),
          applies_status_ids: buildFieldValue(["combat-status:burn"], c.makeSource),
          character_id: buildFieldValue("character:aria-rune", c.makeSource),
          level: buildFieldValue("1", c.makeSource),
          damage_type: buildFieldValue("magic", c.makeSource),
          cooldown_seconds: buildFieldValue("8", c.makeSource),
          resource_cost: buildFieldValue("30mp", c.makeSource),
          synergies: buildFieldValue(["team relation"], c.makeSource),
        }),
      ],
      character: [
        buildEntity("character", "character:aria-rune", {
          name: buildFieldValue("Aria Rune", c.makeSource),
          role: buildFieldValue("DPS", c.makeSource),
          summary: buildFieldValue("A precision DPS character.", c.makeSource),
          skill_ids: buildFieldValue(["skill:flame-shot"], c.makeSource),
          status_ids: buildFieldValue(["combat-status:burn"], c.makeSource),
          team_relation_ids: buildFieldValue(["team-relation:aria-rune|luna-orb|starter_connector|1-2-0"], c.makeSource),
          build_recommendation_ids: buildFieldValue(["build-recommendation:aria-mid"], c.makeSource),
          lore: buildFieldValue("Synthetic lore", c.makeSource),
          counterplay_notes: buildFieldValue("Counter when shield active.", c.makeSource),
          rotation_notes: buildFieldValue("Rotate every 8 sec.", c.makeSource),
        }),
        buildEntity("character", "character:luna-orb", {
          name: buildFieldValue("Luna Orb", c.makeSource),
          role: buildFieldValue("Support", c.makeSource),
          summary: buildFieldValue("A compact support profile for synthetic fixtures.", c.makeSource),
          skill_ids: buildFieldValue(["skill:flame-shot"], c.makeSource),
          status_ids: buildFieldValue(["combat-status:burn"], c.makeSource),
          team_relation_ids: buildFieldValue([], c.makeSource),
          lore: buildFieldValue("Synthetic lore placeholder.", c.makeSource),
          counterplay_notes: buildFieldValue("Avoid unverified assumptions.", c.makeSource),
          rotation_notes: buildFieldValue("Rotate as needed.", c.makeSource),
        }),
      ],
      build_recommendation: [
        buildEntity("build_recommendation", "build-recommendation:aria-mid", {
          name: buildFieldValue("Aria Midline", c.makeSource),
          summary: buildFieldValue("Balanced burst-focused build.", c.makeSource),
          build_type: buildFieldValue("mid", c.makeSource),
          character_ids: buildFieldValue(["character:aria-rune"], c.makeSource),
          role_specific_tips: buildFieldValue("Focus single target burst windows.", c.makeSource),
          rotation_rationale: buildFieldValue("Use cooldown rotation.", c.makeSource),
        }),
      ],
      team_relation: [
        buildEntity("team_relation", "team-relation:aria-rune|luna-orb|starter_connector|1-2-0", {
          from_character_id: buildFieldValue("character:aria-rune", c.makeSource),
          to_character_id: buildFieldValue("character:luna-orb", c.makeSource),
          relation_type: buildFieldValue("STARTER_CONNECTOR", { ...c.makeSource, evidence_level: "A_FIRST_HAND", editorial_judgment: {
            kind: "factual",
            basis_source_ids: ["source:official-patch"],
            game_version: "game-version:1.2.0",
            author_editor_status: "verified_reviewer",
            last_reviewed: "2026-08-21T00:00:00Z",
            confidence: "HIGH",
            public_allowed: true,
          } }),
          status_ids: buildFieldValue(["combat-status:burn"], c.makeSource),
          rationale: buildFieldValue("Starter synergy for burst windows.", {
            ...c.makeSource,
            editorial_judgment: {
              kind: "factual",
              basis_source_ids: ["source:official-patch"],
              game_version: "game-version:1.2.0",
              author_editor_status: "verified_reviewer",
              last_reviewed: "2026-08-21T00:00:00Z",
              confidence: "HIGH",
              public_allowed: true,
            },
          }),
          synergy_tags: buildFieldValue(["fire"], c.makeSource),
          official_relation: buildFieldValue(true, c.makeSource),
          observed_relation: buildFieldValue("Observed in official scenario.", {
            ...c.makeSource,
            editorial_judgment: {
              kind: "derived",
              basis_source_ids: ["source:official-patch"],
              game_version: "game-version:1.2.0",
              author_editor_status: "editor",
              last_reviewed: "2026-08-21T00:00:00Z",
              confidence: "MEDIUM",
              public_allowed: true,
            },
          }),
          editorial_recommendation: buildFieldValue("Use under burst windows.", {
            ...c.makeSource,
            editorial_judgment: {
              kind: "recommendation",
              basis_source_ids: ["source:official-patch"],
              game_version: "game-version:1.2.0",
              author_editor_status: "editor",
              last_reviewed: "2026-08-21T00:00:00Z",
              confidence: "MEDIUM",
              public_allowed: true,
            },
          }),
        }),
      ],
    },
    ...(optional || {}),
  };
}

function buildFixture(name, override = {}) {
  const base = completeBundleOverrides();
  return {
    name,
    bundle: {
      entities: {
        ...base.entities,
        ...override.entities,
      },
    },
    expected: override.expected || {},
  };
export const sprint1Fixtures = [
  buildFixture("01_complete_character"),
  buildFixture("02_incomplete_character", {
    entities: {
      character: [
        (() => {
          const character = completeBundleOverrides().entities.character[0];
          delete character.fields.summary;
          return character;
        })(),
      ],
    },
    expected: { expected_tasks: "acquisition" },
  }),
  buildFixture("03_character_invalid_source_reference", {
    entities: {
      character: [
        (() => {
          const character = completeBundleOverrides().entities.character[0];
          character.fields.summary = {
            value: "Synthetic summary",
            source_id: "source:missing",
            evidence_level: "B_OFFICIAL",
            game_version: "game-version:1.2.0",
            last_verified: "2026-08-21T00:00:00Z",
            public_allowed: true,
            editorial_judgment: {
              kind: "factual",
              basis_source_ids: ["source:missing"],
              game_version: "game-version:1.2.0",
              author_editor_status: "verified_reviewer",
              last_reviewed: "2026-08-21T00:00:00Z",
              confidence: "MEDIUM",
              public_allowed: true,
            },
          };
          return character;
        })(),
      ],
    },
    expected: { expected_tasks: "correction" },
  }),
  buildFixture("04_duplicate_character_id", {
    entities: {
      character: [
        (() => {
          const character = completeBundleOverrides().entities.character[0];
          character.fields.name.value = "First Aria";
          return character;
        })(),
        buildEntity("character", "character:aria-rune", {
          name: buildFieldValue("Second Aria", {
            source_id: "source:official-patch",
            evidence_level: "B_OFFICIAL",
            game_version: "game-version:1.2.0",
            last_verified: "2026-08-21T00:00:00Z",
            public_allowed: true,
            editorial_judgment: {
              kind: "factual",
              basis_source_ids: ["source:official-patch"],
              game_version: "game-version:1.2.0",
              author_editor_status: "verified_reviewer",
              last_reviewed: "2026-08-21T00:00:00Z",
              confidence: "HIGH",
              public_allowed: true,
            },
          }),
          role: buildFieldValue("DPS", {
            source_id: "source:official-patch",
            evidence_level: "B_OFFICIAL",
            game_version: "game-version:1.2.0",
            last_verified: "2026-08-21T00:00:00Z",
            public_allowed: true,
            editorial_judgment: {
              kind: "factual",
              basis_source_ids: ["source:official-patch"],
              game_version: "game-version:1.2.0",
              author_editor_status: "verified_reviewer",
              last_reviewed: "2026-08-21T00:00:00Z",
              confidence: "HIGH",
              public_allowed: true,
            },
          }),
          summary: buildFieldValue("Another Aria", {
            source_id: "source:official-patch",
            evidence_level: "B_OFFICIAL",
            game_version: "game-version:1.2.0",
            last_verified: "2026-08-21T00:00:00Z",
            public_allowed: true,
            editorial_judgment: {
              kind: "factual",
              basis_source_ids: ["source:official-patch"],
              game_version: "game-version:1.2.0",
              author_editor_status: "verified_reviewer",
              last_reviewed: "2026-08-21T00:00:00Z",
              confidence: "HIGH",
              public_allowed: true,
            },
          }),
          skill_ids: buildFieldValue(["skill:flame-shot"], {
            source_id: "source:official-patch",
            evidence_level: "B_OFFICIAL",
            game_version: "game-version:1.2.0",
            last_verified: "2026-08-21T00:00:00Z",
            public_allowed: true,
            editorial_judgment: {
              kind: "factual",
              basis_source_ids: ["source:official-patch"],
              game_version: "game-version:1.2.0",
              author_editor_status: "verified_reviewer",
              last_reviewed: "2026-08-21T00:00:00Z",
              confidence: "HIGH",
              public_allowed: true,
            },
          }),
          status_ids: buildFieldValue(["combat-status:burn"], {
            source_id: "source:official-patch",
            evidence_level: "B_OFFICIAL",
            game_version: "game-version:1.2.0",
            last_verified: "2026-08-21T00:00:00Z",
            public_allowed: true,
            editorial_judgment: {
              kind: "factual",
              basis_source_ids: ["source:official-patch"],
              game_version: "game-version:1.2.0",
              author_editor_status: "verified_reviewer",
              last_reviewed: "2026-08-21T00:00:00Z",
              confidence: "HIGH",
              public_allowed: true,
            },
          }),
          team_relation_ids: buildFieldValue(["team-relation:aria-rune|luna-orb|starter_connector|1-2-0"], {
            source_id: "source:official-patch",
            evidence_level: "B_OFFICIAL",
            game_version: "game-version:1.2.0",
            last_verified: "2026-08-21T00:00:00Z",
            public_allowed: true,
            editorial_judgment: {
              kind: "factual",
              basis_source_ids: ["source:official-patch"],
              game_version: "game-version:1.2.0",
              author_editor_status: "verified_reviewer",
              last_reviewed: "2026-08-21T00:00:00Z",
              confidence: "HIGH",
              public_allowed: true,
            },
          }),
        }),
      ],
    },
    expected: { expected_error: "ERR_DUPLICATE_CANONICAL_ID" },
  }),
  buildFixture("05_stale_game_version", {
    entities: {
      game_version: [
        buildGameVersion({
          id: "game-version:1.1.0",
          version: "1.1.0",
          release_date: "2026-07-01",
          source_id: "source:official-patch",
          status: "ARCHIVED",
        }),
      ],
      character: [
        (() => {
          const character = completeBundleOverrides().entities.character[0];
          character.fields.summary = buildFieldValue("Older summary", {
            source_id: "source:official-patch",
            evidence_level: "B_OFFICIAL",
            game_version: "game-version:1.1.0",
            last_verified: "2026-07-20T00:00:00Z",
            public_allowed: true,
            editorial_judgment: {
              kind: "factual",
              basis_source_ids: ["source:official-patch"],
              game_version: "game-version:1.1.0",
              author_editor_status: "verified_reviewer",
              last_reviewed: "2026-07-20T00:00:00Z",
              confidence: "MEDIUM",
              public_allowed: true,
            },
          });
          return character;
        })(),
      ],
    },
    expected: { expected_error: "ERR_STALE_VERSION" },
  }),
  buildFixture("06_team_relation_dangling_character_ref", {
    entities: {
      team_relation: [
        (() => {
          const relation = completeBundleOverrides().entities.team_relation[0];
          relation.fields.to_character_id = buildFieldValue("character:missing-char", {
            source_id: "source:official-patch",
            evidence_level: "B_OFFICIAL",
            game_version: "game-version:1.2.0",
            last_verified: "2026-08-21T00:00:00Z",
            public_allowed: true,
            editorial_judgment: {
              kind: "factual",
              basis_source_ids: ["source:official-patch"],
              game_version: "game-version:1.2.0",
              author_editor_status: "verified_reviewer",
              last_reviewed: "2026-08-21T00:00:00Z",
              confidence: "HIGH",
              public_allowed: true,
            },
          });
          return relation;
        })(),
      ],
      character: [
        completeBundleOverrides().entities.character[0],
      ],
    },
    expected: { expected_error: "ERR_DANGLING_REFERENCE" },
  }),
  buildFixture("07_editorial_without_basis", {
    entities: {
      character: [
        (() => {
          const character = completeBundleOverrides().entities.character[0];
          character.fields.summary = {
            value: "Missing basis",
            source_id: "source:official-patch",
            evidence_level: "B_OFFICIAL",
            game_version: "game-version:1.2.0",
            last_verified: "2026-08-21T00:00:00Z",
            public_allowed: true,
            editorial_judgment: {
              kind: "factual",
              basis_source_ids: [],
              game_version: "game-version:1.2.0",
              author_editor_status: "verified_reviewer",
              last_reviewed: "2026-08-21T00:00:00Z",
              confidence: "HIGH",
              public_allowed: true,
            },
          };
          return character;
        })(),
      ],
    },
    expected: { expected_error: "ERR_EDITORIAL_MISSING_BASIS" },
  }),
  buildFixture("08_public_allowed_false_field", {
    entities: {
      character: [
        (() => {
          const character = completeBundleOverrides().entities.character[0];
          character.fields.summary.public_allowed = false;
          return character;
        })(),
      ],
    },
    expected: { expected_error: "ERR_FORBIDDEN_PUBLIC_FIELD" },
  }),
  buildFixture("09_missing_required_field", {
    entities: {
      character: [
        (() => {
          const character = completeBundleOverrides().entities.character[0];
          delete character.fields.role;
          return character;
        })(),
      ],
    },
    expected: { expected_tasks: "acquisition" },
  }),
  buildFixture("10_missing_optional_field_only", {
    entities: {
      character: [
        (() => {
          const character = completeBundleOverrides().entities.character[0];
          delete character.fields.lore;
          delete character.fields.counterplay_notes;
          delete character.fields.rotation_notes;
          return character;
        })(),
      ],
    },
    expected: { expected_readiness: "RESEARCH_READY" },
  }),
];
