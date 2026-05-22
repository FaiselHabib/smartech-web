import { cn } from "@/lib/utils";
import * as React from "react";

export function AdminCard({
  className,
  children,
  padding = true,
}: {
  className?: string;
  children: React.ReactNode;
  padding?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-brand-teal/10 bg-white/95 shadow-soft",
        padding && "p-5 sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AdminCardHeader({
  title,
  description,
  action,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div>
        <h2 className="text-lg font-semibold text-brand-teal">{title}</h2>
        {description && (
          <p className="text-sm text-brand-teal/60 mt-1">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
