# RUCLO - Coding Standards

## General Rules

1. **Mobile-first always** - Design for 320px+ first, scale up
2. **Accessibility** - Use semantic HTML, proper labels
3. **Performance** - Optimize images, lazy load when possible
4. **Consistency** - Follow established patterns across the codebase

---

## React/Next.js Patterns

### Client Components
Always mark interactive components with `'use client'` at the top:
```jsx
'use client'
import { useState } from 'react'
```

### Server Components (default)
Use for static content, no need to mark explicitly.

### Hooks
- Use `useState` for local state
- Use `useEffect` for side effects
- Use `useRouter` (from `next/navigation`) for navigation
- Custom hooks: prefix with `use` (e.g., `useFitMatching`)

---

## Styling Rules

### Tailwind CSS
- **Always use Tailwind** for styling
- Avoid inline styles unless absolutely necessary (Framer Motion exceptions allowed)
- Use responsive prefixes: `sm:`, `md:`, `lg:`

### Custom Styles
Only use inline styles for:
- Font family (Helvetica Neue everywhere)
- Dynamic values from props/state
- Framer Motion animations
- Border radius (when Tailwind doesn't have exact value)

### Example
```jsx
<button
  className="px-12 py-4 bg-black text-white text-xs uppercase"
  style={{ 
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    borderRadius: '6px'
  }}
>
  Button Text
</button>
```

---

## Framer Motion

### Page Transitions
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
>
  {children}
</motion.div>
```

### Hover Effects
```jsx
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### AnimatePresence
Use for conditional rendering with animations:
```jsx
<AnimatePresence mode="wait">
  {condition && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

---

## State Management

### Local State
```jsx
const [photos, setPhotos] = useState({
  front: null,
  side: null,
  face: null
})
```

### Session Storage (for onboarding flow)
```jsx
// Save
sessionStorage.setItem('onboardingPhotos', JSON.stringify(photos))

// Retrieve
const savedPhotos = JSON.parse(sessionStorage.getItem('onboardingPhotos'))
```

---

## Navigation

### Use Next.js Router
```jsx
import { useRouter } from 'next/navigation'

const router = useRouter()
router.push('/onboarding/instructions')
```

### Never use `<a>` tags for internal links
- Use programmatic navigation with `router.push()`
- Or use Next.js `<Link>` component

---

## Forms

### File Uploads
```jsx
<input
  id="front-input"
  type="file"
  accept="image/*"
  capture="environment"  // Back camera for body shots
  onChange={handlePhotoUpload}
  className="hidden"
/>
```

### Form Validation
- Disable submit button until form is complete
- Use `disabled` attribute with visual feedback

```jsx
const isFormComplete = photos.front && photos.side && photos.face && height

<button
  type="submit"
  disabled={!isFormComplete}
  className={isFormComplete 
    ? 'bg-black text-white' 
    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
  }
>
  Submit
</button>
```

---

## Image Handling

### Preview Uploaded Images
```jsx
const handlePhotoUpload = (type, event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotos(prev => ({ ...prev, [type]: reader.result }))
    }
    reader.readAsDataURL(file)
  }
}
```

### Display with Animation
```jsx
<AnimatePresence mode="wait">
  {photos.front ? (
    <motion.img 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      src={photos.front} 
      alt="Front view" 
      className="w-full h-full object-cover"
    />
  ) : (
    <label className="w-full h-full flex items-center justify-center">
      <span>+</span>
    </label>
  )}
</AnimatePresence>
```

---

## Responsive Design Patterns

### Typography
```jsx
className="text-xs sm:text-base"
```

### Spacing
```jsx
className="mb-4 sm:mb-8 md:mb-12"
className="gap-2 sm:gap-6 md:gap-8"
```

### Grids
```jsx
className="grid grid-cols-3 gap-2 sm:gap-6"
```

---

## Error Handling

### Try-Catch for API Calls
```jsx
try {
  const response = await fetch('/api/endpoint')
  const data = await response.json()
  // Handle success
} catch (error) {
  console.error('Error:', error)
  // Show user-friendly error message
}
```

### Fallbacks
Always provide fallback UI for loading/error states:
```jsx
{loading ? (
  <div>Loading...</div>
) : error ? (
  <div>Error occurred. Please try again.</div>
) : (
  <Content />
)}
```

---

## Comments

### When to Comment
- Complex logic that isn't immediately obvious
- API integrations
- Temporary workarounds (mark with `// TODO:`)
- Section headers in long files

### When NOT to Comment
- Self-explanatory code
- Obvious variable names
- Standard patterns

### Example
```jsx
// Generate height options in feet and inches format (4'10" to 7'0")
const heightOptions = []
for (let feet = 4; feet <= 7; feet++) {
  const maxInches = feet === 7 ? 0 : 11
  for (let inches = 0; inches <= maxInches; inches++) {
    if (feet === 4 && inches < 10) continue
    heightOptions.push(`${feet}'${inches}"`)
  }
}
```

---

## Git Commit Messages

### Format
```
type: brief description

Detailed explanation if needed
```

### Types
- `feat:` New feature
- `fix:` Bug fix
- `style:` Design/styling changes
- `refactor:` Code restructuring
- `docs:` Documentation
- `chore:` Maintenance tasks

### Examples
```
feat: add photo upload onboarding flow

fix: correct height dropdown values

style: update button border radius to 6px

refactor: extract photo upload logic to custom hook
```

---

## Performance Best Practices

1. **Lazy load images** - Use Next.js Image component
2. **Debounce search inputs** - Avoid excessive API calls
3. **Memoize expensive computations** - Use `useMemo`
4. **Avoid unnecessary re-renders** - Use `React.memo` for components
5. **Optimize animations** - Use `transform` instead of `top/left`

---

## Security

1. **Never commit API keys** - Use environment variables
2. **Validate user input** - Client and server side
3. **Sanitize file uploads** - Check file types, sizes
4. **Use HTTPS** - Always in production
5. **Secure photo storage** - Proper S3/Cloudinary permissions

---

**Remember:** Code should be clean, readable, and maintainable. When in doubt, keep it simple.

**Last Updated:** Feb 16, 2026
