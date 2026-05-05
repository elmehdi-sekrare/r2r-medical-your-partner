import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ClipboardList,
  GitCompare,
  PackageCheck,
  Search,
  ShoppingCart,
  Sparkles,
  Trash2,
} from "lucide-react";
import { AvailabilityBadge, PriceStatusBadge } from "@/components/AvailabilityBadge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";
import { PRODUCTS, getProductMeta, type Product } from "@/data/products";
import { addToQuote, removeFromCompare, useCompare } from "@/lib/quote";

export const Route = createFileRoute("/comparaison")({
  component: ComparePage,
  head: () => ({
    meta: [
      { title: "Comparaison produits - R2R Medical" },
      {
        name: "description",
        content: "Comparez plusieurs équipements médicaux avant de demander un devis R2R Medical.",
      },
    ],
  }),
});

type CompareRow = {
  label: string;
  helper: string;
  value: (product: Product) => string;
};

const rows: CompareRow[] = [
  { label: "Catégorie", helper: "Famille médicale", value: (p) => p.category },
  { label: "Usage", helper: "Besoin principal", value: (p) => getProductMeta(p).useCase },
  { label: "Type", helper: "Classification produit", value: (p) => getProductMeta(p).productType },
  { label: "Marque", helper: "Indication catalogue", value: (p) => getProductMeta(p).brand },
  { label: "Disponibilité", helper: "Préparation devis", value: (p) => getProductMeta(p).availability },
  { label: "Prix", helper: "Selon données catalogue", value: (p) => (p.price ? `${p.price} MAD` : "Sur devis") },
];

const starterProducts = PRODUCTS.filter((p) => p.image).slice(0, 4);

function ComparePage() {
  const compare = useCompare();

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Catalogue", to: "/catalogue" }, { label: "Comparaison" }]} />

          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary">
                <GitCompare className="h-4 w-4" />
                Comparateur R2R Medical
              </div>
              <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-5xl">
                Comparez les équipements avant de préparer le devis.
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Gardez les références importantes côte à côte pour valider l'usage, la catégorie, le prix et la disponibilité.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-border bg-card p-5 shadow-soft"
            >
              <div className="grid grid-cols-2 gap-3">
                <Metric icon={PackageCheck} label="Produits sélectionnés" value={`${compare.count}/4`} />
                <Metric icon={ClipboardList} label="Critères visibles" value={`${rows.length}`} />
              </div>
              <Link
                to="/catalogue"
                className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-soft transition hover:-translate-y-0.5"
              >
                <Search className="h-4 w-4" />
                Ajouter un produit
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {compare.products.length === 0 ? (
          <div className="mt-4">
            <EmptyState
              icon={GitCompare}
              eyebrow="Comparaison"
              title="Aucun produit à comparer"
              description="Ajoutez jusqu'à 4 produits depuis le catalogue pour comparer catégorie, usage, disponibilité et prix."
            >
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/catalogue" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">
                  <Search className="h-4 w-4" /> Explorer le catalogue
                </Link>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {starterProducts.map((product) => (
                  <Link
                    key={product.slug}
                    to="/produit/$slug"
                    params={{ slug: product.slug }}
                    className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft transition hover:-translate-y-1 hover:border-primary/30"
                  >
                    <div className="aspect-[4/3] bg-surface p-4">
                      <img src={product.image} alt={product.name} className="h-full w-full object-contain transition duration-300 group-hover:scale-105" loading="lazy" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-primary">{product.category}</p>
                      <p className="mt-1 line-clamp-2 text-sm font-bold">{product.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </EmptyState>
          </div>
        ) : (
          <div className="grid gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-2xl font-bold">Sélection à comparer</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {compare.products.length} produit{compare.products.length > 1 ? "s" : ""} dans votre comparateur.
                </p>
              </div>
              <Link
                to="/devis"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-secondary px-5 text-sm font-bold text-secondary-foreground shadow-soft transition hover:-translate-y-0.5"
              >
                <ShoppingCart className="h-4 w-4" />
                Préparer le devis
              </Link>
            </div>

            {/* Card-based comparison for mobile */}
            <div className="grid gap-4 md:hidden">
              <AnimatePresence>
                {compare.products.map((product) => {
                  const meta = getProductMeta(product);
                  return (
                    <motion.div
                      key={product.slug}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="rounded-2xl border border-border bg-card p-5 shadow-soft"
                    >
                      <div className="flex gap-4">
                        <Link to="/produit/$slug" params={{ slug: product.slug }} className="group shrink-0">
                          <div className="h-24 w-24 overflow-hidden rounded-xl border border-border bg-surface p-2">
                            <img src={product.image} alt={product.name} className="h-full w-full object-contain transition group-hover:scale-105" loading="lazy" />
                          </div>
                        </Link>
                        <div className="min-w-0 flex-1">
                          <Link to="/produit/$slug" params={{ slug: product.slug }} className="font-display text-lg font-bold leading-tight hover:text-primary">
                            {product.name}
                          </Link>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <AvailabilityBadge availability={meta.availability} compact />
                            <PriceStatusBadge price={product.price} compact />
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCompare(product.slug)}
                          className="h-8 w-8 shrink-0 rounded-full border border-border grid place-items-center hover:border-destructive/40 hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        {rows.filter((r) => r.label !== "Disponibilité" && r.label !== "Prix").map((row) => (
                          <div key={row.label}>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{row.label}</p>
                            <p className="mt-0.5 text-sm font-semibold">{row.value(product)}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button onClick={() => addToQuote(product)} className="flex-1 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary text-sm font-bold text-primary-foreground">
                          <ShoppingCart className="h-4 w-4" /> Ajouter au devis
                        </button>
                        <button onClick={() => removeFromCompare(product.slug)} className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border px-4 text-sm font-semibold hover:text-destructive">
                          Retirer
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
              <div
                className="grid min-w-[860px]"
                style={{ gridTemplateColumns: `210px repeat(${compare.products.length}, minmax(210px, 1fr))` }}
              >
                <div className="border-b border-r border-border bg-surface p-5">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-primary">Critères</p>
                      <p className="mt-2 text-sm text-muted-foreground">Vue claire pour décider plus vite.</p>
                    </div>
                    <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-xs font-bold text-primary">
                      <Sparkles className="h-4 w-4" />
                      Max 4 produits
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {compare.products.map((product) => (
                    <ProductHeader key={product.slug} product={product} />
                  ))}
                </AnimatePresence>

                {rows.map((row) => (
                  <ComparisonRow key={row.label} row={row} products={compare.products} />
                ))}

                <div className="border-r border-border bg-surface/80 p-5">
                  <p className="text-sm font-bold">Actions</p>
                  <p className="mt-1 text-xs text-muted-foreground">Ajouter au devis ou retirer.</p>
                </div>
                {compare.products.map((product) => (
                  <div key={product.slug} className="border-t border-border p-5">
                    <div className="grid gap-2">
                      <button
                        onClick={() => addToQuote(product)}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:-translate-y-0.5"
                      >
                        <ShoppingCart className="h-4 w-4" /> Ajouter au devis
                      </button>
                      <button
                        onClick={() => removeFromCompare(product.slug)}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-semibold transition hover:border-destructive/40 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" /> Retirer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-4 rounded-3xl border border-primary/15 bg-primary/5 p-5 md:grid-cols-[1fr_auto] md:items-center"
            >
              <div>
                <p className="font-display text-xl font-bold">Besoin d'aide pour choisir ?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ajoutez les produits au devis et envoyez la demande WhatsApp avec vos quantités et remarques.
                </p>
              </div>
              <Link
                to="/devis"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-secondary px-5 text-sm font-bold text-secondary-foreground"
              >
                <ShoppingCart className="h-4 w-4" />
                Finaliser la demande
              </Link>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}

function ProductHeader({ product }: { product: Product }) {
  const meta = getProductMeta(product);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative overflow-hidden border-b border-r border-border bg-card p-5 last:border-r-0"
    >
      <button
        onClick={() => removeFromCompare(product.slug)}
        aria-label={`Retirer ${product.name} du comparateur`}
        className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/90 text-muted-foreground shadow-soft transition hover:border-destructive/40 hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      <Link to="/produit/$slug" params={{ slug: product.slug }} className="group block pr-10">
        <div className="aspect-[4/3] rounded-2xl border border-border bg-surface p-4 transition-shadow group-hover:shadow-elevated">
          <img src={product.image} alt={product.name} className="h-full w-full object-contain transition duration-300 group-hover:scale-105" loading="lazy" />
        </div>
        <p className="mt-4 line-clamp-2 font-display text-lg font-bold leading-tight transition-colors group-hover:text-primary">
          {product.name}
        </p>
      </Link>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
          {meta.productType}
        </span>
        <AvailabilityBadge availability={meta.availability} compact />
      </div>
    </motion.div>
  );
}

function ComparisonRow({ row, products }: { row: CompareRow; products: Product[] }) {
  const values = products.map((p) => row.value(p));
  const allSame = new Set(values).size === 1;

  return (
    <>
      <div className="border-r border-t border-border bg-surface/80 p-5">
        <p className="text-sm font-bold">{row.label}</p>
        <p className="mt-1 text-xs text-muted-foreground">{row.helper}</p>
      </div>
      {products.map((product, i) => {
        const meta = getProductMeta(product);
        const isStatusRow = row.label === "Disponibilité";
        const isPriceRow = row.label === "Prix";
        const isDifferent = !allSame && products.length > 1;

        return (
          <div
            key={`${row.label}-${product.slug}`}
            className={`border-t border-border p-5 transition-colors ${isDifferent ? "bg-primary/[0.03]" : ""}`}
          >
            <div className="flex items-start gap-3">
              {isStatusRow ? (
                <AvailabilityBadge availability={meta.availability} compact />
              ) : isPriceRow ? (
                <PriceStatusBadge price={product.price} compact />
              ) : (
                <p className="text-sm font-semibold leading-relaxed text-foreground">{values[i]}</p>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof GitCompare; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <Icon className="h-5 w-5 text-primary" />
      <p className="mt-3 font-display text-2xl font-bold">{value}</p>
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
    </div>
  );
}
