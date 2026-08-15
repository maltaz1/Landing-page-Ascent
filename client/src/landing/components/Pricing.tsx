import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Flame } from "lucide-react";
import { SectionHeading } from "./LandingNav";

/**
 * Regras reais extraídas de client/src/config/planLimits.ts:
 * Free: 1 tarefa/semana · 3 hábitos · 1 meta · 2 metas semanais ·
 * abas: Hoje, Dashboard, Hábitos, Tarefas, Calendário, Configurações, Baixar App.
 * PRO: tudo ilimitado + todas as áreas + sync e analytics avançados.
 */

const CAKTO_URL = "https://pay.cakto.com.br/35n9bs3_900728";

type Row = { label: string; free: string; pro: string };

const rows: Row[] = [
  { label: "Tarefas por semana", free: "1", pro: "Ilimitadas" },
  { label: "Hábitos", free: "3", pro: "Ilimitados" },
  { label: "Metas de longo prazo", free: "1", pro: "Ilimitadas" },
  { label: "Metas semanais", free: "2", pro: "Ilimitadas" },
  { label: "Gym · Diet · Finance · Notes", free: "Bloqueados", pro: "Liberados" },
  { label: "Futuras funcionalidades premium", free: "—", pro: "Incluídas" },
];

function PlanCard({
  title,
  price,
  priceNote,
  cta,
  ctaVariant,
  highlight,
  badge,
  ctaHref,
}: {
  title: string;
  price: string;
  priceNote: string;
  cta: string;
  ctaVariant: "default" | "outline";
  highlight?: boolean;
  badge?: string;
  ctaHref: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col rounded-2xl border p-7 ${
        highlight
          ? "border-violet-500/30 bg-gradient-to-b from-violet-500/[0.08] to-[#1a1a22] shadow-[0_12px_48px_rgba(139,92,246,0.18)]"
          : "border-white/[0.07] bg-[#1a1a22]/60"
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-300">
          <Flame size={11} /> {badge}
        </span>
      )}
      <h3
        className="text-[18px] font-bold text-white"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {title}
      </h3>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span
          className="text-[38px] font-bold text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {price}
        </span>
        {priceNote && (
          <span className="text-[12px] text-white/40">{priceNote}</span>
        )}
      </div>
      <p className="mt-2 text-[13px] text-white/45">
        {title === "Free"
          ? "Para experimentar a essência do Ascend."
          : "Acesso completo, sem limites."}
      </p>

      <div className="my-6 h-px bg-white/[0.06]" />

      <ul className="mb-7 flex flex-col gap-2.5">
        {rows.map((row) => (
          <li key={row.label} className="flex items-start gap-2.5 text-[13px]">
            <span
              className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-[4px] ${
                (highlight ? row.pro : row.free) !== "—"
                  ? "border-violet-500/30 text-violet-300"
                  : "border-white/15 text-white/25"
              }`}
              style={{ borderWidth: 1, borderStyle: "solid", borderColor: highlight ? "rgba(139,92,246,0.35)" : "rgba(255,255,255,0.15)" }}
            >
              <Check size={10} />
            </span>
            <span className="text-white/70">{row.label}</span>
            <span className="ml-auto font-semibold text-white/85">
              {highlight ? row.pro : row.free}
            </span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        size="lg"
        className={`w-full rounded-xl text-[14px] font-semibold ${
          highlight
            ? "bg-violet-600 hover:bg-violet-700"
            : "border-white/10 text-white/70 hover:bg-white/5 hover:text-white"
        }`}
        variant={ctaVariant}
      >
        <a href={ctaHref} target="_blank" rel="noopener noreferrer">{cta}</a>
      </Button>
    </motion.div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="border-y border-white/[0.05] bg-white/[0.015] py-12 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Planos"
          title="Escolha o ritmo da sua evolução"
          sub="Comece grátis, sem cartão. Quando quiser destravar tudo, o PRO cuida do resto."
        />
        {/* CTA do Free aponta para a inscrição; o PRO paga via Cakto */}

        <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
          <PlanCard
            title="Free"
            price="R$ 0"
            priceNote="/sempre"
            cta="Começar grátis"
            ctaVariant="outline"
            ctaHref="https://ascend-lac-zeta.vercel.app"
          />
          <PlanCard
            title="Ascend PRO"
            price="R$ 11,99"
            priceNote="/mês"
            cta="Obter PRO"
            ctaVariant="default"
            highlight
            badge="Mais escolhido"
            ctaHref={CAKTO_URL}
          />
        </div>

        <p className="mt-6 text-center text-[12px] text-white/35">
          Cancele quando quiser · Sem compromisso · Mesma conta, transição instantânea
        </p>
      </div>
    </section>
  );
}
