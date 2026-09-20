import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getAllPosts } from "@/lib/blog";
import { BlogFeed } from "@/components/blog/BlogFeed";
import { ArrowLeft, BookOpen, Sparkles, Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog Jurídico Dendrix | Inteligência Contextual, Gestão e Prazos",
  description:
    "Artigos técnicos, guias operacionais de controladoria e análises de inteligência artificial aplicada ao contencioso judicial brasileiro.",
  alternates: {
    canonical: "https://dendrixcrm.com.br/blog/",
  },
  openGraph: {
    title: "Blog Jurídico Dendrix | Inteligência Contextual, Gestão e Prazos",
    description:
      "Artigos técnicos e guias práticos sobre inteligência jurídica, gestão de processos e produtividade para bancas de advocacia.",
    url: "https://dendrixcrm.com.br/blog/",
    siteName: "Dendrix CRM",
    type: "website",
    locale: "pt_BR",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface-canvas)] text-[var(--text-primary)] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb / Back Link */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0A121A]/80 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/30 transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar para a página inicial</span>
            </Link>
          </div>

          {/* Hero Editorial do Blog */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>EDITORIAL TÉCNICO & OPERAÇÕES JURÍDICAS</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Pensamento Jurídico & Engenharia de Processos
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Guias aprofundados sobre a transição do contencioso manual para a esteira contextual: leitura de autos em PDF, tempestividade do DJEN e rentabilidade para bancas em crescimento.
            </p>
          </div>

          {/* Feed Dinâmico com Filtros, Destaque e Busca */}
          <BlogFeed initialPosts={posts} />

          {/* Banner de Demonstração no Rodapé do Blog */}
          <div className="pt-12 border-t border-slate-200 dark:border-white/[0.08]">
            <div className="rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/10 bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 dark:from-[#0B1520] dark:via-[#070D14] dark:to-[#04080D] shadow-xl text-center space-y-5 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXPERIMENTE NA PRÁTICA</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight max-w-2xl mx-auto">
                Pronto para ver a leitura de autos e o controle de prazos funcionando no seu escritório?
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
                Agende uma demonstração prática individual de 15 minutos com um consultor especialista. Traga um processo real da sua banca para teste ao vivo.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/demonstracao"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0F2B48] to-[#0A3D62] hover:from-[#13375C] hover:to-[#0C4A75] text-white text-sm font-semibold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>Agendar demonstração prática (15 min)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Sem compromisso comercial
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
