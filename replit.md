# LiteralVoice

A web app for level 1 autistic individuals and ESL speakers that instantly translates metaphors, figures of speech, sarcasm, and colloquialisms into literal, plain language. Users can get translations in their native language (defaults to English).

## Architecture

Full-stack TypeScript application built as a Progressive Web App (PWA).

### Frontend
- **React 18** with Vite for fast development and builds
- **Tailwind CSS** + **shadcn/ui** for styling and accessible components
- **Framer Motion** for animations
- **TanStack Query v5** for data fetching/caching
- **Wouter** for routing
- PWA-enabled: manifest.json, service worker for offline support, mobile-optimized UI

### Backend
- **Express 5** server (Node.js)
- **OpenAI API** (via Replit AI Integrations) using gpt-5.1 for general translations (idioms, metaphors, slang, figures of speech)
- **Anthropic Claude API** (via Replit AI Integrations) using claude-sonnet-4-6 for sarcasm-specific translations
- **Dual AI routing**: OpenAI classifies the phrase first; if sarcasm is detected, Claude provides a specialized deeper analysis. Falls back to OpenAI if Claude fails.
- **Zod** for request validation and AI response validation
- In-memory rate limiting (10 requests/minute per IP)
- Input sanitization and prompt injection protection
- Allowlist-based language validation (36 supported languages)

### Database
- **PostgreSQL** with **Drizzle ORM**
- Single `translations` table: id, originalText, literalTranslation, explanation, targetLanguage, phraseType, createdAt
- Paginated queries (default 50, max 100)

## Project Structure

```
client/
  index.html              - HTML entry with PWA meta tags
  public/
    manifest.json          - PWA manifest
    sw.js                  - Service worker
    icons/                 - App icons (SVG)
  src/
    main.tsx               - Entry point with SW registration
    App.tsx                - Routes
    index.css              - Global styles with mobile optimizations
    pages/
      Home.tsx             - Main translation page
      History.tsx           - Translation history
    components/
      layout/Navbar.tsx    - Top nav + mobile bottom tab bar
      translation/TranslationCard.tsx - Card displaying a translation (forwardRef)
    hooks/
      use-translations.ts  - Query/mutation hooks
      use-toast.ts         - Toast notifications
server/
  routes.ts               - API endpoints with dual AI routing, rate limiting, sanitization
  storage.ts              - Database CRUD interface with pagination
  replit_integrations/     - Auto-generated integration boilerplate (do not edit)
shared/
  schema.ts               - Drizzle table definitions and types
  routes.ts               - API contract definitions with input length limits
  models/chat.ts          - Chat models (from Anthropic blueprint, unused)
```

## Security
- Prompt injection protection: user input treated as data, never as instructions
- Language field validated against allowlist (rejects freeform injection attempts)
- Input sanitized: control characters stripped, length capped at 500 chars
- AI response validated with Zod schema before database insertion
- Rate limiting: 10 translations per minute per IP

## Key Features
- Phrase-to-literal translation via AI (idioms, metaphors, sarcasm, slang)
- Sarcasm handled by Claude for deeper emotional subtext analysis
- Phrase type detection with color-coded badges
- Default English target language for ESL speakers
- PWA: installable on mobile (iOS/Android), offline-capable
- Mobile-first responsive design with bottom tab navigation
- Paginated translation history

## Running
- `npm run dev` starts Express + Vite dev server on port 5000
- `npm run db:push` syncs database schema
