import { motion } from "framer-motion";
import { SectionHeading } from "./LandingNav";

const testimonials = [
  {
    quote:
      "Eu usava quatro apps separados e ainda esquecia coisas. No Ascend, minha rotina de treino, trabalho e finanças vive no mesmo lugar — e o dashboard me mostra se estou realmente evoluindo.",
    name: "Mariana S.",
    role: "placeholder — depoimento real em breve",
    initials: "M",
    color: "#8B5CF6",
  },
  {
    quote:
      "A parte que mais me impressionou foi ver uma meta de corrida avançar sozinha conforme eu marcava os treinos. Nada parecido com o que eu usava antes.",
    name: "Rafael C.",
    role: "placeholder — depoimento real em breve",
    initials: "R",
    color: "#F59E0B",
  },
  {
    quote:
      "Cancelei três assinaturas no primeiro mês. O visual é premium, o app é rápido e finalmente tudo conversa entre si.",
    name: "Juliana M.",
    role: "placeholder — depoimento real em breve",
    initials: "J",
    color: "#10B981",
  },
];

export function SocialProof() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Depoimentos"
          title="O que os usuários estão dizendo"
          sub="Depoimentos reais serão publicados aqui. Por enquanto, estes são placeholders prontos para substituição."
        />

        {/* Testimonials */}
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-white/[0.07] bg-[#1a1a22]/60 p-6"
            >
              <p className="mb-5 text-[13px] leading-relaxed text-white/60">
                “{t.quote}”
              </p>
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white"
                  style={{ background: t.color }}
                >
                  {t.initials}
                </span>
                <div>
                  <div className="text-[13px] font-semibold text-white">{t.name}</div>
                  <div className="text-[11px] text-white/35">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
