# RUCLO - Design System

## Design Philosophy

**Inspiration:** Highsnobiety, Ssense, Farfetch, End Clothing, Acne Studios, Apple  
**Theme:** Etheryx (Shopify premium theme - $350)  
**Aesthetic:** Premium, minimalist, ethereal, understated luxury

## Core Principles

- ❌ **NOT LOUD** - Subtle, refined, never shouty
- ✅ **Minimal** - Clean, lots of breathing room
- ✅ **Premium** - High-end fashion feel
- ✅ **Smooth** - Elegant animations, slow easing curves
- ✅ **Mobile-first** - Everything must work perfectly on mobile

---

## Typography

### Font Family
```css
font-family: 'Helvetica Neue, Helvetica, Arial, sans-serif'
```
**Use everywhere.** No exceptions.

### Font Weights
- `font-light` (300) - Body text, taglines
- `font-normal` (400) - Default, headers
- `font-medium` (500) - Emphasis only when needed

### Sizing Scale
- **Hero/Logo:** `text-4xl sm:text-5xl` (not loud, 50% smaller than typical)
- **Headings:** `text-xl sm:text-3xl`
- **Body:** `text-sm sm:text-base`
- **Labels:** `text-[9px] sm:text-xs`
- **Buttons:** `text-xs` uppercase

### Spacing Rules
- **Use default letter-spacing** - No custom tracking unless absolutely necessary
- Line heights: Default Tailwind (don't override)

---

## Colors

### Primary Palette
```
Background: #FFFFFF (white)
Text: #000000 (black)
Secondary Text: #1F2937 (gray-800) - for subtitles, not gray-600
Muted: #E5E7EB (gray-200) - borders, dividers
```

### States
```
Hover: #111827 (gray-900)
Active: #030712 (gray-950)
Border Default: #E5E7EB (gray-200)
Border Hover: #000000 (black)
```

### NEVER USE
- ❌ Bright colors
- ❌ Gray-600 for important text (too light)
- ❌ Heavy gradients
- ❌ Drop shadows (except subtle for cards)

---

## Buttons

### Style Rules
```css
- Border radius: 6px (subtle rounding, NOT fully rounded)
- Padding: px-12 py-4
- Font: text-xs uppercase
- Default: bg-black text-white
- Hover: bg-gray-900
- Transition: duration-500 (slow, premium)
```

### Example
```jsx
<button
  className="px-12 py-4 bg-black text-white text-xs uppercase transition-all duration-500 hover:bg-gray-900"
  style={{ 
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    borderRadius: '25px'
  }}
>
  Button Text
</button>
```

---

## Borders & Containers

### Rules
- **Rounded corners** - 25px for buttons, 6px for boxes/cards
- **Thin borders** - 1px, never heavy
- **Border colors:**
  - Default: `border-gray-200` (#E5E7EB)
  - Hover: `border-black` (#000000)

### Upload Boxes
```jsx
style={{ 
  border: hoveredBox === 'front' ? '1px solid #000' : '1px solid #e5e7eb'
}}
```

---

## Animations

### Timing
- **Fast interactions:** 300ms
- **Page transitions:** 400-600ms
- **Premium reveals:** 800-1200ms

### Easing Curves
```javascript
// Apple/Premium easing
ease: [0.16, 1, 0.3, 1]

// Standard smooth
ease: 'easeInOut'

// Bouncy (use sparingly)
ease: [0.34, 1.56, 0.64, 1]
```

### Framer Motion Patterns
```jsx
// Page entrance
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}

// Staggered reveals
transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}

// Hover effects
whileHover={{ x: '100%', opacity: 0.1 }}
transition={{ duration: 0.8, ease: 'easeInOut' }}
```

---

## Spacing

### Vertical Spacing
- Between sections: `mb-6 sm:mb-12 md:mb-16`
- Between elements: `mb-2 sm:mb-4`
- Within forms: `space-y-6 sm:space-y-10 md:space-y-12`

### Horizontal Spacing
- Page padding: `px-3 sm:px-6`
- Containers: `max-w-4xl` or `max-w-5xl`
- Grid gaps: `gap-2 sm:gap-6 md:gap-8`

---

## Responsive Design

### Breakpoints (Tailwind)
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

### Mobile-First Rules
1. Design for mobile first (320px+)
2. All 3 upload boxes side-by-side on mobile (grid-cols-3, gap-2)
3. Everything must fit in viewport without scrolling (for key screens)
4. Touch targets: minimum 44x44px

### Pattern
```jsx
className="text-xs sm:text-base"  // Mobile → Desktop
className="gap-2 sm:gap-6"        // Tighter → Wider
className="mb-4 sm:mb-12"         // Less → More space
```

---

## Images

### Upload Previews
- Aspect ratio: `aspect-[3/4]`
- Object fit: `object-cover`
- Fade-in animation on load
- Click to re-upload

### Transitions
```jsx
<AnimatePresence mode="wait">
  <motion.img 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
  />
</AnimatePresence>
```

---

## Key UI Patterns

### Photo Upload Boxes
```jsx
- Grid: grid-cols-3 (always, even on mobile)
- Labels: text-[9px] sm:text-xs uppercase
- Hover state: border changes to black, opacity shift
- Touch: active:bg-gray-50
```

### Processing Screens
```jsx
- Full screen: min-h-screen
- Black background: bg-black
- White text: text-white
- Centered: flex items-center justify-center
```

### Form Inputs
```jsx
- Minimal: no heavy borders
- Bottom border only: border-b border-gray-200
- Focus: border-black
- Font: Helvetica Neue
```

---

## DON'Ts

❌ Don't use loud, oversized text  
❌ Don't use heavy letter-spacing  
❌ Don't use bright colors  
❌ Don't use fully rounded pill buttons  
❌ Don't use gray-600 for important text  
❌ Don't add unnecessary animations  
❌ Don't make things "tacky" or cheap-looking  
❌ Don't use emojis in production UI  

---

## DOs

✅ Keep everything understated and refined  
✅ Use slow, smooth transitions (500ms+)  
✅ Always test on mobile first  
✅ Use Helvetica Neue everywhere  
✅ Keep spacing minimal between related elements  
✅ Use darker grays (gray-800) for secondary text  
✅ Make buttons with 6px border radius  
✅ Ensure high contrast for readability  

---

## Reference Sites

Study these for inspiration:
- [Highsnobiety](https://www.highsnobiety.com/)
- [Ssense](https://www.ssense.com/)
- [Farfetch](https://www.farfetch.com/)
- [End Clothing](https://www.endclothing.com/)
- [Acne Studios](https://www.acnestudios.com/)
- Apple product pages

---

**Last Updated:** Feb 16, 2026  
**Status:** Living document - edit as design evolves
