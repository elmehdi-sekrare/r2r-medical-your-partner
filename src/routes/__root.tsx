import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { AIAssistant } from "@/components/AIAssistant";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "R2R Medical | Équipements Médicaux Professionnels au Maroc | 412 Produits" },
      {
        name: "description",
        content:
          "Fournisseur leader d'équipements médicaux au Maroc. Oxygénothérapie, diagnostic, orthopédie, instruments chirurgicaux. 412 produits disponibles. Contactez-nous sur WhatsApp.",
      },
      {
        name: "keywords",
        content:
          "équipement médical Maroc, matériel médical Maroc, fournisseur médical Maroc, oxygénothérapie, fauteuil roulant Maroc, stéthoscope Maroc, tensiomètre Maroc",
      },
      { name: "author", content: "R2R Medical" },
      { property: "og:title", content: "R2R Medical | Équipements Médicaux au Maroc" },
      { property: "og:description", content: "412 produits médicaux professionnels. Commande via WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          name: "R2R Medical",
          url: "https://r2rmedical.ma",
          address: { "@type": "PostalAddress", addressCountry: "MA" },
          description: "Fournisseur d'équipements médicaux professionnels au Maroc",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <AIAssistant />
    </div>
  );
}
