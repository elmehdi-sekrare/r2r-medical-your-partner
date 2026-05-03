import { cn } from "@/lib/utils";

/**
 * Professional R2R Medical logo — blue medical cross in a rounded rectangle
 * with gradient depth, matching the brand reference image.
 */
export function R2RLogo({
  className,
  size = 48,
  animated = false,
}: {
  className?: string;
  size?: number;
  animated?: boolean;
}) {
  const id = `r2r-logo-${size}`;
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      className={cn(animated && "animate-logo-pulse", className)}
      aria-label="R2R Medical"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.48 0.19 255)" />
          <stop offset="100%" stopColor="oklch(0.38 0.16 250)" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.35" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="oklch(0.35 0.18 255)" floodOpacity="0.35" />
        </filter>
      </defs>
      {/* Rounded rectangle background */}
      <rect
        x="8"
        y="8"
        width="104"
        height="104"
        rx="26"
        fill={`url(#${id}-bg)`}
        filter={`url(#${id}-shadow)`}
      />
      {/* Shine overlay */}
      <rect
        x="8"
        y="8"
        width="104"
        height="104"
        rx="26"
        fill={`url(#${id}-shine)`}
      />
      {/* Medical cross — thick, rounded */}
      <rect x="46" y="24" width="28" height="72" rx="6" fill="white" />
      <rect x="24" y="46" width="72" height="28" rx="6" fill="white" />
      {/* Subtle inner glow ring */}
      <rect
        x="14"
        y="14"
        width="92"
        height="92"
        rx="20"
        fill="none"
        stroke="white"
        strokeWidth="1"
        opacity="0.15"
      />
    </svg>
  );
}

/**
 * Watermark version — semi-transparent, for overlaying on product images.
 */
export function R2RLogoWatermark({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none select-none", className)}>
      <R2RLogo size={56} animated className="opacity-70 drop-shadow-lg" />
    </div>
  );
}
