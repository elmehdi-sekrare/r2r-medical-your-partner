// Single source of truth for WhatsApp contact.
// Replace WHATSAPP_NUMBER with the real international format (e.g. 212661234567).
import type { QuoteLine } from "@/lib/quote";

export const WHATSAPP_NUMBER = "212600000000";

export const WHATSAPP_DISPLAY = "+212 6 00 00 00 00";

export type QuoteRequestDetails = {
  name?: string;
  company?: string;
  phone?: string;
  city?: string;
  urgency?: string;
  delivery?: string;
  notes?: string;
  lineNotes?: Record<string, string>;
};

export function buildWhatsAppUrl(productName?: string): string {
  const message = productName
    ? `Bonjour R2R Medical, je souhaite avoir des informations sur : ${productName}`
    : `Bonjour R2R Medical, je souhaite des informations sur vos produits médicaux.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppMessageUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildQuoteMessage(lines: QuoteLine[], details: QuoteRequestDetails = {}): string {
  if (lines.length === 0) {
    return "Bonjour R2R Medical, je souhaite demander un devis pour des équipements médicaux.";
  }

  const productLines = lines
    .map(({ product, quantity }, index) => {
      const note = details.lineNotes?.[product.slug]?.trim();
      return `${index + 1}. ${product.name} - Qté: ${quantity}${note ? `\n   Note: ${note}` : ""}`;
    })
    .join("\n");

  const clientLines = [
    `Nom : ${details.name || "À compléter"}`,
    `Société / Clinique : ${details.company || "À compléter"}`,
    `Téléphone : ${details.phone || "À compléter"}`,
    `Ville : ${details.city || "À compléter"}`,
    `Urgence : ${details.urgency || "À confirmer"}`,
    `Livraison : ${details.delivery || "À confirmer"}`,
  ].join("\n");

  return [
    "Bonjour R2R Medical, je souhaite recevoir un devis professionnel pour :",
    "",
    productLines,
    "",
    "Informations client :",
    clientLines,
    "",
    `Message : ${details.notes || "À confirmer"}`,
  ].join("\n");
}

export function buildQuoteWhatsAppUrl(lines: QuoteLine[], details: QuoteRequestDetails = {}): string {
  return buildWhatsAppMessageUrl(buildQuoteMessage(lines, details));
}

export function openQuoteWhatsApp(lines: QuoteLine[], details: QuoteRequestDetails = {}) {
  if (typeof window === "undefined") return;
  window.open(buildQuoteWhatsAppUrl(lines, details), "_blank", "noopener,noreferrer");
}

export function openWhatsApp(productName?: string) {
  if (typeof window === "undefined") return;
  window.open(buildWhatsAppUrl(productName), "_blank", "noopener,noreferrer");
}
