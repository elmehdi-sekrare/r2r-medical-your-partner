import { motion } from "framer-motion";
import { Award, BadgeCheck, Shield, Star, Zap } from "lucide-react";

const BADGES = [
  { icon: Shield, label: "CE Certifié", desc: "Conformité européenne" },
  { icon: BadgeCheck, label: "ISO 13485", desc: "Dispositifs médicaux" },
  { icon: Award, label: "Normes Marocaines", desc: "Réglementation locale" },
  { icon: Star, label: "Qualité Premium", desc: "Fournisseur agréé" },
  { icon: Zap, label: "Réponse 24h", desc: "Devis express garanti" },
];

export function TrustBadges() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-card py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,oklch(0.93_0.06_250),transparent_40%),radial-gradient(circle_at_80%_100%,oklch(0.9_0.08_240),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Certifications & Garanties
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            Standards professionnels respectés
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-5 sm:overflow-visible snap-x">
          {BADGES.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative min-w-[160px] snap-start overflow-hidden rounded-2xl border border-border bg-background/80 p-5 text-center shadow-soft backdrop-blur transition-shadow hover:shadow-elevated"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,oklch(0.9_0.1_245),transparent_70%)]" />
              <div className="relative">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <badge.icon className="h-6 w-6" />
                </div>
                <p className="mt-3 font-display text-sm font-bold">{badge.label}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{badge.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
