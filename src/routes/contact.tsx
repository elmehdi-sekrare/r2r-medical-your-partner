import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin, Clock, Check, Phone, Send, Building2, Headphones, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQ";
import { useState } from "react";
import { buildWhatsAppMessageUrl, openWhatsApp, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

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
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    product: "",
    quantity: "",
    message: "",
  });

  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submitLead = () => {
    const message = [
      "Bonjour R2R Medical, je souhaite être contacté pour une demande de devis.",
      "",
      `Nom : ${form.name}`,
      `Téléphone : ${form.phone}`,
      `Ville : ${form.city}`,
      `Produit recherché : ${form.product}`,
      `Quantité : ${form.quantity || "À confirmer"}`,
      `Message : ${form.message || "À confirmer"}`,
    ].join("\n");

    window.open(buildWhatsAppMessageUrl(message), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,oklch(0.93_0.06_255),transparent_55%),radial-gradient(ellipse_at_80%_80%,oklch(0.88_0.1_240),transparent_50%)]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <Breadcrumbs items={[{ label: "Contact" }]} />
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary"
            >
              <Headphones className="h-4 w-4" /> Support & Devis
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tight"
            >
              Parlons de votre{" "}
              <span className="gradient-accent-text">projet médical</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto"
            >
              WhatsApp, formulaire ou téléphone — choisissez le canal qui vous convient pour obtenir un devis rapide.
            </motion.p>
          </div>

          {/* Contact methods strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto"
          >
            {[
              { icon: MessageCircle, label: "WhatsApp", sub: "Réponse en minutes", color: "bg-whatsapp text-whatsapp-foreground", action: () => openWhatsApp() },
              { icon: Phone, label: WHATSAPP_DISPLAY, sub: "Lun–Sam, 8h–18h", color: "bg-primary text-primary-foreground" },
              { icon: MapPin, label: "Tout le Maroc", sub: "Livraison nationale", color: "bg-secondary text-secondary-foreground" },
            ].map((item, i) => (
              <motion.button
                key={item.label}
                onClick={item.action}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400 }}
                className={`flex items-center gap-4 rounded-2xl ${item.color} p-5 shadow-soft text-left transition-shadow hover:shadow-elevated`}
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/20">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display font-bold">{item.label}</p>
                  <p className="text-xs opacity-80">{item.sub}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden p-10 rounded-[2rem] gradient-primary text-primary-foreground shadow-hero"
          >
            <div className="absolute inset-0 grid-pattern opacity-15" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur">
                <MessageCircle className="h-4 w-4" /> Canal recommandé
              </div>
              <h2 className="mt-6 font-display text-3xl font-bold">WhatsApp</h2>
              <p className="mt-4 text-lg opacity-90 leading-relaxed">
                Notre équipe vous répond en quelques minutes pour devis, conseils techniques et suivi de commande.
              </p>
              <button
                onClick={() => openWhatsApp()}
                className="mt-8 inline-flex items-center gap-2 h-14 px-8 rounded-full bg-whatsapp text-whatsapp-foreground font-bold text-lg shadow-elevated transition-transform hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" /> Écrire maintenant
              </button>
              <p className="mt-4 text-sm opacity-80">{WHATSAPP_DISPLAY}</p>

              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { icon: Clock, label: "Réponse rapide", sub: "< 5 min" },
                  { icon: ShieldCheck, label: "Devis gratuit", sub: "Sans engagement" },
                  { icon: Building2, label: "Pro & Particulier", sub: "Tous profils" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/10 p-4 backdrop-blur text-center">
                    <item.icon className="h-5 w-5 mx-auto opacity-80" />
                    <p className="mt-2 text-xs font-bold">{item.label}</p>
                    <p className="text-[10px] opacity-70">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[2rem] bg-card border border-border shadow-hero"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">Demande guidée</h2>
                <p className="text-sm text-muted-foreground">Devis envoyé sur WhatsApp en 1 clic</p>
              </div>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 p-8 rounded-2xl bg-success/10 border border-success/30 text-center"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/20">
                  <Check className="h-8 w-8 text-success" />
                </div>
                <p className="mt-4 font-display text-xl font-bold">Merci pour votre demande !</p>
                <p className="mt-2 text-sm text-muted-foreground">Notre équipe vous contactera très rapidement.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
                >
                  Nouvelle demande
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); submitLead(); }}
                className="mt-8 space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label="Nom" required value={form.name} onChange={(v) => update("name", v)} />
                  <InputField label="Téléphone" type="tel" required value={form.phone} onChange={(v) => update("phone", v)} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label="Ville" required value={form.city} onChange={(v) => update("city", v)} />
                  <InputField label="Quantité" value={form.quantity} onChange={(v) => update("quantity", v)} />
                </div>
                <InputField label="Produit recherché" required value={form.product} onChange={(v) => update("product", v)} placeholder="Nom du produit ou catégorie" />
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="mt-1.5 w-full px-4 py-3 rounded-xl bg-muted border border-transparent focus:border-primary outline-none text-sm resize-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-14 rounded-xl gradient-primary text-primary-foreground font-bold text-lg shadow-soft hover:shadow-elevated transition-shadow"
                >
                  <Send className="inline h-5 w-5 mr-2" />
                  Envoyer sur WhatsApp
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-surface py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FAQSection />
        </div>
      </section>
    </div>
  );
}

function InputField({
  label,
  required,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full h-12 px-4 rounded-xl bg-muted border border-transparent focus:border-primary outline-none text-sm transition-colors"
      />
    </div>
  );
}
