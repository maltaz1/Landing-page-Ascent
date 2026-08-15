import { motion } from "framer-motion";
import {
  Apple,
  Calendar as CalIcon,
  CheckSquare,
  DollarSign,
  Dumbbell,
  Flame,
  NotebookPen,
  Target,
} from "lucide-react";
import { SectionHeading } from "./LandingNav";

const MODULES = [
  {
    icon: CheckSquare,
    title: "Tasks",
    color: "#8B5CF6",
    benefit:
      "Tarefas com prioridade e recorrência — concluí-las alimenta hábitos e metas.",
  },
  {
    icon: Flame,
    title: "Habits",
    color: "#F59E0B",
    benefit:
      "Check-ins diários com streaks — a motivação que nasce da constância.",
  },
  {
    icon: Target,
    title: "Goals",
    color: "#10B981",
    benefit:
      "Metas semanais e de longo prazo vinculadas aos hábitos.",
  },
  {
    icon: CalIcon,
    title: "Calendar",
    color: "#38BDF8",
    benefit:
      "Agenda visual com eventos e notas por dia.",
  },
  {
    icon: Dumbbell,
    title: "Gym",
    color: "#A855F7",
    benefit:
      "Treinos, séries e evolução física no mesmo dashboard.",
  },
  {
    icon: Apple,
    title: "Diet",
    color: "#F97316",
    benefit:
      "Refeições e macros do dia integrados às metas de saúde.",
  },
  {
    icon: DollarSign,
    title: "Finance",
    color: "#4ADE80",
    benefit:
      "Receitas, despesas e saldo em tempo real.",
  },
  {
    icon: NotebookPen,
    title: "Notes",
    color: "#E879F9",
    benefit:
      "Notas organizadas em pastas com editor completo.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-12 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Módulos"
          title="Oito ferramentas. Um sistema."
          sub="Cada módulo funciona sozinho — e trabalha junto. O que você registra em um alimenta os outros."
        />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {MODULES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-xl border border-white/[0.07] bg-[#1a1a22]/60 p-3.5 sm:p-5 transition-all hover:border-white/[0.14] hover:bg-[#1a1a22]"
            >
              <div
                className="mb-3 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${feature.color}18` }}
              >
                <feature.icon size={17} style={{ color: feature.color }} />
              </div>
              <h3
                className="mb-1.5 text-[14px] sm:text-[16px] font-bold text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {feature.title}
              </h3>
              <p className="text-[11px] sm:text-[13px] leading-snug text-white/45">
                {feature.benefit}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
