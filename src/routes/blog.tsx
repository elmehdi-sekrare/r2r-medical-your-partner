import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, Clock, Tag } from "lucide-react";

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

const ARTICLES = [
  {
    slug: "guide-concentrateur-oxygene",
    title: "Guide complet : Comment choisir un concentrateur d'oxygène",
    excerpt: "Critères essentiels pour sélectionner le bon concentrateur d'oxygène selon vos besoins cliniques : débit, bruit, autonomie et portabilité.",
    category: "Guide d'achat",
    date: "2026-04-15",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop",
  },
  {
    slug: "entretien-fauteuil-roulant",
    title: "Entretien d'un fauteuil roulant : les bonnes pratiques",
    excerpt: "Prolongez la durée de vie de vos fauteuils roulants avec ces conseils d'entretien régulier et de maintenance préventive.",
    category: "Conseils",
    date: "2026-04-08",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
  },
  {
    slug: "normes-sterilisation-2026",
    title: "Normes de stérilisation 2026 : ce qui change pour les cliniques",
    excerpt: "Les nouvelles réglementations en matière de stérilisation et leur impact sur les équipements nécessaires dans les établissements de santé.",
    category: "Réglementation",
    date: "2026-03-22",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&h=400&fit=crop",
  },
  {
    slug: "equipement-cabinet-medical",
    title: "Équiper un cabinet médical au Maroc : liste complète",
    excerpt: "De la salle d'attente au bloc opératoire, voici la liste exhaustive des équipements indispensables pour ouvrir ou moderniser un cabinet.",
    category: "Guide d'achat",
    date: "2026-03-10",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&h=400&fit=crop",
  },
];

function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Blog & Ressources</span>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Guides & <span className="gradient-accent-text">Conseils</span> professionnels
        </h1>
        <p className="mt-4 text-muted-foreground">
          Ressources pour les professionnels de santé : guides d'achat, conseils d'utilisation et actualités du secteur médical.
        </p>
      </div>

      {/* Featured article */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative mb-12 grid overflow-hidden rounded-3xl border border-border bg-card shadow-soft lg:grid-cols-2"
      >
        <div className="relative aspect-video overflow-hidden lg:aspect-auto">
          <img
            src={ARTICLES[0].image}
            alt={ARTICLES[0].title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r" />
        </div>
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-full bg-primary-soft px-3 py-1 font-semibold text-primary">{ARTICLES[0].category}</span>
            <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" /> {new Date(ARTICLES[0].date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl group-hover:text-primary transition-colors">
            {ARTICLES[0].title}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">{ARTICLES[0].excerpt}</p>
          <div className="mt-6 flex items-center gap-4">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Lire l'article <ArrowRight className="h-4 w-4" />
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {ARTICLES[0].readTime}</span>
          </div>
        </div>
      </motion.article>

      {/* Article grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.slice(1).map((article, i) => (
          <motion.article
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-primary font-semibold"><Tag className="h-3 w-3" /> {article.category}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{article.readTime}</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Lire <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Newsletter CTA */}
      <section className="mt-20 rounded-3xl border border-border bg-surface p-8 text-center md:p-14">
        <BookOpen className="mx-auto h-10 w-10 text-primary" />
        <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
          Restez informé des nouveautés médicales
        </h2>
        <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
          Inscrivez-vous pour recevoir nos guides, promotions et actualités directement sur WhatsApp.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            to="/contact"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-soft"
          >
            S'inscrire <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
