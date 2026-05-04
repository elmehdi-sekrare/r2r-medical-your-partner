import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { useRecentlyViewed } from "@/lib/quote";
import { ProductThumb } from "@/components/ProductThumb";

export function RecentlyViewedCarousel() {
  const products = useRecentlyViewed();
  if (products.length === 0) return null;

  return (
    <section className="py-14 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold sm:text-2xl">Consultés récemment</h2>
              <p className="text-xs text-muted-foreground">Vos produits vus dernièrement</p>
            </div>
          </div>
          <Link
            to="/catalogue"
            className="hidden items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all sm:inline-flex"
          >
            Voir tout <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 snap-x">
          {products.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="w-48 shrink-0 snap-start"
            >
              <Link
                to="/produit/$slug"
                params={{ slug: product.slug }}
                className="group block rounded-2xl border border-border bg-card p-3 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
              >
                <ProductThumb
                  product={product}
                  className="aspect-square rounded-xl bg-surface p-2"
                  imageClassName="transition-transform duration-500 group-hover:scale-105"
                />
                <p className="mt-2.5 line-clamp-2 text-sm font-bold leading-tight">{product.name}</p>
                <p className="mt-1 text-[11px] font-medium text-muted-foreground">{product.category}</p>
                {product.price && (
                  <p className="mt-1 text-sm font-bold text-primary">{product.price} MAD</p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
