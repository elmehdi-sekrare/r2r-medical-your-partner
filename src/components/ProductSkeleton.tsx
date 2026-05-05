import { cn } from "@/lib/utils";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-muted",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-primary/[0.07] before:to-transparent",
        className,
      )}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <Shimmer className="aspect-[4/3] rounded-xl" />
      <div className="mt-4 space-y-2">
        <Shimmer className="h-3 w-20 rounded-full" />
        <Shimmer className="h-5 w-full rounded-lg" />
        <Shimmer className="h-5 w-3/4 rounded-lg" />
        <div className="flex items-center justify-between pt-2">
          <Shimmer className="h-6 w-24 rounded-full" />
          <Shimmer className="h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <Shimmer className="aspect-square rounded-3xl" />
        <div className="space-y-4">
          <Shimmer className="h-4 w-32 rounded-full" />
          <Shimmer className="h-10 w-full rounded-xl" />
          <Shimmer className="h-6 w-2/3 rounded-lg" />
          <div className="flex gap-3 pt-4">
            <Shimmer className="h-12 w-40 rounded-full" />
            <Shimmer className="h-12 w-40 rounded-full" />
          </div>
          <Shimmer className="mt-8 h-40 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export { Shimmer };
