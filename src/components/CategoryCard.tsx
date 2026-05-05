import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/data/products";
import { PRODUCTS } from "@/data/products";
import { getIcon } from "@/lib/icon-map";
import { useRef, useState, useMemo } from "react";

export function CategoryCard({
  category,
  index = 0,
}: {
  category: Category;
  index?: number;
}) {
  const Icon = getIcon(category.icon);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const previewProduct = useMemo(
    () => PRODUCTS.find((p) => p.categorySlug === category.slug && p.image),
    [category.slug],
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovering(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovering ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
      }}
    >
      <Link
        to="/catalogue"
        search={{ category: category.slug }}
        className="interactive-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft hover:border-primary/25"
      >
        {/* Gradient glow on hover */}
        <div
          className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary-soft opacity-50 transition-all duration-500"
          style={{
            transform: hovering ? "scale(1.6)" : "scale(1)",
            opacity: hovering ? 0.7 : 0.5,
          }}
        />

        {/* Product preview thumbnail on hover */}
        {previewProduct?.image && (
          <div
            className="absolute right-3 top-3 h-16 w-16 overflow-hidden rounded-xl border border-border bg-surface shadow-soft transition-all duration-300"
            style={{
              opacity: hovering ? 1 : 0,
              transform: hovering ? "scale(1) translateY(0)" : "scale(0.8) translateY(8px)",
            }}
          >
            <img
              src={previewProduct.image}
              alt=""
              className="h-full w-full object-contain p-1.5"
              loading="lazy"
            />
          </div>
        )}

        <div className="relative">
          <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground grid place-items-center shadow-soft transition-transform duration-300 group-hover:scale-110">
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
