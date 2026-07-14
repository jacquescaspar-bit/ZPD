#!/usr/bin/env node
/**
 * Flag likely US English in content/blog/*.md
 * Usage: node scripts/check-blog-locale.mjs
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDir = path.join(__dirname, "..", "content", "blog");

const patterns = [
  { re: /\benroll(?!ment)/i, hint: "use enrol / enrolment" },
  { re: /\borganiz(e|ing|ed|ation)/i, hint: "use organis-" },
  { re: /\bpersonaliz(e|ing|ed|ation)/i, hint: "use personalis-" },
  { re: /\brecogniz(e|ing|ed|ation)/i, hint: "use recognis-" },
  { re: /\bbehavior\b/i, hint: "use behaviour" },
  { re: /\bmath\b(?!s)/i, hint: "use maths" },
  { re: /\bgrades\b/i, hint: "use marks (school results)" },
  {
    re: /\breferral program\b/i,
    hint: "use referral programme",
  },
  { re: /\bkid(s|'s)?\b/i, hint: "use child / children" },
  { re: /\bprogram\b(?!me)/i, hint: "use programme (non-software)" },
];

const files = (await readdir(blogDir)).filter((f) => f.endsWith(".md"));
let failed = false;

for (const file of files) {
  const text = await readFile(path.join(blogDir, file), "utf8");
  for (const { re, hint } of patterns) {
    if (re.test(text)) {
      console.error(`${file}: possible US spelling — ${hint}`);
      failed = true;
    }
  }
}

if (failed) process.exit(1);
console.warn(`✓ ${files.length} blog posts — Australian English check passed`);