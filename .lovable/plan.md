# R2R Medical —Premium Upgrade Plan

## do directly phase 2 3

---

## Phase 2 — Design Upgrades

9. **Professional SVG logo** — Replace the generic teal circle+plus with a proper R2R Medical wordmark/logo SVG
10. **Mega-menu for Categories** — On desktop, hovering "Catégories" shows a dropdown grid of all 10 categories with icons and product counts
11. **Page transition animations** — Smooth fade between routes using TanStack Router's transition hooks
12. **Skeleton loading states** — Add skeleton placeholders for product cards and category cards while content loads
13. **Product quick-view modal** — Click a "Quick view" button on product cards to see details in a modal without navigating away
14. **Product specifications table** — On product detail pages, show a structured specs table (auto-generated from product name/category)
15. **Breadcrumb navigation** — Wire the existing Breadcrumb UI component into product detail and category pages

---

## Phase 3 — Premium Features

16. **Recently viewed products bar** — Persistent bar on catalogue and product pages showing last 5 viewed items
17. **Social proof ticker** — Animated banner showing "Dr. X from Casablanca just requested a quote" (simulated)
18. **Interactive Morocco map** — On the A-propos page, show delivery coverage with an SVG map
19. **Product image gallery** — On product detail page, add image zoom on hover and thumbnail navigation
20. **Accessibility audit** — Add proper ARIA labels, keyboard navigation, focus rings, skip-to-content link
21. **Performance optimization** — Lazy load below-fold sections, optimize image loading with proper `srcset`

---

## Technical Details

**FadeIn component pattern:**

```tsx
function FadeIn({ children, className, delay = 0 }) {
  const mounted = useHasMounted();
  return (
    <motion.div
      initial={mounted ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

Setting `initial` to `false` when not yet mounted tells Framer Motion to skip the initial state and render at the animate values immediately (visible), then only animate on subsequent client-side renders.

**Files changed (estimated):** ~15 files across components and routes.