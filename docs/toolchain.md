# v0.1 Toolchain Baseline

This document records the verified implementation/tooling baseline selected by issue #8. It is a repository-development contract, not TestGen product behavior.

## Pinned baseline

- Node.js: `24.21.0` LTS (`Krypton`)
- npm: `11.19.0`
- TypeScript: `6.0.2`
- `@drupal/playwright`: `1.2.0`
- `@playwright/test`: `1.63.0`
- ESLint: `10.10.0`
- typescript-eslint: `8.70.0`
- Prettier: `3.9.6`
- Drupal proof target: `11.4.6`

`package-lock.json` is committed and CI installs with `npm ci`.

## TypeScript 7 disposition

TypeScript `7.0.2` was evaluated during bootstrap. The current `typescript-eslint@8.70.0` peer contract supports TypeScript `>=4.8.4 <6.1.0`, so TestGen pins TypeScript `6.0.2` for v0.1 rather than running the normal TypeScript lint stack outside its supported range.

## Drupal Playwright package verification

The published `@drupal/playwright@1.2.0` package exports its root entry point to `dist/index.js` and `dist/index.d.ts`. The root declarations export `Drupal`, `parallelWorker`, `isolatedPerTest`, and `isolatedPerTestSnapshot`.

Its fixture runtime and declarations import `@playwright/test`, but the package does not declare Playwright Test as a peer/runtime dependency. TestGen therefore pins `@playwright/test` explicitly so the package's published root surface is reproducible.

The bootstrap compatibility module imports those exact public root exports at compile time. It does not boot Drupal or run browser tests.

## Drupal baseline

Drupal `11.4.6` is the current stable Drupal 11 patch baseline selected for the downstream synthetic proof harness. Issue #23 owns building that harness and selecting its exact PHP/Drush/runtime composition.

Do not infer that Drupal is a runtime dependency of TestGen itself merely because it is the proof target.
