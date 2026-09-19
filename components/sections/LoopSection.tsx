"use client";

import React, { useRef } from "react";
import { Database, FileSearch, PenTool, ArrowRight, Sparkles } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Card3D } from "@/components/motion/Card3D";
import { AnimatedBeam } from "@/components/motion/AnimatedBeam";
import { BorderBeam } from "@/components/motion/BorderBeam";

export function LoopSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: "01",
      category: "GESTÃO FORENSE",
      title: "Processo, cliente e prazos organizados.",
      description:
        "A ficha do processo reúne partes, comarca, valor da causa, andamentos e contagem regressiva de prazos em tempo real, sem necessidade de planilhas paralelas.",
      icon: Database,
      badgeText: "CRM Operacional",
      ref: ref1,
      hasBorderBeam: false,
    },
    {
      number: "02",
      category: "LEITURA DOCUMENTAL",
      title: "Leitura analítica de PDFs com referência de página.",
      description:
        "O sistema processa autos nativos e escaneados, mapeia a cronologia e localiza pontos relevantes mantendo a folha de origem visível para conferência.",
      icon: FileSearch,
      badgeText: "Mesa Jurídica & OCR",
      ref: ref2,
      hasBorderBeam: false,
    },
    {
      number: "03",
      category: "REDAÇÃO ASSISTIDA",
      title: "Minutas estruturadas a partir do contexto real.",
      description:
        "O editor utiliza os dados cadastrados no CRM e os fatos levantados nos autos para auxiliar na redação da minuta. O advogado revisa, ajusta teses e decide a versão final.",
      icon: PenTool,
      badgeText: "Redator & Peças Ouro",
      ref: ref3,
      hasBorderBeam: true,
    },
  ];

  return (
    <SectionWrapper
      id="como-funciona"
      className="border-t border-[#E2E8F0]/70 bg-[#F4F4F2]/50 scroll-mt-16 relative overflow-hidden"
      spacing="default"
    >
      {/* Centered Header for Architectural Shift */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#E2E8F0] shadow-2xs text-[#0F2B48] text-xs font-mono font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#0F2B48]" />
          <span>O Fluxo Contínuo do Processo</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-[#0F172A] leading-tight text-balance">
          O trabalho jurídico e a inteligência do caso no mesmo ambiente.
        </h2>
        <p className="text-base text-[#475569] leading-relaxed max-w-2xl mx-auto">
          O Dendrix integra a rotina da banca à análise dos autos. A ficha do processo, os prazos e os documentos em PDF alimentam diretamente o assistente e o editor de redação.
        </p>
      </div>

      {/* Connected 3-Stage Track with 3D Tilt Cards and Animated Beams */}
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <Card3D
              key={step.number}
              className="h-full"
              enableSpotlight={true}
              spotlightColor="rgba(15, 43, 72, 0.06)"
            >
              <div
                className="relative h-full p-7 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all group overflow-hidden"
              >
                {step.hasBorderBeam && (
                  <BorderBeam size={160} duration={6} colorFrom="#0F2B48" colorTo="#10B981" borderWidth={2} />
                )}

                <div className="space-y-5 relative z-10">
                  {/* Header Step Indicator */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#0F2B48] px-2.5 py-1 rounded bg-[#EDF2F7]">
                      {step.number} • {step.category}
                    </span>
                    <div
                      ref={step.ref}
                      className="p-2.5 rounded-lg bg-slate-50 text-slate-700 group-hover:bg-[#0F2B48] group-hover:text-white transition-colors shadow-2xs"
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-[#0F172A] leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[#475569] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Sub-badge */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono relative z-10">
                  <span className="font-semibold text-slate-700">{step.badgeText}</span>
                  {idx < 2 && (
                    <ArrowRight className="w-4 h-4 text-slate-400 hidden md:inline-block" />
                  )}
                </div>
              </div>
            </Card3D>
          );
        })}

        {/* Desktop Animated Data Beams connecting step icon nodes */}
        <div className="hidden md:block pointer-events-none absolute inset-0 z-20">
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={ref1}
            toRef={ref2}
            duration={3.5}
            curvature={-45}
            pathColor="#CBD5E1"
            pathOpacity={0.4}
            gradientStartColor="#0F2B48"
            gradientStopColor="#10B981"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={ref2}
            toRef={ref3}
            duration={3.5}
            delay={1.75}
            curvature={-45}
            pathColor="#CBD5E1"
            pathOpacity={0.4}
            gradientStartColor="#0F2B48"
            gradientStopColor="#10B981"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
