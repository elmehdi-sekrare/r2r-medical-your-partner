import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Building2,
  HeartPulse,
  MapPin,
  MessageCircle,
  Shield,
  Target,
  Truck,
  Users,
} from "lucide-react";
import { BrandSeal } from "@/components/Brand";
import { useCounter } from "@/hooks/useCounter";
import { openWhatsApp } from "@/lib/whatsapp";
import { useRef } from "react";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useInView } from "framer-motion";
import heroImg from "@/assets/hero-medical.jpg";

export const Route = createFileRoute("/a-propos")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "À propos — R2R Medical | Fournisseur médical de confiance au Maroc" },
      { name: "description", content: "Découvrez R2R Medical, votre partenaire de confiance en équipements médicaux au Maroc. Notre mission, nos valeurs et notre engagement qualité." },
      { property: "og:title", content: "À propos — R2R Medical" },
      { property: "og:description", content: "Fournisseur d'équipements médicaux professionnels au Maroc depuis plus de 10 ans." },
    ],
  }),
});

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const n = useCounter(value, 1600, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl font-bold text-primary md:text-5xl">
        {n}{suffix}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function AboutPage() {
  const mounted = useHasMounted();
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-center">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">À propos de R2R Medical</span>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
                Votre partenaire <span className="gradient-accent-text">médical de confiance</span> au Maroc
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Depuis notre création, R2R Medical s'engage à fournir aux professionnels de santé marocains
                des équipements médicaux de qualité supérieure, accompagnés d'un service client irréprochable.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/catalogue"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-soft"
                >
                  Explorer le catalogue <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => openWhatsApp()}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-whatsapp px-6 font-semibold text-whatsapp-foreground shadow-soft"
                >
                  <MessageCircle className="h-4 w-4" /> Nous contacter
                </button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-primary-soft/60 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-card shadow-hero">
                <div className="relative h-[420px]">
                  <img src={heroImg} alt="Équipement médical professionnel R2R Medical" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                  <div className="absolute left-6 top-6 rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-white shadow-soft backdrop-blur">
                    <BrandSeal />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/20 bg-white/90 p-5 shadow-elevated backdrop-blur">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">Fournisseur médical agréé Maroc</p>
                    <p className="mt-2 font-display text-2xl font-bold">Équipements professionnels, accompagnement humain.</p>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {[
                        ["412+", "Produits"],
                        ["10", "Catégories"],
                        ["7j/7", "Support"],
                      ].map(([value, label]) => (
                        <div key={label} className="rounded-2xl bg-surface p-3 text-center">
                          <p className="font-display text-xl font-bold text-primary">{value}</p>
                          <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 md:grid-cols-4">
          <Stat value={412} suffix="+" label="Produits référencés" />
          <Stat value={10} suffix="" label="Catégories médicales" />
          <Stat value={15} suffix="+" label="Villes desservies" />
          <Stat value={7} suffix="j/7" label="Support disponible" />
        </div>
      </section>

      {/* Mission & Values */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Notre mission</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Rendre l'équipement médical accessible à tous les professionnels de santé au Maroc
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Nous croyons que chaque clinique, hôpital et cabinet médical mérite un accès simple et rapide
              à des équipements médicaux de qualité. Notre plateforme centralise plus de 412 références
              avec un processus de commande transparent via WhatsApp.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Notre approche combine la technologie moderne avec un service humain attentif : chaque demande
              est traitée personnellement par notre équipe de conseillers spécialisés.
            </p>
            <div className="mt-8 rounded-2xl border-l-4 border-primary bg-primary-soft/30 p-6">
              <div className="flex items-center gap-3">
                <BrandSeal />
              </div>
              <p className="mt-4 text-sm italic text-muted-foreground">
                "Notre objectif est simple : être le partenaire médical que nous aurions aimé avoir.
                Fiable, transparent et toujours disponible."
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Target, title: "Vision", text: "Devenir la référence digitale de l'équipement médical au Maroc et en Afrique du Nord." },
              { icon: HeartPulse, title: "Engagement qualité", text: "Chaque produit référencé est vérifié et conforme aux normes médicales en vigueur." },
              { icon: Users, title: "Service humain", text: "Une équipe dédiée qui comprend vos besoins et vous accompagne dans chaque étape." },
              { icon: Shield, title: "Confiance", text: "Transparence totale sur les produits, prix et délais. Pas de surprises." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={mounted ? { opacity: 0, y: 20 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Map placeholder */}
      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Couverture nationale</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Nous livrons partout au Maroc
            </h2>
            <p className="mt-4 text-muted-foreground">
              De Tanger à Dakhla, notre réseau logistique couvre l'ensemble du territoire marocain.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { city: "Casablanca", region: "Grand Casablanca" },
              { city: "Rabat", region: "Rabat-Salé-Kénitra" },
              { city: "Marrakech", region: "Marrakech-Safi" },
              { city: "Fès", region: "Fès-Meknès" },
              { city: "Tanger", region: "Tanger-Tétouan" },
              { city: "Agadir", region: "Souss-Massa" },
              { city: "Oujda", region: "Oriental" },
              { city: "Laâyoune", region: "Provinces du Sud" },
            ].map((item) => (
              <div key={item.city} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-display font-bold text-sm">{item.city}</p>
                  <p className="text-xs text-muted-foreground">{item.region}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Certifications & Partenaires</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
            Des standards qui inspirent confiance
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Award, title: "Normes CE", text: "Tous nos dispositifs médicaux sont conformes aux normes européennes de sécurité et de qualité." },
            { icon: Building2, title: "Partenaires fabricants", text: "Relations directes avec des fabricants de renommée internationale pour garantir l'authenticité." },
            { icon: Truck, title: "Logistique maîtrisée", text: "Chaîne d'approvisionnement optimisée pour des livraisons rapides et sécurisées sur tout le Maroc." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-8 shadow-soft text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-primary text-primary-foreground">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-20 text-center shadow-hero">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-5xl">
              Prêt à nous faire confiance ?
            </h2>
            <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto text-lg">
              Rejoignez les centaines de professionnels qui nous font confiance chaque jour.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/catalogue"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-white px-8 font-bold text-primary shadow-hero"
              >
                Voir le catalogue <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={() => openWhatsApp()}
                className="inline-flex h-14 items-center gap-2 rounded-full bg-whatsapp px-8 font-bold text-whatsapp-foreground shadow-hero"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
