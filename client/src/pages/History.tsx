import { motion } from "framer-motion";
import { useTranslations } from "@/hooks/use-translations";
import { Navbar } from "@/components/layout/Navbar";
import { TranslationCard } from "@/components/translation/TranslationCard";
import { Loader2 } from "lucide-react";

export default function History() {
  const { data: translations, isLoading } = useTranslations();

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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground" data-testid="text-history-title">Translation History</h1>
            <p className="text-muted-foreground text-base sm:text-lg">Your collection of translated phrases and their literal meanings.</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {translations?.map((translation, index) => (
                <TranslationCard 
                  key={translation.id} 
                  translation={translation} 
                  index={index} 
                />
              ))}
              
              {translations?.length === 0 && (
                <div className="col-span-full py-24 text-center text-muted-foreground">
                  <p>No history found.</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
