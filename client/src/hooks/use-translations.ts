import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type TranslationInput, type TranslationsListResponse, type TranslationResponse } from "@shared/routes";

export function useTranslations() {
  return useQuery({
    queryKey: [api.translations.list.path],
    queryFn: async () => {
      const res = await fetch(api.translations.list.path);
      if (!res.ok) throw new Error("Failed to fetch translations");
      return await res.json() as TranslationsListResponse;
    },
  });
}

export function useCreateTranslation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TranslationInput) => {
      const res = await fetch(api.translations.create.path, {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.translations.list.path] });
    },
  });
}
