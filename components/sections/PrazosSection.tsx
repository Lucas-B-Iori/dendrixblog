import React from "react";
import { Newspaper, BellRing, CalendarClock, DollarSign, ArrowRight, Bot } from "lucide-react";

export function PrazosSection() {
  const modules = [
    {
      icon: Newspaper,
      title: "Acompanhamento Nacional de Publicações",
      description: "Varredura automática por OAB nos Diários de Justiça Eletrônicos (DJEN e diários estaduais e federais homologados).",
    },
    {
      icon: BellRing,
      title: "Sugestão de Providência Processual",
      description: "Leitura automática do despacho com indicação do ato processual cabível e prazo sugerido para conferência.",
    },
    {
      icon: CalendarClock,
      title: "Contagem Regressiva de Prazos",
      description: "Painel cronológico com alertas visuais de proximidade, separando claramente prazos fatais de audiências.",
    },
    {
      icon: DollarSign,
      title: "Gestão de Honorários e Projetos",
      description: "Controle de contratos, divisão entre honorários contratuais e êxito, e acompanhamento de projetos consultivos.",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Copy */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="space-y-2">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0F2B48]">
              Pilar 03 • Rotina Forense e Prazos
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#0F172A] leading-tight text-balance">
              Publicações monitoradas com sugestão do próximo passo processual.
            </h2>
          </div>

          <p className="text-base text-[#475569] leading-relaxed">
            O Dendrix acompanha as intimações do seu escritório nos diários oficiais, interpreta o teor do despacho e auxilia no controle dos prazos da sua equipe.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {modules.map((item, idx) => {
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

        {/* Right Column: Macro-recorte da Publicação com IA */}
        <div className="lg:col-span-6 w-full">
          <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-card overflow-hidden">
            {/* Header */}
            <div className="h-9 px-4 bg-[#F8F9FA] border-b border-[#E2E8F0] flex items-center justify-between text-xs font-mono text-[#475569]">
              <div className="flex items-center gap-2">
                <span>Diário de Justiça Eletrônico • DJEN</span>
                <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 hidden sm:inline-block">
                  Exemplo demonstrativo
                </span>
              </div>
              <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Prazo Fatal: 8 dias úteis
              </span>
            </div>

            {/* Publication card */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs text-slate-700 space-y-1.5">
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>DISPONIBILIZAÇÃO: 14/09/2026</span>
                  <span>PUBLICAÇÃO: 15/09/2026</span>
                </div>
                <p className="text-slate-900 font-semibold">
                  PROCESSO 1002341-89.2024.8.26.0100 — 2ª VARA CÍVEL
                </p>
                <p className="text-slate-600 line-clamp-3 leading-relaxed">
                  &ldquo;...Intime-se a parte autora para que, no prazo legal de 15 (quinze) dias, manifeste-se sobre a contestação e documentos juntados aos autos pelo requerido...&rdquo;
                </p>
              </div>

              {/* AI Suggestion Box */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50/80 to-indigo-50/50 border border-blue-200/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0F2B48]">
                    <Bot className="w-4 h-4 text-[#0F2B48]" />
                    <span>Análise do Dendrix • Sugestão Processual</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white text-[#0F2B48] font-bold border border-blue-200">
                    Ato: Réplica
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  Identificada determinação de manifestação sobre a contestação. Prazo processual computado em dias úteis com vencimento em <strong className="text-[#0F172A]">06/10/2026</strong>.
                </p>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Cadastrar prazo no processo
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F2B48] bg-white px-3 py-1 rounded shadow-2xs border border-blue-200 hover:bg-slate-50 transition-colors cursor-pointer">
                    Abrir Minuta no Redator
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
