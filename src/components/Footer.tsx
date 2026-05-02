import { Link } from "@tanstack/react-router";
import { Clock, FileText, MapPin, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { Newsletter } from "@/components/Newsletter";
import { BrandLockup, BrandSeal } from "@/components/Brand";
import { CATEGORIES } from "@/data/products";
import { useI18n } from "@/lib/i18n";
import { WHATSAPP_DISPLAY, openWhatsApp } from "@/lib/whatsapp";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-4 border-b border-border pb-10 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Fournisseur médical", text: "Catalogue structuré pour achats professionnels." },
            { icon: Truck, title: "Livraison nationale", text: "Demandes traitées selon ville et disponibilité." },
            { icon: FileText, title: "Devis centralisé", text: "Panier, comparaison et message WhatsApp préparé." },
          ].map((item) => (
            <div key={item.title} className="flex gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display font-bold">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/">
                <BrandLockup compact />
              </Link>
              <BrandSeal />
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              {t("footerCopy")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => openWhatsApp()}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-semibold text-whatsapp-foreground shadow-soft"
              >
                <MessageCircle className="h-4 w-4" /> {t("orderWhatsapp")}
              </button>
              <Link
                to="/devis"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-semibold hover:text-primary"
              >
                <FileText className="h-4 w-4" /> {t("quoteRequest")}
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase text-muted-foreground">
              {t("navigation")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { to: "/", label: t("navHome") },
                { to: "/catalogue", label: t("navCatalog") },
                { to: "/categories", label: t("navCategories") },
                { to: "/devis", label: t("quoteRequest") },
                { to: "/comparaison", label: t("navCompare") },
                { to: "/contact", label: t("navContact") },
              ].map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-foreground/80 hover:text-primary transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase text-muted-foreground">
              {t("categories")}
            </h4>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm">
              {CATEGORIES.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/categorie/$slug"
                    params={{ slug: c.slug }}
                    className="text-foreground/80 hover:text-primary transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase text-muted-foreground">
              {t("contact")}
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>{t("nationalDelivery")}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>{t("openingHours")}</span>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>{WHATSAPP_DISPLAY}</span>
              </li>
            </ul>
            <div className="mt-6">
              <Newsletter />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} R2R Medical. {t("rights")}</p>
          <p>{t("madeIn")} · Catalogue médical professionnel</p>
        </div>
      </div>
    </footer>
  );
}
