# LiteralVoice

A web app for level 1 autistic individuals and ESL speakers that instantly translates metaphors, figures of speech, sarcasm, and colloquialisms into literal, plain language. Users can get translations in their native language (defaults to English).

## Architecture

Full-stack TypeScript application deployed as a Progressive Web App (PWA) installable on iOS and Android.

### Frontend
- **React 18** with Vite for fast development and builds
- **Tailwind CSS** + **shadcn/ui** for styling and accessible components
- **Framer Motion** for animations
- **TanStack Query v5** for data fetching/caching
- **Wouter** for routing
- PWA-enabled: manifest.json, service worker (v3), splash screen, install prompt, offline indicator

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
- Single `translations` table: id, originalText, literalTranslation, explanation, targetLanguage, phraseType, containsProfanity, createdAt
- Paginated queries (default 50, max 100)

## Project Structure

```
client/
  index.html              - HTML entry with PWA meta tags, splash screen
  public/
    manifest.json          - Full PWA manifest with shortcuts, categories, all icon sizes
    sw.js                  - Service worker (v3) with font caching, network-first strategy
    icons/                 - PNG icons (48-512px) + apple-touch-icon
  src/
    main.tsx               - Entry point with SW registration and splash dismissal
    App.tsx                - Routes + PWA components (install prompt, offline indicator)
    index.css              - Global styles with standalone mode, safe areas, animations
    pages/
      Home.tsx             - Main translation page
      History.tsx           - Translation history
    components/
      layout/Navbar.tsx    - Top nav + mobile bottom tab bar with safe areas
      translation/TranslationCard.tsx - Card displaying a translation (forwardRef)
      pwa/InstallPrompt.tsx - Native app install banner (Android beforeinstallprompt)
      pwa/OfflineIndicator.tsx - Offline status banner
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

## PWA / Mobile App Features
- **Manifest**: Full icon set (48-512px PNG), maskable icons, app shortcuts, categories
- **Service Worker v3**: Network-first with font caching, offline fallback
- **Splash Screen**: Branded loading screen with logo, fades after React mounts
- **Install Prompt**: Android install banner via beforeinstallprompt API (dismissible per session)
- **Offline Indicator**: Amber banner when network is unavailable
- **iOS Support**: apple-touch-icon (180px), multiple sizes (128-152px), apple-mobile-web-app-capable, black-translucent status bar
- **Safe Areas**: env(safe-area-inset-*) padding on nav, tab bar for notched devices
- **Standalone Mode**: Disabled overscroll bounce, user-select text only, no browser chrome
- **Touch**: touch-action: manipulation on interactive elements, -webkit-tap-highlight-color: transparent

## Security
- Prompt injection protection: user input treated as data, never as instructions
- Language field validated against allowlist (rejects freeform injection attempts)
- Input sanitized: control characters stripped, length capped at 500 chars
- AI response validated with Zod schema before database insertion
- Rate limiting: 10 translations per minute per IP
- JSON body limit: 10kb

## Key Features
- Phrase-to-literal translation via AI (idioms, metaphors, sarcasm, slang)
- Sarcasm handled by Claude for deeper emotional subtext analysis
- Phrase type detection with color-coded badges
- Profanity detection: AI flags offensive content, cards are blurred with a content warning overlay; users can reveal/re-hide
- Home page shows max 3 recent translations; full history on History page
- Default English target language for ESL speakers
- PWA: installable on mobile (iOS/Android), offline-capable, splash screen, install prompt
- Mobile-first responsive design with bottom tab navigation
- Paginated translation history

## Running
- `npm run dev` starts Express + Vite dev server on port 5000
- `npm run db:push` syncs database schema
