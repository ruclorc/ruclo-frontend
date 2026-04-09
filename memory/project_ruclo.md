---
name: RUCLO Project Overview
description: Core context for the RUCLO fit-first fashion platform — what it is, launch date, current state
type: project
---

RUCLO is India's first fit-first fashion platform launching June 6, 2026. Users upload 3 photos + height → AI estimates body measurements → platform matches them to hand-measured garments → shows personalized styled outfits with fit explanations and virtual try-on.

**Architecture:** Hybrid — Shopify (Etheryx theme) handles browse/editorial/cart/checkout. Next.js on Vercel handles onboarding + AI stylist page. Users navigate between both seamlessly.

**Why:** Solve the 40% return rate problem in Indian fashion e-commerce. Target: <10% returns by guaranteeing fit.

**How to apply:** Every feature decision should serve the core fit loop. If it doesn't help the user find clothes that fit, it's lower priority.

Current state: Week 3 of 15. Onboarding UI (4 screens) and stylist page UI are built. Auth flow (HMAC + JWT) designed but not implemented. Fit matching logic not yet implemented. AI measurement API integration is Week 4.

**Critical bugs:**
- `stylist/page.js`: `checkFitMatch()` called but never defined (will crash)
- `stylist/page.js`: `hasOnboarded` referenced but never declared (will crash)
- `onboarding/signup/page.js`: Shopify redirect broken (ignores return_url)
- `onboarding/complete/page.js`: save-measurements API call commented out

**Next up:** Fix stylist crashes → Build auth flow (HMAC + JWT) → Fetch real product data → Wire measurement persistence

Store: ruclo-4262.myshopify.com | Hosting: Vercel | Domain: ruclo.com
