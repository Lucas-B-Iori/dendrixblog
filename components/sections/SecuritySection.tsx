import React from "react";
import Link from "next/link";
import { Server, ShieldBan, Lock, UserCheck, ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Card3D } from "@/components/motion/Card3D";
import { AppleFeatureCard } from "@/components/showcase/AppleFeatureCard";

export function SecuritySection() {
  const securityPillars = [
    {
      icon: Server,
      title: "Servidores localizados no Brasil",
      description:
        "Banco de dados e armazenamento hospedados em região brasileira (São Paulo / sa-east-1), em conformidade com as diretrizes da Lei Geral de Proteção de Dados (LGPD).",
    },
    {
      icon: ShieldBan,
      title: "Seus documentos não alimentam modelos públicos",
      description:
        "A integração com modelos de linguagem opera sob contratos de API corporativa com cláusulas expressas que vedam a utilização dos dados de clientes para retreinamento ou aprimoramento de modelos de terceiros.",
    },
    {
      icon: Lock,
      title: "Criptografia e controle de acessos",
      description:
        "Dados protegidos por criptografia em trânsito (TLS 1.3) e em repouso (AES-256), com autenticação segura e permissões de acesso configuráveis por usuário.",
    },
    {
      icon: UserCheck,
      title: "O advogado no comando da decisão",
      description:
        "O software atua como ferramenta de assistência operacional e analítica. A responsabilidade técnica, a escolha de teses e a aprovação das peças permanecem sob a exclusiva condução do profissional.",
    },
  ];

  return (
    <SectionWrapper id="seguranca" className="border-t border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-[#05080C]" spacing="default">
      {/* Bloco Flagship Apple (Skiper 76 / Apple Feature Block) */}
      <div className="mb-14">
        <AppleFeatureCard />
      </div>

      {/* Header Secundário */}
      <div className="text-left max-w-3xl space-y-4 mb-12">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Segurança da Informação e Privacidade
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-900 dark:text-white leading-tight text-balance">
          Seus dados não treinam modelos públicos. A decisão final é sempre sua.
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          O Dendrix foi projetado adotando controles de segurança técnica, isolamento de dados e respeito às prerrogativas e deveres de sigilo da advocacia.
        </p>
      </div>

      {/* 2x2 Grid de Pilares de Segurança em Vidro Escuro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {securityPillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <Card3D
              key={idx}
              className="h-full"
              enableSpotlight={true}
              spotlightColor="rgba(16, 185, 129, 0.12)"
            >
              <div className="h-full p-7 sm:p-8 rounded-2xl bg-white dark:bg-[#09131C] border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-xl space-y-4 hover:border-emerald-500/30 transition-all backdrop-blur-xl">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </Card3D>
          );
        })}
      </div>

      {/* Link Contextual para Documentação Completa */}
      <div className="mt-10 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm">
        <p className="text-slate-600 dark:text-slate-400">
          Dúvidas sobre governança técnica, DPO ou conformidade com a LGPD?
        </p>
        <Link
          href="/seguranca"
          className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
        >
          <span>Consulte nossas diretrizes completas de segurança</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
