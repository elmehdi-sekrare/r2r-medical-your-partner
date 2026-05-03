import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, PlayCircle, Star, Users } from "lucide-react";
import { BlogNav } from "@/components/BlogNav";
import { ProductThumb } from "@/components/ProductThumb";
import { PRODUCT_TESTS } from "@/data/blog";
import { getProductBySlug } from "@/data/products";

export const Route = createFileRoute("/blog/test-produit")({
  component: ProductTestsPage,
  head: () => ({
    meta: [
      { title: "Tests produit — Blog R2R Medical" },
      {
        name: "description",
        content: "Tests produit R2R Medical : essais, avis pratiques et points de contrôle pour choisir le bon équipement médical.",
      },
    ],
  }),
});

function ProductTestsPage() {
  const location = useLocation();

  if (location.pathname !== "/blog/test-produit") {
    return <Outlet />;
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(circle_at_16%_18%,oklch(0.65_0.18_250_/_0.28),transparent_34%),radial-gradient(circle_at_85%_16%,oklch(0.55_0.16_260_/_0.24),transparent_32%),linear-gradient(180deg,oklch(0.97_0.03_255),transparent)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] grid-pattern opacity-60" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-10 overflow-hidden rounded-[2rem] border border-primary/15 bg-[linear-gradient(135deg,var(--primary),oklch(0.35_0.14_260))] p-8 text-primary-foreground shadow-hero md:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider">
                <PlayCircle className="h-4 w-4" />
                Tests produit R2R
              </span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl">Essais terrain, vidéos et avis pratiques.</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-primary-foreground/75">
                Une lecture plus concrète des équipements médicaux : usage, points forts, limites, produit lié et vidéo de démonstration.
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-wider text-primary-foreground/70">Bibliothèque test</p>
              <p className="mt-2 font-display text-5xl font-bold">{PRODUCT_TESTS.length}</p>
              <p className="mt-2 text-sm leading-6 text-primary-foreground/70">fiches produit prêtes à être enrichies avec vos vidéos officielles R2R.</p>
            </div>
          </div>
        </section>

        <BlogNav />

        <section className="mb-10 rounded-[2rem] border border-border bg-card/85 p-5 shadow-elevated backdrop-blur sm:p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: Users, value: "Usage réel", label: "lecture terrain et besoin client" },
              { icon: Star, value: "Score clair", label: "verdict rapide avant devis" },
              { icon: PlayCircle, value: "Vidéo intégrée", label: "lecteur YouTube dans chaque test" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.value} className="rounded-2xl border border-primary/10 bg-surface p-5">
                  <Icon className="h-5 w-5 text-primary" />
                  <p className="mt-3 font-display text-xl font-bold">{item.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PRODUCT_TESTS.map((test, index) => {
            const product = getProductBySlug(test.productSlug);

            return (
              <motion.article
                key={test.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "80px" }}
                transition={{ delay: index * 0.04 }}
                className="group overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
              >
                <Link to="/blog/test-produit/$slug" params={{ slug: test.slug }} className="flex h-full flex-col">
                  <div className="relative overflow-hidden bg-[radial-gradient(circle_at_70%_20%,oklch(0.65_0.18_250_/_0.22),transparent_34%),var(--surface)] p-4">
                    <div className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-foreground/90 text-primary-foreground shadow-soft">
                      <PlayCircle className="h-5 w-5" />
                    </div>
                    {product ? (
                      <ProductThumb product={product} className="aspect-[4/3] rounded-2xl border border-border bg-white shadow-soft" imageClassName="p-5 transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="aspect-[4/3] rounded-2xl border border-border bg-muted" />
                    )}
                    <span className="absolute left-7 top-7 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-soft">
                      {test.score}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1 font-semibold text-primary">
                        <PlayCircle className="h-3.5 w-3.5" />
                        Test produit
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(test.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                    <h2 className="mt-3 font-display text-xl font-bold leading-snug transition-colors group-hover:text-primary">{test.title}</h2>
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">{test.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <span className="text-xs font-semibold text-muted-foreground">{test.readTime}</span>
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                        Voir le test <ArrowRight className="h-4 w-4 rtl-flip" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
