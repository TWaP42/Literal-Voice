import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const translations = sqliteTable("translations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  originalText: text("original_text").notNull(),
  literalTranslation: text("literal_translation").notNull(),
  explanation: text("explanation"),
  targetLanguage: text("target_language"),
  phraseType: text("phrase_type"),
  containsProfanity: integer("contains_profanity", { mode: "boolean" }).default(false).notNull(),
  createdAt: text("created_at").$defaultFn(() => new Date().toISOString()).notNull(),
});

// === BASE SCHEMAS ===
export const insertTranslationSchema = createInsertSchema(translations).omit({ id: true, createdAt: true });

// === EXPLICIT API CONTRACT TYPES ===

// Base types
export type Translation = typeof translations.$inferSelect;
export type InsertTranslation = z.infer<typeof insertTranslationSchema>;

// Request types
export type CreateTranslationRequest = { text: string; targetLanguage?: string };

// Response types
export type TranslationResponse = Translation;
export type TranslationsListResponse = Translation[];
