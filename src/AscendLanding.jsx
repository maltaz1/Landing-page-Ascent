import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Analytics } from '@vercel/analytics/react';

// ─── Font: Geist (all weights, via Google Fonts) ────────────────────────────
// Palette: near-black bg, violet #6D28D9 accent, white, zinc grays

// ─── Cursor glow ─────────────────────────────────────────────────────────────
function CursorGlow() {
  const [p, setP] = useState({ x: -999, y: -999 });
  useEffect(() => {
    const h = (e) => setP({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-0"
      style={{ background: `radial-gradient(700px at ${p.x}px ${p.y}px, rgba(109,40,217,0.06), transparent 60%)` }}
    />
  );
}

// ─── Noise texture ────────────────────────────────────────────────────────────
function Noise() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[2] opacity-[0.035]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "180px",
      }}
    />
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id="lg" x1="0" y1="40" x2="40" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F46E5"/>
          <stop offset="0.5" stopColor="#7C3AED"/>
          <stop offset="1" stopColor="#A78BFA"/>
        </linearGradient>
      </defs>
      <circle cx="20" cy="22" r="13" stroke="url(#lg)" strokeWidth="2.5" fill="none"/>
      <path d="M13 31L20 11L27 31" stroke="url(#lg)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 26L25 26" stroke="url(#lg)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M22 19L29 9" stroke="url(#lg)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M25.5 9L29 9L29 12.5" stroke="url(#lg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className={`transition-all duration-500 ${scrolled ? "bg-[#09090b]/90 backdrop-blur-xl border-b border-white/[0.05]" : ""}`}>
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <img src="/logo.png" alt="Ascend Logo" className="w-16 h-16" />
          </a>

          <nav className="hidden md:flex items-center gap-7">
            
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <motion.a
              href="https://ascend-lac-zeta.vercel.app"
              target="_blank"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-[13px] font-semibold px-4 py-2 rounded-lg text-white"
              style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)", boxShadow: "0 2px 16px rgba(109,40,217,0.4)" }}
            >
              Comece grátis
            </motion.a>
          </div>

          <button className="md:hidden text-zinc-400" onClick={() => setOpen(!open)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/>
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-[#0c0c0f] border-b border-white/[0.05] px-5 py-4 flex flex-col gap-3"
          >
            {["Recursos", "Planos", "Blog"].map(i => <a key={i} href="#" className="text-zinc-300 text-sm">{i}</a>)}
            <a href="#" className="text-center font-semibold text-sm py-2.5 rounded-lg text-white"
              style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)" }}>
              Comece grátis
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── App screen mockup ────────────────────────────────────────────────────────
function AppScreen() {
  const bars = [35, 55, 42, 70, 58, 85, 65, 92, 72, 88, 68, 100];
  const rings = [
    { label: "Água", pct: 80, c: "#60A5FA" },
    { label: "Sono", pct: 90, c: "#A78BFA" },
    { label: "Dieta", pct: 65, c: "#34D399" },
    { label: "Foco", pct: 55, c: "#F472B6" },
  ];
  const r = (size, stroke) => {
    const radius = (size - stroke) / 2;
    const circ = 2 * Math.PI * radius;
    return { radius, circ };
  };

  return (
    <div className="relative" style={{ width: 320 }}>
      {/* Glow behind */}
      <div className="absolute -inset-12 -z-10 rounded-full opacity-60"
        style={{ background: "radial-gradient(ellipse, rgba(109,40,217,0.35), transparent 65%)", filter: "blur(30px)" }}/>

      {/* Phone frame */}
      <div className="relative rounded-[42px] overflow-hidden"
        style={{
          background: "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 60px 120px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Inner screen */}
        <div className="bg-[#0a0a0d] mx-[3px] mt-[3px] mb-[3px] rounded-[40px] overflow-hidden" style={{ minHeight: 620 }}>
          {/* Status */}
          <div className="flex justify-between items-center px-5 pt-4 pb-1">
            <span className="text-[10px] text-zinc-600">9:41</span>
            <div className="w-20 h-[18px] bg-black rounded-full"/>
            <div className="w-6 h-3 rounded-sm bg-zinc-700"/>
          </div>

          <div className="px-4 pt-1 pb-5 space-y-3">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-zinc-600">Sex, 14 Fev</p>
                <p className="text-white font-bold text-[15px] leading-tight">Bom dia, João 👋</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black text-white cursor-pointer"
                style={{ background: "linear-gradient(135deg, #4F46E5, #7C3AED, #A78BFA)", boxShadow: "0 0 18px rgba(109,40,217,0.55)" }}
              >
                J
              </motion.div>
            </div>

            {/* XP card */}
            <div className="rounded-2xl p-3.5 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.18), rgba(124,58,237,0.12))", border: "1px solid rgba(124,58,237,0.28)" }}>
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top right, rgba(167,139,250,0.15), transparent 60%)" }}/>
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#A78BFA" }}>Nível 12 · Guerreiro</p>
                  <p className="text-[10px] text-zinc-500">2.4k / 3k XP</p>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ duration: 1.6, delay: 0.7, ease: [0.16,1,0.3,1] }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #4F46E5, #7C3AED, #A78BFA)" }}
                  />
                </div>
                <p className="text-[9px] text-zinc-600 mt-1">600 XP para Elite</p>
              </div>
            </div>

            {/* 3 quick stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { e: "🔥", l: "Streak", v: "12d", c: "#FCA5A5", bg: "rgba(239,68,68,0.08)", b: "rgba(239,68,68,0.18)" },
                { e: "✓", l: "Tarefas", v: "8/10", c: "#6EE7B7", bg: "rgba(16,185,129,0.08)", b: "rgba(16,185,129,0.18)" },
                { e: "💪", l: "Treino", v: "4×", c: "#93C5FD", bg: "rgba(79,110,247,0.08)", b: "rgba(79,110,247,0.18)" },
              ].map(({ e, l, v, c, bg, b }) => (
                <div key={l} className="rounded-xl p-2.5 text-center" style={{ background: bg, border: `1px solid ${b}` }}>
                  <div className="text-sm mb-0.5">{e}</div>
                  <p className="text-white font-black text-xs leading-none mb-0.5">{v}</p>
                  <p className="text-[8px] font-medium" style={{ color: c }}>{l}</p>
                </div>
              ))}
            </div>

            {/* Activity chart */}
            <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex justify-between items-start mb-2.5">
                <div>
                  <p className="text-white text-[11px] font-bold">Atividade</p>
                  <p className="text-zinc-600 text-[9px]">Últimos 12 dias</p>
                </div>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(52,211,153,0.12)", color: "#34D399", border: "1px solid rgba(52,211,153,0.2)" }}>↑ +24%</span>
              </div>
              <div className="flex items-end gap-[3px] h-9">
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 1 + i * 0.05, ease: [0.16,1,0.3,1] }}
                    className="flex-1 rounded-[2px] origin-bottom"
                    style={{ height: `${h}%`, background: i >= 9 ? "linear-gradient(180deg,#A78BFA,#6D28D9)" : "rgba(255,255,255,0.07)" }}
                  />
                ))}
              </div>
            </div>

            {/* Habit rings */}
            <div className="rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-white text-[11px] font-bold mb-2.5">Hábitos de hoje</p>
              <div className="flex justify-around">
                {rings.map(({ label, pct, c }) => {
                  const sz = 42, st = 3.5;
                  const { radius, circ } = r(sz, st);
                  return (
                    <div key={label} className="flex flex-col items-center gap-1">
                      <div className="relative" style={{ width: sz, height: sz }}>
                        <svg width={sz} height={sz} style={{ transform: "rotate(-90deg)" }}>
                          <circle cx={sz/2} cy={sz/2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={st}/>
                          <motion.circle
                            cx={sz/2} cy={sz/2} r={radius} fill="none" stroke={c} strokeWidth={st}
                            strokeLinecap="round"
                            strokeDasharray={circ}
                            initial={{ strokeDashoffset: circ }}
                            animate={{ strokeDashoffset: circ * (1 - pct/100) }}
                            transition={{ duration: 1.3, delay: 1.1, ease: [0.16,1,0.3,1] }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[9px] font-black text-white">{pct}%</span>
                        </div>
                      </div>
                      <p className="text-[8px] text-zinc-600">{label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Finance */}
            <div className="rounded-2xl p-3" style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.08), rgba(16,185,129,0.04))", border: "1px solid rgba(52,211,153,0.14)" }}>
              <div className="flex justify-between items-center mb-1.5">
                <p className="text-white text-[11px] font-bold">💰 Saldo do mês</p>
                <p className="text-[9px] font-semibold" style={{ color: "#34D399" }}>+R$320 economy</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-white font-black text-xl leading-none">R$4.280</span>
                <span className="text-[10px] font-bold" style={{ color: "#34D399" }}>↑ 8.6%</span>
              </div>
              <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "62%" }}
                  transition={{ duration: 1.2, delay: 1.4, ease: [0.16,1,0.3,1] }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg,#34D399,#10B981)" }}
                />
              </div>
              <p className="text-[8px] text-zinc-600 mt-1">62% da meta mensal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating chips */}
      <motion.div
        animate={{ y: [0,-10,0], rotate: [0,1,0] }}
        transition={{ repeat:Infinity, duration:4, ease:"easeInOut" }}
        className="absolute -top-3 -right-10 rounded-2xl px-3 py-2 backdrop-blur-xl"
        style={{ background:"rgba(13,13,18,0.92)", border:"1px solid rgba(167,139,250,0.25)", boxShadow:"0 8px 32px rgba(109,40,217,0.25)" }}
      >
        <p className="text-[9px] text-zinc-500 leading-none mb-0.5">XP hoje</p>
        <p className="text-[13px] font-black" style={{color:"#A78BFA"}}>+340 XP</p>
      </motion.div>

      <motion.div
        animate={{ y:[0,10,0], rotate:[0,-1,0] }}
        transition={{ repeat:Infinity, duration:3.8, ease:"easeInOut", delay:0.8 }}
        className="absolute -bottom-2 -left-10 rounded-2xl px-3 py-2 backdrop-blur-xl"
        style={{ background:"rgba(13,13,18,0.92)", border:"1px solid rgba(239,68,68,0.2)", boxShadow:"0 8px 32px rgba(239,68,68,0.12)" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-base">🔥</span>
          <div>
            <p className="text-[9px] text-zinc-500">Streak</p>
            <p className="text-white font-black text-xs">12 dias</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ x:[0,6,0] }}
        transition={{ repeat:Infinity, duration:5, ease:"easeInOut", delay:1.5 }}
        className="absolute top-[42%] -right-14 rounded-xl px-2.5 py-1.5 backdrop-blur-xl hidden sm:block"
        style={{ background:"rgba(13,13,18,0.92)", border:"1px solid rgba(52,211,153,0.2)" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <p className="text-[9px] font-bold text-emerald-400">Hábito ✓</p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll();
  const phoneY = useTransform(scrollY, [0, 700], [0, 60]);
  const fadeOut = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: 56 }}>
      {/* bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.4,
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)"
        }}/>
        <motion.div
          animate={{ scale:[1,1.12,1], opacity:[0.5,0.7,0.5] }}
          transition={{ repeat:Infinity, duration:9, ease:"easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
          style={{ background:"radial-gradient(ellipse, rgba(109,40,217,0.2), transparent 65%)", filter:"blur(40px)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 py-20">
        <div className="grid lg:grid-cols-[1fr_auto] gap-20 items-center">

          {/* Copy */}
          <motion.div style={{ opacity: fadeOut }} className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity:0, y:16 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
              className="flex items-center gap-2 mb-9"
            >
              
              <div className="flex gap-px">
                {[...Array(5)].map((_,i) => (
                  <svg key={i} className="w-3 h-3" fill="#7C3AED" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
            </motion.div>

            {/* H1 — editorial, não alinhado */}
            <div className="mb-8 overflow-hidden">
              {[
                { text: "Sua rotina", indent: false },
                { text: "virou um", indent: true },
                { text: "sistema.", indent: false, accent: true },
              ].map(({ text, indent, accent }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity:0, y:60 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ duration:0.85, delay: i * 0.12, ease:[0.16,1,0.3,1] }}
                  className={`block ${indent ? "pl-10 sm:pl-16" : ""}`}
                >
                  <span
                    className="font-black leading-[0.88] tracking-[-0.02em]"
                    style={{
                      fontSize: "clamp(3rem, 7vw, 6rem)",
                      ...(accent ? {
                        background: "linear-gradient(100deg, #818CF8 0%, #7C3AED 40%, #C084FC 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      } : { color: "white" })
                    }}
                  >
                    {text}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.5, ease:[0.16,1,0.3,1] }}
              className="text-zinc-400 text-lg leading-relaxed max-w-lg mb-10"
            >
              Hábitos, treino, dieta, finanças — tudo num app que te recompensa como um game.
              Porque consistência não vem de motivação, vem de sistema.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7, delay:0.62, ease:[0.16,1,0.3,1] }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <motion.a
                href="https://ascend-lac-zeta.vercel.app"
                target="_blank"
                whileHover={{ scale:1.03, boxShadow:"0 20px 60px rgba(109,40,217,0.55)" }}
                whileTap={{ scale:0.97 }}
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-[15px] overflow-hidden"
                style={{ background:"linear-gradient(135deg,#4F46E5,#6D28D9,#7C3AED)", boxShadow:"0 6px 28px rgba(109,40,217,0.4)" }}
              >
                <span className="relative z-10" href="https://ascend-lac-zeta.vercel.app">
                  Comece agora — é grátis</span>
                <svg className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </motion.a>

            
            </motion.div>

            <motion.p
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ delay:1 }}
              className="text-[12px] text-zinc-600"
            >
              
            </motion.p>
          </motion.div>

          {/* Phone */}
          <motion.div
            style={{ y: phoneY }}
            initial={{ opacity:0, x:40, scale:0.95 }}
            animate={{ opacity:1, x:0, scale:1 }}
            transition={{ duration:1.1, delay:0.3, ease:[0.16,1,0.3,1] }}
            className="hidden lg:flex justify-end"
          >
            <AppScreen />
          </motion.div>
        </div>

        {/* Mobile phone */}
        <motion.div
          initial={{ opacity:0, y:50 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:1, delay:0.8, ease:[0.16,1,0.3,1] }}
          className="lg:hidden flex justify-center mt-16"
        >
          <AppScreen />
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-40 pointer-events-none" style={{ background:"linear-gradient(to top, #09090b, transparent)" }}/>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const items = [
    { quote: "Finalmente um app que me faz querer acordar cedo. O XP é viciante do jeito certo.", name: "Lucas M.", role: "Dev", init: "LM" },
    { quote: "Substituí 6 apps por um. Minha produtividade foi às alturas — literalmente.", name: "Camila S.", role: "Designer", init: "CS" },
    { quote: "Perdi 8kg, economizei R$800/mês e entreguei 3 projetos em 90 dias.", name: "Rafael T.", role: "CEO", init: "RT" },
    { quote: "Precisava de foco total. O Ascend entendeu isso e me deu um sistema completo.", name: "Mariana K.", role: "Médica", init: "MK" },
  ];

  return (
    <section ref={ref} className="relative py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.8 }}
          className="mb-14"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color:"#7C3AED" }}>Depoimentos</p>
          <h2 className="font-black text-white text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.1]">
            Quem usou,<br/>não volta atrás.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.04]">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity:0, y:24 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.6, delay: i * 0.09 }}
              className="relative bg-[#09090b] p-6 group hover:bg-[#0e0e13] transition-colors duration-300"
            >
              <div className="absolute top-0 left-0 w-px h-full bg-white/[0.04]"/>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_,j) => (
                  <svg key={j} className="w-3.5 h-3.5" fill="#6D28D9" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-zinc-300 text-[14px] leading-relaxed mb-6 font-medium">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black text-white flex-shrink-0"
                  style={{ background:`linear-gradient(135deg, #4F46E5, #7C3AED)` }}>
                  {item.init}
                </div>
                <div>
                  <p className="text-white text-[12px] font-bold">{item.name}</p>
                  <p className="text-zinc-600 text-[11px]">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  { icon:"✓", name:"Tarefas", desc:"Kanban inteligente que prioriza o que importa.", c:"#93C5FD" },
  { icon:"🔥", name:"Hábitos", desc:"Streak diário com recordes e recompensas visuais.", c:"#FCA5A5" },
  { icon:"🎯", name:"Metas", desc:"OKRs pessoais com progresso e marcos celebrados.", c:"#A78BFA" },
  { icon:"🏋️", name:"Academia", desc:"Planos, PRs e evolução de carga semana a semana.", c:"#F9A8D4" },
  { icon:"🥑", name:"Dieta", desc:"Macro tracking com 500k alimentos no catálogo.", c:"#6EE7B7" },
  { icon:"💰", name:"Finanças", desc:"Gastos, metas de economia e relatórios visuais.", c:"#34D399" },
  { icon:"📅", name:"Calendário", desc:"Visão unificada de tudo o que importa.", c:"#818CF8" },
  { icon:"📈", name:"Evolução", desc:"Dashboard pessoal com métricas de crescimento.", c:"#C084FC" },
];

function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16">
          <div className="flex-1">
            <motion.p
              initial={{ opacity:0, y:20 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.6 }}
              className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3"
              style={{ color:"#7C3AED" }}
            >
              O que você controla
            </motion.p>
            <motion.h2
              initial={{ opacity:0, y:24 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.7, delay:0.07 }}
              className="font-black text-white text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.1]"
            >
              8 sistemas.<br/>1 vida melhor.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity:0 }}
            animate={inView ? { opacity:1 } : {}}
            transition={{ duration:0.7, delay:0.2 }}
            className="text-zinc-500 text-[15px] max-w-xs leading-relaxed"
          >
            Cada módulo integrado com os outros. Um ecossistema de evolução pessoal.
          </motion.p>
        </div>

        {/* Asymmetric grid: big first card + 7 smaller */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity:0, y:28 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.55, delay: i * 0.065, ease:[0.16,1,0.3,1] }}
              whileHover={{ y:-4, scale:1.01 }}
              className={`group relative rounded-2xl p-5 cursor-pointer transition-all duration-300 ${i === 0 ? "row-span-1 col-span-1" : ""}`}
              style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.25)"; e.currentTarget.style.background = "rgba(109,40,217,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <p className="font-bold text-white text-[14px] mb-1.5">{f.name}</p>
              <p className="text-zinc-500 text-[12px] leading-relaxed">{f.desc}</p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: f.c }}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gamification ─────────────────────────────────────────────────────────────
function Gamification() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const levels = [
    { name:"Iniciante", xp:"0", w:"100%", c:"#52525b" },
    { name:"Disciplinado", xp:"500", w:"100%", c:"#4F46E5" },
    { name:"Guerreiro", xp:"2K", w:"80%", c:"#7C3AED" },
    { name:"Elite", xp:"10K", w:"0%", c:"#A78BFA" },
    { name:"Lendário", xp:"∞", w:"0%", c:"#C084FC" },
  ];

  return (
    <section ref={ref} className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
          style={{ background:"radial-gradient(ellipse, rgba(109,40,217,0.08), transparent 65%)", filter:"blur(60px)" }}/>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <motion.p initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6}}
              className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{color:"#7C3AED"}}>
              Progressão
            </motion.p>
            <motion.h2 initial={{ opacity:0, y:24 }} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7,delay:0.07}}
              className="font-black text-white text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.1] mb-6">
              Sua vida como um jogo que você{" "}
              <span style={{ background:"linear-gradient(100deg,#818CF8,#7C3AED,#C084FC)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                ganha.
              </span>
            </motion.h2>
            <motion.p initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{duration:0.7,delay:0.2}}
              className="text-zinc-500 text-[15px] leading-relaxed max-w-md">
              XP, níveis e conquistas que tornam a disciplina irresistível — do jeito certo.
              Cada hábito cumprido, cada meta batida: você sente a progressão.
            </motion.p>
          </div>

          {/* Right: levels + achievements */}
          <motion.div initial={{ opacity:0, x:30 }} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.8,delay:0.2}}
            className="space-y-3">
            {/* Level bars */}
            <div className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
              <p className="text-white font-bold text-[14px] mb-4">Sua progressão</p>
              <div className="space-y-3.5">
                {levels.map((l, i) => (
                  <div key={l.name} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:l.c}}/>
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="font-semibold" style={{color: i <= 2 ? "white" : "#52525b"}}>{l.name}</span>
                        <span className="text-zinc-600">{l.xp} XP</span>
                      </div>
                      <div className="h-1 rounded-full overflow-hidden" style={{background:"rgba(255,255,255,0.06)"}}>
                        <motion.div
                          initial={{width:0}}
                          animate={inView?{width:l.w}:{}}
                          transition={{duration:1.2, delay:0.6+i*0.12, ease:[0.16,1,0.3,1]}}
                          className="h-full rounded-full"
                          style={{background:l.c}}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/[0.05] flex justify-between">
                <div>
                  <p className="text-zinc-600 text-[11px]">Nível atual</p>
                  <p className="text-white font-black text-lg">Guerreiro <span style={{color:"#A78BFA"}}>12</span></p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-600 text-[11px]">Próximo nível</p>
                  <p className="font-bold text-base" style={{color:"#A78BFA"}}>600 XP</p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon:"🔥", name:"30 dias", unlocked:true },
                { icon:"💪", name:"100 treinos", unlocked:true },
                { icon:"💰", name:"Meta $", unlocked:true },
                { icon:"🌙", name:"Noturno", unlocked:false },
                { icon:"⚡", name:"Perfeito", unlocked:false },
                { icon:"👑", name:"Lendário", unlocked:false },
              ].map(a => (
                <motion.div
                  key={a.name}
                  whileHover={a.unlocked ? {scale:1.05} : {}}
                  className="rounded-xl p-3 text-center relative"
                  style={a.unlocked
                    ? {background:"rgba(109,40,217,0.1)",border:"1px solid rgba(109,40,217,0.25)"}
                    : {background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)",opacity:0.4}
                  }
                >
                  <div className="text-xl mb-1">{a.icon}</div>
                  <p className="text-[9px] font-semibold" style={{color: a.unlocked ? "#DDD6FE" : "#52525b"}}>{a.name}</p>
                  {!a.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-xl">
                      <span className="text-zinc-700 text-sm">🔒</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Comparison ───────────────────────────────────────────────────────────────
function Comparison() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const apps = ["Notion","MyFitnessPal","Google Cal","Mobills","Habitica","Strong"];

  return (
    <section ref={ref} className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.8}} className="mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{color:"#7C3AED"}}>Centralização</p>
          <h2 className="font-black text-white text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.1]">
            Pare de viver<br/>em abas.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Before */}
          <motion.div initial={{opacity:0,x:-24}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.7,delay:0.1}}
            className="rounded-2xl p-6" style={{background:"rgba(239,68,68,0.04)",border:"1px solid rgba(239,68,68,0.14)"}}>
            <p className="text-red-400 font-bold text-[13px] mb-4 uppercase tracking-wide">❌ Antes</p>
            <div className="space-y-2">
              {apps.map((app,i) => (
                <motion.div key={app}
                  initial={{opacity:0,x:-10}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.3+i*0.07}}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                  style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)"}}>
                  <span className="text-red-500 text-xs font-bold">✕</span>
                  <span className="text-zinc-300 text-[13px]">{app}</span>
                  <span className="ml-auto text-[10px] text-zinc-700 font-medium">app separado</span>
                </motion.div>
              ))}
              <p className="text-center text-red-400/50 text-[11px] pt-2">6 apps · 6 assinaturas · 6 distrações</p>
            </div>
          </motion.div>

          {/* After */}
          <motion.div initial={{opacity:0,x:24}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.7,delay:0.2}}
            className="rounded-2xl p-6 flex flex-col" style={{background:"rgba(109,40,217,0.06)",border:"1px solid rgba(109,40,217,0.2)"}}>
            <p className="font-bold text-[13px] mb-4 uppercase tracking-wide" style={{color:"#A78BFA"}}>✦ Com Ascend</p>
            <div className="flex-1 flex flex-col items-center justify-center py-6">
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-full flex items-center justify-center"
                  style={{background:"linear-gradient(135deg,rgba(79,70,229,0.2),rgba(124,58,237,0.15))",border:"1px solid rgba(124,58,237,0.3)"}}>
                  <div className="w-18 h-18 rounded-full flex items-center justify-center p-4"
                    style={{background:"linear-gradient(135deg,#4F46E5,#6D28D9,#7C3AED)",boxShadow:"0 0 40px rgba(109,40,217,0.5)"}}>
                    <Logo size={36}/>
                  </div>
                </div>
                {["✓","🔥","🏋️","💰","🥑","📅"].map((icon,i) => {
                  const a = (i*360/6)*(Math.PI/180);
                  return (
                    <div key={i} className="absolute w-8 h-8 rounded-full flex items-center justify-center text-xs"
                      style={{background:"#0e0e13",border:"1px solid rgba(255,255,255,0.08)",
                        left:`${50+46*Math.cos(a-Math.PI/2)}%`,top:`${50+46*Math.sin(a-Math.PI/2)}%`,transform:"translate(-50%,-50%)"}}>
                      {icon}
                    </div>
                  );
                })}
              </div>
              <p className="text-white font-black text-lg mb-2">Tudo em um lugar</p>
              <p className="text-zinc-500 text-[13px] text-center max-w-xs">Um sistema. Uma versão mais focada de você.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Benefits ─────────────────────────────────────────────────────────────────
function Benefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const items = [
    { icon:"⚡", t:"Foco absoluto", d:"Só o que te faz avançar entra no radar. Sem ruído." },
    { icon:"🧠", t:"Clareza mental", d:"Mente organizada não fica girando em círculos." },
    { icon:"📐", t:"Disciplina de verdade", d:"Construída por sistema, não por motivação passageira." },
    { icon:"🏆", t:"Progresso visível", d:"Números e gráficos que combustíam a continuidade." },
    { icon:"🌀", t:"Constância", d:"1% melhor por dia. Em 1 ano: 37× mais evoluído." },
    { icon:"🔮", t:"Nova identidade", d:"Você não usa o Ascend. Você vira quem usa o Ascend." },
  ];

  return (
    <section ref={ref} className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16">
          <motion.div initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.8}}>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3" style={{color:"#7C3AED"}}>Por que funciona</p>
            <h2 className="font-black text-white text-4xl sm:text-5xl tracking-[-0.02em] leading-[1.1]">
              Não é um app.<br/>
              <span className="text-zinc-500">É uma mudança de</span><br/>
              identidade.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map((item, i) => (
              <motion.div
                key={item.t}
                initial={{opacity:0, y:24}}
                animate={inView?{opacity:1,y:0}:{}}
                transition={{duration:0.55, delay: i*0.08}}
                whileHover={{y:-3}}
                className="group p-5 rounded-2xl transition-all duration-300 cursor-default"
                style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(109,40,217,0.25)"; e.currentTarget.style.background="rgba(109,40,217,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"; e.currentTarget.style.background="rgba(255,255,255,0.03)"; }}
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <p className="text-white font-bold text-[14px] mb-1.5">{item.t}</p>
                <p className="text-zinc-500 text-[13px] leading-relaxed">{item.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA final ────────────────────────────────────────────────────────────────
function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* subtle top border line */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(109,40,217,0.4), transparent)" }}/>

      {/* background glow — smaller, more subtle */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(109,40,217,0.12), transparent 70%)", filter: "blur(80px)" }}/>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">

          {/* Left: headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: "#6D28D9" }}>
              Comece agora
            </p>
            <h2 className="font-black text-white leading-[1.0] mb-0"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}>
              O melhor momento
              <br/>
              <span style={{
                background: "linear-gradient(100deg, #818CF8, #7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                foi ontem.
              </span>
              <br/>
              <span className="text-zinc-400 font-semibold" style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)", letterSpacing: "-0.01em" }}>
                O segundo melhor é agora.
              </span>
            </h2>
          </motion.div>

          {/* Right: CTA block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col items-start lg:items-end gap-4 lg:min-w-[260px]"
          >
            <p className="text-zinc-500 text-[14px] leading-relaxed lg:text-right max-w-xs">
              Pessoas já evoluiram. Você começa hoje, de graça.
            </p>

            <motion.a
              href="https://ascend-lac-zeta.vercel.app"
              target="_blank"
              whileHover={{ scale: 1.03, boxShadow: "0 16px 48px rgba(109,40,217,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-white font-bold text-[15px] whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #4F46E5, #6D28D9)", boxShadow: "0 4px 24px rgba(109,40,217,0.35)" }}
            >
              Começar gratuitamente
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </motion.a>

          
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Ascend Logo" className="w-16 h-16" />
          <span className="text-zinc-700 text-[12px] ml-2">© 2025</span>
        </div>
        <div className="flex gap-6">
          {["Privacidade","Termos","Suporte"].map(i => (
            <a key={i} href="#" className="text-zinc-700 hover:text-zinc-400 text-[12px] transition-colors">{i}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-[#09090b] text-white overflow-x-hidden">

<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <Noise/>
      <CursorGlow/>
      <Navbar/>
      <main>
        <Hero/>
        <Testimonials/>
        <Features/>
        <Gamification/>
        <Comparison/>
        <Benefits/>
        <FinalCTA/>
      </main>
      <Footer/>
      <Analytics />
    </div>
  );
}
