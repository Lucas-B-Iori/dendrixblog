"use client";

import React from "react";
import { Calendar, MessageSquare, ArrowRight } from "lucide-react";
import { getWhatsAppLink } from "@/lib/config";
import { OpenDemoButton } from "@/components/cta/OpenDemoButton";
import { trackWhatsAppClick } from "@/lib/analytics";
import { BorderBeam } from "@/components/motion/BorderBeam";

export function ClosingCtaSection() {
  const whatsappUrl = getWhatsAppLink(
    "Olá! Estava no site do Dendrix e gostaria de agendar uma demonstração prática de 15 minutos para o meu escritório."
  );

  return (
    <section className="bg-transparent text-slate-900 dark:text-white py-20 sm:py-28 relative overflow-hidden border-t border-slate-200 dark:border-white/[0.08]">
      {/* Brilho de Fundo Esmeralda / Azul Profundo */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(16, 185, 129, 0.25) 0%, rgba(2, 132, 199, 0.15) 40%, transparent 75%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-white/95 dark:bg-[#09131C]/90 border border-slate-200 dark:border-white/15 p-8 sm:p-14 md:p-16 text-center backdrop-blur-2xl shadow-xl dark:shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
          <BorderBeam size={220} duration={9} colorFrom="#10B981" colorTo="#38BDF8" borderWidth={1.5} />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-xs font-mono text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-6 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>AGENDAMENTO DE DEMONSTRAÇÃO</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-6 text-slate-900 dark:text-white leading-tight">
            Coloque ordem no seu escritório e ganhe horas de estratégia.
          </h2>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Traga um processo da sua banca para uma demonstração prática de 15 minutos. Veja o Dendrix ler os autos, apontar informações relevantes e estruturar a minuta ao vivo.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <OpenDemoButton
              ctaLocation="closing_cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-base shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer border border-emerald-400/30"
            >
              <span>Agendar demonstração prática (15 min)</span>
              <ArrowRight className="w-4 h-4" />
            </OpenDemoButton>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  cta_location: "closing_cta",
                  cta_text: "Dúvidas rápidas? Fale pelo WhatsApp",
                })
              }
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.08] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10 font-medium text-base transition-colors backdrop-blur-md"
            >
              <MessageSquare className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span>Dúvidas rápidas? Fale pelo WhatsApp</span>
            </a>
          </div>

          {/* Microcopy Oficial (Locked) */}
          <p className="text-xs sm:text-sm text-slate-400 mb-14">
            Sessão prática no Google Meet • Traga um processo real ou use nosso caso modelo • Sem compromisso comercial
          </p>

          {/* Assinatura Institucional Oficial (Locked) */}
          <div className="pt-10 border-t border-white/10 max-w-lg mx-auto">
            <p className="font-serif text-lg sm:text-xl italic text-slate-200 mb-2">
              “Antes da peça, existe um caso inteiro.”
            </p>
            <p className="font-mono text-xs sm:text-sm tracking-wide text-slate-400 uppercase">
              O Dendrix organiza. A IA apoia. O advogado decide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
