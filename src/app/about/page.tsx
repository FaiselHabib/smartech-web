import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import {
  Compass,
  PenTool,
  Code2,
  Camera,
  Scissors,
  Sparkles,
  Target,
} from "lucide-react";

export const metadata = buildMetadata({
  title: "من نحن",
  description:
    "قصّة سمارتك جروب — من علامة برمجية إلى مجموعة سعودية تجمع بين الأنظمة الذكية والإنتاج الإعلامي.",
  path: "/about",
});

const team = [
  { icon: Compass, role: "إدارة المشاريع", desc: "تخطيط وتتبّع كل مشروع من البداية للنهاية." },
  { icon: PenTool, role: "تصميم UI/UX", desc: "تجارب استخدام واجهات نظيفة وحديثة." },
  { icon: Code2, role: "تطوير برمجي", desc: "ويب، تطبيقات، أنظمة داخلية، وداشبورد." },
  { icon: Camera, role: "إنتاج إعلامي", desc: "تصوير درون، فيديوهات، وتصوير عقاري." },
  { icon: Scissors, role: "مونتاج وإخراج", desc: "أسلوب سينمائي يخدم رسالة العلامة." },
  { icon: Sparkles, role: "ذكاء اصطناعي", desc: "دمج AI داخل الأنظمة وعمليات الإنتاج." },
];

const values = [
  {
    icon: Target,
    title: "وضوح الهدف",
    text: "نُركّز على ما يخدم نمو مشروعك فعلياً، لا على تفاصيل لا تُضيف قيمة.",
  },
  {
    icon: Sparkles,
    title: "جودة بلا تنازل",
    text: "كل ما يخرج من سمارتك يحمل بصمة من الإتقان والتفاصيل.",
  },
  {
    icon: Compass,
    title: "شراكة طويلة",
    text: "نبني علاقة عمل ممتدّة، لا مشاريع لمرة واحدة.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="من نحن"
        title={
          <>
            من علامة برمجية إلى{" "}
            <span className="text-gradient">مجموعة سعودية</span> تجمع التقنية
            والإعلام
          </>
        }
        description="بدأت سمارتك كعلامة متخصّصة في البرمجة، واليوم نتطوّر إلى سمارتك جروب — مجموعة تجمع بين الأنظمة، الذكاء الاصطناعي، والإنتاج الإعلامي."
      />

      <Section className="pt-0">
        <div className="container-pad grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-teal">
              قصّتنا
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-8 text-muted-foreground">
              <p>
                انطلقنا من جدة برغبة واحدة: تقديم خدمات تقنية بمستوى عالمي ولغة
                محلية. خدمنا عشرات العملاء في قطاعات متنوّعة، وبنينا تطبيقات
                وأنظمة استمرّت بالتشغيل والنمو.
              </p>
              <p>
                ومع تطوّر السوق السعودي، رأينا أن مشاريع اليوم تحتاج أكثر من
                مجرد برمجة — تحتاج صورة بصرية احترافية تُحرّك الجمهور. لهذا
                أطلقنا قسم سمارتك ميديا ليُكمّل قسم الأنظمة تحت سقف واحد.
              </p>
              <p>
                نحن اليوم{" "}
                <span className="font-semibold text-brand-teal">
                  شركة سعودية ناشئة بطموح كبير
                </span>{" "}
                — نبني الأنظمة الذكية، ونصنع المحتوى البصري الذي يُساعد الشركات
                السعودية على النمو.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 grid gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-3xl border border-brand-teal/10 bg-white/80 backdrop-blur p-6 shadow-soft"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-brand">
                  <v.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-brand-teal">
                  {v.title}
                </h3>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-brand-mintSoft/40">
        <div className="container-pad">
          <SectionHeader
            eyebrow="الفريق"
            title={<>فريق متعدّد التخصّصات</>}
            description="نضمّ مهارات تقنية وإبداعية تعمل معاً لتقديم تجربة كاملة لعملائنا."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((t) => (
              <div
                key={t.role}
                className="rounded-3xl border border-brand-teal/10 bg-white p-6 shadow-soft hover:-translate-y-1 hover:shadow-glass transition-all"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand-mintSoft text-brand-teal">
                  <t.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-bold text-brand-teal">{t.role}</h3>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">
                  {t.desc}
                </p>
              </div>
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
