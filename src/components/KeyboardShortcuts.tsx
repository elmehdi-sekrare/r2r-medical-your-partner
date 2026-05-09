import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Keyboard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const SHORTCUTS = [
  { keys: ["⌘", "K"], desc: "Recherche rapide" },
  { keys: ["/"], desc: "Focus sur la recherche" },
  { keys: ["G", "H"], desc: "Aller à l'accueil" },
  { keys: ["G", "C"], desc: "Aller au catalogue" },
  { keys: ["G", "D"], desc: "Aller au devis" },
  { keys: ["G", "F"], desc: "Aller aux favoris" },
  { keys: ["?"], desc: "Afficher cette aide" },
  { keys: ["Esc"], desc: "Fermer une fenêtre" },
];

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let lastG = 0;
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (isInput) return;

      if (e.key === "?" && e.shiftKey) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }

      if (e.key === "/") {
        const search = document.querySelector<HTMLInputElement>(
          "input[type='search'], input[placeholder*='Recherch' i]",
        );
        if (search) {
          e.preventDefault();
          search.focus();
        }
        return;
      }

      if (e.key.toLowerCase() === "g") {
        lastG = Date.now();
        return;
      }
      if (Date.now() - lastG < 800) {
        const k = e.key.toLowerCase();
        if (k === "h") { e.preventDefault(); navigate({ to: "/" }); }
        else if (k === "c") { e.preventDefault(); navigate({ to: "/catalogue" }); }
        else if (k === "d") { e.preventDefault(); navigate({ to: "/devis" }); }
        else if (k === "f") { e.preventDefault(); navigate({ to: "/favoris" }); }
        lastG = 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <Keyboard className="h-5 w-5 text-primary" /> Raccourcis clavier
          </DialogTitle>
        </DialogHeader>
        <ul className="mt-2 space-y-2">
          {SHORTCUTS.map((s) => (
            <li key={s.desc} className="flex items-center justify-between gap-3 rounded-xl bg-surface px-3 py-2 text-sm">
              <span className="text-foreground/85">{s.desc}</span>
              <span className="flex items-center gap-1">
                {s.keys.map((k) => (
                  <kbd
                    key={k}
                    className="inline-grid min-w-[1.75rem] place-items-center rounded-md border border-border bg-card px-1.5 py-0.5 font-mono text-[11px] font-bold text-foreground shadow-sm"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
