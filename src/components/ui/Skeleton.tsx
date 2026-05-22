import { cn } from "@/lib/utils";

/**
 * Brand-aware shimmer skeleton.
 * Use anywhere you would otherwise show a blank box while data loads.
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-brand-mintSoft/60",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent",
        className,
      )}
      {...props}
    />
  );
}

/** Common preset: a service / project card placeholder. */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-brand-teal/10 bg-white/80 backdrop-blur p-6",
        className,
      )}
    >
      <Skeleton className="size-12 rounded-2xl" />
      <Skeleton className="mt-5 h-5 w-2/3 rounded-lg" />
      <Skeleton className="mt-3 h-3 w-full rounded" />
      <Skeleton className="mt-2 h-3 w-5/6 rounded" />
      <Skeleton className="mt-2 h-3 w-4/6 rounded" />
    </div>
  );
}
