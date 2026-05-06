import { motion, useInView } from "framer-motion";
import { Award, Building2, Globe, HeartPulse, Rocket, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { R2RLogo } from "@/components/R2RLogo";

const MILESTONES = [
  {
    year: "2014",
    title: "Fondation de R2R Medical",
    text: "Lancement de l'activité avec une vision claire : rendre l'équipement médical accessible à tous les professionnels au Maroc.",
    icon: Rocket,
  },
  {
    year: "2017",
    title: "100 références cataloguées",
    text: "Extension du catalogue pour couvrir les besoins en oxygénothérapie, diagnostic et mobilité.",
    icon: HeartPulse,
  },
  {
    year: "2019",
    title: "Couverture nationale",
    text: "Mise en place d'un réseau logistique couvrant les principales villes du Maroc.",
    icon: Globe,
  },
  {
    year: "2021",
    title: "Certifications qualité",
    text: "Obtention des certifications CE et conformité aux normes marocaines pour dispositifs médicaux.",
    icon: ShieldCheck,
  },
  {
    year: "2023",
    title: "Partenariats stratégiques",
    text: "Accords directs avec des fabricants internationaux pour garantir qualité et prix compétitifs.",
    icon: Building2,
  },
  {
    year: "2025",
    title: "412+ produits & plateforme digitale",
    text: "Lancement de la plateforme e-commerce avec devis WhatsApp instantané et assistant IA intégré.",
    icon: Award,
  },
];

function TimelineItem({ milestone, index }: { milestone: typeof MILESTONES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = milestone.icon;
  const isLeft = index % 2 === 0;

  const cardContent = (align: "left" | "right") => (
    <div className={`rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:shadow-elevated hover:-translate-y-1`}>
      <div className={`flex items-center gap-3 ${align === "left" ? "md:justify-end" : ""}`}>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-display text-2xl font-bold text-primary">{milestone.year}</span>
      </div>
      <h3 className={`mt-3 font-display text-lg font-bold ${align === "left" ? "md:text-right" : ""}`}>{milestone.title}</h3>
      <p className={`mt-2 text-sm leading-relaxed text-muted-foreground ${align === "left" ? "md:text-right" : ""}`}>{milestone.text}</p>
    </div>
  );

  return (
    <div ref={ref} className="relative grid md:grid-cols-[1fr_60px_1fr] gap-0 md:gap-4">
      {/* Left column */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="pb-8 md:pb-0"
      >
        {/* Mobile: always show. Desktop: only show if isLeft */}
        <div className={isLeft ? "" : "md:hidden"}>
          {cardContent(isLeft ? "left" : "right")}
        </div>
      </motion.div>

      {/* Center line + dot */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
          className="relative z-10 grid h-14 w-14 place-items-center rounded-full border-4 border-primary bg-card shadow-elevated"
        >
          <Icon className="h-6 w-6 text-primary" />
        </motion.div>
        <div className="w-px flex-1 bg-border" />
      </div>

      {/* Right column — desktop only, show if NOT isLeft */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="hidden md:block"
      >
        {!isLeft && cardContent("right")}
              <h3 className="mt-3 font-display text-lg font-bold">{milestone.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{milestone.text}</p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function Timeline() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Notre parcours</span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Une histoire d'<span className="gradient-accent-text">engagement médical</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            De notre fondation à aujourd'hui, chaque étape renforce notre mission d'accompagner les professionnels de santé au Maroc.
          </p>
        </div>

        {/* Mobile: simple list, Desktop: alternating timeline */}
        <div className="relative">
          {/* Vertical line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border" />

          <div className="space-y-6 md:space-y-0">
            {MILESTONES.map((m, i) => (
              <TimelineItem key={m.year} milestone={m} index={i} />
            ))}
          </div>

          {/* Bottom logo */}
          <div className="mt-8 flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="grid h-20 w-20 place-items-center rounded-full border-4 border-primary bg-card shadow-hero"
            >
              <R2RLogo size={40} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
