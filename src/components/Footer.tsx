import { Link } from "@tanstack/react-router";
import { Plus, MapPin, Clock, MessageCircle } from "lucide-react";
import { CATEGORIES } from "@/data/products";
import { WHATSAPP_DISPLAY, openWhatsApp } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl gradient-primary grid place-items-center">
                <Plus className="h-5 w-5 text-primary-foreground" strokeWidth={3} />
              </div>
              <span className="font-display font-bold text-lg">
                R2R <span className="text-primary">Medical</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Votre partenaire de confiance en équipement médical au Maroc.
              412 produits professionnels, livraison nationale.
            </p>
            <button
              onClick={() => openWhatsApp()}
              className="mt-5 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-whatsapp text-whatsapp-foreground text-sm font-semibold shadow-soft"
            >
              <MessageCircle className="h-4 w-4" /> Commander sur WhatsApp
            </button>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { to: "/", label: "Accueil" },
                { to: "/catalogue", label: "Catalogue" },
                { to: "/categories", label: "Catégories" },
                { to: "/contact", label: "Contact" },
              ].map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-foreground/80 hover:text-primary transition-colors">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Catégories
            </h4>
            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/catalogue"
                    search={{ category: c.slug }}
                    className="text-foreground/80 hover:text-primary transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>Maroc — Livraison nationale</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>Lun–Sam, 8h–18h</span>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span>{WHATSAPP_DISPLAY}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} R2R Medical. Tous droits réservés.</p>
          <p>
            Fait avec <span className="text-destructive">♥</span> au Maroc
          </p>
        </div>
      </div>
    </footer>
  );
}
