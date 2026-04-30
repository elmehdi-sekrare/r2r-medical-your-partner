import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin, Clock, Check } from "lucide-react";
import { useState } from "react";
import { openWhatsApp, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — R2R Medical | Devis WhatsApp instantané" },
      { name: "description", content: "Contactez R2R Medical au Maroc. Devis WhatsApp instantané, support 7j/7." },
    ],
  }),
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">Contact</span>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
          Parlons de votre <span className="gradient-accent-text">projet médical</span>
        </h1>
        <p className="mt-4 text-muted-foreground">
          Pour un devis ou une commande, le moyen le plus rapide reste WhatsApp.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative overflow-hidden p-10 rounded-3xl gradient-primary text-primary-foreground shadow-hero"
        >
          <div className="absolute inset-0 grid-pattern opacity-15" />
          <div className="relative">
            <MessageCircle className="h-12 w-12" />
            <h2 className="mt-5 font-display text-3xl font-bold">Sur WhatsApp</h2>
            <p className="mt-3 opacity-90 leading-relaxed">
              Notre équipe vous répond en quelques minutes pour devis, conseils techniques et suivi de commande.
            </p>
            <button
              onClick={() => openWhatsApp()}
              className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-whatsapp text-whatsapp-foreground font-bold shadow-elevated"
            >
              <MessageCircle className="h-5 w-5" /> Écrire maintenant
            </button>
            <p className="mt-3 text-sm opacity-80">{WHATSAPP_DISPLAY}</p>

            <div className="mt-10 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 opacity-80" /><span>Lun–Sam<br />8h–18h</span></div>
              <div className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 opacity-80" /><span>Maroc<br />Livraison nationale</span></div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="p-10 rounded-3xl bg-card border border-border shadow-soft"
        >
          <Mail className="h-10 w-10 text-primary" />
          <h2 className="mt-5 font-display text-2xl font-bold">Par email</h2>
          <p className="mt-2 text-sm text-muted-foreground">Laissez-nous votre adresse, nous vous recontactons sous 24h.</p>

          {submitted ? (
            <div className="mt-8 p-6 rounded-2xl bg-success/10 border border-success/30 flex items-start gap-3">
              <Check className="h-5 w-5 text-success mt-0.5" />
              <div>
                <p className="font-semibold">Merci !</p>
                <p className="text-sm text-muted-foreground">Nous vous contacterons bientôt.</p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="mt-6 space-y-4"
            >
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Nom</label>
                <input
                  type="text" required
                  className="mt-1 w-full h-11 px-4 rounded-xl bg-muted border border-transparent focus:border-primary outline-none text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
                <input
                  type="email" required
                  className="mt-1 w-full h-11 px-4 rounded-xl bg-muted border border-transparent focus:border-primary outline-none text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea
                  rows={4} required
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-muted border border-transparent focus:border-primary outline-none text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-elevated transition-shadow"
              >
                Envoyer
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
