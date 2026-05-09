import { useEffect, useState } from "react";
import { Sparkles, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { openWhatsApp } from "@/lib/whatsapp";

const STORAGE_KEY = "r2r.exitIntent.dismissed";

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;

    let triggered = false;
    const handle = (e: MouseEvent) => {
      if (triggered) return;
      if (e.clientY <= 0 && e.relatedTarget === null) {
        triggered = true;
        setOpen(true);
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      }
    };
    const timer = window.setTimeout(() => {
      document.addEventListener("mouseout", handle);
    }, 15000);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", handle);
    };
  }, []);

  return (
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
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card shadow-elevated"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-surface text-muted-foreground hover:bg-primary-soft hover:text-primary"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground">
              <Sparkles className="h-8 w-8" />
              <h2 className="mt-3 font-display text-2xl font-bold">
                Une dernière chose avant de partir…
              </h2>
              <p className="mt-2 text-primary-foreground/85">
                Notre équipe peut vous rappeler en moins de 15 minutes pour préparer un devis groupé adapté à votre établissement.
              </p>
            </div>

            <div className="space-y-3 p-6">
              <button
                onClick={() => {
                  openWhatsApp("Bonjour, je souhaite être rappelé pour préparer un devis personnalisé.");
                  setOpen(false);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-5 py-3 text-sm font-semibold text-whatsapp-foreground shadow-soft hover:opacity-95"
              >
                <MessageCircle className="h-4 w-4" /> M'aider via WhatsApp
              </button>
              <button
                onClick={() => setOpen(false)}
                className="block w-full rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Non merci, je continue ma visite
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
