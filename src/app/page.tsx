import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { TrustStats } from "@/components/sections/TrustStats";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { getFeaturedProjects } from "@/lib/content/projects";

// Below-the-fold sections are code-split into their own chunks. They are still
// server-rendered (ssr defaults to true) so there is no layout shift or SEO
// loss — only the initial JS the browser must download/parse is reduced.
const DivisionCards = dynamic(() =>
  import("@/components/sections/DivisionCards").then((m) => m.DivisionCards),
);
const FeaturedServices = dynamic(() =>
  import("@/components/sections/FeaturedServices").then((m) => m.FeaturedServices),
);
const FeaturedProjects = dynamic(() =>
  import("@/components/sections/FeaturedProjects").then((m) => m.FeaturedProjects),
);
const WhySmartech = dynamic(() =>
  import("@/components/sections/WhySmartech").then((m) => m.WhySmartech),
);
const Process = dynamic(() =>
  import("@/components/sections/Process").then((m) => m.Process),
);

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
