import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const CLIENTS = [
  "CHU Mohammed VI",
  "Clinique Avicenne",
  "Polyclinique Atlas",
  "Centre Médical Al Farabi",
  "Hôpital Ibn Sina",
  "Clinique Chifa",
];

const TESTIMONIALS = [
  {
    name: "Dr. Amina Benali",
    role: "Directrice Clinique, Casablanca",
    text: "R2R Medical a simplifié nos achats d'équipements. Le processus de devis via WhatsApp est rapide et l'équipe est très réactive.",
    rating: 5,
  },
  {
    name: "Dr. Karim Tazi",
    role: "Médecin généraliste, Rabat",
    text: "Excellent catalogue avec des produits de qualité. La livraison est rapide et le service après-vente irréprochable.",
    rating: 5,
  },
  {
    name: "Pharmacie Al Amal",
    role: "Pharmacie, Marrakech",
    text: "Nous commandons régulièrement chez R2R Medical. Les prix sont compétitifs et la disponibilité des produits est excellente.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="border-y border-border bg-surface py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Témoignages
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Ils nous font confiance
          </h2>
          <p className="mt-4 text-muted-foreground">
            Des professionnels de santé à travers le Maroc nous choisissent au quotidien.
          </p>
        </div>

        <div className="mb-14 flex flex-wrap items-center justify-center gap-6">
          {CLIENTS.map((name) => (
            <div
              key={name}
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 shadow-soft"
            >
              <Building2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground/80">{name}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-yellow-500 text-lg">★</span>
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground italic">
                "{t.text}"
              </p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="font-display text-sm font-bold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
