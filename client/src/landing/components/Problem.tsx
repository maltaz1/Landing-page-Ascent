import { motion } from "framer-motion";
import {
  Calendar as CalIcon,
  CheckSquare,
  FileText,
  Dumbbell,
  Apple,
  DollarSign,
  Flame,
  NotebookPen,
} from "lucide-react";

const scatteredApps = [
  { icon: CheckSquare, label: "Tarefas", top: "4%", left: "6%" },
  { icon: Flame, label: "Hábitos", top: "34%", left: "2%" },
  { icon: CalIcon, label: "Calendário", top: "64%", left: "8%" },
  { icon: Dumbbell, label: "Treino", top: "10%", left: "74%" },
  { icon: Apple, label: "Dieta", top: "40%", left: "84%" },
  { icon: DollarSign, label: "Finanças", top: "70%", left: "76%" },
  { icon: NotebookPen, label: "Notas", top: "84%", left: "44%" },
];

export function Problem() {
  return (
    <section className="relative border-y border-white/[0.05] bg-white/[0.015] py-12 sm:py-28">
      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.08] px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-300">
                O problema
              </span>
            </div>
            <h2
              className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-[34px]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Sua vida não deveria estar espalhada em sete apps.
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-white/45 sm:text-[15px]">
              Sincronizações quebradas, assinaturas somadas e dados que nunca conversam
              entre si. Aqui, tudo é{" "}
              <strong className="text-white/70">um único sistema</strong>: conclua uma
              tarefa e o hábito atualiza; cumpra o hábito e a meta avança.
            </p>
          </motion.div>

          {/* Visual: apps espalhados → convergindo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[480px]"
          >
            {scatteredApps.map((app, i) => (
              <motion.div
                key={app.label}
                className="absolute flex items-center gap-2 whitespace-nowrap rounded-xl border border-white/[0.07] bg-[#1a1a22] px-2 py-1.5 text-[11px] shadow-lg sm:px-3 sm:py-2.5 sm:text-[11px]"
                style={{ top: app.top, left: app.left }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <app.icon size={15} className="text-white/50" />
                <span className="text-[11px] font-medium text-white/60">
                  {app.label}
                </span>
              </motion.div>
            ))}

            {/* Linhas de convergência */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden
            >
              {scatteredApps.map((app, i) => {
                const cx = 50;
                const cy = 50;
                return (
                  <motion.line
                    key={i}
                    x1={`${parseFloat(app.left) + 9}%`}
                    y1={`${parseFloat(app.top) + 5}%`}
                    x2={`${cx}%`}
                    y2={`${cy}%`}
                    stroke="rgba(139, 92, 246, 0.22)"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.7, ease: "easeOut" }}
                  />
                );
              })}
            </svg>

            {/* Centro: Ascend */}
            <motion.div
              className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-600/10 to-[#1a1a22] px-7 py-5 shadow-[0_16px_48px_rgba(139,92,246,0.25)]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src="/manus-storage/ascend-logo-taskbar_74e6a21b.png" alt="Ascend" className="h-12 w-auto" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-300">
                Tudo em um
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
