---
name: RUCLO Design System
description: Non-negotiable design rules — typography, colors, animations, button styles for luxury fashion brand
type: project
---

RUCLO is a luxury fashion brand. Design is inspired by Ssense, Acne Studios, Highsnobiety, Farfetch, Apple.

**Why:** The design system is the brand. Violations make the product look cheap and undermine the premium positioning.

**How to apply:** Enforce these on every component, every page, every PR. No exceptions.

## Critical rules

**Font:** `Helvetica Neue, Helvetica, Arial, sans-serif` — always via inline style, never via CSS class
**Background:** #FFFFFF white always — no colored backgrounds ever
**Text:** #000000 primary, #1F2937 secondary
**Borders:** #E5E7EB (gray-200), hover → #000000
**Accent:** #007AFF — ONLY for "Styled for you" fit badges

**Buttons:**
- `border-radius: 25px` (not fully pill, not square)
- `px-12 py-4` padding
- `text-xs uppercase tracking-widest`
- `transition-all duration-500` (slow, premium)
- Hover: `bg-gray-900 text-white`

**Animations (Framer Motion):**
- Easing: `[0.16, 1, 0.3, 1]` (Apple cubic bezier)
- Durations: 300ms (micro) to 1200ms (reveals)
- Page entry: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}`
- Never instant transitions

**DO NOT:** use emojis, bright colors, gradients, bold fonts without editorial intent, fast animations, drop shadows
