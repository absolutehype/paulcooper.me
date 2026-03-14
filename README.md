# paulcooper.me

My personal website — a short bio and some technical experiments 🔬

Feel free to open an issue with any thoughts or feedback.

---

## Stack

| Concern | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind + CSS |
| Animation | [Motion](https://motion.dev/) (Framer Motion) |
| i18n | [next-intl ](https://next-intl.dev/) |
| Fonts | Cormorant Garamond via Google Fonts |
| Analytics | Vercel Analytics + Speed Insights |
| Hosting | [Vercel](https://vercel.com/) |
| Build | Turbopack (`next dev --turbopack`) |

---

## Architecture

### App Router & locale routing

The app uses Next.js App Router with a `[locale]` dynamic segment at the root of every route. `next-intl` handles locale detection via middleware, with `localePrefixMode: "as-needed"` — English is served at `/`, French at `/fr`, Spanish at `/es`.

```
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx          # Root layout — providers, PageLoader, Analytics
│       ├── page.tsx            # Home page
│       ├── not-found.tsx       # Localised 404
│       └── [...notFound]/
│           └── page.tsx        # Catch-all → renders not-found
├── components/
│   └── PageLoader.tsx          # Page transition loader with locale-aware flag animation
├── i18n/
│   ├── routing.ts              # next-intl locale config (en / fr / es)
│   └── request.ts              # Per-request message loading
└── proxy.ts                    # next-intl middleware (locale detection & rewriting)

messages/
├── en.json
├── fr.json
└── es.json
```

### Internationalisation

Three supported locales — `en` (default), `fr`, `es`. Translation messages are loaded dynamically per request in `src/i18n/request.ts` and injected via `NextIntlClientProvider` in the root layout. Rich text tokens (e.g. `<location>`, `<company>`) are resolved to React elements inside page components.

### PageLoader

`src/components/PageLoader.tsx` is a client component that renders a full-screen overlay during page transitions. It runs a three-phase state machine:

1. **spinner** — animated arc indicator shown on initial load and client-side navigations
2. **flag** — circular flag for the destination locale (Union Jack / French tricolour / Spanish flag), shown only when switching locales
3. **idle** — overlay unmounts

Because switching locale causes the entire `[locale]` layout to **remount** (a different dynamic segment), a module-level variable (`prevLocaleGlobal`) is used to track the previous locale across React remounts. This is StrictMode-safe: cleanup restores the saved value so the double-invocation sees consistent state.

The spinner rotation uses a CSS `@keyframes` animation rather than a Framer Motion `animate` prop — this avoids a hydration issue where `AnimatePresence initial={false}` causes descendant `motion` elements to start at their `animate` value, making the infinite rotation a no-op on first paint.

### Theming

Light and dark mode are handled entirely via CSS custom properties, toggled by `prefers-color-scheme`:

```css
:root {
  --colour-bg: #f2f3f4;
  --colour-text-primary: #243849;
}

@media (prefers-color-scheme: dark) {
  --colour-bg: #14161b;
  --colour-text-primary: #fff;
}
```

All components reference these variables directly, including SVG fills in the flag renderer. No JavaScript theme toggling or class switching.

### View transitions

`@view-transition { navigation: auto; }` is set in `globals.css`, enabling native browser cross-document view transitions for same-origin navigations where supported.

---

## Running locally

```bash
npm install
npm run dev
```

The dev server starts on [http://localhost:3000](http://localhost:3000) with Turbopack enabled.

```bash
npm run build   # production build
npm run start   # serve production build locally
npm run lint    # ESLint
```

---

## Deployment

The site deploys automatically to Vercel on push. `vercel.json` sets `cleanUrls: true` and injects `ON_VERCEL=true` at build time.

No environment variables are required to run the project locally.
