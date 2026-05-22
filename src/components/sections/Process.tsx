"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Lightbulb, PenTool, Code2, Rocket, LifeBuoy } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "الاستكشاف",
    desc: "نفهم مشروعك، أهدافك، جمهورك، ومتطلباتك بدقّة.",
  },
  {
    icon: PenTool,
    title: "التصميم",
    desc: "نُجهّز التصميم وتجربة المستخدم أو سيناريو الإنتاج.",
  },
  {
    icon: Code2,
    title: "التنفيذ",
    desc: "نبني، نصوّر، نُحرّر — مع متابعة لحظية لكل خطوة.",
  },
  {
    icon: Rocket,
    title: "الإطلاق",
    desc: "نُسلّم المشروع بجودة عالية وجاهزية كاملة للنشر.",
  },
  {
    icon: LifeBuoy,
    title: "الدعم",
    desc: "نواصل الدعم والصيانة وتطوير ما يلزم بعد الإطلاق.",
  },
];

export function Process() {
  return (
    <Section className="bg-gradient-to-b from-white to-brand-mintSoft/40">
      <div className="container-pad">
        <SectionHeader
          eyebrow="منهجية العمل"
          title={
            <>
              خمس خطوات واضحة من <span className="text-gradient">الفكرة</span> إلى{" "}
              <span className="text-gradient">الإطلاق</span>
            </>
          }
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-3xl border border-brand-teal/10 bg-white p-6 shadow-soft"
            >
              <span className="absolute top-4 left-4 text-5xl font-extrabold text-brand-mint/15">
                0{i + 1}
              </span>
              <span className="relative inline-flex size-11 items-center justify-center rounded-2xl bg-brand-mintSoft text-brand-teal">
                <s.icon className="size-5" />
              </span>
              <h3 className="relative mt-5 text-base font-bold text-brand-teal">
                {s.title}
              </h3>
              <p className="relative mt-1.5 text-[13px] leading-6 text-muted-foreground">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
