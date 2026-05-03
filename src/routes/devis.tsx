import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Building2, Check, ClipboardList, FileText, MapPin, MessageCircle, Minus, PackageCheck, Plus, Printer, Search, ShieldCheck, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { PriceStatusBadge } from "@/components/AvailabilityBadge";
import { EmptyState } from "@/components/EmptyState";
import { ProductThumb } from "@/components/ProductThumb";
import { saveQuoteLead } from "@/lib/leads";
import { clearQuote, removeFromQuote, updateQuoteQuantity, useQuoteBasket } from "@/lib/quote";
import { buildQuoteMessage, openQuoteWhatsApp, type QuoteRequestDetails } from "@/lib/whatsapp";

export const Route = createFileRoute("/devis")({
  component: QuotePage,
  head: () => ({
    meta: [
      { title: "Demande de devis — R2R Medical" },
      {
        name: "description",
        content:
          "Préparez votre demande de devis R2R Medical et envoyez votre sélection de produits par WhatsApp.",
      },
    ],
  }),
});

function QuotePage() {
  const { lines, totalQuantity } = useQuoteBasket();
  const [submitted, setSubmitted] = useState(false);
  const [details, setDetails] = useState<Required<QuoteRequestDetails>>({
    name: "",
    company: "",
    phone: "",
    city: "",
    urgency: "Standard",
    delivery: "Livraison nationale",
    notes: "",
    lineNotes: {},
  });

  const messagePreview = useMemo(() => buildQuoteMessage(lines, details), [details, lines]);
  const completedFields = [details.name, details.company, details.phone, details.city].filter(Boolean).length;
  const completion = Math.round((completedFields / 4) * 100);

  const updateDetails = (key: keyof Omit<Required<QuoteRequestDetails>, "lineNotes">, value: string) => {
    setDetails((current) => ({ ...current, [key]: value }));
  };

  const updateLineNote = (slug: string, value: string) => {
    setDetails((current) => ({
      ...current,
      lineNotes: {
        ...current.lineNotes,
        [slug]: value,
      },
    }));
  };

  const submitQuote = () => {
    saveQuoteLead(lines, details);
    openQuoteWhatsApp(lines, details);
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Link
        to="/catalogue"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Retour au catalogue
      </Link>

      <section className="relative mt-6 overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-hero sm:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,oklch(0.93_0.06_255),transparent_35%),radial-gradient(circle_at_90%_10%,oklch(0.88_0.1_240),transparent_34%)]" />
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <ClipboardList className="h-3.5 w-3.5" /> Devis professionnel
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Demande de devis
          </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Préparez une demande claire avec produits, quantités, ville et notes. Le message WhatsApp est généré automatiquement.
          </p>
        </div>
          <div className="grid min-w-[min(100%,360px)] grid-cols-3 gap-3">
            {[
              { label: "Produits", value: lines.length, icon: PackageCheck },
              { label: "Quantité", value: totalQuantity, icon: ClipboardList },
              { label: "Profil", value: `${completion}%`, icon: Building2 },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-background/80 p-4 shadow-soft backdrop-blur">
                <item.icon className="h-5 w-5 text-primary" />
                <p className="mt-2 font-display text-2xl font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lines.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            icon={FileText}
            eyebrow="Demande de devis"
            title="Votre demande est vide"
            description="Ajoutez des produits depuis le catalogue pour créer une demande complète avec quantités, notes, ville et message WhatsApp prêt à envoyer."
          >
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/catalogue"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
              >
                <Search className="h-4 w-4" /> Explorer le catalogue
              </Link>
              <Link
                to="/catalogue"
                search={{ q: "oxygene" }}
                className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-card px-5 text-sm font-semibold hover:text-primary"
              >
                Besoin oxygène
              </Link>
            </div>
          </EmptyState>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_400px]">
          <div className="space-y-5">
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-lg font-bold">1. Produits sélectionnés</p>
                <p className="text-sm text-muted-foreground">
                  Vérifiez les quantités et ajoutez une note si un modèle, une dimension ou une urgence doit être précisé.
                </p>
              </div>
              <button
                onClick={() => clearQuote()}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm font-medium hover:bg-muted"
              >
                <Trash2 className="h-4 w-4" /> Vider
              </button>
            </div>

            {lines.map(({ product, quantity }) => (
              <div
                key={product.slug}
                className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-shadow hover:shadow-elevated"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--primary),var(--whatsapp))]" />
                <div className="grid gap-0 md:grid-cols-[190px_1fr]">
                  <Link
                    to="/produit/$slug"
                    params={{ slug: product.slug }}
                    className="relative min-h-44 overflow-hidden border-b border-border bg-[radial-gradient(circle_at_50%_25%,white,oklch(0.95_0.03_250))] p-4 md:border-b-0 md:border-r"
                  >
                    <div className="absolute inset-0 brand-circuit opacity-20" />
                    <ProductThumb
                      product={product}
                      className="relative h-full min-h-36 rounded-2xl border border-border bg-card shadow-sm"
                      imageClassName="p-3"
                    />
                  </Link>

                  <div className="grid gap-4 p-4 xl:grid-cols-[1fr_190px]">
                    <div className="min-w-0">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                          {product.category}
                        </span>
                        <PriceStatusBadge price={product.price} compact />
                      </div>
                      <Link
                        to="/produit/$slug"
                        params={{ slug: product.slug }}
                        className="mt-3 block font-display text-xl font-bold leading-tight hover:text-primary"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">
                        Référence devis : {product.slug}
                      </p>
                      <textarea
                        value={details.lineNotes[product.slug] ?? ""}
                        onChange={(event) => updateLineNote(product.slug, event.target.value)}
                        placeholder="Note : dimensions, modèle, urgence..."
                        rows={2}
                        className="mt-4 w-full resize-none rounded-2xl border border-transparent bg-muted px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    </div>

                    <div className="grid min-h-[176px] place-items-center rounded-2xl border border-border bg-surface p-3">
                      <div className="grid w-full gap-5">
                      <div className="grid justify-items-center">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Quantité</p>
                        <div className="mt-2 inline-flex h-11 items-center rounded-full border border-border bg-card p-1">
                          <button
                            onClick={() => updateQuoteQuantity(product.slug, quantity - 1)}
                            className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
                            aria-label="Réduire la quantité"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-10 text-center font-display text-lg font-bold">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuoteQuantity(product.slug, quantity + 1)}
                            className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromQuote(product.slug)}
                        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 text-sm font-medium hover:bg-muted xl:w-full"
                        aria-label={`Retirer ${product.name} du devis`}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Retirer</span>
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit space-y-4 rounded-3xl border border-border bg-card p-5 shadow-hero lg:sticky lg:top-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <Building2 className="h-3.5 w-3.5" /> Devis professionnel
              </div>
              <h2 className="mt-3 font-display text-xl font-bold">2. Informations client</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Ces informations préparent un message WhatsApp complet pour accélérer la réponse de R2R Medical.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <span>Profil complété</span>
                <span>{completion}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${completion}%` }} />
              </div>
            </div>

            {submitted && (
              <div className="flex items-start gap-2 rounded-xl border border-success/30 bg-success/10 p-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>Demande enregistrée. Vous pouvez suivre ce lead dans l'admin.</span>
              </div>
            )}

            <div className="grid gap-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Nom complet
                <input
                  value={details.name}
                  onChange={(event) => updateDetails("name", event.target.value)}
                  className="mt-1 h-10 w-full rounded-xl border border-transparent bg-muted px-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-primary"
                />
              </label>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Société / Clinique
                <input
                  value={details.company}
                  onChange={(event) => updateDetails("company", event.target.value)}
                  className="mt-1 h-10 w-full rounded-xl border border-transparent bg-muted px-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-primary"
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Téléphone
                  <input
                    value={details.phone}
                    onChange={(event) => updateDetails("phone", event.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-transparent bg-muted px-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-primary"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Ville
                  <input
                    value={details.city}
                    onChange={(event) => updateDetails("city", event.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-transparent bg-muted px-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-primary"
                  />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Urgence
                  <select
                    value={details.urgency}
                    onChange={(event) => updateDetails("urgency", event.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-transparent bg-muted px-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-primary"
                  >
                    <option>Standard</option>
                    <option>Urgent</option>
                    <option>Cette semaine</option>
                    <option>À planifier</option>
                  </select>
                </label>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Livraison
                  <select
                    value={details.delivery}
                    onChange={(event) => updateDetails("delivery", event.target.value)}
                    className="mt-1 h-10 w-full rounded-xl border border-transparent bg-muted px-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-primary"
                  >
                    <option>Livraison nationale</option>
                    <option>Retrait magasin</option>
                    <option>À confirmer</option>
                  </select>
                </label>
              </div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Message général
                <textarea
                  value={details.notes}
                  onChange={(event) => updateDetails("notes", event.target.value)}
                  rows={3}
                  className="mt-1 w-full resize-none rounded-xl border border-transparent bg-muted px-3 py-2 text-sm font-normal normal-case tracking-normal outline-none focus:border-primary"
                />
              </label>
            </div>

            <div className="grid gap-2 rounded-2xl border border-primary/15 bg-primary-soft/35 p-4">
              {[
                { icon: ShieldCheck, text: "Disponibilité et délai confirmés par conseiller" },
                { icon: MapPin, text: "Ville utilisée pour préparer la livraison" },
                { icon: MessageCircle, text: "Message WhatsApp prêt à envoyer" },
              ].map((item) => (
                <div key={item.text} className="flex gap-2 text-xs font-semibold text-foreground/80">
                  <item.icon className="h-4 w-4 shrink-0 text-primary" />
                  {item.text}
                </div>
              ))}
            </div>

            <details className="rounded-xl border border-border bg-surface p-3">
              <summary className="cursor-pointer text-sm font-semibold">3. Aperçu du message</summary>
              <pre className="mt-3 max-h-48 overflow-y-auto whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
                {messagePreview}
              </pre>
            </details>

            <button
              onClick={submitQuote}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-whatsapp px-5 font-bold text-whatsapp-foreground shadow-soft hover:shadow-elevated"
            >
              <MessageCircle className="h-5 w-5" /> Envoyer sur WhatsApp
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => window.print()}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border text-sm font-semibold hover:bg-muted"
              >
                <Printer className="h-4 w-4" /> Imprimer
              </button>
              <button
                onClick={() => navigator.clipboard?.writeText(messagePreview)}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border text-sm font-semibold hover:bg-muted"
              >
                <FileText className="h-4 w-4" /> Copier
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
