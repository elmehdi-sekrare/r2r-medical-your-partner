import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MessageCircle, ChevronDown, ShieldCheck, Truck, Headphones, Package } from "lucide-react";
import { useRef } from "react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { useCounter } from "@/hooks/useCounter";
import { openWhatsApp, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function StatItem({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const n = useCounter(value, 1600, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-primary">
        {n}
        {suffix}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function HeroPulse() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.42 0.09 200)" />
          <stop offset="100%" stopColor="oklch(0.6 0.14 175)" />
        </linearGradient>
      </defs>
      <motion.circle
        cx="200" cy="200" r="160" fill="none" stroke="url(#g)" strokeWidth="1" opacity="0.3"
        animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.circle
        cx="200" cy="200" r="120" fill="none" stroke="url(#g)" strokeWidth="1" opacity="0.5"
        animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      />
      <motion.path
        d="M 60 200 L 130 200 L 150 140 L 180 260 L 210 100 L 240 280 L 270 200 L 340 200"
        fill="none" stroke="url(#g)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
      />
      <motion.g
        animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
        style={{ transformOrigin: "200px 200px" }}
      >
        <rect x="180" y="140" width="40" height="120" rx="8" fill="url(#g)" />
        <rect x="140" y="180" width="120" height="40" rx="8" fill="url(#g)" />
      </motion.g>
    </svg>
  );
}

function HomePage() {
  const featured = PRODUCTS.slice(0, 8);
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-4rem)] gradient-hero overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-semibold uppercase tracking-wider"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Fournisseur agréé Maroc
            </motion.span>
            <h1 className="mt-5 font-display font-bold leading-[0.95] text-5xl sm:text-6xl lg:text-7xl tracking-tighter">
              {["Équipements", "Médicaux", "Professionnels"].map((line, i) => (
                <motion.span
                  key={line} className="block"
                  initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
                >
                  {i === 2 ? <span className="gradient-accent-text">{line}</span> : line}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              Votre partenaire de confiance au Maroc — <strong className="text-foreground">412 produits</strong> disponibles, livraison nationale et support WhatsApp 7j/7.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/catalogue"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-elevated transition-shadow"
              >
                Explorer le catalogue <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={() => openWhatsApp()}
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-whatsapp text-whatsapp-foreground font-semibold shadow-soft hover:shadow-elevated transition-shadow"
              >
                <MessageCircle className="h-4 w-4" /> Nous contacter
              </button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="relative h-[420px] lg:h-[520px]"
          >
            <div className="absolute inset-0 rounded-3xl bg-card shadow-hero overflow-hidden">
              <HeroPulse />
            </div>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-16 border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem value={412} suffix="+" label="Produits" />
          <StatItem value={10} label="Catégories" />
          <StatItem value={100} suffix="%" label="Livraison Maroc" />
          <StatItem value={7} suffix="j/7" label="Support WhatsApp" />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Nos catégories</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            Explorez nos <span className="gradient-accent-text">10 univers</span> médicaux
          </h2>
          <p className="mt-4 text-muted-foreground">
            Un catalogue complet pour les hôpitaux, cliniques et professionnels de santé.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((c, i) => (
            <CategoryCard key={c.slug} category={c} index={i} />
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Sélection</span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">Produits en vedette</h2>
            </div>
            <Link
              to="/catalogue"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              Voir tout <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Pourquoi R2R</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            Un partenaire qui <span className="gradient-accent-text">tient ses promesses</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Package, title: "Catalogue Complet", text: "412 références couvrant tous les besoins hospitaliers." },
            { icon: ShieldCheck, title: "Qualité Certifiée", text: "Équipements conformes aux normes médicales internationales." },
            { icon: Headphones, title: "Support WhatsApp", text: "Une équipe réactive 7j/7 pour vos devis et commandes." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border shadow-soft"
            >
              <div className="h-12 w-12 rounded-xl gradient-primary text-primary-foreground grid place-items-center">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-20 text-center shadow-hero">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative">
            <Truck className="h-12 w-12 mx-auto text-primary-foreground/80" />
            <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold text-primary-foreground tracking-tight">
              Prêt à commander&nbsp;?
            </h2>
            <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto text-lg">
              Contactez-nous directement sur WhatsApp pour tout devis ou commande.
            </p>
            <motion.button
              onClick={() => openWhatsApp()}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              animate={{ y: [0, -4, 0] }} transition={{ y: { duration: 2, repeat: Infinity } }}
              className="mt-8 inline-flex items-center gap-3 h-14 px-8 rounded-full bg-whatsapp text-whatsapp-foreground font-bold text-lg shadow-hero"
            >
              <MessageCircle className="h-5 w-5" /> Démarrer la conversation
            </motion.button>
            <p className="mt-4 text-sm text-primary-foreground/70">{WHATSAPP_DISPLAY}</p>
          </div>
        </div>
      </section>
    </>
  );
}
