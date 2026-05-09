import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, MessageCircle, ShoppingCart, Building2, X, ArrowRight } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

const DEPARTMENTS = [
  {
    key: "commercial",
    icon: ShoppingCart,
    title: "Commercial / Devis",
    desc: "Demande de devis, conseil produit, disponibilité",
    prefill: "Bonjour, je souhaite parler à un commercial pour un devis ou un conseil produit.",
  },
  {
    key: "sav",
    icon: Headphones,
    title: "Service après-vente",
    desc: "Question technique, réparation, retour produit",
    prefill: "Bonjour, j'ai une question SAV / technique concernant un produit.",
  },
  {
    key: "hospitalier",
    icon: Building2,
    title: "Service hospitalier",
    desc: "Marchés publics, hôpitaux, cliniques (gros volumes)",
    prefill: "Bonjour, je travaille pour un établissement de santé et je souhaite échanger sur un marché.",
  },
] as const;

export function WhatsAppRouter({
  trigger,
  className,
}: {
  trigger?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          className ??
          "inline-flex h-11 items-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-semibold text-whatsapp-foreground shadow-soft hover:opacity-95"
        }
      >
        {trigger ?? (
          <>
            <MessageCircle className="h-4 w-4" /> Contacter sur WhatsApp
          </>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 20, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-elevated"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-surface text-muted-foreground hover:bg-primary-soft hover:text-primary"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="bg-whatsapp/10 p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-whatsapp text-whatsapp-foreground shadow-soft">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h2 className="mt-3 font-display text-xl font-bold">
                  Quel service souhaitez-vous joindre ?
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Nous routons votre message vers la bonne équipe pour une réponse plus rapide.
                </p>
              </div>

              <div className="space-y-2 p-4">
                {DEPARTMENTS.map((d) => (
                  <button
                    key={d.key}
                    onClick={() => {
                      openWhatsApp(d.prefill.replace(/^Bonjour, /, ""));
                      setOpen(false);
                    }}
                    className="group flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:bg-primary-soft/30 hover:shadow-soft"
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <d.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-sm">{d.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{d.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
