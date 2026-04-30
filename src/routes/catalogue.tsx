import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { z } from "zod";

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/catalogue")({
  validateSearch: searchSchema,
  component: CataloguePage,
  head: () => ({
    meta: [
      { title: "Catalogue — R2R Medical | 412 Équipements Médicaux" },
      { name: "description", content: "Parcourez nos 412 produits médicaux professionnels par catégorie. Devis WhatsApp instantané." },
    ],
  }),
});

const PAGE_SIZE = 24;

function CataloguePage() {
  const navigate = useNavigate({ from: "/catalogue" });
  const { category, q } = Route.useSearch();
  const [query, setQuery] = useState(q ?? "");
  const [shown, setShown] = useState(PAGE_SIZE);
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    const ql = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (category && p.categorySlug !== category) return false;
      if (ql && !p.name.toLowerCase().includes(ql) && !p.rawName.toLowerCase().includes(ql)) return false;
      return true;
    });
  }, [category, query]);

  const visible = filtered.slice(0, shown);

  const setCategory = (slug: string | undefined) => {
    navigate({ search: (s) => ({ ...s, category: slug }) });
    setShown(PAGE_SIZE);
  };

  const reset = () => {
    setQuery("");
    navigate({ search: {} });
    setShown(PAGE_SIZE);
  };

  const FilterPanel = (
    <div className="space-y-6">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recherche</label>
        <div className="mt-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShown(PAGE_SIZE); }}
            placeholder="Nom du produit…"
            className="w-full h-11 pl-10 pr-9 rounded-xl bg-muted border border-transparent focus:border-primary outline-none text-sm"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Catégories</label>
        <div className="mt-2 space-y-1">
          <button
            onClick={() => setCategory(undefined)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
              !category ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            <span>Toutes</span>
            <span className="text-xs opacity-70">{PRODUCTS.length}</span>
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                category === c.slug ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <span className="truncate">{c.name}</span>
              <span className="text-xs opacity-70 ml-2">{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      <button onClick={reset} className="w-full h-10 rounded-xl border border-border text-sm font-medium hover:bg-muted">
        Réinitialiser
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Catalogue</h1>
        <p className="mt-2 text-muted-foreground">
          <strong className="text-foreground">{filtered.length}</strong> produit{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24 p-5 rounded-2xl bg-card border border-border shadow-soft">
            {FilterPanel}
          </div>
        </aside>

        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFilters(true)}
            className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-card border border-border shadow-soft text-sm font-medium"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filtres
          </button>
        </div>

        <AnimatePresence>
          {mobileFilters && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-50 bg-foreground/40"
              onClick={() => setMobileFilters(false)}
            >
              <motion.div
                initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="h-full w-[85vw] max-w-sm bg-card p-6 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold">Filtres</h2>
                  <button onClick={() => setMobileFilters(false)}><X className="h-5 w-5" /></button>
                </div>
                {FilterPanel}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          {visible.length === 0 ? (
            <div className="py-24 text-center text-muted-foreground">
              Aucun produit ne correspond à votre recherche.
            </div>
          ) : (
            <>
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {visible.map((p, i) => (
                    <ProductCard key={p.slug} product={p} index={i % PAGE_SIZE} />
                  ))}
                </AnimatePresence>
              </motion.div>
              {shown < filtered.length && (
                <div className="mt-10 text-center">
                  <button
                    onClick={() => setShown((s) => s + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft"
                  >
                    Charger plus ({filtered.length - shown} restants)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
