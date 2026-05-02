/**
 * Simplified SVG map of Morocco showing delivery coverage regions.
 */
export function MoroccoMap({ className }: { className?: string }) {
  const regions = [
    { name: "Tanger-Tétouan", cx: 155, cy: 62, active: true },
    { name: "Oriental", cx: 220, cy: 95, active: true },
    { name: "Fès-Meknès", cx: 180, cy: 120, active: true },
    { name: "Rabat-Salé", cx: 130, cy: 130, active: true },
    { name: "Casablanca", cx: 125, cy: 155, active: true },
    { name: "Marrakech", cx: 155, cy: 200, active: true },
    { name: "Souss-Massa", cx: 140, cy: 240, active: true },
    { name: "Drâa-Tafilalet", cx: 200, cy: 210, active: true },
    { name: "Guelmim", cx: 130, cy: 275, active: true },
    { name: "Laâyoune", cx: 100, cy: 330, active: true },
    { name: "Dakhla", cx: 80, cy: 400, active: true },
  ];

  return (
    <div className={className}>
      <svg viewBox="0 0 300 470" className="h-full w-full" aria-label="Carte de couverture Maroc">
        {/* Morocco outline (simplified) */}
        <path
          d="M140 30 L180 25 L220 40 L250 70 L260 100 L250 140 L230 160 L220 200 L230 240 L210 260 L200 290 L170 300 L150 280 L140 260 L130 290 L120 320 L110 350 L100 380 L90 410 L80 440 L70 460 L60 440 L50 400 L60 360 L70 320 L80 280 L90 240 L100 200 L105 170 L110 150 L115 130 L120 100 L125 70 L130 50 Z"
          fill="oklch(0.93 0.04 195)"
          stroke="oklch(0.42 0.09 200)"
          strokeWidth="1.5"
          className="transition-colors"
        />

        {/* Delivery coverage dots */}
        {regions.map((region) => (
          <g key={region.name}>
            <circle
              cx={region.cx}
              cy={region.cy}
              r="6"
              fill="oklch(0.42 0.09 200)"
              opacity="0.15"
              className="animate-ping"
              style={{ transformOrigin: `${region.cx}px ${region.cy}px`, animationDuration: `${2 + Math.random() * 2}s` }}
            />
            <circle
              cx={region.cx}
              cy={region.cy}
              r="4"
              fill="oklch(0.42 0.09 200)"
            />
            <text
              x={region.cx + 10}
              y={region.cy + 4}
              fontSize="8"
              fill="oklch(0.4 0.03 220)"
              fontWeight="600"
              fontFamily="Inter, system-ui, sans-serif"
            >
              {region.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
