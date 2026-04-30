import { Link, useRouterState } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, Menu, X, Plus } from "lucide-react";
import { useState } from "react";
import { openWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/catalogue", label: "Catalogue" },
  { to: "/categories", label: "Catégories" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], [0, 1]);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <motion.header
      style={{ ["--bg-opacity" as string]: bg }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <motion.div
        className="absolute inset-0 glass border-b border-border/60"
        style={{ opacity: bg }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative h-9 w-9 rounded-xl gradient-primary grid place-items-center shadow-soft">
            <Plus className="h-5 w-5 text-primary-foreground" strokeWidth={3} />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            R2R <span className="text-primary">Medical</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => {
            const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-colors relative",
                  active ? "text-primary" : "text-foreground/70 hover:text-foreground",
                )}
              >
                {n.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-primary-soft rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openWhatsApp()}
            className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-full bg-whatsapp text-whatsapp-foreground font-semibold text-sm shadow-soft hover:shadow-elevated transition-shadow"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </button>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-b border-border/60"
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-medium hover:bg-muted"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
