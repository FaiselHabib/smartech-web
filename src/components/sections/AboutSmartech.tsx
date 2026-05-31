import { Section } from "@/components/ui/Section";

const stats = [
  { value: "+20", label: "مشروع منجز" },
  { value: "+3", label: "سنوات خبرة" },
  { value: "السعودية", label: "مقرّنا" },
];

export function AboutSmartech() {
  return (
    <Section>
      <div className="container-pad">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-brand-teal/10 bg-white p-8 sm:p-12 shadow-soft text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-mint/30 bg-brand-mintSoft px-3.5 py-1.5 text-xs font-semibold text-brand-teal">
            <span className="size-1.5 rounded-full bg-brand-mint" />
            من نحن
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-brand-teal text-balance">
            شركة سعودية متخصّصة في تطوير البرمجيات
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-8 text-muted-foreground text-balance">
            نُساعد الشركات والمشاريع على النمو رقمياً عبر منتجات برمجية موثوقة
            وعالية الأداء.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl sm:text-4xl font-extrabold text-gradient">
                  {s.value}
                </div>
                <div className="mt-1.5 text-xs sm:text-sm text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
