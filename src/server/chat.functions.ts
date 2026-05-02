import { createServerFn } from "@tanstack/react-start";
import { CATEGORIES, PRODUCTS } from "@/data/products";

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de R2R Medical, fournisseur d'équipements médicaux professionnels au Maroc. Tu parles uniquement en français. Tu aides les clients à trouver des produits parmi ces 10 catégories : Oxygénothérapie & Respiratoire, Anesthésie & Réanimation, Dispositifs Médicaux & Consommables, Diagnostic & Monitoring, Orthopédie & Maintien, Protection & Hygiène, Mobilité & Aide au Déplacement, Instruments Chirurgicaux, Pansements & Soins, Stérilisation. Total : 412 produits. Pour toute commande ou devis, demande le produit, la quantité et la ville, puis dirige vers WhatsApp. Ne donne pas de diagnostic médical et n'invente pas de disponibilité exacte. Réponds de façon concise, professionnelle et chaleureuse en 2-4 phrases maximum.`;

type Msg = { role: "user" | "assistant"; content: string };

function getFallbackReply(messages: Msg[]) {
  const last = messages.at(-1)?.content.toLowerCase() ?? "";
  const words = last
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 4);
  const matches = PRODUCTS.filter((product) => {
    const text = `${product.name} ${product.rawName} ${product.category}`.toLowerCase();
    return words.some((word) => text.includes(word));
  }).slice(0, 3);

  if (matches.length > 0) {
    const list = matches.map((product) => `- ${product.name} (${product.category})`).join("\n");
    return `Oui, voici des produits proches dans notre catalogue :\n${list}\n\nPour avancer, indiquez la quantité souhaitée et votre ville. L'équipe R2R Medical confirmera disponibilité, prix et délai sur WhatsApp.`;
  }

  if (last.includes("oxyg") || last.includes("respiration") || last.includes("respiratoire")) {
    return "Pour l'oxygène et la respiration, R2R Medical peut vous orienter vers les concentrateurs, masques, nébuliseurs, CPAP/APAP et accessoires respiratoires. Précisez l'usage recherché, la quantité et la ville pour préparer un devis WhatsApp.";
  }

  if (last.includes("catégorie") || last.includes("categorie") || last.includes("produit")) {
    return `Nous proposons ${CATEGORIES.length} catégories : oxygénothérapie, anesthésie, consommables, diagnostic, orthopédie, hygiène, mobilité, instruments chirurgicaux, pansements et stérilisation. Dites-moi le type de produit recherché et je vous oriente.`;
  }

  if (last.includes("commande") || last.includes("devis") || last.includes("prix")) {
    return "Pour une commande, un prix ou un devis, le plus rapide est de nous contacter sur WhatsApp. Envoyez le nom du produit et la quantité souhaitée, et l'équipe R2R Medical vous répondra directement.";
  }

  if (last.includes("fauteuil") || last.includes("roulant") || last.includes("mobilité") || last.includes("mobilite")) {
    return "Oui, R2R Medical propose des produits de mobilité et d'aide au déplacement, dont les fauteuils roulants selon disponibilité. Pour confirmer le modèle et recevoir un devis, contactez-nous sur WhatsApp.";
  }

  if (last.includes("bonjour") || last.includes("salut") || last.includes("hello")) {
    return "Bonjour, je suis l'assistant R2R Medical. Je peux vous aider à trouver une catégorie de produits, préparer une demande de devis ou vous orienter vers WhatsApp pour commander.";
  }

  return "Je peux vous aider à trouver des équipements médicaux R2R Medical parmi nos catégories. Dites-moi le produit recherché, ou contactez-nous sur WhatsApp pour une commande ou un devis rapide.";
}

export const chatWithAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: { messages: Msg[] }) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return { content: getFallbackReply(data.messages) };
    }
    try {
      const resp = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...data.messages],
        }),
      });
      if (!resp.ok) {
        const errorText = await resp.text();
        if (resp.status === 401 || resp.status === 403) {
          return { error: "Clé OpenAI invalide ou non autorisée." };
        }
        if (resp.status === 402 || errorText.includes("insufficient_quota")) {
          return { content: getFallbackReply(data.messages) };
        }
        if (resp.status === 429) {
          return { content: getFallbackReply(data.messages) };
        }
        console.error("OpenAI chat error:", resp.status, errorText);
        return { error: "Erreur du service IA." };
      }
      const json = await resp.json();
      const content: string = json.choices?.[0]?.message?.content ?? "";
      return { content };
    } catch (e) {
      console.error("OpenAI chat request failed:", e);
      return { content: getFallbackReply(data.messages) };
    }
  });
