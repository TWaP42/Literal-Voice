import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Lightbulb } from "lucide-react";
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
    >
      <Card className="h-full hover:border-primary/30 group bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-3 text-muted-foreground mb-2">
            <span className="text-sm font-medium px-2 py-1 bg-muted rounded-md">Original Phrase</span>
          </div>
          <CardTitle className="text-xl font-medium text-foreground/80 group-hover:text-foreground transition-colors">
            "{translation.originalText}"
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="mt-1 p-1.5 bg-primary/20 rounded-full shrink-0">
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">Literal Meaning</span>
                <p className="text-lg font-medium text-foreground leading-relaxed">
                  {translation.literalTranslation}
                </p>
              </div>
            </div>

            {translation.explanation && (
              <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/5 border border-secondary/10">
                 <div className="mt-1 p-1.5 bg-secondary/20 rounded-full shrink-0">
                  <Lightbulb className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider mb-1 block">Why people say this</span>
                  <p className="text-base text-muted-foreground leading-relaxed">
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
