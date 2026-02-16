# RUCLO - Project Documentation

This folder contains all project guidelines, design rules, and context for building RUCLO.

## 📁 Files Overview

### [project-brief.md](./rules/project-brief.md)
- High-level overview of what we're building
- Core value proposition
- Key goals and success metrics
- Platform structure

### [design-system.md](./rules/design-system.md) ⭐ **Most Important**
- Complete design guidelines
- Typography, colors, spacing
- Button styles, animations
- Etheryx-inspired aesthetic rules
- **Read this first before any UI work**

### [tech-stack.md](./rules/tech-stack.md)
- Next.js 14 + React 18
- Framer Motion for animations
- Shopify backend
- File structure
- Dependencies

### [coding-standards.md](./rules/coding-standards.md)
- React/Next.js patterns
- Styling rules (Tailwind)
- Framer Motion usage
- Form handling
- Best practices

### [timeline.md](./rules/timeline.md)
- 15-week build plan
- Week-by-week breakdown
- Current progress (Week 3)
- Launch date: June 6, 2026

### [ai-assistant-role.md](./rules/ai-assistant-role.md) 🤖
- AI cofounder behavior guidelines
- Communication style (direct, no BS)
- When to push back, how to disagree
- Tone examples (good vs bad)
- **Defines how AI assistants should work with you**

---

## 🎨 Quick Design Reference

### Font
```
Helvetica Neue, Helvetica, Arial, sans-serif
```

### Colors
```
Background: #FFFFFF
Text: #000000
Secondary: #1F2937 (gray-800)
Borders: #E5E7EB (gray-200)
```

### Buttons
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

### Animations (Framer Motion)
```jsx
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
```

---

## 🚀 Current Status

**Week:** 3 of 15  
**Phase:** Building Photo Upload Onboarding UI  
**Progress:** Welcome screen complete ✅  

### This Week's Goals
- [x] Welcome screen
- [ ] Instructions screen  
- [ ] Upload screen
- [ ] Processing animation
- [ ] Reveal screen

---

## 🎯 Key Principles

1. **Mobile-first** - Everything works perfectly on mobile
2. **Premium aesthetic** - Etheryx/Highsnobiety/Ssense inspired
3. **Not loud** - Subtle, understated, refined
4. **Smooth animations** - 500ms+ transitions, Apple-style easing
5. **Helvetica everywhere** - No exceptions

---

## 📖 How to Use These Docs

### For AI Assistants (Claude, Cursor, etc.)
1. Read `design-system.md` for any UI work
2. Reference `coding-standards.md` for patterns
3. Check `timeline.md` for current week focus
4. Consult `tech-stack.md` for architecture decisions

### For Editing
- All files are markdown - easy to edit
- Update as project evolves
- Add new rules/patterns as needed
- Keep design-system.md as source of truth

---

## 🔄 Update Log

- **Feb 16, 2026** - Created complete documentation structure
- **Feb 15, 2026** - Project kickoff, Week 3 started

---

**Remember:** These docs are living - update them as the project evolves!
