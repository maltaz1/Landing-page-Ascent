import { LandingNav } from "./components/LandingNav";
import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { DemoSection } from "./components/DemoSection";
import { Features } from "./components/Features";
import { Differentiators } from "./components/Differentiators";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { LandingFooter } from "./components/LandingFooter";

/**
 * Landing page oficial do Ascend.
 * Usa exclusivamente o design system existente (tokens de cor, fontes,
 * componentes de UI e ícones do app). Nenhuma paleta ou estilo novo.
 */
export function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111118] text-foreground">
      <LandingNav />
      <main>
        <Hero />
        <Problem />
        <DemoSection />
        <Features />
        <Differentiators />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}

export default Landing;
