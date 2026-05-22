export type ServiceIconKey =
  | "websites"
  | "mobile"
  | "dashboards"
  | "booking"
  | "hr"
  | "erp"
  | "ai"
  | "maintenance"
  | "drone"
  | "corporate"
  | "real-estate"
  | "construction"
  | "reels"
  | "ai-edit"
  | "studio";

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: ServiceIconKey;
  division: "systems" | "media";
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

export const mediaServices: Service[] = [
  {
    slug: "drone",
    title: "تصوير الدرون",
    description:
      "لقطات جوية بدقة 4K للمشاريع العقارية والإنشائية والفعاليات والمواقع السياحية.",
    icon: "drone",
    division: "media",
    highlights: ["4K جوّي", "ترخيص تصوير", "إخراج سينمائي"],
  },
  {
    slug: "corporate",
    title: "الفيديوهات التعريفية",
    description:
      "فيديوهات شركات احترافية تُقدّم خدماتك وقيمك بأسلوب بصري مؤثّر.",
    icon: "corporate",
    division: "media",
    highlights: ["سكربت + إخراج", "تصوير احترافي", "مونتاج عالي الجودة"],
  },
  {
    slug: "real-estate",
    title: "تصوير العقارات",
    description:
      "جولات بصرية احترافية تُسرّع البيع والتأجير وتُبرز قيمة المشروع.",
    icon: "real-estate",
    division: "media",
    highlights: ["جولات افتراضية", "تصوير داخلي وخارجي", "درون"],
  },
  {
    slug: "construction",
    title: "توثيق المشاريع الإنشائية",
    description:
      "توثيق مراحل المشاريع بدقة عالية لأغراض التسويق والتقارير الرسمية.",
    icon: "construction",
    division: "media",
    highlights: ["تصوير دوري", "تقارير مرئية", "Time-lapse"],
  },
  {
    slug: "reels",
    title: "ريلز ومحتوى السوشيال",
    description:
      "محتوى قصير سريع التفاعل مُصمّم لـ Instagram و TikTok و Snap.",
    icon: "reels",
    division: "media",
    highlights: ["ريلز قصيرة", "هوية موحّدة", "نشر دوري"],
  },
  {
    slug: "ai-edit",
    title: "المونتاج بالذكاء الاصطناعي",
    description:
      "تسريع الإنتاج عبر أدوات AI لتنقية الصوت، تلوين الصورة، وقصّ ذكي.",
    icon: "ai-edit",
    division: "media",
    highlights: ["AI Color", "تنقية صوت", "أتمتة"],
  },
  {
    slug: "studio",
    title: "تصوير داخلي وخارجي",
    description:
      "جلسات تصوير منتجات، طعام، أشخاص، وتغطيات فعاليات داخل المملكة.",
    icon: "studio",
    division: "media",
    highlights: ["استوديو", "إضاءة احترافية", "تنوّع مواقع"],
  },
];

export const allServices = [...systemsServices, ...mediaServices];
