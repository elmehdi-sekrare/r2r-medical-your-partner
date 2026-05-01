import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, RotateCcw, Search, Settings, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORIES } from "@/data/products";
import { downloadOverrides, useAdminProducts } from "@/lib/admin-products";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin catalogue — R2R Medical" },
      {
        name: "description",
        content: "Interface locale de gestion du catalogue produits R2R Medical.",
      },
    ],
  }),
});

function AdminPage() {
  const { products, overrides, changedCount, updateProduct, resetProduct, resetAll } = useAdminProducts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      if (category && product.categorySlug !== category) return false;
      if (!q) return true;
      return `${product.name} ${product.rawName} ${product.category} ${product.slug}`.toLowerCase().includes(q);
    });
  }, [category, products, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Settings className="h-3.5 w-3.5" /> Gestion locale
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Admin catalogue
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Modifiez des brouillons de noms, prix et catégories dans votre navigateur. Les changements
            restent locaux jusqu'à export JSON ou connexion à une vraie base de données.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => downloadOverrides(overrides)}
            disabled={changedCount === 0}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:opacity-50"
          >
            <Download className="h-4 w-4" /> Export JSON
          </button>
          <button
            onClick={() => resetAll()}
            disabled={changedCount === 0}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold hover:bg-muted disabled:opacity-50"
          >
            <RotateCcw className="h-4 w-4" /> Réinitialiser
          </button>
        </div>
      </div>

      <section className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft lg:grid-cols-[1fr_260px_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher un produit, référence ou catégorie..."
            className="h-11 w-full rounded-xl bg-muted pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="h-11 rounded-xl border border-transparent bg-muted px-3 text-sm outline-none focus:border-primary"
        >
          <option value="">Toutes les catégories</option>
          {CATEGORIES.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="inline-flex h-11 items-center gap-2 rounded-xl bg-surface px-4 text-sm font-semibold">
          <SlidersHorizontal className="h-4 w-4 text-primary" /> {filtered.length} résultats
        </div>
      </section>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full min-w-[980px] text-sm">
          <thead className="border-b border-border bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="p-3">Produit</th>
              <th className="p-3">Catégorie</th>
              <th className="p-3">Prix</th>
              <th className="p-3">Référence</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 80).map((product) => {
              const changed = Boolean(overrides[product.slug]);
              return (
                <tr key={product.slug} className="border-b border-border/70 last:border-b-0">
                  <td className="p-3 align-top">
                    <input
                      value={product.name}
                      onChange={(event) => updateProduct(product.slug, { name: event.target.value })}
                      className="w-full rounded-lg bg-muted px-3 py-2 font-medium outline-none focus:ring-2 focus:ring-primary"
                    />
                  </td>
                  <td className="p-3 align-top">
                    <select
                      value={product.categorySlug}
                      onChange={(event) => {
                        const next = CATEGORIES.find((item) => item.slug === event.target.value);
                        updateProduct(product.slug, {
                          categorySlug: event.target.value,
                          category: next?.name ?? product.category,
                        });
                      }}
                      className="w-full rounded-lg bg-muted px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                    >
                      {CATEGORIES.map((item) => (
                        <option key={item.slug} value={item.slug}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3 align-top">
                    <input
                      value={product.price}
                      onChange={(event) => updateProduct(product.slug, { price: event.target.value })}
                      placeholder="Sur devis"
                      className="w-32 rounded-lg bg-muted px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </td>
                  <td className="p-3 align-top text-muted-foreground">{product.slug}</td>
                  <td className="p-3 align-top">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to="/produit/$slug"
                        params={{ slug: product.slug }}
                        className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-xs font-semibold hover:bg-muted"
                      >
                        Voir
                      </Link>
                      <button
                        onClick={() => resetProduct(product.slug)}
                        disabled={!changed}
                        className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-xs font-semibold hover:bg-muted disabled:opacity-50"
                      >
                        Reset
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Affichage limité à 80 lignes pour garder l'interface rapide. Utilisez la recherche ou filtrez par catégorie.
      </p>
    </div>
  );
}
