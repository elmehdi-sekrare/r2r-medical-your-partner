import { createServerFn } from "@tanstack/react-start";

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de R2R Medical, fournisseur d'équipements médicaux professionnels au Maroc. Tu parles uniquement en français. Tu aides les clients à trouver des produits parmi ces 10 catégories : Oxygénothérapie & Respiratoire, Anesthésie & Réanimation, Dispositifs Médicaux & Consommables, Diagnostic & Monitoring, Orthopédie & Maintien, Protection & Hygiène, Mobilité & Aide au Déplacement, Instruments Chirurgicaux, Pansements & Soins, Stérilisation. Total : 412 produits. Pour toute commande ou devis, dirige systématiquement l'utilisateur vers WhatsApp. Réponds de façon concise, professionnelle et chaleureuse en 2-4 phrases maximum.`;

type Msg = { role: "user" | "assistant"; content: string };

export const chatWithAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: { messages: Msg[] }) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { error: "Service IA non configuré." };
    }
    try {
      const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...data.messages],
        }),
      });
      if (resp.status === 429) return { error: "Trop de requêtes, réessayez dans un instant." };
      if (resp.status === 402) return { error: "Quota IA épuisé." };
      if (!resp.ok) return { error: "Erreur du service IA." };
      const json = await resp.json();
      const content: string = json.choices?.[0]?.message?.content ?? "";
      return { content };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Erreur inconnue" };
    }
  });
