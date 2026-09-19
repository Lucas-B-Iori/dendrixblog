"use client";

import React from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "motion/react";

interface Milestone {
  id: string;
  percent: number; // 0 to 100
  label: string;
  step: string;
}

const MILESTONES: Milestone[] = [
  { id: "hero", percent: 1.5, label: "Cockpit Inicial", step: "00" },
  { id: "caos", percent: 10, label: "Diagnóstico Operacional", step: "01" },
  { id: "loop", percent: 21, label: "Loop do Processo", step: "02" },
  { id: "cockpit", percent: 34, label: "Digital Twin", step: "03" },
  { id: "mesa", percent: 47, label: "Mesa Jurídica & OCR", step: "04" },
  { id: "redator", percent: 60, label: "Redator Assistido", step: "05" },
  { id: "especialidades", percent: 73, label: "11 Áreas & Tribunais", step: "06" },
  { id: "seguranca", percent: 86, label: "Blindagem de Dados", step: "07" },
  { id: "agendamento", percent: 97, label: "Demonstração ao Vivo", step: "08" },
];

function MilestoneNode({
  milestone,
  smoothProgress,
}: {
  milestone: Milestone;
  smoothProgress: MotionValue<number>;
}) {
  const threshold = milestone.percent / 100;
  // Ativação quando o scroll atinge o marco
  const isActive = useTransform(smoothProgress, (val) => val >= threshold);
  const coreScale = useTransform(smoothProgress, (val) =>
    val >= threshold ? 1.25 : 0.8
  );
  const ringOpacity = useTransform(smoothProgress, (val) =>
    val >= threshold ? 1 : 0.2
  );

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-10 flex items-center"
      style={{ top: `${milestone.percent}%` }}
    >
      {/* Ponto Circular de Marco com Pulso */}
      <motion.div
        style={{ scale: coreScale }}
        className="relative flex items-center justify-center w-5 h-5 rounded-full"
      >
        {/* Halo de expansão quando ativo */}
        <motion.span
          style={{ opacity: ringOpacity }}
          className="absolute inset-0 rounded-full bg-emerald-500/20 dark:bg-emerald-400/20 border border-emerald-500/40 dark:border-emerald-400/40"
        />
        {/* Núcleo do nó */}
        <span className="w-2 h-2 rounded-full bg-white dark:bg-[#05080C] border-2 border-emerald-600 dark:border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
      </motion.div>

      {/* Rótulo Flutuante no Desktop (Alternando Esquerda / Direita para Equilíbrio) */}
      <motion.div
        style={{ opacity: ringOpacity }}
        className={`hidden xl:flex items-center gap-2 absolute whitespace-nowrap px-2.5 py-1 rounded-full border backdrop-blur-md transition-all duration-300 ${
          milestone.percent % 2 === 0
            ? "left-6 bg-white/80 dark:bg-[#070D14]/80 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
            : "right-6 flex-row-reverse bg-white/80 dark:bg-[#070D14]/80 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
        }`}
      >
        <span className="font-mono text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
          {milestone.step}
        </span>
        <span className="text-[10px] font-medium tracking-tight">
          {milestone.label}
        </span>
      </motion.div>
    </div>
  );
}

/**
 * ContinuousPageSpine (V5 Flagship Feature — Inspirado em Skiper 19)
 * Espinha dorsal contínua vetorial que percorre a landing page inteira em background,
 * desenhando-se fisicamente no scroll via SVG, acendendo marcos processuais e
 * conduzindo o feixe fluido da Hero até o botão de fechamento.
 */
export function ContinuousPageSpine() {
  const { scrollYProgress } = useScroll();

  // Mola inercial luxuosa para desenho suave e sem estalo
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.0005,
  });

  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* SVG Canvas da Linha Contínua */}
      <svg
        className="w-full h-full block"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {/* Gradiente do Feixe no Modo Escuro */}
          <linearGradient id="spine-gradient-dark" x1="0" y1="0" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#0284C7" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="1" />
          </linearGradient>

          {/* Gradiente do Feixe no Modo Claro */}
          <linearGradient id="spine-gradient-light" x1="0" y1="0" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#047857" stopOpacity="0.75" />
            <stop offset="30%" stopColor="#0F2B48" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#0284C7" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.85" />
          </linearGradient>

          {/* Filtro de Brilho Neon para o Traço */}
          <filter id="spine-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Trilho Inerte de Fundo (Traço Pontilhado Guia) */}
        <line
          x1="50"
          y1="0"
          x2="50"
          y2="1000"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="4 4"
          className="text-slate-200/80 dark:text-white/[0.05]"
        />

        {/* Linha Ativa Desenrolada no Scroll (Modo Escuro) */}
        <motion.path
          d="M 50 0 L 50 1000"
          stroke="url(#spine-gradient-dark)"
          strokeWidth="1.2"
          strokeLinecap="round"
          style={{ pathLength: smoothProgress }}
          filter="url(#spine-glow)"
          className="hidden dark:block"
        />

        {/* Linha Ativa Desenrolada no Scroll (Modo Claro) */}
        <motion.path
          d="M 50 0 L 50 1000"
          stroke="url(#spine-gradient-light)"
          strokeWidth="1.2"
          strokeLinecap="round"
          style={{ pathLength: smoothProgress }}
          className="block dark:hidden"
        />
      </svg>

      {/* Cabeça do Feixe: Pulso Laser que Viaja na Ponta da Linha */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* Anel de dispersão */}
          <span className="absolute w-8 h-8 rounded-full bg-emerald-500/20 dark:bg-emerald-400/25 animate-ping" />
          {/* Brilho médio */}
          <span className="absolute w-5 h-5 rounded-full bg-emerald-500/30 dark:bg-emerald-400/40 blur-xs" />
          {/* Ponto central hiperbrilhante */}
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 shadow-[0_0_12px_#34D399]" />
        </div>
      </motion.div>

      {/* Nodos de Marco ao Longo de Toda a Página */}
      {MILESTONES.map((milestone) => (
        <MilestoneNode
          key={milestone.id}
          milestone={milestone}
          smoothProgress={smoothProgress}
        />
      ))}
    </div>
  );
}
