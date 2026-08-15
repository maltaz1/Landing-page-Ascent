import { motion } from "framer-motion";
import { Layers, Lock, RefreshCw, Zap } from "lucide-react";
import { SectionHeading } from "./LandingNav";

const points = [
  {
    icon: Layers,
    color: "#8B5CF6",
    title: "Tudo integrado",
    description:
      "Tarefa concluída atualiza o hábito; hábito mantido avança a meta; meta atingida sobe no dashboard. Nada é isolado.",
  },
  {
    icon: RefreshCw,
    color: "#38BDF8",
    title: "Sincronização em tempo real",
    description:
      "Mudou no celular, apareceu no desktop. Seus dados viajam entre dispositivos sem você apertar nada.",
  },
  {
    icon: Zap,
    color: "#F59E0B",
    title: "Performance nativa",
    description:
      "Interface rápida e leve, pensada para o uso de todos os dias — sem travamentos entre abas ou módulos.",
  },
  {
    icon: Lock,
    color: "#10B981",
    title: "Segurança de dados",
    description:
      "Sua vida pessoal protegida por criptografia de ponta a ponta e conformidade com a LGPD.",
  },
];

export function Differentiators() {
  return (
    <section className="border-y border-white/[0.05] bg-white/[0.015] py-12 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Diferenciais"
          title="Por que o Ascend é diferente"
          sub="Não é mais um app de tarefas bonito. É um sistema pessoal completo, construído com cuidado."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-5 rounded-2xl border border-white/[0.07] bg-[#1a1a22]/60 p-6 sm:p-8"
            >
              <div
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                style={{ background: `${point.color}18` }}
              >
                <point.icon size={20} style={{ color: point.color }} />
              </div>
              <div>
                <h3
                  className="mb-2 text-[17px] font-bold text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {point.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-white/45 sm:text-[14px]">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
