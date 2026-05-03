import { R2RLogo } from "@/components/R2RLogo";

const phrases = [
  "Votre partenaire en équipements médicaux professionnels",
  "Accompagnement expert pour chaque besoin médical",
  "Plus de 400 références disponibles au Maroc",
  "Qualité certifiée — Livraison nationale",
];

export function BrandMarquee() {
  const items = [...phrases, ...phrases]; // duplicate for seamless loop

  return (
    <div className="relative overflow-hidden bg-primary/[0.04] py-3 border-y border-primary/10">
      <div className="flex animate-marquee whitespace-nowrap" style={{ "--marquee-duration": "28s" } as React.CSSProperties}>
        {items.map((text, i) => (
          <span key={i} className="mx-6 inline-flex shrink-0 items-center gap-3 text-sm font-semibold text-primary/80">
            <R2RLogo size={22} />
            {text}
            <span className="text-primary/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
