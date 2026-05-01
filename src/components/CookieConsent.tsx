import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { useEffect, useState } from "react";

const KEY = "r2r.cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem(KEY)) {
      const t = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(KEY, "accepted");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border border-border bg-card p-5 shadow-hero sm:inset-x-auto sm:bottom-6 sm:right-6 sm:left-auto sm:w-[420px]"
        >
          <button onClick={accept} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
              <Cookie className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-sm font-bold">Cookies & confidentialité</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Ce site utilise des cookies pour améliorer votre expérience. En continuant, vous acceptez notre politique de confidentialité.
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={accept}
                  className="h-9 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground"
                >
                  Accepter
                </button>
                <button
                  onClick={accept}
                  className="h-9 rounded-lg border border-border px-4 text-xs font-semibold hover:bg-muted"
                >
                  Refuser
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
