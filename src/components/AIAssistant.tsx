import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK = [
  "Voir les catégories",
  "Comment commander ?",
  "Avez-vous des fauteuils roulants ?",
];

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Bonjour 👋 Je suis l'assistant R2R Medical. Comment puis-je vous aider aujourd'hui ?",
};

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput("");
    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => m !== WELCOME).map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!resp.ok || !resp.body) {
        const err = await resp.json().catch(() => ({ error: "Erreur réseau" }));
        setMessages((p) => [
          ...p,
          { role: "assistant", content: `❌ ${err.error ?? "Une erreur est survenue."}` },
        ]);
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let assistant = "";
      let pushed = false;

      const upsert = (chunk: string) => {
        assistant += chunk;
        setMessages((prev) => {
          if (!pushed) {
            pushed = true;
            return [...prev, { role: "assistant", content: assistant }];
          }
          const copy = prev.slice();
          copy[copy.length - 1] = { role: "assistant", content: assistant };
          return copy;
        });
      };

      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let nl;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(json);
            const content: string | undefined = parsed.choices?.[0]?.delta?.content;
            if (content) upsert(content);
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e) {
      setMessages((p) => [
        ...p,
        { role: "assistant", content: "❌ Connexion impossible. Réessayez." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 240, damping: 20 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full gradient-primary text-primary-foreground grid place-items-center shadow-hero"
        aria-label="Assistant IA"
      >
        {!open && <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div key="b" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-6 z-40 w-[min(92vw,360px)] h-[min(70vh,520px)] rounded-3xl bg-card border border-border shadow-hero flex flex-col overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-border flex items-center gap-3 gradient-primary">
              <div className="h-10 w-10 rounded-full bg-background/20 backdrop-blur grid place-items-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="text-primary-foreground">
                <p className="font-display font-bold text-sm">Assistant R2R</p>
                <p className="text-xs opacity-80">En ligne · Réponses instantanées</p>
              </div>
            </div>

            <div ref={scrollerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-br-sm bg-primary text-primary-foreground text-sm leading-relaxed"
                      : "mr-auto max-w-[85%] px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-muted text-foreground text-sm leading-relaxed whitespace-pre-wrap"
                  }
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="mr-auto max-w-[60%] px-4 py-3 rounded-2xl rounded-bl-sm bg-muted">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 rounded-full bg-muted-foreground/60 animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary-soft text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="p-3 border-t border-border flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question…"
                className="flex-1 h-10 px-4 rounded-full bg-muted text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="h-10 w-10 grid place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50"
                aria-label="Envoyer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
