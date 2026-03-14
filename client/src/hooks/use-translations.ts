import { useMutation } from "@tanstack/react-query";
import { api, type TranslationInput, type TranslationResult } from "@shared/routes";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export function useCreateTranslation() {
  return useMutation({
    mutationFn: async (data: TranslationInput) => {
      const res = await fetch(`${API_BASE}${api.translations.create.path}`, {
        method: api.translations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to translate");
      }

      return await res.json() as TranslationResult;
    },
  });
}
