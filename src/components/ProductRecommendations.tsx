import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useMemo } from "react";
import type { Product } from "@/data/products";
import { PRODUCTS, getProductMeta } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export function ProductRecommendations({ product }: { product: Product }) {
  const recommendations = useMemo(() => {
    const meta = getProductMeta(product);
    // Find products from different categories but same use case, or same category different type
    const sameCatDiffType = PRODUCTS.filter(
      (p) =>
        p.slug !== product.slug &&
        p.categorySlug === product.categorySlug &&
        getProductMeta(p).productType !== meta.productType,
    );
    const sameUseDiffCat = PRODUCTS.filter(
      (p) =>
        p.slug !== product.slug &&
        p.categorySlug !== product.categorySlug &&
        getProductMeta(p).useCase === meta.useCase,
    );
    // Combine and deduplicate
    const combined = [...sameCatDiffType.slice(0, 3), ...sameUseDiffCat.slice(0, 3)];
    const seen = new Set<string>();
    return combined.filter((p) => {
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    }).slice(0, 4);
  }, [product]);

  if (recommendations.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold sm:text-2xl">Souvent commandés ensemble</h2>
          <p className="text-xs text-muted-foreground">Produits complémentaires recommandés</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {recommendations.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
