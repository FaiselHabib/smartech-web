"use client";

import * as React from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { uploadMediaAction } from "@/app/admin/actions/upload";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  defaultValue?: string | null;
  folder?: string;
  label?: string;
};

/**
 * Hidden input + visible drop area.  On file pick, uploads via the
 * `uploadMediaAction` server action and writes the resulting public URL into a
 * hidden <input name={name}>.  Form submission picks up the URL like any other
 * text field.
 */
export function ImageUploader({
  name,
  defaultValue,
  folder = "uploads",
  label = "رفع صورة",
}: Props) {
  const [url, setUrl] = React.useState<string>(defaultValue ?? "");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function handlePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      const res = await uploadMediaAction(fd);
      if (!res.ok || !res.url) {
        setError(res.error || "فشل رفع الصورة");
      } else {
        setUrl(res.url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطأ غير معروف");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={url} />
      <div
        className={cn(
          "relative flex items-center gap-4 rounded-2xl border-2 border-dashed border-brand-teal/15 bg-brand-mintSoft/30 p-4 transition",
          url && "border-solid border-brand-mint/40",
        )}
      >
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt="preview"
            className="size-20 rounded-xl object-cover ring-1 ring-brand-teal/10"
          />
        ) : (
          <div className="grid size-20 place-items-center rounded-xl bg-white ring-1 ring-brand-teal/10 text-brand-teal/40">
            <ImagePlus className="size-7" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-brand-teal">{label}</p>
          <p className="text-xs text-brand-teal/50 truncate">
            {url ? url : "PNG / JPG / WebP — حتى 15MB"}
          </p>
          {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
        </div>

        <div className="flex items-center gap-2">
          {url && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="grid place-items-center size-9 rounded-full bg-white text-rose-600 ring-1 ring-rose-200 hover:bg-rose-50"
              aria-label="إزالة الصورة"
            >
              <X className="size-4" />
            </button>
          )}
          <label
            className={cn(
              "inline-flex items-center gap-2 rounded-full bg-brand-teal px-4 py-2 text-xs font-medium text-white cursor-pointer hover:bg-brand-tealMid",
              busy && "opacity-60 cursor-wait",
            )}
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
            {busy ? "جاري الرفع…" : "اختر ملف"}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePick}
              disabled={busy}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
