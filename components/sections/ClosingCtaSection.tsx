import React from "react";
import { Calendar, MessageSquare, ArrowRight } from "lucide-react";
import { getWhatsAppLink } from "@/lib/config";
import { OpenDemoButton } from "@/components/cta/OpenDemoButton";

export function ClosingCtaSection() {
  const whatsappUrl = getWhatsAppLink(
    "Olá! Estava no site do Dendrix e gostaria de agendar uma demonstração prática de 15 minutos para o meu escritório."
  );

  return (
    <section className="bg-[var(--surface-dark)] text-white py-20 sm:py-28 relative overflow-hidden border-t border-[var(--border-subtle)]">
      {/* Background ambient radial lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(37, 99, 235, 0.25) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-slate-300 uppercase tracking-wider mb-6 border border-white/10">
          <Calendar className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
          <span>AGENDAMENTO DE DEMONSTRAÇÃO</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white leading-tight">
          Coloque ordem no seu escritório e ganhe horas de estratégia.
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          Traga um processo da sua banca para uma demonstração prática de 15 minutos. Veja o Dendrix ler os autos, apontar informações relevantes e estruturar a minuta ao vivo.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <OpenDemoButton className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[var(--accent-emerald)] hover:bg-[#047857] text-white font-medium text-base shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
            <span>Agendar demonstração prática (15 min)</span>
            <ArrowRight className="w-4 h-4" />
          </OpenDemoButton>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15 font-medium text-base transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Dúvidas rápidas? Fale pelo WhatsApp</span>
          </a>
        </div>

        {/* Microcopy */}
        <p className="text-xs sm:text-sm text-slate-400 mb-14">
          Sessão prática no Google Meet • Traga um processo real ou use nosso caso modelo • Sem compromisso comercial
        </p>

        {/* Institutional signature */}
        <div className="pt-10 border-t border-white/10 max-w-lg mx-auto">
          <p className="font-serif text-lg sm:text-xl italic text-slate-200 mb-2">
            “Antes da peça, existe um caso inteiro.”
          </p>
          <p className="font-mono text-xs sm:text-sm tracking-wide text-slate-400 uppercase">
            O Dendrix organiza. A IA apoia. O advogado decide.
          </p>
        </div>
      </div>
    </section>
  );
}
