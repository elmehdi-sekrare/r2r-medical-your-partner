import { useState } from "react";
import type { Product } from "@/data/products";
import { ProductImageFallback } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

type ProductThumbProps = {
  product: Product;
  className?: string;
  imageClassName?: string;
};

export function ProductThumb({ product, className, imageClassName }: ProductThumbProps) {
  const [errored, setErrored] = useState(false);

  return (
    <div className={cn("overflow-hidden bg-surface", className)}>
      {!errored && product.image ? (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setErrored(true)}
          className={cn("h-full w-full object-contain", imageClassName)}
        />
      ) : (
        <ProductImageFallback categorySlug={product.categorySlug} compact productName={product.name} />
      )}
    </div>
  );
}
