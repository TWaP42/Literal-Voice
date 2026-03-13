import { z } from 'zod';
import { insertTranslationSchema, translations } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  translations: {
    list: {
      method: 'GET' as const,
      path: '/api/translations' as const,
      responses: {
        200: z.array(z.custom<typeof translations.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/translations' as const,
      input: z.object({
        text: z.string().min(1, "Please enter a phrase to translate").max(500, "Phrase is too long (max 500 characters)"),
        targetLanguage: z.string().max(30, "Language name is too long").optional(),
        noSave: z.boolean().optional(),
      }),
      responses: {
        201: z.custom<typeof translations.$inferSelect>(),
        400: errorSchemas.validation,
        429: z.object({ message: z.string() }),
        500: errorSchemas.internal,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/translations/:id' as const,
      responses: {
        204: z.null(),
        404: errorSchemas.notFound,
      },
    },
    toggleFavourite: {
      method: 'PATCH' as const,
      path: '/api/translations/:id/favourite' as const,
      responses: {
        200: z.custom<typeof translations.$inferSelect>(),
        404: errorSchemas.notFound,
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
export type TranslationResponse = z.infer<typeof api.translations.create.responses[201]>;
export type TranslationsListResponse = z.infer<typeof api.translations.list.responses[200]>;
export type ValidationError = z.infer<typeof errorSchemas.validation>;
export type InternalError = z.infer<typeof errorSchemas.internal>;
