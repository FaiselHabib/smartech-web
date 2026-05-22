import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { CTASection } from "@/components/sections/CTASection";
import { systemsServices, mediaServices } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "الخدمات",
  description:
    "كل خدمات سمارتك جروب: قسم الأنظمة البرمجية (مواقع، تطبيقات، أنظمة، AI) وقسم الميديا (درون، فيديوهات، ريلز، تصوير عقاري).",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="الخدمات"
        title={
          <>
            <span className="text-gradient">برمجة</span> +{" "}
            <span className="text-gradient">إنتاج إعلامي</span> في مكان واحد
          </>
        }
        description="نُقدّم خدماتنا تحت قسمين متخصّصين تحت مظلّة سمارتك جروب — اختر ما يناسب مشروعك."
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

      <Section className="bg-brand-teal text-white">
        <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
        <div className="container-pad">
          <SectionHeader
            align="start"
            eyebrow="Smartech Media"
            title={
              <span className="text-white">
                الإنتاج <span className="text-brand-mint">الإعلامي</span>
              </span>
            }
            description="فريق إنتاج بصري متكامل لجميع احتياجاتك التسويقية."
          />
          <ServiceGrid services={mediaServices} variant="dark" />
        </div>
      </Section>

      <div className="py-16">
        <CTASection />
      </div>
    </>
  );
}
