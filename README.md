# TestGen

TestGen is an open-source Drupal-aware test discovery and generation tool.

It reconstructs effective Drupal structure from exported configuration, installed extensions and bounded source-influence analysis, with optional read-only runtime reconciliation. TestGen turns that evidence into a provenance-aware normalized model and coverage plan, then generates developer-owned browser-test scaffolding.

The initial renderer target is `@drupal/playwright`.

## Status

TestGen is in pre-0.1 architecture and bootstrap development. The first milestone is a bounded vertical slice proving the same generic pipeline against both a Drupal node bundle and a custom fieldable content entity.

No stable CLI, package API, configuration schema, or generated-source format exists yet.

## Architecture

The core pipeline is:

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

See [Architecture](docs/architecture.md) and [MVP scope](docs/mvp.md).

## Principles

- Treat exported configuration, active configuration, installed extensions, source influence, and runtime evidence as distinct evidence sources.
- Preserve provenance and uncertainty instead of converting incomplete evidence into false certainty.
- Model fieldable Drupal content entities generically; nodes are one proof case, not the architecture.
- Keep Drupal discovery and coverage planning separate from the browser-test renderer.
- Keep inspection and generation read-only against the target Drupal site.
- Generate deterministic developer-owned source and protect developer edits during regeneration.

## License

TestGen is licensed under `GPL-2.0-or-later`.
