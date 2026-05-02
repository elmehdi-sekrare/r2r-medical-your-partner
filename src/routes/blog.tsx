import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, Clock, Tag } from "lucide-react";
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
  const location = useLocation();

  if (location.pathname !== "/blog") {
    return <Outlet />;
  }

  const featuredArticle = BLOG_ARTICLES[0];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[460px] bg-[radial-gradient(circle_at_18%_15%,oklch(0.78_0.13_180_/_0.28),transparent_32%),radial-gradient(circle_at_84%_8%,oklch(0.62_0.15_155_/_0.2),transparent_30%),linear-gradient(180deg,oklch(0.97_0.03_195),transparent)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[460px] grid-pattern opacity-60" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary">
            Blog & Ressources
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl">
            Guides médicaux pour acheter avec plus de confiance.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Des contenus courts, utiles et orientés terrain pour comparer, préparer un devis et choisir le bon équipement médical.
          </p>
        </div>

        <BlogNav />

        {/* Featured article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
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

        {/* Article grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_ARTICLES.slice(1).map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
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
