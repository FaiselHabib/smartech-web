"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin-guard";
import { projectSchema } from "@/lib/validators";
import type { ProjectInput } from "@/lib/validators";

export type ActionResult =
  | { ok: true; id?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

function readFormPayload(formData: FormData): Partial<ProjectInput> {
  const arr = (k: string) =>
    (formData.get(k) as string | null)
      ?.split(",")
      .map((x) => x.trim())
      .filter(Boolean) ?? [];

  const gallery = formData.getAll("gallery").map(String).filter(Boolean);

  return {
    slug: (formData.get("slug") as string) || "",
    title_ar: (formData.get("title_ar") as string) || "",
    title_en: (formData.get("title_en") as string) || null,
    category: (formData.get("category") as ProjectInput["category"]) || "systems",
    client_name: (formData.get("client_name") as string) || null,
    short_description: (formData.get("short_description") as string) || null,
    full_description: (formData.get("full_description") as string) || null,
    problem: (formData.get("problem") as string) || null,
    solution: (formData.get("solution") as string) || null,
    impact: (formData.get("impact") as string) || null,
    services: arr("services"),
    technologies: arr("technologies"),
    cover_image: (formData.get("cover_image") as string) || null,
    gallery,
    status:
      (formData.get("status") as ProjectInput["status"]) || "draft",
    featured: formData.get("featured") === "on" || formData.get("featured") === "true",
    project_date: (formData.get("project_date") as string) || null,
    seo_title: (formData.get("seo_title") as string) || null,
    seo_description: (formData.get("seo_description") as string) || null,
  };
}

export async function createProjectAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { supabase } = await requireAdmin();

  const parsed = projectSchema.safeParse(readFormPayload(formData));
  if (!parsed.success) {
    const f: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      f[issue.path.join(".")] = issue.message;
    }
    return { ok: false, error: "تحقق من الحقول", fieldErrors: f };
  }

  const { data, error } = await supabase
    .from("projects")
    .insert(parsed.data)
    .select("id, slug")
    .single();

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${data.slug}`);
  redirect(`/admin/projects/${data.id}`);
}

export async function updateProjectAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { supabase } = await requireAdmin();

  const parsed = projectSchema.safeParse(readFormPayload(formData));
  if (!parsed.success) {
    const f: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      f[issue.path.join(".")] = issue.message;
    }
    return { ok: false, error: "تحقق من الحقول", fieldErrors: f };
  }

  const { error } = await supabase
    .from("projects")
    .update(parsed.data)
    .eq("id", id);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${parsed.data.slug}`);
  return { ok: true, id };
}

export async function deleteProjectAction(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  redirect("/admin/projects");
}

export async function toggleProjectFeaturedAction(id: string, featured: boolean) {
  const { supabase } = await requireAdmin();
  await supabase.from("projects").update({ featured }).eq("id", id);
  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
}

export async function toggleProjectStatusAction(
  id: string,
  status: "draft" | "published",
) {
  const { supabase } = await requireAdmin();
  await supabase.from("projects").update({ status }).eq("id", id);
  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
}
