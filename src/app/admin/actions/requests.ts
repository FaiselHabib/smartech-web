"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/admin-guard";
import { updateRequestStatusSchema } from "@/lib/validators";
import type { RequestStatus } from "@/lib/supabase/types";

export async function updateRequestStatusAction(
  id: string,
  status: RequestStatus,
) {
  const { supabase } = await requireAdmin();

  const parsed = updateRequestStatusSchema.safeParse({ id, status });
  if (!parsed.success) {
    throw new Error("Invalid status update payload");
  }

  const { error } = await supabase
    .from("contact_requests")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/requests");
}

export async function deleteRequestAction(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("contact_requests").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/requests");
}
