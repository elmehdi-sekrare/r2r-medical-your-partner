import { useEffect, useState } from "react";

export function ReadingProgress({ targetSelector = "article" }: { targetSelector?: string }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const calc = () => {
      const el = document.querySelector<HTMLElement>(targetSelector);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, window.scrollY - top);
      setPct(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    calc();
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", calc);
    return () => {
      window.removeEventListener("scroll", calc);
      window.removeEventListener("resize", calc);
    };
  }, [targetSelector]);

  return (
    <div className="fixed inset-x-0 top-16 z-40 h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
        aria-hidden
      />
    </div>
  );
}
