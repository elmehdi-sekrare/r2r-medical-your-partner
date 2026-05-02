import { motion, type HTMLMotionProps } from "framer-motion";
import { useHasMounted } from "@/hooks/useHasMounted";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
};

/**
 * SSR-safe animation wrapper.
 * Renders children visible immediately during SSR, then animates on client.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 20,
  className,
  ...rest
}: FadeInProps) {
  const mounted = useHasMounted();

  const dirMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      initial={mounted ? { opacity: 0, ...dirMap[direction] } : false}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * SSR-safe whileInView animation wrapper.
 * Renders visible during SSR, animates when scrolled into view on client.
 */
export function FadeInView({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 20,
  className,
  ...rest
}: FadeInProps) {
  const mounted = useHasMounted();

  const dirMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      initial={mounted ? { opacity: 0, ...dirMap[direction] } : false}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
