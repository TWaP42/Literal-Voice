import { z } from 'zod';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const translationResultSchema = z.object({
  originalText: z.string(),
  literalTranslation: z.string(),
  explanation: z.string().nullable(),
  targetLanguage: z.string(),
  phraseType: z.enum(["idiom", "metaphor", "sarcasm", "slang", "figure_of_speech"]).nullable(),
  containsProfanity: z.boolean(),
});

export const api = {
  translations: {
    create: {
      method: 'POST' as const,
      path: '/api/translations' as const,
      input: z.object({
        text: z.string().min(1, "Please enter a phrase to translate").max(500, "Phrase is too long (max 500 characters)"),
        targetLanguage: z.string().max(30, "Language name is too long").optional(),
      }),
      responses: {
        200: translationResultSchema,
        400: errorSchemas.validation,
        429: z.object({ message: z.string() }),
        500: errorSchemas.internal,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type TranslationInput = z.infer<typeof api.translations.create.input>;
export type TranslationResult = z.infer<typeof translationResultSchema>;
export type ValidationError = z.infer<typeof errorSchemas.validation>;
export type InternalError = z.infer<typeof errorSchemas.internal>;
