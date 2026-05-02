import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { GitCompare, Globe2, Heart, MessageCircle, Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { BrandLockup } from "@/components/Brand";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { useI18n } from "@/lib/i18n";
import { useCompare, useFavorites, useQuoteBasket } from "@/lib/quote";
import { openWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", labelKey: "navHome" },
  { to: "/catalogue", labelKey: "navCatalog" },
  { to: "/categories", labelKey: "navCategories" },
  { to: "/a-propos", labelKey: "navAbout" },
  { to: "/blog", labelKey: "navBlog" },
  { to: "/contact", labelKey: "navContact" },
] as const;

const MOBILE_EXTRA = [
  { to: "/devis", labelKey: "navQuote" },
  { to: "/comparaison", labelKey: "navCompare" },
  { to: "/favoris", labelKey: "favorites" },
] as const;

export function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], [0, 1]);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { totalQuantity } = useQuoteBasket();
  const favorites = useFavorites();
  const compare = useCompare();
  const { language, t, toggleLanguage } = useI18n();

  return (
    <motion.header
      style={{ ["--bg-opacity" as string]: bg }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <motion.div
        className="absolute inset-0 glass border-b border-border/60"
        style={{ opacity: bg }}
      />
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group inline-flex shrink-0 items-center rounded-full border border-transparent transition-colors hover:border-primary/10 hover:bg-card/60"
        >
          <BrandLockup compact />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1 shadow-soft backdrop-blur lg:flex">
          {NAV.map((n) => {
            const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                  active ? "text-primary" : "text-foreground/65 hover:text-foreground",
                )}
              >
                <span className="relative z-10">{t(n.labelKey)}</span>
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-primary-soft"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            to="/favoris"
            className="hidden sm:inline-grid relative h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition-colors hover:border-primary/25 hover:text-primary"
            title={t("favorites")}
          >
            <Heart className="h-4 w-4" />
            {favorites.count > 0 && (
              <span className="absolute -right-1 -top-1 min-w-5 h-5 rounded-full bg-primary px-1 text-[10px] font-bold leading-5 text-primary-foreground text-center">
                {favorites.count}
              </span>
            )}
          </Link>
          <Link
            to="/comparaison"
            className="hidden sm:inline-grid relative h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition-colors hover:border-primary/25 hover:text-primary"
            title={t("comparison")}
          >
            <GitCompare className="h-4 w-4" />
            {compare.count > 0 && (
              <span className="absolute -right-1 -top-1 min-w-5 h-5 rounded-full bg-primary px-1 text-[10px] font-bold leading-5 text-primary-foreground text-center">
                {compare.count}
              </span>
            )}
          </Link>
          <Link
            to="/devis"
            className="relative inline-grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground shadow-soft transition-colors hover:border-primary/25 hover:text-primary"
            title={t("quoteBasket")}
          >
            <ShoppingCart className="h-4 w-4" />
            {totalQuantity > 0 && (
              <span className="absolute -right-1 -top-1 min-w-5 h-5 rounded-full bg-primary px-1 text-[10px] font-bold leading-5 text-primary-foreground text-center">
                {totalQuantity}
              </span>
            )}
          </Link>
          <button
            onClick={() => openWhatsApp()}
            className="hidden h-10 items-center gap-2 rounded-full bg-whatsapp px-4 text-sm font-bold text-whatsapp-foreground shadow-soft transition-shadow hover:shadow-elevated sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </button>
          <DarkModeToggle />
          <button
            onClick={toggleLanguage}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-xs font-bold shadow-soft transition-colors hover:border-primary/25 hover:text-primary"
            aria-label={t("language")}
            title={t("language")}
          >
            <Globe2 className="h-4 w-4" />
            {language === "fr" ? "AR" : "FR"}
          </button>
          <button
            className="rounded-full border border-border bg-card p-2 shadow-soft hover:bg-muted lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={t("menu")}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden glass border-b border-border/60"
        >
          <div className="flex flex-col gap-1 px-4 py-4">
            <div className="mb-3 rounded-2xl border border-primary/15 bg-primary-soft/60 px-4 py-3 text-sm font-semibold text-primary">
              Fournisseur agréé Maroc
            </div>
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-medium hover:bg-muted"
              >
                {t(n.labelKey)}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-2">
              {MOBILE_EXTRA.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {t(n.labelKey)}
                </Link>
              ))}
            </div>
            <div className="mt-3 border-t border-border pt-3">
              <button
                onClick={() => {
                  setOpen(false);
                  openWhatsApp();
                }}
                className="w-full inline-flex h-11 items-center justify-center rounded-xl bg-whatsapp text-sm font-semibold text-whatsapp-foreground"
              >
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
