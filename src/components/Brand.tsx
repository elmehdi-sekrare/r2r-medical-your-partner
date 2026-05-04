import { cn } from "@/lib/utils";
import { R2RLogo } from "@/components/R2RLogo";

type BrandMarkProps = {
  className?: string;
  iconClassName?: string;
};

export function BrandMark({ className, iconClassName }: BrandMarkProps) {
  return (
    <span
      className={cn(
        "relative inline-grid shrink-0 place-items-center overflow-visible",
        className,
      )}
    >
      <R2RLogo className={cn("h-full w-full object-contain drop-shadow-sm", iconClassName)} />
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

export function BrandHeroLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <R2RLogo size={compact ? 58 : 66} />
      <span className="min-w-0">
        <span className="inline-flex items-baseline gap-1.5 font-display font-bold tracking-tight">
          <span className={cn("text-foreground", compact ? "text-xl" : "text-2xl")}>R2R</span>
          <span className={cn("text-primary", compact ? "text-xl" : "text-2xl")}>Medical</span>
        </span>
        <span className="mt-1 block h-1 rounded-full bg-[linear-gradient(90deg,transparent,oklch(0.45_0.18_255),oklch(0.6_0.2_240),transparent)]" />
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
