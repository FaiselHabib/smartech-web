export type ProjectCategory =
  | "systems"
  | "media"
  | "websites"
  | "apps"
  | "dashboards"
  | "drone";

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
  {
    slug: "real-estate-drone",
    title: "تصوير عقاري بالدرون",
    tagline: "إنتاج مرئي لمشاريع عقارية سعودية",
    cover: "/portfolio/drone-cover.jpg",
    categories: ["media", "drone"],
    problem: "حاجة المطوّرين العقاريين لمحتوى مرئي عالي الجودة يُبرز قيمة المشروع.",
    solution: "جلسات تصوير جوّية وأرضية مع مونتاج سينمائي وهوية بصرية موحّدة.",
    impact: "ارتفاع التفاعل على السوشيال وتسريع البيع.",
    tech: ["DJI", "DaVinci Resolve", "After Effects"],
    year: "2025",
  },
  {
    slug: "corporate-reel-series",
    title: "سلسلة ريلز شركات",
    tagline: "محتوى قصير لشركات سعودية ناشئة",
    cover: "/portfolio/reels-cover.jpg",
    categories: ["media"],
    problem: "حاجة الشركات لمحتوى منتظم وعالي الجودة لتغذية حساباتها.",
    solution: "خطة محتوى شهرية، تصوير، مونتاج، وإخراج بأسلوب موحّد.",
    impact: "نمو في الوصول والمتابعين خلال 3 أشهر فقط.",
    tech: ["Premiere", "AI Color", "Sony FX3"],
    year: "2025",
  },
];

export const projectFilters: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "الكل" },
  { value: "systems", label: "أنظمة" },
  { value: "media", label: "ميديا" },
  { value: "websites", label: "مواقع" },
  { value: "apps", label: "تطبيقات" },
  { value: "dashboards", label: "داشبورد" },
  { value: "drone", label: "درون" },
];
