import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(139, 92, 246, 0.18) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 20% 100%, rgba(245, 158, 11, 0.06) 0%, transparent 60%)",
        }}
      />
      <div className="container relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="mx-auto max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Pare de gerenciar apps.
            <br />
            Comece a{" "}
            <span className="text-violet-400">evoluir de verdade</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-white/45 sm:text-[15px]">
            Sua vida pessoal inteira — tarefas, hábitos, metas, treinos, dieta,
            finanças e notas — em um único lugar, realmente conectado.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl bg-violet-600 px-8 text-[15px] font-semibold hover:bg-violet-700"
            >
              <a href="https://ascend-lac-zeta.vercel.app" target="_blank" rel="noopener noreferrer">Começar grátis agora</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-white/10 px-8 text-[15px] text-white/70 hover:bg-white/5 hover:text-white"
            >
              <a href="#pricing">Ver planos</a>
            </Button>
          </div>
          <p className="mt-4 text-[12px] text-white/30">
            Sem cartão de crédito · Setup em menos de 1 minuto
          </p>
        </motion.div>
      </div>
    </section>
  );
}
