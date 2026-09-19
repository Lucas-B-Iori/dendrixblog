"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "motion/react";

/**
 * HERO_KNOT_PATH (Skiper 19 Autêntico — Nó de Laços da Hero Desktop):
 * Coordenadas cúbicas idênticas ao componente oficial Skiper 19 (viewBox 1440 x 10000),
 * posicionadas na metade direita e centro da Hero (X: 490 a 1280, Y: 15 a 750).
 */
const HERO_KNOT_PATH = `
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
  C 947.6 620.0, 990.0 680.0, 953.8 750.0
`;

/**
 * SPINE_SCROLL_PATH (A Continuação Serpentina pelo Site Inteiro - Desktop):
 * Conecta exatamente na saída do nó da Hero (953.8, 750.0) e viaja
 * através de todas as seções até ancorar no botão final de demonstração.
 */
const SPINE_SCROLL_PATH = `
  M 953.8 750.0
  C 880.0 1020.0, 320.0 1150.0, 220.0 1350.0
  C 140.0 1500.0, 220.0 1650.0, 480.0 1720.0
  C 650.0 1780.0, 850.0 1750.0, 720.0 1900.0
  C 600.0 2050.0, 1200.0 2180.0, 1150.0 2450.0
  C 1100.0 2700.0, 420.0 2650.0, 550.0 2900.0
  C 650.0 3100.0, 850.0 3150.0, 720.0 3300.0
  C 820.0 3500.0, 1340.0 3650.0, 1260.0 3950.0
  C 1180.0 4250.0, 220.0 4200.0, 340.0 4450.0
  C 450.0 4680.0, 780.0 4650.0, 680.0 4850.0
  C 580.0 5050.0, 1280.0 5150.0, 1150.0 5400.0
  C 1020.0 5650.0, 280.0 5620.0, 450.0 5900.0
  C 620.0 6150.0, 1260.0 6250.0, 1120.0 6550.0
  C 980.0 6850.0, 240.0 6800.0, 300.0 7100.0
  C 360.0 7400.0, 1220.0 7350.0, 1050.0 7650.0
  C 880.0 7950.0, 340.0 7900.0, 520.0 8200.0
  C 700.0 8450.0, 1240.0 8550.0, 1080.0 8850.0
  C 920.0 9100.0, 380.0 9050.0, 520.0 9300.0
  C 650.0 9450.0, 880.0 9500.0, 780.0 9700.0
  C 720.0 9850.0, 720.0 9920.0, 720.0 9970.0
`;

/**
 * MOBILE_HERO_KNOT_PATH (Fita Fluida da Hero Mobile — ViewBox 390 x 10000):
 * Fita luminosa elegante que emoldura o canto superior direito da Hero sem cobrir o texto.
 */
const MOBILE_HERO_KNOT_PATH = `
  M 370 100
  C 330 180, 260 220, 290 320
  C 320 420, 380 400, 370 520
  C 360 640, 330 720, 370 780
`;

/**
 * MOBILE_SPINE_SCROLL_PATH (Espinha Dorsal Fluida Mobile — ViewBox 390 x 10000):
 * Serpenteia pelas margens de respiro (X: 18 e X: 372) e cruza suavemente
 * apenas nos vãos entre seções, garantindo 100% de legibilidade do texto no celular.
 */
const MOBILE_SPINE_SCROLL_PATH = `
  M 370 780
  C 375 950, 375 1150, 370 1280
  C 350 1340, 50 1360, 20 1440
  C 15 1600, 15 1750, 20 1880
  C 40 1960, 340 1980, 370 2100
  C 375 2350, 375 2600, 370 2800
  C 340 2900, 50 2950, 20 3100
  C 15 3400, 15 3800, 20 4100
  C 50 4250, 340 4300, 370 4450
  C 375 4800, 375 5200, 370 5500
  C 340 5650, 50 5700, 20 5850
  C 15 6200, 15 6600, 20 6900
  C 50 7050, 340 7100, 370 7250
  C 375 7600, 375 8100, 370 8500
  C 340 8650, 50 8700, 20 8900
  C 15 9200, 15 9500, 20 9650
  C 40 9750, 195 9850, 195 9970
`;

interface Milestone {
  id: string;
  x: number;
  y: number;
}

const DESKTOP_MILESTONES: Milestone[] = [
  { id: "hero", x: 954, y: 750 },
  { id: "caos", x: 220, y: 1350 },
  { id: "loop", x: 1150, y: 2450 },
  { id: "cockpit", x: 1260, y: 3950 },
  { id: "mesa", x: 1150, y: 5400 },
  { id: "redator", x: 1120, y: 6550 },
  { id: "especialidades", x: 1050, y: 7650 },
  { id: "seguranca", x: 1080, y: 8850 },
  { id: "agendamento", x: 720, y: 9970 },
];

const MOBILE_MILESTONES: Milestone[] = [
  { id: "hero", x: 370, y: 780 },
  { id: "caos", x: 20, y: 1440 },
  { id: "loop", x: 370, y: 2100 },
  { id: "cockpit", x: 20, y: 3100 },
  { id: "mesa", x: 370, y: 4450 },
  { id: "redator", x: 20, y: 5850 },
  { id: "prazos", x: 370, y: 7250 },
  { id: "especialidades", x: 370, y: 8500 },
  { id: "seguranca", x: 20, y: 8900 },
  { id: "agendamento", x: 195, y: 9970 },
];

/**
 * ContinuousPageSpine (Skiper 19 — Liquid Fluid Edition)
 * A fita contínua em SVG oficial:
 * 1. O nó de laços orgânico autêntico do Skiper 19 visível na Hero no topo.
 * 2. O desdobramento serpentino que percorre toda a extensão vertical do site no scroll.
 * 3. Design líquido: traço espesso de vidro com mercúrio líquido, gradiente esmeralda fluido,
 *    filete especular 3D de luz e pulso laser que viaja na cabeça de onda.
 * 4. Responsividade total: versão desktop (1440x10000) e versão mobile dedicada (390x10000).
 * 5. Camada z-[2] para manter os textos, botões e cards (z-10+) sempre nítidos e desobstruídos.
 */
export function ContinuousPageSpine() {
  const { scrollYProgress } = useScroll();
  const spineRefDesktop = useRef<SVGPathElement | null>(null);
  const spineRefMobile = useRef<SVGPathElement | null>(null);

  const [desktopBeadPos, setDesktopBeadPos] = useState({ x: 954, y: 750 });
  const [mobileBeadPos, setMobileBeadPos] = useState({ x: 240, y: 780 });
  const [desktopTotalLen, setDesktopTotalLen] = useState(10000);
  const [mobileTotalLen, setMobileTotalLen] = useState(10000);

  // Mola inercial suave para animação sem estalo de layout
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    restDelta: 0.0005,
  });

  // A espinha do site desdobra de 0 a 1 conforme rola
  const spineScrollLength = useTransform(smoothProgress, [0.02, 0.98], [0.0, 1.0]);

  useEffect(() => {
    if (spineRefDesktop.current) {
      const len = spineRefDesktop.current.getTotalLength();
      setDesktopTotalLen(len);
      const pt = spineRefDesktop.current.getPointAtLength(0);
      setDesktopBeadPos({ x: pt.x, y: pt.y });
    }
    if (spineRefMobile.current) {
      const len = spineRefMobile.current.getTotalLength();
      setMobileTotalLen(len);
      const pt = spineRefMobile.current.getPointAtLength(0);
      setMobileBeadPos({ x: pt.x, y: pt.y });
    }
  }, []);

  useMotionValueEvent(spineScrollLength, "change", (latest) => {
    const clamped = Math.max(0, Math.min(1, latest));

    if (spineRefDesktop.current && desktopTotalLen > 0) {
      const pt = spineRefDesktop.current.getPointAtLength(desktopTotalLen * clamped);
      setDesktopBeadPos({ x: pt.x, y: pt.y });
    }
    if (spineRefMobile.current && mobileTotalLen > 0) {
      const pt = spineRefMobile.current.getPointAtLength(mobileTotalLen * clamped);
      setMobileBeadPos({ x: pt.x, y: pt.y });
    }
  });

  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none z-[2] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ============================================================ */}
      {/* 1. VERSÃO DESKTOP (VIEWBOX 1440 x 10000) — md:block          */}
      {/* ============================================================ */}
      <svg
        className="w-full h-full hidden md:block"
        viewBox="0 0 1440 10000"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          {/* GRADIENTE LÍQUIDO NO MODO ESCURO (Esmeralda Vibrante, Menta & Ciano) */}
          <linearGradient id="liquid-grad-dark" x1="0" y1="0" x2="0" y2="10000" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="6%" stopColor="#34D399" />
            <stop offset="15%" stopColor="#4ADE80" />
            <stop offset="35%" stopColor="#06B6D4" />
            <stop offset="55%" stopColor="#10B981" />
            <stop offset="75%" stopColor="#34D399" />
            <stop offset="90%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          {/* GRADIENTE LÍQUIDO NO MODO CLARO (Esmeralda Nobre e Floresta de Alto Contraste - ZERO VERMELHO) */}
          <linearGradient id="liquid-grad-light" x1="0" y1="0" x2="0" y2="10000" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="10%" stopColor="#059669" />
            <stop offset="25%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#047857" />
            <stop offset="75%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* FILTRO DE BRILHO NEON LÍQUIDO */}
          <filter id="liquid-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* NÓ DA HERO DESKTOP (SKIPER 19 AUTÊNTICO — 100% VISÍVEL NO TOPO) */}
        <motion.path
          d={HERO_KNOT_PATH}
          stroke="url(#liquid-grad-dark)"
          strokeWidth="34"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#liquid-glow)"
          opacity="0.30"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="hidden dark:block"
        />

        <motion.path
          d={HERO_KNOT_PATH}
          stroke="url(#liquid-grad-dark)"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="hidden dark:block"
        />

        <motion.path
          d={HERO_KNOT_PATH}
          stroke="url(#liquid-grad-light)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="block dark:hidden"
        />

        <motion.path
          d={HERO_KNOT_PATH}
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          opacity="0.75"
        />

        {/* GUIA PONTILHADA DE FUNDO DESKTOP */}
        <path
          d={SPINE_SCROLL_PATH}
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="6 10"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-300/60 dark:text-white/[0.08]"
        />

        {/* HALO DE BRILHO DA FITA DESKTOP */}
        <motion.path
          d={SPINE_SCROLL_PATH}
          stroke="url(#liquid-grad-dark)"
          strokeWidth="34"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#liquid-glow)"
          opacity="0.25"
          style={{ pathLength: spineScrollLength }}
          className="hidden dark:block"
        />

        {/* TUBO LÍQUIDO CENTRAL DESKTOP (MODO ESCURO) */}
        <motion.path
          ref={spineRefDesktop}
          d={SPINE_SCROLL_PATH}
          stroke="url(#liquid-grad-dark)"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: spineScrollLength }}
          className="hidden dark:block"
        />

        {/* TUBO LÍQUIDO CENTRAL DESKTOP (MODO CLARO) */}
        <motion.path
          d={SPINE_SCROLL_PATH}
          stroke="url(#liquid-grad-light)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: spineScrollLength }}
          className="block dark:hidden"
        />

        {/* FILETE ESPECULAR 3D DESKTOP */}
        <motion.path
          d={SPINE_SCROLL_PATH}
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: spineScrollLength }}
          opacity="0.75"
        />

        {/* CABEÇA DE FEIXE LASER DESKTOP */}
        <g transform={`translate(${desktopBeadPos.x}, ${desktopBeadPos.y})`}>
          <circle r="40" className="fill-emerald-500/20 dark:fill-emerald-400/25 animate-ping" />
          <circle r="20" className="fill-emerald-500/35 dark:fill-emerald-400/40 blur-xs" />
          <circle r="8" className="fill-white dark:fill-emerald-100 stroke-2 stroke-emerald-600 dark:stroke-emerald-400" />
        </g>

        {/* NÓS DE MARCO DESKTOP */}
        {DESKTOP_MILESTONES.map((m) => (
          <g key={m.id} transform={`translate(${m.x}, ${m.y})`}>
            <circle
              r="12"
              className="fill-white dark:fill-[#05080C] stroke-3 stroke-emerald-600 dark:stroke-emerald-400 shadow-md"
            />
            <circle
              r="5"
              className="fill-emerald-600 dark:fill-emerald-400"
            />
          </g>
        ))}
      </svg>

      {/* ============================================================ */}
      {/* 2. VERSÃO MOBILE DEDICADA (VIEWBOX 390 x 10000) — md:hidden   */}
      {/* ============================================================ */}
      <svg
        className="w-full h-full block md:hidden"
        viewBox="0 0 390 10000"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="liquid-grad-mobile-dark" x1="0" y1="0" x2="0" y2="10000" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="25%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="75%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>

          <linearGradient id="liquid-grad-mobile-light" x1="0" y1="0" x2="0" y2="10000" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="30%" stopColor="#059669" />
            <stop offset="70%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <filter id="liquid-glow-mobile" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* NÓ DA HERO MOBILE (SUAVE NO BACKGROUND) */}
        <motion.path
          d={MOBILE_HERO_KNOT_PATH}
          stroke="url(#liquid-grad-mobile-dark)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#liquid-glow-mobile)"
          opacity="0.25"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="hidden dark:block"
        />

        <motion.path
          d={MOBILE_HERO_KNOT_PATH}
          stroke="url(#liquid-grad-mobile-dark)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          opacity="0.8"
          className="hidden dark:block"
        />

        <motion.path
          d={MOBILE_HERO_KNOT_PATH}
          stroke="url(#liquid-grad-mobile-light)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          opacity="0.75"
          className="block dark:hidden"
        />

        <motion.path
          d={MOBILE_HERO_KNOT_PATH}
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          opacity="0.7"
        />

        {/* GUIA PONTILHADA DE FUNDO MOBILE */}
        <path
          d={MOBILE_SPINE_SCROLL_PATH}
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-300/50 dark:text-white/[0.06]"
        />

        {/* TUBO LÍQUIDO MOBILE (MODO ESCURO) */}
        <motion.path
          ref={spineRefMobile}
          d={MOBILE_SPINE_SCROLL_PATH}
          stroke="url(#liquid-grad-mobile-dark)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#liquid-glow-mobile)"
          style={{ pathLength: spineScrollLength }}
          opacity="0.85"
          className="hidden dark:block"
        />

        {/* TUBO LÍQUIDO MOBILE (MODO CLARO) */}
        <motion.path
          d={MOBILE_SPINE_SCROLL_PATH}
          stroke="url(#liquid-grad-mobile-light)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: spineScrollLength }}
          opacity="0.8"
          className="block dark:hidden"
        />

        {/* FILETE ESPECULAR 3D MOBILE */}
        <motion.path
          d={MOBILE_SPINE_SCROLL_PATH}
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: spineScrollLength }}
          opacity="0.7"
        />

        {/* CABEÇA DE FEIXE LASER MOBILE */}
        <g transform={`translate(${mobileBeadPos.x}, ${mobileBeadPos.y})`}>
          <circle r="22" className="fill-emerald-500/20 dark:fill-emerald-400/25 animate-ping" />
          <circle r="12" className="fill-emerald-500/35 dark:fill-emerald-400/40 blur-xs" />
          <circle r="5" className="fill-white dark:fill-emerald-100 stroke-2 stroke-emerald-600 dark:stroke-emerald-400" />
        </g>

        {/* NÓS DE MARCO MOBILE */}
        {MOBILE_MILESTONES.map((m) => (
          <g key={m.id} transform={`translate(${m.x}, ${m.y})`}>
            <circle
              r="7"
              className="fill-white dark:fill-[#05080C] stroke-2 stroke-emerald-600 dark:stroke-emerald-400 shadow-sm"
            />
            <circle
              r="3"
              className="fill-emerald-600 dark:fill-emerald-400"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
