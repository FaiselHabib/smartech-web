"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin-guard";
import { blogPostSchema } from "@/lib/validators";
import type { BlogPostInput } from "@/lib/validators";
import type { ActionResult } from "./projects";

function readBlogPayload(formData: FormData): Partial<BlogPostInput> {
  const tags =
    (formData.get("tags") as string | null)
      ?.split(",")
      .map((x) => x.trim())
      .filter(Boolean) ?? [];

  const rt = formData.get("reading_time");
  const status = (formData.get("status") as BlogPostInput["status"]) || "draft";
  const publishedAt = formData.get("published_at") as string | null;

  return {
    slug: (formData.get("slug") as string) || "",
    title_ar: (formData.get("title_ar") as string) || "",
    title_en: (formData.get("title_en") as string) || null,
    excerpt: (formData.get("excerpt") as string) || null,
    content: (formData.get("content") as string) || null,
    cover_image: (formData.get("cover_image") as string) || null,
    category: (formData.get("category") as string) || null,
    tags,
    author: (formData.get("author") as string) || null,
    reading_time: rt ? Number(rt) : null,
    status,
    published_at:
      publishedAt && publishedAt.length > 0
        ? publishedAt
        : status === "published"
        ? new Date().toISOString()
        : null,
    seo_title: (formData.get("seo_title") as string) || null,
    seo_description: (formData.get("seo_description") as string) || null,
  };
}

export async function createBlogPostAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { supabase } = await requireAdmin();

  const parsed = blogPostSchema.safeParse(readBlogPayload(formData));
  if (!parsed.success) {
    const f: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      f[issue.path.join(".")] = issue.message;
    }
    return { ok: false, error: "تحقق من الحقول", fieldErrors: f };
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert(parsed.data)
    .select("id, slug")
    .single();

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  redirect(`/admin/blog/${data.id}`);
}

export async function updateBlogPostAction(
  id: string,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const { supabase } = await requireAdmin();

  const parsed = blogPostSchema.safeParse(readBlogPayload(formData));
  if (!parsed.success) {
    const f: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      f[issue.path.join(".")] = issue.message;
    }
    return { ok: false, error: "تحقق من الحقول", fieldErrors: f };
  }

  const { error } = await supabase
    .from("blog_posts")
    .update(parsed.data)
    .eq("id", id);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/blog");
  revalidatePath(`/admin/blog/${id}`);
  revalidatePath("/blog");
  revalidatePath(`/blog/${parsed.data.slug}`);
  return { ok: true, id };
}

export async function deleteBlogPostAction(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function toggleBlogStatusAction(
  id: string,
  status: "draft" | "published",
) {
  const { supabase } = await requireAdmin();
  const patch: { status: "draft" | "published"; published_at?: string } = {
    status,
  };
  if (status === "published") patch.published_at = new Date().toISOString();
  await supabase.from("blog_posts").update(patch).eq("id", id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
