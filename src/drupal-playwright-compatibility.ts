import {
  Drupal,
  isolatedPerTest,
  isolatedPerTestSnapshot,
  parallelWorker,
  type DrupalSite,
} from "@drupal/playwright";

void Drupal;
void isolatedPerTest;
void isolatedPerTestSnapshot;
void parallelWorker;

export const DRUPAL_PLAYWRIGHT_ROOT_EXPORTS_RESOLVE = true;
export type DrupalPlaywrightSite = DrupalSite;
