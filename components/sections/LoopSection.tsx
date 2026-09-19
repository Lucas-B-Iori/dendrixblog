import React from "react";
import { Database, FileSearch, PenTool, ArrowRight } from "lucide-react";

export function LoopSection() {
  const steps = [
    {
      number: "01",
      category: "GESTÃO FORENSE",
      title: "Processo, cliente e prazos organizados.",
      description:
        "A ficha do processo reúne partes, comarca, valor da causa, andamentos e contagem regressiva de prazos em tempo real, sem necessidade de planilhas paralelas.",
      icon: Database,
      badgeText: "CRM Operacional",
    },
    {
      number: "02",
      category: "LEITURA DOCUMENTAL",
      title: "Leitura analítica de PDFs com referência de página.",
      description:
        "O sistema processa autos nativos e escaneados, mapeia a cronologia e localiza pontos relevantes mantendo a folha de origem visível para conferência.",
      icon: FileSearch,
      badgeText: "Mesa Jurídica & OCR",
    },
    {
      number: "03",
      category: "REDAÇÃO ASSISTIDA",
      title: "Minutas estruturadas a partir do contexto real.",
      description:
        "O editor utiliza os dados cadastrados no CRM e os fatos levantados nos autos para auxiliar na redação da minuta. O advogado revisa, ajusta teses e decide a versão final.",
      icon: PenTool,
      badgeText: "Redator & Peças Ouro",
    },
  ];

  return (
    <div id="como-funciona" className="w-full space-y-12 sm:space-y-16 scroll-mt-20">
      {/* Centered Header for Architectural Shift */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0F2B48]">
          O Fluxo Contínuo do Processo
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#0F172A] leading-tight text-balance">
          O trabalho jurídico e a inteligência do caso no mesmo ambiente.
        </h2>
        <p className="text-base text-[#475569] leading-relaxed max-w-2xl mx-auto">
          O Dendrix integra a rotina da banca à análise dos autos. A ficha do processo, os prazos e os documentos em PDF alimentam diretamente o assistente e o editor de redação.
        </p>
      </div>

      {/* Connected 3-Stage Track */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="relative p-6 sm:p-7 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all group"
            >
              <div className="space-y-4">
                {/* Header Step Indicator */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#0F2B48] px-2 py-0.5 rounded bg-[#EDF2F7]">
                    {step.number} • {step.category}
                  </span>
                  <div className="p-2 rounded-md bg-slate-50 text-slate-700 group-hover:bg-[#0F2B48] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-[#0F172A] leading-snug">
                  {step.title}
                </h3>

                <p className="text-sm text-[#475569] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Sub-badge */}
              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>{step.badgeText}</span>
                {idx < 2 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 hidden md:inline-block" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
