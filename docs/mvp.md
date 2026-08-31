# MVP scope

## v0.1 goal

Prove that TestGen can reconstruct enough effective Drupal structure to plan and generate useful browser-test scaffolding without hard-coding node assumptions or pretending incomplete evidence is complete.

## Required proof fixtures

### Proof A — synthetic node bundle

The synthetic content type includes:

- title;
- required short text;
- optional email;
- optional boolean;
- required static select;
- required Department entity reference.

The required entity reference must surface as a runtime dependency unless a deterministic valid target is known.

### Proof B — synthetic custom content entity

Build an equivalent browser-editable custom fieldable content entity and run it through the same generic discovery → normalized model → coverage plan → renderer pipeline.

The foundational model is not proven until both cases pass without node-specific shortcuts.

## Supported widget families

The initial supported set is intentionally small:

- `string_textfield`
- `string_textarea`
- `email_default`
- `boolean_checkbox`
- number widgets
- `options_select` with static values only
- `options_buttons` with static values only

Deferred from v0.1:

- formatted text / CKEditor;
- date and datetime;
- link;
- entity-reference autocomplete;
- file and image;
- arbitrary contrib/custom widgets.

A required unsupported or runtime-dependent field must produce an explicit non-runnable scaffold, such as renderer output using `test.fixme()`, together with an explanation. TestGen must not knowingly emit a broken red test merely to claim coverage.

## Entity references

- Optional entity references may remain empty.
- Required entity references are `runtime_dependency` unless a deterministic valid target is known.
- Recursive reference-graph fixture construction is outside v0.1.

## Fixture strategy

Fixtures are small, local, seeded, and deterministic.

TestGen only claims structural validity according to discovered facts. It does not claim that generated values satisfy arbitrary runtime business validation that could not be established from evidence.

Authentication is externally supplied/scaffolded. TestGen does not create users, alter permissions, or change site configuration to make generated tests pass.

## Generated lifecycle

The initial generated lifecycle is:

```text
Create
  ↓
Assert
  ↓
Edit
  ↓
Assert
  ↓
Delete
  ↓
Assert
```

The exact generated source format is not stable until the first vertical slice is implemented and validated.

## Persistent state

The MVP includes a persistent normalized manifest plus generated source.

Conceptual CLI responsibilities are:

```text
inspect
explain
generate
diff
```

Final command names and package shape remain open until implementation scaffolding is selected.

## Regeneration safety

- Unchanged generated output may be overwritten deterministically.
- Developer-modified generated source must not be overwritten automatically.
- Modified files should receive a proposed replacement/diff.
- Explicit force replacement may be supported.
- AST merging is not part of v0.1.

## Configuration completeness

The MVP must detect and explain when exported configuration may be incomplete.

At minimum, the design must account for:

- Config Ignore;
- Config Ignore Pattern;
- Config Split;
- core exclusions;
- custom transforms when evidence indicates one may be present.

The risk ladder is:

1. exported configuration only;
2. selective structural runtime recovery;
3. selective ignored-config recovery;
4. full temporary unfiltered/active snapshot by explicit opt-in.

Full snapshots are temporary, potentially sensitive, outside normal sync configuration, and must not be recommended for commit. Settings overrides are not included by default.

## Acceptance criteria

The MVP is accepted when it demonstrates all of the following:

- the same generic pipeline handles the synthetic node and custom-content-entity proofs;
- output is deterministic / byte-stable for unchanged inputs;
- enabled-extension inventory is derived from `core.extension`;
- bounded source scanning recognizes relevant procedural hooks and Drupal 11 `#[Hook(...)]` forms;
- configuration completeness and Config Ignore policy are explicit;
- optional runtime reconciliation is read-only and environment-neutral;
- normalized facts retain provenance and uncertainty;
- unsupported and runtime-dependent required behavior remains visible;
- generated source protects developer edits;
- raw ignored secrets are not persisted into manifests, logs, or generated source.

## Explicit non-goals

The MVP does not include:

- a mandatory Drupal module;
- an environment-specific wrapper;
- a browser runner;
- database isolation;
- CI/reporting infrastructure as product responsibility;
- environment snapshots;
- recursive fixture graphs;
- files/media;
- arbitrary PHP semantic interpretation;
- config-entity CRUD coverage;
- Webform;
- Paragraphs;
- Commerce;
- Storybook, Cypress, Behat, PHPUnit, or Drupal Test Traits renderers;
- AI/self-healing generation;
- AST merging.

These may be evaluated after the generic structural pipeline is proven.
