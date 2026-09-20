"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "motion/react";
import {
  FileText,
  Target,
  PenTool,
  Clock,
  Layers,
  ArrowUpRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { OpenDemoButton } from "@/components/cta/OpenDemoButton";
import { RollingCounter } from "@/components/motion/RollingCounter";
import { ContainerScroll3D } from "@/components/motion/ContainerScroll3D";
import { HeroSplitScreen } from "./HeroSplitScreen";

export interface HeroModule {
  id: string;
  name: string;
  label: string;
  shortTag: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColorClass: string;
  badgeBorderClass: string;
  activeBgClass: string;
  summary: string;
  metric: string;
}

export const HERO_MODULES: HeroModule[] = [
  {
    id: "autos",
    name: "AUTOS",
    label: "Leitura de Autos",
    shortTag: "01. Autos em PDF",
    icon: FileText,
    accentColorClass: "text-emerald-600 dark:text-emerald-400",
    badgeBorderClass: "border-emerald-500/40 text-emerald-600 dark:text-emerald-400",
    activeBgClass: "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/40 ring-1 ring-emerald-500/30",
    summary:
      "Processamento e OCR contextual de autos com milhares de folhas em menos de 8 segundos.",
    metric: "< 8s por volume",
  },
  {
    id: "origem",
    name: "ORIGEM",
    label: "Origem dos Fatos",
    shortTag: "02. Fls. 47 Rastreável",
    icon: Target,
    accentColorClass: "text-emerald-600 dark:text-emerald-400",
    badgeBorderClass: "border-emerald-500/40 text-emerald-600 dark:text-emerald-400",
    activeBgClass: "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/40 ring-1 ring-emerald-500/30",
    summary:
      "Cada fato, prova e contradição amarrado ao número exato da folha (Fls. 47) no processo.",
    metric: "100% auditável",
  },
  {
    id: "minuta",
    name: "MINUTA",
    label: "Redação Assistida",
    shortTag: "03. Minuta com Provas",
    icon: PenTool,
    accentColorClass: "text-sky-600 dark:text-cyan-400",
    badgeBorderClass: "border-cyan-500/40 text-sky-600 dark:text-cyan-400",
    activeBgClass: "bg-cyan-500/10 dark:bg-cyan-500/15 border-cyan-500/40 ring-1 ring-cyan-500/30",
    summary:
      "Redação jurídica de alto nível com IA contextual que cita as provas dos autos e nunca alucina.",
    metric: "Zero alucinações",
  },
  {
    id: "prazos",
    name: "PRAZOS",
    label: "Controle DJEN",
    shortTag: "04. DJEN & Publicações",
    icon: Clock,
    accentColorClass: "text-amber-600 dark:text-amber-400",
    badgeBorderClass: "border-amber-500/40 text-amber-600 dark:text-amber-400",
    activeBgClass: "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/40 ring-1 ring-amber-500/30",
    summary:
      "Monitoramento contínuo de diários de justiça, prazos fatais com cálculo tempestivo e zero perdas.",
    metric: "0 prazos perdidos",
  },
  {
    id: "contexto",
    name: "CONTEXTO",
    label: "Memória do Caso",
    shortTag: "05. Memória Viva",
    icon: Layers,
    accentColorClass: "text-teal-600 dark:text-teal-400",
    badgeBorderClass: "border-teal-500/40 text-teal-600 dark:text-teal-400",
    activeBgClass: "bg-teal-500/10 dark:bg-teal-500/15 border-teal-500/40 ring-1 ring-teal-500/30",
    summary:
      "Uma memória viva do processo: peças anteriores, despachos, audiências e teses jurídicas unificados.",
    metric: "Visão 360° do caso",
  },
];

const DEFAULT_NAME = "DENDRIX";

// Variantes de letras com máscara individual para evitar cortes
const letterVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1 },
  exit: { y: "-110%", opacity: 0 },
};

const getStaggerDelay = (charIndex: number, totalChars: number) => {
  return 0.04 * Math.abs(charIndex - Math.floor(totalChars / 2));
};

export function Skiper6Hero() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Mola para o cursor magnético flutuante (Skiper 6 badge)
  const dockRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 350, damping: 25, mass: 0.1 });
  const springY = useSpring(cursorY, { stiffness: 350, damping: 25, mass: 0.1 });
  const cursorScale = useSpring(0, { stiffness: 380, damping: 26, mass: 0.1 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Rastreamento relativo ao container de módulos
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dockRef.current) return;
    setIsUserInteracting(true);
    const rect = dockRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left - 24);
    cursorY.set(e.clientY - rect.top - 24);
  };

  const handlePointerEnter = () => {
    setIsUserInteracting(true);
    cursorScale.set(1);
  };

  const handlePointerLeave = () => {
    cursorScale.set(0);
    setHoveredIndex(null);
  };

  const activeModule = hoveredIndex !== null ? HERO_MODULES[hoveredIndex] : null;
  const activeTitle = activeModule ? activeModule.name : DEFAULT_NAME;

  return (
    <div className="relative w-full flex flex-col items-center justify-center pt-2 sm:pt-4 pb-12 sm:pb-20">
      {/* 1. Eyebrow Institucional */}
      <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.12)]">
        <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 animate-pulse" />
        <span>CRM Jurídico com Inteligência Contextual</span>
      </div>

      {/* 2. Dock de Módulos Interativos (Skiper 6 - Adaptado com módulos jurídicos) */}
      <div className="relative mb-4 sm:mb-6 max-w-full px-2">
        <div
          ref={dockRef}
          onPointerMove={handlePointerMove}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          className="relative flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 rounded-2xl bg-white/70 dark:bg-[#070D14]/80 border border-slate-200/90 dark:border-white/10 backdrop-blur-xl shadow-lg"
        >
          {HERO_MODULES.map((module, idx) => {
            const Icon = module.icon;
            const isSelected = hoveredIndex === idx;

            return (
              <button
                key={module.id}
                type="button"
                onMouseEnter={() => {
                  setIsUserInteracting(true);
                  setHoveredIndex(idx);
                }}
                onClick={() => {
                  setIsUserInteracting(true);
                  setHoveredIndex(isSelected ? null : idx);
                }}
                className={`group relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? `${module.activeBgClass} text-slate-900 dark:text-white shadow-md scale-[1.03]`
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.06]"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-200 ${
                    isSelected
                      ? module.accentColorClass
                      : "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                  }`}
                />
                <span className="font-sans font-semibold tracking-tight whitespace-nowrap">
                  {module.label}
                </span>

                {/* Micro indicador de status */}
                <span
                  className={`hidden md:inline-block font-mono text-[10px] px-1.5 py-0.2 rounded border transition-colors ${
                    isSelected
                      ? module.badgeBorderClass
                      : "border-slate-300/60 dark:border-white/10 text-slate-400"
                  }`}
                >
                  {module.shortTag.split(" ")[0]}
                </span>
              </button>
            );
          })}

          {/* Cursor Magnético com Seta ↗ (Inspirado no Skiper 6 original) */}
          <motion.div
            style={{
              x: springX,
              y: springY,
              scale: cursorScale,
              transformOrigin: "center center",
            }}
            className="pointer-events-none absolute left-0 top-0 z-30 size-11 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shadow-[0_0_22px_rgba(16,185,129,0.85)] border border-emerald-300/50"
            aria-hidden="true"
          >
            <ArrowUpRight className="w-5 h-5 stroke-[2.75]" />
          </motion.div>
        </div>
      </div>

      {/* 3. Tipografia Monumental Cinética (O Core do Skiper 6 — Aumentado V5.2) */}
      <div className="relative w-full h-[20vw] sm:h-[18vw] md:h-[15.5vw] lg:h-[13.5vw] max-h-[235px] min-h-[105px] flex items-center justify-center select-none my-1 sm:my-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTitle}
            className="absolute inset-0 w-full h-full flex items-center justify-center text-center px-2"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h1
              className={`font-sans font-black uppercase tracking-tighter leading-none text-[15.5vw] sm:text-[13.8vw] md:text-[11.8vw] lg:text-[10.2vw] xl:text-[9.2rem] transition-colors duration-300 flex items-center justify-center ${
                activeModule
                  ? `${activeModule.accentColorClass} drop-shadow-[0_0_50px_rgba(16,185,129,0.35)]`
                  : "text-slate-900 dark:text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.18)]"
              }`}
            >
              {Array.from(activeTitle).map((char, charIdx) => (
                <motion.span
                  key={`${activeTitle}-${charIdx}`}
                  className="inline-block overflow-hidden py-1.5 sm:py-2.5"
                >
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-110%", opacity: 0 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.19, 1, 0.22, 1],
                      delay: getStaggerDelay(charIdx, activeTitle.length),
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </motion.span>
              ))}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. Subheadline e Promessa Central com Destaque de Origem */}
      <div className="w-full max-w-3xl text-center space-y-3.5 px-4 mt-1">
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium leading-[1.18] tracking-[-0.02em] text-slate-900 dark:text-white text-balance">
          Dos autos à minuta, com{" "}
          <span className="font-serif italic text-emerald-600 dark:text-emerald-400 underline decoration-emerald-500/40 decoration-wavy decoration-1 underline-offset-4">
            a origem das informações
          </span>{" "}
          sempre visível.
        </h2>

        {/* Descrição Dinâmica do Pilar Ativo / Geral */}
        <div className="min-h-[52px] sm:min-h-[44px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeModule ? activeModule.id : "default"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl text-balance"
            >
              {activeModule
                ? activeModule.summary
                : "O Dendrix conecta o contexto do processo à leitura dos autos em PDF, identifica fatos e contradições com referência às páginas e auxilia na redação da peça no mesmo ambiente."}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* 5. CTAs Principais */}
        <div className="pt-2 space-y-3 flex flex-col items-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <OpenDemoButton
              ctaLocation="hero"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-[#0F2B48] to-[#0A3D62] hover:from-[#143D66] hover:to-[#0D4B78] border border-white/10 rounded-xl transition-all shadow-[0_0_25px_rgba(15,43,72,0.6)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus-ring text-center w-full sm:w-auto"
            >
              <span>Agendar demonstração prática</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </OpenDemoButton>

            <a
              href="#showcase"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] active:bg-white/[0.1] rounded-xl transition-all text-center border border-slate-300 dark:border-white/10 backdrop-blur-md w-full sm:w-auto"
            >
              Ver o produto em ação
            </a>
          </div>

          {/* Microcopy Oficial (Locked) */}
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2 pt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block shrink-0 shadow-[0_0_6px_#34D399]" />
            <span>15 minutos • Traga um processo da sua banca ou use nosso caso modelo.</span>
          </p>
        </div>

        {/* 6. Métricas Operacionais Rolantes (Skiper 37) */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-5 max-w-xl mx-auto border-t border-slate-200 dark:border-white/10">
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-center">
            <div className="text-lg sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              <RollingCounter value={10412} suffix="+" />
            </div>
            <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 block font-sans leading-tight mt-0.5">
              Autos indexados
            </span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-center">
            <div className="text-lg sm:text-2xl font-bold font-mono text-sky-600 dark:text-cyan-400">
              <RollingCounter value={8} prefix="< " suffix="s" />
            </div>
            <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 block font-sans leading-tight mt-0.5">
              Leitura por volume
            </span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] text-center">
            <div className="text-lg sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              <RollingCounter value={0} />
            </div>
            <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 block font-sans leading-tight mt-0.5">
              Prazos perdidos
            </span>
          </div>
        </div>
      </div>

      {/* 7. Showcase Centralizado da Interface Real (PDF + Minuta) */}
      <div id="showcase" className="w-full max-w-6xl mx-auto mt-12 sm:mt-16 px-2 sm:px-4">
        <div className="text-center pb-4 sm:pb-6 space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-[11px] font-mono text-slate-600 dark:text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Ambiente Operacional Unificado</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            PDF dos autos à esquerda com referência de páginas • Redator assistido à direita com citações auditáveis
          </p>
        </div>

        <ContainerScroll3D>
          <HeroSplitScreen />
        </ContainerScroll3D>
      </div>
    </div>
  );
}
