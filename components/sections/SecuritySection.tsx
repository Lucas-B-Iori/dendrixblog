import React from "react";
import { Server, ShieldBan, Lock, UserCheck } from "lucide-react";

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
    <div id="seguranca" className="w-full space-y-12">
      {/* Header */}
      <div className="text-left max-w-3xl space-y-3">
        <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#0F2B48]">
          Segurança da Informação e Privacidade
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#0F172A] leading-tight text-balance">
          Seus dados não treinam modelos públicos. A decisão final é sempre sua.
        </h2>
        <p className="text-base text-[#475569] leading-relaxed">
          O Dendrix foi projetado adotando controles de segurança técnica, isolamento de dados e respeito às prerrogativas e deveres de sigilo da advocacia.
        </p>
      </div>

      {/* 2x2 Grid of Solid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {securityPillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs space-y-3 hover:border-slate-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-[#EDF2F7] flex items-center justify-center text-[#0F2B48]">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#0F172A]">
                {pillar.title}
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
