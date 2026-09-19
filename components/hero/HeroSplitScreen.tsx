"use client";

import React, { useState, useEffect } from "react";
import { CaseSourceBadge } from "./CaseSourceBadge";
import { FileText, Sparkles, CheckCircle2, ArrowRight, Bold, Italic, List, Download } from "lucide-react";

export function HeroSplitScreen() {
  const [step, setStep] = useState(6); // Default to full state for instant render
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // If not reduced motion, run the progressive visual storyboard once
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mediaQuery.matches) {
      setStep(1);
      const t1 = setTimeout(() => setStep(2), 300);
      const t2 = setTimeout(() => setStep(3), 700);
      const t3 = setTimeout(() => setStep(4), 1100);
      const t4 = setTimeout(() => setStep(5), 1500);
      const t5 = setTimeout(() => setStep(6), 1900);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
      };
    }
  }, []);

  return (
    <div className="w-full relative rounded-xl border border-[#E2E8F0] bg-white shadow-card overflow-hidden">
      {/* Top Application Window Bar */}
      <div className="h-10 px-4 bg-[#F8F9FA] border-b border-[#E2E8F0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>
          <span className="text-slate-400 mx-2 text-xs">|</span>
          <span className="font-mono text-[11px] text-[#475569] truncate">
            Dendrix • Mesa Jurídica & Redator
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Contexto Vinculado</span>
        </div>
      </div>

      {/* Main Split Grid (PDF on Left, Editor on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] lg:min-h-[490px]">
        {/* ===================================================================
            PAINEL ESQUERDO: Leitor de Autos em PDF (Mesa Jurídica)
            =================================================================== */}
        <div className="lg:col-span-6 p-4 sm:p-5 bg-[#FAFAF9] border-b lg:border-b-0 lg:border-r border-[#E2E8F0] flex flex-col justify-between">
          <div className="space-y-3">
            {/* Document Sub-header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                <span className="font-mono text-xs font-semibold text-[#0F172A]">
                  Processo_1002341_Autos.pdf
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                Fls. 47 de 214
              </span>
            </div>

            {/* Judicial Document Simulation */}
            <div className="p-3 sm:p-4 bg-white rounded-md border border-slate-200 shadow-2xs font-serif text-[13px] sm:text-[13.5px] leading-relaxed text-slate-800 space-y-2.5">
              <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400 border-b border-slate-100 pb-1">
                Tribunal de Justiça • 2ª Vara Cível de Campinas
              </p>
              <p className="text-slate-600 line-clamp-2 sm:line-clamp-none">
                ...Alega a requerida, em sede de preliminar, a ausência de interesse de agir e a inocorrência de qualquer descumprimento contratual decorrente da prestação de serviços...
              </p>
              {/* Highlighted text with amber marker effect */}
              <div
                className={`p-2 rounded transition-all duration-300 ${
                  step >= 2
                    ? "bg-amber-100/90 text-amber-950 border-l-3 border-amber-600 font-medium"
                    : "bg-transparent text-slate-800"
                }`}
              >
                <p>
                  &ldquo;Contudo, o exame dos documentos revela que a parte ré não comprovou a entrega do laudo no prazo assinado, caracterizando mora incontroversa.&rdquo;
                </p>
              </div>
              <p className="text-slate-500 text-xs line-clamp-2">
                Requer-se, por conseguinte, a dilação probatória e a oitiva de testemunhas para elucidação dos pontos controvertidos fixados em despacho saneador...
              </p>
            </div>
          </div>

          {/* Source Tag Indicator */}
          <div className="pt-3 flex items-center justify-between border-t border-slate-200/80 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-[#475569]">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-[11px]">Trecho relevante mapeado pela IA</span>
            </div>
            <CaseSourceBadge page="47" documentType="Contestação" variant="amber" />
          </div>
        </div>

        {/* ===================================================================
            PAINEL DIREITO: Redator Jurídico (Tiptap Editor)
            =================================================================== */}
        <div className="lg:col-span-6 p-4 sm:p-5 bg-white flex flex-col justify-between">
          <div className="space-y-3">
            {/* Editor Sub-header & Toolbar */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0F2B48]" />
                <span className="font-mono text-xs font-semibold text-[#0F172A]">
                  Minuta_Replica.docx
                </span>
              </div>
              <div className="flex items-center gap-1 opacity-70">
                <div className="p-1 text-slate-600 rounded">
                  <Bold className="w-3.5 h-3.5" />
                </div>
                <div className="p-1 text-slate-600 rounded">
                  <Italic className="w-3.5 h-3.5" />
                </div>
                <div className="p-1 text-slate-600 rounded">
                  <List className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Context Breadcrumb from CRM */}
            <div className="bg-[#EDF2F7]/70 px-3 py-1.5 rounded-md border border-[#E2E8F0] flex items-center justify-between text-[11px] font-mono text-[#334155]">
              <span className="truncate">Proc. 1002341-89.2024 • Cliente: João Silva</span>
              <span className="text-[#0F2B48] font-semibold hidden sm:inline">2 Cliques</span>
            </div>

            {/* Rich Editor Streaming Output */}
            <div className="p-3 sm:p-4 rounded-md border border-slate-200 bg-white font-sans text-[13px] sm:text-[13.5px] leading-relaxed text-[#0F172A] space-y-3 min-h-[190px]">
              <div className="text-[11px] uppercase font-mono tracking-wider text-slate-400 border-b border-slate-100 pb-1 flex justify-between items-center">
                <span>Peça em Redação • Réplica à Contestação</span>
                <span className="text-emerald-700 font-semibold lowercase text-[10px]">● streaming ativo</span>
              </div>

              <p className="font-medium text-[#0F172A]">
                DOS FATOS E DA MORA INCONTROVERSA
              </p>

              <p className="text-slate-700">
                Em atenção à defesa genérica apresentada, cumpre destacar que, conforme expressamente comprovado nos autos às{" "}
                <CaseSourceBadge page="47" documentType="Contestação" variant="emerald" className="mx-1 align-baseline" />
                , a parte requerida não cumpriu a obrigação no termo ajustado.
              </p>

              <p className={`text-slate-700 transition-opacity duration-300 ${step >= 5 ? "opacity-100" : "opacity-0"}`}>
                Resta desprovida de lastro factual a preliminar suscitada, devendo prosseguir a demanda com o julgamento antecipado do mérito...
                <span className="inline-block w-1.5 h-4 bg-[#0F2B48] ml-1 align-middle animate-pulse" />
              </p>
            </div>
          </div>

          {/* Grounding Confirmation Footer */}
          <div className="pt-3 flex items-center justify-between border-t border-slate-200/80 mt-2 text-xs">
            <span className="text-[11px] text-slate-500 font-mono">
              Origem vinculada: Fls. 47
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0F2B48]">
              Pronto para revisão humana
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
