import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type TranslationInput, type TranslationsListResponse, type TranslationResponse } from "@shared/routes";

// In development with Capacitor server.url, relative URLs work fine.
// For production App Store / Play Store builds, set VITE_API_BASE_URL to your deployed API.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

function getSessionId(): string {
  const key = "lv-session-id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

function sessionHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    "X-Session-ID": getSessionId(),
  };
}

export function useTranslations() {
  return useQuery({
    queryKey: [api.translations.list.path],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}${api.translations.list.path}`, {
        headers: { "X-Session-ID": getSessionId() },
      });
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
        headers: sessionHeaders(),
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

export function useDeleteTranslation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_BASE}/api/translations/${id}`, {
        method: "DELETE",
        headers: { "X-Session-ID": getSessionId() },
      });
      if (!res.ok && res.status !== 204) {
        const error = await res.json().catch(() => ({ message: "Failed to delete" }));
        throw new Error(error.message || "Failed to delete");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.translations.list.path] });
    },
  });
}

export function useToggleFavourite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_BASE}/api/translations/${id}/favourite`, {
        method: "PATCH",
        headers: { "X-Session-ID": getSessionId() },
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: "Failed to update favourite" }));
        throw new Error(error.message || "Failed to update favourite");
      }
      return await res.json() as TranslationResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.translations.list.path] });
    },
  });
}
