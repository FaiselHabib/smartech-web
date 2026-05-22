import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { createProjectAction } from "@/app/admin/actions/projects";
import { requireAdmin } from "@/lib/auth/admin-guard";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs text-brand-teal/60 hover:text-brand-teal mb-2"
          >
            <ArrowRight className="size-3.5" /> العودة للقائمة
          </Link>
          <h1 className="text-2xl font-semibold text-brand-teal">مشروع جديد</h1>
          <p className="text-sm text-brand-teal/60 mt-1">
            املأ بيانات المشروع لإضافته إلى البورتفوليو.
          </p>
        </div>
      </div>

      <ProjectForm mode="create" createAction={createProjectAction} />
    </div>
  );
}
