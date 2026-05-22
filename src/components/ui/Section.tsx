import * as React from "react";
import { cn } from "@/lib/utils";

export function Section({
  className,
  id,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      id={id}
      className={cn("relative py-20 sm:py-24 lg:py-28", className)}
      {...props}
    />
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "right" | "start";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl mb-12 sm:mb-16",
        align === "center" && "text-center",
        align === "start" && "text-start",
        align === "right" && "text-right",
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 inline-flex items-center gap-2 rounded-full border border-brand-mint/30 bg-brand-mintSoft px-3.5 py-1.5 text-xs font-semibold text-brand-teal",
          )}
        >
          <span className="size-1.5 rounded-full bg-brand-mint" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-tight text-brand-teal text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg leading-8 text-muted-foreground text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
