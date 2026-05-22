import { ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function CTASection() {
  return (
    <section className="relative">
      <div className="container-pad">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-teal text-white">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute -top-32 -right-32 size-[420px] rounded-full bg-brand-mint/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 size-80 rounded-full bg-brand-mint/20 blur-3xl" />

          <div className="relative grid items-center gap-10 p-10 sm:p-14 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-brand-mint">
                <span className="size-1.5 rounded-full bg-brand-mint" />
                مستعدّ نسمعك؟
              </div>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-tight text-balance">
                دعنا نبدأ تحويل فكرتك إلى{" "}
                <span className="text-brand-mint">منتج حقيقي</span> اليوم.
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] sm:text-base text-white/75 leading-8">
                تواصل مع فريق سمارتك واحصل على استشارة مجانية، اقتراح تقني، وعرض
                سعر تفصيلي لمشروعك.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Button href={site.contact.whatsapp} external variant="whatsapp" size="lg">
                <MessageCircle className="size-5" />
                تواصل عبر واتساب
              </Button>
              <Button href="/contact" size="lg" variant="primary">
                طلب عرض سعر
                <ArrowLeft className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
