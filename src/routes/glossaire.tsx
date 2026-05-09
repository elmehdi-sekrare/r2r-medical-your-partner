import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GLOSSARY } from "@/data/glossary";
import { canonical, seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/glossaire")({
  head: () => ({
    meta: seoMeta({
      title: "Glossaire médical — R2R Medical",
      description: "Dictionnaire des termes du matériel médical professionnel : anesthésie, oxygénothérapie, diagnostic, orthopédie. Définitions claires pour soignants et acheteurs.",
    }),
    links: canonical("/glossaire"),
  }),
  component: GlossairePage,
});

function GlossairePage() {
  const [q, setQ] = useState("");

  const grouped = useMemo(() => {
    const filtered = GLOSSARY.filter(
      (e) =>
        !q.trim() ||
        e.term.toLowerCase().includes(q.toLowerCase()) ||
        e.short.toLowerCase().includes(q.toLowerCase()),
    );
    const map = new Map<string, typeof GLOSSARY>();
    filtered
      .sort((a, b) => a.term.localeCompare(b.term, "fr"))
      .forEach((e) => {
        const letter = e.term[0].toUpperCase();
        if (!map.has(letter)) map.set(letter, []);
        map.get(letter)!.push(e);
      });
    return Array.from(map.entries());
  }, [q]);

  const letters = grouped.map(([l]) => l);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Glossaire médical" }]} />

      <div className="mb-8 flex items-start gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
          <BookOpen className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight">Glossaire médical</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {GLOSSARY.length} termes essentiels du matériel médical professionnel, expliqués simplement.
          </p>
        </div>
      </div>

      <div className="sticky top-16 z-20 -mx-4 mb-6 bg-background/85 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:border-border sm:px-4 sm:shadow-soft">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher un terme…"
              className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {letters.map((l) => (
            <a
              key={l}
              href={`#letter-${l}`}
              className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {l}
            </a>
          ))}
        </div>
      </div>

      {grouped.length === 0 && (
        <p className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          Aucun terme ne correspond à votre recherche.
        </p>
      )}

      <div className="space-y-10">
        {grouped.map(([letter, entries]) => (
          <section key={letter} id={`letter-${letter}`}>
            <h2 className="font-display text-3xl font-bold text-primary">{letter}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {entries.map((e, i) => (
                <motion.article
                  key={e.term}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:border-primary/30 hover:shadow-elevated transition-all"
                >
                  <h3 className="font-display text-lg font-bold">{e.term}</h3>
                  <p className="mt-1 text-sm font-semibold text-primary">{e.short}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.long}</p>
                  {e.categorySlug && (
                    <Link
                      to="/categorie/$slug"
                      params={{ slug: e.categorySlug }}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      Voir produits associés →
                    </Link>
                  )}
                </motion.article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
