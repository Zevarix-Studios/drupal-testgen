# Contributing to TestGen

Thanks for helping improve TestGen.

## Project stage

TestGen is pre-0.1. The architecture and MVP boundaries are intentionally narrow while the first generic Drupal discovery-to-generation pipeline is proven.

Before proposing a substantial change, read:

- `docs/architecture.md`
- `docs/mvp.md`

For a new major discovery provider, renderer, fixture backend, or supported Drupal domain, open an issue first so the ownership and scope boundary can be agreed before implementation.

## Development expectations

- Keep changes focused and reviewable.
- Preserve Drupal-specific evidence and provenance instead of guessing runtime truth.
- Keep the normalized model independent of Playwright and independent of node-specific assumptions.
- Do not introduce target-site mutations into inspection, explanation, generation, or diff workflows.
- Add or update tests for behavioral changes.
- Update architecture or MVP documentation when a change alters a durable project decision.
- Do not commit secrets, credentials, exported sensitive configuration, generated browser artifacts, or local environment files.

## Pull requests

Pull requests should explain:

1. the problem being solved;
2. the architectural layer affected;
3. the validation performed;
4. any known unsupported or deferred behavior;
5. whether public documentation changed.

The project currently targets squash merging for a compact public history.

## Local validation

Use the pinned Node version from `.nvmrc` and the committed npm lockfile:

```bash
nvm use
npm ci --ignore-scripts
npm run check
```

Focused commands are available when iterating:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

See `docs/toolchain.md` for the exact v0.1 dependency/runtime baseline and compatibility decisions.
