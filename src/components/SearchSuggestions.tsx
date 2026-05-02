import { Link } from "@tanstack/react-router";
import { ArrowRight, FolderOpen, PackageSearch, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { CATEGORIES, PRODUCTS, getProductMeta } from "@/data/products";
import { cn } from "@/lib/utils";

const QUICK_NEEDS = [
  { label: "Oxygène & respiration", query: "oxygene", hint: "Concentrateurs, masques, nébuliseurs" },
  { label: "Fauteuils & mobilité", query: "fauteuil", hint: "Fauteuils roulants, cannes, aide au déplacement" },
  { label: "Diagnostic rapide", query: "tensiometre", hint: "Tensiomètres, oxymètres, stéthoscopes" },
  { label: "Hygiène & protection", query: "masque", hint: "Masques, gants, protection médicale" },
];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

type SearchSuggestionsProps = {
  query: string;
  open: boolean;
  onPickQuery: (query: string) => void;
  onClose?: () => void;
  className?: string;
};

export function SearchSuggestions({
  query,
  open,
  onPickQuery,
  onClose,
  className,
}: SearchSuggestionsProps) {
  const trimmed = query.trim();

  const { products, categories, needs } = useMemo(() => {
    const term = normalize(trimmed);
    const words = term.split(" ").filter(Boolean);

    if (!term) {
      return {
        products: PRODUCTS.filter((product) =>
          /concentrateur|fauteuil|tensiometre|stethoscope|masque|nebuliseur/i.test(product.rawName),
        ).slice(0, 4),
        categories: CATEGORIES.slice(0, 3),
        needs: QUICK_NEEDS,
      };
    }

    return {
      products: PRODUCTS.filter((product) => {
        const meta = getProductMeta(product);
        const haystack = normalize(
          `${product.name} ${product.rawName} ${product.category} ${meta.productType} ${meta.useCase}`,
        );
        return words.every((word) => haystack.includes(word));
      }).slice(0, 5),
      categories: CATEGORIES.filter((category) => {
        const haystack = normalize(`${category.name} ${category.description}`);
        return words.some((word) => haystack.includes(word));
      }).slice(0, 3),
      needs: QUICK_NEEDS.filter((need) => {
        const haystack = normalize(`${need.label} ${need.query} ${need.hint}`);
        return words.some((word) => haystack.includes(word));
      }).slice(0, 3),
    };
  }, [trimmed]);

  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-2xl border border-border bg-card shadow-hero",
        className,
      )}
      onMouseDown={(event) => event.preventDefault()}
    >
      <div className="border-b border-border bg-surface/70 px-4 py-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Suggestions intelligentes
        </div>
      </div>

      <div className="max-h-[420px] overflow-y-auto p-2">
        {needs.length > 0 && (
          <div className="p-2">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Besoins fréquents
            </p>
            <div className="grid gap-1">
              {needs.map((need) => (
                <button
                  key={need.query}
                  type="button"
                  onClick={() => {
                    onPickQuery(need.query);
                    onClose?.();
                  }}
                  className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-left hover:bg-muted"
                >
                  <span>
                    <span className="block text-sm font-bold">{need.label}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">{need.hint}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </button>
              ))}
            </div>
          </div>
        )}

        {products.length > 0 && (
          <div className="p-2">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Produits
            </p>
            <div className="grid gap-1">
              {products.map((product) => {
                const meta = getProductMeta(product);
                return (
                  <Link
                    key={product.slug}
                    to="/produit/$slug"
                    params={{ slug: product.slug }}
                    onClick={onClose}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-muted"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                      <PackageSearch className="h-4 w-4" />
                    </div>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold">{product.name}</span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                        {meta.productType} · {meta.availability}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {categories.length > 0 && (
          <div className="p-2">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Catégories
            </p>
            <div className="grid gap-1">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to="/catalogue"
                  search={{ category: category.slug }}
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-muted"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface text-primary">
                    <FolderOpen className="h-4 w-4" />
                  </div>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{category.name}</span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                      {category.count} produits · {category.description}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {products.length === 0 && categories.length === 0 && needs.length === 0 && (
          <div className="p-6 text-center">
            <p className="font-display text-sm font-bold">Aucune suggestion directe</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Essayez un terme plus large ou lancez la recherche dans le catalogue.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
