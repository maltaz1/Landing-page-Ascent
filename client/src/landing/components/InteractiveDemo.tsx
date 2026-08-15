/*
 * Ascend — Demo interativa fiel ao dashboard real do app.
 * Replica: saudação "Boa tarde, Vinicius!", data, card "Progresso do Dia"
 * (percentual circular, contadores, streak e XP), colunas "Tarefas de Hoje"
 * e "Hábitos de Hoje", e "Metas em Andamento". Tudo com estado local puro.
 * Textos em roxo puro (sem gradientes). Design system Ascend.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Flame, RotateCcw, Sparkles, LayoutDashboard, Flame as FlameIcon, CheckSquare, Target, Heart, Dumbbell, Apple, Wallet, FileText, Calendar, Download, Settings } from "lucide-react";
import {
  INITIAL_GOALS,
  INITIAL_HABITS,
  INITIAL_STREAK,
  INITIAL_TASKS,
  INITIAL_XP,
  type DemoGoal,
  type DemoHabit,
  type DemoTask,
} from "./demoState";

/* ── Dados do card "Progresso do Dia" ───────────── */
function useProgress() {
  const [tasks, setTasks] = useState<DemoTask[]>(INITIAL_TASKS);
  const [habits, setHabits] = useState<DemoHabit[]>(INITIAL_HABITS);
  const [xp] = useState(INITIAL_XP);
  const [streak] = useState(INITIAL_STREAK);

  const doneTasks = tasks.filter((t) => t.completed).length;
  const doneHabits = habits.filter((h) => h.completedToday).length;
  const total = tasks.length + habits.length;
  const done = doneTasks + doneHabits;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const toggleTask = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const toggleHabit = (id: string) =>
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, completedToday: !h.completedToday }
          : h
      )
    );

  const reset = () => {
    setTasks(INITIAL_TASKS);
    setHabits(INITIAL_HABITS);
  };

  return {
    tasks,
    habits,
    xp,
    streak,
    doneTasks,
    doneHabits,
    pct,
    toggleTask,
    toggleHabit,
    reset,
  };
}

/* ── Anel de progresso circular (como o do app) ───── */
function ProgressRing({
  pct,
  big,
  level,
}: {
  pct: number;
  big?: boolean;
  level?: boolean;
}) {
  const size = big ? 104 : 56;
  const c = 2 * Math.PI * 44;
  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        className="absolute inset-0 -rotate-90"
        viewBox="0 0 100 100"
        style={{ width: "100%", height: "100%" }}
      >
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (pct / 100) * c }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </svg>
      {level ? (
        <div className="text-center leading-tight">
          <span
            className="block text-lg font-bold text-violet-400"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            12
          </span>
          <span className="text-[9px] font-bold text-white/40">NV</span>
        </div>
      ) : (
        <span
          className={big ? "text-xl font-bold text-violet-400" : "text-[15px] font-bold text-violet-400"}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}

/* ── Item de tarefa (estilo exato do app: barra cinza) ──── */
function TaskRow({
  task,
  onToggle,
}: {
  task: DemoTask;
  onToggle: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onToggle(task.id)}
      className="flex w-full items-center gap-2.5 rounded-lg bg-white/[0.05] px-2.5 py-1.5 text-left transition-all hover:bg-white/[0.08]"
    >
      <span
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          task.completed
            ? "border-emerald-500 bg-emerald-500"
            : "border-white/30 bg-transparent"
        }`}
      >
        {task.completed && <Check size={11} className="text-white" />}
      </span>
      <span
        className={`flex-1 text-[13px] font-medium ${
          task.completed ? "text-white/35 line-through" : "text-white/90"
        }`}
      >
        {task.title}
      </span>
      {task.priority === "high" && (
        <span className="text-[10px] font-bold tracking-wide text-red-400">
          ALTA
        </span>
      )}
    </button>
  );
}

/* ── Item de hábito (estilo exato do app: emoji + bolinha) ──── */
function HabitRow({
  habit,
  onToggle,
}: {
  habit: DemoHabit;
  onToggle: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onToggle(habit.id)}
      className="flex w-full items-center gap-2.5 rounded-lg bg-white/[0.05] px-2.5 py-1.5 text-left transition-all hover:bg-white/[0.08]"
    >
      <span
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          habit.completedToday
            ? "border-emerald-500 bg-emerald-500"
            : "border-white/30 bg-transparent"
        }`}
      >
        {habit.completedToday && <Check size={11} className="text-white" />}
      </span>
      <span className="text-sm">
        {habit.emoji} {habit.title}
      </span>
      {habit.completedToday && (
        <span className="ml-auto text-[11px] font-semibold text-emerald-400">
          ✓
        </span>
      )}
    </button>
  );
}

/* ── Card de meta (Metas em Andamento) ─────────────── */
function GoalCard({
  goal,
  onToggleStep,
}: {
  goal: DemoGoal;
  onToggleStep: (goalId: string, stepId: string) => void;
}) {
  const doneSteps = goal.steps.filter((s) => s.completed).length;
  const progress = Math.round((doneSteps / goal.steps.length) * 100);
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#1A1A24] p-3 sm:p-4">
      <div className="mb-2.5 flex items-center gap-2.5">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-base"
          style={{
            background: `linear-gradient(135deg, ${goal.color}, ${goal.color}BB)`,
            boxShadow: `0 2px 10px ${goal.color}35`,
          }}
        >
          {goal.emoji}
        </span>
        <div className="min-w-0">
          <h4 className="truncate text-[13px] font-bold text-white/90">
            {goal.title}
          </h4>
          <p className="truncate text-[10px] text-white/40">
            {goal.description}
          </p>
        </div>
        <span className="ml-auto text-[11px] font-bold text-violet-400">
          {doneSteps}/{goal.steps.length}
        </span>
      </div>
      <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: goal.color }}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        {goal.steps.map((step) => (
          <button
            key={step.id}
            onClick={() => onToggleStep(goal.id, step.id)}
            className="flex items-center gap-2 rounded-md bg-white/[0.05] px-2.5 py-1 text-left text-[11px] transition-all hover:bg-white/[0.08]"
          >
            <span
              className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-[4px] border transition-all ${
                step.completed
                  ? "border-emerald-500 bg-emerald-500"
                  : "border-white/25 bg-transparent"
              }`}
            >
              {step.completed && <Check size={9} className="text-white" />}
            </span>
            <span
              className={
                step.completed ? "text-white/40 line-through" : "text-white/80"
              }
            >
              {step.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Barra lateral com os módulos do app (Hoje selecionado) ──── */
const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: FlameIcon, label: "Hoje", active: true },
  { icon: FlameIcon, label: "Hábitos" },
  { icon: CheckSquare, label: "Tarefas" },
  { icon: Target, label: "Metas" },
  { icon: Heart, label: "Oração" },
  { icon: Dumbbell, label: "Academia" },
  { icon: Apple, label: "Dieta" },
  { icon: Wallet, label: "Financeiro" },
  { icon: FileText, label: "Notas" },
  { icon: Calendar, label: "Calendário" },
];

function Sidebar() {
  return (
    <aside className="hidden w-40 flex-shrink-0 border-r border-white/[0.06] bg-[#0E0E16]/80 py-4 pr-3 lg:block">
      {/* Logo compacto */}
      <div className="mb-4 flex items-center gap-1.5 px-2">
        <img
          src="/manus-storage/ascend-logo-taskbar_74e6a21b.png"
          alt="Ascend"
          className="h-5 w-5 object-contain"
        />
        <span
          className="text-[13px] font-bold tracking-wide text-violet-400"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          ASCEND
        </span>
      </div>
      <nav className="flex flex-col gap-0.5">
        {SIDEBAR_ITEMS.map(({ icon: Icon, label, active }) => (
          <span
            key={label}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] font-medium transition-colors ${
              active
                ? "bg-violet-500/20 text-violet-300"
                : "text-white/50 hover:bg-white/[0.04] hover:text-white/70"
            }`}
          >
            <Icon size={13} strokeWidth={active ? 2.25 : 1.75} />
            {label}
          </span>
        ))}
      </nav>
      {/* Sequência ativa, como no app */}
      <div className="mx-2 mt-4 rounded-lg border border-amber-500/20 bg-amber-500/[0.07] px-2.5 py-2">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-amber-300/80">
          <Flame size={11} /> Sequência ativa
        </div>
        <div className="mt-0.5 text-[12px] font-bold text-amber-400">1 dias</div>
      </div>
    </aside>
  );
}

/* ── Demo no estilo do dashboard real ──────────────── */
export function InteractiveDemo() {
  const {
    tasks,
    habits,
    xp,
    streak,
    doneTasks,
    doneHabits,
    pct,
    toggleTask,
    toggleHabit,
    reset,
  } = useProgress();

  const [goals, setGoals] = useState<DemoGoal[]>(INITIAL_GOALS);

  const toggleStep = (goalId: string, stepId: string) =>
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId
          ? {
              ...g,
              steps: g.steps.map((s) =>
                s.id === stepId ? { ...s, completed: !s.completed } : s
              ),
            }
          : g
      )
    );

  const allDone =
    tasks.every((t) => t.completed) &&
    habits.every((h) => h.completedToday);

  return (
    <div className="relative mx-auto flex w-full max-w-5xl items-stretch overflow-hidden rounded-2xl border border-white/[0.06] bg-[#101018]">
      <Sidebar />
      <div className="relative flex min-w-0 flex-1 flex-col">
      <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-6">
      {/* ── Card "Progresso do Dia" (mobile: formato do app real) ─── */}
      <div className="w-full mb-3 rounded-2xl border border-violet-500/15 bg-[#15151F] p-3 shadow-[0_0_40px_rgba(139,92,246,0.08)] sm:p-5">
        <div className="sm:flex sm:items-center sm:gap-4 sm:justify-between">
          {/* Mobile: anel grande centralizado no topo (como no app) */}
          <div className="block sm:hidden">
            <div className="flex justify-center">
              <ProgressRing pct={pct} big />
            </div>
            <div className="mt-3 text-center sm:text-left">
              <h3 className="text-[15px] font-bold text-white/90">
                Progresso do Dia
              </h3>
              <p className="mt-0.5 text-[12px] text-white/40">
                {allDone
                  ? "Dia completo! Dia de manter a sequência."
                  : "Comece o dia marcando suas primeiras tarefas!"}
              </p>
            </div>
            {/* 3 cards de stats lado a lado (formato do app) */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-white/[0.05] px-2 py-2 text-center">
                <Check size={13} className="mx-auto mb-1 text-emerald-400" />
                <div className="text-[15px] font-bold text-emerald-400">
                  {doneTasks}/{tasks.length}
                </div>
                <div className="text-[10px] text-white/40">Tarefas</div>
              </div>
              <div className="rounded-lg bg-white/[0.05] px-2 py-2 text-center">
                <Flame size={13} className="mx-auto mb-1 text-amber-400" />
                <div className="text-[15px] font-bold text-amber-400">
                  {doneHabits}/{habits.length}
                </div>
                <div className="text-[10px] text-white/40">Hábitos</div>
              </div>
              <div className="rounded-lg bg-white/[0.05] px-2 py-2 text-center">
                <span className="mb-1 block text-[13px]">⚡</span>
                <div className="text-[15px] font-bold text-violet-400">
                  {streak}d
                </div>
                <div className="text-[10px] text-white/40">Streak</div>
              </div>
            </div>
            {/* Anel de nível (NV) + XP (formato do app) */}
            <div className="mt-4 flex flex-col items-center">
              <ProgressRing pct={515 / 12} big level />
              <p className="mt-2 text-[12px] text-white/40">
                {xp + doneTasks * 20 + doneHabits * 10}/1200 XP
              </p>
            </div>
          </div>
          {/* Desktop: layout horizontal original */}
          <div className="hidden sm:flex sm:flex-1 sm:min-w-0 sm:items-center sm:justify-between sm:gap-4">
            <div className="flex items-center gap-4">
              <ProgressRing pct={pct} />
              <div className="min-w-0">
                <h3 className="text-[15px] font-bold text-white/90">
                  Progresso do Dia
                </h3>
                <p className="mt-0.5 max-w-[200px] text-[12px] text-white/40 sm:max-w-none">
                  {allDone
                    ? "Dia completo! Dia de manter a sequência."
                    : "Comece o dia marcando suas primeiras tarefas!"}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-1 items-center gap-3 lg:gap-5">
              <div>
                <div className="text-[15px] font-bold text-emerald-400">
                  {doneTasks}/{tasks.length}
                </div>
                <div className="text-[10px] text-white/40">Tarefas</div>
              </div>
              <div className="flex items-center gap-1">
                <Flame size={12} />
                <div className="text-[15px] font-bold text-amber-400">
                  {doneHabits}/{habits.length}
                </div>
              </div>
              <div className="text-[10px] text-white/40">Hábitos</div>
              <div className="flex items-center gap-1">
                <span>⚡</span>
                <div className="text-[15px] font-bold text-violet-400">
                  {streak}d
                </div>
              </div>
              <div className="text-[10px] text-white/40">Streak</div>
              <div className="text-[15px] font-bold text-white/90">
                {xp + doneTasks * 20 + doneHabits * 10}/1200 XP
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Colunas: Tarefas de Hoje + Hábitos de Hoje ───────── */}
      <div className="mb-3 grid flex-1 content-start gap-3 md:gap-4 md:grid-cols-2">
        <div className="w-full flex flex-col rounded-2xl border border-white/[0.06] bg-[#1A1A24] p-3 sm:p-4">
          <div className="mb-2.5 flex items-center gap-2">
            <Check size={13} className="text-emerald-400" />
            <h4 className="text-[13px] font-bold text-white/90">
              Tarefas de Hoje
            </h4>
            <span className="ml-auto text-[11px] font-bold text-violet-400">
              {doneTasks}/{tasks.length}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} onToggle={toggleTask} />
            ))}
            {/* Espaçador para alinhar visualmente com a coluna de hábitos */}
            <div className="flex-1" />
          </div>
        </div>

        <div className="w-full flex flex-col rounded-2xl border border-white/[0.06] bg-[#1A1A24] p-3 sm:p-4">
          <div className="mb-2.5 flex items-center gap-2">
            <Flame size={13} className="text-amber-400" />
            <h4 className="text-[13px] font-bold text-white/90">
              Hábitos de Hoje
            </h4>
            <span className="ml-auto text-[11px] font-bold text-violet-400">
              {doneHabits}/{habits.length}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {habits.map((habit) => (
              <HabitRow
                key={habit.id}
                habit={habit}
                onToggle={toggleHabit}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Metas em Andamento ─────────────────────────── */}
      <div className="w-full rounded-2xl border border-white/[0.06] bg-[#1A1A24] p-3 sm:p-4">
        <div className="mb-2.5 flex items-center gap-2">
          <Sparkles size={13} className="text-violet-400" />
          <h4 className="text-[13px] font-bold text-white/90">
            Metas em Andamento
          </h4>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onToggleStep={toggleStep} />
          ))}
        </div>
      </div>

      {/* ── Rodapé da demo: dica + reset ──────────────────── */}
      <div className="mt-4 flex items-center justify-between gap-3">
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.06] px-3 py-1.5 text-[11px] text-violet-300"
          >
            🎉 Dia completo! No app real, isso sincroniza entre seus
            dispositivos.
          </motion.div>
        )}
        <button
          onClick={reset}
          className="ml-auto flex items-center gap-1.5 rounded-full border border-white/[0.08] px-3 py-1.5 text-[11px] text-white/50 transition-colors hover:text-white/80"
        >
          <RotateCcw size={11} />
          Reiniciar demo
        </button>
      </div>
      </div>
      {/* CTA sob a demo (fora do mockup do app) */}
      <div className="flex justify-center border-t border-white/[0.06] bg-[#101018] p-3 sm:p-4">
        <Button
          asChild
          size="sm"
          variant="outline"
          className="border-violet-500/30 text-violet-300 hover:bg-violet-500/10 hover:text-violet-200"
        >
          <a href="https://ascend-lac-zeta.vercel.app" target="_blank" rel="noopener noreferrer">Criar conta grátis</a>
        </Button>
      </div>
    </div>
    </div>
  );
}
