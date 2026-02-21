import { db } from "./db";
import {
  translations,
  type InsertTranslation,
  type Translation,
} from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  getTranslations(): Promise<Translation[]>;
  createTranslation(translation: InsertTranslation): Promise<Translation>;
}

export class DatabaseStorage implements IStorage {
  async getTranslations(): Promise<Translation[]> {
    return await db.select().from(translations).orderBy(desc(translations.createdAt));
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
