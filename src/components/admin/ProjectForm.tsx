"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Field, Input, Textarea, Select, Switch } from "@/components/admin/ui/Field";
import { SubmitButton } from "@/components/admin/ui/SubmitButton";
import { ImageUploader } from "@/components/admin/ui/ImageUploader";
import { GalleryUploader } from "@/components/admin/ui/GalleryUploader";
import { ConfirmButton } from "@/components/admin/ui/ConfirmButton";
import { AdminCard, AdminCardHeader } from "@/components/admin/ui/Card";
import type { ProjectRow } from "@/lib/supabase/types";
import type { ActionResult } from "@/app/admin/actions/projects";

type Props = {
  mode: "create" | "edit";
  initial?: ProjectRow;
  createAction?: (prev: ActionResult | null, fd: FormData) => Promise<ActionResult>;
  updateAction?: (prev: ActionResult | null, fd: FormData) => Promise<ActionResult>;
  deleteAction?: () => Promise<void>;
};

export function ProjectForm({
  mode,
  initial,
  createAction,
  updateAction,
  deleteAction,
}: Props) {
  const action = mode === "create" ? createAction! : updateAction!;
  const [state, formAction] = useActionState<ActionResult | null, FormData>(
    action,
    null,
  );
  const err = (k: string) =>
    state && !state.ok ? state.fieldErrors?.[k] : undefined;

  return (
    <form action={formAction} className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <AdminCard>
          <AdminCardHeader
            title="الأساسيات"
            description="عنوان المشروع، التصنيف، والوصف المختصر."
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="العنوان (عربي)" required error={err("title_ar")}>
              <Input
                name="title_ar"
                defaultValue={initial?.title_ar ?? ""}
                placeholder="منصّة سمارتك"
                required
              />
            </Field>
            <Field label="العنوان (إنجليزي)" error={err("title_en")}>
              <Input
                name="title_en"
                defaultValue={initial?.title_en ?? ""}
                placeholder="Smartech Platform"
              />
            </Field>
            <Field
              label="Slug"
              required
              hint="يُستخدم في رابط المشروع — أحرف لاتينية و-"
              error={err("slug")}
            >
              <Input
                name="slug"
                defaultValue={initial?.slug ?? ""}
                placeholder="smartech-platform"
                required
              />
            </Field>
            <Field label="التصنيف" required error={err("category")}>
              <Select name="category" defaultValue={initial?.category ?? "systems"}>
                <option value="systems">أنظمة</option>
                <option value="media">إعلامي</option>
                <option value="website">موقع ويب</option>
                <option value="app">تطبيق</option>
                <option value="dashboard">داشبورد</option>
                <option value="drone">درون</option>
                <option value="branding">هوية</option>
              </Select>
            </Field>
            <Field label="اسم العميل">
              <Input
                name="client_name"
                defaultValue={initial?.client_name ?? ""}
                placeholder="اختياري"
              />
            </Field>
            <Field label="تاريخ المشروع" hint="بصيغة YYYY-MM-DD">
              <Input
                type="date"
                name="project_date"
                defaultValue={initial?.project_date ?? ""}
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="وصف مختصر" hint="حتى 280 حرف">
              <Textarea
                name="short_description"
                defaultValue={initial?.short_description ?? ""}
                rows={2}
                maxLength={280}
              />
            </Field>
          </div>
        </AdminCard>

        <AdminCard>
          <AdminCardHeader
            title="محتوى الـ Case Study"
            description="المشكلة — الحل — الأثر."
          />
          <div className="space-y-4">
            <Field label="الوصف الكامل">
              <Textarea
                name="full_description"
                defaultValue={initial?.full_description ?? ""}
                rows={4}
              />
            </Field>
            <Field label="المشكلة (Problem)">
              <Textarea
                name="problem"
                defaultValue={initial?.problem ?? ""}
                rows={3}
              />
            </Field>
            <Field label="الحل (Solution)">
              <Textarea
                name="solution"
                defaultValue={initial?.solution ?? ""}
                rows={3}
              />
            </Field>
            <Field label="الأثر (Impact)">
              <Textarea
                name="impact"
                defaultValue={initial?.impact ?? ""}
                rows={3}
              />
            </Field>
          </div>
        </AdminCard>

        <AdminCard>
          <AdminCardHeader
            title="الخدمات والتقنيات"
            description="افصل بين كل عنصر بفاصلة"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="الخدمات (Services)" hint="مثال: تصميم، تطوير، تسويق">
              <Input
                name="services"
                defaultValue={initial?.services?.join(", ") ?? ""}
                placeholder="UI/UX, Web Dev"
              />
            </Field>
            <Field label="التقنيات (Tech)" hint="مثال: Next.js, Supabase">
              <Input
                name="technologies"
                defaultValue={initial?.technologies?.join(", ") ?? ""}
                placeholder="Next.js, Supabase"
              />
            </Field>
          </div>
        </AdminCard>

        <AdminCard>
          <AdminCardHeader
            title="الوسائط"
            description="صورة الغلاف ومعرض الصور"
          />
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-brand-teal mb-2">صورة الغلاف</p>
              <ImageUploader
                name="cover_image"
                defaultValue={initial?.cover_image}
                folder="projects/cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-brand-teal mb-2">معرض الصور</p>
              <GalleryUploader
                name="gallery"
                defaultValue={initial?.gallery ?? []}
                folder="projects/gallery"
              />
            </div>
          </div>
        </AdminCard>

        <AdminCard>
          <AdminCardHeader title="SEO" description="عناوين الميتا لمحركات البحث" />
          <div className="space-y-4">
            <Field label="عنوان SEO" hint="حتى 70 حرف">
              <Input
                name="seo_title"
                defaultValue={initial?.seo_title ?? ""}
                maxLength={70}
              />
            </Field>
            <Field label="وصف SEO" hint="حتى 170 حرف">
              <Textarea
                name="seo_description"
                defaultValue={initial?.seo_description ?? ""}
                rows={2}
                maxLength={170}
              />
            </Field>
          </div>
        </AdminCard>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <AdminCard>
          <AdminCardHeader title="النشر" />
          <div className="space-y-4">
            <Field label="الحالة">
              <Select name="status" defaultValue={initial?.status ?? "draft"}>
                <option value="draft">مسودة</option>
                <option value="published">منشور</option>
              </Select>
            </Field>
            <Switch
              name="featured"
              defaultChecked={initial?.featured ?? false}
              label="مشروع مميّز (Featured)"
            />
            <div className="pt-2 space-y-2">
              <SubmitButton className="w-full">
                {mode === "create" ? "إنشاء المشروع" : "حفظ التغييرات"}
              </SubmitButton>
              {state?.ok && (
                <p className="text-xs text-emerald-600 text-center">
                  تم الحفظ بنجاح
                </p>
              )}
              {state && !state.ok && (
                <p className="text-xs text-rose-600 text-center">
                  {state.error}
                </p>
              )}
              <Link
                href="/admin/projects"
                className="block text-center text-xs text-brand-teal/55 hover:text-brand-teal pt-2"
              >
                إلغاء والعودة للقائمة
              </Link>
            </div>
          </div>
        </AdminCard>

        {mode === "edit" && deleteAction && (
          <AdminCard>
            <AdminCardHeader
              title="منطقة الحذف"
              description="هذا الإجراء لا يمكن التراجع عنه."
            />
            <form action={deleteAction}>
              <ConfirmButton className="w-full">حذف المشروع</ConfirmButton>
            </form>
          </AdminCard>
        )}
      </div>
    </form>
  );
}
