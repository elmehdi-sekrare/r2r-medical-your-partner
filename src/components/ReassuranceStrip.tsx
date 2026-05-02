import { ClipboardCheck, Headphones, MapPin, MessageCircle, ShieldCheck, Truck } from "lucide-react";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "Fournisseur professionnel",
    text: "Catalogue structuré pour cliniques, cabinets, pharmacies et acheteurs médicaux.",
  },
  {
    icon: Truck,
    title: "Livraison au Maroc",
    text: "Disponibilité, quantité et délai confirmés selon votre ville.",
  },
  {
    icon: MessageCircle,
    title: "Réponse WhatsApp",
    text: "Demande claire avec produits, quantités et remarques envoyée rapidement.",
  },
  {
    icon: ClipboardCheck,
    title: "Devis préparé",
    text: "Panier, comparaison et notes regroupés avant contact R2R.",
  },
] as const;

export function ReassuranceStrip() {
  return (
    <section className="border-y border-border bg-surface/70">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-3 lg:grid-cols-[280px_1fr] lg:items-center">
          <div className="rounded-2xl border border-primary/15 bg-card p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
                <Headphones className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Engagement R2R</p>
                <h2 className="font-display text-xl font-bold">Achat médical plus clair</h2>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="interactive-lift rounded-2xl border border-border bg-card p-4 shadow-soft hover:border-primary/25">
                  <div className="flex gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold">{item.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          Service orienté professionnels de santé au Maroc
        </div>
      </div>
    </section>
  );
}
