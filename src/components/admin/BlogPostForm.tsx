"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Field, Input, Textarea, Select } from "@/components/admin/ui/Field";
import { SubmitButton } from "@/components/admin/ui/SubmitButton";
import { ImageUploader } from "@/components/admin/ui/ImageUploader";
import { ConfirmButton } from "@/components/admin/ui/ConfirmButton";
import { AdminCard, AdminCardHeader } from "@/components/admin/ui/Card";
import type { BlogPostRow } from "@/lib/supabase/types";
import type { ActionResult } from "@/app/admin/actions/projects";

type Props = {
  mode: "create" | "edit";
  initial?: BlogPostRow;
  createAction?: (prev: ActionResult | null, fd: FormData) => Promise<ActionResult>;
  updateAction?: (prev: ActionResult | null, fd: FormData) => Promise<ActionResult>;
  deleteAction?: () => Promise<void>;
};

export function BlogPostForm({
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
          <AdminCardHeader title="المحتوى" />
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="العنوان (عربي)" required error={err("title_ar")}>
                <Input
                  name="title_ar"
                  defaultValue={initial?.title_ar ?? ""}
                  required
                />
              </Field>
              <Field label="العنوان (إنجليزي)">
                <Input
                  name="title_en"
                  defaultValue={initial?.title_en ?? ""}
                />
              </Field>
              <Field label="Slug" required error={err("slug")}>
                <Input
                  name="slug"
                  defaultValue={initial?.slug ?? ""}
                  placeholder="ai-in-construction"
                  required
                />
              </Field>
              <Field label="التصنيف">
                <Input
                  name="category"
                  defaultValue={initial?.category ?? ""}
                  placeholder="مثلاً: ذكاء اصطناعي"
                />
              </Field>
              <Field label="الكاتب">
                <Input
                  name="author"
                  defaultValue={initial?.author ?? "فريق Smartech"}
                />
              </Field>
              <Field label="وقت القراءة (دقيقة)">
                <Input
                  type="number"
                  name="reading_time"
                  min={1}
                  max={120}
                  defaultValue={initial?.reading_time ?? 4}
                />
              </Field>
            </div>

            <Field label="المقدّمة (Excerpt)" hint="حتى 280 حرف">
              <Textarea
                name="excerpt"
                defaultValue={initial?.excerpt ?? ""}
                rows={2}
                maxLength={280}
              />
            </Field>

            <Field
              label="المحتوى (Markdown مدعوم)"
              hint="يدعم Markdown / HTML بسيط"
            >
              <Textarea
                name="content"
                defaultValue={initial?.content ?? ""}
                rows={14}
                className="font-mono leading-relaxed text-[13px]"
              />
            </Field>

            <Field label="الوسوم (Tags)" hint="افصل بفاصلة">
              <Input
                name="tags"
                defaultValue={initial?.tags?.join(", ") ?? ""}
                placeholder="AI, تقنية, ريادة"
              />
            </Field>
          </div>
        </AdminCard>

        <AdminCard>
          <AdminCardHeader title="صورة الغلاف" />
          <ImageUploader
            name="cover_image"
            defaultValue={initial?.cover_image}
            folder="blog/cover"
          />
        </AdminCard>

        <AdminCard>
          <AdminCardHeader title="SEO" />
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
            <Field
              label="تاريخ النشر"
              hint="اتركه فارغاً ليُسجَّل تلقائياً عند النشر"
            >
              <Input
                type="datetime-local"
                name="published_at"
                defaultValue={
                  initial?.published_at
                    ? new Date(initial.published_at)
                        .toISOString()
                        .slice(0, 16)
                    : ""
                }
              />
            </Field>
            <div className="pt-2 space-y-2">
              <SubmitButton className="w-full">
                {mode === "create" ? "نشر المقال" : "حفظ التغييرات"}
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
                href="/admin/blog"
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
              <ConfirmButton className="w-full">حذف المقال</ConfirmButton>
            </form>
          </AdminCard>
        )}
      </div>
    </form>
  );
}
