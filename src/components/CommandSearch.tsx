import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Search, X, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CATEGORIES, PRODUCTS, type Product } from "@/data/products";
import { ProductThumb } from "@/components/ProductThumb";
import { cn } from "@/lib/utils";

export function useCommandSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return { open, setOpen };
}

export function CommandSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const words = q.split(/\s+/).filter((w) => w.length >= 2);
    if (words.length === 0) return [];
    return PRODUCTS.filter((p) => {
      const text = `${p.name} ${p.rawName} ${p.category}`.toLowerCase();
      return words.every((w) => text.includes(w));
    }).slice(0, 8);
  }, [query]);

  const categoryResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return CATEGORIES.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 3);
  }, [query]);

  const totalResults = categoryResults.length + results.length;

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const navigateToResult = useCallback(
    (idx: number) => {
      if (idx < categoryResults.length) {
        navigate({ to: "/catalogue", search: { category: categoryResults[idx].slug } });
      } else {
        const product = results[idx - categoryResults.length];
        if (product) navigate({ to: "/produit/$slug", params: { slug: product.slug } });
      }
      onClose();
    },
    [categoryResults, results, navigate, onClose],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, totalResults - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && totalResults > 0) {
      e.preventDefault();
      navigateToResult(selectedIndex);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[65] flex items-start justify-center bg-foreground/40 pt-[12vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-hero"
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Rechercher un produit, une catégorie..."
                className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground/60"
              />
              <kbd className="hidden rounded-lg border border-border bg-surface px-2 py-1 text-[10px] font-bold text-muted-foreground sm:block">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
              {query.trim().length > 0 && totalResults === 0 && (
                <div className="p-8 text-center">
                  <p className="text-sm text-muted-foreground">Aucun résultat pour « {query} »</p>
                  <Link
                    to="/catalogue"
                    search={{ q: query }}
                    onClick={onClose}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
                  >
                    Chercher dans le catalogue <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}

              {categoryResults.length > 0 && (
                <div className="mb-1">
                  <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Catégories
                  </p>
                  {categoryResults.map((cat, i) => (
                    <button
                      key={cat.slug}
                      onClick={() => navigateToResult(i)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                        selectedIndex === i ? "bg-primary-soft text-primary" : "hover:bg-muted",
                      )}
                    >
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                        <Search className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{cat.name}</p>
                        <p className="text-[11px] text-muted-foreground">{cat.count} produits</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {results.length > 0 && (
                <div>
                  <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Produits
                  </p>
                  {results.map((product, i) => {
                    const idx = categoryResults.length + i;
                    return (
                      <button
                        key={product.slug}
                        onClick={() => navigateToResult(idx)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors",
                          selectedIndex === idx ? "bg-primary-soft text-primary" : "hover:bg-muted",
                        )}
                      >
                        <ProductThumb
                          product={product}
                          className="h-10 w-10 shrink-0 rounded-lg bg-surface p-1"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold">{product.name}</p>
                          <p className="truncate text-[11px] text-muted-foreground">{product.category}</p>
                        </div>
                        {product.price && (
                          <span className="shrink-0 text-xs font-bold text-primary">{product.price} MAD</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {query.trim().length === 0 && (
                <div className="p-6 text-center">
                  <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <Command className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold">Recherche rapide</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Tapez pour trouver parmi 412 produits médicaux
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[10px] font-bold text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-surface px-1.5 py-0.5">↑↓</kbd> naviguer
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border bg-surface px-1.5 py-0.5">↵</kbd> sélectionner
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-surface px-1.5 py-0.5">⌘K</kbd> ouvrir/fermer
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
