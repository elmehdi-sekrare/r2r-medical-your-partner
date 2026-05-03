import type { LucideIcon } from "lucide-react";
import type React from "react";
import { BrandMark } from "@/components/Brand";

type EmptyStateProps = {
  icon: LucideIcon;
  eyebrow?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function EmptyState({ icon: Icon, eyebrow = "R2R Medical", title, description, children }: EmptyStateProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-[radial-gradient(circle_at_18%_10%,oklch(0.65_0.18_250_/_0.18),transparent_32%),var(--surface)] px-6 py-12 text-center shadow-elevated sm:px-10">
      <div className="absolute inset-0 brand-circuit opacity-25" />
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-primary/15" />
      <div className="absolute -bottom-20 left-10 h-44 w-44 rounded-full bg-primary-soft/70 blur-3xl" />
      <div className="relative mx-auto max-w-2xl">
        <div className="mx-auto flex w-fit items-center gap-3 rounded-2xl border border-border bg-card p-2 pr-4 shadow-soft">
          <BrandMark className="h-11 w-11 rounded-xl" />
          <div className="text-left">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary">{eyebrow}</p>
            <p className="text-xs font-semibold text-muted-foreground">On vous guide vers la bonne action</p>
          </div>
        </div>
        <div className="mx-auto mt-7 grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft text-primary">
          <Icon className="h-8 w-8" />
        </div>
        <h2 className="mt-5 font-display text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>
        {children && <div className="mt-7">{children}</div>}
        <div className="mx-auto mt-8 grid max-w-xl gap-2 text-left sm:grid-cols-3">
          {["Rechercher autrement", "Comparer les options", "Demander conseil"].map((item) => (
            <div key={item} className="rounded-2xl border border-border bg-card/80 px-4 py-3 text-center shadow-soft">
              <p className="text-xs font-bold text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
