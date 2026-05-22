"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function SubmitButton({
  children,
  className,
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 h-11 text-sm font-medium transition disabled:opacity-60",
        variant === "primary"
          ? "bg-brand-gradient text-white shadow-brand hover:-translate-y-0.5"
          : "bg-white text-brand-teal ring-1 ring-brand-teal/15 hover:ring-brand-mint/40",
        className,
      )}
    >
      {pending && <Loader2 className="size-4 animate-spin" />}
      {children}
    </button>
  );
}
