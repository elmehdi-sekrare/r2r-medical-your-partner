import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, ImageOff } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";
import { getCategory } from "@/data/products";
import { getIcon } from "@/lib/icon-map";
import { openWhatsApp } from "@/lib/whatsapp";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [errored, setErrored] = useState(false);
  const cat = getCategory(product.categorySlug);
  const Icon = getIcon(cat?.icon ?? "Package");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
      className="group flex flex-col rounded-2xl bg-card border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1"
    >
      <Link
        to="/produit/$slug"
        params={{ slug: product.slug }}
        className="relative aspect-square bg-surface overflow-hidden block"
      >
        {!errored && product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setErrored(true)}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full grid place-items-center bg-primary-soft">
            <Icon className="h-16 w-16 text-primary/60" strokeWidth={1.5} />
          </div>
        )}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-[10px] font-semibold uppercase tracking-wider text-primary border border-border">
          {cat?.name.split(" & ")[0]}
        </span>
      </Link>

      <div className="flex-1 flex flex-col p-4">
        <h3
          className="font-display font-semibold text-sm leading-snug line-clamp-2 min-h-[2.5rem]"
          title={product.name}
        >
          {product.name}
        </h3>
        <div className="mt-auto pt-4 grid grid-cols-[1fr_auto] gap-2">
          <Link
            to="/produit/$slug"
            params={{ slug: product.slug }}
            className="inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Voir détails <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={() => openWhatsApp(product.name)}
            className="h-10 w-10 grid place-items-center rounded-xl bg-whatsapp text-whatsapp-foreground hover:opacity-90 transition-opacity"
            aria-label={`Commander ${product.name} sur WhatsApp`}
          >
            <MessageCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function ProductImageFallback({ categorySlug }: { categorySlug: string }) {
  const cat = getCategory(categorySlug);
  const Icon = getIcon(cat?.icon ?? "Package");
  return (
    <div className="w-full h-full grid place-items-center bg-primary-soft">
      <Icon className="h-24 w-24 text-primary/60" strokeWidth={1.25} />
    </div>
  );
}
