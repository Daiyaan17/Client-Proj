# Venus Electrical Trading Co: Build and Deploy Instructions

You are building the storefront for **Venus Electrical Trading Co**, New No.305 / Old No.147, Thambu Chetty St, opp. Karnataka Bank, Chennai, Tamil Nadu 600001.

Read this whole file first. Then read `GEMINI_CHATBOT.md` before touching the chatbot.

## 1. Goal

A fast ecommerce site for an electrical supplies shop, built on the Vercel template
`https://vercel.com/templates/remix/ecommerce-crystalize-remix`
(source: `https://github.com/CrystallizeAPI/furniture-remix`, demo: `https://furniture.superfast.store/`).

The **main feature is the chat assistant in the bottom-right corner**, powered by Gemini. Everything else supports it.

The visual reference is `venus-electrical.html` (provided). Match its layout, colors, fonts and chat widget behaviour.

## 2. Rules for you (the agent)

1. Work in small steps. After each numbered step in section 4, run the app and confirm it works before continuing.
2. Never put the Gemini API key in client code, in git, or in a `VITE_`/`PUBLIC_` variable. See `GEMINI_CHATBOT.md`.
3. Do not invent prices, stock levels, phone numbers or opening hours. Use placeholders clearly marked `TODO` until the owner supplies real data.
4. Check the real repo before assuming file names. The paths below (`app/root.tsx`, `app/routes/...`) are the usual Remix layout, but confirm them.
5. Keep the template's Crystallize integration working. Replace the demo furniture data, do not rip out the data layer.
6. Ask the owner when blocked, instead of guessing.

## 3. Things you need from the owner

| Item | Why | Placeholder until supplied |
|---|---|---|
| Crystallize tenant identifier and API credentials | Product catalog | Use the template's demo tenant in dev |
| Gemini API key | Chatbot | Chatbot falls back to canned replies |
| Shop phone / WhatsApp number | Contact buttons | `TODO_PHONE` |
| Opening hours | Footer and chatbot answers | omit |
| Real product list, prices, photos | Catalog | sample data from the design |
| Domain name (optional) | Vercel custom domain | `*.vercel.app` |
| Payment plan (online payments, or enquiry/WhatsApp order only) | Checkout scope | Enquiry/WhatsApp order, no payments |

## 4. Steps

### Step 1: Scaffold the project

```bash
npx @crystallize/cli-next@latest install remix-run
cd remix-run
npm install
npm run dev
```

The template dev server runs on port 3018 over HTTP. Docker (Redis, Mailcatcher) and the Caddy HTTPS proxy are optional (`make serve`). Skip them at first.

Initialize git, create a GitHub repo, push. Vercel deploys from GitHub.

### Step 2: Environment variables

Copy the template's example env file to `.env` (check what the repo ships, for example `.env.example`). Keep all existing Crystallize variables as the template defines them. Add:

```
GEMINI_API_KEY=
GEMINI_MODEL=
```

Make sure `.env` is in `.gitignore`. Commit an `.env.example` with empty values.

### Step 3: Branding

- Site name: Venus Electrical Trading Co
- Colors (CSS variables, from the design): ink `#142036`, conduit blue `#1C3FAA`, safety yellow `#FFC400`, copper `#B5652B`, background `#F2F4F7`. Dark mode values are in the HTML file.
- Fonts: Archivo (headings, condensed width) and IBM Plex Sans (body), loaded from Google Fonts.
- Replace logo, page titles, meta description, favicon.
- Footer and "Visit us" block: use the address above. Add a Google Maps link.

### Step 4: Port the design

Recreate the sections of `venus-electrical.html` as Remix components:

- Header: logo, search, cart count
- Hero with "Ask Venus Assistant" prompt cards (each opens the chat widget and sends that question)
- Category tiles (Wires and cables, Switches and sockets, MCBs and distribution boards, Lighting, Fans and coolers, Motors and pumps)
- Product grid
- Visit the shop block
- Footer

Use the template's existing product, cart and category routes. Only restyle them. Do not rewrite routing.

### Step 5: Catalog

Model the shop's products in Crystallize: category, name, spec (for example "FR 2.5 mm²"), brand, price in INR, image, stock flag. Add a small export (`app/data/catalog.server.ts`) that the chatbot can search. Details are in `GEMINI_CHATBOT.md`, section 6.

Currency must display as ₹ (INR). Check the template's currency and locale settings.

### Step 6: Chat widget

Build `app/components/ChatWidget.tsx`, mounted once in `app/root.tsx` so it appears on every page.

Behaviour, matching the HTML design:

- Round yellow button, fixed bottom-right. Opens a panel (380px wide on desktop, full screen on phones).
- Greeting message and 3 quick-reply chips on first open.
- Opens automatically once on desktop first load, not on mobile.
- Typing indicator while waiting for the reply.
- Sends the full message history to `POST /api/chat` and renders `{ "reply": string }`.
- On any error, shows a plain message: "I couldn't reach the assistant. You can call us or visit the shop." Never show raw errors.
- Keyboard accessible, visible focus, `aria-live` on the message log, respects `prefers-reduced-motion`.
- Exposes a way for other components to open it with a prefilled question (a small context or custom event).

### Step 7: Backend route

Create `app/routes/api.chat.ts` as a Remix resource route (an `action` that accepts POST). It calls Gemini server-side. Follow `GEMINI_CHATBOT.md` exactly.

### Step 8: Orders (keep it simple)

Unless the owner asks for online payments, checkout is **enquiry-based**: the cart produces a prefilled WhatsApp message to the shop number (`https://wa.me/<number>?text=<encoded cart summary>`). Do not build payment processing without explicit approval.

### Step 9: Test locally

- [ ] Home page matches the design on desktop and a 375px phone
- [ ] Product pages and cart still work
- [ ] Chat opens, replies, handles errors
- [ ] Chat works with the API key removed (falls back gracefully)
- [ ] `npm run build` passes with no type errors
- [ ] No secrets in `git log` or in the browser network tab

## 5. Deploy to Vercel

1. Push the repo to GitHub.
2. In Vercel, **Add New > Project**, import the repo. Vercel detects Remix. Keep the default build settings unless the build fails.
3. Add environment variables under **Project Settings > Environment Variables**, for Production **and** Preview: every Crystallize variable from `.env`, plus `GEMINI_API_KEY` and `GEMINI_MODEL`. Mark `GEMINI_API_KEY` as sensitive.
4. Deploy. Open the preview URL and run the Step 9 checklist again on the live site.
5. Check the template's Vercel configuration. If the build fails on a server adapter or runtime (the repo may use its own server entry), read the build log and follow Vercel's current Remix guidance at `https://vercel.com/docs/frameworks/remix`. Do not guess. If the template depends on Redis, either provision one (Vercel Marketplace or Upstash) and set its variables, or disable that caching path.
6. Optional custom domain: **Settings > Domains**, add the domain, then set the DNS records Vercel shows.
7. After any env var change, redeploy. Existing deployments do not pick up new values.

### Function limits

The chat route is a serverless function. Keep it fast: stream or return within a few seconds, cap output tokens, and set `export const config = { maxDuration: 30 }` only if the repo's Vercel setup supports it (verify in the docs above).

## 6. Definition of done

- Live Vercel URL works, HTTPS on
- Chatbot answers questions about products and the shop, and never exposes the API key
- Home page and catalog show real shop info (address correct, placeholders listed to the owner)
- `README.md` updated: how to run locally, env vars, how to deploy, how to rotate the Gemini key
- A short hand-off note listing every `TODO` that still needs owner input
