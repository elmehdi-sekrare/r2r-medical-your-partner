import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, MessageCircle, Minus, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { ProductThumb } from "@/components/ProductThumb";
import { addToQuote } from "@/lib/quote";
import { openWhatsApp } from "@/lib/whatsapp";

export function StickyBuyBar({ product }: { product: Product }) {
  const [visible, setVisible] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 24, stiffness: 220 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur shadow-[0_-8px_24px_oklch(0.2_0.06_255/0.08)] lg:hidden"
        >
          <div className="mx-auto flex max-w-3xl items-center gap-3 px-3 py-2.5">
            <ProductThumb product={product} className="h-12 w-12 shrink-0 rounded-xl border border-border" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">{product.name}</p>
              <p className="text-[11px] font-bold text-primary">{product.price || "Prix sur devis"}</p>
            </div>
            <div className="flex items-center rounded-full border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-8 w-8 place-items-center text-muted-foreground"
                aria-label="Diminuer"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-7 text-center text-xs font-bold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid h-8 w-8 place-items-center text-muted-foreground"
                aria-label="Augmenter"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              onClick={() => addToQuote(product, qty)}
              className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft"
              aria-label="Ajouter au devis"
            >
              <ClipboardList className="h-4 w-4" />
            </button>
            <button
              onClick={() => openWhatsApp(product.name)}
              className="grid h-10 w-10 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-soft"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
