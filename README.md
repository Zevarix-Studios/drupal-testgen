# TestGen

TestGen is an open-source Drupal-aware test discovery and generation tool.

It reconstructs effective Drupal structure from exported configuration, installed extensions and source influence, with optional read-only runtime reconciliation; turns that evidence into a provenance-aware normalized model and coverage plan; and generates developer-owned browser-test scaffolding.

The initial renderer target is `@drupal/playwright`.

## Status

TestGen is in pre-0.1 architecture and bootstrap development. The first milestone is a bounded vertical slice proving the same generic pipeline against both a Drupal node bundle and a custom fieldable content entity.

## License

TestGen is intended to be released under GPL-2.0-or-later for compatibility with Drupal.org distribution and the Drupal ecosystem.
