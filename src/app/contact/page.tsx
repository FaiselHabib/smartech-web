import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export const metadata = buildMetadata({
  title: "تواصل معنا",
  description:
    "تواصل مع سمارتك جروب — اطلب استشارة مجانية، عرض سعر، أو ابدأ مشروعك البرمجي أو الإعلامي اليوم.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="تواصل معنا"
        title={
          <>
            دعنا نسمع <span className="text-gradient">فكرتك</span>
          </>
        }
        description="أخبرنا عن مشروعك ونوع الخدمة التي تحتاجها، وسنعود إليك بخطّة مقترحة وعرض سعر تفصيلي."
      />

      <Section className="pt-0">
        <div className="container-pad grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-[2rem] border border-brand-teal/10 bg-white/80 backdrop-blur p-6 sm:p-8 shadow-soft">
              <ContactForm />
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-5">
            <div className="rounded-3xl bg-brand-teal text-white p-7 relative overflow-hidden">
              <div className="absolute -top-20 -left-20 size-60 rounded-full bg-brand-mint/20 blur-3xl" />
              <h3 className="relative text-xl font-extrabold">
                طريقة أسرع للتواصل
              </h3>
              <p className="relative mt-2 text-sm text-white/75 leading-7">
                واتساب هو القناة الأسرع للوصول إلى فريقنا — نرد عادةً خلال ساعات العمل.
              </p>
              <div className="relative mt-5 flex flex-wrap gap-2">
                <Button href={site.contact.whatsapp} external variant="whatsapp">
                  <MessageCircle className="size-5" />
                  تواصل عبر واتساب
                </Button>
                <Button
                  href={`tel:${site.contact.phone}`}
                  variant="outline"
                  className="border-white/20 bg-white/10 text-white hover:bg-white/15"
                >
                  <Phone className="size-4" />
                  اتصل بنا
                </Button>
              </div>
            </div>

            <InfoRow icon={Phone} label="رقم الجوال" value={site.contact.phoneDisplay} href={`tel:${site.contact.phone}`} />
            <InfoRow icon={Mail} label="البريد الإلكتروني" value={site.contact.email} href={`mailto:${site.contact.email}`} />
            <InfoRow icon={MapPin} label="الموقع" value={site.contact.location} />
          </aside>
        </div>
      </Section>
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-4 rounded-3xl border border-brand-teal/10 bg-white p-5 shadow-soft transition-all hover:border-brand-mint/40">
      <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-mintSoft text-brand-teal">
        <Icon className="size-5" />
      </span>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-semibold text-brand-teal">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}
