import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/data/products";
import { getIcon } from "@/lib/icon-map";

export function CategoryCard({
  category,
  index = 0,
}: {
  category: Category;
  index?: number;
}) {
  const Icon = getIcon(category.icon);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
    >
      <Link
        to="/catalogue"
        search={{ category: category.slug }}
        className="interactive-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft hover:border-primary/25"
      >
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary-soft opacity-50 group-hover:scale-125 transition-transform duration-500" />
        <div className="relative">
          <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground grid place-items-center shadow-soft">
            <Icon className="h-6 w-6" strokeWidth={2} />
          </div>
          <h3 className="mt-4 font-display font-bold text-base leading-tight">
            {category.name}
          </h3>
          <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
            {category.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary-soft text-primary text-xs font-semibold">
              {category.count} produits
            </span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
