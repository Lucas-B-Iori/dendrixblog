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
    <SectionWrapper className="border-t border-slate-200 dark:border-white/[0.08] bg-transparent" spacing="default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Left Column: Macro-recorte do Redator (Inverted layout) */}
        <div className="lg:col-span-6 w-full order-2 lg:order-1">
          <div className="relative rounded-2xl border border-white/10 bg-[#09121B] shadow-2xl overflow-hidden backdrop-blur-xl">
            <BorderBeam size={180} duration={8} colorFrom="#0284C7" colorTo="#10B981" borderWidth={2} />
            {/* Header */}
            <div className="h-10 px-4 bg-black/40 border-b border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="truncate">Redator Jurídico • Réplica_Civil_V2.docx</span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-400 bg-white/[0.05] px-2 py-0.5 rounded border border-white/10 hidden sm:inline-block">
                  Dados demonstrativos
                </span>
                <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-semibold">
                  Peça Ouro
                </span>
              </div>
            </div>

            {/* Document Draft Body */}
            <div className="p-5 sm:p-7 space-y-4 font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
              <div className="border-b border-white/[0.08] pb-3 space-y-1 font-mono text-[11px] text-slate-400">
                <p>EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DE DIREITO DA 2ª VARA CÍVEL</p>
                <p>PROCESSO Nº 1002341-89.2024.8.26.0100</p>
              </div>

              <div className="space-y-2.5">
                <p className="font-semibold text-white text-xs uppercase tracking-wide">
                  1. Da Refutação à Preliminar de Ilegitimidade
                </p>
                <p className="text-slate-300">
                  Diferentemente do que sustenta a parte contrária, os documentos anexados aos autos demonstram com clareza a cadeia de responsabilidade civil. Conforme se observa às{" "}
                  <CaseSourceBadge page="89" documentType="Laudo Pericial" variant="emerald" className="inline-flex align-baseline" />, a notificação prévia foi devidamente recebida e assinada pelo preposto da ré.
                </p>
                <p className="text-slate-300">
                  Ademais, resta incontroversa a aplicação da multa moratória prevista na cláusula contratual expressa às{" "}
                  <CaseSourceBadge page="112" documentType="Contrato" variant="amber" className="inline-flex align-baseline" />.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Base legal verificada: Art. 397 do Código Civil • Súmula 54 STJ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Copy */}
        <div className="lg:col-span-6 space-y-6 text-left order-1 lg:order-2">
          <div className="space-y-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Pilar 02 • Redator Jurídico
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-900 dark:text-white leading-tight text-balance">
              Minutas estruturadas sem folha em branco, com base direta nas informações do processo.
            </h2>
          </div>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            A petição nasce estruturada a partir dos dados da ficha do processo e dos fatos apontados nos autos. Você não perde tempo formatando preâmbulos ou caçando dados cadastrais.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#0B131C] border border-slate-200 dark:border-white/10 space-y-2 shadow-xs hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
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
