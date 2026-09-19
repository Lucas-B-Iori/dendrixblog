import React from "react";
import { CaseSourceBadge } from "../hero/CaseSourceBadge";
import { Award, Layers, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { BorderBeam } from "@/components/motion/BorderBeam";

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
    <SectionWrapper className="border-t border-[#E2E8F0]/70 bg-[#F4F4F2]/40" spacing="default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Left Column: Macro-recorte do Redator (Inverted layout) */}
        <div className="lg:col-span-6 w-full order-2 lg:order-1">
          <div className="relative rounded-2xl border border-[#E2E8F0] bg-white shadow-card overflow-hidden">
            <BorderBeam size={180} duration={8} colorFrom="#0F2B48" colorTo="#10B981" borderWidth={2} />
            {/* Header */}
            <div className="h-10 px-4 bg-[#F8F9FA] border-b border-[#E2E8F0] flex items-center justify-between text-xs font-mono text-[#475569]">
              <span className="truncate">Redator Forense • Réplica_Civil_V2.docx</span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 hidden sm:inline-block">
                  Dados demonstrativos
                </span>
                <span className="text-[11px] text-[#0F2B48] bg-[#EDF2F7] px-2.5 py-0.5 rounded font-semibold">
                  Peça Ouro
                </span>
              </div>
            </div>

            {/* Document Draft Body */}
            <div className="p-5 sm:p-7 space-y-4 font-sans text-xs sm:text-sm text-slate-800 leading-relaxed">
              <div className="border-b border-slate-100 pb-3 space-y-1 font-mono text-[11px] text-slate-500">
                <p>EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA 2ª VARA CÍVEL</p>
                <p>PROCESSO Nº 1002341-89.2024.8.26.0100</p>
              </div>

              <div className="space-y-2.5">
                <p className="font-semibold text-[#0F172A] text-xs uppercase tracking-wide">
                  1. Da Refutação à Preliminar de Ilegitimidade
                </p>
                <p className="text-slate-700">
                  Diferentemente do que sustenta a parte contrária, os documentos anexados aos autos demonstram com clareza a cadeia de responsabilidade civil. Conforme se observa às{" "}
                  <CaseSourceBadge page="89" documentType="Laudo Pericial" variant="emerald" className="inline-flex align-baseline" />, a notificação prévia foi devidamente recebida e assinada pelo preposto da ré.
                </p>
                <p className="text-slate-700">
                  Ademais, resta incontroversa a aplicação da multa moratória prevista na cláusula contratual expressa às{" "}
                  <CaseSourceBadge page="112" documentType="Contrato" variant="amber" className="inline-flex align-baseline" />.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-emerald-800 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dados de partes e prazos validados diretamente pelo CRM Dendrix.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Copy */}
        <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-2">
          <div className="space-y-3">
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
                <div key={idx} className="p-4 sm:p-5 rounded-xl bg-white border border-[#E2E8F0] space-y-2 shadow-xs hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-[#EDF2F7] text-[#0F2B48]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-semibold text-[#0F172A]">
                      {item.title}
                    </h3>
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
    </SectionWrapper>
  );
}
