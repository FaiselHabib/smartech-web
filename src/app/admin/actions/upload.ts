"use server";

import { requireAdmin } from "@/lib/auth/admin-guard";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Uploads a file to the `media` bucket and returns its public URL.
 * Only callable by an authenticated admin.
 */
export async function uploadMediaAction(formData: FormData): Promise<{
  ok: boolean;
  url?: string;
  error?: string;
}> {
  await requireAdmin();

  const file = formData.get("file") as File | null;
  const folder = ((formData.get("folder") as string) || "uploads")
    .replace(/[^a-z0-9-_/]/gi, "")
    .slice(0, 60);

  if (!file || !(file instanceof File) || file.size === 0) {
    return { ok: false, error: "ملف غير صالح" };
  }

  if (file.size > 15 * 1024 * 1024) {
    return { ok: false, error: "حجم الملف أكبر من 15MB" };
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `${folder}/${safeName}`;

  // service-role bypasses RLS — caller is already verified admin
  const admin = createSupabaseAdminClient();
  const bytes = Buffer.from(await file.arrayBuffer());

  const { error } = await admin.storage.from("media").upload(path, bytes, {
    contentType: file.type || undefined,
    upsert: false,
  });

  if (error) return { ok: false, error: error.message };

  const { data } = admin.storage.from("media").getPublicUrl(path);
  return { ok: true, url: data.publicUrl };
}
