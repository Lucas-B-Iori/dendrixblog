"use client";

import React, { useState, useEffect } from "react";
import { CaseSourceBadge } from "./CaseSourceBadge";
import { FileText, Sparkles, CheckCircle2, ArrowRight, Bold, Italic, List, Shield, Link2 } from "lucide-react";

export function HeroSplitScreen() {
  // Initial state: 6 if reduced motion or SSR, otherwise animated through 1..6
  const [step, setStep] = useState(6);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mediaQuery.matches) {
      setStep(1);
      const t1 = setTimeout(() => setStep(2), 500);  // 0.5s: Grifo amarelo no PDF
      const t2 = setTimeout(() => setStep(3), 1100); // 1.1s: Badge [Fls. 47] acende no PDF
      const t3 = setTimeout(() => setStep(4), 1700); // 1.7s: Barra CRM conecta dados
      const t4 = setTimeout(() => setStep(5), 2300); // 2.3s: Editor acende e inicia streaming
      const t5 = setTimeout(() => setStep(6), 3000); // 3.0s: Minuta concluída com citação

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
      {/* Top Web Application Header (Fiel à arquitetura web do Dendrix, sem molduras fictícias de macOS) */}
      <div className="h-10 px-4 bg-[#F8F9FA] border-b border-[#E2E8F0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#0F2B48]" />
          <span className="font-mono text-xs font-semibold text-[#0F2B48]">
            Dendrix CRM
          </span>
          <span className="text-slate-300 text-xs">/</span>
          <span className="font-mono text-[11px] text-[#64748B] truncate">
            Processo 1002341-89.2024.8.26.0100
          </span>
          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200 hidden sm:inline-block">
            Dados demonstrativos
          </span>
        </div>

        {/* Dynamic Connection Indicator (Estado 4+) */}
        <div
          className={`flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded transition-all duration-300 ${
            step >= 4
              ? "text-emerald-800 bg-emerald-50 border border-emerald-200/80"
              : "text-slate-400 bg-slate-100 border border-slate-200/60"
          }`}
        >
          <Link2 className={`w-3 h-3 ${step >= 4 ? "text-emerald-600" : "text-slate-400"}`} />
          <span>{step >= 4 ? "Dados dos Autos Conectados ao CRM" : "Sincronizando Autos..."}</span>
        </div>
      </div>

      {/* Main Split-Screen Grid (PDF à Esquerda vs Editor à Direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] lg:min-h-[490px]">
        {/* ===================================================================
            PAINEL ESQUERDO: Leitor de Autos em PDF (Mesa Jurídica)
            =================================================================== */}
        <div
          className={`lg:col-span-6 p-4 sm:p-5 bg-[#FAFAF9] border-b lg:border-b-0 lg:border-r border-[#E2E8F0] flex flex-col justify-between transition-opacity duration-300 ${
            step >= 1 ? "opacity-100" : "opacity-40"
          }`}
        >
          <div className="space-y-3">
            {/* Document Sub-header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0F2B48]" />
                <span className="font-mono text-xs font-semibold text-[#0F172A]">
                  Processo_1002341_Autos.pdf
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                Página 47 de 214
              </span>
            </div>

            {/* Judicial Document Simulation */}
            <div className="p-3 sm:p-4 bg-white rounded-md border border-slate-200 shadow-2xs font-serif text-[13px] sm:text-[13.5px] leading-relaxed text-slate-800 space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1 text-[10px] uppercase font-mono tracking-wider text-slate-400">
                <span>2ª Vara Cível de Campinas</span>
                <span>Fls. 47</span>
              </div>

              <p className="text-slate-600 line-clamp-2 sm:line-clamp-none">
                ...Alega a requerida, em sede de contestação, a ausência de interesse de agir e a inocorrência de qualquer inadimplemento contratual relativo à obrigação de fazer...
              </p>

              {/* Highlighted text (Estado 2+) */}
              <div
                className={`p-2 rounded transition-all duration-500 ${
                  step >= 2
                    ? "bg-amber-100/90 text-amber-950 font-medium border border-amber-300/60 shadow-2xs"
                    : "bg-transparent text-slate-600 border border-transparent"
                }`}
              >
                <p>
                  &ldquo;Contudo, o exame dos autos revela que a parte ré não comprovou a entrega do laudo técnico no prazo assinado pelo juízo, incorrendo em mora manifesta.&rdquo;
                </p>
              </div>

              <p className="text-slate-500 text-xs line-clamp-2">
                Pugna-se, desse modo, pelo indeferimento do pleito preliminar e pelo prosseguimento do feito com a fixação de pontos controvertidos...
              </p>
            </div>
          </div>

          {/* Source Tag Indicator (Estado 3+ acende com pulso e borda nítida) */}
          <div className="pt-3 flex items-center justify-between border-t border-slate-200/80 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-[#475569]">
              <span
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  step >= 3 ? "bg-amber-500 animate-pulse" : "bg-slate-300"
                }`}
              />
              <span className="text-[11px] font-mono">
                {step >= 3 ? "Fato relevante indexado" : "Aguardando leitura..."}
              </span>
            </div>

            <div
              className={`transition-all duration-300 ${
                step >= 3
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-30 grayscale"
              }`}
            >
              <CaseSourceBadge page="47" documentType="Contestação" variant="amber" />
            </div>
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

            {/* Context Breadcrumb from CRM (Estado 4+ acende em verde/marinho) */}
            <div
              className={`px-3 py-1.5 rounded-md border text-[11px] font-mono flex items-center justify-between transition-all duration-300 ${
                step >= 4
                  ? "bg-[#EDF2F7] border-[#CBD5E1] text-[#0F2B48] font-semibold"
                  : "bg-slate-50 border-slate-200 text-slate-400"
              }`}
            >
              <span className="truncate">Cliente: João Silva • Ação de Cobrança</span>
              <span className="text-xs">Contexto CRM</span>
            </div>

            {/* Rich Editor Output (Estados 5 e 6) */}
            <div
              className={`p-3 sm:p-4 rounded-md border bg-white font-sans text-[13px] sm:text-[13.5px] leading-relaxed text-[#0F172A] space-y-3 min-h-[190px] transition-all duration-300 ${
                step >= 5 ? "border-slate-300 shadow-2xs" : "border-slate-100 opacity-60"
              }`}
            >
              <div className="text-[11px] uppercase font-mono tracking-wider text-slate-400 border-b border-slate-100 pb-1 flex justify-between items-center">
                <span>Réplica à Contestação</span>
                <span
                  className={`text-[10px] font-mono font-medium transition-colors ${
                    step === 5
                      ? "text-emerald-700 animate-pulse"
                      : step === 6
                      ? "text-emerald-800 font-semibold"
                      : "text-slate-400"
                  }`}
                >
                  {step === 5 ? "● gerando minuta..." : step === 6 ? "✓ minuta pronta" : "aguardando"}
                </span>
              </div>

              <p className="font-medium text-[#0F172A]">
                DOS FATOS E DA MORA INCONTROVERSA
              </p>

              {/* Parágrafo 1 com citação forense (surge no Estado 5) */}
              <p
                className={`text-slate-700 transition-opacity duration-400 ${
                  step >= 5 ? "opacity-100" : "opacity-0"
                }`}
              >
                Em atenção à contestação apresentada, cumpre destacar que, conforme comprovado às{" "}
                <CaseSourceBadge page="47" documentType="Contestação" variant="emerald" className="mx-1 align-baseline" />
                , a parte ré não comprovou a entrega tempestiva do laudo, caracterizando mora incontroversa.
              </p>

              {/* Parágrafo 2 conclusivo (surge no Estado 6) */}
              <p
                className={`text-slate-700 transition-opacity duration-400 ${
                  step >= 6 ? "opacity-100" : "opacity-0"
                }`}
              >
                Resta desprovida de lastro factual a preliminar suscitada, devendo o feito prosseguir regularmente para o julgamento dos pedidos...
                {step === 6 && (
                  <span className="inline-block w-1.5 h-4 bg-[#0F2B48] ml-1 align-middle animate-pulse" />
                )}
              </p>
            </div>
          </div>

          {/* Grounding Confirmation Footer (Estado 6 ativa confirmação de validação humana) */}
          <div className="pt-3 flex items-center justify-between border-t border-slate-200/80 mt-2 text-xs">
            <span className="text-[11px] text-slate-500 font-mono">
              Origem vinculada: Fls. 47
            </span>

            <div
              className={`inline-flex items-center gap-1.5 text-[11px] font-medium transition-all duration-300 ${
                step >= 6 ? "text-emerald-700 font-semibold" : "text-slate-400"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{step >= 6 ? "Pronto para revisão do advogado" : "Processando..."}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
