import React from "react";
import { HeroSplitScreen } from "./HeroSplitScreen";
import { ArrowRight, Sparkles } from "lucide-react";
import { OpenDemoButton } from "@/components/cta/OpenDemoButton";

export function HeroSection() {
  return (
    <div id="hero" className="w-full pt-4 pb-16 sm:pb-24 lg:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Official Locked Copy */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-7 text-left">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F2B48]/6 border border-[#0F2B48]/12 text-[#0F2B48] text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#0F2B48]" />
            <span>CRM Jurídico com Inteligência Contextual</span>
          </div>

          {/* H1 (Locked) */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[3.25rem] font-medium leading-[1.14] tracking-[-0.025em] text-[#0F172A] text-balance">
            Dos autos à minuta, com a origem das informações sempre visível.
          </h1>

          {/* Subheadline (Locked) */}
          <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-xl font-normal">
            O Dendrix conecta o contexto do processo à leitura dos autos em PDF, identifica fatos e contradições com referência às páginas e auxilia na redação da peça no mesmo ambiente.
          </p>

          {/* Action CTAs */}
          <div className="space-y-3 pt-1">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <OpenDemoButton className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#0F2B48] hover:bg-[#0A1C30] active:scale-[0.99] rounded-md transition-all shadow-sm hover:shadow cursor-pointer focus-ring text-center">
                <span>Agendar demonstração prática</span>
                <ArrowRight className="w-4 h-4" />
              </OpenDemoButton>

              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center px-5 py-3.5 text-sm font-semibold text-[#0F172A] hover:text-[#0F2B48] bg-transparent hover:bg-black/5 active:bg-black/10 rounded-md transition-colors text-center border border-transparent hover:border-[#E2E8F0]"
              >
                Ver o produto em ação
              </a>
            </div>

            {/* Microcopy (Locked) */}
            <p className="text-xs text-[#64748B] flex items-start sm:items-center gap-2 pt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block shrink-0 mt-1 sm:mt-0" />
              <span className="leading-snug">15 minutos • Traga um processo da sua banca ou use nosso caso modelo.</span>
            </p>
          </div>

          {/* Institutional Signature (Locked) */}
          <div className="pt-4 border-t border-[#E2E8F0] space-y-1">
            <p className="text-sm font-semibold text-[#0F172A]">
              Antes da peça, existe um caso inteiro.
            </p>
            <p className="text-xs sm:text-sm text-[#64748B]">
              O Dendrix organiza. A IA apoia. O advogado decide.
            </p>
          </div>
        </div>

        {/* Right Column: Split-Screen Real Product Simulation */}
        <div className="lg:col-span-7 w-full">
          <HeroSplitScreen />
        </div>
      </div>
    </div>
  );
}
