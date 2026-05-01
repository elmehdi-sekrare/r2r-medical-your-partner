import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, getCategory, getProductsByCategory } from "@/data/products";
import { getIcon } from "@/lib/icon-map";
import { openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/categorie/$slug")({
  loader: ({ params }) => {
    const category = getCategory(params.slug);
    if (!category) throw notFound();
    return {
      category,
      products: getProductsByCategory(params.slug),
      siblingCategories: CATEGORIES.filter((item) => item.slug !== params.slug).slice(0, 4),
    };
  },
  component: CategorySeoPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-bold">Catégorie introuvable</h1>
      <p className="mt-4 text-muted-foreground">Cette catégorie n'existe pas dans notre catalogue.</p>
      <Link
        to="/categories"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
      >
        Voir les catégories
      </Link>
    </div>
  ),
  head: ({ loaderData }) => {
    const category = loaderData?.category;
    if (!category) return { meta: [{ title: "Catégorie — R2R Medical" }] };
    return {
      meta: [
        { title: `${category.name} au Maroc — R2R Medical` },
        {
          name: "description",
          content: `${category.description} Découvrez ${category.count} produits ${category.name} chez R2R Medical Maroc. Devis WhatsApp rapide.`,
        },
        { property: "og:title", content: `${category.name} | R2R Medical` },
        { property: "og:description", content: category.description },
      ],
    };
  },
});

function CategorySeoPage() {
  const { category, products, siblingCategories } = Route.useLoaderData();
  const Icon = getIcon(category.icon);
  const priced = products.filter((product) => product.price).slice(0, 4);
  const popular = products.slice(0, 8);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 rounded-3xl border border-border bg-card p-8 shadow-soft lg:grid-cols-[1fr_320px]">
        <div>
          <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-soft">
            <Icon className="h-7 w-7" />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-primary">
            Catégorie R2R Medical
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
            {category.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {category.description} R2R Medical accompagne les cliniques, hôpitaux,
            cabinets et professionnels de santé au Maroc avec des demandes de devis rapides.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/catalogue"
              search={{ category: category.slug }}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-soft"
            >
              Voir les {products.length} produits <ArrowRight className="rtl-flip h-4 w-4" />
            </Link>
            <button
              onClick={() => openWhatsApp(category.name)}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-whatsapp px-6 font-semibold text-whatsapp-foreground shadow-soft"
            >
              <MessageCircle className="h-4 w-4" /> Demander un devis
            </button>
          </div>
        </div>
        <aside className="rounded-2xl bg-surface p-5">
          <h2 className="font-display text-xl font-bold">Informations</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Produits</dt>
              <dd className="font-semibold">{products.length}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Prix affichés</dt>
              <dd className="font-semibold">{products.filter((product) => product.price).length}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Devis</dt>
              <dd className="font-semibold">WhatsApp</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Livraison</dt>
              <dd className="font-semibold">Maroc</dd>
            </div>
          </dl>
        </aside>
      </section>

      {priced.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Produits avec prix affiché</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {priced.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold">Produits populaires dans cette catégorie</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-display text-2xl font-bold">Autres catégories médicales</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {siblingCategories.map((item) => (
            <Link
              key={item.slug}
              to="/categorie/$slug"
              params={{ slug: item.slug }}
              className="rounded-xl border border-border bg-card p-4 text-sm font-semibold hover:border-primary"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
