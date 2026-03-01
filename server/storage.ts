import { db } from "./db";
import {
  translations,
  type InsertTranslation,
  type Translation,
} from "@shared/schema";
import { desc } from "drizzle-orm";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import path from "path";
import { existsSync } from "fs";

// Auto-create the table if it doesn't exist (no migration files needed for fresh installs)
export function initializeDatabase() {
  const migrationsPath = path.resolve("migrations");
  if (existsSync(migrationsPath)) {
    migrate(db, { migrationsFolder: migrationsPath });
  } else {
    // Create table directly if no migration files exist yet
    db.run(`
      CREATE TABLE IF NOT EXISTS translations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        original_text TEXT NOT NULL,
        literal_translation TEXT NOT NULL,
        explanation TEXT,
        target_language TEXT,
        phrase_type TEXT,
        contains_profanity INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);
  }
}

export interface IStorage {
  getTranslations(limit: number, offset: number): Promise<Translation[]>;
  createTranslation(translation: InsertTranslation): Promise<Translation>;
}

export class DatabaseStorage implements IStorage {
  async getTranslations(limit: number = 50, offset: number = 0): Promise<Translation[]> {
    return await db
      .select()
      .from(translations)
      .orderBy(desc(translations.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async createTranslation(insertTranslation: InsertTranslation): Promise<Translation> {
    const [translation] = await db
      .insert(translations)
      .values(insertTranslation)
      .returning();
    return translation;
  }
}

export const storage = new DatabaseStorage();
