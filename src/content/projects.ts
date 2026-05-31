export type ProjectCategory =
  | "systems"
  | "websites"
  | "apps"
  | "dashboards";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  cover: string;
  categories: ProjectCategory[];
  problem: string;
  solution: string;
  impact: string;
  tech: string[];
  year: string;
};

export const projects: Project[] = [
  {
    slug: "tmco",
    title: "TMCO",
    tagline: "تطبيق إدارة عمليات لشركة تجارية",
    cover: "/portfolio/tmco-cover.jpg",
    categories: ["systems", "apps", "dashboards"],
    problem:
      "كان الفريق يعتمد على ملفات يدوية متفرّقة لإدارة الطلبات والعملاء مما أبطأ العمليات.",
    solution:
      "بنينا تطبيق جوال متكامل مع داشبورد إدارية تربط الطلبات، الموظفين، والمخزون في مكان واحد.",
    impact: "تقليل الوقت التشغيلي بأكثر من 60% وتوحيد البيانات.",
    tech: ["Flutter", "Node.js", "PostgreSQL", "Next.js Dashboard"],
    year: "2024",
  },
  {
    slug: "gird",
    title: "Gird",
    tagline: "منصّة خدمات رقمية بتجربة استخدام نظيفة",
    cover: "/portfolio/gird-cover.jpg",
    categories: ["systems", "websites", "apps"],
    problem: "حاجة العميل لمنصّة سريعة تربط مزوّدي الخدمة بالعملاء بشكل مباشر.",
    solution:
      "صمّمنا وبرمجنا منصّة ويب وتطبيق جوال مع نظام حجوزات ودفع إلكتروني.",
    impact: "إطلاق ناجح مع نمو متسارع في عدد الحجوزات الشهرية.",
    tech: ["Next.js", "React Native", "Stripe", "Supabase"],
    year: "2024",
  },
  {
    slug: "myfile",
    title: "Myfile",
    tagline: "نظام أرشفة ومستندات ذكي",
    cover: "/portfolio/myfile-cover.jpg",
    categories: ["systems", "dashboards", "websites"],
    problem: "تشتّت الملفات والمستندات داخل الشركة وعدم وجود نظام مركزي للأرشفة.",
    solution:
      "أطلقنا نظام إدارة مستندات سحابي بصلاحيات متقدّمة، بحث ذكي، ومشاركة آمنة.",
    impact: "تسريع الوصول للمعلومة بنسبة تتجاوز 70% وزيادة الأمان.",
    tech: ["Next.js", "AWS S3", "Postgres", "AI Search"],
    year: "2024",
  },
  {
    slug: "padel-booking",
    title: "نظام حجز ملاعب",
    tagline: "حلول حجز رياضية احترافية",
    cover: "/portfolio/padel-cover.jpg",
    categories: ["systems", "websites", "apps"],
    problem: "صعوبة إدارة الحجوزات والمواعيد لملاعب البادل وكرة القدم.",
    solution: "نظام حجز ذكي مع تقويم لحظي، دفع إلكتروني، وإشعارات تلقائية.",
    impact: "تقليل الحجوزات اليدوية ورفع نسبة الإشغال.",
    tech: ["Next.js", "Stripe", "PWA"],
    year: "2025",
  },
];

export const projectFilters: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "الكل" },
  { value: "systems", label: "أنظمة" },
  { value: "websites", label: "مواقع" },
  { value: "apps", label: "تطبيقات" },
  { value: "dashboards", label: "داشبورد" },
];
