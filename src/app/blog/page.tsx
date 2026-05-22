import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { getPublishedPosts } from "@/lib/content/blog";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;
import { ArrowLeft, Clock } from "lucide-react";
import { arabicNumber } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "المدونة",
  description:
    "مقالات وأدلة من سمارتك جروب: برمجة، تطبيقات، أنظمة، تصوير درون، وإنتاج محتوى.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  if (!featured) {
    return (
      <section className="container-pad pt-[140px] pb-24 text-center">
        <h1 className="text-3xl font-bold text-brand-teal">المدوّنة</h1>
        <p className="mt-4 text-muted-foreground">
          لا توجد مقالات منشورة حالياً — تابعنا قريباً!
        </p>
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="المدوّنة"
        title={
          <>
            أفكار وأدلة في{" "}
            <span className="text-gradient">البرمجة والإعلام</span>
          </>
        }
        description="نشارك تجربتنا في تطوير الأنظمة، تطبيقات الجوال، والإنتاج البصري داخل السوق السعودي."
      />

      <Section className="pt-0">
        <div className="container-pad">
          {/* Featured */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group block overflow-hidden rounded-[2rem] border border-brand-teal/10 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-glass"
          >
            <div className="grid lg:grid-cols-12">
              <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto bg-gradient-to-br from-brand-mint/30 via-brand-mintSoft to-brand-teal/10">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                  <span className="text-3xl sm:text-4xl font-extrabold text-brand-teal/80">
                    {featured.title}
                  </span>
                </div>
              </div>
              <div className="lg:col-span-6 p-8 sm:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-mintSoft px-3 py-1 text-xs font-semibold text-brand-teal">
                  مقال مميّز · {featured.category}
                </span>
                <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-brand-teal">
                  {featured.title}
                </h2>
                <p className="mt-3 text-muted-foreground leading-8">
                  {featured.excerpt}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-teal group-hover:text-brand-mint">
                  اقرأ المقال
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                </div>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-teal/10 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-glass"
              >
                <div className="relative aspect-[16/10] bg-gradient-to-br from-brand-mint/30 via-brand-mintSoft to-brand-teal/10">
                  <div className="absolute inset-0 grid-bg opacity-50" />
                  <span className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-brand-teal">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-brand-teal">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {arabicNumber(post.readingTime)} دقائق قراءة
                    </span>
                    <span className="inline-flex items-center gap-1 text-brand-teal font-semibold group-hover:text-brand-mint">
                      اقرأ
                      <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
