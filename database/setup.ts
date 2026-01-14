import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "@/lib/db";
import { PromoCodeStorage } from "@/lib/promoStorage";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function setupDatabase() {
  try {
    console.warn("Setting up database...");

    // Get all migration files
    const migrationsDir = path.join(__dirname, "migrations");
    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    // Execute migrations in order
    for (const migrationFile of migrationFiles) {
      console.warn(`Running migration: ${migrationFile}`);
      const migrationPath = path.join(migrationsDir, migrationFile);
      const migrationSQL = fs.readFileSync(migrationPath, "utf-8");
      await pool.query(migrationSQL);
    }

    console.warn("Database schema created successfully!");

    // Migrate existing promo codes
    console.warn("Migrating existing promo codes...");
    await PromoCodeStorage.migrateExistingPromoCodes();

    console.warn("Database setup completed successfully!");
  } catch (error) {
    console.error("Error setting up database:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run setup if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  void setupDatabase();
}

export default setupDatabase;
