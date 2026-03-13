import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Globe, MessageCircle, Flame, BookOpen, Hash, Quote, AlertTriangle, Eye, EyeOff, Trash2, Star } from "lucide-react";
import type { Translation } from "@shared/schema";
import { useDeleteTranslation, useToggleFavourite } from "@/hooks/use-translations";
import { useToast } from "@/hooks/use-toast";

interface TranslationCardProps {
  translation: Translation;
  index: number;
  showActions?: boolean;
}

const typeConfig: Record<string, { label: string; color: string; icon: typeof MessageCircle }> = {
  sarcasm: { label: "Sarcasm", color: "bg-orange-100 text-orange-700 border-orange-200", icon: Flame },
  idiom: { label: "Idiom", color: "bg-blue-100 text-blue-700 border-blue-200", icon: BookOpen },
  metaphor: { label: "Metaphor", color: "bg-purple-100 text-purple-700 border-purple-200", icon: Quote },
  slang: { label: "Slang", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: Hash },
  figure_of_speech: { label: "Figure of Speech", color: "bg-pink-100 text-pink-700 border-pink-200", icon: MessageCircle },
};

export const TranslationCard = forwardRef<HTMLDivElement, TranslationCardProps>(
  function TranslationCard({ translation, index, showActions = false }, ref) {
    const [revealed, setRevealed] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const phraseType = translation.phraseType ? typeConfig[translation.phraseType] : null;
    const TypeIcon = phraseType?.icon;
    const isConcealed = translation.containsProfanity && !revealed;
    const deleteMutation = useDeleteTranslation();
    const favouriteMutation = useToggleFavourite();
    const { toast } = useToast();

    const handleDelete = async () => {
      if (!confirmDelete) {
        setConfirmDelete(true);
        setTimeout(() => setConfirmDelete(false), 3000);
        return;
      }
      try {
        await deleteMutation.mutateAsync(translation.id);
        toast({ title: "Deleted", description: "Translation removed." });
      } catch {
        toast({ title: "Error", description: "Could not delete translation.", variant: "destructive" });
      }
    };

    const handleFavourite = async () => {
      try {
        await favouriteMutation.mutateAsync(translation.id);
      } catch {
        toast({ title: "Error", description: "Could not update favourite.", variant: "destructive" });
      }
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, delay: Math.min(index * 0.1, 0.5) }}
        data-testid={`card-translation-${translation.id}`}
      >
        <Card className="h-full hover:border-primary/30 group bg-white/50 backdrop-blur-sm touch-manipulation relative overflow-hidden">
          {isConcealed && (
            <div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white/95 backdrop-blur-sm p-6"
              role="alert"
              data-testid={`overlay-profanity-${translation.id}`}
            >
              <div className="p-3 bg-amber-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-amber-600" aria-hidden="true" />
              </div>
              <div className="text-center space-y-2 max-w-xs">
                <p className="font-display font-semibold text-foreground text-base">Content Warning</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This translation may contain language that some people find offensive or upsetting.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRevealed(true)}
                className="gap-2"
                aria-label="Show translation with content warning"
                data-testid={`button-reveal-${translation.id}`}
              >
                <Eye className="w-4 h-4" aria-hidden="true" />
                Show Translation
              </Button>
            </div>
          )}

          <div aria-hidden={isConcealed ? "true" : undefined}>
            <CardHeader className={`p-4 sm:p-6 ${isConcealed ? "blur-md select-none" : ""}`}>
              <div className="flex items-center justify-between mb-2 flex-wrap gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-medium px-2 py-1 bg-muted rounded-md text-muted-foreground">Original Phrase</span>
                  {phraseType && TypeIcon && (
                    <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md border ${phraseType.color}`} data-testid={`badge-type-${translation.id}`}>
                      <TypeIcon className="w-3 h-3" aria-hidden="true" />
                      {phraseType.label}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  {translation.targetLanguage && (
                    <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-accent/10 text-accent rounded-md" data-testid={`text-language-${translation.id}`}>
                      <Globe className="w-3 h-3" aria-hidden="true" />
                      {translation.targetLanguage}
                    </span>
                  )}
                  {showActions && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-7 w-7 rounded-full transition-colors ${translation.isFavourite ? "text-yellow-500 hover:text-yellow-600" : "text-muted-foreground hover:text-yellow-500"}`}
                        onClick={handleFavourite}
                        disabled={favouriteMutation.isPending}
                        aria-label={translation.isFavourite ? "Remove from favourites" : "Add to favourites"}
                        aria-pressed={translation.isFavourite}
                        data-testid={`button-favourite-${translation.id}`}
                      >
                        <Star className="w-3.5 h-3.5" fill={translation.isFavourite ? "currentColor" : "none"} aria-hidden="true" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-7 w-7 rounded-full transition-colors ${confirmDelete ? "text-red-600 hover:text-red-700 bg-red-50" : "text-muted-foreground hover:text-red-500"}`}
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                        aria-label={confirmDelete ? "Confirm delete translation" : "Delete translation"}
                        data-testid={`button-delete-${translation.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <CardTitle className="text-lg sm:text-xl font-medium text-foreground/80 group-hover:text-foreground transition-colors leading-snug">
                "{translation.originalText}"
              </CardTitle>
            </CardHeader>
            <CardContent className={`p-4 sm:p-6 pt-0 sm:pt-0 ${isConcealed ? "blur-md select-none" : ""}`}>
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="mt-0.5 sm:mt-1 p-1 sm:p-1.5 bg-primary/20 rounded-full shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">Literal Meaning</span>
                    <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed break-words" data-testid={`text-literal-${translation.id}`}>
                      {translation.literalTranslation}
                    </p>
                  </div>
                </div>

                {translation.explanation && (
                  <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/5 border border-secondary/10">
                    <div className="mt-0.5 sm:mt-1 p-1 sm:p-1.5 bg-secondary/20 rounded-full shrink-0">
                      <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-1 block">Why people say this</span>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words" data-testid={`text-explanation-${translation.id}`}>
                        {translation.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </div>

          {translation.containsProfanity && revealed && (
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRevealed(false)}
                className="gap-2 text-muted-foreground w-full"
                aria-label="Hide translation content"
                data-testid={`button-hide-${translation.id}`}
              >
                <EyeOff className="w-4 h-4" aria-hidden="true" />
                Hide Translation
              </Button>
            </div>
          )}
        </Card>
      </motion.div>
    );
  }
);
