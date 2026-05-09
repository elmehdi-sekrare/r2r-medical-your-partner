import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, FileCheck2, ShieldCheck, Stamp, Truck, ClipboardCheck, Microscope, Lock } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { canonical, seoMeta } from "@/lib/seo";
import { openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/conformite")({
  head: () => ({
    meta: seoMeta({
      title: "Conformité & Qualité — R2R Medical",
      description: "Normes CE, ISO, traçabilité, contrôle qualité et SAV de R2R Medical. Engagements pour les professionnels de santé au Maroc.",
    }),
    links: canonical("/conformite"),
  }),
  component: ConformitePage,
});

const PILLARS = [
  { icon: ShieldCheck, title: "Marquage CE", desc: "Tous nos dispositifs médicaux portent le marquage CE conformément à la réglementation en vigueur." },
  { icon: Award, title: "ISO 13485", desc: "Nos fournisseurs sont certifiés ISO 13485 (système de management de la qualité des dispositifs médicaux)." },
  { icon: ClipboardCheck, title: "Traçabilité lots", desc: "Chaque lot est tracé : numéro, date de péremption, fabricant. Documentation fournie sur demande." },
  { icon: Microscope, title: "Contrôle qualité", desc: "Inspection visuelle et fonctionnelle à réception. Échantillonnage statistique sur les consommables." },
  { icon: Stamp, title: "Réglementation MA", desc: "Conformité aux exigences du ministère de la Santé du Maroc et homologations locales." },
  { icon: Lock, title: "Confidentialité", desc: "Vos données sont traitées conformément à la loi 09-08 sur la protection des données personnelles." },
];

const SAV = [
  { title: "Garantie constructeur", text: "Nous appliquons la garantie d'origine, généralement 12 à 24 mois selon le fabricant." },
  { title: "Hotline technique", text: "Support WhatsApp 7j/7 pour vos questions techniques et SAV." },
  { title: "Pièces détachées", text: "Stock de pièces et consommables compatibles pour les équipements de notre catalogue." },
  { title: "Retour produit", text: "Demande de retour sous 48 h après réception en cas de défaut. Procédure simple via WhatsApp." },
];

export default function ConformitePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Conformité & Qualité" }]} />

      <header className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-card to-card p-8 sm:p-12">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <ShieldCheck className="h-3.5 w-3.5" /> Engagement qualité
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Conformité & qualité,<br /> au cœur du métier.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            En tant que fournisseur d'équipements médicaux, R2R Medical applique des standards stricts de conformité réglementaire et de contrôle qualité — parce que vos patients le méritent.
          </p>
        </div>
      </header>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold">Nos 6 engagements</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated transition-shadow"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-border bg-surface p-8 sm:p-10">
        <div className="flex items-center gap-3">
          <FileCheck2 className="h-6 w-6 text-primary" />
          <h2 className="font-display text-2xl font-bold">Service après-vente</h2>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {SAV.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl bg-primary p-8 text-primary-foreground sm:p-10">
        <div className="grid gap-6 md:grid-cols-[1.5fr_auto] md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold">Besoin d'un dossier de conformité complet ?</h2>
            <p className="mt-2 text-primary-foreground/85">
              Pour les marchés publics, audits internes ou dépôts à la DMP — notre équipe vous prépare un dossier sur-mesure (CE, ISO, fiches techniques, certificats lots).
            </p>
          </div>
          <button
            onClick={() => openWhatsApp("Bonjour, j'aurais besoin d'un dossier de conformité pour")}
            className="inline-flex h-12 items-center justify-center rounded-full bg-card px-6 text-sm font-semibold text-primary shadow-soft hover:bg-card/90 transition"
          >
            Demander un dossier
          </button>
        </div>
      </section>
    </div>
  );
}
