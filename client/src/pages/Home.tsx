import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateTranslation, useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/Navbar";
import { TranslationCard } from "@/components/translation/TranslationCard";
import { Loader2, Search, Sparkles, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [text, setText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("English");
  const { toast } = useToast();
  const createMutation = useCreateTranslation();
  const { data: recentTranslations, isLoading: isLoadingHistory } = useTranslations();

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await createMutation.mutateAsync({ 
        text: text.trim(),
        targetLanguage: targetLanguage.trim() || "English",
      });
      setText("");
      toast({
        title: "Translation Complete",
        description: "The phrase has been translated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to translate",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20 md:pb-0">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-8 sm:space-y-16">
        <div className="text-center space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-3 sm:mb-4">
              Making Language <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Clear & Literal
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance px-2">
              Confused by metaphors, sarcasm, or figures of speech? Enter a phrase below to get a direct, literal explanation instantly.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleTranslate} className="relative group" data-testid="form-translate">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex flex-col gap-2 p-2 bg-white rounded-2xl shadow-xl border border-white/50">
                <div className="relative flex-grow">
                  <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search className="w-5 h-5" />
                  </div>
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='Try "It is raining cats and dogs"...'
                    className="pl-10 sm:pl-12 border-0 bg-transparent focus-visible:ring-0 text-base sm:text-lg placeholder:text-muted-foreground/50 h-12 sm:h-14"
                    maxLength={500}
                    disabled={createMutation.isPending}
                    data-testid="input-phrase"
                  />
                </div>
                <div className="relative flex-grow">
                  <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                  </div>
                  <Input
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    placeholder='Your language (e.g. Spanish)'
                    className="pl-10 sm:pl-12 border-0 bg-slate-50 focus-visible:ring-0 text-sm sm:text-base h-10 sm:h-12 rounded-xl"
                    maxLength={30}
                    disabled={createMutation.isPending}
                    data-testid="input-language"
                  />
                </div>
                <Button 
                  size="lg" 
                  type="submit" 
                  disabled={createMutation.isPending || !text.trim()}
                  className="rounded-xl h-12 sm:h-14 text-base touch-manipulation active:scale-[0.98] transition-transform"
                  data-testid="button-submit"
                >
                  {createMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Translating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Translate Phrase
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-center justify-between border-b pb-3 sm:pb-4">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-foreground">Recent Translations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {isLoadingHistory ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-48 bg-white/50 rounded-2xl animate-pulse border border-white/50" />
                ))
              ) : recentTranslations?.length === 0 ? (
                <div className="col-span-full py-12 text-center text-muted-foreground bg-white/30 rounded-3xl border border-dashed border-muted-foreground/20">
                  <p className="text-base sm:text-lg">No translations yet. Try creating one above!</p>
                </div>
              ) : (
                recentTranslations?.slice(0, 3).map((translation, index) => (
                  <TranslationCard 
                    key={translation.id} 
                    translation={translation} 
                    index={index} 
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
