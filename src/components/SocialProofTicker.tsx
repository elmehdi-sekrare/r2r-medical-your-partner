import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const PROOFS = [
  { name: "Dr. Fatima Z.", city: "Casablanca", action: "a demandé un devis pour un concentrateur d'oxygène" },
  { name: "Clinique Al Hayat", city: "Rabat", action: "a commandé 5 fauteuils roulants" },
  { name: "Dr. Youssef M.", city: "Marrakech", action: "a consulté les tensiomètres professionnels" },
  { name: "Pharmacie Santé+", city: "Fès", action: "a ajouté 12 produits au devis" },
  { name: "Centre Médical Nour", city: "Tanger", action: "a demandé un devis pour du matériel de diagnostic" },
  { name: "Dr. Khadija B.", city: "Agadir", action: "a commandé des consommables médicaux" },
  { name: "Hôpital Régional", city: "Meknès", action: "a consulté les équipements d'anesthésie" },
];

export function SocialProofTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % PROOFS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [visible]);

  const proof = PROOFS[currentIndex];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] left-4 z-40 max-w-xs rounded-2xl border border-border bg-card p-4 shadow-elevated sm:bottom-24 sm:left-6"
        >
          <button
            onClick={() => setVisible(false)}
            className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full border border-border bg-card text-xs text-muted-foreground hover:text-foreground shadow-sm"
            aria-label="Fermer"
          >
            ×
          </button>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                  {proof.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{proof.name}</p>
                  <p className="text-[11px] text-muted-foreground">{proof.city}</p>
                </div>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {proof.action}
              </p>
              <p className="mt-1 text-[10px] text-muted-foreground/60">
                il y a {Math.floor(Math.random() * 15) + 1} min
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
