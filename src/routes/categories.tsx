import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PriceStatusBadge } from "@/components/AvailabilityBadge";
import { ProductThumb } from "@/components/ProductThumb";
import { CATEGORIES, getProductsByCategory } from "@/data/products";
import { getIcon } from "@/lib/icon-map";

export const Route = createFileRoute("/categories")({
  component: CategoriesPage,
  head: () => ({
    meta: [
      { title: "Catégories — R2R Medical | 10 univers d'équipements médicaux" },
      { name: "description", content: "Découvrez nos 10 catégories d'équipements médicaux professionnels au Maroc." },
    ],
  }),
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Explorer</span>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
          Nos <span className="gradient-accent-text">10 catégories</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Un catalogue structuré pour répondre à tous les besoins médicaux professionnels.
        </p>
      </div>

      <div className="space-y-8">
        {CATEGORIES.map((c, i) => {
          const Icon = getIcon(c.icon);
          const samples = getProductsByCategory(c.slug).slice(0, 3);
          const reverse = i % 2 === 1;
          return (
            <motion.section
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.6 }}
              className={`grid md:grid-cols-2 gap-6 items-center p-6 md:p-10 rounded-3xl bg-card border border-border shadow-soft ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div>
                <div className="h-14 w-14 rounded-2xl gradient-primary text-primary-foreground grid place-items-center shadow-soft">
                  <Icon className="h-7 w-7" />
                </div>
                <h2 className="mt-5 font-display text-2xl md:text-3xl font-bold tracking-tight">{c.name}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{c.description}</p>
                <div className="mt-5 inline-flex items-center px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-semibold">
                  {c.count} produits disponibles
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/catalogue"
                    search={{ category: c.slug }}
                    className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-elevated transition-shadow"
                  >
                    Voir tous les produits <ArrowRight className="rtl-flip h-4 w-4" />
                  </Link>
                  <Link
                    to="/categorie/$slug"
                    params={{ slug: c.slug }}
                    className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-border font-semibold hover:bg-muted"
                  >
                    Page catégorie <ArrowRight className="rtl-flip h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="grid gap-3">
                {samples.map((p) => (
                  <Link
                    key={p.slug}
                    to="/produit/$slug"
                    params={{ slug: p.slug }}
                    className="group flex items-center gap-4 p-3 rounded-2xl bg-surface border border-border hover:border-primary transition-colors"
                  >
                    <ProductThumb
                      product={p}
                      className="grid h-16 w-16 shrink-0 place-items-center rounded-xl border border-border bg-card"
                      imageClassName="p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">{p.name}</p>
                      <div className="mt-1">
                        <PriceStatusBadge price={p.price} compact />
                      </div>
                    </div>
                    <ArrowRight className="rtl-flip h-4 w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
