import { useSyncExternalStore } from "react";
import type { Product } from "@/data/products";

let quickViewProduct: Product | null = null;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function openQuickView(product: Product) {
  quickViewProduct = product;
  notify();
}

export function closeQuickView() {
  quickViewProduct = null;
  notify();
}

export function useQuickView() {
  const product = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => quickViewProduct,
    () => null,
  );
  return { product, open: product !== null, close: closeQuickView };
}
