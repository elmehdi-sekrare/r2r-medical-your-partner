import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <motion.button
      onClick={() => openWhatsApp()}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="whatsapp-float group fixed bottom-[calc(0.875rem+env(safe-area-inset-bottom))] left-3 z-50 flex items-center gap-3 rounded-full border border-white/45 bg-whatsapp p-2 text-whatsapp-foreground shadow-hero backdrop-blur sm:bottom-6 sm:left-6 sm:pr-4"
      aria-label="Contact WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-20" />
      <span className="relative grid h-10 w-10 place-items-center rounded-full bg-white/15 shadow-soft sm:h-11 sm:w-11">
        <MessageCircle className="h-5 w-5" />
      </span>
      <span className="relative hidden text-left sm:block">
        <span className="block text-[10px] font-bold uppercase tracking-wider opacity-80">
          Réponse rapide
        </span>
        <span className="block text-sm font-bold leading-tight">WhatsApp</span>
      </span>
    </motion.button>
  );
}
