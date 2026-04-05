---
name: RUCLO Project Overview
description: Core context for the RUCLO fit-first fashion platform — what it is, launch date, current state
type: project
---

RUCLO is India's first fit-first fashion platform launching June 6, 2026. Users upload 3 photos + height → AI estimates body measurements → platform matches them to hand-measured garments → shows personalized styled outfits with fit explanations and virtual try-on.

**Why:** Solve the 40% return rate problem in Indian fashion e-commerce. Target: <10% returns by guaranteeing fit.

**How to apply:** Every feature decision should serve the core fit loop. If it doesn't help the user find clothes that fit, it's lower priority.

Current state: Week 3 of 15. Onboarding UI, stylist page UI, and Shopify API routes are built. Fit matching logic (`checkFitMatch`, `hasOnboarded`) not yet implemented. AI measurement API integration is Week 4.

Known bugs:
- `stylist/page.js`: `checkFitMatch()` called but not defined
- `stylist/page.js`: `hasOnboarded` used but not wired to `/api/get-measurements`
- `onboarding/complete/page.js`: measurements not actually saved to Shopify

Store: ruclo-4262.myshopify.com | Hosting: Vercel | Domain: ruclo.com
