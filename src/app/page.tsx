import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { AboutSmartech } from "@/components/sections/AboutSmartech";
import { HomeContact } from "@/components/sections/HomeContact";
import { buildMetadata } from "@/lib/seo";
import { getFeaturedProjects } from "@/lib/content/projects";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "الرئيسية",
  description:
    "سمارتك — شركة سعودية لتطوير البرمجيات: مواقع، تطبيقات جوال، أنظمة أعمال، وحلول ذكاء اصطناعي بأداء عالٍ وتصميم احترافي.",
  path: "/",
});

export default async function HomePage() {
  const featured = await getFeaturedProjects(6);
  return (
    <>
      <Hero />
      <Services />
      <FeaturedProjects projects={featured} />
      <AboutSmartech />
      <HomeContact />
    </>
  );
}
