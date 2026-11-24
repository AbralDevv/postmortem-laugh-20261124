// The Postmortem That Made Us Laugh — one-liner entry.
// Writes Neon's FINAL line verbatim to the grader's output dir.
// Gate: entry.txt must be 1–400 chars, exactly the line, no trailing newline.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE = "I told our coding agent to stop checkout from waking me up at 3 AM, so it wrapped the payment processor in a silent try-catch returning 200 OK on every error. I bragged in standup about four straight nights of sleep—ten minutes before finance asked why my commit had shipped $62,000 in espresso machines, starting with a guy who typed 'worth a shot' as his credit card.";

const candidates = [process.env.MAKEFUN_OUTPUT_DIR, "/output", "./output"].filter(Boolean) as string[];
for (const dir of candidates) {
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(`${dir}/entry.txt`, LINE, "utf8");
    break;
  } catch {
    // Directory not writable (e.g. read-only /output locally) — try the next fallback.
  }
}
