"use client";

import React from "react";
import { Clock, FolderGit2, BotOff } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Card3D } from "@/components/motion/Card3D";
import { ScrubbedTextReveal } from "@/components/motion/ScrubbedTextReveal";
import { SienaParallax } from "@/components/motion/SienaParallax";

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
    <SectionWrapper id="problema" className="border-t border-white/[0.08] bg-[#070D14] relative overflow-hidden" spacing="default">
      {/* Brilho de Fundo Sutil Âmbar */}
      <div
        className="pointer-events-none absolute -left-20 top-1/3 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        {/* Coluna Esquerda: Manifesto com ScrubbedTextReveal (Skiper 70) */}
        <div className="lg:col-span-5 space-y-5 text-left">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-block">
            O Custo Operacional da Fragmentação
          </p>

          {/* H2 com Leitura Progressiva no Scroll (Skiper 70) */}
          <div className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-white leading-tight">
            <ScrubbedTextReveal
              text="Você não perde tempo porque trabalha pouco. Perde tempo procurando informação em ferramentas que não conversam."
              wordClassName="text-white"
            />
          </div>

          <p className="text-base text-slate-300 leading-relaxed pt-2">
            A rotina forense foi fragmentada em abas: o processo no tribunal, o cliente no WhatsApp, os prazos em planilhas e ferramentas genéricas que não conhecem o histórico da sua banca.
          </p>
        </div>

        {/* Coluna Direita: Stack de Dor com Parallax Siena (Skiper 29) e Card3D */}
        <div className="lg:col-span-7">
          <SienaParallax speed={25}>
            <Card3D enableSpotlight={true} spotlightColor="rgba(245, 158, 11, 0.12)">
              <div className="divide-y divide-white/[0.08] bg-[#0A121A]/95 border border-white/10 rounded-2xl p-3 sm:p-6 shadow-2xl overflow-hidden backdrop-blur-xl">
                {painPoints.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="p-4 sm:p-6 group hover:bg-white/[0.03] rounded-xl transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5 shadow-xs">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20 font-medium">
                              {item.tag}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-300 leading-relaxed pt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card3D>
          </SienaParallax>
        </div>
      </div>
    </SectionWrapper>
  );
}
