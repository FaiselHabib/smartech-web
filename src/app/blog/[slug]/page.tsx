import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { getAllPostSlugs, getPostBySlug } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;
import { arabicNumber } from "@/lib/utils";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return buildMetadata({ title: "مقال" });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.nameEn },
    publisher: { "@type": "Organization", name: site.nameEn },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="relative pt-[140px]">
        <div className="container-pad max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand-teal"
          >
            <ArrowLeft className="size-4" />
            العودة إلى المدوّنة
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-brand-mintSoft px-3 py-1 font-semibold text-brand-teal">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Calendar className="size-3.5" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Clock className="size-3.5" />
              {arabicNumber(post.readingTime)} دقائق قراءة
            </span>
          </div>

          <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-brand-teal text-balance">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {post.excerpt}
          </p>
        </div>

        <div className="container-pad max-w-3xl mt-12">
          <div className="aspect-[16/9] rounded-3xl bg-gradient-to-br from-brand-mint/30 via-brand-mintSoft to-brand-teal/10 relative overflow-hidden border border-brand-teal/10">
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
              <span className="text-3xl font-extrabold text-brand-teal/70">
                {post.title}
              </span>
            </div>
          </div>
        </div>

        <Section>
          <div className="container-pad max-w-3xl">
            <div className="prose prose-lg max-w-none text-[16px] leading-9 text-foreground/90">
              <p>{post.content}</p>
              <p className="mt-6 text-muted-foreground">
                لديك مشروع مشابه؟{" "}
                <Link
                  href="/contact"
                  className="text-brand-teal font-semibold hover:text-brand-mint"
                >
                  تواصل معنا
                </Link>{" "}
                وسنُقدّم لك استشارة مجانية.
              </p>
            </div>
          </div>
        </Section>

        <div className="pb-16">
          <CTASection />
        </div>
      </article>
    </>
  );
}
