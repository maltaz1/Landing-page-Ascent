export function LandingFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-white/[0.015] py-12">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <img src="/manus-storage/ascend-logo-taskbar_74e6a21b.png" alt="Ascend" className="h-9 w-auto" />
            <p className="text-[12px] text-white/35">
              © {new Date().getFullYear()} Ascend. Todos os direitos reservados.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <a
              href="#features"
              className="text-[12px] text-white/45 transition-colors hover:text-white"
            >
              Produto
            </a>
            <a
              href="#pricing"
              className="text-[12px] text-white/45 transition-colors hover:text-white"
            >
              Planos
            </a>
            <a
              href="/privacy"
              className="text-[12px] text-white/45 transition-colors hover:text-white"
            >
              Privacidade
            </a>
            <a
              href="/terms"
              className="text-[12px] text-white/45 transition-colors hover:text-white"
            >
              Termos
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-white/45 transition-colors hover:text-white"
            >
              Twitter / X
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-white/45 transition-colors hover:text-white"
            >
              Instagram
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
