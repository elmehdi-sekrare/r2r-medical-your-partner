import { Link } from "@tanstack/react-router";
import { ArrowRight, Eye, GitCompare, Heart, MessageCircle, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { openQuickView } from "@/lib/quick-view";
import { AvailabilityBadge, PriceStatusBadge } from "@/components/AvailabilityBadge";
import { BrandMark } from "@/components/Brand";
import { FadeInView } from "@/components/FadeIn";
import type { Product } from "@/data/products";
import { getCategory, getProductMeta } from "@/data/products";
import { getIcon } from "@/lib/icon-map";
import { addToQuote, toggleCompare, toggleFavorite, useCompare, useFavorites } from "@/lib/quote";
import { cn } from "@/lib/utils";
import { openWhatsApp } from "@/lib/whatsapp";

export function ProductImageFallback({
  categorySlug,
  compact = false,
  productName,
}: {
  categorySlug: string;
  compact?: boolean;
  productName?: string;
}) {
  const cat = getCategory(categorySlug);
  const Icon = getIcon(cat?.icon ?? "Package");
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-2 p-4">
      <div className={cn(
        "grid place-items-center rounded-2xl bg-primary-soft text-primary",
        compact ? "h-10 w-10" : "h-16 w-16",
      )}>
        <Icon className={compact ? "h-5 w-5" : "h-8 w-8"} />
      </div>
      {!compact && <BrandMark className="mt-1" />}
      {productName && compact && (
        <p className="text-center text-[10px] font-semibold text-muted-foreground line-clamp-2">{productName}</p>
      )}
    </div>
  );
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [errored, setErrored] = useState(false);
  const cat = getCategory(product.categorySlug);
  const Icon = getIcon(cat?.icon ?? "Package");
  const favorites = useFavorites();
  const compare = useCompare();
  const favorite = favorites.isFavorite(product);
  const compared = compare.isCompared(product);
  const meta = getProductMeta(product);
  const categoryLabel = cat?.name.split(" & ")[0] ?? product.category;

  return (
    <FadeInView
      delay={Math.min(index * 0.04, 0.2)}
      duration={0.4}
      className="interactive-lift group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:border-primary/25"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,transparent,oklch(0.42_0.09_200),oklch(0.66_0.18_145),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <Link
        to="/produit/$slug"
        params={{ slug: product.slug }}
        className="relative block overflow-hidden bg-[radial-gradient(circle_at_50%_30%,white,oklch(0.96_0.012_200))] p-3"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
          <div className="absolute inset-0 brand-circuit opacity-25 transition-opacity duration-300 group-hover:opacity-40" />
          {!errored && product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setErrored(true)}
              className="relative h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="relative flex h-full flex-col items-center justify-center gap-2 p-4">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft text-primary">
                <Icon className="h-8 w-8" />
              </div>
              <BrandMark className="mt-1" />
            </div>
          )}
        </div>
        <div className="absolute left-4 top-4 flex items-center gap-1.5">
          <PriceStatusBadge price={product.price} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 pt-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
            <Icon className="h-3 w-3" />
            {categoryLabel}
          </span>
          <AvailabilityBadge availability={meta.availability} compact />
        </div>
        <Link
          to="/produit/$slug"
          params={{ slug: product.slug }}
          className="mt-2 font-display text-sm font-bold leading-snug hover:text-primary transition-colors line-clamp-2"
        >
          {product.name}
        </Link>
        {product.price && (
          <p className="mt-2 font-display text-lg font-bold text-primary">
            {product.price}
          </p>
        )}
        <div className="mt-auto flex items-center gap-1.5 pt-4 border-t border-border">
          <button
            onClick={() => toggleFavorite(product)}
            title="Favoris"
            className={cn(
              "grid h-9 w-9 place-items-center rounded-lg border transition-colors",
              favorite
                ? "border-red-200 bg-red-50 text-red-500 dark:border-red-800 dark:bg-red-950"
                : "border-border bg-surface text-muted-foreground hover:text-primary",
            )}
          >
            <Heart className={cn("h-4 w-4", favorite && "fill-current")} />
          </button>
          <button
            onClick={() => toggleCompare(product)}
            title="Comparer"
            className={cn(
              "grid h-9 w-9 place-items-center rounded-lg border transition-colors",
              compared
                ? "border-primary/30 bg-primary-soft text-primary"
                : "border-border bg-surface text-muted-foreground hover:text-primary",
            )}
          >
            <GitCompare className="h-4 w-4" />
          </button>
          <button
            onClick={() => addToQuote(product)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:text-primary"
            title="Ajouter au devis"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
          <Link
            to="/produit/$slug"
            params={{ slug: product.slug }}
            className="ml-auto inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground/80 hover:text-primary transition-colors"
          >
            Détails <ArrowRight className="rtl-flip h-3 w-3" />
          </Link>
          <button
            onClick={() => openWhatsApp(product.name)}
            className="inline-flex items-center gap-1 rounded-lg bg-whatsapp px-3 py-2 text-xs font-bold text-whatsapp-foreground"
          >
            <MessageCircle className="h-3 w-3" />
          </button>
        </div>
      </div>
    </FadeInView>
  );
}
