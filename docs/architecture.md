# Architecture

## Product statement

TestGen is an environment-neutral Drupal testing discovery and generation compiler for fieldable content entities. It combines exported configuration, known Drupal semantics, installed-extension and bounded source-influence analysis, plus optional read-only runtime reconciliation into a provenance-aware normalized testing model; plans site-specific coverage; and generates developer-owned browser-test scaffolding using `@drupal/playwright` while surfacing incomplete configuration, unsupported behavior, and runtime dependencies instead of guessing.

## Core pipeline

```text
Drupal project
├── exported configuration
├── installed extension inventory / source
└── optional read-only runtime evidence
        ↓
Discovery providers
        ↓
Normalized framework-neutral Drupal model
        ↓
Coverage plan
        ↓
Renderer
        ↓
@drupal/playwright
        ↓
Playwright
```

## Ownership boundaries

TestGen owns:

- Drupal structural discovery;
- configuration-completeness analysis;
- installed-extension inventory;
- bounded source-influence detection;
- optional read-only runtime structural reconciliation;
- the normalized Drupal testing model;
- provenance and confidence;
- coverage planning;
- deterministic simple fixture strategies;
- site-specific generated test source;
- explanations and safe regeneration behavior.

TestGen does not own:

- the browser engine or generic test runner;
- Drupal Playwright fixture implementation;
- database isolation or environment snapshots;
- generic reusable test suites;
- CI, reporting, or deployment orchestration;
- secret management;
- Drupal configuration management;
- arbitrary PHP semantic interpretation.

## Entity architecture

The foundational model targets fieldable Drupal content entities with browser-editable forms. It must not be node-shaped.

The architecture is not considered proven until the same generic pipeline succeeds against both:

1. a synthetic Drupal node bundle;
2. a synthetic custom fieldable content entity.

Entity definitions, base fields, configurable fields, bundle semantics, form display, routes, and access requirements are separate concepts and must remain separately representable.

## Evidence providers

### ConfigProvider

Reads exported Drupal configuration and identifies structural facts such as configurable field storage, bundle field instances, base-field overrides, and entity form display configuration.

Relevant patterns include:

```text
field.storage.<entity_type>.*
field.field.<entity_type>.<bundle>.*
core.base_field_override.<entity_type>.*
core.entity_form_display.<entity_type>.<bundle>.*
```

Bundle configuration is entity-type-specific; for example, nodes additionally use `node.type.*`.

### CoreSemanticsProvider

Supplies stable known Drupal semantics that are not fully represented by exported field configuration alone.

### ExtensionInventoryProvider

Uses `core.extension` to establish enabled modules and themes and their state before source influence is evaluated.

### SourceInfluenceProvider

Performs bounded static detection of enabled code that can influence discovered assumptions. It may detect both procedural hooks and Drupal 11 attribute-based hooks such as `#[Hook(...)]`.

High-impact examples include form alters, entity/base/bundle field alters, and widget form/info alters.

Its question is: **what enabled code can influence this assumption?** It does not claim to determine what arbitrary PHP definitely does at runtime.

### RuntimeDrupalProvider

Optional, environment-neutral, and read-only. Runtime access is supplied through an adapter such as Lando Drush, DDEV Drush, or `vendor/bin/drush`; environment wrappers are not part of Drupal semantics.

Runtime reconciliation may inspect active configuration, extension state, and structural entity metadata. It must not mutate the target site.

## Configuration completeness

Absence from exported sync configuration is not proof of runtime absence.

TestGen must be able to detect or surface evidence for configuration transforms and exclusions including Config Ignore, Config Ignore Pattern, Config Split, core exclusions, and custom transforms when evidence points to them.

Config Ignore remains a developer-controlled boundary. Analysis policy is recorded per rule rather than silently bypassing site policy. The intended choices are conceptually:

- keep ignored;
- include for analysis;
- structural metadata only.

A fuller temporary active/configuration snapshot may be supported only as an explicit opt-in. TestGen must not modify Config Ignore settings merely to inspect a site and must not persist raw ignored secrets or settings overrides by default.

## Normalized model

The normalized model is independent of Playwright and independent of any one Drupal entity type.

Provenance values include:

- `config`
- `core_semantic_registry`
- `source_static`
- `runtime`
- `inferred`

Support state is tracked independently from provenance/confidence:

- `supported`
- `runtime_dependency`
- `unsupported`

Uncertainty is preserved as uncertainty rather than collapsed into a guessed value.

The normalized model is also intended to become a reusable developer-intelligence substrate. Once the v0.1 discovery-to-generation architecture is proven, additional outputs should consume this same model rather than reparsing Drupal configuration or creating parallel structural representations.

## Coverage planning

Coverage planning consumes the normalized model and decides what lifecycle and field behavior can be generated safely.

A required unsupported or runtime-dependent behavior must remain visible in the plan and generated source rather than being silently omitted.

## Renderer

The v0.1 renderer targets `@drupal/playwright` and should prefer user-facing locators such as `getByRole()` and `getByLabel()`.

Generated navigation uses Drupal routes/paths or project-relative configuration rather than embedding absolute environment URLs.

The renderer is downstream of the normalized model. Playwright concepts must not leak backward into discovery semantics.

## Planned post-MVP model consumers

The following capabilities are explicitly planned after the core v0.1 model and test-generation pipeline are proven. They all consume the same canonical normalized model and remain outside v0.1 acceptance.

### Structural diagram export

TestGen will support a UML-style/site-model diagram renderer covering fieldable content entity types and bundles, base/configurable fields, field types, cardinality and required state, entity-reference targets, taxonomy relationships, and other structural relationships represented by the model.

Diagram output must preserve provenance and uncertainty so runtime-dependent or inferred relationships are distinguishable from confirmed structural facts. Mermaid and PlantUML are the initial candidate formats; Graphviz/DOT may be evaluated later for larger graphs.

See issue #2.

### Machine-readable structural manifest

TestGen will expose a deterministic machine-readable serialization of the normalized model so external tools and future integrations can consume TestGen's structural understanding without independently parsing Drupal YAML or duplicating evidence reconciliation.

The manifest should preserve entity/bundle/field structure, relationships, provenance, confidence, support state, and configuration-completeness/runtime-dependency signals. A public schema should be versioned when it stabilizes.

See issue #4.

### Developer-facing site architecture inventory

TestGen will generate a human-readable site architecture/inventory report suitable for onboarding, architecture documentation, and maintenance review. It should summarize entity types, bundles, fields, relationships, important form/widget metadata, configuration-completeness concerns, runtime dependencies, and uncertainty where known.

This report remains a renderer/consumer of the normalized model rather than a separate discovery path.

See issue #5.

### Structural diff and change-impact analysis

TestGen will compare normalized models to explain meaningful Drupal structural changes rather than merely showing raw YAML diffs. Planned comparisons include entity/bundle additions and removals, field changes, required/cardinality changes, reference target changes, form/widget changes, and completeness/runtime-dependency changes.

Where supported by the normalized model and coverage planner, change analysis should also identify likely test and fixture implications and flag structural changes that warrant migration review. It must remain evidence-backed and explicit about uncertainty rather than predicting arbitrary PHP/runtime behavior.

See issue #6.

These planned consumers strengthen the architectural requirement that the normalized model remain framework-neutral, deterministic, provenance-aware, and independent of any single output format.

## Generated-source ownership

Generated source becomes developer-owned source.

Regeneration uses stable metadata/hashes so unchanged output can be replaced deterministically while developer-modified output is protected and surfaced as a proposed replacement/diff unless force is explicitly requested.

AST merging is outside v0.1.

## Database and target-site safety

Inspection, explanation, generation, and diff operations are read-only against Drupal.

Generated CRUD tests may mutate whichever test environment the developer later chooses to run them against, but TestGen never assumes a local environment is disposable and never owns database isolation.
