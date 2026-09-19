"use client";

import React from "react";
import { Sparkles, ShieldCheck, Eye, Layers } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ProductCockpit } from "@/components/showcase/ProductCockpit";
import { SmoothScrollSlider } from "@/components/showcase/SmoothScrollSlider";
import { InteractiveGridPattern } from "@/components/motion/InteractiveGridPattern";

export function CockpitSection() {
  return (
    <SectionWrapper
      id="cockpit"
      width="wide"
      spacing="spacious"
      className="bg-transparent text-slate-800 dark:text-slate-100 relative overflow-hidden border-t border-slate-200 dark:border-white/[0.08]"
    >
      {/* Background Interactive Grid & Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <InteractiveGridPattern className="text-slate-600/20" />
      </div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider shadow-[0_0_12px_rgba(16,185,129,0.15)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Experiência Operacional do Software</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
          O Cockpit do Dendrix na Prática.
        </h2>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
          Navegue pela interface real construída para a advocacia contenciosa. Do monitoramento diário à triagem de publicações e redação assistida com citação direta de folhas.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 font-mono shadow-xs">
            <Eye className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
            Tema Escuro & Claro
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 font-mono shadow-xs">
            <Sparkles className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
            Assistente Jurídico IA
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 font-mono shadow-xs">
            <Layers className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
            Jurisprudência com Deduplicação
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 font-mono shadow-xs">
            <ShieldCheck className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            DJEN & OCR Automatizado
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 font-mono shadow-xs">
            <Layers className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
            Agenda & Tarefas por SLA
          </span>
        </div>
      </div>

      {/* Interactive Digital Twin Showcase */}
      <div className="relative z-10">
        <ProductCockpit />
      </div>

      {/* Galeria de Peças e Evidências Reais (OriginKit Smooth Scroll Slider) */}
      <div className="relative z-10 mt-16 pt-12 border-t border-white/[0.08]">
        <SmoothScrollSlider />
      </div>

      {/* Footnote & Legal Compliance Notice */}
      <div className="relative z-10 mt-8 text-center max-w-2xl mx-auto">
        <p className="text-xs text-slate-400 font-mono leading-relaxed">
          * Demonstração interativa programática baseada no layout de produção do Dendrix. Dados simulados e higienizados para preservação de sigilo profissional (art. 34, VII do CED-OAB).
        </p>
      </div>
    </SectionWrapper>
  );
}
