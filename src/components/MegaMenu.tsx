import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/data/products";
import { getIcon } from "@/lib/icon-map";

export function MegaMenu({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="absolute left-1/2 top-full z-50 mt-2 w-[680px] -translate-x-1/2 rounded-2xl border border-border bg-card p-5 shadow-elevated"
        >
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="font-display text-lg font-bold">Nos catégories</p>
              <p className="text-xs text-muted-foreground">Explorez notre catalogue par famille de produits</p>
            </div>
            <Link
              to="/categories"
              className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:shadow-soft"
            >
              Tout voir
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => {
              const Icon = getIcon(cat.icon);
              return (
                <Link
                  key={cat.slug}
                  to="/catalogue"
                  search={{ category: cat.slug }}
                  className="group flex items-center gap-3 rounded-xl border border-transparent p-3 transition-colors hover:border-primary/15 hover:bg-primary-soft/40"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{cat.name}</p>
                    <p className="text-[11px] text-muted-foreground">{cat.count} produits</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
