import React from "react";
import { Clock, FolderGit2, BotOff } from "lucide-react";

export function CaosSection() {
  const painPoints = [
    {
      icon: Clock,
      title: "Autos volumosos lidos sob a pressão do prazo fatal.",
      description:
        "Localizar contradições documentais e pedidos em PDFs digitalizados consome horas de trabalho braçal que deveriam ser dedicadas à estratégia da peça.",
      tag: "Sobrecarga na leitura documental",
    },
    {
      icon: FolderGit2,
      title: "Histórico do processo espalhado em conversas e pastas locais.",
      description:
        "Sem centralização, cada novo andamento ou contato do cliente exige reabrir pastas no computador e buscar mensagens antigas para recuperar o contexto do caso.",
      tag: "Perda de tempo na recuperação de contexto",
    },
    {
      icon: BotOff,
      title: "IAs isoladas sem contexto persistente do escritório.",
      description:
        "Ferramentas genéricas de chat não possuem conexão com os dados do cliente, prazos ou autos do processo. O advogado precisa colar informações fragmentadas a cada conversa e conferir respostas geradas fora da realidade dos autos.",
      tag: "Falta de integração operacional",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Asymmetrical Editorial Header */}
        <div className="lg:col-span-5 space-y-4 text-left">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#B45309]">
            O Custo Operacional da Fragmentação
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#0F172A] leading-tight text-balance">
            Você não perde tempo porque trabalha pouco. Perde tempo procurando informação em ferramentas que não conversam.
          </h2>
          <p className="text-base text-[#475569] leading-relaxed pt-2">
            A rotina forense foi fragmentada em abas: o processo no tribunal, o cliente no WhatsApp, os prazos em planilhas e ferramentas genéricas que não conhecem o histórico da sua banca.
          </p>
        </div>

        {/* Right Column: Editorial Open Stack (Not 3 equal cards) */}
        <div className="lg:col-span-7 divide-y divide-[#E2E8F0] border-t border-b border-[#E2E8F0]">
          {painPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="py-6 sm:py-7 first:pt-4 last:pb-4 group hover:bg-black/[0.015] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-md bg-[#EDF2F7] text-[#0F2B48] shrink-0 mt-1">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-[#0F172A]">
                        {item.title}
                      </h3>
                      <span className="text-[11px] font-mono text-[#64748B] bg-slate-100 px-2 py-0.5 rounded self-start sm:self-auto shrink-0">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-sm text-[#475569] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
