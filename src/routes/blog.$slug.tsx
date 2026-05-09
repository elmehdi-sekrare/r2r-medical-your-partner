import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Clock, ListChecks, MessageCircle, Tag } from "lucide-react";
import { BLOG_ARTICLES, getBlogArticle, type BlogArticle } from "@/data/blog";

type BlogSection = BlogArticle["sections"][number];

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getBlogArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  component: BlogArticlePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">Blog R2R Medical</p>
      <h1 className="mt-3 font-display text-4xl font-bold">Article introuvable</h1>
      <p className="mt-4 text-muted-foreground">Cet article n'est pas disponible ou a été déplacé.</p>
      <Link to="/blog" className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 font-medium text-primary-foreground">
        Retour au blog
      </Link>
    </div>
  ),
  head: ({ loaderData }) => {
    const article = loaderData?.article;
    if (!article) return { meta: [{ title: "Blog — R2R Medical" }] };

    return {
      meta: [
        { title: `${article.title} | Blog R2R Medical` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:image", content: article.image },
        { property: "og:type", content: "article" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            image: article.image,
            datePublished: article.date,
            author: { "@type": "Organization", name: article.author },
            publisher: { "@type": "Organization", name: "R2R Medical" },
          }),
        },
      ],
    };
  },
});

function BlogArticlePage() {
  const { article } = Route.useLoaderData();
  const relatedArticles = BLOG_ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 3);
  const checklist = [
    "Produit ou usage recherché",
    "Quantité approximative",
    "Ville de livraison",
    "Contraintes importantes",
  ];

  return (
    <article className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_18%_18%,oklch(0.65_0.18_250_/_0.24),transparent_34%),linear-gradient(180deg,oklch(0.97_0.03_255),transparent)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] grid-pattern opacity-50" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80">
          <ArrowLeft className="h-4 w-4 rtl-flip" />
          Retour au blog
        </Link>

      <header className="mt-8 overflow-hidden rounded-[2rem] border border-primary/15 bg-card shadow-hero">
        <div className="grid lg:grid-cols-[1fr_0.9fr]">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 font-semibold text-primary">
                <Tag className="h-3 w-3" />
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime}
              </span>
            </div>

            <h1 className="mt-5 font-display text-3xl font-bold leading-tight md:text-5xl">{article.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{article.author}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>Conseils pratiques pour professionnels et acheteurs médicaux</span>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Objectif", "Mieux choisir"],
                ["Format", "Guide pratique"],
                ["Action", "Préparer un devis"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-border bg-surface p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="mt-1 text-sm font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[280px] overflow-hidden lg:min-h-[520px]">
            <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
          </div>
        </div>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <section className="rounded-[2rem] border border-primary/15 bg-card p-6 shadow-soft sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Résumé éditorial</p>
            <p className="mt-3 text-lg leading-8 text-foreground">{article.intro}</p>
          </section>

          <section className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-2xl font-bold">À retenir</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {article.keyPoints.map((point: string) => (
                <div key={point} className="flex gap-3 rounded-2xl bg-surface p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm leading-6 text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8 space-y-8">
            {article.sections.map((section: BlogSection, index: number) => (
              <section id={`section-${index + 1}`} key={section.title} className="scroll-mt-28 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
                <h2 className="font-display text-2xl font-bold">{section.title}</h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph: string) => (
                    <p key={paragraph} className="leading-8 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-8 rounded-[2rem] border border-primary/20 bg-primary-soft p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold">Conclusion</h2>
            <p className="mt-4 leading-8 text-muted-foreground">{article.conclusion}</p>
          </section>

          <section className="mt-8 rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold">Note importante</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              Ce contenu aide à préparer une demande de matériel. Il ne remplace pas une prescription médicale,
              une validation clinique ou les recommandations du fabricant.
            </p>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Dans cet article</p>
            <div className="mt-4 space-y-3">
              {article.sections.map((section: BlogSection, index: number) => (
                <a
                  key={section.title}
                  href={`#section-${index + 1}`}
                  className="block rounded-2xl bg-surface px-4 py-3 text-sm font-semibold transition hover:text-primary"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Besoin d'un conseil ?</p>
            <h2 className="mt-2 font-display text-2xl font-bold">Parlez à R2R Medical</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Décrivez votre besoin, votre ville et les produits recherchés. L'équipe vous oriente vers le bon matériel.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 font-semibold text-primary-foreground"
            >
              Demander conseil <MessageCircle className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-3xl border border-primary/15 bg-primary-soft p-6">
            <ListChecks className="h-6 w-6 text-primary" />
            <p className="mt-3 font-display text-xl font-bold">Avant de contacter R2R</p>
            <div className="mt-4 space-y-3">
              {checklist.map((item) => (
                <div key={item} className="flex gap-3 text-sm font-semibold">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {article.relatedCategorySlug ? (
            <Link
              to="/catalogue"
              search={{ category: article.relatedCategorySlug }}
              className="block rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-primary/40"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Catalogue lié</p>
              <p className="mt-2 font-display text-xl font-bold">Voir les produits associés</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Ouvrir le catalogue <ArrowRight className="h-4 w-4 rtl-flip" />
              </span>
            </Link>
          ) : null}

          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Autres articles</p>
            <div className="mt-4 space-y-4">
              {relatedArticles.map((item) => (
                <Link key={item.slug} to="/blog/$slug" params={{ slug: item.slug }} className="group block">
                  <p className="text-sm font-semibold leading-snug group-hover:text-primary">{item.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
      </div>
    </article>
  );
}
