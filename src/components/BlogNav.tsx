import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const BLOG_NAV = [
  { to: "/blog", label: "Articles", icon: BookOpen },
  { to: "/blog/test-produit", label: "Test produit", icon: PlayCircle },
] as const;

export function BlogNav() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <nav className="mx-auto mb-10 flex w-fit rounded-full border border-primary/15 bg-card/80 p-1.5 shadow-elevated backdrop-blur">
      {BLOG_NAV.map((item) => {
        const Icon = item.icon;
        const active = item.to === "/blog" ? pathname === "/blog" || /^\/blog\/(?!test-produit)/.test(pathname) : pathname.startsWith(item.to);

        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-all",
              active ? "gradient-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:bg-surface hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
