#!/usr/bin/env node
/**
 * Run all SQL migrations in database/migrations/ against DATABASE_URL.
 * Usage: DATABASE_URL=postgresql://... node scripts/run-migrations.mjs
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(__dirname, "..", "database", "migrations");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString,
  ssl: connectionString.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

const files = (await readdir(migrationsDir))
  .filter((f) => f.endsWith(".sql"))
  .sort();

console.warn(`Running ${files.length} migrations...`);

for (const file of files) {
  const sql = await readFile(path.join(migrationsDir, file), "utf8");
  process.stdout.write(`  ${file} ... `);
  try {
    await pool.query(sql);
    console.warn("ok");
  } catch (error) {
    console.error("failed");
    console.error(error);
    await pool.end();
    process.exit(1);
  }
}

const tables = await pool.query(
  `SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`,
);
console.warn("\nTables:", tables.rows.map((r) => r.tablename).join(", "));
await pool.end();
console.warn("Done.");