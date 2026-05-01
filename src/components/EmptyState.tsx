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
    <div className="relative overflow-hidden rounded-3xl border border-dashed border-primary/25 bg-surface px-6 py-12 text-center shadow-soft sm:px-10">
      <div className="absolute inset-0 brand-circuit opacity-20" />
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
      </div>
    </div>
  );
}
