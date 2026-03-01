import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type TranslationInput, type TranslationsListResponse, type TranslationResponse } from "@shared/routes";

// In development with Capacitor server.url, relative URLs work fine.
// For production App Store / Play Store builds, set VITE_API_BASE_URL to your deployed API.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export function useTranslations() {
  return useQuery({
    queryKey: [api.translations.list.path],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}${api.translations.list.path}`);
      if (!res.ok) throw new Error("Failed to fetch translations");
      return await res.json() as TranslationsListResponse;
    },
  });
}

export function useCreateTranslation() {
  const queryClient = useQueryClient();
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

      return await res.json() as TranslationResponse;
    },
    onSuccess: (_data, variables) => {
      if (!variables.noSave) {
        queryClient.invalidateQueries({ queryKey: [api.translations.list.path] });
      }
    },
  });
}
