import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./LandingNav";

const faqs = [
  {
    q: "Meus dados estão seguros no Ascend?",
    a: "Sim. Todos os dados são armazenados com criptografia e o produto segue as exigências da LGPD, incluindo o direito de exclusão completa da conta e dos dados a qualquer momento.",
  },
  {
    q: "Como funciona a sincronização entre dispositivos?",
    a: "Suas tarefas, hábitos, metas, treinos e finanças são sincronizados em tempo real entre celular, tablet e desktop. O que você registra em um dispositivo aparece instantaneamente nos outros.",
  },
  {
    q: "Qual a diferença entre o plano Free e o PRO?",
    a: "O Free permite experimentar a base do produto: 1 tarefa por semana, 3 hábitos, 1 meta e 2 metas semanais, com acesso aos módulos Hoje, Dashboard, Tarefas, Hábitos e Calendário. O PRO destrava todos os módulos (Gym, Diet, Finance, Notes), remove os limites e inclui sincronização e analytics avançados.",
  },
  {
    q: "Posso cancelar a assinatura a qualquer momento?",
    a: "Sim, sem multa ou burocracia. O cancelamento pode ser feito diretamente nas configurações da conta e sua assinatura permanece ativa até o fim do período já pago.",
  },
  {
    q: "Se eu sair do Free para o PRO, perco meus dados?",
    a: "Não. A transição é instantânea e acontece na mesma conta — seus hábitos, streaks e histórico continuam exatamente de onde pararam, agora sem limites.",
  },
  {
    q: "O que acontece com minha conta se eu cancelar o PRO?",
    a: "Sua conta volta ao plano Free mantendo seus dados; apenas os módulos premium (Gym, Diet, Finance, Notes) e os limites ampliados ficam indisponíveis, respeitando as regras do plano Free.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-12 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="FAQ"
          title="Perguntas frequentes"
          sub="Tudo o que você precisa saber antes de começar."
        />

        <div className="mx-auto mt-8 max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-white/[0.07]"
              >
                <AccordionTrigger className="text-left text-[14px] font-semibold text-white hover:no-underline sm:text-[15px]">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[13px] leading-relaxed text-white/50 sm:text-[14px]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
