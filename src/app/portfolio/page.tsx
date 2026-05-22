import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import { ProjectCaseCard } from "@/components/sections/ProjectCaseCard";
import { CTASection } from "@/components/sections/CTASection";
import { getPublicProjects } from "@/lib/content/projects";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "الأعمال",
  description:
    "أعمال سمارتك جروب: تطبيقات، مواقع، أنظمة داخلية، داشبورد، وإنتاج إعلامي. دراسات حالة حقيقية بنتائج قابلة للقياس.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const projects = await getPublicProjects();

  return (
    <>
      <PageHero
        eyebrow="معرض الأعمال"
        title={
          <>
            مشاريع نفّذها فريق <span className="text-gradient">سمارتك</span>
          </>
        }
        description="استعرض أعمالنا في الأنظمة والميديا، وفلتر حسب التخصّص: مواقع، تطبيقات، داشبورد، درون."
      />

      <Section className="pt-0">
        <div className="container-pad">
          <PortfolioGrid projects={projects} />
        </div>
      </Section>

      <Section className="bg-brand-mintSoft/40">
        <div className="absolute inset-0 -z-10 grid-bg opacity-40 mask-fade-b" />
        <div className="container-pad">
          <SectionHeader
            eyebrow="دراسات الحالة"
            title={<>تفاصيل وراء كل مشروع</>}
            description="نشرح لكل مشروع: المشكلة، الحل، والأثر — للحديث بالأرقام لا بالشعارات."
          />
          <div className="space-y-6">
            {projects.map((p) => (
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
