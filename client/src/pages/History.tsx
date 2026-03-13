import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "@/hooks/use-translations";
import { Navbar } from "@/components/layout/Navbar";
import { TranslationCard } from "@/components/translation/TranslationCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Star } from "lucide-react";

export default function History() {
  const { data: translations, isLoading } = useTranslations();
  const [search, setSearch] = useState("");
  const [showFavourites, setShowFavourites] = useState(false);

  const filtered = useMemo(() => {
    if (!translations) return [];
    let result = translations;
    if (showFavourites) result = result.filter((t) => t.isFavourite);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.originalText.toLowerCase().includes(q) ||
          t.literalTranslation.toLowerCase().includes(q) ||
          (t.explanation ?? "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [translations, search, showFavourites]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20 md:pb-0">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 sm:space-y-8"
        >
          <div className="flex flex-col gap-1 sm:gap-2">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground"
              data-testid="text-history-title"
            >
              Translation History
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Your collection of translated phrases and their literal meanings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your translations..."
                className="pl-9"
                aria-label="Search translations"
                data-testid="input-search"
              />
            </div>
            <Button
              variant={showFavourites ? "default" : "outline"}
              onClick={() => setShowFavourites((v) => !v)}
              className="gap-2 shrink-0"
              aria-pressed={showFavourites}
              aria-label="Show favourites only"
              data-testid="button-filter-favourites"
            >
              <Star className="w-4 h-4" fill={showFavourites ? "currentColor" : "none"} aria-hidden="true" />
              Favourites
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-24" role="status" aria-label="Loading translations">
              <Loader2 className="w-8 h-8 animate-spin text-primary" aria-hidden="true" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((translation, index) => (
                <TranslationCard
                  key={translation.id}
                  translation={translation}
                  index={index}
                  showActions
                />
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full py-24 text-center text-muted-foreground">
                  <p>
                    {search || showFavourites
                      ? "No translations match your filters."
                      : "No history yet. Translate a phrase to get started!"}
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
