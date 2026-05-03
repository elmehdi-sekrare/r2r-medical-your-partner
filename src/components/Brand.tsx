import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  iconClassName?: string;
};

export function BrandMark({ className, iconClassName }: BrandMarkProps) {
  return (
    <span
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-2xl bg-primary text-primary-foreground shadow-soft",
        className,
      )}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white_0%,transparent_25%)] opacity-20" />
      <span className="absolute -bottom-6 -right-5 h-12 w-12 rounded-full border border-white/20" />
      <Plus className={cn("relative h-5 w-5", iconClassName)} strokeWidth={3} />
    </span>
  );
}

export function BrandWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-baseline gap-1.5 font-display font-bold tracking-tight">
      <span className={cn("text-foreground", compact ? "text-lg" : "text-xl")}>R2R</span>
      <span className={cn("text-primary", compact ? "text-lg" : "text-xl")}>Medical</span>
    </span>
  );
}

export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <BrandMark className={compact ? "h-9 w-9 rounded-xl" : "h-12 w-12"} />
      <span>
        <BrandWordmark compact={compact} />
        {!compact && (
          <span className="mt-1 block h-1 rounded-full bg-[linear-gradient(90deg,transparent,oklch(0.45_0.18_255),oklch(0.6_0.2_240),transparent)]" />
        )}
      </span>
    </span>
  );
}

export function BrandSeal({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-2 overflow-hidden rounded-2xl border border-primary/20 bg-primary px-3.5 py-2 text-primary-foreground shadow-elevated",
        className,
      )}
    >
      <span className="absolute inset-y-0 -left-8 w-8 rotate-12 bg-white/25 blur-sm brand-shine" />
      <span className="relative font-display text-xl font-bold tracking-tight">R2R</span>
      <span className="relative h-4 w-px bg-white/30" />
      <span className="relative rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
        Medical
      </span>
    </span>
  );
}
