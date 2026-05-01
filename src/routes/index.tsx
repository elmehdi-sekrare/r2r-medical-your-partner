import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ClipboardList,
  Headphones,
  HeartPulse,
  MapPin,
  MessageCircle,
  Package,
  Search,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { useRef, useState } from "react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { BrandLockup, BrandSeal } from "@/components/Brand";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { ProductThumb } from "@/components/ProductThumb";
import { useCounter } from "@/hooks/useCounter";
import { useI18n } from "@/lib/i18n";
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
    <svg viewBox="0 0 400 400" className="h-full w-full scale-125 overflow-visible">
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
        d="M 45 200 L 118 200 L 142 132 L 178 268 L 210 92 L 246 292 L 282 200 L 355 200"
        fill="none" stroke="url(#g)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
      />
      <motion.g
        animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 1.4, repeat: Infinity }}
        style={{ transformOrigin: "200px 200px" }}
      >
        <rect x="174" y="124" width="52" height="152" rx="10" fill="url(#g)" />
        <rect x="124" y="174" width="152" height="52" rx="10" fill="url(#g)" />
      </motion.g>
    </svg>
  );
}

function HeroCatalogueShowcase() {
  const showcaseProducts = [
    PRODUCTS.find((product) => product.slug === "concentrateur-doxygene"),
    PRODUCTS.find((product) => product.rawName.includes("FAUTEUIL")),
    PRODUCTS.find((product) => product.rawName.includes("TENSIOMETRE")),
    PRODUCTS.find((product) => product.rawName.includes("MASQUE")),
  ].filter(Boolean) as typeof PRODUCTS;

  const previewCategories = CATEGORIES.slice(0, 4);

  return (
    <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-hero">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,oklch(0.93_0.04_195),transparent_34%),radial-gradient(circle_at_90%_85%,oklch(0.9_0.08_165),transparent_38%)]" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Catalogue R2R</p>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">
              412 produits médicaux
            </h2>
          </div>
          <div className="rounded-2xl bg-primary px-4 py-3 text-right text-primary-foreground shadow-soft">
            <p className="text-2xl font-bold leading-none">10</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider opacity-80">
              Catégories
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-background/85 p-3 shadow-soft backdrop-blur">
          <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2 text-sm text-muted-foreground">
            <Search className="h-4 w-4 text-primary" />
            Rechercher fauteuil, oxygène, diagnostic...
          </div>
        </div>

        <div className="mt-5 grid flex-1 grid-cols-2 gap-3">
          {showcaseProducts.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + index * 0.12, duration: 0.55 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-3 shadow-soft"
            >
              <ProductThumb
                product={product}
                className="aspect-[4/3] rounded-xl bg-surface p-2"
                imageClassName="transition-transform duration-500 group-hover:scale-105"
              />
              <p className="mt-3 line-clamp-1 text-sm font-bold">{product.name}</p>
              <p className="mt-1 line-clamp-1 text-[11px] text-muted-foreground">{product.category}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {previewCategories.map((category) => (
            <div
              key={category.slug}
              className="rounded-xl border border-border bg-background/80 px-3 py-2 text-xs font-semibold text-foreground/80"
            >
              {category.name.split(" & ")[0]}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-2xl bg-primary-soft px-4 py-3">
          <div>
            <p className="text-sm font-bold text-primary">Devis WhatsApp prêt</p>
            <p className="text-xs text-muted-foreground">Ajout panier, comparaison, favoris</p>
          </div>
          <MessageCircle className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
}

function HeroMedicalShowcase() {
  const carouselProducts = [
    PRODUCTS.find((product) => product.slug === "concentrateur-doxygene"),
    PRODUCTS.find((product) => product.rawName.includes("FAUTEUIL")),
    PRODUCTS.find((product) => product.rawName.includes("MASQUE")),
    PRODUCTS.find((product) => product.rawName.includes("NEBULISEUR")),
    PRODUCTS.find((product) => product.rawName.includes("PANSEMENT")),
  ].filter(Boolean) as typeof PRODUCTS;

  const loopProducts = [...carouselProducts, ...carouselProducts];

  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl border border-border bg-card shadow-hero">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,oklch(0.9_0.06_190),transparent_28%),radial-gradient(circle_at_82%_18%,oklch(0.9_0.11_155),transparent_30%),linear-gradient(145deg,white,oklch(0.97_0.02_190)_58%,oklch(0.92_0.08_165))]" />
      <div className="absolute inset-0 brand-circuit opacity-60" />
      <motion.div
        className="absolute left-1/2 top-8 h-44 w-44 -translate-x-1/2 rounded-full border border-primary/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative flex h-full flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="rounded-2xl border border-primary/10 bg-background/75 p-2 pr-4 shadow-soft backdrop-blur">
            <BrandLockup />
          </div>
          <div className="hidden rounded-full border border-primary/10 bg-background/70 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-primary shadow-soft backdrop-blur sm:block">
            Maroc
          </div>
        </div>

        <div className="relative mx-auto -mt-1 h-[160px] w-[min(72%,280px)] sm:h-[190px] lg:h-[205px]">
          <HeroPulse />
          <div className="pointer-events-none absolute inset-x-0 -bottom-2 text-center">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <BrandSeal />
            </motion.div>
          </div>
        </div>

        <div className="mt-3 flex-1 overflow-hidden rounded-2xl border border-border bg-background/90 p-4 shadow-soft backdrop-blur">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold">Aperçu catalogue</p>
            </div>
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>

          <div className="relative overflow-hidden pb-1">
            <motion.div
              className="flex gap-3"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
            >
              {loopProducts.map((product, index) => (
                <div
                  key={`${product.slug}-${index}`}
                  className="w-44 shrink-0 rounded-xl border border-border bg-card p-2.5 shadow-sm"
                >
                  <ProductThumb product={product} className="h-36 rounded-lg bg-surface p-2.5" />
                  <p className="mt-2 line-clamp-1 text-xs font-bold">{product.name}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const featured = PRODUCTS.filter((product) => product.price).slice(0, 4);
  const requested = PRODUCTS.filter((product) =>
    /concentrateur|fauteuil|tensiometre|stethoscope|masque|nebuliseur|pansement/i.test(product.rawName),
  ).slice(0, 8);
  const urgentNeeds = [
    { label: t("needOxygen"), q: "oxygene", icon: HeartPulse },
    { label: t("needMobility"), q: "fauteuil", icon: Truck },
    { label: t("needDiagnostic"), q: "tensiometre", icon: ClipboardList },
    { label: t("needHygiene"), q: "masque", icon: ShieldCheck },
  ];

  const searchCatalogue = () => {
    const trimmed = query.trim();
    navigate({ to: "/catalogue", search: trimmed ? { q: trimmed } : {} });
  };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero lg:min-h-[calc(100svh-4rem)]">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-7 px-4 py-6 pb-14 sm:px-6 sm:py-8 lg:grid-cols-2 lg:items-start lg:gap-10 lg:px-8 lg:py-10">
          <div>
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-semibold uppercase tracking-wider"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              {t("heroBadge")}
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[0.98] sm:mt-5 sm:text-6xl lg:text-7xl">
              {[t("heroLine1"), t("heroLine2"), t("heroLine3")].map((line, i) => (
                <span
                  key={line} className="block"
                >
                  {i === 2 ? <span className="gradient-accent-text">{line}</span> : line}
                </span>
              ))}
            </h1>
            <p
              className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg"
            >
              {t("heroCopy")}
            </p>
            <div
              className="mt-7 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap"
            >
              <Link
                to="/catalogue"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground shadow-soft transition-shadow hover:shadow-elevated"
              >
                {t("exploreCatalog")} <ArrowRight className="rtl-flip h-4 w-4" />
              </Link>
              <button
                onClick={() => openWhatsApp()}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-6 font-semibold text-whatsapp-foreground shadow-soft transition-shadow hover:shadow-elevated"
              >
                <MessageCircle className="h-4 w-4" /> {t("contactUs")}
              </button>
              <Link
                to="/catalogue-imprimable"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 font-semibold shadow-soft hover:bg-muted"
              >
                {t("pdfCatalog")} <ArrowRight className="rtl-flip h-4 w-4" />
              </Link>
            </motion.div>
            <motion.form
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 }}
              onSubmit={(event) => {
                event.preventDefault();
                searchCatalogue();
              }}
              className="mt-6 max-w-xl rounded-2xl border border-border bg-card p-2 shadow-soft"
            >
              <div className="grid gap-2 sm:flex">
                <div className="relative flex-1">
                  <Search className="dir-search-icon absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t("searchPlaceholder")}
                    className="dir-search-input h-11 w-full rounded-xl bg-muted pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
                >
                  {t("find")}
                </button>
              </div>
            </motion.form>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15 }}
              className="mt-4 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0"
            >
              {urgentNeeds.map((need) => (
                <Link
                  key={need.label}
                  to="/catalogue"
                  search={{ q: need.q }}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-2 text-xs font-semibold text-foreground/80 hover:text-primary"
                >
                  <need.icon className="h-3.5 w-3.5" /> {need.label}
                </Link>
              ))}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="relative h-[360px] sm:h-[520px] lg:h-[560px]"
          >
            <HeroMedicalShowcase />
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted-foreground lg:block"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </section>

      {/* FAST PATHS */}
      <section className="relative z-10 -mt-8 pb-10">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { icon: Search, title: t("fastFindTitle"), text: t("fastFindText"), to: "/catalogue" },
            { icon: ClipboardList, title: t("fastQuoteTitle"), text: t("fastQuoteText"), to: "/devis" },
            { icon: MessageCircle, title: t("fastOrderTitle"), text: t("fastOrderText"), to: "/contact" },
            { icon: MapPin, title: t("fastDeliveryTitle"), text: t("fastDeliveryText"), to: "/contact" },
          ].map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="group flex items-start gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-soft backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elevated"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display font-bold">{item.title}</h2>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="relative overflow-hidden border-y border-border bg-surface py-12">
        <div className="absolute inset-0 brand-circuit opacity-25" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              R2R en chiffres
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Une expérience pensée pour commander vite et clairement.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5 rounded-3xl border border-border bg-card/80 p-6 shadow-soft backdrop-blur md:grid-cols-4">
            <StatItem value={412} suffix="+" label={t("products")} />
            <StatItem value={10} label={t("categories")} />
            <StatItem value={100} suffix="%" label={t("deliveryMorocco")} />
            <StatItem value={7} suffix="j/7" label={t("whatsappSupport")} />
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Confiance professionnelle
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Un partenaire pensé pour les achats médicaux sérieux.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              R2R Medical accompagne les professionnels, cliniques, pharmacies, cabinets et besoins
              à domicile avec un catalogue structuré, une demande de devis rapide et un contact direct
              via WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Fournisseur agréé", "Devis rapide", "Livraison Maroc", "Support avant achat"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground/80"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 border-l-4 border-primary bg-primary-soft/35 p-4">
              <div className="flex items-start gap-4">
                <BrandSeal className="shrink-0" />
                <div>
                  <p className="font-display text-lg font-bold">Signal de confiance client</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Le site présente clairement les produits, les demandes de devis et les moyens de
                    contact pour rassurer les acheteurs avant la commande.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden border-y border-border bg-surface px-4 py-6 sm:border sm:px-6 lg:rounded-3xl">
            <div className="absolute inset-0 brand-circuit opacity-20" />
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    Tableau de confiance
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold">R2R Medical Maroc</h3>
                </div>
                <div className="rounded-full bg-success/10 px-3 py-2 text-xs font-bold text-success">
                  Actif 7j/7
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              {
                icon: ShieldCheck,
                    title: "Fournisseur agréé",
                    text: "Positionnement clair pour les professionnels et achats médicaux au Maroc.",
              },
              {
                icon: ClipboardList,
                    title: "Devis structuré",
                    text: "Panier, quantités, notes et message prêt pour accélérer la validation.",
              },
              {
                icon: Truck,
                    title: "Livraison nationale",
                    text: "Demande adaptée à la ville, la quantité et l'urgence du besoin.",
              },
              {
                icon: Headphones,
                    title: "Conseil humain",
                    text: "Assistant IA et WhatsApp guident rapidement vers les bons produits.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                    className="border-t border-border bg-transparent p-4 first:border-t-0 sm:first:border-t sm:[&:nth-child(2)]:border-t-0"
              >
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 font-display text-base font-bold">{item.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
              </div>
              <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-3">
                {[
                  ["Maroc", "Couverture"],
                  ["WhatsApp", "Contact direct"],
                  ["Catalogue", "412 références"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <p className="font-display text-xl font-bold text-primary">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-y border-border bg-surface py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Parcours client
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
                De la recherche au devis, sans friction.
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
              Le client comprend rapidement où cliquer, quoi comparer et comment envoyer sa demande.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
            {[
              ["1", "Chercher", "Trouvez le produit par catégorie, usage ou besoin."],
              ["2", "Comparer", "Ajoutez aux favoris, comparez ou préparez un devis."],
              ["3", "Envoyer", "Transmettez la demande complète sur WhatsApp."],
              ["4", "Confirmer", "Validez disponibilité, livraison et détails techniques."],
            ].map(([step, title, text]) => (
              <div key={step} className="relative flex gap-4 border-l border-border bg-transparent py-2 pl-5">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {step}
                </div>
                <div>
                  <h3 className="font-display font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t("ourCategories")}</span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            {t("categoryHeadline")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t("categoryCopy")}
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
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t("selection")}</span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">{t("pricedProducts")}</h2>
            </div>
            <Link
              to="/catalogue"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              {t("viewAll")} <ArrowRight className="rtl-flip h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* REQUESTED */}
      <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t("frequentRequests")}</span>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">{t("oftenSearched")}</h2>
          </div>
          <Link
            to="/catalogue"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            {t("searchMore")} <ArrowRight className="rtl-flip h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {requested.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t("why")}</span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            {t("promiseTitle")}
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {[
            { icon: Package, title: t("fullCatalog"), text: t("fullCatalogText") },
            { icon: ShieldCheck, title: t("certifiedQuality"), text: t("certifiedQualityText") },
            { icon: Headphones, title: t("whatsappTeam"), text: t("whatsappTeamText") },
            { icon: Star, title: t("centralQuote"), text: t("centralQuoteText") },
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-20 text-center shadow-hero">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative">
            <Truck className="h-12 w-12 mx-auto text-primary-foreground/80" />
            <h2 className="mt-6 font-display text-4xl font-bold text-primary-foreground md:text-6xl">
              {t("readyOrder")}
            </h2>
            <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto text-lg">
              {t("readyCopy")}
            </p>
            <motion.button
              onClick={() => openWhatsApp()}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              animate={{ y: [0, -4, 0] }} transition={{ y: { duration: 2, repeat: Infinity } }}
              className="mt-8 inline-flex items-center gap-3 h-14 px-8 rounded-full bg-whatsapp text-whatsapp-foreground font-bold text-lg shadow-hero"
            >
              <MessageCircle className="h-5 w-5" /> {t("startConversation")}
            </motion.button>
            <p className="mt-4 text-sm text-primary-foreground/70">{WHATSAPP_DISPLAY}</p>
          </div>
        </div>
      </section>
    </>
  );
}
