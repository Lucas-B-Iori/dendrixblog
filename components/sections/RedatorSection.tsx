import React from "react";
import { CaseSourceBadge } from "../hero/CaseSourceBadge";
import { Award, Layers, Sparkles, FileText, CheckCircle2 } from "lucide-react";

interface RedatorSectionProps {
  onOpenDemo?: () => void;
}

export function RedatorSection({ onOpenDemo }: RedatorSectionProps = {}) {
  const features = [
    {
      icon: Award,
      title: "Treinamento em Peças de Alta Técnica",
      description: "Minutas estruturadas segundo os padrões formais e a técnica processual do direito brasileiro.",
    },
    {
      icon: Layers,
      title: "Preenchimento Direto pelo CRM",
      description: "Endereçamento, qualificação das partes, número CNJ e fatos importados sem cópia manual.",
    },
    {
      icon: Sparkles,
      title: "Construção Estruturada por Blocos",
      description: "Geração assistida organizada por capítulos: Fatos, Fundamentação Jurídica, Tutela e Pedidos.",
    },
    {
      icon: FileText,
      title: "Editor Rico Integrado (Tiptap)",
      description: "Total liberdade para editar teses, incluir precedentes da sua banca e exportar para Word (.docx) ou PDF.",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Macro-recorte do Redator (Inverted layout) */}
        <div className="lg:col-span-6 w-full order-2 lg:order-1">
          <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-card overflow-hidden">
            {/* Header */}
            <div className="h-9 px-4 bg-[#F8F9FA] border-b border-[#E2E8F0] flex items-center justify-between text-xs font-mono text-[#475569]">
              <span className="truncate">Redator Forense • Réplica_Civil_V2.docx</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                  Dados demonstrativos
                </span>
                <span className="text-[11px] text-[#0F2B48] bg-[#EDF2F7] px-2 py-0.5 rounded font-semibold">
                  Peça Ouro
                </span>
              </div>
            </div>

            {/* Document Draft Body */}
            <div className="p-5 sm:p-6 space-y-4 font-sans text-xs sm:text-sm text-slate-800 leading-relaxed">
              <div className="border-b border-slate-100 pb-3 space-y-1 font-mono text-[11px] text-slate-500">
                <p>EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA 2ª VARA CÍVEL</p>
                <p>PROCESSO Nº 1002341-89.2024.8.26.0100</p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-[#0F172A] text-xs uppercase tracking-wide">
                  1. Da Refutação à Preliminar de Ilegitimidade
                </p>
                <p className="text-slate-700">
                  Diferentemente do que sustenta a parte contrária, os documentos anexados aos autos demonstram com clareza a cadeia de responsabilidade civil. Conforme se observa às{" "}
                  <CaseSourceBadge page="89" documentType="Laudo Pericial" variant="emerald" className="mx-1" />
                  , a notificação prévia foi devidamente recebida e assinada pelo preposto da ré.
                </p>
                <p className="text-slate-700">
                  Ademais, resta incontroversa a aplicação da multa moratória prevista na cláusula contratual expressa às{" "}
                  <CaseSourceBadge page="112" documentType="Contrato" variant="amber" className="mx-1" />
                  .
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-emerald-800 bg-emerald-50/70 p-2.5 rounded border border-emerald-200/50">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Dados de partes e prazos validados diretamente pelo CRM Dendrix.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Copy */}
        <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-2">
          <div className="space-y-2">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0F2B48]">
              Pilar 02 • Redator Jurídico
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#0F172A] leading-tight text-balance">
              Minutas estruturadas sem folha em branco, com base direta nas informações do processo.
            </h2>
          </div>

          <p className="text-base text-[#475569] leading-relaxed">
            A petição nasce estruturada a partir dos dados da ficha do processo e dos fatos apontados nos autos. Você não perde tempo formatando preâmbulos ou caçando dados cadastrais.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-3.5 rounded-lg bg-white border border-[#E2E8F0] space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#0F2B48]" />
                    <h4 className="text-xs font-semibold text-[#0F172A]">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
