export type ServiceIconKey =
  | "websites"
  | "mobile"
  | "dashboards"
  | "booking"
  | "hr"
  | "erp"
  | "ai"
  | "maintenance";

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: ServiceIconKey;
  division: "systems";
  highlights: string[];
};

export const systemsServices: Service[] = [
  {
    slug: "websites",
    title: "تطوير مواقع الويب",
    description:
      "مواقع سريعة، آمنة، متجاوبة، ومُهيّأة لمحركات البحث، تُمثّل علامتك التجارية باحتراف.",
    icon: "websites",
    division: "systems",
    highlights: ["Next.js / React", "أداء عالي", "SEO عربي"],
  },
  {
    slug: "mobile",
    title: "تطبيقات الجوال",
    description:
      "تطبيقات iOS و Android بتجربة استخدام سلسة وأداء عالٍ من الفكرة وحتى متاجر النشر.",
    icon: "mobile",
    division: "systems",
    highlights: ["iOS + Android", "Flutter / React Native", "نشر متاجر"],
  },
  {
    slug: "dashboards",
    title: "داشبورد وأنظمة إدارة",
    description:
      "لوحات تحكم تحليلية حديثة تُوحّد بياناتك وتمنحك قرارات أسرع وأذكى.",
    icon: "dashboards",
    division: "systems",
    highlights: ["تحليلات لحظية", "صلاحيات متقدّمة", "تكامل API"],
  },
  {
    slug: "booking",
    title: "أنظمة الحجوزات",
    description:
      "حلول حجز ودفع متكاملة للمطاعم، الملاعب، العيادات، وقطاع الخدمات.",
    icon: "booking",
    division: "systems",
    highlights: ["دفع إلكتروني", "تقويم ذكي", "إشعارات"],
  },
  {
    slug: "hr",
    title: "أنظمة الموارد البشرية",
    description:
      "أنظمة داخلية لإدارة الموظفين، الحضور، الإجازات، والرواتب بكفاءة كاملة.",
    icon: "hr",
    division: "systems",
    highlights: ["حضور وانصراف", "كشوف رواتب", "تقارير"],
  },
  {
    slug: "erp",
    title: "أنظمة ERP داخلية",
    description:
      "أنظمة مخصّصة تربط أقسام شركتك وتُؤتمت العمليات لرفع الإنتاجية.",
    icon: "erp",
    division: "systems",
    highlights: ["مخصّص بالكامل", "تكامل عميق", "أتمتة"],
  },
  {
    slug: "ai",
    title: "حلول الذكاء الاصطناعي",
    description:
      "نُدمج الذكاء الاصطناعي داخل أنظمتك: روبوتات محادثة، توصيات، وأتمتة ذكية.",
    icon: "ai",
    division: "systems",
    highlights: ["LLM / RAG", "أتمتة", "روبوتات محادثة"],
  },
  {
    slug: "maintenance",
    title: "الصيانة والدعم الفني",
    description:
      "عقود دعم وصيانة دورية تضمن استقرار أنظمتك على مدار الساعة.",
    icon: "maintenance",
    division: "systems",
    highlights: ["مراقبة 24/7", "تحديثات مستمرة", "SLA واضح"],
  },
];

export const allServices = [...systemsServices];
