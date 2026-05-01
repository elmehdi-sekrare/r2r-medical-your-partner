import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, Search } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { useFavorites } from "@/lib/quote";

export const Route = createFileRoute("/favoris")({
  component: FavoritesPage,
  head: () => ({
    meta: [
      { title: "Favoris — R2R Medical" },
      {
        name: "description",
        content: "Retrouvez vos produits médicaux favoris chez R2R Medical.",
      },
    ],
  }),
});

function FavoritesPage() {
  const favorites = useFavorites();
  const products = PRODUCTS.filter((product) => favorites.slugs.includes(product.slug));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/catalogue"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Retour au catalogue
      </Link>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Favoris</h1>
          <p className="mt-2 text-muted-foreground">
            {products.length} produit{products.length > 1 ? "s" : ""} sauvegardé
            {products.length > 1 ? "s" : ""}.
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            icon={Heart}
            eyebrow="Favoris"
            title="Aucun favori pour le moment"
            description="Sauvegardez les produits importants pour les retrouver rapidement avant de demander un devis ou comparer plusieurs références."
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
                search={{ q: "fauteuil" }}
                className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-semibold hover:text-primary"
              >
                Voir les fauteuils
              </Link>
            </div>
          </EmptyState>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
