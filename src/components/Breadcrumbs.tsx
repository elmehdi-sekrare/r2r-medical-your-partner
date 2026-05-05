import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

export type BreadcrumbItem = {
  label: string;
  to?: string;
  search?: Record<string, string>;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        <li>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-muted-foreground transition-colors hover:bg-primary-soft hover:text-primary"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Accueil</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <motion.li
            key={item.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="flex items-center gap-1"
          >
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 rtl-flip" />
            {item.to ? (
              <Link
                to={item.to}
                search={item.search as any}
                className="rounded-lg px-2 py-1.5 text-muted-foreground transition-colors hover:bg-primary-soft hover:text-primary"
              >
                {item.label}
              </Link>
            ) : (
              <span className="rounded-lg px-2 py-1.5 font-semibold text-foreground">
                {item.label}
              </span>
            )}
          </motion.li>
        ))}
      </ol>
    </nav>
  );
}
