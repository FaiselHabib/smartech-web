"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validators";

export type AuthState =
  | { ok: true }
  | { ok: false; error: string }
  | null;

export async function signInAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "بيانات غير صالحة",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { ok: false, error: "بيانات الدخول غير صحيحة" };
  }

  // verify admin flag
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "تعذّر التحقق من المستخدم" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.is_admin) {
    await supabase.auth.signOut();
    return {
      ok: false,
      error: "هذا الحساب لا يملك صلاحيات إدارية",
    };
  }

  const redirectTo = (formData.get("redirect") as string) || "/admin";
  redirect(redirectTo);
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
