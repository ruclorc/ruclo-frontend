# RUCLO - 15-Week Build Timeline

**Launch Date:** June 6, 2026 (Friday)  
**Current Week:** Week 3  
**Status:** Building Photo Upload Onboarding UI

---

## Quick Reference

| Week | Focus | Status |
|------|-------|--------|
| 1 | Shopify + Etheryx Setup | ✅ Done |
| 2 | Learn React/Next.js | ✅ Done |
| 3 | Photo Upload Onboarding UI | 🔄 In Progress |
| 4 | AI Measurement API Research | ⏳ Next |
| 5 | Photo Backend + Storage | ⏳ Upcoming |
| 6 | Fit Matching Algorithm | ⏳ Upcoming |
| 7 | Stylist Swiper (Part 1) | ⏳ Upcoming |
| 8 | Virtual Try-On API | ⏳ Upcoming |
| 9 | Stylist Swiper (Part 2) | ⏳ Upcoming |
| 10 | Browse + Product Pages | ⏳ Upcoming |
| 11 | Content Creation | ⏳ Upcoming |
| 12 | Integration + Polish | ⏳ Upcoming |
| 13 | Photo/API Edge Case Testing | ⏳ Upcoming |
| 14 | Internal Testing | ⏳ Upcoming |
| 15 | Final Fixes + Launch | 🚀 Launch |

---

## Current Week (Week 3): Photo Upload Onboarding UI

### Goals
- Build complete 5-screen onboarding flow
- Premium, Etheryx-inspired design
- Fully responsive (mobile-first)

### Screens to Build
1. ✅ Welcome - "RUCLO / Your personal AI stylist / Begin"
2. ⏳ Instructions - Photo guide + tips
3. ⏳ Upload - 3 photo boxes + height dropdown
4. ⏳ Processing - 40s animation (THE SHOWSTOPPER)
5. ⏳ Reveal - "We styled 47 pieces just for YOU"

### Deliverable
✅ Beautiful photo upload UI, responsive (no AI backend yet)

---

## Next Week (Week 4): AI Measurement API Research

### Critical Tasks
- Research AI body measurement APIs
- Compare: accuracy, cost, speed, quality
- Test top 2 APIs with sample photos
- Make final decision
- Integrate chosen API
- Build `/api/estimate-measurements` endpoint

### API Research Criteria
- Accuracy (test with known measurements)
- Cost (free tier? pricing?)
- Speed (<30 seconds response)
- Documentation quality
- Privacy/GDPR compliance

---

## Major Milestones

### Phase 1: Foundation (Weeks 1-5)
- Shopify store setup
- Next.js frontend
- Photo onboarding complete
- AI measurement API working

### Phase 2: Core Features (Weeks 6-9)
- Fit matching algorithm
- Stylist swiper page
- Virtual try-on integration
- Educational overlays

### Phase 3: Full Platform (Weeks 10-12)
- Browse/Product pages with fit badges
- Content creation (50 products, 25 looks)
- All features integrated

### Phase 4: Testing & Launch (Weeks 13-15)
- Edge case testing
- Internal user testing
- Bug fixes
- **PUBLIC LAUNCH** 🚀

---

## Features by Week

### Week 3 (Current)
- Welcome screen
- Instructions screen
- Photo upload UI
- Processing animation
- Reveal screen

### Week 4
- AI measurement API integration
- Error handling & fallbacks

### Week 5
- Photo storage (S3/Cloudinary)
- Save measurements to Shopify
- User account creation

### Week 6
- Fit matching algorithm
- "Styled for you" badge logic

### Week 7
- Stylist swiper UI
- Fit badges
- Arrow navigation

### Week 8
- Virtual try-on API
- "Try This On Me" button

### Week 9
- "Why this fits" overlays
- "Add Full Look to Cart"
- Educational content

### Week 10
- Browse page with fit filtering
- Product pages with overlays

### Week 11
- Hand-measure 50-100 products
- Create 25 styled looks
- Write 3-5 articles

### Week 12
- End-to-end testing
- Bug fixes
- Performance optimization

### Week 13
- Test poor photo quality
- API failure scenarios
- Edge cases

### Week 14
- 20 friends test
- Gather feedback
- Implement fixes

### Week 15
- Soft launch to waitlist
- Final testing
- **PUBLIC LAUNCH June 6** 🚀

---

## Emergency Simplification Plan

**If behind by Week 10, CUT:**

| Feature | Impact | Justification |
|---------|--------|---------------|
| Virtual try-on | Remove "Try This On Me" | Still have fit badges (core value) |
| Educational overlays | Remove "Why this fits" | Nice-to-have, not core |
| Editorial | Launch with 1-2 articles | Can add post-launch |
| Products | 25 instead of 50 | Prove concept with less inventory |

**KEEP NO MATTER WHAT:**
- ✅ Photo-based measurement onboarding
- ✅ Fit matching algorithm
- ✅ Stylist swiper with badges
- ✅ Basic product pages with fit info

---

## Weekly Self-Check (Every Sunday)

1. ✅ Did I hit this week's deliverable?
2. ⏰ Am I on schedule?
3. 🐛 What blockers did I face?
4. 📝 What did I learn?
5. 🎯 What's the focus for next week?

---

## Resources & Support

- **Claude AI** - Research, debugging, architecture
- **Cursor IDE** - AI-powered coding
- **Shopify Docs** - API reference
- **React/Next.js Docs** - Framework help
- **Framer Motion Docs** - Animation guides

---

**Remember:** 15 weeks is tight but realistic. Use AI heavily. Focus on the moat (photo onboarding + fit matching). Ship fast, iterate later.

**Last Updated:** Feb 16, 2026  
**Days until launch:** 110 days
