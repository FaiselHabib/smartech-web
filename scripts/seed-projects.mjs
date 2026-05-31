// Seeds the initial software case studies into Supabase.
// Idempotent: upserts on `slug`, so re-running keeps a single row per project.
// Usage: node scripts/seed-projects.mjs  (reads env from .env.local)

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Minimal .env.local loader (avoids adding a dotenv dependency).
function loadEnv() {
  try {
    const raw = readFileSync(join(__dirname, "..", ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {
    /* env may already be in process.env */
  }
}
loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

const projects = [
  {
    slug: "tmco",
    title_ar: "TMCO",
    title_en: "TMCO",
    category: "systems",
    short_description: "تطبيق إدارة عمليات لشركة تجارية",
    problem:
      "كان الفريق يعتمد على ملفات يدوية متفرّقة لإدارة الطلبات والعملاء مما أبطأ العمليات.",
    solution:
      "بنينا تطبيق جوال متكامل مع داشبورد إدارية تربط الطلبات، الموظفين، والمخزون في مكان واحد.",
    impact: "تقليل الوقت التشغيلي بأكثر من 60% وتوحيد البيانات.",
    technologies: ["Flutter", "Node.js", "PostgreSQL", "Next.js Dashboard"],
    cover_image: "/portfolio/tmco-cover.jpg",
    status: "published",
    featured: true,
    project_date: "2024-01-01",
  },
  {
    slug: "gird",
    title_ar: "Gird",
    title_en: "Gird",
    category: "systems",
    short_description: "منصّة خدمات رقمية بتجربة استخدام نظيفة",
    problem: "حاجة العميل لمنصّة سريعة تربط مزوّدي الخدمة بالعملاء بشكل مباشر.",
    solution:
      "صمّمنا وبرمجنا منصّة ويب وتطبيق جوال مع نظام حجوزات ودفع إلكتروني.",
    impact: "إطلاق ناجح مع نمو متسارع في عدد الحجوزات الشهرية.",
    technologies: ["Next.js", "React Native", "Stripe", "Supabase"],
    cover_image: "/portfolio/gird-cover.jpg",
    status: "published",
    featured: true,
    project_date: "2024-01-01",
  },
  {
    slug: "myfile",
    title_ar: "Myfile",
    title_en: "Myfile",
    category: "systems",
    short_description: "نظام أرشفة ومستندات ذكي",
    problem:
      "تشتّت الملفات والمستندات داخل الشركة وعدم وجود نظام مركزي للأرشفة.",
    solution:
      "أطلقنا نظام إدارة مستندات سحابي بصلاحيات متقدّمة، بحث ذكي، ومشاركة آمنة.",
    impact: "تسريع الوصول للمعلومة بنسبة تتجاوز 70% وزيادة الأمان.",
    technologies: ["Next.js", "AWS S3", "Postgres", "AI Search"],
    cover_image: "/portfolio/myfile-cover.jpg",
    status: "published",
    featured: true,
    project_date: "2024-01-01",
  },
  {
    slug: "padel-booking",
    title_ar: "نظام حجز ملاعب",
    title_en: "Padel Booking",
    category: "systems",
    short_description: "حلول حجز رياضية احترافية",
    problem: "صعوبة إدارة الحجوزات والمواعيد لملاعب البادل وكرة القدم.",
    solution: "نظام حجز ذكي مع تقويم لحظي، دفع إلكتروني، وإشعارات تلقائية.",
    impact: "تقليل الحجوزات اليدوية ورفع نسبة الإشغال.",
    technologies: ["Next.js", "Stripe", "PWA"],
    cover_image: "/portfolio/padel-cover.jpg",
    status: "published",
    featured: true,
    project_date: "2025-01-01",
  },
];

const { data, error } = await supabase
  .from("projects")
  .upsert(projects, { onConflict: "slug" })
  .select("slug, status, featured");

if (error) {
  console.error("Seed failed:", error.message);
  process.exit(1);
}

console.log(`Seeded ${data.length} projects:`);
for (const p of data) {
  console.log(`  - ${p.slug} (${p.status}, featured=${p.featured})`);
}
