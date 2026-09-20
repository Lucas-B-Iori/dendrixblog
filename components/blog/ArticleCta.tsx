"use client";

import React from "react";
import Link from "next/link";
import { Calendar, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { trackDemoCtaClick } from "@/lib/analytics";

interface ArticleCtaProps {
  compact?: boolean;
}

export function ArticleCta({ compact = false }: ArticleCtaProps) {
  if (compact) {
    return (
      <div className="p-5 rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-emerald-500/10 to-transparent dark:from-[#0B1A24]/90 dark:to-[#070D14]/90 backdrop-blur-xl shadow-md space-y-3">
        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-mono text-[11px] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>EXPERIMENTE NA SUA BANCA</span>
        </div>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
          Veja a leitura de autos e o controle de prazos funcionando ao vivo em um processo do seu escritório.
        </p>
        <Link
          href="/demonstracao"
          onClick={() =>
            trackDemoCtaClick({
              cta_location: "article_cta_compact",
              cta_text: "Agendar Demo (15 min)",
            })
          }
          className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors shadow-sm"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Agendar Demo (15 min)</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="my-12 p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 dark:from-[#0B1520] dark:via-[#070D14] dark:to-[#04080D] shadow-xl dark:shadow-2xl relative overflow-hidden">
      {/* Glow especular de fundo */}
      <div
        className="pointer-events-none absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 space-y-4 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>CRM JURÍDICO COM INTELIGÊNCIA CONTEXTUAL</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
          Elimine o retrabalho de ler PDFs volumosos e blinde seus prazos.
        </h3>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          O Dendrix analisa os autos, mapeia fatos com indicação exata de folhas e monitora o DJEN em uma única esteira profissional.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            href="/demonstracao"
            onClick={() =>
              trackDemoCtaClick({
                cta_location: "article_cta_full",
                cta_text: "Agendar demonstração prática (15 min)",
              })
            }
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar demonstração prática (15 min)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-xs text-slate-500 dark:text-slate-400 text-center font-mono">
            Gratuito • Traga um processo real
          </span>
        </div>
      </div>
    </div>
  );
}
