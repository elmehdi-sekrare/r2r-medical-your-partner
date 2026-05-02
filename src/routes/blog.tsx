import { useHasMounted } from "@/hooks/useHasMounted";
import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, CheckCircle2, Clock, ClipboardCheck, MessageCircle, Search, Tag } from "lucide-react";
import { BlogNav } from "@/components/BlogNav";
import { BLOG_ARTICLES } from "@/data/blog";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({
    meta: [
      { title: "Blog — R2R Medical | Guides & Conseils Équipements Médicaux" },
      { name: "description", content: "Guides d'achat, conseils d'utilisation et actualités sur les équipements médicaux professionnels au Maroc." },
      { property: "og:title", content: "Blog — R2R Medical" },
      { property: "og:description", content: "Guides et conseils pour les professionnels de santé au Maroc." },
    ],
  }),
});

function BlogPage() {
  const mounted = useHasMounted();
  const location = useLocation();

  if (location.pathname !== "/blog") {
    return <Outlet />;
  }

  const featuredArticle = BLOG_ARTICLES[0];
  const categories = Array.from(new Set(BLOG_ARTICLES.map((article) => article.category)));

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[460px] bg-[radial-gradient(circle_at_18%_15%,oklch(0.78_0.13_180_/_0.28),transparent_32%),radial-gradient(circle_at_84%_8%,oklch(0.62_0.15_155_/_0.2),transparent_30%),linear-gradient(180deg,oklch(0.97_0.03_195),transparent)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[460px] grid-pattern opacity-60" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary">
            Centre de ressources R2R
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl">
            Guides médicaux pour choisir avec plus de confiance.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Des contenus courts, utiles et orientés terrain pour comparer, préparer un devis et choisir le bon équipement médical.
          </p>
        </div>

        <BlogNav />

        <section className="mb-12 grid gap-4 rounded-[2rem] border border-primary/15 bg-card/85 p-4 shadow-elevated backdrop-blur md:grid-cols-3 md:p-5">
          {[
            { icon: ClipboardCheck, title: "Guides vérifiables", text: "Critères pratiques, usage terrain et points à confirmer avant devis." },
            { icon: Search, title: `${categories.length} thèmes`, text: categories.join(", ") },
            { icon: MessageCircle, title: "Lien direct au devis", text: "Chaque contenu oriente vers le catalogue, le contact ou le bon type de produit." },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[1.4rem] border border-border bg-surface p-5">
                <Icon className="h-5 w-5 text-primary" />
                <p className="mt-3 font-display text-lg font-bold">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </div>
            );
          })}
        </section>

        {/* Featured article */}
        <motion.article
          initial={mounted ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative mb-12 grid overflow-hidden rounded-[2rem] border border-primary/15 bg-card shadow-hero transition-all duration-300 hover:-translate-y-1 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <Link to="/blog/$slug" params={{ slug: featuredArticle.slug }} className="contents">
            <div className="relative min-h-[320px] overflow-hidden lg:min-h-[470px]">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/15 to-transparent lg:bg-gradient-to-r" />
              <div className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-white shadow-soft backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-wider opacity-80">Article premium</p>
                <p className="mt-1 font-display text-2xl font-bold">{featuredArticle.readTime}</p>
              </div>
            </div>
            <div className="relative flex flex-col justify-center overflow-hidden p-8 lg:p-12">
              <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full border border-primary/15" />
              <div className="absolute -bottom-28 right-12 h-72 w-72 rounded-full bg-primary-soft/50 blur-3xl" />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="rounded-full bg-primary-soft px-3 py-1 font-semibold text-primary">{featuredArticle.category}</span>
                  <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" /> {new Date(featuredArticle.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
                <h2 className="mt-5 font-display text-3xl font-bold leading-tight transition-colors group-hover:text-primary md:text-4xl">
                  {featuredArticle.title}
                </h2>
                <p className="mt-5 text-lg leading-8 text-muted-foreground">{featuredArticle.excerpt}</p>
                <div className="mt-8 flex items-center gap-4">
                  <span className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground shadow-soft">
                    Lire l'article <ArrowRight className="h-4 w-4 rtl-flip" />
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground"><Clock className="h-3 w-3" /> {featuredArticle.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        </motion.article>

        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Bibliothèque conseils</p>
            <h2 className="mt-2 font-display text-3xl font-bold">Articles récents</h2>
          </div>
          <Link to="/blog/test-produit" className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-bold shadow-soft hover:border-primary/30">
            Voir les tests produit <ArrowRight className="h-4 w-4 rtl-flip" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_ARTICLES.slice(1).map((article, i) => (
            <motion.article
              key={article.slug}
              initial={mounted ? { opacity: 0, y: 20 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
            >
              <Link to="/blog/$slug" params={{ slug: article.slug }} className="flex h-full flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-foreground/50 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary shadow-soft backdrop-blur">
                    {article.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> {article.readTime}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold leading-snug transition-colors group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-xs font-semibold text-muted-foreground">{new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
                      Lire <ArrowRight className="h-3.5 w-3.5 rtl-flip" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <section className="mt-16 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-border bg-card p-7 shadow-soft">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Méthode éditoriale</p>
            <h2 className="mt-3 font-display text-3xl font-bold">Un blog fait pour aider à décider.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Les articles R2R ne remplacent pas l'avis médical. Ils servent à préparer une demande claire :
              besoin, usage, quantité, accessoires, livraison et support.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              "Identifier le besoin réel avant la référence produit.",
              "Comparer les critères utiles plutôt que seulement le prix.",
              "Relier chaque conseil à une action simple : catalogue, devis ou contact.",
            ].map((point) => (
              <div key={point} className="rounded-[1.5rem] border border-primary/15 bg-primary-soft p-5">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <p className="mt-4 text-sm font-semibold leading-6">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-20 overflow-hidden rounded-[2rem] border border-primary/15 bg-[linear-gradient(135deg,var(--primary),oklch(0.34_0.08_210))] p-8 text-center text-primary-foreground shadow-hero md:p-14">
          <BookOpen className="mx-auto h-10 w-10 opacity-90" />
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
            Recevoir les prochains guides R2R
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-primary-foreground/75">
            Nouveaux tests, conseils d'achat et contenus utiles pour mieux choisir votre matériel médical.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-primary shadow-soft"
            >
              S'inscrire <ArrowRight className="h-4 w-4 rtl-flip" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
