import r2rIcon from "@/assets/r2r-medical-icon.png";
import { cn } from "@/lib/utils";

export function R2RLogo({
  className,
  size = 48,
  animated = false,
}: {
  className?: string;
  size?: number;
  animated?: boolean;
}) {
  return (
    <img
      src={r2rIcon}
      width={size}
      height={Math.round(size * 0.825)}
      alt="R2R Medical"
      className={cn("h-auto shrink-0 object-contain", animated && "animate-logo-pulse", className)}
      draggable={false}
    />
  );
}

export function R2RLogoWatermark({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none select-none", className)}>
      <R2RLogo size={56} animated className="opacity-70 drop-shadow-lg" />
    </div>
  );
}
