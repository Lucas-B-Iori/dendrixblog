"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, FileText, Clock, ShieldCheck } from "lucide-react";

export interface DynamicFeature {
  id: string;
  pillLabel: string;
  headlinePhrase: string;
  badgeLabel: string;
  detail: string;
  icon: React.ElementType;
}

export const DYNAMIC_FEATURES: DynamicFeature[] = [
  {
    id: "origem",
    pillLabel: "01 • Origem dos Fatos",
    headlinePhrase: "a origem das informações",
    badgeLabel: "Fls. 47 • Despacho ID #8912",
    detail: "Vinculação direta de cada alegação à folha exata dos autos em PDF.",
    icon: FileText,
  },
  {
    id: "citacao",
    pillLabel: "02 • Citação de Fls.",
    headlinePhrase: "cada citação de folha",
    badgeLabel: "Contradição Detectada • Fls. 104",
    detail: "Confronto analítico entre contestação, laudo pericial e réplica.",
    icon: Sparkles,
  },
  {
    id: "cronologia",
    pillLabel: "03 • Linha Temporal",
    headlinePhrase: "a cronologia do processo",
    badgeLabel: "14 Andamentos Ordenados • 8s",
    detail: "Reconstituição cronológica instantânea dos fatos sem perda de contexto.",
    icon: Clock,
  },
  {
    id: "sem-alucinacao",
    pillLabel: "04 • Zero Alucinação",
    headlinePhrase: "zero alucinação jurídica",
    badgeLabel: "100% Ancorado nos Autos",
    detail: "A IA atua estritamente sobre a prova material dos autos digitalizados.",
    icon: ShieldCheck,
  },
];

const CYCLE_DURATION_MS = 4200;

interface HeroDynamicControllerProps {
  activeIndex: number;
  onSelect: (index: number) => void;
  progress: number;
  isPaused: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

/**
 * Faixa de Pílulas Interativas inspiradas no Skiper 6
 * Layout responsivo: grade de 2 colunas no celular e flex-wrap fluido no desktop
 */
export function HeroDynamicController({
  activeIndex,
  onSelect,
  progress,
  isPaused,
  onMouseEnter,
  onMouseLeave,
}: HeroDynamicControllerProps) {
  return (
    <div
      className="w-full pt-1"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-2.5 items-center">
        {DYNAMIC_FEATURES.map((item, idx) => {
          const isActive = idx === activeIndex;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(idx)}
              onMouseEnter={() => onSelect(idx)}
              className={`group relative flex items-center justify-start gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-mono font-medium transition-all duration-300 cursor-pointer overflow-hidden border text-left ${
                isActive
                  ? "bg-slate-900/90 dark:bg-white/[0.08] text-white border-emerald-500/50 shadow-[0_0_16px_rgba(16,185,129,0.2)] scale-[1.01]"
                  : "bg-slate-100/80 hover:bg-slate-200/80 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] text-slate-600 dark:text-slate-400 border-slate-300/80 dark:border-white/[0.08]"
              }`}
            >
              {/* Barra de Progresso de Auto-Ciclo no Botão Ativo */}
              {isActive && (
                <div
                  className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all ease-linear"
                  style={{
                    width: `${isPaused ? 100 : progress * 100}%`,
                  }}
                />
              )}

              <Icon
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 transition-colors ${
                  isActive
                    ? "text-emerald-400"
                    : "text-slate-400 dark:text-slate-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400"
                }`}
              />

              <span className="truncate">{item.pillLabel}</span>

              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0 ml-auto shadow-[0_0_6px_#34D399]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Detalhe de Prova Documental da Pílula Ativa (Skiper 6 Micro-Detail) */}
      <div className="min-h-[28px] mt-2 flex items-center gap-2 text-xs">
        <AnimatePresence mode="wait">
          <motion.div
            key={DYNAMIC_FEATURES[activeIndex].id}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.18 }}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-mono text-[10.5px] sm:text-[11px] font-semibold border border-emerald-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block shrink-0" />
              {DYNAMIC_FEATURES[activeIndex].badgeLabel}
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-[11px] sm:text-[11.5px] font-sans">
              {DYNAMIC_FEATURES[activeIndex].detail}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Hook para gerenciar auto-ciclo e estado ativo
 */
export function useHeroDynamicCycle() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % DYNAMIC_FEATURES.length);
    setProgress(0);
    startTimeRef.current = null;
  }, []);

  const selectSlide = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
    startTimeRef.current = null;
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const currentProgress = Math.min(1, elapsed / CYCLE_DURATION_MS);
      setProgress(currentProgress);

      if (elapsed >= CYCLE_DURATION_MS) {
        nextSlide();
      } else {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPaused, nextSlide, activeIndex]);

  return {
    activeIndex,
    selectSlide,
    progress,
    isPaused,
    pause: () => setIsPaused(true),
    resume: () => {
      startTimeRef.current = null;
      setIsPaused(false);
    },
  };
}

interface HeroDynamicHeadlineProps {
  activeIndex: number;
}

/**
 * Frase Animada do H1 com Transição Fluida e Zero Gap Visual
 */
export function HeroDynamicHeadline({ activeIndex }: HeroDynamicHeadlineProps) {
  const current = DYNAMIC_FEATURES[activeIndex];

  return (
    <span className="relative inline font-serif italic text-emerald-600 dark:text-emerald-400 underline decoration-emerald-500/40 decoration-wavy decoration-1 underline-offset-4">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={current.id}
          initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(2px)", position: "absolute" }}
          transition={{
            duration: 0.28,
            ease: "easeOut",
          }}
          className="inline"
        >
          {current.headlinePhrase}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
