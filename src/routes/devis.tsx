import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Building2, Check, FileText, MessageCircle, Minus, Plus, Printer, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/catalogue"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Retour au catalogue
      </Link>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Demande de devis
          </h1>
          <p className="mt-2 text-muted-foreground">
            {totalQuantity} produit{totalQuantity > 1 ? "s" : ""} dans votre sélection.
          </p>
        </div>
        {lines.length > 0 && (
          <button
            onClick={() => clearQuote()}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm font-medium hover:bg-muted"
          >
            <Trash2 className="h-4 w-4" /> Vider
          </button>
        )}
      </div>

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
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-3">
            {lines.map(({ product, quantity }) => (
              <div
                key={product.slug}
                className="grid grid-cols-[72px_1fr] gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft sm:grid-cols-[88px_1fr_auto]"
              >
                <Link
                  to="/produit/$slug"
                  params={{ slug: product.slug }}
                  className="aspect-square overflow-hidden rounded-xl bg-surface"
                >
                  <ProductThumb product={product} className="h-full w-full" imageClassName="p-2" />
                </Link>
                <div className="min-w-0">
                  <Link
                    to="/produit/$slug"
                    params={{ slug: product.slug }}
                    className="font-display font-semibold hover:text-primary"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
                  <textarea
                    value={details.lineNotes[product.slug] ?? ""}
                    onChange={(event) => updateLineNote(product.slug, event.target.value)}
                    placeholder="Note pour ce produit : dimensions, modèle, urgence..."
                    rows={2}
                    className="mt-3 w-full resize-none rounded-xl border border-transparent bg-muted px-3 py-2 text-xs outline-none focus:border-primary"
                  />
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => updateQuoteQuantity(product.slug, quantity - 1)}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted"
                      aria-label="Réduire la quantité"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="grid h-8 min-w-10 place-items-center rounded-lg bg-muted px-3 text-sm font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuoteQuantity(product.slug, quantity + 1)}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-muted"
                      aria-label="Augmenter la quantité"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromQuote(product.slug)}
                  className="col-span-2 inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border text-sm font-medium hover:bg-muted sm:col-span-1 sm:self-center sm:px-3"
                >
                  <Trash2 className="h-4 w-4" /> Retirer
                </button>
              </div>
            ))}
          </div>

          <aside className="h-fit space-y-4 rounded-2xl border border-border bg-card p-5 shadow-soft lg:sticky lg:top-24">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <Building2 className="h-3.5 w-3.5" /> Devis professionnel
              </div>
              <h2 className="mt-3 font-display text-xl font-bold">Informations de demande</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Ces informations préparent un message WhatsApp complet et enregistrent la demande dans
                l'espace admin local.
              </p>
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

            <details className="rounded-xl border border-border bg-surface p-3">
              <summary className="cursor-pointer text-sm font-semibold">Aperçu du message</summary>
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
