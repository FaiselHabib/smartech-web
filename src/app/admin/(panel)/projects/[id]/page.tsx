import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";
import { requireAdmin } from "@/lib/auth/admin-guard";
import { ProjectForm } from "@/components/admin/ProjectForm";
import {
  updateProjectAction,
  deleteProjectAction,
} from "@/app/admin/actions/projects";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireAdmin();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!project) notFound();

  const boundUpdate = updateProjectAction.bind(null, id);
  const boundDelete = deleteProjectAction.bind(null, id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs text-brand-teal/60 hover:text-brand-teal mb-2"
          >
            <ArrowRight className="size-3.5" /> العودة للقائمة
          </Link>
          <h1 className="text-2xl font-semibold text-brand-teal">
            {project.title_ar}
          </h1>
          <p className="text-sm text-brand-teal/60 mt-1">/{project.slug}</p>
        </div>

        {project.status === "published" && (
          <Link
            href={`/portfolio/${project.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full px-4 h-10 text-xs text-brand-teal bg-white ring-1 ring-brand-teal/15 hover:ring-brand-mint/40"
          >
            <ExternalLink className="size-3.5" /> معاينة في الموقع
          </Link>
        )}
      </div>

      <ProjectForm
        mode="edit"
        initial={project}
        updateAction={boundUpdate}
        deleteAction={boundDelete}
      />
    </div>
  );
}
