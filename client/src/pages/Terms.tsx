import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";

const LAST_UPDATED = "13 March 2026";

export default function Terms() {
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
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Terms of Service</h1>
            <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
            <p className="text-sm text-muted-foreground">
              LiteralVoice is operated by <strong>Tiny Whale and Petunia</strong>, based in Toronto, Ontario, Canada.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-800 leading-relaxed">
            By using LiteralVoice you agree to these terms. If you do not agree, please do not use the service.
          </div>

          <div className="space-y-4">
            {[
              {
                heading: "1. Service description",
                body: `LiteralVoice is a free, AI-powered tool operated by Tiny Whale and Petunia that explains figurative language, idioms, sarcasm, and slang in plain, literal terms. It is provided as-is for informational and accessibility purposes.`,
              },
              {
                heading: "2. No warranty",
                body: `LiteralVoice is provided "as is" without any warranty of accuracy, completeness, or fitness for a particular purpose. AI-generated explanations may occasionally be incorrect or culturally inaccurate. Do not rely solely on LiteralVoice for critical communication.`,
              },
              {
                heading: "3. Acceptable use",
                body: `You agree not to submit content that is illegal, harassing, or designed to manipulate or extract harmful information from the AI. Rate limiting is applied to prevent abuse. Attempts to circumvent rate limiting or otherwise abuse the service may result in your session being blocked.`,
              },
              {
                heading: "4. Intellectual property",
                body: `The LiteralVoice application, design, and codebase are the property of Tiny Whale and Petunia. AI-generated translation outputs are produced by Anthropic's Claude model; ownership of AI outputs is subject to Anthropic's terms of service.`,
              },
              {
                heading: "5. Limitation of liability",
                body: `To the fullest extent permitted by law, Tiny Whale and Petunia shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.`,
              },
              {
                heading: "6. Third-party services",
                body: `LiteralVoice uses the Anthropic Claude API. Your use of LiteralVoice is also subject to Anthropic's usage policies. We are not responsible for changes or outages in third-party services.`,
              },
              {
                heading: "7. Changes to the service",
                body: `We reserve the right to modify or discontinue LiteralVoice at any time without notice. We may also update these terms; continued use of the service constitutes acceptance of any changes.`,
              },
              {
                heading: "8. Governing law",
                body: `These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein. Any disputes shall be resolved in the courts of Ontario, Canada.`,
              },
              {
                heading: "9. Contact",
                body: `For questions about these terms, contact Tiny Whale and Petunia at info@tinywhaleandpetunia.com.`,
              },
            ].map(({ heading, body }) => (
              <section key={heading} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                <h2 className="font-display font-semibold text-foreground mb-2">{heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{body}</p>
              </section>
            ))}
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 text-sm text-muted-foreground">
            <strong className="text-foreground">Contact us:</strong>{" "}
            <a href="mailto:info@tinywhaleandpetunia.com" className="text-primary underline underline-offset-2">
              info@tinywhaleandpetunia.com
            </a>
            <br />
            Tiny Whale and Petunia — Toronto, Ontario, Canada
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/privacy">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Privacy Policy
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
