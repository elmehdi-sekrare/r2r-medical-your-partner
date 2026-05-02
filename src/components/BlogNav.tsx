import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const BLOG_NAV = [
  { to: "/blog", label: "Articles conseils", caption: "Guides & choix", icon: BookOpen },
  { to: "/blog/test-produit", label: "Tests produit", caption: "Vidéos & avis", icon: PlayCircle },
] as const;

export function BlogNav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <nav className="mx-auto mb-10 grid w-full max-w-xl grid-cols-2 rounded-[1.5rem] border border-primary/15 bg-card/80 p-1.5 shadow-elevated backdrop-blur">
      {BLOG_NAV.map((item) => {
        const Icon = item.icon;
        const active = item.to === "/blog" ? pathname === "/blog" || /^\/blog\/(?!test-produit)/.test(pathname) : pathname.startsWith(item.to);

        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "grid min-h-14 grid-cols-[auto_1fr] items-center gap-3 rounded-[1.15rem] px-4 py-2 text-left transition-all",
              active ? "gradient-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:bg-surface hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            <span>
              <span className="block text-sm font-bold leading-tight">{item.label}</span>
              <span className={cn("block text-[11px] font-semibold", active ? "text-primary-foreground/70" : "text-muted-foreground")}>
                {item.caption}
              </span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
