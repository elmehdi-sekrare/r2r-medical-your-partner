import { createFileRoute } from "@tanstack/react-router";
import { CATEGORIES, PRODUCTS } from "@/data/products";

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de R2R Medical, fournisseur d'équipements médicaux professionnels au Maroc. Tu parles uniquement en français. Tu aides les clients à trouver des produits parmi ces 10 catégories : Oxygénothérapie & Respiratoire, Anesthésie & Réanimation, Dispositifs Médicaux & Consommables, Diagnostic & Monitoring, Orthopédie & Maintien, Protection & Hygiène, Mobilité & Aide au Déplacement, Instruments Chirurgicaux, Pansements & Soins, Stérilisation. Total : 412 produits. Pour toute commande ou devis, dirige systématiquement l'utilisateur vers WhatsApp. Réponds de façon concise, professionnelle et chaleureuse. Si on te demande un produit spécifique, confirme qu'il existe probablement dans notre catalogue et invite à parcourir le catalogue ou à contacter via WhatsApp.`;

type ChatMsg = { role: "user" | "assistant"; content: string };

function getFallbackReply(messages: ChatMsg[]) {
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
    return `Oui, voici des produits proches dans notre catalogue :\n${list}\n\nPour confirmer la disponibilité et recevoir un devis, envoyez la sélection sur WhatsApp.`;
  }

  if (last.includes("catégorie") || last.includes("categorie")) {
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

function fallbackStream(messages: ChatMsg[]) {
  const payload = {
    choices: [{ delta: { content: getFallbackReply(messages) } }],
  };
  const done = "data: [DONE]\n\n";
  return `data: ${JSON.stringify(payload)}\n\n${done}`;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const { messages } = (await request.json()) as { messages: ChatMsg[] };
          const apiKey = process.env.OPENAI_API_KEY;
          if (!apiKey) {
            return new Response(fallbackStream(messages), {
              headers: { "Content-Type": "text/event-stream" },
            });
          }

          const upstream = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                  { role: "system", content: SYSTEM_PROMPT },
                  ...messages,
                ],
                stream: true,
              }),
            },
          );

          if (!upstream.ok) {
            const text = await upstream.text();
            if (upstream.status === 401 || upstream.status === 403) {
              return Response.json(
                { error: "Clé OpenAI invalide ou non autorisée." },
                { status: upstream.status },
              );
            }
            if (upstream.status === 402 || text.includes("insufficient_quota")) {
              return new Response(fallbackStream(messages), {
                headers: { "Content-Type": "text/event-stream" },
              });
            }
            if (upstream.status === 429) {
              return new Response(fallbackStream(messages), {
                headers: { "Content-Type": "text/event-stream" },
              });
            }
            console.error("OpenAI chat error:", upstream.status, text);
            return Response.json(
              { error: "Erreur du service IA" },
              { status: 500 },
            );
          }

          return new Response(upstream.body, {
            headers: { "Content-Type": "text/event-stream" },
          });
        } catch (e) {
          console.error("chat error", e);
          return new Response(fallbackStream([]), {
            headers: { "Content-Type": "text/event-stream" },
          });
        }
      },
    },
  },
});
