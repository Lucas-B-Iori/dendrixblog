import React from "react";
import { HeroSplitScreen } from "./HeroSplitScreen";
import { ArrowRight, Sparkles, CheckCircle, ShieldCheck } from "lucide-react";
import { OpenDemoButton } from "@/components/cta/OpenDemoButton";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ContainerScroll3D } from "@/components/motion/ContainerScroll3D";
import { VercelLiquidSimulation } from "@/components/motion/VercelLiquidSimulation";
import { RollingCounter } from "@/components/motion/RollingCounter";

export function HeroSection() {
  return (
    <SectionWrapper id="hero" width="default" spacing="hero" className="relative overflow-hidden min-h-[92vh] flex items-center">
      {/* Camada 0: WebGL Liquid Wave Simulation (Skiper 12 / Vercel Ship caustics) */}
      <VercelLiquidSimulation />

      {/* Brilho Radial Atmosférico Jurídico */}
      <div
        className="pointer-events-none absolute -top-24 right-0 w-[700px] h-[700px] rounded-full opacity-35 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(2,132,199,0.12) 40%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 w-full py-6">
        {/* Coluna Esquerda: Texto Oficial Travado com Estética de Luxo */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-7 text-left">
          {/* Eyebrow Institucional */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>CRM Jurídico com Inteligência Contextual</span>
          </div>

          {/* H1 Oficial (Locked) */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[3.25rem] font-medium leading-[1.12] tracking-[-0.03em] text-slate-900 dark:text-white text-balance">
            Dos autos à minuta, com a origem das informações sempre visível.
          </h1>

          {/* Subheadline Oficial (Locked) */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-normal">
            O Dendrix conecta o contexto do processo à leitura dos autos em PDF, identifica fatos e contradições com referência às páginas e auxilia na redação da peça no mesmo ambiente.
          </p>

          {/* Action CTAs */}
          <div className="space-y-3.5 pt-1">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <OpenDemoButton className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-[#0F2B48] to-[#0A3D62] hover:from-[#143D66] hover:to-[#0D4B78] border border-white/10 rounded-xl transition-all shadow-[0_0_25px_rgba(15,43,72,0.6)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus-ring text-center">
                <span>Agendar demonstração prática</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </OpenDemoButton>

              <a
                href="#cockpit"
                className="inline-flex items-center justify-center px-5 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] active:bg-white/[0.1] rounded-xl transition-all text-center border border-slate-300 dark:border-white/10 backdrop-blur-md"
              >
                Ver o produto em ação
              </a>
            </div>

            {/* Microcopy Oficial (Locked) */}
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start sm:items-center gap-2 pt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block shrink-0 mt-1 sm:mt-0 shadow-[0_0_6px_#34D399]" />
              <span className="leading-snug">15 minutos • Traga um processo da sua banca ou use nosso caso modelo.</span>
            </p>
          </div>

          {/* Métricas Operacionais Rolantes (Skiper 37) */}
          <div className="grid grid-cols-3 gap-2.5 pt-3 pb-1 border-t border-slate-200 dark:border-white/10">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
              <div className="text-lg sm:text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                <RollingCounter value={10412} suffix="+" />
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans leading-tight">Autos indexados</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
              <div className="text-lg sm:text-xl font-bold font-mono text-sky-600 dark:text-cyan-400">
                <RollingCounter value={8} prefix="< " suffix="s" />
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans leading-tight">Leitura por volume</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
              <div className="text-lg sm:text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                <RollingCounter value={0} />
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans leading-tight">Prazos perdidos</span>
            </div>
          </div>

          {/* Assinatura Institucional Oficial (Locked) */}
          <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-1">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Antes da peça, existe um caso inteiro.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              O Dendrix organiza. A IA apoia. O advogado decide.
            </p>
          </div>
        </div>

        {/* Coluna Direita: Split-Screen Real com Física de Scroll 3D */}
        <div className="lg:col-span-7 w-full">
          <ContainerScroll3D>
            <HeroSplitScreen />
          </ContainerScroll3D>
        </div>
      </div>
    </SectionWrapper>
  );
}
