import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, GitCompare, Heart, MessageCircle, ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";
import { getCategory, getProductMeta } from "@/data/products";
import { BrandMark } from "@/components/Brand";
import { getIcon } from "@/lib/icon-map";
import { addToQuote, toggleCompare, toggleFavorite, useCompare, useFavorites } from "@/lib/quote";
import { cn } from "@/lib/utils";
import { openWhatsApp } from "@/lib/whatsapp";

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
  const priceLabel = product.price ? `${product.price} MAD` : "Sur devis";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2) }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:border-primary/25 hover:shadow-elevated"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,transparent,oklch(0.42_0.09_200),oklch(0.66_0.18_145),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <Link
        to="/produit/$slug"
        params={{ slug: product.slug }}
        className="relative block overflow-hidden bg-[radial-gradient(circle_at_50%_30%,white,oklch(0.96_0.012_200))] p-3"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
          <div className="absolute inset-0 brand-circuit opacity-25" />
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
            <ProductImageFallback categorySlug={product.categorySlug} compact productName={product.name} />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>

        <div className="absolute left-5 top-5 flex max-w-[calc(100%-6rem)] flex-wrap gap-1.5">
          <span className="rounded-full border border-primary/15 bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur">
            {categoryLabel}
          </span>
          <span className="rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-success backdrop-blur">
            {meta.availability}
          </span>
        </div>

        <div className="absolute right-5 top-5 flex flex-col gap-1.5 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              toggleFavorite(product);
            }}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background/95 text-foreground shadow-soft backdrop-blur hover:text-primary"
            aria-label={
              favorite ? `Retirer ${product.name} des favoris` : `Ajouter ${product.name} aux favoris`
            }
          >
            <Heart className={cn("h-4 w-4", favorite && "fill-primary text-primary")} />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              toggleCompare(product);
            }}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background/95 text-foreground shadow-soft backdrop-blur hover:text-primary"
            aria-label={compared ? `Retirer ${product.name} du comparateur` : `Comparer ${product.name}`}
          >
            <GitCompare className={cn("h-4 w-4", compared && "text-primary")} />
          </button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 pt-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="line-clamp-1 text-[11px] font-semibold text-muted-foreground">
            {meta.productType}
          </span>
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
              product.price ? "bg-primary-soft text-primary" : "bg-muted text-muted-foreground",
            )}
          >
            {priceLabel}
          </span>
        </div>

        <Link
          to="/produit/$slug"
          params={{ slug: product.slug }}
          className="font-display min-h-[2.75rem] text-base font-bold leading-snug line-clamp-2 hover:text-primary"
          title={product.name}
        >
          {product.name}
        </Link>
        <p className="mt-2 line-clamp-1 text-xs text-muted-foreground">{meta.useCase}</p>

        <div className="mt-auto grid grid-cols-[1fr_auto_auto] gap-2 pt-4">
          <Link
            to="/produit/$slug"
            params={{ slug: product.slug }}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Voir détails <ArrowRight className="rtl-flip h-3.5 w-3.5" />
          </Link>
          <button
            onClick={() => addToQuote(product)}
            className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label={`Ajouter ${product.name} au devis`}
            title="Ajouter au devis"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
          <button
            onClick={() => openWhatsApp(product.name)}
            className="grid h-10 w-10 place-items-center rounded-xl bg-whatsapp text-whatsapp-foreground transition-opacity hover:opacity-90"
            aria-label={`Commander ${product.name} sur WhatsApp`}
            title="Commander sur WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

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
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_25%,white,oklch(0.94_0.018_190))] p-5">
      <div className="absolute inset-0 brand-circuit opacity-30" />
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-primary/15" />
      <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-primary-soft/70 blur-2xl" />
      <div className="relative flex max-w-[92%] flex-col items-center text-center">
        <BrandMark className={cn("rounded-2xl", compact ? "h-10 w-10" : "h-12 w-12")} />
        <div
          className={cn(
            "mt-4 grid place-items-center rounded-full border border-primary/15 bg-card/80 text-primary shadow-soft backdrop-blur",
            compact ? "h-16 w-16" : "h-24 w-24",
          )}
        >
          <Icon className={cn(compact ? "h-8 w-8" : "h-12 w-12")} strokeWidth={1.35} />
        </div>
        <p
          className={cn(
            "mt-4 font-display font-bold leading-tight text-foreground",
            compact ? "line-clamp-1 text-xs" : "line-clamp-2 text-base",
          )}
        >
          {productName ?? cat?.name ?? "Produit médical"}
        </p>
        <p className={cn("mt-1 text-muted-foreground", compact ? "text-[10px]" : "text-xs")}>
          Image en cours de chargement
        </p>
      </div>
    </div>
  );
}
