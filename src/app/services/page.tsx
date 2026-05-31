import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { CTASection } from "@/components/sections/CTASection";
import { systemsServices } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "الخدمات",
  description:
    "خدمات سمارتك جروب البرمجية: تطوير المواقع، تطبيقات الجوال، أنظمة الأعمال، لوحات التحكم، أنظمة الحجوزات، وحلول الذكاء الاصطناعي.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="الخدمات"
        title={
          <>
            حلول <span className="text-gradient">برمجية</span> متكاملة لمشروعك
          </>
        }
        description="نُقدّم خدمات تطوير برمجية متخصّصة تحت مظلّة سمارتك جروب — اختر ما يناسب مشروعك."
      />

      <Section className="pt-0">
        <div className="container-pad">
          <SectionHeader
            align="start"
            eyebrow="Smartech Systems"
            title={<>الأنظمة والبرمجة</>}
            description="حلول رقمية احترافية للشركات والمؤسسات في المملكة."
          />
          <ServiceGrid services={systemsServices} />
        </div>
      </Section>

      <div className="py-16">
        <CTASection />
      </div>
    </>
  );
}
