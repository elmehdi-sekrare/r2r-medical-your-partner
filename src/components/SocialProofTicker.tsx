import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/Brand";

const PROOFS = [
  { name: "Dr. Fatima Z.", city: "Casablanca", action: "a demandé un devis pour un concentrateur d'oxygène", time: "il y a 12 min" },
  { name: "Clinique Al Hayat", city: "Rabat", action: "a préparé une demande pour 5 fauteuils roulants", time: "il y a 18 min" },
  { name: "Dr. Youssef M.", city: "Marrakech", action: "a consulté les tensiomètres professionnels", time: "il y a 24 min" },
  { name: "Pharmacie Santé+", city: "Fès", action: "a ajouté 12 produits à son devis", time: "il y a 31 min" },
  { name: "Centre Médical Nour", city: "Tanger", action: "a demandé un devis pour du matériel de diagnostic", time: "il y a 42 min" },
  { name: "Dr. Khadija B.", city: "Agadir", action: "a recherché des consommables médicaux", time: "il y a 53 min" },
  { name: "Hôpital Régional", city: "Meknès", action: "a consulté les équipements d'anesthésie", time: "il y a 1 h" },
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
    }, 12000);
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
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-[calc(7rem+env(safe-area-inset-bottom))] left-4 z-40 w-[min(calc(100vw-2rem),23rem)] overflow-hidden rounded-3xl border border-primary/15 bg-card/95 shadow-hero backdrop-blur sm:bottom-32 sm:left-6"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,var(--primary-soft),transparent_45%),linear-gradient(135deg,transparent,oklch(0.9_0.08_240_/_0.22))]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--primary),oklch(0.62_0.15_155),var(--primary))]" />
          <button
            onClick={() => setVisible(false)}
            className="absolute right-3 top-3 z-10 grid h-7 w-7 place-items-center rounded-full border border-border bg-background/85 text-muted-foreground shadow-sm backdrop-blur hover:text-foreground"
            aria-label="Fermer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-4 pr-12"
            >
              <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Activité récente R2R
              </div>
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <BrandMark className="h-11 w-11" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-success" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-display text-base font-bold">{proof.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                    <MapPin className="h-3 w-3 text-primary" />
                    {proof.city}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                {proof.action}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-3">
                <p className="text-[11px] font-semibold text-muted-foreground">{proof.time}</p>
                <span className="rounded-full bg-success/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-success">
                  Vérifié
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
