import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de R2R Medical, fournisseur d'équipements médicaux professionnels au Maroc. Tu parles uniquement en français. Tu aides les clients à trouver des produits parmi ces 10 catégories : Oxygénothérapie & Respiratoire, Anesthésie & Réanimation, Dispositifs Médicaux & Consommables, Diagnostic & Monitoring, Orthopédie & Maintien, Protection & Hygiène, Mobilité & Aide au Déplacement, Instruments Chirurgicaux, Pansements & Soins, Stérilisation. Total : 412 produits. Pour toute commande ou devis, dirige systématiquement l'utilisateur vers WhatsApp. Réponds de façon concise, professionnelle et chaleureuse. Si on te demande un produit spécifique, confirme qu'il existe probablement dans notre catalogue et invite à parcourir le catalogue ou à contacter via WhatsApp.`;

type ChatMsg = { role: "user" | "assistant"; content: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const { messages } = (await request.json()) as { messages: ChatMsg[] };
          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return Response.json(
              { error: "LOVABLE_API_KEY non configuré" },
              { status: 500 },
            );
          }

          const upstream = await fetch(
            "https://ai.gateway.lovable.dev/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "google/gemini-3-flash-preview",
                messages: [
                  { role: "system", content: SYSTEM_PROMPT },
                  ...messages,
                ],
                stream: true,
              }),
            },
          );

          if (!upstream.ok) {
            if (upstream.status === 429) {
              return Response.json(
                { error: "Trop de requêtes, réessayez dans un instant." },
                { status: 429 },
              );
            }
            if (upstream.status === 402) {
              return Response.json(
                { error: "Quota IA épuisé. Veuillez recharger." },
                { status: 402 },
              );
            }
            const text = await upstream.text();
            console.error("AI gateway error:", upstream.status, text);
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
          return Response.json(
            { error: e instanceof Error ? e.message : "Erreur inconnue" },
            { status: 500 },
          );
        }
      },
    },
  },
});
