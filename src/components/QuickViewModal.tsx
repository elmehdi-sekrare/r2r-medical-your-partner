import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, GitCompare, Heart, MessageCircle, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";
import { getCategory, getProductMeta } from "@/data/products";
import { getIcon } from "@/lib/icon-map";
import { addToQuote, toggleCompare, toggleFavorite, useCompare, useFavorites } from "@/lib/quote";
import { AvailabilityBadge, PriceStatusBadge } from "@/components/AvailabilityBadge";
import { ProductImageFallback } from "@/components/ProductCard";
import { cn } from "@/lib/utils";
import { openWhatsApp } from "@/lib/whatsapp";

export function QuickViewModal({
  product,
  open,
  onClose,
}: {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}) {
  const [imgErr, setImgErr] = useState(false);
  const favorites = useFavorites();
  const compare = useCompare();

  if (!product) return null;

  const cat = getCategory(product.categorySlug);
  const meta = getProductMeta(product);
  const Icon = getIcon(cat?.icon ?? "Package");
  const favorite = favorites.isFavorite(product);
  const compared = compare.isCompared(product);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card shadow-hero"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-border bg-card shadow-soft hover:bg-muted"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden rounded-tl-3xl rounded-bl-3xl bg-[radial-gradient(circle_at_20%_10%,white,oklch(0.95_0.03_250))] p-4">
                <div className="absolute inset-0 brand-circuit opacity-20" />
                {!imgErr && product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    onError={() => setImgErr(true)}
                    className="relative h-full w-full object-contain p-6"
                  />
                ) : (
                  <ProductImageFallback categorySlug={product.categorySlug} />
                )}
                <div className="absolute left-4 top-4">
                  <PriceStatusBadge price={product.price} />
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col p-6">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-semibold text-primary">
                    <Icon className="h-3 w-3" />
                    {cat?.name}
                  </span>
                  <AvailabilityBadge availability={meta.availability} compact />
                </div>

                <h2 className="mt-3 font-display text-xl font-bold leading-tight">{product.name}</h2>

                {product.price && (
                  <p className="mt-3 font-display text-2xl font-bold text-primary">{product.price} MAD</p>
                )}

                <div className="mt-4 space-y-2">
                  {[
                    { label: "Type", value: meta.productType },
                    { label: "Usage", value: meta.useCase },
                    { label: "Disponibilité", value: meta.availability },
                  ].map((spec) => (
                    <div key={spec.label} className="flex items-center justify-between rounded-lg bg-surface px-3 py-2">
                      <span className="text-xs font-semibold text-muted-foreground">{spec.label}</span>
                      <span className="text-xs font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border pt-4 mt-5">
                  <button
                    onClick={() => toggleFavorite(product)}
                    className={cn(
                      "grid h-10 w-10 place-items-center rounded-xl border transition-colors",
                      favorite ? "border-red-200 bg-red-50 text-red-500" : "border-border bg-surface text-muted-foreground hover:text-primary",
                    )}
                  >
                    <Heart className={cn("h-4 w-4", favorite && "fill-current")} />
                  </button>
                  <button
                    onClick={() => toggleCompare(product)}
                    className={cn(
                      "grid h-10 w-10 place-items-center rounded-xl border transition-colors",
                      compared ? "border-primary/30 bg-primary-soft text-primary" : "border-border bg-surface text-muted-foreground hover:text-primary",
                    )}
                  >
                    <GitCompare className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => addToQuote(product)}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface text-muted-foreground hover:text-primary"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => openWhatsApp(product.name)}
                    className="ml-auto inline-flex h-10 items-center gap-2 rounded-xl bg-whatsapp px-4 text-sm font-bold text-whatsapp-foreground"
                  >
                    <MessageCircle className="h-4 w-4" /> Devis
                  </button>
                </div>

                <Link
                  to="/produit/$slug"
                  params={{ slug: product.slug }}
                  onClick={onClose}
                  className="mt-3 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
                >
                  Voir la fiche complète <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
