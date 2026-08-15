/*
 * Ascend — Hero (v3, básico)
 * Layout simples e centrado: badge, título, subtítulo, CTAs, prova social.
 * Fundo bonito: glow violeta difuso no topo + grade geométrica sutil +
 * pontos de luz discretos — sem elementos orbitais.
 * Texto 100% sem gradiente: destaques em roxo puro (violet-400).
 */
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[90svh] items-center overflow-hidden pt-14 sm:pt-16"
      aria-label="Hero"
    >
      {/* ── Fundo ── */}
      {/* Glow violeta difuso concentrado no topo, atrás do texto */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 75% 45% at 50% 0%, rgba(139, 92, 246, 0.22) 0%, rgba(139, 92, 246, 0.08) 35%, transparent 70%)",
        }}
      />
      {/* Segunda camada: brilho suave no canto inferior direito */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 45% 40% at 85% 95%, rgba(139, 92, 246, 0.10) 0%, transparent 65%)",
        }}
      />
      {/* Grade geométrica sutil, mascarada para sumir nas bordas */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(139, 92, 246, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 15%, black 10%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 55% at 50% 15%, black 10%, transparent 80%)",
        }}
      />
      {/* Pontos de luz discretos (estrelas) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {[
          { x: "12%", y: "22%", s: 2 },
          { x: "24%", y: "62%", s: 1.5 },
          { x: "78%", y: "18%", s: 2 },
          { x: "86%", y: "52%", s: 1.5 },
          { x: "68%", y: "74%", s: 1.5 },
          { x: "38%", y: "84%", s: 1.5 },
          { x: "55%", y: "8%", s: 1.5 },
        ].map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-violet-400/60"
            style={{
              left: d.x,
              top: d.y,
              width: d.s,
              height: d.s,
              boxShadow: "0 0 6px 1px rgba(139,92,246,0.5)",
            }}
          />
        ))}
      </div>
      {/* Linha de luz no topo da seção */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.55), transparent)",
        }}
      />

      {/* ── Decoração na base do hero ── */}
      {/* Horizonte de luz: um resplendor violeta que corre a largura toda na base */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-56"
        aria-hidden
        style={{
          background:
            "linear-gradient(to top, rgba(139,92,246,0.16) 0%, rgba(139,92,246,0.06) 40%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 90% 60% at 50% 100%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 60% at 50% 100%, black 20%, transparent 75%)",
        }}
      />
      {/* Onda de luz fina na borda inferior */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.65) 30%, rgba(139,92,246,0.65) 70%, transparent)",
        }}
      />
      {/* Arco central de luz na base (ornamento) */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-20 w-[34rem] max-w-[92%] -translate-x-1/2 rounded-t-full sm:h-24"
        aria-hidden
        style={{
          border: "1px solid rgba(139,92,246,0.25)",
          borderBottom: "none",
          boxShadow: "0 -8px 40px rgba(139,92,246,0.15)",
          background:
            "linear-gradient(to top, rgba(139,92,246,0.08), transparent)",
        }}
      />
      {/* Pontos de luz na base, alinhados ao arco */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5" aria-hidden>
        {["32%", "44%", "56%", "68%"].map((x, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-violet-400/70"
            style={{
              left: x,
              width: 2.5,
              height: 2.5,
              boxShadow: "0 0 6px 1px rgba(139,92,246,0.6)",
            }}
          />
        ))}
      </div>

      {/* ── Conteúdo ── */}
      <div className="container relative w-full pb-10 sm:pb-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Logo pequeno e discreto acima do badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 flex justify-center"
          >
            <img
              src="/manus-storage/ascend-logo-taskbar_74e6a21b.png"
              alt="Ascend"
              className="h-14 w-auto sm:h-20"
            />
          </motion.div>


          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-[28px] font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[56px]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Toda a sua vida em um único app —{" "}
            <span className="text-violet-400">realmente integrado</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-white/45 sm:text-base"
          >
            Tarefas, hábitos, metas, treinos, dieta, finanças e notas — unificados.
            O que você conclui em um módulo atualiza os outros automaticamente. Sem
            alternar entre cinco abas e dez logins.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="h-11 rounded-xl bg-violet-600 px-7 text-[15px] font-semibold hover:bg-violet-700"
            >
              <a href="https://ascend-lac-zeta.vercel.app" target="_blank" rel="noopener noreferrer">Começar grátis</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-xl border-white/10 px-7 text-[15px] text-white/70 hover:bg-white/5 hover:text-white"
            >
              <a href="#demo" className="flex items-center gap-2">
                Ver demonstração
                <ArrowDown size={15} />
              </a>
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
