import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { MessageSquareText, Brain, Globe, Heart, Sparkles } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Built for neurodivergent users",
    description:
      "LiteralVoice was designed with autistic individuals in mind — people who may find figurative language, sarcasm, or idioms confusing. We explain what phrases actually mean, not just what they say.",
  },
  {
    icon: Globe,
    title: "Multilingual explanations",
    description:
      "Get explanations in your native language. LiteralVoice supports over 35 languages so the literal meaning is always clear, no matter where you're from.",
  },
  {
    icon: Sparkles,
    title: "Powered by AI",
    description:
      "We use Claude by Anthropic to analyse idioms, metaphors, sarcasm, and slang with contextual depth — not just dictionary definitions.",
  },
  {
    icon: Heart,
    title: "Safe and considerate",
    description:
      "Content warnings are shown for phrases containing profanity or offensive language, so you stay in control of what you see.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20 md:pb-0">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-2xl">
                <MessageSquareText className="h-10 w-10 text-primary" aria-hidden="true" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              About LiteralVoice
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              LiteralVoice is a free tool that turns confusing figurative language into clear, direct explanations.
              It's for anyone who has ever read a phrase and thought: <em>"But what does that actually mean?"</em>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 space-y-3"
              >
                <div className="p-2 bg-primary/10 rounded-lg w-fit">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h2 className="font-display font-semibold text-foreground">{title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 space-y-3">
            <h2 className="font-display font-semibold text-foreground text-lg">Who is it for?</h2>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm leading-relaxed">
              <li>Autistic individuals who process language literally</li>
              <li>ESL / EFL learners encountering colloquial English</li>
              <li>Anyone who encounters an unfamiliar idiom or saying</li>
              <li>Parents and educators supporting neurodivergent children</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                Start Translating
              </Button>
            </Link>
            <Link href="/privacy">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Privacy Policy
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
