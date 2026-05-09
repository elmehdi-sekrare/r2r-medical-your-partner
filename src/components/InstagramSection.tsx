import { motion } from "framer-motion";
import { Heart, Instagram, MessageCircle, ExternalLink } from "lucide-react";

const INSTA_HANDLE = "r2r.medical";
const INSTA_URL = `https://www.instagram.com/${INSTA_HANDLE}/`;

// Mocked post grid — replace `image`/`href` with real Instagram posts when available.
const POSTS = [
  { image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop", caption: "Nouveaux concentrateurs disponibles", likes: 142 },
  { image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop", caption: "Trousse d'urgence complète", likes: 98 },
  { image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=600&fit=crop", caption: "Stéthoscope Littmann en stock", likes: 211 },
  { image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=600&h=600&fit=crop", caption: "Livraison express Casablanca", likes: 76 },
  { image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&h=600&fit=crop", caption: "Nouvelle gamme orthopédie", likes: 188 },
  { image: "https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?w=600&h=600&fit=crop", caption: "Conseil produit en DM", likes: 124 },
];

export function InstagramSection() {
  return (
    <section className="border-y border-border bg-surface py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500/10 via-orange-500/10 to-yellow-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground/80">
              <Instagram className="h-3.5 w-3.5" /> @{INSTA_HANDLE}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Suivez R2R Medical sur Instagram
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Nouveautés, coulisses livraisons, conseils produit et offres exclusives — chaque semaine.
            </p>
          </div>
          <a
            href={INSTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 px-6 text-sm font-semibold text-white shadow-soft hover:opacity-95 transition"
          >
            <Instagram className="h-4 w-4" /> Suivre @{INSTA_HANDLE}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {POSTS.map((p, i) => (
            <motion.a
              key={i}
              href={INSTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
              aria-label={p.caption}
            >
              <img
                src={p.image}
                alt={p.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/20 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="line-clamp-2 text-xs font-semibold text-white">{p.caption}</p>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-white/90">
                  <span className="inline-flex items-center gap-1"><Heart className="h-3 w-3" /> {p.likes}</span>
                  <ExternalLink className="ml-auto h-3 w-3" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
