import React from "react";
import { CaseSourceBadge } from "../hero/CaseSourceBadge";
import { ScanText, Clock, FileCheck2, AlertCircle } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SpotlightFrames } from "@/components/showcase/SpotlightFrames";

interface MesaJuridicaSectionProps {
  onOpenDemo?: () => void;
}

export function MesaJuridicaSection({ onOpenDemo }: MesaJuridicaSectionProps = {}) {
  const features = [
    {
      icon: ScanText,
      title: "OCR Integrado para Autos Escaneados",
      description: "Processamento óptico de caracteres para digitalizações legadas que não possuem camada de texto pesquisável.",
    },
    {
      icon: Clock,
      title: "Mapeamento Cronológico do Litígio",
      description: "Organização temporal dos fatos narrados pelas partes e dos atos processuais em ordem estrita.",
    },
    {
      icon: FileCheck2,
      title: "Referência Visível da Folha dos Autos",
      description: "Apontamento da página correspondente no PDF (ex: [Fls. 89 - Laudo Pericial]), facilitando a validação humana.",
    },
    {
      icon: AlertCircle,
      title: "Identificação de Divergências Fáticas",
      description: "Auxílio na localização de disparidades entre teses alegadas pela parte contrária e documentos dos autos.",
    },
  ];

  return (
    <SectionWrapper id="recursos" className="border-t border-slate-200 dark:border-white/[0.08] bg-transparent" spacing="default">
      {/* Bloco Superior: Acordeão de Lâminas Jurídicas (OriginKit Spotlight Frames) */}
      <div className="mb-16">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full inline-block">
            Mesa de Trabalho Jurídica
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-900 dark:text-white leading-tight">
            Os 4 Pilares da Engenharia Jurídica do Dendrix
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Passe o cursor sobre cada lâmina para inspecionar a arquitetura de leitura, redação, tempestividade e governança.
          </p>
        </div>

        <SpotlightFrames />
      </div>

      {/* Bloco Inferior: Detalhamento do Pilar 01 (Mesa Jurídica & Raio-X) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center pt-8 border-t border-slate-200 dark:border-white/[0.08]">
        {/* Coluna Esquerda: Copy & Destaques de Recursos */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="space-y-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Pilar 01 • Mesa Jurídica
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-900 dark:text-white leading-tight text-balance">
              Transforme autos volumosos em um mapa claro de fatos e contradições.
            </h3>
          </div>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Faça o upload do processo em PDF e receba uma visão estruturada da controvérsia. O Dendrix analisa os documentos, localiza argumentos relevantes e indica as folhas de onde as informações foram extraídas.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#0B131C] border border-slate-200 dark:border-white/10 space-y-2 shadow-sm hover:border-emerald-500/30 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coluna Direita: Macro-recorte da Mesa Jurídica com Design Escuro */}
        <div className="lg:col-span-6 w-full">
          <div className="rounded-2xl border border-white/10 bg-[#09121B] shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Header */}
            <div className="h-10 px-4 bg-black/40 border-b border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="truncate">Mesa Jurídica • Análise de Autos em PDF</span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-400 bg-white/[0.05] px-2 py-0.5 rounded border border-white/10 hidden sm:inline-block">
                  Dados demonstrativos
                </span>
                <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 font-medium">
                  OCR Ativo
                </span>
              </div>
            </div>

            {/* Document Analysis Body */}
            <div className="p-5 sm:p-6 space-y-4 bg-[#070D14]/80">
              <div className="p-4 sm:p-5 bg-[#0B1520] rounded-xl border border-white/10 space-y-3 shadow-md">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                  <span className="text-xs font-semibold text-white">
                    Contradição Mapeada na Contestação
                  </span>
                  <CaseSourceBadge page="89" documentType="Laudo Pericial" variant="amber" />
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A ré afirma às fls. 47 não ter recebido notificação prévia de vistoria. Todavia, às <strong className="text-emerald-300">fls. 89</strong>, consta Aviso de Recebimento (AR) assinado em 12/03/2024 com autenticação postal correspondente.
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Relevância: Alta • Preliminar superada</span>
                  <span className="text-emerald-400 font-semibold hover:underline cursor-pointer">Usar na Réplica →</span>
                </div>
              </div>

              {/* Second Extracted Card */}
              <div className="p-4 sm:p-5 bg-[#0B1520] rounded-xl border border-white/10 space-y-2.5 shadow-md">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                  <span className="text-xs font-semibold text-white">
                    Tese Principal do Autor x Prova Documental
                  </span>
                  <CaseSourceBadge page="112" documentType="Contrato" variant="emerald" />
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Cláusula 4ª, parágrafo segundo: fixação expressa de multa moratória de 10% em caso de atraso na entrega da obra.
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Relevância: Essencial • Cláusula Contratual</span>
                  <span className="text-emerald-400 font-semibold hover:underline cursor-pointer">Usar na Minuta →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
