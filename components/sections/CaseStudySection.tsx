import React from "react";

// Feature flag: permanece desativado na renderização pública até que dados reais sejam homologados
export const SHOW_CASE_STUDY = false;

export function CaseStudySection() {
  if (!SHOW_CASE_STUDY) {
    return null;
  }

  return (
    <div className="w-full space-y-10">
      <div className="text-left space-y-2">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0F2B48]">
          Demonstração Documentada
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#0F172A] leading-tight">
          Como o Dendrix processa um processo judicial na prática.
        </h2>
        <p className="text-base text-[#475569] max-w-2xl">
          Estrutura de análise real comparando o documento de entrada e o resultado gerado pelo sistema, preservando integralmente o sigilo profissional.
        </p>
      </div>

      <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-card overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E2E8F0]">
          {/* Entrada */}
          <div className="p-6 sm:p-8 space-y-4 bg-[#FAFAF9]">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
              Entrada (Autos Judiciais em PDF)
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li>• [CASO REAL A SER INSERIDO]</li>
              <li>• [NÚMERO REAL DE PÁGINAS EM PDF]</li>
              <li>• [PEÇA OU CONTROVÉRSIA DO PROCESSO]</li>
              <li>• [STATUS PROCESSUAL DE ENTRADA]</li>
            </ul>
          </div>

          {/* Saída */}
          <div className="p-6 sm:p-8 space-y-4 bg-white">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#0F2B48]">
              Saída (Análise do Dendrix)
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li>• [ACHADO REAL 1: MAPEAMENTO FÁTICO]</li>
              <li>• [ACHADO REAL 2: CONTRADIÇÃO / PONTO RELEVANTE]</li>
              <li>• [REFERÊNCIA REAL DE PÁGINA: FLS. X]</li>
              <li>• [MINUTA GERADA COM LASTRO EM FLS. X]</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
