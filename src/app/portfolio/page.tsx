import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    "أعمال سمارتك جروب: تطبيقات، مواقع، أنظمة داخلية، ولوحات تحكم. دراسات حالة حقيقية بنتائج قابلة للقياس.",
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
        description="استعرض أعمالنا البرمجية، وفلتر حسب التخصّص: أنظمة، مواقع، تطبيقات، ولوحات تحكم."
      />

      {projects.length === 0 ? (
        <Section className="pt-0">
          <div className="container-pad">
            <div className="mx-auto max-w-2xl rounded-[2.5rem] border border-brand-teal/10 bg-white p-10 sm:p-14 text-center shadow-soft">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-teal">
                مشاريعنا في الطريق
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base leading-8 text-muted-foreground">
                نُجهّز مجموعة من دراسات الحالة لعرضها هنا قريباً. في هذه الأثناء،
                تواصل معنا لنطلعك على أعمالنا ونناقش مشروعك.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-white hover:bg-brand-tealMid transition"
                >
                  تواصل معنا
                  <ArrowLeft className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </Section>
      ) : (
        <>
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
        </>
      )}

      <div className="py-16">
        <CTASection />
      </div>
    </>
  );
}
