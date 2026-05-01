import { useEffect, useState } from "react";

/** Returns false during SSR and the first client render, true after hydration. */
export function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
