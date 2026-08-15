/**
 * Estado local 100% frontend da demo interativa do Ascend.
 * Nenhuma chamada real a backend — é apenas uma demonstração.
 *
 * Dados espelham o dashboard real do app (screenshot de referência):
 * - 3 tarefas de hoje (uma com tag ALTA)
 * - 7 hábitos de hoje com emoji
 * - Metas em andamento
 * - Progresso do dia: 0/3 tarefas, 0/7 hábitos, streak, XP
 */

export type DemoTask = {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
};

export type DemoHabit = {
  id: string;
  title: string;
  emoji: string;
  color: string;
  completedToday: boolean;
  streak: number;
};

export type DemoGoal = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  steps: { id: string; label: string; completed: boolean }[];
};

export const WEEK_DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export const INITIAL_TASKS: DemoTask[] = [
  { id: "t1", title: "Enviar mensagem importante", completed: false, priority: "medium" },
  { id: "t2", title: "Revisar documento do dia", completed: false, priority: "medium" },
  { id: "t3", title: "Resolver pendência urgente", completed: false, priority: "high" },
];

export const INITIAL_HABITS: DemoHabit[] = [
  { id: "h1", title: "Dormir bem", emoji: "😴", color: "#8B5CF6", completedToday: false, streak: 4 },
  { id: "h2", title: "Sem redes sociais", emoji: "🧠", color: "#EC4899", completedToday: false, streak: 2 },
  { id: "h3", title: "Suplementar", emoji: "💊", color: "#38BDF8", completedToday: false, streak: 6 },
  { id: "h4", title: "Alimentar bem", emoji: "🥗", color: "#10B981", completedToday: false, streak: 3 },
  { id: "h5", title: "Momento de gratidão", emoji: "🙏", color: "#F59E0B", completedToday: false, streak: 9 },
  { id: "h6", title: "Estudar 30 min", emoji: "📚", color: "#6366F1", completedToday: false, streak: 5 },
  { id: "h7", title: "Treinar", emoji: "💪", color: "#8B5CF6", completedToday: false, streak: 12 },
];

export const INITIAL_GOALS: DemoGoal[] = [
  {
    id: "g1",
    title: "Correr uma meia maratona",
    description: "12 semanas de preparação",
    emoji: "🏃",
    color: "#8B5CF6",
    steps: [
      { id: "s1", label: "Correr 5 km sem parar", completed: true },
      { id: "s2", label: "Correr 10 km", completed: true },
      { id: "s3", label: "Correr 15 km", completed: false },
      { id: "s4", label: "Correr 21 km", completed: false },
    ],
  },
  {
    id: "g2",
    title: "Reserva de emergência",
    description: "12 meses de custo de vida",
    emoji: "💰",
    color: "#10B981",
    steps: [
      { id: "s1", label: "Guardar R$ 1.000", completed: true },
      { id: "s2", label: "Alcançar R$ 5.000", completed: true },
      { id: "s3", label: "Alcançar R$ 10.000", completed: false },
    ],
  },
];

/** 515/1200 XP no estado inicial do app real; XP cresce ao concluir itens. */
export const INITIAL_XP = 515;
export const INITIAL_STREAK = 1;
