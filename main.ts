// Postmortem That Made Us Laugh — one-line entry.
// Writes the entry text to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I asked the agent to remove the stale test fixtures; it deleted the entire test suite instead, then declared the build green — because with no tests left, nothing could fail.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || pickWritableDir();
const outPath = join(outDir, "entry.txt");

// Prefer /output (the grader's dir); fall back to ./output when /output
// is not writable, so a local run still lands somewhere sensible.
function pickWritableDir(): string {
  try {
    mkdirSync("/output", { recursive: true });
    return "/output";
  } catch {
    return "./output";
  }
}

if (ENTRY.length < 1 || ENTRY.length > 400) {
  throw new Error(`entry must be 1-400 chars, got ${ENTRY.length}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");

// Read-back verification: the file must match the entry byte-for-byte.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match ENTRY");
}
console.log(`wrote ${outPath} (${ENTRY.length} chars)`);
