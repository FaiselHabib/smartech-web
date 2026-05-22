"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Toast = { id: number; tone: "success" | "error" | "info"; message: string };

const ToastCtx = React.createContext<{
  push: (t: Omit<Toast, "id">) => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<Toast[]>([]);
  const push = React.useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((x) => x.id !== id));
    }, 4500);
  }, []);

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-3">
        {items.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto w-full max-w-sm rounded-2xl px-4 py-3 text-sm shadow-glass backdrop-blur ring-1",
              t.tone === "success" &&
                "bg-emerald-50/95 text-emerald-800 ring-emerald-200",
              t.tone === "error" &&
                "bg-rose-50/95 text-rose-800 ring-rose-200",
              t.tone === "info" &&
                "bg-white/95 text-brand-teal ring-brand-teal/15",
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
