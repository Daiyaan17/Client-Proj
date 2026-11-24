# Vercel Deployment & Production Guide

This guide walks you step-by-step through deploying **Venus Electrical Trading Co** and the **Gemini Chatbot** to [Vercel](https://vercel.com), managing secrets, and configuring production settings.

---

## 1. Architecture Overview

```
Client Browser (Next.js App)
    │
    ├──> User visits Storefront (SSG / Client-Side Navigation)
    │
    ├──> User clicks "Add to Cart" -> builds order quote in state / local storage
    │    └──> "Send Enquiry on WhatsApp" -> sends formatted bill directly to shop owner
    │
    └──> Chatbot Widget (POST /api/chat)
            │
            ├──> Runs serverless function on Vercel (`src/app/api/chat/route.ts`)
            ├──> Reads GEMINI_API_KEY from Vercel Environment Variables (never leaks to client)
            ├──> Grounds user prompt with shop catalog (`src/lib/catalog.ts`)
            └──> Calls Google Gemini API (`@google/genai`) or graceful fallback mode
```

---

## 2. Prerequisites Before Deployment

1. **GitHub Account**: Push this code repository to GitHub (or GitLab/Bitbucket).
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub account.
3. **Google AI Studio API Key**:
   - Visit [Google AI Studio](https://aistudio.google.com/apikey).
   - Sign in with the shop or company Google Account.
   - Click **Create API key** and copy it.

---

## 3. Step-by-Step Vercel Deployment

### Step A: Push Code to GitHub

Open your terminal in the project directory:

```bash
git init
git add .
git commit -m "feat: initial store template with Gemini chatbot and WhatsApp checkout"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

### Step B: Import Project in Vercel

1. Log in to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** -> **"Project"**.
3. Under **Import Git Repository**, find your repository and click **Import**.
4. Vercel will automatically detect **Next.js**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (or Next.js default)
   - **Output Directory**: `.next` (Next.js default)

### Step C: Configure Environment Variables

Before clicking Deploy, expand the **Environment Variables** section and add:

| Variable Name | Example Value | Description |
|---|---|---|
| `GEMINI_API_KEY` | `AIzaSy...` | Your secret API key from Google AI Studio (mark as **Sensitive**) |
| `GEMINI_MODEL` | `gemini-2.5-flash` | The fast, cost-effective Gemini model |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `919840000000` | Shop WhatsApp number in international format without `+` or spaces |

> [!IMPORTANT]
> - Apply these variables to both **Production** and **Preview** environments in Vercel.
> - Never prefix `GEMINI_API_KEY` with `NEXT_PUBLIC_`, otherwise it will be bundled into the client's browser JavaScript.

### Step D: Click Deploy

Click **Deploy**. Vercel will build the project and provide you with a live URL:
`https://<your-project>.vercel.app`

---

## 4. Key Things You Must Take Care Of

### 1. API Key Security & Leaks
- **Never commit `.env` or `.env.local` to Git.** Verify that `.env*` is in `.gitignore`.
- If an API key is accidentally exposed, revoke it immediately at [Google AI Studio](https://aistudio.google.com/apikey) and generate a new one.

### 2. Abuse, Spam & Cost Protection
A public chatbot can be abused by automated bots if unprotected:
- **Input Truncation**: The code already limits chat histories to the last 12 messages and truncates each message to 1,000 characters.
- **Token Limits**: `maxOutputTokens: 400` ensures Gemini does not generate run-away responses.
- **Budget Alerts**: Go to [Google Cloud Billing](https://console.cloud.google.com/billing) and configure a budget alert (e.g. \$10 or ₹500) so you are notified if usage spikes unexpectedly.
- **Vercel Web Analytics & Firewall**: Enable Vercel Firewall / Rate Limiting in **Project Settings > Security** to prevent bot flooding.

### 3. Electrical Advice & Liability Safety
- The system prompt in `src/lib/systemPrompt.ts` instructs Gemini to provide standard rule-of-thumb sizes (e.g., 2.5 mm² for AC) but **always** reminds the customer that a licensed electrician must physically verify the load and wiring before installation.
- Gemini is barred from giving instructions on working with live main power circuits.

### 4. Custom Domain Setup
When ready to connect a real domain (e.g. `www.venuselectrical.com`):
1. In Vercel, go to **Settings > Domains**.
2. Type your domain name and click **Add**.
3. Add the `CNAME` or `A` records provided by Vercel into your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.).
4. SSL certificates are provisioned and renewed automatically by Vercel at zero cost.

---

## 5. Local Testing & Maintenance

- Run development server:
  ```bash
  npm run dev
  ```
- Build production bundle locally:
  ```bash
  npm run build
  ```
- To update product items or prices, edit `src/lib/catalog.ts`.
