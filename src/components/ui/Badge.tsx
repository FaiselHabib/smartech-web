import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  variant = "soft",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "soft" | "outline" | "solid" | "dark";
}) {
  const variants = {
    soft: "bg-brand-mintSoft text-brand-teal border border-brand-mint/30",
    outline: "border border-brand-teal/15 text-brand-teal bg-white/60",
    solid: "bg-brand-mint text-brand-teal",
    dark: "bg-brand-teal text-white",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
