"use server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { contactRequestSchema } from "@/lib/validators";

export type SubmitContactState =
  | { ok: true; id: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> }
  | null;

/**
 * Public-facing action that records a new contact / quote request.
 * The `anyone inserts a request` RLS policy allows anon inserts, but we use
 * the service-role client server-side anyway to avoid leaking the row back.
 */
export async function submitContactRequestAction(
  _prev: SubmitContactState,
  formData: FormData,
): Promise<SubmitContactState> {
  const payload = {
    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
    email: formData.get("email") || undefined,
    company: formData.get("company") || null,
    project_type: formData.get("project_type") || "general",
    budget: formData.get("budget") || null,
    timeline: formData.get("timeline") || null,
    message: formData.get("message") || null,
    source_page: formData.get("source_page") || null,
  };

  const parsed = contactRequestSchema.safeParse(payload);
  if (!parsed.success) {
    const f: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      f[issue.path.join(".")] = issue.message;
    }
    return { ok: false, error: "تحقق من بيانات النموذج", fieldErrors: f };
  }

  try {
    const admin = createSupabaseAdminClient();
    const { data, error } = await admin
      .from("contact_requests")
      .insert(parsed.data)
      .select("id")
      .single();

    if (error) return { ok: false, error: error.message };
    return { ok: true, id: data.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "تعذّر إرسال الطلب";
    return { ok: false, error: message };
  }
}
