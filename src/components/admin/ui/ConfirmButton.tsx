"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A confirm-before-submit button.  Renders inside a <form>; first click reveals
 * the "تأكيد" state, the second click actually submits.
 */
export function ConfirmButton({
  children,
  confirmLabel = "تأكيد الحذف",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  confirmLabel?: string;
}) {
  const [armed, setArmed] = React.useState(false);

  React.useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(t);
  }, [armed]);

  return (
    <button
      type={armed ? "submit" : "button"}
      onClick={(e) => {
        if (!armed) {
          e.preventDefault();
          setArmed(true);
        }
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition",
        armed
          ? "bg-rose-600 text-white hover:bg-rose-700"
          : "bg-rose-50 text-rose-600 hover:bg-rose-100 ring-1 ring-rose-200",
        className,
      )}
      {...props}
    >
      {armed ? confirmLabel : children}
    </button>
  );
}
