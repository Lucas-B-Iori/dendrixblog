import React from "react";
import { Clock, FolderGit2, BotOff } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Card3D } from "@/components/motion/Card3D";

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
    <SectionWrapper id="problema" className="border-t border-[#E2E8F0]/70 bg-white/60" spacing="default">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
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

        {/* Right Column: Refined Stack Card with 3D Physics */}
        <div className="lg:col-span-7">
          <Card3D enableSpotlight={true} spotlightColor="rgba(245, 158, 11, 0.08)">
            <div className="divide-y divide-[#E2E8F0] bg-white border border-[#E2E8F0] rounded-2xl p-3 sm:p-6 shadow-xs overflow-hidden">
              {painPoints.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="p-4 sm:p-6 group hover:bg-slate-50/60 rounded-xl transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-lg bg-[#EDF2F7] text-[#0F2B48] shrink-0 mt-0.5 shadow-2xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80 font-medium">
                            {item.tag}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-[#0F172A] leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#475569] leading-relaxed pt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card3D>
        </div>
      </div>
    </SectionWrapper>
  );
}
