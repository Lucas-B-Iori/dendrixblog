"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

interface SvgScrollPathProps {
  className?: string;
  stepCount?: number;
  activeStep?: number;
}

/**
 * SvgScrollPath (Inspirado em Skiper 19 / Svg follow scroll)
 * Linha vetorial dinâmica que se desenha acompanhando o progresso vertical do scroll,
 * conectando marcos e acendendo pontos de luz forense na esteira do caso.
 */
export function SvgScrollPath({
  className = "",
  stepCount = 4,
}: SvgScrollPathProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.4"],
  });

  const pathProgress = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      ref={containerRef}
      className={`relative w-12 flex flex-col items-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* SVG Canvas da linha guia */}
      <svg
        className="w-full h-full"
        viewBox="0 0 40 400"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Linha de fundo translúcida inerte */}
        <path
          d="M 20 0 L 20 400"
          stroke="currentColor"
          strokeWidth="2"
          className="text-slate-200 dark:text-slate-800"
          strokeDasharray="4 4"
        />

        {/* Linha viva animada pelo scroll */}
        <motion.path
          d="M 20 0 L 20 400"
          stroke="url(#scrollGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: pathProgress }}
        />

        <defs>
          <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F2B48" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>

      {/* Nós luminosos posicionados ao longo do caminho */}
      {Array.from({ length: stepCount }).map((_, idx) => {
        const threshold = idx / (stepCount - 1);
        return (
          <ScrollNode
            key={idx}
            index={idx}
            progress={pathProgress}
            threshold={threshold}
            total={stepCount}
          />
        );
      })}
    </div>
  );
}

interface ScrollNodeProps {
  index: number;
  progress: any;
  threshold: number;
  total: number;
}

function ScrollNode({ index, progress, threshold, total }: ScrollNodeProps) {
  const topPercent = (index / (total - 1)) * 94 + 3; // de 3% a 97%
  const scale = useTransform(
    progress,
    [Math.max(0, threshold - 0.08), threshold, Math.min(1, threshold + 0.08)],
    [0.7, 1.25, 1]
  );
  const opacity = useTransform(
    progress,
    [Math.max(0, threshold - 0.05), threshold],
    [0.3, 1]
  );

  return (
    <motion.div
      style={{
        top: `${topPercent}%`,
        scale,
        opacity,
      }}
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-[#07131F] border-2 border-[#10B981] flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.35)]"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
    </motion.div>
  );
}
