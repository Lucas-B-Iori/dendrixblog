import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Server, ShieldCheck, Lock, UserCheck, ArrowLeft, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Segurança, Privacidade e LGPD | Dendrix CRM",
  description:
    "Conheça as medidas técnicas e contratuais de isolamento de dados, servidores no Brasil e vedação de retreino de IA adotadas pelo Dendrix CRM.",
};

export default function SegurancaPage() {
  const pillars = [
    {
      icon: Server,
      title: "1. Armazenamento em Território Nacional (São Paulo)",
      description:
        "Todos os dados de clientes, peças e autos em PDF são armazenados em infraestrutura de nuvem localizada no Brasil (Região de São Paulo / sa-east-1). Essa escolha garante estrita aderência às diretrizes da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), evitando transferências internacionais de dados não autorizadas.",
    },
    {
      icon: ShieldCheck,
      title: "2. Cláusulas de Não-Retenção e Zero Retreino de IA",
      description:
        "O processamento analítico de autos opera exclusivamente via APIs corporativas privadas. Os acordos de nível de serviço com provedores de modelos de linguagem estabelecem expressamente a proibição de uso de qualquer dado, processo ou petição submetida pelo Dendrix para treinamento ou calibração de modelos públicos de terceiros.",
    },
    {
      icon: Lock,
      title: "3. Criptografia em Trânsito e Repouso (AES-256 / TLS 1.3)",
      description:
        "As conexões com a plataforma utilizam o protocolo TLS 1.3 de ponta a ponta. Os dados persistidos em disco no banco de dados e no armazenamento de arquivos contam com criptografia AES-256. O acesso a informações processuais é restrito por controle de acesso baseado em funções (RBAC), assegurando que cada profissional acesse apenas o conteúdo autorizado pela sua banca.",
    },
    {
      icon: UserCheck,
      title: "4. Preservação do Sigilo e Ética Profissional da OAB",
      description:
        "O software opera sob o princípio de que a responsabilidade técnica e o dever de sigilo profissional pertencem indelegavelmente ao advogado. A ferramenta atua no mapeamento de fatos e na sugestão de estruturas de peças, mantendo a folha dos autos sempre visível para que o profissional confira e decida livremente sobre a redação final.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-canvas)] text-[var(--text-primary)]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back Link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-tertiary)] hover:text-[var(--accent-navy)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para a página inicial</span>
            </Link>
          </div>

          {/* Header */}
          <div className="space-y-4 mb-14">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] text-xs font-mono font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>GOVERNANÇA TÉCNICA E JURÍDICA</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[var(--text-primary)] leading-tight">
              Segurança da Informação, Privacidade e Conformidade Ética
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              O Dendrix CRM foi concebido para atender às exigências de escritórios que lidam com dados sensíveis, processos em segredo de justiça e as prerrogativas de sigilo da advocacia.
            </p>
          </div>

          {/* Pillars List */}
          <div className="space-y-6 mb-16">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-xl bg-white border border-[var(--border-subtle)] shadow-xs space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-[#EDF2F7] text-[#0F2B48]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)]">
                      {pillar.title}
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed pl-1">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Institutional Compliance Box */}
          <div className="p-6 sm:p-8 rounded-xl bg-slate-900 text-white space-y-4 mb-16">
            <h3 className="font-serif text-xl sm:text-2xl font-medium">
              Nota sobre Inteligência Artificial e Sigilo Profissional
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Diferente de interfaces genéricas de chat acessíveis ao público geral, o Dendrix não armazena o histórico dos processos de clientes para fins de melhoria de produtos públicos. O raciocínio forense é estritamente contextualizado ao ambiente da banca contratante.
            </p>
            <div className="pt-2">
              <Link
                href="/demonstracao"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--accent-emerald)] text-white text-xs font-semibold hover:bg-[#047857] transition-colors"
              >
                <span>Agendar conversa com nosso time técnico</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
