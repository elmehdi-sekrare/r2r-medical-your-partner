import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, PackageCheck, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS, PRODUCT_TYPES, PRODUCT_USE_CASES, getProductMeta } from "@/data/products";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { useRecentlyViewed } from "@/lib/quote";
import { buildWhatsAppMessageUrl } from "@/lib/whatsapp";
import { z } from "zod";

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
  type: z.string().optional(),
  use: z.string().optional(),
  availability: z.string().optional(),
  sort: z.string().optional(),
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

const SEARCH_SYNONYMS: Record<string, string[]> = {
  o2: ["oxygene", "oxygenotherapie", "respiratoire", "concentrateur", "bouteille"],
  oxygen: ["oxygene", "oxygenotherapie", "respiratoire", "concentrateur"],
  oxygene: ["oxygenotherapie", "respiratoire", "concentrateur", "masque"],
  fauteuil: ["roulant", "mobilite", "chaise"],
  fauteil: ["fauteuil", "roulant", "mobilite", "chaise"],
  chaise: ["fauteuil", "mobilite", "pot"],
  tension: ["tensiometre", "diagnostic", "monitoring"],
  tensiometre: ["diagnostic", "monitoring", "pression"],
  masque: ["protection", "respiratoire", "oxygenotherapie"],
  pansement: ["soins", "consommables", "compresse"],
  sterilisation: ["autoclave", "sterile"],
};

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function expandSearch(value: string) {
  const normalized = normalizeSearch(value);
  const words = normalized.split(" ").filter(Boolean);
  return [...new Set([...words, ...words.flatMap((word) => SEARCH_SYNONYMS[word] ?? [])])];
}

function CataloguePage() {
  const navigate = useNavigate({ from: "/catalogue" });
  const { category, q, type, use, availability, sort } = Route.useSearch();
  const [query, setQuery] = useState(q ?? "");
  const [shown, setShown] = useState(PAGE_SIZE);
  const [mobileFilters, setMobileFilters] = useState(false);
  const recent = useRecentlyViewed();

  const filtered = useMemo(() => {
    const searchTerms = expandSearch(query);
    const results = PRODUCTS.filter((p) => {
      const meta = getProductMeta(p);
      const haystack = normalizeSearch(
        `${p.name} ${p.rawName} ${p.category} ${meta.productType} ${meta.useCase} ${meta.brand}`,
      );
      if (category && p.categorySlug !== category) return false;
      if (type && meta.productType !== type) return false;
      if (use && meta.useCase !== use) return false;
      if (availability && meta.availability !== availability) return false;
      if (searchTerms.length > 0 && !searchTerms.some((term) => haystack.includes(term))) return false;
      return true;
    });

    return results.sort((a, b) => {
      if (sort === "price") return Number(Boolean(b.price)) - Number(Boolean(a.price));
      if (sort === "category") return a.category.localeCompare(b.category);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      return a.name.localeCompare(b.name);
    });
  }, [availability, category, query, sort, type, use]);

  const visible = filtered.slice(0, shown);
  const suggestedCategories = CATEGORIES.filter((item) =>
    expandSearch(query).some((term) => normalizeSearch(item.name).includes(term)),
  ).slice(0, 3);
  const selectedCategory = CATEGORIES.find((item) => item.slug === category);
  const activeFilters = [
    query && `Recherche: ${query}`,
    selectedCategory && `Catégorie: ${selectedCategory.name}`,
    type && `Type: ${type}`,
    use && `Usage: ${use}`,
    availability && `Disponibilité: ${availability}`,
  ].filter(Boolean) as string[];
  const quickCategories = CATEGORIES.filter((item) =>
    ["oxygenotherapie", "mobilite", "diagnostic", "protection"].includes(item.slug),
  );

  const setCategory = (slug: string | undefined) => {
    navigate({ search: (s: Record<string, string | undefined>) => ({ ...s, category: slug }) });
    setShown(PAGE_SIZE);
  };

  const setFilter = (key: "type" | "use" | "availability" | "sort", value: string | undefined) => {
    navigate({ search: (s: Record<string, string | undefined>) => ({ ...s, [key]: value }) });
    setShown(PAGE_SIZE);
  };

  const reset = () => {
    setQuery("");
    navigate({ search: {} });
    setShown(PAGE_SIZE);
  };

  const FilterPanel = (
    <div className="space-y-5">
      <div className="rounded-2xl bg-primary p-4 text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/15">
            <SlidersHorizontal className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-base font-bold">Filtres catalogue</p>
            <p className="text-xs opacity-80">{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</p>
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recherche produit</label>
        <div className="mt-2 relative">
          <Search className="dir-search-icon absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShown(PAGE_SIZE); }}
            placeholder="Nom du produit…"
            className="dir-search-input h-11 w-full rounded-xl border border-transparent bg-muted pl-10 pr-9 text-sm outline-none focus:border-primary"
          />
          {query && (
            <button onClick={() => setQuery("")} className="dir-search-clear absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Disponibilité</label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {["Disponible", "Devis requis"].map((option) => (
            <button
              key={option}
              onClick={() => setFilter("availability", availability === option ? undefined : option)}
              className={`h-10 rounded-lg px-3 text-xs font-semibold transition-colors ${
                availability === option ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-primary-soft"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type de produit</label>
        <select
          value={type ?? ""}
          onChange={(event) => setFilter("type", event.target.value || undefined)}
          className="mt-2 h-11 w-full rounded-xl border border-transparent bg-muted px-3 text-sm outline-none focus:border-primary"
        >
          <option value="">Tous les types</option>
          {PRODUCT_TYPES.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Usage</label>
        <select
          value={use ?? ""}
          onChange={(event) => setFilter("use", event.target.value || undefined)}
          className="mt-2 h-11 w-full rounded-xl border border-transparent bg-muted px-3 text-sm outline-none focus:border-primary"
        >
          <option value="">Tous les usages</option>
          {PRODUCT_USE_CASES.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Catégories</label>
        <div className="mt-2 space-y-1">
          <button
            onClick={() => setCategory(undefined)}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
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
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                category === c.slug ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <span className="truncate">{c.name}</span>
              <span className="ms-2 text-xs opacity-70">{c.count}</span>
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
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <section className="mb-6 border-b border-border pb-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold uppercase text-primary">
                <PackageCheck className="h-3.5 w-3.5" /> Catalogue R2R
              </span>
              <span className="text-sm font-semibold text-muted-foreground">
                {filtered.length} produit{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
              </span>
            </div>
            <h1 className="mt-3 font-display text-2xl font-bold md:text-3xl">
              Catalogue médical professionnel
            </h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              Trier
              <select
                value={sort ?? "name"}
                onChange={(event) => setFilter("sort", event.target.value === "name" ? undefined : event.target.value)}
                className="h-10 rounded-xl border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-primary"
              >
                <option value="name">Nom A-Z</option>
                <option value="name-desc">Nom Z-A</option>
                <option value="category">Catégorie</option>
                <option value="price">Prix affiché d'abord</option>
              </select>
            </label>
            <button
              onClick={() => {
                const message = `Bonjour R2R Medical, j'ai besoin d'aide pour trouver un équipement médical. Recherche actuelle : ${query || "aucune"}.`;
                window.open(buildWhatsAppMessageUrl(message), "_blank", "noopener,noreferrer");
              }}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 text-sm font-bold text-whatsapp-foreground"
            >
              <MessageCircle className="h-4 w-4" /> Aide WhatsApp
            </button>
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
          {quickCategories.map((item) => (
            <button
              key={item.slug}
              onClick={() => setCategory(category === item.slug ? undefined : item.slug)}
              className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                category === item.slug
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:text-primary"
              }`}
            >
              {item.name.split(" & ")[0]}
            </button>
          ))}
        </div>

        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase text-muted-foreground">
              Filtres actifs
            </span>
            {activeFilters.map((item) => (
              <span
                key={item}
                className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary"
              >
                {item}
              </span>
            ))}
            <button
              onClick={reset}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:text-primary"
            >
              Effacer tout
            </button>
          </div>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-[330px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain rounded-2xl border border-border bg-card p-5 shadow-soft">
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
          {query && (
            <div className="mb-5 rounded-2xl border border-border bg-card p-4 shadow-soft">
              <p className="text-sm font-semibold">Recherche intelligente activée</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {expandSearch(query).slice(0, 8).map((term) => (
                  <span key={term} className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          )}
          {!category && !query && recent.length > 0 && (
            <section className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold">Récemment consultés</h2>
                <span className="text-xs text-muted-foreground">{recent.length} produit{recent.length > 1 ? "s" : ""}</span>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {recent.slice(0, 3).map((product, index) => (
                  <ProductCard key={product.slug} product={product} index={index} />
                ))}
              </div>
            </section>
          )}
          {visible.length === 0 ? (
            <EmptyState
              icon={PackageCheck}
              eyebrow="Recherche catalogue"
              title="Aucun produit trouvé"
              description="Essayez un terme plus large, une catégorie proche, ou envoyez directement votre demande si le produit recherché n'apparaît pas encore dans le catalogue."
            >
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { label: "Oxygène", q: "oxygene" },
                  { label: "Fauteuil roulant", q: "fauteuil" },
                  { label: "Diagnostic", q: "diagnostic" },
                  { label: "Pansements", q: "pansement" },
                ].map((item) => (
                  <button
                    key={item.q}
                    onClick={() => {
                      setQuery(item.q);
                      setShown(PAGE_SIZE);
                    }}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:text-primary"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              {suggestedCategories.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {suggestedCategories.map((item) => (
                    <button
                      key={item.slug}
                      onClick={() => setCategory(item.slug)}
                      className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                    >
                      Voir {item.name}
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={() => {
                  const message = `Bonjour R2R Medical, je cherche ce produit : ${query || "à préciser"}. Pouvez-vous m'aider ?`;
                  window.open(buildWhatsAppMessageUrl(message), "_blank", "noopener,noreferrer");
                }}
                className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-bold text-whatsapp-foreground"
              >
                <MessageCircle className="h-4 w-4" /> Demander ce produit sur WhatsApp
              </button>
            </EmptyState>
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
