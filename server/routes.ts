import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.translations.list.path, async (req, res) => {
    try {
      const allTranslations = await storage.getTranslations();
      res.json(allTranslations);
    } catch (err) {
      console.error("Error fetching translations:", err);
      res.status(500).json({ message: "Failed to fetch translations" });
    }
  });

  app.post(api.translations.create.path, async (req, res) => {
    try {
      // Validate the user's input phrase
      const input = api.translations.create.input.parse(req.body);
      
      const targetLanguageInstruction = input.targetLanguage 
        ? ` Translate the literal rephrasing and explanation into ${input.targetLanguage}.`
        : ` Use the same language as the input phrase.`;

      const response = await openai.chat.completions.create({
        model: "gpt-5.1",
        messages: [
          {
            role: "system",
            content: `You are an assistant designed specifically to help autistic individuals understand confusing colloquialisms, idioms, figures of speech, and metaphors.
Your tone should be neutral, direct, clear, and reassuring.

Given a phrase, you must output a JSON object with two fields:
- "literalTranslation": A very brief, literal rephrasing of the text without any metaphors.
- "explanation": A slightly longer context of why people say that and what the origin or meaning is, keeping it factual and avoiding complex abstractions.
${targetLanguageInstruction}

Return ONLY the JSON. Do not wrap in markdown code blocks.`
          },
          {
            role: "user",
            content: `Please translate this phrase into literal meaning: "${input.text}"`
          }
        ],
        response_format: { type: "json_object" }
      });

      const responseText = response.choices[0]?.message?.content;
      if (!responseText) {
        throw new Error("Failed to generate translation from AI");
      }

      const parsedAIResponse = JSON.parse(responseText);

      // Save to database
      const translation = await storage.createTranslation({
        originalText: input.text,
        literalTranslation: parsedAIResponse.literalTranslation,
        explanation: parsedAIResponse.explanation,
        targetLanguage: input.targetLanguage
      });

      res.status(201).json(translation);

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error("Translation error:", err);
      res.status(500).json({ message: "An unexpected error occurred during translation" });
    }
  });

  return httpServer;
}

// Seed function to prepopulate some common metaphors for first-time visitors
export async function seedDatabase() {
  try {
    const existing = await storage.getTranslations();
    if (existing.length === 0) {
      await storage.createTranslation({
        originalText: "Break a leg",
        literalTranslation: "Good luck",
        explanation: "This is a theatrical idiom. People used to think saying 'good luck' to an actor was bad luck, so they said the opposite instead."
      });
      await storage.createTranslation({
        originalText: "It's raining cats and dogs",
        literalTranslation: "It is raining very heavily",
        explanation: "This is an old English idiom used to describe a severe rainstorm. Cats and dogs are not actually falling from the sky."
      });
      await storage.createTranslation({
        originalText: "Under the weather",
        literalTranslation: "Feeling sick or unwell",
        explanation: "This comes from sailing. Sailors who were sea-sick would go below deck (under the weather) to recover."
      });
    }
  } catch (error) {
    console.error("Failed to seed database:", error);
  }
}
