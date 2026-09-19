"use client";

import React from "react";
import { Sparkles, ShieldCheck, Eye, Layers } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ProductCockpit } from "@/components/showcase/ProductCockpit";
import { InteractiveGridPattern } from "@/components/motion/InteractiveGridPattern";

export function CockpitSection() {
  return (
    <SectionWrapper
      id="cockpit"
      width="wide"
      spacing="spacious"
      className="bg-[#0B1520] text-slate-100 relative overflow-hidden border-t border-slate-800"
    >
      {/* Background Interactive Subtle Grid & Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <InteractiveGridPattern className="text-slate-700/30" />
      </div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider shadow-inner">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Experiência Operacional do Software</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
          O Cockpit Forense do Dendrix na Prática.
        </h2>

        <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
          Navegue pela interface real construída para a advocacia contenciosa. Do monitoramento diário à triagem de publicações e redação assistida com citação direta de folhas.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/70 text-xs text-slate-300 font-mono">
            <Eye className="w-3 h-3 text-emerald-400" />
            Tema Escuro & Claro
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/70 text-xs text-slate-300 font-mono">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            Assistente Jurídico IA
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/70 text-xs text-slate-300 font-mono">
            <Layers className="w-3 h-3 text-cyan-400" />
            Jurisprudência com Deduplicação
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/70 text-xs text-slate-300 font-mono">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            DJEN & OCR Automatizado
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/70 text-xs text-slate-300 font-mono">
            <Layers className="w-3 h-3 text-indigo-400" />
            Agenda & Tarefas por SLA
          </span>
        </div>
      </div>

      {/* Interactive Digital Twin Showcase */}
      <div className="relative z-10">
        <ProductCockpit />
      </div>

      {/* Footnote & Forensic Compliance Notice */}
      <div className="relative z-10 mt-8 text-center max-w-2xl mx-auto">
        <p className="text-xs text-slate-400 font-mono leading-relaxed">
          * Demonstração interativa programática baseada no layout de produção do Dendrix. Dados simulados e higienizados para preservação de sigilo profissional (art. 34, VII do CED-OAB).
        </p>
      </div>
    </SectionWrapper>
  );
}
