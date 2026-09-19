import React from "react";
import { Newspaper, BellRing, CalendarClock, DollarSign, ArrowRight, Bot } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { BorderBeam } from "@/components/motion/BorderBeam";

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
    <SectionWrapper id="prazos" className="border-t border-slate-200 dark:border-white/[0.08] bg-transparent" spacing="default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Left Column: Copy */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="space-y-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Pilar 03 • Rotina de Prazos e Publicações
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-900 dark:text-white leading-tight text-balance">
              Publicações monitoradas com sugestão do próximo passo processual.
            </h2>
          </div>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            O Dendrix acompanha as intimações do seu escritório nos diários oficiais, interpreta o teor do despacho e auxilia no controle dos prazos da sua equipe.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {modules.map((item, idx) => {
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

        {/* Right Column: Macro-recorte da Publicação com IA */}
        <div className="lg:col-span-6 w-full">
          <div className="relative rounded-2xl border border-white/10 bg-[#09121B] shadow-2xl overflow-hidden backdrop-blur-xl">
            <BorderBeam size={180} duration={7} colorFrom="#B45309" colorTo="#10B981" borderWidth={2} />
            {/* Header com proteção total anti-colisão no mobile */}
            <div className="min-h-10 py-2 sm:py-0 px-3 sm:px-4 bg-black/40 border-b border-white/10 flex items-center justify-between gap-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span className="font-semibold text-slate-200 text-[11px] sm:text-xs truncate">
                  DJEN • Publicação Oficial
                </span>
                <span className="text-[10px] text-slate-400 bg-white/[0.05] px-1.5 py-0.5 rounded border border-white/10 hidden md:inline-block shrink-0">
                  Demonstrativo
                </span>
              </div>
              <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shrink-0 font-medium text-[10px] sm:text-[11px] whitespace-nowrap">
                Prazo Fatal: 8 dias úteis
              </span>
            </div>

            {/* Publication card */}
            <div className="p-4 sm:p-6 space-y-4">
              <div className="p-3.5 sm:p-4 bg-black/40 rounded-xl border border-white/[0.08] font-mono text-xs text-slate-300 space-y-2">
                <div className="flex flex-wrap sm:flex-nowrap justify-between gap-1 text-[10px] sm:text-[11px] text-slate-400">
                  <span>DISPONIBILIZAÇÃO: 14/09/2026</span>
                  <span>PUBLICAÇÃO: 15/09/2026</span>
                </div>
                <p className="text-white font-semibold text-xs sm:text-sm">
                  PROCESSO 1002341-89.2024.8.26.0100 — 2ª VARA CÍVEL
                </p>
                <p className="text-slate-300 line-clamp-3 leading-relaxed text-[11px] sm:text-xs">
                  &ldquo;...Intime-se a parte autora para que, no prazo legal de 15 (quinze) dias, manifeste-se sobre a contestação e documentos juntados aos autos pelo requerido...&rdquo;
                </p>
              </div>

              {/* AI Suggestion Box */}
              <div className="p-3.5 sm:p-5 rounded-xl bg-gradient-to-r from-blue-950/40 to-emerald-950/30 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-emerald-400 min-w-0">
                    <Bot className="w-4 h-4 shrink-0" />
                    <span className="truncate">Análise do Dendrix • Sugestão Processual</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 shrink-0">
                    Ato: Réplica
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Identificada determinação de manifestação sobre a contestação. Prazo processual computado em dias úteis com vencimento em <strong className="text-white">06/10/2026</strong>.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Cadastrar prazo no processo
                  </span>
                  <span className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-emerald-600/80 hover:bg-emerald-600 px-3.5 py-2 rounded-lg shadow-sm border border-emerald-500/40 transition-colors cursor-pointer w-full sm:w-auto">
                    Abrir Minuta no Redator
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
