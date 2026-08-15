import { motion } from "framer-motion";
import { InteractiveDemo } from "./InteractiveDemo";
import { SectionHeading } from "./LandingNav";

export function DemoSection() {
  return (
    <section id="demo" className="py-12 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Demo ao vivo"
          title="Experimente o dashboard agora"
          sub="Sem cadastro, sem vídeo — é o dashboard de verdade. Marque tarefas e hábitos e veja o progresso do dia subir na hora."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-8 w-full max-w-6xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111118] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.5)] sm:mt-14 sm:rounded-3xl sm:p-8"
        >
          {/* Borda de brilho superior */}
          <div
            className="pointer-events-none absolute inset-x-8 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(139,92,246,0.45), transparent)",
            }}
          />
          {/* Barra de janela do app */}
          <div className="mb-4 flex items-center gap-2 sm:mb-5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.08] sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.08] sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.08] sm:h-3 sm:w-3" />
            <span className="ml-auto text-[10px] font-medium text-white/30 sm:text-[11px]">
              Ascend — Dashboard
            </span>
          </div>

          <InteractiveDemo />
        </motion.div>
      </div>
    </section>
  );
}
