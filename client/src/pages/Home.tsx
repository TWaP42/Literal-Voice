import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useCreateTranslation, useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/layout/Navbar";
import { TranslationCard } from "@/components/translation/TranslationCard";
import { Loader2, Search, Sparkles, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { TranslationResponse } from "@shared/routes";

const LANGUAGES = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese",
  "Russian", "Chinese", "Japanese", "Korean", "Arabic", "Hindi",
  "Dutch", "Swedish", "Norwegian", "Danish", "Finnish", "Polish",
  "Turkish", "Greek", "Hebrew", "Thai", "Vietnamese", "Indonesian",
  "Malay", "Filipino", "Czech", "Romanian", "Hungarian", "Ukrainian",
  "Bengali", "Tamil", "Telugu", "Urdu", "Persian", "Swahili",
];

export default function Home() {
  const [text, setText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [noSave, setNoSave] = useState(() => localStorage.getItem("noSave") === "true");
  const [privateResult, setPrivateResult] = useState<TranslationResponse | null>(null);
  const { toast } = useToast();
  const createMutation = useCreateTranslation();
  const { data: recentTranslations, isLoading: isLoadingHistory } = useTranslations();

  const handleToggleNoSave = (checked: boolean) => {
    setNoSave(checked);
    localStorage.setItem("noSave", String(checked));
    if (!checked) setPrivateResult(null);
  };

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const result = await createMutation.mutateAsync({
        text: text.trim(),
        targetLanguage: targetLanguage.trim() || "English",
        noSave,
      });
      setText("");
      if (noSave) {
        setPrivateResult(result);
      } else {
        setPrivateResult(null);
      }
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
            <form onSubmit={handleTranslate} className="relative group" aria-label="Translate a phrase" data-testid="form-translate">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex flex-col gap-2 p-2 bg-white rounded-2xl shadow-xl border border-white/50">
                <div className="relative flex-grow">
                  <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder='Try "It is raining cats and dogs"...'
                    className="pl-10 sm:pl-12 border-0 bg-transparent focus-visible:ring-0 text-base sm:text-lg placeholder:text-muted-foreground/50 h-12 sm:h-14"
                    maxLength={500}
                    disabled={createMutation.isPending}
                    aria-label="Enter a phrase to translate"
                    aria-required="true"
                    data-testid="input-phrase"
                  />
                </div>
                <div className="relative flex-grow">
                  <Select
                    value={targetLanguage}
                    onValueChange={setTargetLanguage}
                    disabled={createMutation.isPending}
                  >
                    <SelectTrigger
                      className="border-0 bg-slate-50 focus:ring-0 h-10 sm:h-12 rounded-xl text-sm sm:text-base"
                      aria-label="Select explanation language"
                      data-testid="input-language"
                    >
                      <SelectValue placeholder="Select explanation language" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      Translating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
                      Translate Phrase
                    </>
                  )}
                </Button>
              </div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center justify-center gap-3 pt-3"
            >
              <ShieldCheck className={`w-4 h-4 ${noSave ? "text-green-500" : "text-muted-foreground"}`} aria-hidden="true" />
              <Label htmlFor="no-save-toggle" className="text-sm text-muted-foreground cursor-pointer select-none">
                Don't save my translations
              </Label>
              <Switch
                id="no-save-toggle"
                checked={noSave}
                onCheckedChange={handleToggleNoSave}
                aria-label="Toggle private mode — translations won't be saved to history"
              />
            </motion.div>
          </motion.div>
        </div>

        {noSave && privateResult && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b pb-3">
              <ShieldCheck className="w-5 h-5 text-green-500" aria-hidden="true" />
              <h2 className="text-xl font-display font-bold text-foreground">Your Translation</h2>
              <span className="text-xs text-muted-foreground ml-auto">Not saved</span>
            </div>
            <TranslationCard translation={privateResult} index={0} />
          </div>
        )}

        {!noSave && (
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
        )}

        <footer className="text-center text-xs text-muted-foreground/60 pt-4 pb-2 space-x-4">
          <Link href="/about" className="hover:text-muted-foreground transition-colors">About</Link>
          <Link href="/privacy" className="hover:text-muted-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-muted-foreground transition-colors">Terms of Service</Link>
        </footer>
      </main>
    </div>
  );
}
