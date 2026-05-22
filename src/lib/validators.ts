import { z } from "zod";

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------
export const slugSchema = z
  .string()
  .min(2, "Slug قصير جداً")
  .max(100, "Slug طويل جداً")
  .regex(/^[a-z0-9-]+$/i, "استخدم أحرف لاتينية وأرقام و-");

export const projectCategorySchema = z.enum([
  "systems",
  "media",
  "website",
  "app",
  "dashboard",
  "drone",
  "branding",
]);

export const contentStatusSchema = z.enum(["draft", "published"]);

export const requestTypeSchema = z.enum([
  "general",
  "quote",
  "software",
  "media",
  "both",
  "consultation",
]);

export const requestStatusSchema = z.enum([
  "new",
  "in_progress",
  "replied",
  "closed",
]);

// ---------------------------------------------------------------------------
// projects
// ---------------------------------------------------------------------------
export const projectSchema = z.object({
  slug: slugSchema,
  title_ar: z.string().min(2, "العنوان بالعربي مطلوب"),
  title_en: z.string().optional().nullable(),
  category: projectCategorySchema,
  client_name: z.string().optional().nullable(),
  short_description: z.string().max(280).optional().nullable(),
  full_description: z.string().optional().nullable(),
  problem: z.string().optional().nullable(),
  solution: z.string().optional().nullable(),
  impact: z.string().optional().nullable(),
  services: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  cover_image: z.string().optional().nullable(),
  gallery: z.array(z.string()).default([]),
  status: contentStatusSchema.default("draft"),
  featured: z.boolean().default(false),
  project_date: z.string().optional().nullable(),
  seo_title: z.string().max(70).optional().nullable(),
  seo_description: z.string().max(170).optional().nullable(),
});

export type ProjectInput = z.infer<typeof projectSchema>;

// ---------------------------------------------------------------------------
// blog posts
// ---------------------------------------------------------------------------
export const blogPostSchema = z.object({
  slug: slugSchema,
  title_ar: z.string().min(2, "عنوان المقال مطلوب"),
  title_en: z.string().optional().nullable(),
  excerpt: z.string().max(280).optional().nullable(),
  content: z.string().optional().nullable(),
  cover_image: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  author: z.string().optional().nullable(),
  reading_time: z.coerce.number().int().min(1).max(120).optional().nullable(),
  status: contentStatusSchema.default("draft"),
  published_at: z.string().optional().nullable(),
  seo_title: z.string().max(70).optional().nullable(),
  seo_description: z.string().max(170).optional().nullable(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

// ---------------------------------------------------------------------------
// contact_requests
// ---------------------------------------------------------------------------
export const contactRequestSchema = z.object({
  full_name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(6, "رقم الجوال مطلوب"),
  email: z
    .string()
    .email("البريد غير صالح")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  company: z.string().optional().nullable(),
  project_type: requestTypeSchema.default("general"),
  budget: z.string().optional().nullable(),
  timeline: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  source_page: z.string().optional().nullable(),
});

export type ContactRequestInput = z.infer<typeof contactRequestSchema>;

export const updateRequestStatusSchema = z.object({
  id: z.string().uuid(),
  status: requestStatusSchema,
});

// ---------------------------------------------------------------------------
// auth
// ---------------------------------------------------------------------------
export const loginSchema = z.object({
  email: z.string().email("البريد غير صالح"),
  password: z.string().min(6, "كلمة المرور قصيرة جداً"),
});

export type LoginInput = z.infer<typeof loginSchema>;
