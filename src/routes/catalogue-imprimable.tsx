import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, MessageCircle, Printer } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { WHATSAPP_DISPLAY, openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/catalogue-imprimable")({
  component: PrintableCataloguePage,
  head: () => ({
    meta: [
      { title: "Catalogue imprimable — R2R Medical" },
      {
        name: "description",
        content:
          "Catalogue imprimable R2R Medical avec 412 équipements médicaux classés par catégorie.",
      },
    ],
  }),
});

function PrintableCataloguePage() {
  return (
    <div className="print-page mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="print:hidden mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/catalogue"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Retour au catalogue
        </Link>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            <Printer className="h-4 w-4" /> Imprimer
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold hover:bg-muted"
          >
            <Download className="h-4 w-4" /> Sauver en PDF
          </button>
          <button
            onClick={() => openWhatsApp()}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-whatsapp px-4 text-sm font-semibold text-whatsapp-foreground"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </button>
        </div>
      </div>

      <header className="rounded-2xl border border-border bg-card p-8 shadow-soft print:border-0 print:p-0 print:shadow-none">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">R2R Medical</p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
              Catalogue équipements médicaux
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              412 produits professionnels classés par catégorie. Pour confirmer les prix,
              disponibilités et délais de livraison, contactez R2R Medical sur WhatsApp.
            </p>
          </div>
          <div className="rounded-xl bg-surface p-4 text-sm print:border print:border-gray-300">
            <p className="font-semibold">Contact devis</p>
            <p className="mt-1 text-muted-foreground">{WHATSAPP_DISPLAY}</p>
            <p className="text-muted-foreground">Livraison nationale Maroc</p>
          </div>
        </div>
      </header>

      <main className="mt-8 space-y-8 print:mt-6">
        {CATEGORIES.map((category) => {
          const products = PRODUCTS.filter((product) => product.categorySlug === category.slug);
          return (
            <section key={category.slug} className="break-inside-avoid rounded-2xl border border-border bg-card p-6 shadow-soft print:border-gray-300 print:shadow-none">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-display text-2xl font-bold">{category.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                </div>
                <p className="text-sm font-semibold text-primary">{products.length} produits</p>
              </div>
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="py-2 pr-3">Produit</th>
                      <th className="py-2 pr-3">Référence</th>
                      <th className="py-2 pr-3">Prix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.slug} className="border-b border-border/70 last:border-b-0">
                        <td className="py-2 pr-3 font-medium">{product.name}</td>
                        <td className="py-2 pr-3 text-muted-foreground">{product.slug}</td>
                        <td className="py-2 pr-3">{product.price ? `${product.price} MAD` : "Sur devis"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
