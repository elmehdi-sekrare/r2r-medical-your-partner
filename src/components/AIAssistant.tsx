import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, ClipboardList, Search, Send, Sparkles, Stethoscope, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK = [
  {
    label: "Je cherche un produit",
    prompt: "Je cherche un équipement médical, pouvez-vous m'orienter ?",
  },
  {
    label: "Besoin d'oxygène",
    prompt: "Je cherche du matériel pour oxygène ou respiration.",
  },
  {
    label: "Fauteuil roulant",
    prompt: "Avez-vous des fauteuils roulants ou aides à la mobilité ?",
  },
  {
    label: "Préparer un devis",
    prompt: "Comment préparer une demande de devis ?",
  },
];

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Bonjour, je suis l'assistant R2R Medical. Je peux vous aider à trouver un produit, choisir une catégorie ou préparer une demande de devis.",
};

const SHORTCUTS = [
  { label: "Catalogue", to: "/catalogue", icon: Search },
  { label: "Devis", to: "/devis", icon: ClipboardList },
  { label: "Tests", to: "/blog/test-produit", icon: Stethoscope },
] as const;

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
      const { chatWithAssistant } = await import("@/chat.functions");
      const history = next
        .filter((m) => m !== WELCOME)
        .map(({ role, content }) => ({ role, content }));
      const res = await chatWithAssistant({ data: { messages: history } });
      const reply = "error" in res && res.error ? `❌ ${res.error}` : (res as { content: string }).content;
      setMessages((p) => [...p, { role: "assistant", content: reply || "…" }]);
    } catch {
      setMessages((p) => [
        ...p,
        { role: "assistant", content: "❌ Connexion impossible. Réessayez." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const resetChat = () => {
    setMessages([WELCOME]);
    setInput("");
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 240, damping: 20 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        className="ai-float fixed bottom-[calc(0.875rem+env(safe-area-inset-bottom))] right-3 z-40 flex items-center gap-3 rounded-full border border-primary/15 bg-card/95 p-2 text-left shadow-hero backdrop-blur transition-colors hover:border-primary/35 sm:bottom-6 sm:right-6 sm:pr-4"
        aria-label="Assistant IA R2R Medical"
      >
        <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full gradient-primary text-primary-foreground shadow-soft sm:h-12 sm:w-12">
          {!open && <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25" />}
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span key="b" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Bot className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        {!open && (
          <span className="hidden min-w-0 sm:block">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Assistant IA
            </span>
            <span className="block max-w-40 truncate text-sm font-semibold text-foreground">
              Que cherchez-vous ?
            </span>
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="ai-panel fixed inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-40 flex h-[min(78dvh,620px)] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-hero sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[min(92vw,390px)]"
          >
            <div className="border-b border-border gradient-primary px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-background/20 backdrop-blur">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="min-w-0 flex-1 text-primary-foreground">
                  <p className="font-display text-sm font-bold">Assistant catalogue</p>
                  <p className="text-xs opacity-80">Recherche produit · Devis · WhatsApp</p>
                </div>
                <button
                  onClick={resetChat}
                  className="rounded-full bg-background/15 px-3 py-1.5 text-xs font-bold text-primary-foreground hover:bg-background/25"
                >
                  Reset
                </button>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {SHORTCUTS.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="flex h-9 items-center justify-center gap-1.5 rounded-full bg-background/15 px-2 text-[11px] font-bold text-primary-foreground hover:bg-background/25"
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div ref={scrollerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.length <= 1 && (
                <div className="rounded-2xl border border-primary/15 bg-primary-soft/35 p-4">
                  <p className="font-display text-sm font-bold">Que voulez-vous faire ?</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Choisissez une demande rapide ou écrivez le produit recherché.
                  </p>
                  <div className="mt-3 grid gap-2">
                    {QUICK.map((q) => (
                      <button
                        key={q.label}
                        onClick={() => send(q.prompt)}
                        className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2 text-left text-xs font-bold hover:border-primary/30 hover:text-primary"
                      >
                        {q.label}
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
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

            <div className="border-t border-border bg-surface/50 px-4 py-3">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Questions rapides
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {QUICK.map((q) => (
                  <button
                    key={q.label}
                    onClick={() => send(q.prompt)}
                    className="shrink-0 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

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
                placeholder="Ex: tensiomètre, fauteuil, oxygène..."
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
