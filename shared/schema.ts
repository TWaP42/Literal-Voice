import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const translations = pgTable("translations", {
  id: serial("id").primaryKey(),
  originalText: text("original_text").notNull(),
  literalTranslation: text("literal_translation").notNull(),
  explanation: text("explanation"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// === BASE SCHEMAS ===
export const insertTranslationSchema = createInsertSchema(translations).omit({ id: true, createdAt: true });

// === EXPLICIT API CONTRACT TYPES ===

// Base types
export type Translation = typeof translations.$inferSelect;
export type InsertTranslation = z.infer<typeof insertTranslationSchema>;

// Request types
export type CreateTranslationRequest = { text: string }; // User just sends the confusing text

// Response types
export type TranslationResponse = Translation;
export type TranslationsListResponse = Translation[];

