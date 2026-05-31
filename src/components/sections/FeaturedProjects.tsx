import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import {
  projects as staticProjects,
  type Project,
} from "@/content/projects";

export function FeaturedProjects({ projects }: { projects?: Project[] } = {}) {
  const featured = (projects ?? staticProjects).slice(0, 6);

  return (
    <Section className="bg-brand-mintSoft/50">
      <div className="container-pad">
        <SectionHeader
          eyebrow="أعمالنا"
          title={
            <>
              مشاريع حقيقية، نتائج{" "}
              <span className="text-gradient">قابلة للقياس</span>
            </>
          }
          description="عيّنة من أعمالنا في تطوير الويب، التطبيقات، وأنظمة الأعمال."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/portfolio#${p.slug}`}
              className="group block overflow-hidden rounded-3xl border border-brand-teal/10 bg-white shadow-soft transition-colors hover:border-brand-mint/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-mint/30 via-brand-mintSoft to-brand-teal/10">
                <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
                  <span className="text-3xl font-extrabold text-brand-teal/80">
                    {p.title}
                  </span>
                </div>
                {p.categories[0] && (
                  <span className="absolute top-4 right-4 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-brand-teal">
                    {p.categories[0]}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-brand-teal">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.tagline}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-brand-mintSoft px-2.5 py-1 text-[11px] font-medium text-brand-teal"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-white hover:bg-brand-tealMid transition"
          >
            عرض كل المشاريع
            <ArrowLeft className="size-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
