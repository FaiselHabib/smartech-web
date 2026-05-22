import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { ProjectCaseCard } from "@/components/sections/ProjectCaseCard";
import { CTASection } from "@/components/sections/CTASection";
import { Process } from "@/components/sections/Process";
import { systemsServices } from "@/content/services";
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Smartech Systems — حلول برمجية",
  description:
    "حلول برمجية متكاملة من سمارتك جروب: مواقع، تطبيقات، أنظمة داخلية، داشبورد، حلول ذكاء اصطناعي، وصيانة.",
  path: "/systems",
  keywords: [
    "شركة برمجة في جدة",
    "تطوير مواقع",
    "برمجة تطبيقات",
    "أنظمة داخلية",
    "برمجة داشبورد",
    "حلول ذكاء اصطناعي",
  ],
});

const systemProjects = projects.filter((p) => p.categories.includes("systems"));

const serviceSchema = systemsServices.map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: s.title,
  provider: { "@type": "Organization", name: site.nameEn },
  areaServed: "SA",
  description: s.description,
}));

export default function SystemsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <PageHero
        eyebrow="Smartech Systems"
        title={
          <>
            حلول برمجية تبني مشروعك من{" "}
            <span className="text-gradient">الفكرة</span> إلى{" "}
            <span className="text-gradient">الإطلاق</span>
          </>
        }
        description="نُقدّم خدمات هندسة برمجيات متكاملة: مواقع، تطبيقات جوال، أنظمة داخلية، داشبورد، وذكاء اصطناعي عملي — بمعايير عالية ومنهجية واضحة."
      />

      <Section className="pt-0">
        <div className="container-pad">
          <SectionHeader
            eyebrow="خدمات Systems"
            title={<>كل ما يحتاجه فريقك التقني</>}
            description="فريق هندسي يبني الحل المناسب لقطاعك وحجم شركتك."
          />
          <ServiceGrid services={systemsServices} />
        </div>
      </Section>

      <Section className="bg-brand-mintSoft/40">
        <div className="absolute inset-0 -z-10 grid-bg opacity-40 mask-fade-b" />
        <div className="container-pad">
          <SectionHeader
            eyebrow="مشاريع Systems"
            title={<>دراسات حالة من أعمالنا</>}
            description="عيّنة من مشاريع الأنظمة والبرمجة التي أنجزها فريق سمارتك."
          />
          <div className="space-y-6">
            {systemProjects.map((p) => (
              <ProjectCaseCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </Section>

      <Process />

      <div className="py-16">
        <CTASection />
      </div>
    </>
  );
}
