"use client";

import React, { useRef } from "react";
import { Database, FileSearch, PenTool, ArrowRight, Sparkles } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Card3D } from "@/components/motion/Card3D";
import { AnimatedBeam } from "@/components/motion/AnimatedBeam";
import { BorderBeam } from "@/components/motion/BorderBeam";
import { SvgScrollPath } from "@/components/motion/SvgScrollPath";

export function LoopSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: "01",
      category: "GESTÃO DE PROCESSOS",
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
      className="border-t border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#05080C] scroll-mt-16 relative overflow-hidden"
      spacing="default"
    >
      {/* Brilho Radial Central */}
      <div
        className="pointer-events-none absolute left-1/2 -top-20 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(2,132,199,0.1) 50%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Cabeçalho Centralizado */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider shadow-[0_0_12px_rgba(16,185,129,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>O Fluxo Contínuo do Processo</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-900 dark:text-white leading-tight text-balance">
          O trabalho jurídico e a inteligência do caso no mesmo ambiente.
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          O Dendrix integra a rotina da banca à análise dos autos. A ficha do processo, os prazos e os documentos em PDF alimentam diretamente o assistente e o editor de redação.
        </p>
      </div>

      {/* Trilho de Conexão com SvgScrollPath (Skiper 19) e 3D Cards */}
      <div className="relative">
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Card3D
                key={step.number}
                className="h-full"
                enableSpotlight={true}
                spotlightColor="rgba(16, 185, 129, 0.12)"
              >
                <div
                  className="relative h-full p-7 sm:p-8 rounded-2xl bg-white dark:bg-[#09131C]/90 border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl flex flex-col justify-between hover:border-emerald-500/30 transition-all group overflow-hidden backdrop-blur-xl"
                >
                  {step.hasBorderBeam && (
                    <BorderBeam size={160} duration={6} colorFrom="#10B981" colorTo="#0284C7" borderWidth={2} />
                  )}

                  <div className="space-y-5 relative z-10">
                    {/* Header Step Indicator */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                        {step.number} • {step.category}
                      </span>
                      <div
                        ref={step.ref}
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 group-hover:bg-emerald-500/20 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors shadow-xs"
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Sub-badge */}
                  <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono relative z-10">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{step.badgeText}</span>
                    {idx < 2 && (
                      <ArrowRight className="w-4 h-4 text-emerald-500/60 dark:text-emerald-400/60 hidden md:inline-block group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </div>
              </Card3D>
            );
          })}

          {/* Feixes de Dados Animados no Desktop */}
          <div className="hidden md:block pointer-events-none absolute inset-0 z-20">
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={ref1}
              toRef={ref2}
              duration={3.5}
              curvature={-45}
              pathColor="#1E293B"
              pathOpacity={0.6}
              gradientStartColor="#0284C7"
              gradientStopColor="#10B981"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={ref2}
              toRef={ref3}
              duration={3.5}
              delay={1.75}
              curvature={-45}
              pathColor="#1E293B"
              pathOpacity={0.6}
              gradientStartColor="#0284C7"
              gradientStopColor="#10B981"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
