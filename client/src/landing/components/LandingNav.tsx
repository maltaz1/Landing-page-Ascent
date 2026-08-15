import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#demo", label: "Demo" },
  { href: "#features", label: "Recursos" },
  { href: "#pricing", label: "Planos" },
  { href: "#faq", label: "FAQ" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#111118]/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <img
            src="/manus-storage/ascend-logo-taskbar_74e6a21b.png"
            alt="Ascend"
            className="h-10 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-white/55 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden text-[13px] text-white/60 hover:bg-white/5 hover:text-white sm:inline-flex"
          >
            <a href="#pricing">Entrar</a>
          </Button>
          <Button
            asChild
            size="sm"
            className="h-8 rounded-lg bg-violet-600 text-[13px] hover:bg-violet-700"
          >
            <a href="#pricing">Começar grátis</a>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}
    >
      <div
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.08] px-3 py-1"
        style={{ fontFamily: "inherit" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-violet-300">
          {eyebrow}
        </span>
      </div>
      <h2
        className="text-[22px] font-bold tracking-tight text-white sm:text-3xl lg:text-[34px]"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {title}
      </h2>
      {sub && (
        <p className="mt-2 text-[13px] leading-relaxed text-white/45 sm:text-[15px]">
          {sub}
        </p>
      )}
    </motion.div>
  );
}
