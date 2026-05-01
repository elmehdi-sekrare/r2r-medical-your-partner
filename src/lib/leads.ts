import { useEffect, useState } from "react";
import type { QuoteLine } from "@/lib/quote";
import type { QuoteRequestDetails } from "@/lib/whatsapp";

const LEADS_KEY = "r2r.quote.leads";
const LEADS_EVENT = "r2r.quote.leads.changed";

export type QuoteLead = {
  id: string;
  createdAt: string;
  status: "nouveau" | "contacte" | "devis-envoye" | "gagne" | "perdu";
  details: QuoteRequestDetails;
  products: Array<{
    slug: string;
    name: string;
    category: string;
    quantity: number;
    note?: string;
  }>;
};

function emitLeadChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(LEADS_EVENT));
}

function readLeads(): QuoteLead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LEADS_KEY);
    return raw ? (JSON.parse(raw) as QuoteLead[]) : [];
  } catch {
    return [];
  }
}

function writeLeads(leads: QuoteLead[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  emitLeadChange();
}

export function saveQuoteLead(lines: QuoteLine[], details: QuoteRequestDetails): QuoteLead {
  const lead: QuoteLead = {
    id: `DEV-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "nouveau",
    details,
    products: lines.map(({ product, quantity }) => ({
      slug: product.slug,
      name: product.name,
      category: product.category,
      quantity,
      note: details.lineNotes?.[product.slug],
    })),
  };

  writeLeads([lead, ...readLeads()].slice(0, 100));
  return lead;
}

export function getQuoteLeads(): QuoteLead[] {
  return readLeads();
}

export function updateQuoteLeadStatus(id: string, status: QuoteLead["status"]) {
  writeLeads(readLeads().map((lead) => (lead.id === id ? { ...lead, status } : lead)));
}

export function useQuoteLeads() {
  const [leads, setLeads] = useState<QuoteLead[]>(() => readLeads());

  useEffect(() => {
    const sync = () => setLeads(readLeads());
    window.addEventListener(LEADS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(LEADS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return leads;
}
