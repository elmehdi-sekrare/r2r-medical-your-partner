import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, GitCompare, Search, ShoppingCart, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { addToQuote, removeFromCompare, useCompare } from "@/lib/quote";
import { getProductMeta } from "@/data/products";

export const Route = createFileRoute("/comparaison")({
  component: ComparePage,
  head: () => ({
    meta: [
      { title: "Comparaison produits — R2R Medical" },
      {
        name: "description",
        content: "Comparez plusieurs équipements médicaux avant de demander un devis R2R Medical.",
      },
    ],
  }),
});

function ComparePage() {
  const compare = useCompare();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/catalogue"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Retour au catalogue
      </Link>

      <div className="mt-6">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Comparaison</h1>
        <p className="mt-2 text-muted-foreground">
          Comparez jusqu'à 4 produits avant de préparer votre demande de devis.
        </p>
      </div>

      {compare.products.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            icon={GitCompare}
            eyebrow="Comparaison"
            title="Aucun produit à comparer"
            description="Ajoutez jusqu'à 4 produits depuis le catalogue pour comparer catégorie, usage, disponibilité et prix avant de préparer votre devis."
          >
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/catalogue"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
              >
                <Search className="h-4 w-4" /> Explorer le catalogue
              </Link>
              <Link
                to="/catalogue"
                search={{ q: "diagnostic" }}
                className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-semibold hover:text-primary"
              >
                Produits diagnostic
              </Link>
            </div>
          </EmptyState>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-left">
                <th className="w-44 p-4 font-semibold">Critère</th>
                {compare.products.map((product) => (
                  <th key={product.slug} className="p-4 align-top">
                    <Link
                      to="/produit/$slug"
                      params={{ slug: product.slug }}
                      className="font-display text-base font-bold hover:text-primary"
                    >
                      {product.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Catégorie", (slug: string) => compare.products.find((p) => p.slug === slug)?.category ?? ""],
                ["Type", (slug: string) => getProductMeta(compare.products.find((p) => p.slug === slug)!).productType],
                ["Usage", (slug: string) => getProductMeta(compare.products.find((p) => p.slug === slug)!).useCase],
                ["Disponibilité", (slug: string) => getProductMeta(compare.products.find((p) => p.slug === slug)!).availability],
                ["Prix", (slug: string) => {
                  const product = compare.products.find((p) => p.slug === slug)!;
                  return product.price ? `${product.price} MAD` : "Sur devis";
                }],
              ].map(([label, getValue]) => (
                <tr key={label as string} className="border-b border-border last:border-b-0">
                  <td className="p-4 font-semibold text-muted-foreground">{label as string}</td>
                  {compare.products.map((product) => (
                    <td key={product.slug} className="p-4">{(getValue as (slug: string) => string)(product.slug)}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-4 font-semibold text-muted-foreground">Actions</td>
                {compare.products.map((product) => (
                  <td key={product.slug} className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => addToQuote(product)}
                        className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-3 text-xs font-semibold text-primary-foreground"
                      >
                        <ShoppingCart className="h-4 w-4" /> Devis
                      </button>
                      <button
                        onClick={() => removeFromCompare(product.slug)}
                        className="inline-flex h-10 items-center gap-2 rounded-xl border border-border px-3 text-xs font-semibold hover:bg-muted"
                      >
                        <Trash2 className="h-4 w-4" /> Retirer
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
