import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Building2, Quote, Star, MapPin, TrendingUp, Heart } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { canonical, seoMeta } from "@/lib/seo";

export const Route = createFileRoute("/references")({
  head: () => ({
    meta: seoMeta({
      title: "Cas clients & Références — R2R Medical",
      description: "Cliniques, hôpitaux et professionnels de santé qui nous font confiance partout au Maroc. Témoignages et études de cas.",
    }),
    links: canonical("/references"),
  }),
  component: ReferencesPage,
});

const KPIS = [
  { icon: Building2, value: "120+", label: "Établissements clients" },
  { icon: MapPin, value: "12", label: "Régions desservies" },
  { icon: Heart, value: "412", label: "Références au catalogue" },
  { icon: TrendingUp, value: "98 %", label: "Taux de satisfaction" },
];

const CASES = [
  {
    name: "Clinique Al Madina",
    city: "Casablanca",
    sector: "Clinique privée multidisciplinaire",
    quote: "R2R Medical a réapprovisionné notre service d'urgence en 24 h pendant un pic d'activité. Réactivité exceptionnelle.",
    person: "Dr. Y. — Directeur médical",
    metric: "Livraison J+1",
  },
  {
    name: "Cabinet Pédiatrie Atlas",
    city: "Marrakech",
    sector: "Cabinet libéral",
    quote: "Conseil produit excellent : on m'a aiguillé vers un nébuliseur silencieux parfait pour les enfants.",
    person: "Dr. S.",
    metric: "Conseil personnalisé",
  },
  {
    name: "CHR Régional",
    city: "Fès",
    sector: "Hôpital public",
    quote: "Dossier administratif complet livré en 1 h, ce qui nous a permis de respecter les délais de l'appel d'offres.",
    person: "Service achats",
    metric: "Marché public 2024",
  },
  {
    name: "EHPAD Bien-Être",
    city: "Rabat",
    sector: "Établissement personnes âgées",
    quote: "La gamme orthopédie et mobilité couvre 100 % de nos besoins. Tarifs négociés justes.",
    person: "Direction des soins",
    metric: "Contrat annuel",
  },
  {
    name: "Cabinet Dentaire Zenith",
    city: "Tanger",
    sector: "Cabinet dentaire",
    quote: "Stérilisation, gants, masques — tout livré chaque mois sans rupture. Un vrai partenaire.",
    person: "Dr. K.",
    metric: "Réassort mensuel",
  },
  {
    name: "Polyclinique Sud",
    city: "Agadir",
    sector: "Polyclinique privée",
    quote: "Devis WhatsApp ultra rapide, c'est devenu notre canal principal pour les commandes urgentes.",
    person: "Pharmacienne hospitalière",
    metric: "Réponse < 15 min",
  },
];

export default function ReferencesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Cas clients" }]} />

      <header className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
          <Star className="h-3.5 w-3.5" /> Ils nous font confiance
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Des professionnels de santé partout au Maroc
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Cliniques, hôpitaux, cabinets, EHPAD — R2R Medical accompagne plus de 120 établissements de santé dans 12 régions.
        </p>
      </header>

      <section className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {KPIS.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft"
          >
            <k.icon className="mx-auto h-6 w-6 text-primary" />
            <div className="mt-3 font-display text-3xl font-bold text-primary">{k.value}</div>
            <p className="mt-1 text-xs font-semibold text-muted-foreground">{k.label}</p>
          </motion.div>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-bold">Témoignages</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06 }}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft hover:border-primary/30 hover:shadow-elevated transition-all"
            >
              <Quote className="h-7 w-7 text-primary/20" />
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">"{c.quote}"</p>
              <div className="mt-4 border-t border-border pt-4">
                <p className="font-display font-bold">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.sector} • {c.city}</p>
                <p className="mt-2 text-xs italic text-muted-foreground">— {c.person}</p>
                <span className="mt-3 inline-block rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold text-primary">
                  {c.metric}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-10 text-primary-foreground">
        <div className="grid gap-6 md:grid-cols-[1.5fr_auto] md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold">Rejoignez nos clients satisfaits</h2>
            <p className="mt-2 text-primary-foreground/85">
              Conseils personnalisés, devis rapide, livraison nationale. Parlons de votre besoin.
            </p>
          </div>
          <a
            href="/devis"
            className="inline-flex h-12 items-center justify-center rounded-full bg-card px-6 text-sm font-semibold text-primary shadow-soft hover:bg-card/90"
          >
            Demander un devis
          </a>
        </div>
      </section>
    </div>
  );
}
