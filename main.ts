import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "WARNING: Contents will insist it is fine while actively falling apart. Do not shake. Do not ask twice.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = path.join(outDir, "entry.txt");

// Gate mirror: UTF-8 text, 1-160 characters, single line, not only whitespace.
if (LINE.length < 1 || LINE.length > 160) {
  throw new Error(`entry is ${LINE.length} characters, must be 1-160`);
}
if (!LINE.trim() || LINE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

fs.mkdirSync(outDir, { recursive: true });
const tmpFile = path.join(outDir, `.entry.txt.${process.pid}.tmp`);
fs.writeFileSync(tmpFile, LINE + "\n", "utf8");
fs.renameSync(tmpFile, outFile);
