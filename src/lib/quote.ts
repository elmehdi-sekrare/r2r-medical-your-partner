import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PRODUCTS, type Product } from "@/data/products";

const QUOTE_KEY = "r2r.quote.items";
const FAVORITES_KEY = "r2r.favorite.slugs";
const COMPARE_KEY = "r2r.compare.slugs";
const RECENT_KEY = "r2r.recent.slugs";
const EVENT_NAME = "r2r.quote.changed";

export type QuoteItem = {
  slug: string;
  quantity: number;
};

export type QuoteLine = QuoteItem & {
  product: Product;
};

function emitChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(EVENT_NAME));
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  emitChange();
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
}

export function getQuoteItems(): QuoteItem[] {
  return readJson<QuoteItem[]>(QUOTE_KEY, []).filter((item) =>
    PRODUCTS.some((product) => product.slug === item.slug),
  );
}

export function getQuoteLines(): QuoteLine[] {
  return getQuoteItems()
    .map((item) => {
      const product = PRODUCTS.find((p) => p.slug === item.slug);
      return product ? { ...item, product } : null;
    })
    .filter((item): item is QuoteLine => Boolean(item));
}

export function addToQuote(product: Product, quantity = 1) {
  const items = getQuoteItems();
  const existing = items.find((item) => item.slug === product.slug);
  const next = existing
    ? items.map((item) =>
        item.slug === product.slug
          ? { ...item, quantity: Math.max(1, item.quantity + quantity) }
          : item,
      )
    : [...items, { slug: product.slug, quantity: Math.max(1, quantity) }];
  writeJson(QUOTE_KEY, next);
  toast.success(`${product.name.slice(0, 40)} ajouté au devis`, { description: `Quantité : ${existing ? existing.quantity + quantity : quantity}` });
}

export function updateQuoteQuantity(slug: string, quantity: number) {
  const next = getQuoteItems()
    .map((item) => (item.slug === slug ? { ...item, quantity: Math.max(1, quantity) } : item))
    .filter((item) => item.quantity > 0);
  writeJson(QUOTE_KEY, next);
}

export function removeFromQuote(slug: string) {
  writeJson(
    QUOTE_KEY,
    getQuoteItems().filter((item) => item.slug !== slug),
  );
}

export function clearQuote() {
  writeJson(QUOTE_KEY, []);
}

export function getFavoriteSlugs(): string[] {
  return readJson<string[]>(FAVORITES_KEY, []).filter((slug) =>
    PRODUCTS.some((product) => product.slug === slug),
  );
}

export function toggleFavorite(product: Product) {
  const favorites = getFavoriteSlugs();
  const removing = favorites.includes(product.slug);
  const next = removing
    ? favorites.filter((slug) => slug !== product.slug)
    : [...favorites, product.slug];
  writeJson(FAVORITES_KEY, next);
  toast(removing ? "Retiré des favoris" : "Ajouté aux favoris ❤️", { description: product.name.slice(0, 50) });
}

export function useQuoteBasket() {
  const [lines, setLines] = useState<QuoteLine[]>(() => getQuoteLines());

  useEffect(() => subscribe(() => setLines(getQuoteLines())), []);

  const totalQuantity = lines.reduce((total, item) => total + item.quantity, 0);
  return { lines, totalQuantity };
}

export function useFavorites() {
  const [slugs, setSlugs] = useState<string[]>(() => getFavoriteSlugs());

  useEffect(() => subscribe(() => setSlugs(getFavoriteSlugs())), []);

  return {
    slugs,
    count: slugs.length,
    isFavorite: (product: Product) => slugs.includes(product.slug),
  };
}

export function getCompareSlugs(): string[] {
  return readJson<string[]>(COMPARE_KEY, []).filter((slug) =>
    PRODUCTS.some((product) => product.slug === slug),
  );
}

export function toggleCompare(product: Product) {
  const selected = getCompareSlugs();
  const next = selected.includes(product.slug)
    ? selected.filter((slug) => slug !== product.slug)
    : [...selected, product.slug].slice(-4);
  writeJson(COMPARE_KEY, next);
}

export function removeFromCompare(slug: string) {
  writeJson(
    COMPARE_KEY,
    getCompareSlugs().filter((item) => item !== slug),
  );
}

export function useCompare() {
  const [slugs, setSlugs] = useState<string[]>(() => getCompareSlugs());

  useEffect(() => subscribe(() => setSlugs(getCompareSlugs())), []);

  return {
    slugs,
    products: PRODUCTS.filter((product) => slugs.includes(product.slug)),
    count: slugs.length,
    isCompared: (product: Product) => slugs.includes(product.slug),
  };
}

export function recordRecentlyViewed(product: Product) {
  const next = [product.slug, ...readJson<string[]>(RECENT_KEY, []).filter((slug) => slug !== product.slug)].slice(0, 8);
  writeJson(RECENT_KEY, next);
}

export function getRecentlyViewedProducts(): Product[] {
  const slugs = readJson<string[]>(RECENT_KEY, []);
  return slugs
    .map((slug) => PRODUCTS.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));
}

export function useRecentlyViewed() {
  const [products, setProducts] = useState<Product[]>(() => getRecentlyViewedProducts());

  useEffect(() => subscribe(() => setProducts(getRecentlyViewedProducts())), []);

  return products;
}
