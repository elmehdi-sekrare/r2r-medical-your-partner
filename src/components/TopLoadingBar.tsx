import { useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

export function TopLoadingBar() {
  const status = useRouterState({ select: (s) => s.status });
  const loading = status === "pending";

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: [0, 0.4, 0.7, 0.9] }}
          exit={{ opacity: 0, scaleX: 1, transition: { duration: 0.25 } }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ transformOrigin: "0% 50%" }}
          className="fixed left-0 right-0 top-0 z-[60] h-0.5 bg-gradient-to-r from-primary via-primary/80 to-primary shadow-[0_0_8px_var(--color-primary)]"
        />
      )}
    </AnimatePresence>
  );
}
