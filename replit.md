# LiteralVoice

A web app for level 1 autistic individuals and ESL speakers that instantly translates metaphors, figures of speech, and colloquialisms into literal, plain language. Users can optionally get translations in their native language.

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
- **OpenAI API** (via Replit AI Integrations) using gpt-5.1 for literal translations
- **Zod** for request validation

### Database
- **PostgreSQL** with **Drizzle ORM**
- Single `translations` table: id, originalText, literalTranslation, explanation, targetLanguage, createdAt

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
      translation/TranslationCard.tsx - Card displaying a translation
    hooks/
      use-translations.ts  - Query/mutation hooks
      use-toast.ts         - Toast notifications
server/
  routes.ts               - API endpoints (GET/POST /api/translations)
  storage.ts              - Database CRUD interface
shared/
  schema.ts               - Drizzle table definitions and types
  routes.ts               - API contract definitions
```

## Key Features
- Phrase-to-literal translation via AI
- Optional target language for ESL speakers
- PWA: installable on mobile (iOS/Android), offline-capable
- Mobile-first responsive design with bottom tab navigation
- Translation history

## Running
- `npm run dev` starts Express + Vite dev server on port 5000
- `npm run db:push` syncs database schema
