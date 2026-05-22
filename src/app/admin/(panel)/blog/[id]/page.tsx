import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { requireAdmin } from "@/lib/auth/admin-guard";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import {
  updateBlogPostAction,
  deleteBlogPostAction,
} from "@/app/admin/actions/blog";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireAdmin();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!post) notFound();

  const boundUpdate = updateBlogPostAction.bind(null, id);
  const boundDelete = deleteBlogPostAction.bind(null, id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 text-xs text-brand-teal/60 hover:text-brand-teal mb-2"
          >
            <ArrowRight className="size-3.5" /> العودة للقائمة
          </Link>
          <h1 className="text-2xl font-semibold text-brand-teal">
            {post.title_ar}
          </h1>
          <p className="text-sm text-brand-teal/60 mt-1">/{post.slug}</p>
        </div>

        {post.status === "published" && (
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full px-4 h-10 text-xs text-brand-teal bg-white ring-1 ring-brand-teal/15 hover:ring-brand-mint/40"
          >
            <ExternalLink className="size-3.5" /> معاينة في الموقع
          </Link>
        )}
      </div>

      <BlogPostForm
        mode="edit"
        initial={post}
        updateAction={boundUpdate}
        deleteAction={boundDelete}
      />
    </div>
  );
}
