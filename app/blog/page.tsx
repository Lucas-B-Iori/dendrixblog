import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, BookOpen, Layers, Sparkles, Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog Jurídico | Dendrix CRM",
  description:
    "Artigos e guias práticos sobre inteligência jurídica, gestão de processos e produtividade para advogados e pequenos escritórios.",
};

export default function BlogPage() {
  const clusters = [
    {
      icon: Layers,
      title: "Gestão e CRM Jurídico",
      description:
        "Guias operacionais sobre controle de prazos sem pânico, estruturação de fichas de processos, gestão de honorários e atendimento a clientes via WhatsApp.",
      topics: [
        "Controle de prazos processuais no CPC sem planilhas paralelas",
        "Como organizar processos no escritório em crescimento",
        "WhatsApp integrado à rotina da banca sem perda de histórico",
      ],
    },
    {
      icon: Sparkles,
      title: "Inteligência Artificial Jurídica",
      description:
        "Análises técnicas sobre as limitações do ChatGPT na advocacia, metodologias de leitura analítica de autos em PDF e checagem de preliminares.",
      topics: [
        "Por que LLMs genéricos falham em teses processuais estritas",
        "Como mapear contradições em autos volumosos com IA",
        "Conferência pré-protocolo: evitando erros materiais e omissões",
      ],
    },
    {
      icon: Clock,
      title: "Produtividade da Rotina Jurídica",
      description:
        "Estratégias para advogados autônomos e sócios de bancas de 2 a 8 advogados reduzirem o tempo consumido em tarefas burocráticas.",
      topics: [
        "O dilema do advogado solo: equilibrar audiências, clientes e minutas",
        "Como delegar peças com contexto preservado",
        "Do caos à previsibilidade: eliminando retrabalho no escritório",
      ],
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
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#E2E8F0] text-xs font-mono text-[var(--text-secondary)] hover:text-[#0F2B48] hover:border-slate-300 transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para a página inicial</span>
            </Link>
          </div>

          {/* Header */}
          <div className="space-y-4 mb-12 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--accent-navy)]/10 text-[var(--accent-navy)] text-xs font-mono font-medium">
              <BookOpen className="w-3.5 h-3.5" />
              <span>CONTEÚDO JURÍDICO ESTRATÉGICO</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[var(--text-primary)] leading-tight text-balance">
              Blog Jurídico Dendrix
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              Artigos analíticos, guias práticos e estudos de fluxo sobre tecnologia, inteligência contextual e gestão jurídica sem atalhos simplistas.
            </p>
          </div>

          {/* Status Editorial Alert */}
          <div className="p-6 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 mb-12 text-left space-y-2">
            <p className="font-semibold text-sm">Edição dos Primeiros Artigos em Andamento</p>
            <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
              Nossa equipe técnica e jurídica está refinando os primeiros artigos dos três clusters temáticos oficiais. Em breve, os guias completos estarão disponíveis para leitura pública.
            </p>
          </div>

          {/* Topic Clusters Grid */}
          <div className="space-y-6 mb-16">
            <h2 className="font-serif text-2xl font-medium text-[var(--text-primary)]">
              Eixos Temáticos do Blog
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clusters.map((cluster, idx) => {
                const Icon = cluster.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-xl bg-white border border-[var(--border-subtle)] shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="w-9 h-9 rounded-lg bg-[#EDF2F7] flex items-center justify-center text-[#0F2B48]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {cluster.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {cluster.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                        Tópicos em Redação
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {cluster.topics.map((topic, tIdx) => (
                          <li key={tIdx} className="line-clamp-2">
                            • {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Steps CTA */}
          <div className="p-8 rounded-xl bg-white border border-[var(--border-subtle)] shadow-xs text-center space-y-4">
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[var(--text-primary)]">
              Quer ver a inteligência contextual funcionando na prática?
            </h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
              Agende uma demonstração prática individual de 15 minutos e traga um processo da sua banca para teste ao vivo.
            </p>
            <div className="pt-2">
              <Link
                href="/demonstracao"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent-navy)] hover:bg-[#0A1C30] text-white text-sm font-semibold transition-colors"
              >
                <span>Agendar demonstração prática (15 min)</span>
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
