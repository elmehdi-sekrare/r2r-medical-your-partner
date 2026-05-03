import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, ClipboardList, HelpCircle, MessageCircle, PackageCheck, Search, ShieldCheck, Truck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, getCategory, getProductMeta, getProductsByCategory } from "@/data/products";
import { getIcon } from "@/lib/icon-map";
import { canonical, seoMeta } from "@/lib/seo";
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
      meta: seoMeta({
        title: `${category.name} au Maroc | R2R Medical`,
        description: `${category.description} Découvrez ${category.count} produits chez R2R Medical Maroc avec devis WhatsApp rapide.`,
        path: `/categorie/${category.slug}`,
      }),
      links: canonical(`/categorie/${category.slug}`),
    };
  },
});

function CategorySeoPage() {
  const { category, products, siblingCategories } = Route.useLoaderData();
  const Icon = getIcon(category.icon);
  const priced = products.filter((product) => product.price).slice(0, 4);
  const popular = products.slice(0, 8);
  const productTypes = Array.from(new Set(products.map((product) => getProductMeta(product).productType))).slice(0, 6);
  const useCases = Array.from(new Set(products.map((product) => getProductMeta(product).useCase))).slice(0, 5);
  const quoteRequired = products.filter((product) => !product.price).length;
  const checklist = [
    "Confirmer le modèle, les dimensions et les accessoires nécessaires",
    "Préciser la quantité souhaitée et la ville de livraison",
    "Demander disponibilité, délai et conditions de devis avant validation",
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-hero">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,oklch(0.93_0.06_255),transparent_35%),radial-gradient(circle_at_88%_12%,oklch(0.88_0.1_240),transparent_35%)]" />
        <div className="absolute inset-0 grid-pattern opacity-35" />
        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_360px] lg:p-10">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-soft">
              <Icon className="h-7 w-7" />
            </div>
            <span className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              Catégorie R2R Medical
            </span>
          </div>
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
          <div className="mt-6 flex flex-wrap gap-2">
            {productTypes.map((type) => (
              <Link
                key={type}
                to="/catalogue"
                search={{ category: category.slug, type }}
                className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary"
              >
                {type}
              </Link>
            ))}
          </div>
        </div>
        <aside className="rounded-3xl border border-border bg-background/80 p-5 shadow-soft backdrop-blur">
          <h2 className="font-display text-xl font-bold">Résumé catégorie</h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              { label: "Produits", value: products.length, icon: PackageCheck },
              { label: "Prix affichés", value: products.filter((product) => product.price).length, icon: ClipboardList },
              { label: "Sur devis", value: quoteRequired, icon: MessageCircle },
              { label: "Livraison", value: "Maroc", icon: Truck },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-card p-4">
                <item.icon className="h-5 w-5 text-primary" />
                <p className="mt-3 font-display text-2xl font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </aside>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">Guide d'achat rapide</h2>
              <p className="text-sm text-muted-foreground">Les points à confirmer avant devis.</p>
            </div>
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {checklist.map((item) => (
              <li key={item} className="rounded-2xl border border-border bg-surface p-4 text-sm leading-relaxed text-muted-foreground">
                <Check className="mb-3 h-5 w-5 text-success" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-6">
          <h2 className="font-display text-2xl font-bold">Usages couverts</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {useCases.map((useCase) => (
              <Link
                key={useCase}
                to="/catalogue"
                search={{ category: category.slug, use: useCase }}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-bold hover:border-primary hover:text-primary"
              >
                <Search className="h-3.5 w-3.5" />
                {useCase}
              </Link>
            ))}
          </div>
          <button
            onClick={() => openWhatsApp(category.name)}
            className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 text-sm font-bold text-whatsapp-foreground"
          >
            <MessageCircle className="h-4 w-4" /> Demander conseil sur cette catégorie
          </button>
        </div>
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

      <section className="mt-8 grid gap-3 md:grid-cols-3">
        {[
          {
            q: "Comment choisir dans cette catégorie ?",
            a: "Commencez par l'usage, la quantité, les dimensions ou accessoires nécessaires, puis confirmez avec R2R Medical.",
          },
          {
            q: "Les prix sont-ils tous affichés ?",
            a: "Certains produits nécessitent un devis selon disponibilité, quantité, modèle exact et ville de livraison.",
          },
          {
            q: "Puis-je commander directement ?",
            a: "Oui, le plus rapide est d'envoyer la référence ou le produit souhaité via WhatsApp.",
          },
        ].map((item) => (
          <div key={item.q} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h3 className="mt-4 font-display text-base font-bold">{item.q}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
