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
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-40 h-14 w-14 rounded-full bg-whatsapp text-whatsapp-foreground grid place-items-center shadow-hero"
      aria-label="Contact WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-30" />
      <MessageCircle className="h-6 w-6 relative" />
    </motion.button>
  );
}
