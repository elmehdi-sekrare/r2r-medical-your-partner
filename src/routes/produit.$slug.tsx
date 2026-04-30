import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, MessageCircle, Check, ChevronRight } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, PRODUCTS, getCategory, getProductBySlug, getProductsByCategory } from "@/data/products";
import { ProductCard, ProductImageFallback } from "@/components/ProductCard";
import { openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/produit/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-bold">Produit introuvable</h1>
      <p className="mt-4 text-muted-foreground">Ce produit n'existe pas dans notre catalogue.</p>
      <Link to="/catalogue" className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-primary-foreground font-medium">
        Retour au catalogue
      </Link>
    </div>
  ),
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Produit — R2R Medical" }] };
    return {
      meta: [
        { title: `${p.name} | R2R Medical Maroc` },
        {
          name: "description",
          content: `${p.name} — ${p.category}. Disponible chez R2R Medical, votre fournisseur d'équipements médicaux au Maroc. Devis WhatsApp.`,
        },
        { property: "og:title", content: `${p.name} | R2R Medical` },
        { property: "og:image", content: p.image },
        { property: "og:type", content: "product" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            image: p.image,
            category: p.category,
            sku: p.slug,
            brand: { "@type": "Brand", name: "R2R Medical" },
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              priceCurrency: "MAD",
              seller: { "@type": "Organization", name: "R2R Medical" },
            },
          }),
        },
      ],
    };
  },
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const cat = getCategory(product.categorySlug);
  const [imgErr, setImgErr] = useState(false);
  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const description = `Le ${product.name} est un dispositif médical professionnel de haute qualité, conçu pour les établissements de santé et professionnels médicaux. Disponible auprès de R2R Medical, votre fournisseur de confiance au Maroc.`;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 flex-wrap">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/catalogue" className="hover:text-primary">Catalogue</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/catalogue" search={{ category: product.categorySlug }} className="hover:text-primary">{cat?.name}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="relative aspect-square rounded-3xl bg-surface border border-border overflow-hidden shadow-soft">
            {!imgErr && product.image ? (
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={() => setImgErr(true)}
                className="w-full h-full object-contain p-8"
              />
            ) : (
              <ProductImageFallback categorySlug={product.categorySlug} />
            )}
            <a
              href={product.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-card/95 backdrop-blur border border-border text-xs font-medium hover:bg-card"
            >
              Voir sur le site original <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="inline-flex self-start items-center px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-semibold uppercase tracking-wider">
              {cat?.name}
            </span>
            <h1 className="mt-4 font-display text-3xl md:text-4xl font-bold leading-tight tracking-tight">
              {product.name}
            </h1>
            <div className="mt-4 h-px bg-border" />
            <p className="mt-6 text-muted-foreground leading-relaxed">{description}</p>

            <dl className="mt-8 grid grid-cols-2 gap-4">
              {[
                { k: "Catégorie", v: cat?.name },
                { k: "Référence", v: product.slug },
                { k: "Disponibilité", v: "En stock" },
                { k: "Livraison", v: "Maroc" },
              ].map(({ k, v }) => (
                <div key={k} className="p-4 rounded-xl bg-surface border border-border">
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{k}</dt>
                  <dd className="mt-1 text-sm font-medium truncate">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex items-center gap-2 text-sm text-success">
              <Check className="h-4 w-4" /> Disponible — devis instantané sur WhatsApp
            </div>

            {/* CTA */}
            <div className="mt-auto pt-8 grid gap-3">
              <button
                onClick={() => openWhatsApp(product.name)}
                className="inline-flex items-center justify-center gap-2 h-14 px-6 rounded-2xl bg-whatsapp text-whatsapp-foreground font-bold text-base shadow-elevated hover:shadow-hero transition-shadow"
              >
                <MessageCircle className="h-5 w-5" /> Commander via WhatsApp
              </button>
              <Link
                to="/catalogue"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl border border-border text-sm font-medium hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4" /> Retour au catalogue
              </Link>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold mb-6">Produits similaires</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
