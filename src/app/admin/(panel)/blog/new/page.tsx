import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { createBlogPostAction } from "@/app/admin/actions/blog";
import { requireAdmin } from "@/lib/auth/admin-guard";

export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-1.5 text-xs text-brand-teal/60 hover:text-brand-teal mb-2"
        >
          <ArrowRight className="size-3.5" /> العودة للقائمة
        </Link>
        <h1 className="text-2xl font-semibold text-brand-teal">مقال جديد</h1>
        <p className="text-sm text-brand-teal/60 mt-1">
          اكتب مقالاً جديداً للمدونة.
        </p>
      </div>

      <BlogPostForm mode="create" createAction={createBlogPostAction} />
    </div>
  );
}
