import assert from "node:assert/strict";
import test from "node:test";

import { toolchainReady } from "../src/index.js";

test("bootstrap source compiles and executes", () => {
  assert.equal(toolchainReady(), true);
});
