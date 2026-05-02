import { CheckCircle2, MessageCircle, Timer } from "lucide-react";
import type { ProductMeta } from "@/data/products";
import { cn } from "@/lib/utils";

type Availability = ProductMeta["availability"];

const availabilityConfig: Record<
  Availability,
  {
    icon: typeof CheckCircle2;
    label: string;
    hint: string;
    className: string;
  }
> = {
  Disponible: {
    icon: CheckCircle2,
    label: "Disponible",
    hint: "prix affiché",
    className: "border-success/25 bg-success/10 text-success",
  },
  "Devis requis": {
    icon: MessageCircle,
    label: "Sur devis",
    hint: "confirmation R2R",
    className: "border-primary/20 bg-primary-soft text-primary",
  },
  "Sur commande": {
    icon: Timer,
    label: "Sur commande",
    hint: "délai à confirmer",
    className: "border-muted-foreground/20 bg-muted text-muted-foreground",
  },
};

export function AvailabilityBadge({
  availability,
  compact = false,
  className,
}: {
  availability: Availability;
  compact?: boolean;
  className?: string;
}) {
  const config = availabilityConfig[availability];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border font-bold uppercase tracking-wider",
        compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-xs",
        config.className,
        className,
      )}
      title={`${config.label} - ${config.hint}`}
    >
      <Icon className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
      {config.label}
    </span>
  );
}

export function PriceStatusBadge({
  price,
  compact = false,
  className,
}: {
  price?: string;
  compact?: boolean;
  className?: string;
}) {
  return price ? (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border border-success/25 bg-success/10 font-bold uppercase tracking-wider text-success",
        compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-xs",
        className,
      )}
    >
      {price} MAD
    </span>
  ) : (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/20 bg-primary-soft font-bold uppercase tracking-wider text-primary",
        compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-xs",
        className,
      )}
      title="Prix confirmé par devis R2R Medical"
    >
      <MessageCircle className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
      Sur devis
    </span>
  );
}
