import { Hero } from "@/components/sections/Hero";
import { DivisionCards } from "@/components/sections/DivisionCards";
import { TrustStats } from "@/components/sections/TrustStats";
import { FeaturedServices } from "@/components/sections/FeaturedServices";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { WhySmartech } from "@/components/sections/WhySmartech";
import { Process } from "@/components/sections/Process";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { getFeaturedProjects } from "@/lib/content/projects";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "الرئيسية",
  description:
    "سمارتك جروب — شركة سعودية تجمع بين الحلول البرمجية والإنتاج الإعلامي. نُساعد المشاريع على النمو رقمياً وظهورياً.",
  path: "/",
});

export default async function HomePage() {
  const featured = await getFeaturedProjects(4);
  return (
    <>
      <Hero />
      <TrustStats />
      <DivisionCards />
      <FeaturedServices />
      <FeaturedProjects projects={featured} />
      <WhySmartech />
      <Process />
      <div className="py-16">
        <CTASection />
      </div>
    </>
  );
}
