import React from "react";
import { CaseSourceBadge } from "../hero/CaseSourceBadge";
import { ScanText, Clock, FileCheck2, AlertCircle } from "lucide-react";

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
    <div id="recursos" className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Copy & Feature Highlights */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="space-y-2">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0F2B48]">
              Pilar 01 • Mesa Jurídica
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#0F172A] leading-tight text-balance">
              Transforme autos volumosos em um mapa claro de fatos e contradições.
            </h2>
          </div>

          <p className="text-base text-[#475569] leading-relaxed">
            Faça o upload do processo em PDF e receba uma visão estruturada da controvérsia. O Dendrix analisa os documentos, localiza argumentos relevantes e indica as folhas de onde as informações foram extraídas.
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

        {/* Right Column: Macro-recorte da Mesa Jurídica */}
        <div className="lg:col-span-6 w-full">
          <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-card overflow-hidden">
            {/* Header */}
            <div className="h-9 px-4 bg-[#F8F9FA] border-b border-[#E2E8F0] flex items-center justify-between text-xs font-mono text-[#475569]">
              <span className="truncate">Mesa Jurídica • Análise de Autos em PDF</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                  Dados demonstrativos
                </span>
                <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  OCR Ativo
                </span>
              </div>
            </div>

            {/* Document Analysis Body */}
            <div className="p-5 space-y-4 bg-slate-50/50">
              <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-semibold text-[#0F172A]">
                    Contradição Mapeada na Contestação
                  </span>
                  <CaseSourceBadge page="89" documentType="Laudo Pericial" variant="amber" />
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  A ré afirma às fls. 47 não ter recebido notificação prévia de vistoria. Todavia, às <strong className="text-[#0F172A]">fls. 89</strong>, consta Aviso de Recebimento (AR) assinado em 12/03/2024 com autenticação postal correspondente.
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Relevância: Alta • Preliminar superada</span>
                  <span className="text-[#0F2B48] font-medium">Usar na Réplica →</span>
                </div>
              </div>

              {/* Second Extracted Card */}
              <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-semibold text-[#0F172A]">
                    Tese Principal do Autor x Prova Documental
                  </span>
                  <CaseSourceBadge page="112" documentType="Contrato" variant="emerald" />
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Cláusula 4ª, parágrafo segundo: fixação expressa de multa moratória de 10% em caso de atraso na entrega da obra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
