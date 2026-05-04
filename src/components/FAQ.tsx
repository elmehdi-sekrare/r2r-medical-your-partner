import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export type FAQItem = { q: string; a: string };

const GENERAL_FAQS: FAQItem[] = [
  { q: "Quels types de produits proposez-vous ?", a: "R2R Medical propose plus de 412 produits médicaux répartis en 10 catégories : oxygénothérapie, anesthésie, consommables, diagnostic, orthopédie, protection, mobilité, instruments chirurgicaux, pansements et stérilisation." },
  { q: "Comment passer une commande ?", a: "Ajoutez les produits à votre panier devis, puis envoyez votre demande via WhatsApp. Notre équipe confirme la disponibilité, le prix et les délais de livraison." },
  { q: "Livrez-vous partout au Maroc ?", a: "Oui, R2R Medical assure la livraison sur tout le territoire marocain. Les délais varient selon la ville et la disponibilité des produits." },
  { q: "Proposez-vous des devis personnalisés ?", a: "Absolument. Pour les commandes en quantité ou les besoins spécifiques, notre équipe prépare un devis adapté via WhatsApp." },
  { q: "Quels sont vos horaires de disponibilité ?", a: "Notre support WhatsApp est disponible 7j/7. L'équipe répond généralement en quelques minutes pendant les heures ouvrables (8h-18h)." },
  { q: "Les produits sont-ils certifiés ?", a: "Nos produits respectent les normes CE et les réglementations en vigueur au Maroc pour les dispositifs médicaux professionnels." },
];

const PRODUCT_FAQS: FAQItem[] = [
  { q: "Le produit est-il disponible en stock ?", a: "La disponibilité est confirmée en temps réel par notre équipe via WhatsApp. Précisez la quantité et votre ville pour une réponse rapide." },
  { q: "Puis-je obtenir une fiche technique ?", a: "Oui, contactez-nous sur WhatsApp avec la référence du produit. Notre équipe vous enverra les spécifications détaillées." },
  { q: "Quelles sont les conditions de garantie ?", a: "Les conditions de garantie varient selon le fabricant et le type de produit. Notre équipe vous informera des détails lors de la confirmation de commande." },
  { q: "Peut-on retourner un produit ?", a: "Les retours sont possibles sous certaines conditions. Contactez notre service client dans les 48h suivant la réception pour toute demande." },
];

export function FAQSection({
  items = GENERAL_FAQS,
  title = "Questions fréquentes",
  subtitle = "Tout ce que vous devez savoir",
  compact = false,
}: {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "" : "py-16"}>
      {!compact && (
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">{title}</h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      )}
      <Accordion type="single" collapsible className="space-y-2">
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="rounded-2xl border border-border bg-card px-5 shadow-soft data-[state=open]:shadow-elevated transition-shadow"
          >
            <AccordionTrigger className="py-4 text-left font-display text-sm font-bold hover:no-underline [&[data-state=open]]:text-primary">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export { GENERAL_FAQS, PRODUCT_FAQS };
