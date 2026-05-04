
# Premium Feature Upgrades for R2R Medical

Based on a full scan of the codebase, here are **8 high-impact features** that will elevate this app to a world-class medical equipment e-commerce platform. All will maintain the existing premium blue-branded UI/UX style.

---

## 1. Product Image Gallery with Lightbox (produit.$slug)

Currently the product detail page shows a single image. Add a thumbnail strip + full-screen lightbox overlay with zoom, swipe gestures, and keyboard navigation.

**Files:** `src/routes/produit.$slug.tsx`, new `src/components/ImageLightbox.tsx`

---

## 2. "Recently Viewed" Carousel on Homepage

The `useRecentlyViewed` hook already exists in `src/lib/quote.ts` but is only used on the catalogue page. Add a horizontal scroll carousel section on the homepage showing the user's recently viewed products — personalization that big sites always have.

**Files:** `src/routes/index.tsx`, new `src/components/RecentlyViewedCarousel.tsx`

---

## 3. Advanced Search with Keyboard Navigation + Instant Results

The current search bar opens `SearchSuggestions` but lacks keyboard arrow-key navigation, Enter-to-select, and rich instant results with product thumbnails. Upgrade to a Command-palette style (Cmd+K) global search modal.

**Files:** new `src/components/CommandSearch.tsx`, `src/components/Navbar.tsx`

---

## 4. Product Recommendations ("Produits similaires" + "Souvent commandés ensemble")

On the product detail page, add a smart "Frequently ordered together" section (products from the same category with complementary types) and improve the existing related products section with better filtering logic.

**Files:** `src/routes/produit.$slug.tsx`, new `src/components/ProductRecommendations.tsx`

---

## 5. Sticky "Add to Quote" Bar on Product Page (Mobile)

On mobile, when the user scrolls past the CTA buttons on the product page, show a sticky bottom bar with the product name, price, and quick "Ajouter au devis" + WhatsApp buttons — like Amazon/Jumia mobile.

**Files:** `src/routes/produit.$slug.tsx`, new `src/components/StickyProductBar.tsx`

---

## 6. Trust Badges & Certification Section

Add a visually rich trust section on the homepage with animated certification badges (CE, ISO 13485, Normes Marocaines), partner logos, and a "Pourquoi R2R" value proposition grid with icons and micro-animations.

**Files:** `src/routes/index.tsx`, new `src/components/TrustBadges.tsx`

---

## 7. FAQ Accordion on Product + Contact Pages

Add a professionally styled FAQ section using the existing Accordion component. Product page gets product-specific FAQs (delivery, warranty, returns). Contact page gets general business FAQs.

**Files:** `src/routes/produit.$slug.tsx`, `src/routes/contact.tsx`, new `src/components/FAQ.tsx`

---

## 8. Animated Statistics / Counter Section Upgrade

The current stats section works but is basic. Upgrade with glassmorphism cards, subtle gradient borders, hover micro-interactions, and iconography for each stat (products, categories, cities served, years of experience).

**Files:** `src/routes/index.tsx`

---

## Implementation Approach

All features will be built with:
- Framer Motion animations consistent with existing patterns
- Blue brand palette (OKLCH 240-260 range) with existing CSS variables
- Mobile-first responsive design
- Accessible markup (ARIA labels, keyboard navigation)
- No new dependencies beyond what's already installed

Estimated: 8 components created/upgraded across ~12 files.
