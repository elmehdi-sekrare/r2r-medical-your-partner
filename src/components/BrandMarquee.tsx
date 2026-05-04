import { R2RLogo } from "@/components/R2RLogo";
import { cn } from "@/lib/utils";

const phrases = [
  "Votre partenaire en équipements médicaux professionnels",
  "Accompagnement expert pour chaque besoin médical",
  "Plus de 400 références disponibles au Maroc",
  "Qualité certifiée — Livraison nationale",
];

export function BrandMarquee({ className }: { className?: string }) {
  const items = [...phrases, ...phrases]; // duplicate for seamless loop

  return (
    <div className={cn("relative overflow-hidden border-y border-primary/10 bg-primary/[0.04] py-3", className)}>
      <div className="flex animate-marquee whitespace-nowrap" style={{ "--marquee-duration": "14s" } as React.CSSProperties}>
        {items.map((text, i) => (
          <span key={i} className="mx-8 inline-flex shrink-0 items-center gap-3.5 text-lg font-bold text-primary/90">
            <R2RLogo size={34} />
            {text}
            <span className="text-primary/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
