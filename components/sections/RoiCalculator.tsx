"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, Info } from "lucide-react";

// Feature flag: permanece desativado na renderização pública até validação formal das premissas
export const SHOW_CALCULATOR = false;

interface RoiCalculatorProps {
  onOpenDemo?: () => void;
}

export function RoiCalculator({ onOpenDemo }: RoiCalculatorProps) {
  const [activeCases, setActiveCases] = useState<number>(150);
  const [teamSize, setTeamSize] = useState<number>(3);

  // Fórmula conforme ROI_CALCULATOR_SPEC.md:
  // Horas_Base = activeCases * 0.40 * 0.40
  // Horas_Maximas = teamSize * 35
  const hoursBase = activeCases * 0.4 * 0.4;
  const hoursMax = teamSize * 35;
  const estimatedHours = Math.round(Math.min(hoursBase, hoursMax));
  const equivalentDays = (estimatedHours / 8).toFixed(1);

  if (!SHOW_CALCULATOR) {
    return null;
  }

  return (
    <div id="calculadora" className="w-full space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0F2B48]">
          Estimativa de Impacto na Rotina
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#0F172A] leading-tight text-balance">
          Estime quanto tempo operacional sua banca pode recuperar.
        </h2>
        <p className="text-base text-[#475569] leading-relaxed max-w-2xl mx-auto">
          Simulação interativa baseada em parâmetros operacionais de leitura de autos, triagem de publicações e elaboração de minutas.
        </p>
      </div>

      {/* Interactive Card */}
      <div className="max-w-4xl mx-auto rounded-xl border border-[#E2E8F0] bg-white shadow-card overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E8F0]">
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-8 bg-[#FAFAF9]">
            {/* Control 1: Active cases */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="active-cases-slider" className="text-sm font-semibold text-[#0F172A]">
                  Processos ativos no escritório
                </label>
                <span className="font-mono text-sm font-bold text-[#0F2B48] bg-white px-2.5 py-1 rounded border border-[#CBD5E1]">
                  {activeCases} processos
                </span>
              </div>
              <input
                id="active-cases-slider"
                type="range"
                min={30}
                max={600}
                step={10}
                value={activeCases}
                onChange={(e) => setActiveCases(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0F2B48]"
                aria-label="Processos ativos no escritório"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>30</span>
                <span>300</span>
                <span>600+</span>
              </div>
            </div>

            {/* Control 2: Team Size */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-[#0F172A]">
                  Profissionais na produção jurídica
                </label>
                <span className="font-mono text-sm font-bold text-[#0F2B48] bg-white px-2.5 py-1 rounded border border-[#CBD5E1]">
                  {teamSize} {teamSize === 1 ? "profissional" : "profissionais"}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 5, 8].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setTeamSize(size)}
                    className={`py-2 text-xs font-mono font-semibold rounded-md border transition-all cursor-pointer ${
                      teamSize === size
                        ? "bg-[#0F2B48] text-white border-[#0F2B48]"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {size === 8 ? "8+" : size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Column (Right) */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-white flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#64748B] uppercase tracking-wider">
                <Calculator className="w-4 h-4 text-[#0F2B48]" />
                <span>Estimativa Indicativa</span>
              </div>

              <div className="space-y-1">
                <div className="font-serif text-4xl sm:text-5xl font-medium text-[#0F2B48] tracking-tight">
                  ~{estimatedHours}h
                </div>
                <p className="text-xs font-mono text-slate-500">
                  recuperadas por mês (~{equivalentDays} dias úteis)
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tempo que pode ser redirecionado de tarefas manuais de leitura de autos e minutas básicas para audiências, atendimento e estratégia forense.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenDemo}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-[#0F2B48] hover:bg-[#0A1C30] rounded-md transition-colors shadow-xs cursor-pointer focus-ring"
            >
              <span>Agendar para avaliar sua banca</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Methodological Disclaimer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p>
            Os valores apresentados constituem estimativas baseadas em parâmetros médios de leitura e digitação forense. Os ganhos reais variam conforme a complexidade do acervo e a rotina de cada escritório. Metodologia apresentada na sessão técnica de 15 minutos.
          </p>
        </div>
      </div>
    </div>
  );
}
