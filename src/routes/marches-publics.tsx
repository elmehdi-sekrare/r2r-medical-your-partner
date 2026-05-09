import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Building2, FileText, Download, CheckCircle2, Clock, Phone, Banknote, Users } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { canonical, seoMeta } from "@/lib/seo";
import { openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/marches-publics")({
  head: () => ({
    meta: seoMeta({
      title: "Marchés publics & Hôpitaux — R2R Medical",
      description: "R2R Medical accompagne les hôpitaux publics, CHU et cliniques au Maroc : dossier administratif, devis cadres, livraison rapide.",
    }),
    links: canonical("/marches-publics"),
  }),
  component: MarchesPublicsPage,
});

const STEPS = [
  { n: "01", title: "Demande de devis cadre", text: "Envoyez le cahier des charges ou la liste des références. Nous répondons sous 24 h ouvrées." },
  { n: "02", title: "Dossier administratif", text: "ICE, RIB, patente, attestations fiscale et CNSS, statuts — fournis sur simple demande." },
  { n: "03", title: "Soumission & échantillons", text: "Échantillons disponibles pour évaluation préalable. Fiches techniques signées." },
  { n: "04", title: "Livraison & SAV", text: "Livraison nationale, réception en service, formation utilisateur si requise." },
];

const STRENGTHS = [
  { icon: Building2, label: "Cliniques privées" },
  { icon: Users, label: "CHU & hôpitaux publics" },
  { icon: Banknote, label: "Tarifs dégressifs en volume" },
  { icon: Clock, label: "Délais de livraison maîtrisés" },
];

export default function MarchesPublicsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Marchés publics & Hôpitaux" }]} />

      <header className="grid gap-8 rounded-3xl border border-border bg-card p-8 shadow-soft md:grid-cols-[1.4fr_1fr] md:p-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Building2 className="h-3.5 w-3.5" /> Secteur public & hospitalier
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Votre partenaire pour les marchés publics
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Hôpitaux, CHU, cliniques et établissements de santé publics : R2R Medical fournit un accompagnement administratif et logistique complet pour vos appels d'offres.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => openWhatsApp("Bonjour, je travaille pour un établissement public et je souhaite échanger sur un marché.")}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-95"
            >
              <Phone className="h-4 w-4" /> Contacter le service hospitalier
            </button>
            <button
              onClick={() => openWhatsApp("Bonjour, pourriez-vous m'envoyer le dossier administratif R2R Medical (ICE, RIB, attestations) ?")}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold hover:text-primary"
            >
              <Download className="h-4 w-4" /> Demander le dossier administratif
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {STRENGTHS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-surface p-4 text-center"
            >
              <s.icon className="mx-auto h-7 w-7 text-primary" />
              <p className="mt-2 text-xs font-semibold">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </header>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold">Notre process en 4 étapes</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <span className="font-display text-3xl font-bold text-primary/30">{s.n}</span>
              <h3 className="mt-2 font-display font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-border bg-surface p-8">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="font-display text-2xl font-bold">Documents administratifs disponibles</h2>
        </div>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {[
            "Identifiant Commun de l'Entreprise (ICE)",
            "Patente & registre du commerce",
            "Attestation fiscale & CNSS",
            "Relevé d'Identité Bancaire (RIB)",
            "Statuts de l'entreprise",
            "Attestation de bonne exécution",
            "Catalogue tarifaire & fiches techniques",
            "Certificats CE & ISO fournisseurs",
          ].map((doc) => (
            <li key={doc} className="flex items-start gap-3 rounded-xl bg-card p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm">{doc}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted-foreground">
          Documents transmis par e-mail ou WhatsApp sur simple demande, généralement sous 1 h ouvrée.
        </p>
      </section>
    </div>
  );
}
