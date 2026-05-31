import { ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[120px] pb-20 sm:pt-[150px] sm:pb-28">
      {/* Lightweight premium backdrop — static, no animation */}
      <div className="absolute inset-0 -z-10 bg-hero-radial" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-40 mask-fade-b" />
      <div className="absolute -top-32 right-0 -z-10 size-[420px] rounded-full bg-brand-mint/20 blur-[120px]" />

      <div className="container-pad relative text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-mint/30 bg-white/70 px-4 py-1.5 text-xs font-semibold text-brand-teal">
          <span className="size-1.5 rounded-full bg-brand-mint" />
          شركة تطوير برمجيات سعودية
        </div>

        <h1 className="mx-auto mt-6 max-w-4xl text-[40px] sm:text-[60px] lg:text-[72px] font-extrabold leading-[1.05] tracking-tight text-brand-teal text-balance">
          نبني <span className="text-gradient">برمجيات حديثة</span> تنقل أعمالك إلى الأمام
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-8 text-muted-foreground text-balance">
          نطوّر مواقع، تطبيقات جوال، أنظمة أعمال، وحلول ذكاء اصطناعي — بأداء عالٍ
          وتصميم احترافي، من الفكرة حتى الإطلاق.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href="/contact" size="lg">
            ابدأ مشروعك
            <ArrowLeft className="size-4" />
          </Button>
          <Button href="/portfolio" size="lg" variant="outline">
            <Play className="size-4" />
            شاهد أعمالنا
          </Button>
        </div>
      </div>
    </section>
  );
}
