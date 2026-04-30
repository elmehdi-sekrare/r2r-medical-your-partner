// Single source of truth for WhatsApp contact.
// Replace WHATSAPP_NUMBER with the real international format (e.g. 212661234567).
export const WHATSAPP_NUMBER = "212600000000";

export const WHATSAPP_DISPLAY = "+212 6 00 00 00 00";

export function buildWhatsAppUrl(productName?: string): string {
  const message = productName
    ? `Bonjour R2R Medical, je souhaite avoir des informations sur : ${productName}`
    : `Bonjour R2R Medical, je souhaite des informations sur vos produits médicaux.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(productName?: string) {
  if (typeof window === "undefined") return;
  window.open(buildWhatsAppUrl(productName), "_blank", "noopener,noreferrer");
}
