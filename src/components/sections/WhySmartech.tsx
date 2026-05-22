"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Rocket,
  Sparkles,
  HeartHandshake,
  Layers,
  Clock4,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";

const items = [
  {
    icon: Layers,
    title: "حلّ متكامل تحت سقف واحد",
    desc: "أنظمة برمجية + إنتاج إعلامي. لا تحتاج للتعامل مع أكثر من جهة لمشروعك.",
  },
  {
    icon: ShieldCheck,
    title: "جودة احترافية",
    desc: "كود نظيف، تصميم دقيق، وإنتاج بصري سينمائي بمعايير عالية.",
  },
  {
    icon: Rocket,
    title: "إطلاق سريع",
    desc: "منهجية عمل مرنة تُوصلك من الفكرة إلى الإطلاق بأقل وقت ممكن.",
  },
  {
    icon: Sparkles,
    title: "ذكاء اصطناعي عملي",
    desc: "ندمج AI داخل أنظمتك والمحتوى لرفع الكفاءة وتسريع النتائج.",
  },
  {
    icon: HeartHandshake,
    title: "شفافية وشراكة",
    desc: "تواصل واضح، تقدّم موثّق، وعقود مفهومة بلا مفاجآت.",
  },
  {
    icon: Clock4,
    title: "دعم بعد الإطلاق",
    desc: "نبقى بجانبك بصيانة دورية ودعم فني مستمر لاستقرار مشروعك.",
  },
];

export function WhySmartech() {
  return (
    <Section>
      <div className="container-pad">
        <SectionHeader
          eyebrow="لماذا سمارتك"
          title={
            <>
              نُقدّم تجربة <span className="text-gradient">مختلفة</span> لشركتك
            </>
          }
          description="لسنا مجرّد مزوّد خدمة — نحن شريكك التقني والإعلامي على المدى الطويل."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="relative overflow-hidden rounded-3xl border border-brand-teal/10 bg-white/80 backdrop-blur p-7 transition-all hover:border-brand-mint/40 hover:shadow-glass"
            >
              <span className="absolute -top-12 -left-12 size-40 rounded-full bg-brand-mint/10 blur-3xl" />
              <span className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-brand">
                <it.icon className="size-5" />
              </span>
              <h3 className="relative mt-5 text-lg font-bold text-brand-teal">
                {it.title}
              </h3>
              <p className="relative mt-2 text-sm leading-7 text-muted-foreground">
                {it.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
