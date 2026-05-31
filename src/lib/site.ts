export const site = {
  name: "سمارتك جروب",
  nameEn: "Smartech Group",
  url: "https://smartech-group.com",
  locale: "ar_SA",
  description:
    "سمارتك جروب — شركة سعودية متخصّصة في تطوير البرمجيات. نبني المواقع، تطبيقات الجوال، أنظمة الأعمال، ولوحات التحكم، وحلول الذكاء الاصطناعي لمساعدة المشاريع على النمو رقمياً.",
  shortDescription:
    "شركة سعودية لتطوير البرمجيات — مواقع، تطبيقات، أنظمة أعمال، وحلول ذكاء اصطناعي من جدة.",
  keywords: [
    "شركة برمجة في جدة",
    "شركة برمجة في السعودية",
    "برمجة تطبيقات",
    "تصميم مواقع",
    "تطوير مواقع",
    "أنظمة داخلية",
    "برمجة داشبورد",
    "أنظمة ERP",
    "أنظمة CRM",
    "أنظمة حجوزات",
    "حلول SaaS",
    "حلول ذكاء اصطناعي",
    "سمارتك",
    "Smartech",
    "Smartech Systems",
  ],
  contact: {
    phone: "+966560909811",
    phoneDisplay: "+966 56 090 9811",
    email: "contact@smartech-group.com",
    whatsapp: "https://wa.me/966560909811",
    instagram: "https://instagram.com/smartech.group",
    tiktok: "https://tiktok.com/@smartech.group",
    location: "جدة، المملكة العربية السعودية",
    locationEn: "Jeddah, Saudi Arabia",
  },
  ogImage: "/og/og-default.png",
} as const;

export const nav = [
  { href: "/", label: "الرئيسية" },
  { href: "/systems", label: "الأنظمة" },
  { href: "/portfolio", label: "الأعمال" },
  { href: "/services", label: "الخدمات" },
  { href: "/about", label: "من نحن" },
  { href: "/blog", label: "المدونة" },
  { href: "/contact", label: "تواصل معنا" },
] as const;
