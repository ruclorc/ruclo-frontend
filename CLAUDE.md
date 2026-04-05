# RUCLO Frontend — Developer Guide

## Knowledge base — `.claude/rules/`

Deeper context lives in these files. Read the relevant one before starting work in that area:

| File | When to read |
|------|-------------|
| [`.claude/rules/project-brief.md`](.claude/rules/project-brief.md) | Core value prop, goals, metrics, platform structure |
| [`.claude/rules/design-system.md`](.claude/rules/design-system.md) | **Before ANY UI work.** Typography, colors, buttons, motion, Etheryx aesthetic |
| [`.claude/rules/tech-stack.md`](.claude/rules/tech-stack.md) | Architecture, file structure, dependencies |
| [`.claude/rules/coding-standards.md`](.claude/rules/coding-standards.md) | React/Next patterns, styling, Framer Motion, forms |
| [`.claude/rules/timeline.md`](.claude/rules/timeline.md) | 15-week plan, current week focus, launch June 6 2026 |
| [`.claude/rules/ai-assistant-role.md`](.claude/rules/ai-assistant-role.md) | How you should collaborate — direct, no-BS, when to push back |
| [`.claude/rules/INDEX.md`](.claude/rules/INDEX.md) | Quick design reference + navigation |

The rules below in this file are the distilled non-negotiables. The `.claude/rules/` files have the full context.

---

## What is RUCLO?

India's first **fit-first fashion platform**. The core loop:
1. User uploads 3 photos (front, side, face) + height
2. AI estimates body measurements
3. Platform matches them to hand-measured garments
4. Shows personalized styled outfits with fit explanations + virtual try-on

**Launch date: June 6, 2026.** This is a real product. Ship it.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js (App Router), React 19 |
| Animations | Framer Motion 12 |
| Styling | Tailwind CSS 4 (PostCSS plugin) |
| Gestures | React Swipeable 7 |
| E-commerce | Shopify (Storefront API + Admin API) |
| Hosting | Vercel |
| Domain | ruclo.com |
| Store | ruclo-4262.myshopify.com |

---

## Design System — NON-NEGOTIABLE RULES

This is a luxury fashion brand. Every pixel must reflect that.

### Typography
- Font: **`Helvetica Neue, Helvetica, Arial, sans-serif`** — everywhere, always
- Apply via inline style: `style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}`
- Weights: 300 (light), 400 (normal), 500 (medium) — never bold except intentional editorial
- Sizes: text-4xl/5xl (logo/hero), text-sm/base (body), text-xs (buttons/labels)
- Letter spacing: tracking-widest for uppercase labels

### Colors
- Background: `#FFFFFF` — always white
- Primary text: `#000000`
- Secondary text: `#1F2937` (gray-800)
- Borders: `#E5E7EB` (gray-200), hover → `#000000`
- Accent: `#007AFF` (blue) — only for "Styled for you" / fit badges
- Never: bright colors, gradients, colored backgrounds, emojis

### Buttons
- Border radius: `25px` (rounded, not pill)
- Padding: `px-12 py-4`
- Font: `text-xs uppercase tracking-widest`
- Transition: `duration-500` (slow, premium)
- Hover: `bg-gray-900 text-white`
- Default: `border border-black bg-white text-black`

### Animations (Framer Motion)
- Easing: `[0.16, 1, 0.3, 1]` — Apple-style cubic bezier
- Durations: 300ms (fast interactions) to 1200ms (page reveals) — never instant
- Page enters: opacity 0→1, y 20→0, duration 400-600ms
- Hover states: scale 1→1.02, duration 300ms
- Use `AnimatePresence` for mount/unmount transitions
- Use `layoutId` for shared element transitions

### Design Philosophy
Inspired by: Ssense, Acne Studios, Highsnobiety, Farfetch, Apple

**DO:** Understated, slow, whitespace-heavy, editorial, minimal
**DON'T:** Loud text, bright colors, emojis, fast animations, cluttered layouts, drop shadows (sparingly)

---

## Project Structure

```
/src/
├── /app/
│   ├── page.js                    # Redirects to /onboarding
│   ├── layout.js                  # Root layout (Geist fonts)
│   ├── globals.css                # Tailwind 4 + CSS vars
│   │
│   ├── /onboarding/
│   │   ├── layout.js              # AnimatePresence transitions
│   │   ├── page.js                # Welcome screen
│   │   ├── /signup/page.js        # Shopify account creation redirect
│   │   ├── /upload/page.js        # 3 photos + height → sessionStorage
│   │   ├── /processing/page.js    # 40s AI animation + progress bar
│   │   └── /complete/page.js      # Saves measurements → redirects /stylist
│   │
│   ├── /stylist/page.js           # Main page: swipeable cards + fit modal
│   │
│   └── /api/
│       ├── /products/route.js     # GET: Shopify products (Storefront API)
│       ├── /add-to-cart/route.js  # POST: Create cart + add item
│       ├── /get-measurements/route.js   # GET: Customer metafields
│       └── /save-measurements/route.js  # POST: Save to metafields
│
└── /components/
    ├── Navigation.js              # Desktop + mobile nav
    └── Footer.js                  # Links + newsletter + copyright
```

Path alias: `@/` maps to `./src/`

---

## Current State (Week 3 of 15)

### Done
- Full onboarding flow UI (welcome → upload → processing → signup → complete)
- Stylist page UI (swipeable cards, fit badges, "Why this fits" modal)
- Navigation + Footer components
- API routes (products, cart, measurements get/save)
- Shopify integration setup

### Known Bugs
- `stylist/page.js`: `checkFitMatch()` function is called but not defined
- `stylist/page.js`: `hasOnboarded` variable used but not wired to API
- Cart API exists but is commented out in UI (using direct Shopify redirect)
- `onboarding/complete/page.js`: measurements not fully wired to API

### Next Up (Week 4)
- AI measurement API integration
- Photo storage (S3 or Cloudinary)
- Fit matching algorithm
- Wire `hasOnboarded` + `checkFitMatch()` to real data

---

## Shopify Integration Patterns

### Storefront API (public, client-safe)
```javascript
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
  },
  body: JSON.stringify({ query }),
})
```

### Admin API (server-only, API routes)
```javascript
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

const response = await fetch(
  `https://${SHOPIFY_DOMAIN}/admin/api/2024-01/customers/${customerId}/metafields.json`,
  {
    headers: {
      'X-Shopify-Access-Token': ADMIN_TOKEN,
      'Content-Type': 'application/json',
    },
  }
)
```

### Measurements stored in: `custom.measurements` metafield (JSON)

---

## Coding Conventions

### Component structure
```javascript
'use client'  // Only when using hooks/browser APIs

import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function PageName() {
  // state
  // effects
  // handlers
  // render
}
```

### Framer Motion page wrapper
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>
```

### Styling: Tailwind first, inline styles for font-family only
```jsx
// Good
<p className="text-sm font-light text-gray-800 tracking-wide"
   style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>

// Bad: inline styles for everything, no CSS variables for font
```

### State persistence
- Session data (photos, measurements): `sessionStorage`
- User auth: Shopify customer session
- No Redux/Zustand — useState + sessionStorage is enough

### API routes
- Always use `NextResponse.json()`
- Validate required params before Shopify calls
- Return consistent `{ success, data/error }` shape

---

## Environment Variables

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=ruclo-4262.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=...
SHOPIFY_ADMIN_ACCESS_TOKEN=...
```

Admin token is server-only — never use in client components or `NEXT_PUBLIC_` vars.

---

## Slash Commands — Team rsthetics

### Leadership
| Command | Role | Does |
|---------|------|------|
| `/lead` | Tech Lead | Architecture decisions, tradeoffs, unblocking, cross-cutting concerns |
| `/pm` | Product Manager | Feature specs, prioritization, acceptance criteria, launch readiness |
| `/sprint` | Sprint Planner | Plan week's work against the 15-week timeline |

### Engineering
| Command | Role | Does |
|---------|------|------|
| `/frontend` | Senior Frontend | React 19, Next.js App Router, Framer Motion, Tailwind 4, accessibility |
| `/backend` | Senior Backend | API routes, Shopify Admin/Storefront APIs, data modeling, security |
| `/ui` | UI Specialist | Build/refine UI — enforces design system on every element |
| `/page` | Page Builder | Scaffold new pages with full conventions wired |
| `/fit` | Fit Engine | Implement `checkFitMatch`, `hasOnboarded`, measurement schema |
| `/shopify` | Shopify Expert | Deep Shopify integration patterns, GraphQL, metafields |
| `/tryon` | Try-On Engineer | Virtual try-on API research + integration (Week 8) |

### Quality
| Command | Role | Does |
|---------|------|------|
| `/qa` | QA Engineer | Edge cases, mobile testing, error states, full audit |
| `/review` | Code Reviewer | Design system compliance + code quality checklist |
| `/fix` | Bug Hunter | Systematic root-cause analysis and targeted fixes |

---

## Do Not
- Add comments unless logic is non-obvious
- Use bold font-weight without clear editorial intent
- Add colored backgrounds (keep everything white)
- Use `console.log` in production code
- Expose Admin API tokens in client components
- Use `find`, `grep`, `cat` — use Claude's dedicated tools
- Add features not explicitly asked for
- Use emojis anywhere in the UI
