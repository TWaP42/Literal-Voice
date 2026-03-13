import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

const LAST_UPDATED = "13 March 2026";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20 md:pb-0">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800 leading-relaxed">
            <strong>Disclaimer:</strong> LiteralVoice is provided for informational and accessibility purposes only. It is not a substitute for professional language support, medical advice, or therapeutic services. AI-generated explanations may occasionally be inaccurate.
          </div>

          <div className="prose prose-sm prose-slate max-w-none space-y-6">
            {[
              {
                heading: "1. What data we collect",
                body: `When you submit a phrase for translation, we store the original text, the AI-generated literal translation and explanation, the target language you selected, and an anonymous session identifier generated locally in your browser. We do not collect your name, email address, IP address (beyond rate-limiting purposes), or any other personally identifiable information.`,
              },
              {
                heading: "2. How we use your data",
                body: `Your translations are stored solely to show you your own history. Each browser session has a unique anonymous ID stored in localStorage. Translations are scoped to your session — other users cannot see your translations. We do not sell, share, or monetise your data.`,
              },
              {
                heading: "3. Third-party AI processing",
                body: `Phrases you submit are sent to Anthropic's Claude API for analysis. Anthropic processes this data according to their own privacy policy. By using LiteralVoice you acknowledge that submitted text is processed by Anthropic. Please do not submit sensitive personal information in phrases.`,
              },
              {
                heading: "4. Data retention and deletion",
                body: `Your translations are retained until you delete them using the delete button in History. You can remove all your data at any time by clearing your browser's localStorage (which resets your session ID) and deleting individual translations from the History page.`,
              },
              {
                heading: "5. Cookies and local storage",
                body: `We use localStorage to store an anonymous session identifier (lv-session-id). We do not use tracking cookies or analytics scripts.`,
              },
              {
                heading: "6. Security",
                body: `The Anthropic API key is stored server-side as an environment variable and is never exposed to the browser. All connections use HTTPS in production.`,
              },
              {
                heading: "7. Children's privacy",
                body: `LiteralVoice is not directed at children under 13. If you believe a child has submitted personal information, please contact us.`,
              },
              {
                heading: "8. Changes to this policy",
                body: `We may update this policy from time to time. The date at the top of this page reflects the most recent revision.`,
              },
            ].map(({ heading, body }) => (
              <section key={heading} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                <h2 className="font-display font-semibold text-foreground mb-2">{heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{body}</p>
              </section>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/terms">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Terms of Service
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                Back to App
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
