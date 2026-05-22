"use client";

import * as React from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { uploadMediaAction } from "@/app/admin/actions/upload";
import { cn } from "@/lib/utils";

/**
 * Multi-image uploader that emits multiple <input name="gallery"> hidden
 * fields — one per uploaded URL.  Order is preserved.
 */
export function GalleryUploader({
  name = "gallery",
  defaultValue = [],
  folder = "projects/gallery",
}: {
  name?: string;
  defaultValue?: string[];
  folder?: string;
}) {
  const [items, setItems] = React.useState<string[]>(defaultValue);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setBusy(true);
    setError(null);
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", folder);
        const res = await uploadMediaAction(fd);
        if (res.ok && res.url) {
          setItems((prev) => [...prev, res.url!]);
        } else {
          setError(res.error || "فشل رفع أحد الملفات");
        }
      }
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-3">
      {items.map((url) => (
        <input key={url} type="hidden" name={name} value={url} />
      ))}

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {items.map((url, i) => (
          <div
            key={url + i}
            className="relative aspect-square rounded-xl overflow-hidden ring-1 ring-brand-teal/10 group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="size-full object-cover" />
            <button
              type="button"
              onClick={() => setItems((p) => p.filter((u) => u !== url))}
              className="absolute top-1.5 end-1.5 grid place-items-center size-7 rounded-full bg-white/95 text-rose-600 shadow-soft opacity-0 group-hover:opacity-100 transition"
              aria-label="إزالة"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}

        <label
          className={cn(
            "aspect-square rounded-xl border-2 border-dashed border-brand-teal/20 grid place-items-center text-brand-teal/50 hover:text-brand-teal hover:border-brand-mint/50 cursor-pointer transition",
            busy && "opacity-60 cursor-wait",
          )}
        >
          {busy ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <div className="flex flex-col items-center text-xs gap-1">
              <ImagePlus className="size-5" />
              إضافة صورة
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onPick}
            disabled={busy}
          />
        </label>
      </div>

      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}
