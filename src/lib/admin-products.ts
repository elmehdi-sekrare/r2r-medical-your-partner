import { useEffect, useMemo, useState } from "react";
import { PRODUCTS, type Product } from "@/data/products";

const ADMIN_KEY = "r2r.admin.product-overrides";

export type ProductOverride = Partial<Pick<Product, "name" | "price" | "category" | "categorySlug">>;

export type ProductOverrides = Record<string, ProductOverride>;

function readOverrides(): ProductOverrides {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(ADMIN_KEY);
    return raw ? (JSON.parse(raw) as ProductOverrides) : {};
  } catch {
    return {};
  }
}

function writeOverrides(overrides: ProductOverrides) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ADMIN_KEY, JSON.stringify(overrides));
}

export function useAdminProducts() {
  const [overrides, setOverrides] = useState<ProductOverrides>(() => readOverrides());

  useEffect(() => {
    writeOverrides(overrides);
  }, [overrides]);

  const products = useMemo(
    () =>
      PRODUCTS.map((product) => ({
        ...product,
        ...overrides[product.slug],
      })),
    [overrides],
  );

  const updateProduct = (slug: string, patch: ProductOverride) => {
    setOverrides((current) => ({
      ...current,
      [slug]: {
        ...current[slug],
        ...patch,
      },
    }));
  };

  const resetProduct = (slug: string) => {
    setOverrides((current) => {
      const next = { ...current };
      delete next[slug];
      return next;
    });
  };

  const resetAll = () => setOverrides({});

  return {
    products,
    overrides,
    changedCount: Object.keys(overrides).length,
    updateProduct,
    resetProduct,
    resetAll,
  };
}

export function downloadOverrides(overrides: ProductOverrides) {
  if (typeof window === "undefined") return;
  const blob = new Blob([JSON.stringify(overrides, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "r2r-product-overrides.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
