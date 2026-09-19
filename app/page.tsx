import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { CaosSection } from "@/components/sections/CaosSection";
import { LoopSection } from "@/components/sections/LoopSection";
import { CockpitSection } from "@/components/sections/CockpitSection";
import { MesaJuridicaSection } from "@/components/sections/MesaJuridicaSection";
import { RedatorSection } from "@/components/sections/RedatorSection";
import { PrazosSection } from "@/components/sections/PrazosSection";
import { CaseStudySection } from "@/components/sections/CaseStudySection";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-canvas)] text-[var(--text-primary)]">
      <Navbar />

      <main className="flex-1">
        {/* Seção 01: Hero com Split-Screen Programático */}
        <HeroSection />

        {/* Seção 02: O Custo do Caos Forense */}
        <CaosSection />

        {/* Seção 03: O Loop do Caso */}
        <LoopSection />

        {/* Seção Interativa V3: O Cockpit Forense do Dendrix na Prática */}
        <CockpitSection />

        {/* Seção 04: Mesa Jurídica (Pilar 1 - Raio-X dos Autos) */}
        <MesaJuridicaSection />

        {/* Seção 05: Redator Assistido (Pilar 2 - Minuta com Citação) */}
        <RedatorSection />

        {/* Seção 06: Prazos e Publicações (Pilar 3 - Painel Operacional) */}
        <PrazosSection />

        {/* Seção 07: Estudo de Caso Desidentificado (Preflight Gated via SHOW_CASE_STUDY) */}
        <CaseStudySection />

        {/* Seção 08: Calculadora de Horas (Preflight Gated via SHOW_CALCULATOR) */}
        <RoiCalculator />

        {/* Seção 09: Segurança da Informação, Governança e LGPD */}
        <SecuritySection />

        {/* Seção 10: FAQ de Transparência Radical */}
        <FaqSection />

        {/* Seção 11: Fechamento (Closing CTA) */}
        <div id="agendar">
          <ClosingCtaSection />
        </div>
      </main>

      <Footer />

      {/* Barra de Polegar Fixa no Mobile Pós-Hero */}
      <StickyMobileBar />
    </div>
  );
}
