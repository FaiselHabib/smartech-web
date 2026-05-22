import * as React from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  hint,
  error,
  required,
  children,
  className,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block space-y-1.5", className)}>
      <span className="text-sm font-medium text-brand-teal">
        {label}
        {required && <span className="text-rose-500"> *</span>}
      </span>
      {children}
      {hint && !error && (
        <span className="block text-xs text-brand-teal/50">{hint}</span>
      )}
      {error && (
        <span className="block text-xs text-rose-600">{error}</span>
      )}
    </label>
  );
}

const inputBase =
  "w-full rounded-xl border border-brand-teal/15 bg-white px-3.5 py-2.5 text-sm text-brand-teal placeholder:text-brand-teal/35 transition focus:border-brand-mint focus:outline-none focus:ring-2 focus:ring-brand-mint/30 disabled:opacity-60";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(inputBase, className)} {...props} />;
});

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, rows = 4, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(inputBase, "min-h-[96px] leading-relaxed", className)}
      {...props}
    />
  );
});

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(inputBase, "appearance-none pr-9", className)}
      {...props}
    >
      {children}
    </select>
  );
});

export function Switch({
  name,
  defaultChecked,
  label,
}: {
  name: string;
  defaultChecked?: boolean;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <span className="relative inline-flex">
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="peer sr-only"
        />
        <span className="h-6 w-11 rounded-full bg-brand-teal/15 transition peer-checked:bg-brand-mint" />
        <span className="absolute top-0.5 start-0.5 size-5 rounded-full bg-white shadow-sm transition-all peer-checked:start-[1.375rem]" />
      </span>
      <span className="text-sm text-brand-teal">{label}</span>
    </label>
  );
}
