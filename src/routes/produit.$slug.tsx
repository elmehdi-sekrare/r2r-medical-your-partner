import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  ClipboardList,
  ExternalLink,
  FileCheck2,
  Heart,
  HelpCircle,
  GitCompare,
  Headphones,
  MessageCircle,
  Ruler,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getCategory, getProductBySlug, getProductMeta, getProductsByCategory } from "@/data/products";
import { ProductCard, ProductImageFallback } from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addToQuote, recordRecentlyViewed, toggleCompare, toggleFavorite, useCompare, useFavorites } from "@/lib/quote";
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
  const favorites = useFavorites();
  const compare = useCompare();
  const favorite = favorites.isFavorite(product);
  const compared = compare.isCompared(product);
  const meta = getProductMeta(product);
  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  useEffect(() => {
    recordRecentlyViewed(product);
  }, [product]);

  const description = `Le ${product.name} est un dispositif médical professionnel de haute qualité, conçu pour les établissements de santé et professionnels médicaux. Disponible auprès de R2R Medical, votre fournisseur de confiance au Maroc.`;
  const technicalSpecs = [
    { label: "Famille produit", value: meta.productType },
    { label: "Usage principal", value: meta.useCase },
    { label: "Catégorie", value: product.category },
    { label: "Référence catalogue", value: product.slug },
    { label: "Disponibilité", value: meta.availability },
    { label: "Prix", value: product.price ? `${product.price} MAD` : "Sur devis" },
  ];
  const purchaseChecks = [
    "Confirmer la disponibilité actuelle avant validation",
    "Vérifier les dimensions, accessoires et compatibilités",
    "Préciser la ville de livraison et le délai souhaité",
    "Demander une fiche technique si le produit équipe un service médical",
  ];

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
          <div className="flex flex-col lg:sticky lg:top-24 lg:self-start">
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
                { k: "Type", v: meta.productType },
                { k: "Usage", v: meta.useCase },
                { k: "Marque", v: meta.brand },
                { k: "Référence", v: product.slug },
                { k: "Disponibilité", v: meta.availability },
                { k: "Prix", v: product.price ? `${product.price} MAD` : "Sur devis" },
                { k: "Livraison", v: "Tout le Maroc" },
              ].map(({ k, v }) => (
                <div key={k} className="p-4 rounded-xl bg-surface border border-border">
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{k}</dt>
                  <dd className="mt-1 text-sm font-medium truncate">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex items-center gap-2 text-sm text-success">
              <Check className="h-4 w-4" /> {meta.availability} — devis instantané sur WhatsApp
            </div>

            {/* CTA */}
            <div className="mt-8 grid gap-3 rounded-3xl border border-border bg-card p-3 shadow-elevated">
              <button
                onClick={() => addToQuote(product)}
                className="inline-flex items-center justify-center gap-2 h-14 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-base shadow-elevated hover:shadow-hero transition-shadow"
              >
                <ShoppingCart className="h-5 w-5" /> Ajouter au devis
              </button>
              <button
                onClick={() => openWhatsApp(product.name)}
                className="inline-flex items-center justify-center gap-2 h-14 px-6 rounded-2xl bg-whatsapp text-whatsapp-foreground font-bold text-base shadow-elevated hover:shadow-hero transition-shadow"
              >
                <MessageCircle className="h-5 w-5" /> Commander via WhatsApp
              </button>
              <button
                onClick={() => toggleFavorite(product)}
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl border border-border text-sm font-medium hover:bg-muted"
              >
                <Heart className={`h-4 w-4 ${favorite ? "fill-primary text-primary" : ""}`} />
                {favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              </button>
              <button
                onClick={() => toggleCompare(product)}
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl border border-border text-sm font-medium hover:bg-muted"
              >
                <GitCompare className={`h-4 w-4 ${compared ? "text-primary" : ""}`} />
                {compared ? "Retirer du comparateur" : "Ajouter au comparateur"}
              </button>
            </div>
          </div>
        </div>

        <section className="mt-16 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: ClipboardList,
              title: "Fiche produit",
              text: "Référence claire, catégorie, usage et type de dispositif pour préparer votre demande.",
            },
            {
              icon: Truck,
              title: "Livraison Maroc",
              text: "Demande de disponibilité et livraison traitées selon la ville et la quantité.",
            },
            {
              icon: Headphones,
              title: "Accompagnement",
              text: "L'équipe R2R Medical vous aide à confirmer le bon modèle avant commande.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-display text-lg font-bold">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-border bg-card p-4 shadow-soft sm:p-6">
          <Tabs defaultValue="details">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Fiche commerciale
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
                  Informations utiles avant devis
                </h2>
              </div>
              <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-2xl bg-surface p-1 md:w-auto">
                <TabsTrigger value="details" className="h-10 rounded-xl px-4">Détails</TabsTrigger>
                <TabsTrigger value="commande" className="h-10 rounded-xl px-4">Avant commande</TabsTrigger>
                <TabsTrigger value="faq" className="h-10 rounded-xl px-4">FAQ</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="details" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                      <Ruler className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold">Caractéristiques principales</h3>
                      <p className="text-sm text-muted-foreground">Résumé clair pour préparer un devis ou comparer.</p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {technicalSpecs.map((item) => (
                      <div key={item.label} className="rounded-xl border border-border bg-surface p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="mt-1 text-sm font-semibold">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-primary/15 bg-primary-soft/40 p-5">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-display text-lg font-bold">Conseil professionnel</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Confirmez compatibilité, dimensions, utilisation prévue et disponibilité avec
                    notre équipe avant validation du devis.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="commande" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-success/10 text-success">
                      <FileCheck2 className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold">Checklist avant commande</h3>
                  </div>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {purchaseChecks.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <Headphones className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-display text-lg font-bold">Besoin d'une confirmation ?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Envoyez le nom du produit et votre ville. L'équipe confirme les détails utiles.
                  </p>
                  <button
                    onClick={() => openWhatsApp(product.name)}
                    className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 text-sm font-bold text-whatsapp-foreground"
                  >
                    <MessageCircle className="h-4 w-4" /> Confirmer avec un conseiller
                  </button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="faq" className="mt-6">
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  {
                    q: "Le produit est-il disponible ?",
                    a: "La disponibilité est confirmée par WhatsApp selon la quantité et la ville.",
                  },
                  {
                    q: "Puis-je recevoir une fiche technique ?",
                    a: "Oui, l'équipe peut confirmer les détails techniques et documents disponibles.",
                  },
                  {
                    q: "Comment commander ?",
                    a: "Ajoutez au devis ou contactez directement R2R Medical via WhatsApp.",
                  },
                ].map((item) => (
                  <div key={item.q} className="rounded-xl border border-border bg-surface p-4">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
                      <HelpCircle className="h-4 w-4" />
                    </div>
                    <h3 className="mt-4 font-display text-sm font-bold">{item.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

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
