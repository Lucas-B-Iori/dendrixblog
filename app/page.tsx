import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { CaosSection } from "@/components/sections/CaosSection";
import { LoopSection } from "@/components/sections/LoopSection";
import { CockpitSection } from "@/components/sections/CockpitSection";
import { MesaJuridicaSection } from "@/components/sections/MesaJuridicaSection";
import { RedatorSection } from "@/components/sections/RedatorSection";
import { PrazosSection } from "@/components/sections/PrazosSection";
import { EspecialidadesSection } from "@/components/sections/EspecialidadesSection";
import { CaseStudySection } from "@/components/sections/CaseStudySection";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ClosingCtaSection } from "@/components/sections/ClosingCtaSection";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileBar } from "@/components/layout/StickyMobileBar";
import { ContinuousPageSpine } from "@/components/motion/ContinuousPageSpine";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-canvas)] text-[var(--text-primary)] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 relative">
        {/* V5 Flagship Feature: Espinha Dorsal Contínua em Background (Skiper 19) */}
        <ContinuousPageSpine />

        {/* Seção 01: Hero com Split-Screen Programático e Liquid Mesh (Skiper 12) */}
        <HeroSection />

        {/* Seção 02: O Custo do Caos Operacional com Texto Scrubado (Skiper 70 + 29) */}
        <CaosSection />

        {/* Seção 03: O Loop do Caso com Fio Condutor Dinâmico (Skiper 19) */}
        <LoopSection />

        {/* Seção Interativa V4: Cockpit do Advogado + Slider de Peças Reais (OriginKit Slider) */}
        <CockpitSection />

        {/* Seção 04: Mesa Jurídica com Spotlight Frames (OriginKit Frames) */}
        <MesaJuridicaSection />

        {/* Seção 05: Redator Assistido (Pilar 2 - Minuta com Citação) */}
        <RedatorSection />

        {/* Seção 06: Prazos e Publicações (Pilar 3 - Painel Operacional) */}
        <PrazosSection />

        {/* Seção V4: Cilindro 3D de Especialidades (OriginKit Round Carousel) + Tribunais (Skiper 6) */}
        <EspecialidadesSection />

        {/* Seção 07: Estudo de Caso Desidentificado (Preflight Gated via SHOW_CASE_STUDY) */}
        <CaseStudySection />

        {/* Seção 08: Calculadora de Horas (Preflight Gated via SHOW_CALCULATOR) */}
        <RoiCalculator />

        {/* Seção 09: Segurança da Informação com Bloco Apple Keynote (Skiper 76) */}
        <SecuritySection />

        {/* Seção 10: FAQ de Transparência Radical */}
        <FaqSection />

        {/* Seção 11: Fechamento (Closing CTA com Liquid Mesh) */}
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
