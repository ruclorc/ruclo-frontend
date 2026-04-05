# RUCLO - Tech Stack

## Frontend

### Core Framework
- **Next.js 14** - App Router (not Pages Router)
- **React 18** - Latest features
- **Tailwind CSS** - Utility-first styling

### Animations
- **Framer Motion** - All animations, page transitions
- **CSS Transitions** - Simple hover states

### State Management
- **React useState/useEffect** - Local state
- **sessionStorage** - Onboarding flow data
- **React Context / Zustand** - Global state (when needed)

---

## Backend & E-commerce

### Platform
- **Shopify** - Product catalog, cart, checkout
- **Shopify Storefront API** - Fetch products, manage cart
- **Etheryx Theme ($350)** - Premium Shopify theme

### APIs to Integrate
- **AI Measurement API** (TBD - Week 4)
  - Options to research: Computer vision APIs
  - Input: 3 photos + height
  - Output: Estimated measurements
  
- **Virtual Try-On API** (TBD - Week 8)
  - Options to research: AI clothing visualization
  - Input: User photos + product image
  - Output: AI-generated try-on image

### Photo Storage
- **AWS S3** or **Cloudinary**
- Store user-uploaded photos securely
- Generate secure URLs for access

---

## Hosting & Deployment

- **Vercel** - Next.js hosting (free tier)
- **Shopify** - E-commerce backend
- **Domain:** ruclo.com

---

## File Structure

```
/src/app/
├── page.js                    # Root → redirects to /onboarding
├── layout.js                  # Root layout
├── globals.css               # Global styles
│
├── onboarding/
│   ├── layout.js             # Smooth page transitions
│   ├── page.js               # Welcome screen
│   ├── instructions/
│   │   └── page.js           # Instructions screen
│   ├── upload/
│   │   └── page.js           # Photo upload screen
│   ├── processing/
│   │   └── page.js           # AI processing animation
│   └── reveal/
│       └── page.js           # Reveal matches screen
│
├── stylist/
│   └── page.js               # Main homepage (swipeable looks)
│
├── editorial/
│   └── page.js               # Magazine-style content
│
├── browse/
│   └── page.js               # Search & filter products
│
├── product/
│   └── [id]/
│       └── page.js           # Individual product page
│
└── account/
    └── page.js               # User profile & measurements
```

---

## Development Tools

- **Cursor IDE** - AI-powered coding ($20/mo)
- **npm** - Package manager
- **Git** - Version control

---

## Key Dependencies

```json
{
  "next": "14.x",
  "react": "18.x",
  "framer-motion": "latest",
  "tailwindcss": "latest"
}
```

---

## Coding Standards

### File Naming
- Pages: `page.js` (Next.js App Router convention)
- Components: `PascalCase.js` (e.g., `UploadBox.js`)
- Utilities: `camelCase.js` (e.g., `fitAlgorithm.js`)

### Import Order
1. React/Next.js imports
2. External libraries (framer-motion, etc.)
3. Internal components
4. Utilities/helpers
5. Styles (if any)

### Component Structure
```jsx
'use client'  // Always add for client components
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ComponentName() {
  // State
  const [state, setState] = useState(null)
  
  // Handlers
  const handleAction = () => {}
  
  // Render
  return (
    <motion.div>
      {/* JSX */}
    </motion.div>
  )
}
```

---

## Browser Support

- **Chrome/Edge:** Latest 2 versions
- **Safari:** Latest 2 versions (iOS + macOS)
- **Firefox:** Latest 2 versions
- **Mobile:** iOS Safari, Chrome Android

---

## Performance Targets

- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3s
- **Image optimization:** Next.js Image component
- **Code splitting:** Automatic with Next.js

---

**Last Updated:** Feb 16, 2026  
**Next API Research:** Week 4 (AI Measurement) & Week 8 (Virtual Try-On)
