import { Section, SectionHeader } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/brand/ServiceIcon";
import type { ServiceIconKey } from "@/content/services";

const services: { title: string; description: string; icon: ServiceIconKey }[] = [
  {
    title: "تطوير الويب",
    description:
      "مواقع وتطبيقات ويب سريعة، آمنة، متجاوبة، ومُهيّأة لمحركات البحث.",
    icon: "websites",
  },
  {
    title: "تطبيقات الجوال",
    description:
      "تطبيقات iOS و Android بتجربة سلسة وأداء عالٍ من الفكرة حتى النشر.",
    icon: "mobile",
  },
  {
    title: "أنظمة الأعمال",
    description:
      "أنظمة إدارة وداشبورد و ERP مخصّصة تربط أقسامك وتُؤتمت عملياتك.",
    icon: "erp",
  },
  {
    title: "حلول الذكاء الاصطناعي",
    description:
      "دمج الذكاء الاصطناعي في أنظمتك: روبوتات محادثة، توصيات، وأتمتة ذكية.",
    icon: "ai",
  },
];

export function Services() {
  return (
    <Section>
      <div className="container-pad">
        <SectionHeader
          eyebrow="خدماتنا"
          title={
            <>
              حلول برمجية تُغطّي كل ما يحتاجه{" "}
              <span className="text-gradient">مشروعك</span>
            </>
          }
          description="فريق متخصّص وتقنيات حديثة لبناء منتجات رقمية عالية الجودة."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-3xl border border-brand-teal/10 bg-white p-6 shadow-soft transition-colors hover:border-brand-mint/40"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-mintSoft text-brand-teal">
                <ServiceIcon name={s.icon} className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-brand-teal">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
