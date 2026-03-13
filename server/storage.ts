import { db } from "./db";
import {
  translations,
  type InsertTranslation,
  type Translation,
} from "@shared/schema";
import { desc, eq, and } from "drizzle-orm";
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
        session_id TEXT,
        is_favourite INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);
  }

  // Add new columns to existing databases (safe — SQLite ignores duplicate ADD COLUMN errors)
  for (const stmt of [
    `ALTER TABLE translations ADD COLUMN session_id TEXT`,
    `ALTER TABLE translations ADD COLUMN is_favourite INTEGER NOT NULL DEFAULT 0`,
  ]) {
    try {
      db.run(stmt);
    } catch {
      // Column already exists — ignore
    }
  }
}

export interface IStorage {
  getTranslations(limit: number, offset: number, sessionId?: string): Promise<Translation[]>;
  createTranslation(translation: InsertTranslation): Promise<Translation>;
  deleteTranslation(id: number, sessionId: string): Promise<boolean>;
  toggleFavourite(id: number, sessionId: string): Promise<Translation | null>;
}

export class DatabaseStorage implements IStorage {
  async getTranslations(limit: number = 50, offset: number = 0, sessionId?: string): Promise<Translation[]> {
    const query = db
      .select()
      .from(translations)
      .orderBy(desc(translations.createdAt))
      .limit(limit)
      .offset(offset);

    if (sessionId) {
      return await query.where(eq(translations.sessionId, sessionId));
    }
    return await query;
  }

  async createTranslation(insertTranslation: InsertTranslation): Promise<Translation> {
    const [translation] = await db
      .insert(translations)
      .values(insertTranslation)
      .returning();
    return translation;
  }

  async deleteTranslation(id: number, sessionId: string): Promise<boolean> {
    const result = await db
      .delete(translations)
      .where(and(eq(translations.id, id), eq(translations.sessionId, sessionId)))
      .returning();
    return result.length > 0;
  }

  async toggleFavourite(id: number, sessionId: string): Promise<Translation | null> {
    const [existing] = await db
      .select()
      .from(translations)
      .where(and(eq(translations.id, id), eq(translations.sessionId, sessionId)));

    if (!existing) return null;

    const [updated] = await db
      .update(translations)
      .set({ isFavourite: !existing.isFavourite })
      .where(and(eq(translations.id, id), eq(translations.sessionId, sessionId)))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
