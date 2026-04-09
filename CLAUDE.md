# RUCLO the fashion stylisy

## What is RUCLO?

India's first **fit-first fashion platform**. The core loop:
1. User uploads 3 photos (front, side, face) + height
2. AI estimates body measurements
3. Platform matches user to hand-measured garments
4. Shows personalized styled outfits with fit explanations + virtual try-on

**Target:** <10% return rate (vs 40% industry average). 75% sell-through within 3 months.

**Launch:** June 6, 2026 (15-week timeline, currently Week 3 as of Feb 15, 2026).

**This is a real product shipping to real users.** Not a prototype. Build accordingly.

---

## Architecture: Shopify + Vercel (Hybrid)

### Why Hybrid?
Shopify (with Etheryx theme at $350) handles: browse, editorial, cart, checkout, customer accounts, payments (Razorpay for India), inventory, shipping. It looks premium out of the box.

Next.js on Vercel handles: onboarding flow, AI stylist page — the custom experiences that make RUCLO unique.

Users navigate between the two seamlessly. When clicking "Stylist" in Shopify nav, they redirect to our Next.js app. Nav and footer are replicated in Next.js to maintain visual continuity.

### Decision Log
- **Why not Hydrogen?** Etheryx gives 80% of a premium store for free. Rebuilding in Hydrogen would take 3-4 weeks for commodity pages. For MDP, hybrid wins.
- **Why not iframe?** Mobile performance issues, scroll jank, no SEO, no deep linking.
- **Migration plan:** If RUCLO scales and needs more custom pages (virtual try-on room, AI chat), migrate to Hydrogen. Next.js components port to Remix easily.

---

## Tech Stack (Actual Versions)

| Layer | Tool | Version |
|-------|------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| React | React | 19.2.3 |
| Animations | Framer Motion | ^12.34.0 |
| Gestures | React Swipeable | ^7.0.2 |
| Styling | Tailwind CSS (PostCSS plugin) | ^4 |
| E-commerce | Shopify (Storefront API + Admin API) | 2024-01 |
| Hosting | Vercel | - |
| Domain | ruclo.com | - |
| Store | ruclo-4262.myshopify.com | - |

---

## Environment Variables

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=ruclo-4262.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=<storefront-token>
SHOPIFY_CLIENT_ID=<dev-dashboard-client-id>
SHOPIFY_CLIENT_SECRET=<dev-dashboard-client-secret>
HMAC_SECRET=<random-64-char-hex>
JWT_SECRET=<random-64-char-hex>
```

Admin API uses client credentials grant (token auto-refreshes every 24h via `src/lib/shopify-admin.js`).
`SHOPIFY_CLIENT_SECRET`, `HMAC_SECRET`, `JWT_SECRET` are server-only. NEVER expose in client code or `NEXT_PUBLIC_` vars.

---

## File Structure (Every File, What It Does)

```
/src/
├── /app/
│   ├── page.js                              # Root — redirects to /onboarding
│   ├── layout.js                            # Root layout (Geist fonts, metadata)
│   ├── globals.css                          # Tailwind 4 import + CSS vars
│   │
│   ├── /onboarding/
│   │   ├── layout.js                        # AnimatePresence page transitions
│   │   ├── page.js                          # Welcome: RUCLO logo (SVG) + "Your personal AI stylist" + "Begin"
│   │   ├── /upload/page.js                  # 3 photo cards + height dropdown → saves to sessionStorage
│   │   ├── /processing/page.js              # Diamond path image animation + progress bar + word-by-word reveal
│   │   ├── /signup/page.js                  # Redirects to Shopify signup (BROKEN — see Known Bugs)
│   │   └── /complete/page.js                # Saves measurements + redirects to /stylist (NOT WIRED — see Known Bugs)
│   │
│   ├── /stylist/page.js                     # Main page: swipeable product cards, fit badges, "Why this fits" modal
│   │
│   └── /api/
│       ├── /products/route.js               # GET: Fetch product images from Shopify Storefront API
│       ├── /add-to-cart/route.js             # POST: Create Shopify cart + add variant (not used in UI yet)
│       ├── /get-measurements/route.js        # GET: Fetch customer metafield measurements (Admin API)
│       └── /save-measurements/route.js       # POST: Save measurements to customer metafield (Admin API)
│
└── /components/
    ├── Navigation.js                         # Desktop + mobile nav (replicates Shopify nav)
    └── Footer.js                             # Links + newsletter + copyright
```

### Deleted Files (Don't Recreate)
- `/onboarding/instructions/page.js` — merged into upload page
- `/onboarding/reveal/page.js` — merged into processing page

---

## Onboarding Flow (4 Screens)

```
Welcome → Upload → Processing → Signup → Complete → Stylist
```

### Screen 1: Welcome (`/onboarding/page.js`)
- RUCLO SVG logo (custom paths, not text)
- "Your personal AI stylist" tagline
- "Begin" button → navigates to /onboarding/upload
- Status: **DONE**

### Screen 2: Upload (`/onboarding/upload/page.js`)
- "Upload 3 photos" heading + "To understand your body shape"
- 3 cards: Front View, Side Profile, Face Photo
- Each card shows "+" (gray) → "Added" (black) on upload
- Cards use file input with `capture="environment"` for back camera (face uses `capture="user"`)
- Height dropdown: "Height: Select" with underline-only style, 120px width
- "Continue" button (disabled until all 3 + height complete)
- Photos saved as base64 data URLs to `sessionStorage`
- Status: **DONE** (photos stored client-side only, no cloud upload yet)

### Screen 3: Processing (`/onboarding/processing/page.js`)
- Fetches product images from `/api/products`, multiplies to 50 for visual effect
- Images animate in a diamond path (caterpillar trail) using Framer Motion
- Progress bar: thin 1px black line filling over ~10 seconds
- "Analyzing your style..." text
- On complete: images fade, word-by-word reveal: "Your stylist has curated some clothes for you"
- "View" button appears → navigates to /onboarding/signup
- Status: **DONE** (animation is mock — no actual AI processing happens)

### Screen 4: Signup (`/onboarding/signup/page.js`)
- "Create your account" heading
- "Continue" button redirects to `https://ruclo-4262.myshopify.com/account/register`
- Attempts `checkout_url` parameter for return redirect
- Status: **BROKEN** — Shopify's new Customer Accounts (OTP-based) ignores `return_url` and redirects to `/account/orders` instead. See "Auth Architecture" below.

### Screen 5: Complete (`/onboarding/complete/page.js`)
- Intended to: read localStorage measurements, save to Shopify via API, redirect to /stylist
- Currently: reads localStorage, does NOT call save-measurements API (commented out), redirects to /stylist
- Status: **NOT WIRED** — needs auth solution first

---

## Stylist Page (`/stylist/page.js`)

The main experience. Swipeable product cards with personalization.

### What Works:
- Fetches products from `/api/products`
- Swipeable carousel with Framer Motion `drag="x"` + `onDragEnd`
- Left/right arrow navigation (`<` / `>` symbols, small and elegant)
- Product image (aspect-ratio 3:4, 6px border radius)
- Caption below image
- "Add to bag" button (currently redirects to Shopify cart page)
- "Why this fits" bottom sheet modal with fit reasons + "Try This On Me" button
- Navigation + Footer components
- Responsive (mobile + desktop)

### What's Broken:
1. **`checkFitMatch()` is called but never defined** — will crash. Needs to be implemented or replaced with mock.
2. **`hasOnboarded` is referenced but never declared** — will crash. Was supposed to check localStorage/API.
3. **Products are mock data** — only image URLs from Shopify, titles/prices/captions are hardcoded placeholders.
4. **"Add to bag" redirects to Shopify cart** — doesn't use the cart API route. No variant IDs available.
5. **"Try This On Me" does nothing** — just logs to console. Virtual try-on API is Week 8.
6. **Badge logic** — `styledForYou` is hardcoded (`i % 2 === 0`), not based on actual fit matching.

### What Needs to Happen:
1. Define `hasOnboarded` state (check localStorage or API)
2. Define `checkFitMatch()` function (mock for now, real in Week 6)
3. Fetch full product data (title, price, variant IDs) from Shopify
4. Wire "Add to bag" to cart API with actual variant IDs
5. Wire fit badge logic to real measurement comparison

---

## Authentication Architecture (BUILT AND WORKING)

### The Problem
Shopify uses "new Customer Accounts" (OTP-based, hosted at `shopify.com/authentication`). These accounts:
- Don't respect `return_url` parameters
- Always redirect to `shop.myshopify.com/account/orders` after login
- Can't be customized with redirect logic from Shopify admin

### The Solution (Implemented)

**Shopify Liquid → Our API → JWT → Stylist Page**

1. **Shopify nav link** for "Stylist" points to our Next.js API route:
   ```
   https://your-vercel-domain.com/api/auth/verify?cid={{ customer.id }}&email={{ customer.email }}&hmac={{ generated_hmac }}
   ```

2. **`/api/auth/verify` route** (TO BE BUILT):
   - Receives `cid`, `email`, `hmac` from URL params
   - Verifies HMAC using a shared secret (prevents URL tampering)
   - Calls Shopify Admin API to verify customer exists
   - Creates signed JWT with customer ID + email
   - Sets JWT as `httpOnly` cookie
   - Redirects to `/stylist`

3. **Stylist page** reads JWT cookie to get customer ID, fetches measurements from `/api/get-measurements`

### HMAC Implementation Details
- Shared secret stored as env var (e.g., `HMAC_SECRET`)
- HMAC-SHA256 of `cid:email` using the secret
- Shopify Liquid generates HMAC using Shopify's `hmac` filter or a ScriptTag
- Our API verifies it server-side

### For Non-Logged-In Users
- Stylist page works without auth (shows random products, no fit badges)
- "Unlock Personalization" button visible → navigates to /onboarding
- Onboarding stores photos/height in sessionStorage
- After onboarding → prompt to sign up on Shopify → then redirect back

### Files (All Built):
- `src/lib/shopify-admin.js` — Shared Admin API utility (client credentials grant, token caching)
- `src/app/api/auth/verify/route.js` — HMAC verification + Shopify verify + JWT creation + cookie
- `src/app/api/auth/me/route.js` — Read JWT cookie, return customer data
- `src/app/api/auth/logout/route.js` — Clear cookie, redirect to Shopify
- Uses `jose` library for JWT sign/verify
- Shopify Liquid snippet needed in theme nav (see below in this doc)

---

## Known Bugs (Prioritized)

### Critical (App Will Crash)
1. **`stylist/page.js` line 45**: `checkFitMatch(currentProduct)` — function doesn't exist. Will throw ReferenceError.
2. **`stylist/page.js` lines 145, 205, 224, 240**: `hasOnboarded` — variable never declared. Will throw ReferenceError.

### High (Feature Not Working)
3. **Signup redirect broken**: Shopify ignores return_url, sends user to /account/orders instead of back to our app.
4. **`complete/page.js`**: Save-measurements API call is commented out. Measurements never persist to Shopify.
5. **Products are mock**: Stylist page shows hardcoded titles/prices/captions, not real Shopify product data.

### Medium (Incomplete)
6. **Cart API not wired**: "Add to bag" button redirects to Shopify cart page instead of using cart API. No variant IDs.
7. **Processing page generates no real measurements**: Just shows animation, no AI API call.
8. **Root layout metadata**: Still says "Create Next App" — should be "RUCLO".

### Low (Polish)
9. **`globals.css` has dark mode**: Lines 15-20 set dark background. RUCLO is always white. Remove dark mode.
10. **Root layout uses Geist fonts**: But everything uses Helvetica Neue via inline styles. Geist import is unnecessary weight.
11. **Navigation "Cart 2"**: Hardcoded cart count. Should be dynamic or removed.
12. **Footer "Powered by Shopify"**: May want to remove for brand reasons.

---

## Design System — NON-NEGOTIABLE RULES

This is a luxury fashion brand. Every pixel matters.

### Typography
- Font: **`Helvetica Neue, Helvetica, Arial, sans-serif`** — everywhere, always
- Apply via: `style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}`
- Weights: 300 (light/body), 400 (normal/headers), 500 (emphasis, rare)
- Never bold unless intentional editorial choice
- Sizes: text-4xl/5xl (hero), text-sm/base (body), text-xs (buttons/labels uppercase)

### Colors
```
Background:     #FFFFFF (always white, no dark mode)
Primary text:   #000000
Secondary text: #1F2937 (gray-800) — never gray-600 for readable text
Borders:        #E5E7EB (gray-200), hover → #000000
Accent:         #007AFF (iMessage blue) — ONLY for "Styled for you" badges
```
Never: bright colors, gradients, colored backgrounds, emojis in UI

### Buttons
- Primary: `bg-black text-white`, hover `bg-gray-900`
- Secondary: `border border-gray-200 text-black`, hover `border-black`
- Border radius: **25px** for buttons (rounded, not pill)
- Border radius: **6px** for cards/containers
- Padding: `px-12 py-4`
- Font: `text-xs uppercase`
- Transition: `duration-500` (slow = premium)

### Animations (Framer Motion)
- Premium easing: `[0.16, 1, 0.3, 1]` (Apple-style cubic bezier)
- Page enters: opacity 0→1, y 20→0, duration 400-600ms
- Hover: scale 1→1.02, duration 300ms
- Use `AnimatePresence` for mount/unmount
- Use `layoutId` for shared element transitions
- Never: instant transitions, bouncy animations, flashy effects

### Mobile-First
- Design for 320px+ first, then scale up
- No scrolling on key screens (welcome, upload must fit viewport)
- Touch targets: minimum 44x44px
- All grids work on mobile

### Aesthetic References
Study these: Ssense, Acne Studios, Highsnobiety, Farfetch, Apple product pages
**DO:** Understated, slow, whitespace-heavy, editorial, minimal
**DON'T:** Loud, bright, emoji, fast, cluttered, drop shadows

---

## Shopify Integration Patterns

### Storefront API (public, for product data + cart)
```javascript
const response = await fetch(
  `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  }
)
```

### Admin API (server-only, for customer data + metafields)
Uses client credentials grant. All Admin API calls go through the shared utility:
```javascript
import { shopifyAdminQuery } from '@/lib/shopify-admin'

const data = await shopifyAdminQuery(
  `query { products(first: 3) { edges { node { id title } } } }`
)
```
Token is cached in memory, auto-refreshes before 24h expiry.
```

### Measurements Metafield
- Namespace: `custom`, Key: `measurements`, Type: `json`
- Stored on customer object via Admin API
- Schema:
```json
{
  "height": "5'8\"",
  "chest": 38,
  "waist": 32,
  "hips": 40,
  "inseam": 30,
  "shoulder": 17,
  "photoAnalyzed": true,
  "analyzedAt": "2026-02-15T00:00:00Z"
}
```

### Product Garment Measurements (Future)
```json
{
  "size": "M",
  "chest": { "min": 36, "max": 40 },
  "waist": { "min": 30, "max": 34 },
  "length": 28,
  "shoulder": { "min": 16, "max": 18 },
  "fitType": "slim",
  "category": "shirt"
}
```

---

## API Route Conventions

```javascript
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const param = searchParams.get('param')

    if (!param) {
      return NextResponse.json({ success: false, error: 'param required' }, { status: 400 })
    }

    const data = await doWork(param)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[route-name]', error)
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}
```

Always: return `{ success, data/error }`, catch errors, log server-side, return generic messages client-side.

---

## What's Done vs What's Next

### Done
- Onboarding UI (4 screens: welcome → upload → processing → signup/complete)
- Stylist page UI (swipeable cards, fit badges, "Why this fits" modal)
- Auth flow: HMAC verify → Shopify Admin verify → JWT cookie (working)
- Admin API: Client credentials grant with auto-refresh (`src/lib/shopify-admin.js`)
- API routes: products, cart, measurements get/save, auth verify/me/logout
- Navigation + Footer components
- "Unlock Personalization" → sign-in dialog for non-logged-in users

### Not Done (see `docs/TODO.md` for full list)
- Liquid HMAC snippet in Shopify theme nav (manual step)
- Customer Account API OAuth (for direct visitors)
- Full product data (titles/prices/variants are mock)
- Measurement persistence (save-measurements API not wired)
- AI measurement API, fit matching, virtual try-on

---

## Problem-Solving Framework

### Before Proposing ANY Solution:
1. **Map what already exists** — What data, tools, APIs are available in the current setup?
2. **Start from simplest** — Fewest moving parts first
3. **Think hybrid** — Shopify Liquid has access to `customer`, `cart`, `shop` objects. The theme is a tool, not just a visual layer.
4. **Check platform-native** — Metafields, ScriptTags, App Proxy before building custom
5. **Then escalate** — Only go to OAuth, external services if simple path truly won't work
6. **Compare 3+ approaches** — Always. Table format. Trade-offs explicit.

### Mistakes to Avoid:
- **Headless tunnel vision** — Don't forget Liquid templates bridge Shopify and custom frontend trivially
- **Over-engineering** — MDP = simplest robust solution, not architecturally pure
- **Defaulting to textbook** — This hybrid setup is unique, solutions should fit THIS project

---

## Coding Conventions

### Component Structure
```javascript
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function PageName() {
  // State
  // Effects
  // Handlers
  // Render
}
```

### Framer Motion Page Wrapper
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>
```

### Styling
- Tailwind first, inline styles only for `fontFamily` and Framer Motion
- `style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}` on every text element
- Never bright colors, never heavy shadows

### State
- Session data: `sessionStorage` (photos, height during onboarding)
- Persisted data: Shopify customer metafields (measurements)
- Auth: `httpOnly` JWT cookie (`ruclo_session`)
- No Redux/Zustand — useState + sessionStorage is enough

---

## RUCLO Logo SVG

The logo is a custom SVG (not a font). Used in Welcome page and Navigation. Here it is for reference:

```svg
<svg width="200" height="57" viewBox="0 0 700 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 30V170M20 30H90C110.987 30 128 47.0132 128 68C128 88.9868 110.987 106 90 106H20M20 106L100 170" stroke="#1A1A1A" strokeWidth="50" strokeLinecap="square" strokeLinejoin="miter"/>
  <path d="M168 30V110C168 138.167 190.833 161 219 161C247.167 161 270 138.167 270 110V30" stroke="#1A1A1A" strokeWidth="50" strokeLinecap="square"/>
  <path d="M370 68C370 47.0132 352.987 30 332 30C311.013 30 294 47.0132 294 68V132C294 152.987 311.013 170 332 170C352.987 170 370 152.987 370 132" stroke="#1A1A1A" strokeWidth="50" strokeLinecap="square"/>
  <path d="M410 30V170H500" stroke="#1A1A1A" strokeWidth="50" strokeLinecap="square"/>
  <circle cx="580" cy="100" r="75" fill="#1A1A1A"/>
  <circle cx="580" cy="100" r="40" fill="#FEFEFE"/>
</svg>
```

Smaller version for nav: width="80" height="23" (desktop), width="60" height="17" (mobile).

---

## Behavioral Rules for AI Assistant

### Role
You are RC's AI cofounder — COO, CPO, CTO. Not an assistant. A true cofounder who challenges, thinks independently, and helps build this business.

### Core Rules
1. **Never start building without permission** — Present options, explain trade-offs, wait for "yes, build it"
2. **Always look for the simplest, best solution first**
3. **Direct communication** — No sugarcoating, no "Great question!", disagree when you disagree
4. **Clarify, don't assume** — Ask 2-3 questions before building the wrong thing
5. **Think MDP** — Minimal Delightful Product, not MVP. It should be good enough for a team to take over.

### Think About:
- **Revenue:** Will this help hit 75% sell-through?
- **Returns:** Does this reduce the 40% → 10% return rate?
- **UX:** Is this actually better for users?
- **Timeline:** Can we ship by June 6?
- **Simplicity:** Is this the simplest robust solution?

---

## 15-Week Timeline

| Week | Focus | Status |
|------|-------|--------|
| 1 | Shopify + Etheryx Setup | Done |
| 2 | Learn React/Next.js | Done |
| 3 | Onboarding UI + Stylist UI | In Progress (UI done, wiring not) |
| 4 | AI Measurement API Research + Integration | Next |
| 5 | Photo Storage + Save Measurements | Upcoming |
| 6 | Fit Matching Algorithm | Upcoming |
| 7 | Stylist Enhancements | Upcoming |
| 8 | Virtual Try-On API | Upcoming |
| 9 | "Why This Fits" + Education | Upcoming |
| 10 | Browse + Product Pages | Upcoming |
| 11 | Content Creation (50 products, 25 looks) | Upcoming |
| 12 | Integration + Polish | Upcoming |
| 13 | Edge Case Testing | Upcoming |
| 14 | Internal User Testing (20 friends) | Upcoming |
| 15 | Final Fixes + PUBLIC LAUNCH June 6 | Launch |

### Emergency Cuts (If Behind by Week 10)
- Virtual try-on → Remove "Try This On Me"
- Educational overlays → Remove "Why this fits"
- Editorial → Launch with 1-2 articles
- Products → 25 instead of 50

### Keep No Matter What:
- Photo-based measurement onboarding
- Fit matching algorithm
- Stylist swiper with badges
- Basic product pages with fit info

---

## Do Not
- Add comments unless logic is non-obvious
- Use bold font-weight without editorial intent
- Add colored backgrounds (keep everything white)
- Use `console.log` in production code
- Expose Admin API tokens in client components
- Add features not explicitly asked for
- Use emojis anywhere in the UI
- Make buttons with any radius other than 25px (buttons) or 6px (cards)
- Use fast animations (<300ms) — slow = premium
- Use gray-600 for important text — always gray-800 minimum

---

**Last Updated:** Feb 15, 2026
**Your Role:** AI Cofounder (COO, CPO, CTO)
**Store:** ruclo-4262.myshopify.com
**Hosting:** Vercel
**Domain:** ruclo.com
