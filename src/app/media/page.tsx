import { Section, SectionHeader } from "@/components/ui/Section";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { ProjectCaseCard } from "@/components/sections/ProjectCaseCard";
import { CTASection } from "@/components/sections/CTASection";
import { MediaHero } from "@/components/sections/MediaHero";
import { mediaServices } from "@/content/services";
import { getPublicProjects } from "@/lib/content/projects";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Smartech Media — إنتاج إعلامي",
  description:
    "إنتاج إعلامي احترافي من سمارتك جروب: تصوير درون، فيديوهات شركات، تصوير عقاري، توثيق مشاريع، ريلز، ومونتاج بالذكاء الاصطناعي.",
  path: "/media",
  keywords: [
    "تصوير درون في جدة",
    "تصوير عقاري",
    "إنتاج فيديو للشركات",
    "تصوير المشاريع",
    "ريلز سوشيال ميديا",
  ],
});

const serviceSchema = mediaServices.map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: s.title,
  provider: { "@type": "Organization", name: site.nameEn },
  areaServed: "SA",
  description: s.description,
}));

export default async function MediaPage() {
  const allProjects = await getPublicProjects();
  const mediaProjects = allProjects.filter((p) =>
    p.categories.includes("media"),
  );
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <MediaHero />

      <Section className="bg-brand-tealDeep text-white">
        <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
        <div className="absolute -top-20 right-0 -z-10 size-[400px] rounded-full bg-brand-mint/15 blur-3xl" />
        <div className="container-pad">
          <SectionHeader
            eyebrow="خدمات Media"
            title={
              <span className="text-white">
                إنتاج بصري <span className="text-brand-mint">سينمائي</span>
              </span>
            }
            description="من السكربت إلى المونتاج النهائي — تجربة إنتاج كاملة بأسلوب موحّد لعلامتك."
          />
          <ServiceGrid services={mediaServices} variant="dark" />
        </div>
      </Section>

      <Section>
        <div className="container-pad">
          <SectionHeader
            eyebrow="مشاريع Media"
            title={<>أعمال إعلامية مختارة</>}
            description="مشاريع تصوير وإنتاج بصري نفّذها فريق سمارتك ميديا."
          />
          <div className="space-y-6">
            {mediaProjects.map((p) => (
              <ProjectCaseCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </Section>

      <div className="py-16">
        <CTASection />
      </div>
    </>
  );
}
