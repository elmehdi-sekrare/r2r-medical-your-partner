import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, PlayCircle, Star, XCircle } from "lucide-react";
import { ProductThumb } from "@/components/ProductThumb";
import { getProductTest } from "@/data/blog";
import { getProductBySlug } from "@/data/products";

export const Route = createFileRoute("/blog/test-produit/$slug")({
  loader: ({ params }) => {
    const test = getProductTest(params.slug);
    if (!test) throw notFound();
    const product = getProductBySlug(test.productSlug);
    return { test, product };
  },
  component: ProductTestArticlePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">Tests produit R2R</p>
      <h1 className="mt-3 font-display text-4xl font-bold">Test introuvable</h1>
      <p className="mt-4 text-muted-foreground">Ce test produit n'est pas disponible.</p>
      <Link to="/blog/test-produit" className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 font-semibold text-primary-foreground">
        Retour aux tests
      </Link>
    </div>
  ),
  head: ({ loaderData }) => {
    const test = loaderData?.test;
    const product = loaderData?.product;
    if (!test) return { meta: [{ title: "Test produit — R2R Medical" }] };

    return {
      meta: [
        { title: `${test.title} | R2R Medical` },
        { name: "description", content: test.excerpt },
        { property: "og:title", content: test.title },
        { property: "og:description", content: test.excerpt },
        product?.image ? { property: "og:image", content: product.image } : { property: "og:type", content: "article" },
      ],
    };
  },
});

function ProductTestArticlePage() {
  const { test, product } = Route.useLoaderData();

  return (
    <article className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_14%_18%,oklch(0.78_0.13_180_/_0.26),transparent_32%),radial-gradient(circle_at_86%_4%,oklch(0.62_0.15_155_/_0.22),transparent_34%),linear-gradient(180deg,oklch(0.97_0.03_195),transparent)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] grid-pattern opacity-60" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Link to="/blog/test-produit" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
          <ArrowLeft className="h-4 w-4 rtl-flip" />
          Retour aux tests produit
        </Link>

        <header className="mt-8 overflow-hidden rounded-[2rem] border border-primary/15 bg-card shadow-hero">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_430px]">
            <div className="relative overflow-hidden bg-[linear-gradient(135deg,var(--primary),oklch(0.34_0.08_210))] p-6 text-primary-foreground sm:p-8 lg:p-12">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/15" />
              <div className="absolute bottom-6 right-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                  <PlayCircle className="h-4 w-4" />
                  Test produit
                </span>
                <h1 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">{test.title}</h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-primary-foreground/75">{test.excerpt}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <InfoTile label="Score R2R" value={test.score} dark />
                  <InfoTile label="Profil test" value={test.testerProfile} dark />
                  <InfoTile label="Lecture" value={test.readTime} dark />
                </div>
              </div>
            </div>

            <div className="relative bg-[radial-gradient(circle_at_70%_20%,oklch(0.78_0.13_180_/_0.22),transparent_34%),var(--surface)] p-6 sm:p-8">
              {product ? (
                <ProductThumb product={product} className="aspect-square rounded-3xl border border-border bg-white shadow-elevated" imageClassName="p-8" />
              ) : (
                <div className="aspect-square rounded-3xl border border-border bg-muted" />
              )}
              <div className="absolute bottom-10 left-10 rounded-2xl bg-card/90 px-4 py-3 shadow-soft backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Produit testé</p>
                <p className="mt-1 max-w-52 truncate font-display text-lg font-bold">{product?.name ?? "Produit R2R"}</p>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-[2rem] border border-primary/20 bg-foreground shadow-hero">
              <div className="border-b border-white/10 bg-foreground px-5 py-4 text-white">
                <p className="flex items-center gap-2 text-sm font-bold">
                  <PlayCircle className="h-4 w-4" />
                  {test.videoTitle}
                </p>
              </div>
              {test.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${test.videoId}`}
                  title={test.videoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="aspect-video w-full"
                />
              ) : (
                <div className="grid aspect-video place-items-center bg-[radial-gradient(circle_at_50%_35%,rgba(0,132,126,0.45),transparent_42%),linear-gradient(135deg,#052629,#0b3b3d)] p-8 text-center text-white">
                  <div>
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/15 text-white shadow-soft">
                      <PlayCircle className="h-8 w-8" />
                    </span>
                    <h2 className="mt-5 font-display text-2xl font-bold">{test.videoTitle}</h2>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/75">
                      Ajoutez ici l'identifiant YouTube officiel R2R pour afficher la vidéo de démonstration directement dans l'article.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <section className="rounded-[2rem] border border-border bg-card p-6 shadow-elevated sm:p-8">
              <h2 className="font-display text-2xl font-bold">Verdict rapide</h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">{test.verdict}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {test.testedFor.map((item) => (
                  <span key={item} className="rounded-full border border-primary/15 bg-primary-soft px-3 py-1.5 text-xs font-bold text-primary">
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <div className="grid gap-6 md:grid-cols-2">
              <section className="rounded-[1.75rem] border border-primary/15 bg-card p-6 shadow-soft">
                <h2 className="flex items-center gap-2 font-display text-xl font-bold">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Points forts
                </h2>
                <ul className="mt-5 space-y-3">
                  {test.strengths.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-[1.75rem] border border-border bg-surface p-6 shadow-soft">
                <h2 className="flex items-center gap-2 font-display text-xl font-bold">
                  <XCircle className="h-5 w-5 text-muted-foreground" />
                  À vérifier
                </h2>
                <ul className="mt-5 space-y-3">
                  {test.limits.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {test.sections.map((section) => (
              <section key={section.title} className="rounded-[1.75rem] border border-border bg-card p-6 shadow-soft sm:p-8">
                <h2 className="font-display text-2xl font-bold">{section.title}</h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="leading-8 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.75rem] border border-primary/20 bg-card p-6 shadow-elevated">
              <Star className="h-6 w-6 text-primary" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-primary">Note du test</p>
              <p className="mt-1 font-display text-5xl font-bold">{test.score}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{test.verdict}</p>
            </div>

            {product ? (
              <Link to="/produit/$slug" params={{ slug: product.slug }} className="block rounded-[1.75rem] border border-border bg-surface p-6 transition-colors hover:border-primary/40">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Produit testé</p>
                <p className="mt-2 font-display text-xl font-bold">{product.name}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Voir la fiche produit <ArrowRight className="h-4 w-4 rtl-flip" />
                </span>
              </Link>
            ) : null}

            <Link to="/contact" className="block rounded-[1.75rem] border border-primary/20 bg-primary-soft p-6">
              <MessageCircle className="h-6 w-6 text-primary" />
              <p className="mt-3 font-display text-xl font-bold">Demander un avis R2R</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Envoyez votre besoin et recevez une orientation avant devis.</p>
            </Link>
          </aside>
        </section>
      </div>
    </article>
  );
}

function InfoTile({ label, value, dark = false }: { label: string; value: string; dark?: boolean }) {
  return (
    <div className={dark ? "rounded-2xl border border-white/15 bg-white/10 p-4" : "rounded-2xl border border-border bg-surface p-4"}>
      <p className={dark ? "text-[10px] font-bold uppercase tracking-wider text-primary-foreground/60" : "text-[10px] font-bold uppercase tracking-wider text-muted-foreground"}>{label}</p>
      <p className={dark ? "mt-1 text-sm font-bold text-primary-foreground" : "mt-1 text-sm font-bold text-foreground"}>{value}</p>
    </div>
  );
}
