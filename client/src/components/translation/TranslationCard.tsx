import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Globe } from "lucide-react";
import type { Translation } from "@shared/routes";

interface TranslationCardProps {
  translation: Translation;
  index: number;
}

export function TranslationCard({ translation, index }: TranslationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      data-testid={`card-translation-${translation.id}`}
    >
      <Card className="h-full hover:border-primary/30 group bg-white/50 backdrop-blur-sm touch-manipulation">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium px-2 py-1 bg-muted rounded-md text-muted-foreground">Original Phrase</span>
            {translation.targetLanguage && (
              <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-accent/10 text-accent rounded-md" data-testid={`text-language-${translation.id}`}>
                <Globe className="w-3 h-3" />
                {translation.targetLanguage}
              </span>
            )}
          </div>
          <CardTitle className="text-lg sm:text-xl font-medium text-foreground/80 group-hover:text-foreground transition-colors leading-snug">
            "{translation.originalText}"
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="mt-0.5 sm:mt-1 p-1 sm:p-1.5 bg-primary/20 rounded-full shrink-0">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
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
                  <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
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
      </Card>
    </motion.div>
  );
}
