"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "motion/react";

interface Milestone {
  id: string;
  percent: number; // 0 to 100
  x: number;       // x coordinate on 1440 width
  y: number;       // y coordinate on 10000 height
  label: string;
  step: string;
}

// 9 Marcos processuais situados exatamente onde a fita serpentina cruza cada seção
const MILESTONES: Milestone[] = [
  { id: "hero", percent: 1.5, x: 954, y: 562, label: "Cockpit Inicial", step: "00" },
  { id: "caos", percent: 14, x: 220, y: 1450, label: "Diagnóstico Operacional", step: "01" },
  { id: "loop", percent: 25, x: 1150, y: 2450, label: "Loop do Processo", step: "02" },
  { id: "cockpit", percent: 36, x: 1260, y: 3550, label: "Digital Twin", step: "03" },
  { id: "mesa", percent: 48, x: 1150, y: 5050, label: "Mesa Jurídica & OCR", step: "04" },
  { id: "redator", percent: 60, x: 1120, y: 6200, label: "Redator Assistido", step: "05" },
  { id: "especialidades", percent: 72, x: 300, y: 7100, label: "11 Áreas & Tribunais", step: "06" },
  { id: "seguranca", percent: 84, x: 1050, y: 8650, label: "Blindagem de Dados", step: "07" },
  { id: "agendamento", percent: 98, x: 720, y: 9950, label: "Demonstração ao Vivo", step: "08" },
];

/**
 * Trajeto SVG Completo (Skiper 19 Autêntico + Continuação Serpentina):
 * 1. Na Hero (Y: 0 a 780): Laços e emaranhado orgânico idêntico ao Skiper 19 oficial.
 * 2. Pelo resto do site (Y: 780 a 10000): Fita serpentina contínua conectando todas as 9 seções.
 */
const FULL_SPINE_PATH = `
  M 876.6 394.1
  C 789.0 335.9, 696.2 358.1, 691.8 416.3
  C 685.5 501.4, 853.7 498.4, 942.0 409.7
  C 1016.1 335.2, 1008.6 186.9, 906.2 142.8
  C 807.0 100.2, 712.7 198.5, 789.0 245.1
  C 889.1 306.2, 986.1 117.0, 840.5 43.3
  C 743.9 -5.6, 678.0 57.2, 672.3 112.2
  C 666.5 167.2, 712.5 172.9, 736.4 163.1
  C 760.2 153.2, 764.1 120.9, 746.7 93.4
  C 717.5 47.4, 638.9 77.9, 601.0 117.0
  C 568.2 150.9, 557.0 201.1, 576.5 246.9
  C 593.3 286.7, 630.2 310.6, 671.7 302.6
  C 756.1 286.4, 729.7 206.5, 681.9 186.4
  C 630.5 164.9, 492.0 209.3, 495.0 287.6
  C 496.8 334.5, 518.4 366.5, 582.5 367.3
  C 680.0 368.5, 771.5 299.5, 898.6 292.4
  C 1007.0 286.4, 1192.7 309.4, 1242.4 382.3
  C 1267.0 418.4, 1273.7 443.1, 1247.8 474.5
  C 1217.3 511.3, 1149.4 511.3, 1096.8 466.1
  C 1044.3 420.9, 1029.1 380.6, 1034.0 324.2
  C 1038.3 273.4, 1069.6 229.0, 1117.2 216.4
  C 1152.2 207.1, 1188.3 213.6, 1194.5 245.1
  C 1201.5 281.1, 1132.2 280.1, 1100.4 272.7
  C 1065.3 264.5, 1044.2 234.8, 1032.8 201.4
  C 1019.3 162.1, 1029.7 131.1, 1056.4 101.0
  C 1086.2 67.4, 1144.0 54.6, 1175.8 86.2
  C 1207.0 117.2, 1186.8 143.4, 1156.2 166.7
  C 1112.6 200.0, 1052.6 186.2, 999.8 155.2
  C 957.3 130.2, 899.2 63.7, 931.3 26.3
  C 952.1 2.1, 996.3 3.9, 1007.2 43.6
  C 1018.2 83.3, 1003.6 122.6, 976.0 163.4
  C 948.4 204.1, 907.3 255.1, 913.6 321.0
  C 919.7 385.7, 991.0 497.1, 1063.8 503.4
  C 1111.5 507.5, 1166.8 512.0, 1175.7 464.5
  C 1191.5 380.0, 1101.3 335.0, 1030.3 377.0
  C 971.1 412.1, 956.3 483.6, 953.8 561.7
  C 947.6 755.4, 1197.6 880.0, 980.0 1020.0
  C 720.0 1180.0, 180.0 1280.0, 220.0 1450.0
  C 260.0 1620.0, 520.0 1680.0, 720.0 1850.0
  C 920.0 2020.0, 1220.0 2150.0, 1150.0 2450.0
  C 1080.0 2750.0, 480.0 2680.0, 620.0 2950.0
  C 760.0 3220.0, 1340.0 3300.0, 1260.0 3550.0
  C 1180.0 3800.0, 220.0 3820.0, 320.0 4120.0
  C 420.0 4420.0, 820.0 4350.0, 680.0 4600.0
  C 540.0 4850.0, 1260.0 4780.0, 1150.0 5050.0
  C 1040.0 5320.0, 320.0 5300.0, 520.0 5580.0
  C 720.0 5860.0, 1260.0 5920.0, 1120.0 6200.0
  C 980.0 6480.0, 240.0 6550.0, 300.0 7100.0
  C 360.0 7650.0, 1220.0 7350.0, 1050.0 7750.0
  C 880.0 8150.0, 360.0 8250.0, 580.0 8550.0
  C 800.0 8850.0, 1200.0 8500.0, 1050.0 8900.0
  C 900.0 9300.0, 420.0 9250.0, 580.0 9550.0
  C 740.0 9850.0, 720.0 9750.0, 720.0 9950.0
`;

/**
 * ContinuousPageSpine (Fusão Flagship V5 — Skiper 19 + Acabamento Líquido de Luxo)
 * Incorpora o emaranhado original do Skiper 19 na Hero e desenrola em uma fita serpentina
 * por todas as seções até a demonstração final, com tripla camada de tubo de vidro luminoso.
 */
export function ContinuousPageSpine() {
  const { scrollYProgress } = useScroll();
  const pathRef = useRef<SVGPathElement | null>(null);
  const [beadPos, setBeadPos] = useState({ x: 954, y: 562 });
  const [pathTotalLength, setPathTotalLength] = useState(10000);

  // Mola inercial suave para animação sem estalo de layout
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    restDelta: 0.0005,
  });

  // No scroll 0, o emaranhado da Hero já começa revelado (0.10) e atinge 1.0 no final
  const pathLength = useTransform(smoothProgress, [0, 1], [0.10, 1.0]);

  // Medição do comprimento exato da fita e rastreamento da cabeça de onda
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setPathTotalLength(len);
      const initialPt = pathRef.current.getPointAtLength(len * 0.10);
      setBeadPos({ x: initialPt.x, y: initialPt.y });
    }
  }, []);

  useMotionValueEvent(pathLength, "change", (latest) => {
    if (!pathRef.current || pathTotalLength <= 0) return;
    const clamped = Math.max(0, Math.min(1, latest));
    const pt = pathRef.current.getPointAtLength(pathTotalLength * clamped);
    setBeadPos({ x: pt.x, y: pt.y });
  });

  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full block"
        viewBox="0 0 1440 10000"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {/* Gradiente do Feixe Líquido (Modo Escuro: Esmeralda Neon para Ciano Profundo) */}
          <linearGradient id="spine-grad-dark" x1="0" y1="0" x2="0" y2="10000" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.85" />
            <stop offset="8%" stopColor="#34D399" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#0284C7" stopOpacity="0.90" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.88" />
            <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="1.0" />
          </linearGradient>

          {/* Gradiente do Feixe Líquido (Modo Claro: Esmeralda Profundo para Azul Marinho Executivo) */}
          <linearGradient id="spine-grad-light" x1="0" y1="0" x2="0" y2="10000" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#047857" stopOpacity="0.80" />
            <stop offset="8%" stopColor="#0F2B48" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#0284C7" stopOpacity="0.80" />
            <stop offset="50%" stopColor="#047857" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#0F2B48" stopOpacity="0.80" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.90" />
          </linearGradient>

          {/* Filtro Neon Glow de Alta Dispersão */}
          <filter id="spine-bloom-dark" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* TRILHO 0: Guia pontilhada inerte de fundo percorrendo toda a fita */}
        <path
          d={FULL_SPINE_PATH}
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="8 12"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-300/40 dark:text-white/[0.04]"
        />

        {/* CAMADA 1: Halo de Brilho Difuso (Glow) no Modo Escuro */}
        <motion.path
          d={FULL_SPINE_PATH}
          stroke="url(#spine-grad-dark)"
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength }}
          filter="url(#spine-bloom-dark)"
          opacity="0.22"
          className="hidden dark:block"
        />

        {/* CAMADA 2: Núcleo do Tubo de Vidro Líquido (Modo Escuro) */}
        <motion.path
          ref={pathRef}
          d={FULL_SPINE_PATH}
          stroke="url(#spine-grad-dark)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength }}
          className="hidden dark:block"
        />

        {/* CAMADA 2 (Claro): Núcleo do Tubo de Vidro Líquido (Modo Claro) */}
        <motion.path
          d={FULL_SPINE_PATH}
          stroke="url(#spine-grad-light)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength }}
          className="block dark:hidden"
        />

        {/* CAMADA 3: Filete Especular 3D de Luz Superior (Efeito Cilindro de Vidro) */}
        <motion.path
          d={FULL_SPINE_PATH}
          stroke="rgba(255, 255, 255, 0.75)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength }}
          opacity="0.6"
          className="hidden dark:block"
        />

        {/* CABEÇA DE ONDA: Pulso Laser Ativo que Corre na Ponta da Fita */}
        <g transform={`translate(${beadPos.x}, ${beadPos.y})`}>
          {/* Anel de Radar */}
          <circle r="36" className="fill-emerald-500/15 dark:fill-emerald-400/20 animate-ping" />
          {/* Brilho Médio */}
          <circle r="18" className="fill-emerald-500/30 dark:fill-emerald-400/40 blur-xs" />
          {/* Núcleo Hiperbrilhante */}
          <circle r="7" className="fill-white dark:fill-emerald-200 stroke-2 stroke-emerald-600 dark:stroke-emerald-400 shadow-[0_0_20px_#34D399]" />
        </g>

        {/* NÓS DE MARCO: Pontos Luminosos pelas 9 Seções */}
        {MILESTONES.map((m) => {
          const threshold = m.percent / 100;
          return (
            <g key={m.id} transform={`translate(${m.x}, ${m.y})`}>
              <circle
                r="10"
                className="fill-slate-100 dark:fill-[#05080C] stroke-2 stroke-emerald-600 dark:stroke-emerald-400"
              />
              <circle
                r="4"
                className="fill-emerald-500 dark:fill-emerald-300"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
