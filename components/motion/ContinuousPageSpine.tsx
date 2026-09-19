"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "motion/react";

/**
 * HERO_KNOT_PATH (Skiper 19 Autêntico — Nó de Laços da Hero Desktop):
 * Coordenadas cúbicas idênticas ao componente oficial Skiper 19 (viewBox 1440 x 10000),
 * posicionadas na metade direita e centro da Hero (X: 490 a 1280, Y: 15 a 750).
 */
const HERO_KNOT_PATH = `
  M 1260.0 60.0
  C 1360.0 160.0, 1340.0 320.0, 1180.0 360.0
  C 960.0 410.0, 800.0 200.0, 920.0 100.0
  C 1060.0 0.0, 1220.0 120.0, 1140.0 280.0
  C 1040.0 480.0, 860.0 520.0, 920.0 640.0
  C 950.0 700.0, 970.0 710.0, 953.8 750.0
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
 * MOBILE_HERO_KNOT_PATH (Fita Fluida da Hero Mobile — Margem Segura):
 * Corre discretamente na margem direita de respiro (X: 382) sem invadir o texto central.
 */
const MOBILE_HERO_KNOT_PATH = `
  M 382 80
  C 384 220, 380 400, 382 560
  C 384 660, 380 720, 382 780
`;

/**
 * MOBILE_SPINE_SCROLL_PATH (Espinha Dorsal Fluida Mobile — ViewBox 390 x 10000):
 * Percorre a margem direita segura (X: 382) em ondas orgânicas suaves,
 * mantendo 100% de legibilidade e garantindo zero colisão com textos ou cards no celular.
 */
const MOBILE_SPINE_SCROLL_PATH = `
  M 382 780
  C 380 1400, 384 2100, 382 2800
  C 380 3500, 384 4200, 382 4900
  C 380 5600, 384 6300, 382 7000
  C 380 7700, 384 8400, 382 9100
  C 382 9400, 382 9700, 382 9970
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
  { id: "hero", x: 382, y: 780 },
  { id: "caos", x: 382, y: 1440 },
  { id: "loop", x: 382, y: 2100 },
  { id: "cockpit", x: 382, y: 3100 },
  { id: "mesa", x: 382, y: 4450 },
  { id: "redator", x: 382, y: 5850 },
  { id: "prazos", x: 382, y: 7250 },
  { id: "especialidades", x: 382, y: 8500 },
  { id: "seguranca", x: 382, y: 8900 },
  { id: "agendamento", x: 382, y: 9970 },
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

        {/* NÓ DA HERO DESKTOP (CALIBRADO V5.2 — HALO DIFUSO DE FUNDO) */}
        <motion.path
          d={HERO_KNOT_PATH}
          stroke="url(#liquid-grad-dark)"
          strokeWidth="38"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#liquid-glow)"
          opacity="0.16"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="hidden dark:block"
        />

        <motion.path
          d={HERO_KNOT_PATH}
          stroke="url(#liquid-grad-dark)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="hidden dark:block"
        />

        <motion.path
          d={HERO_KNOT_PATH}
          stroke="url(#liquid-grad-light)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.22"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="block dark:hidden"
        />

        <motion.path
          d={HERO_KNOT_PATH}
          stroke="rgba(255, 255, 255, 0.85)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          opacity="0.30"
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
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#liquid-glow-mobile)"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="hidden dark:block"
        />

        <motion.path
          d={MOBILE_HERO_KNOT_PATH}
          stroke="url(#liquid-grad-mobile-dark)"
          strokeWidth="3.5"
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
          strokeWidth="3.5"
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
          strokeWidth="1"
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
          strokeWidth="1"
          strokeDasharray="3 5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-300/40 dark:text-white/[0.04]"
        />

        {/* TUBO LÍQUIDO MOBILE (MODO ESCURO) */}
        <motion.path
          ref={spineRefMobile}
          d={MOBILE_SPINE_SCROLL_PATH}
          stroke="url(#liquid-grad-mobile-dark)"
          strokeWidth="3.5"
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
          strokeWidth="3"
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
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: spineScrollLength }}
          opacity="0.7"
        />

        {/* CABEÇA DE FEIXE LASER MOBILE */}
        <g transform={`translate(${mobileBeadPos.x}, ${mobileBeadPos.y})`}>
          <circle r="10" className="fill-emerald-500/20 dark:fill-emerald-400/25 animate-ping" />
          <circle r="5" className="fill-emerald-500/35 dark:fill-emerald-400/40 blur-xs" />
          <circle r="2.5" className="fill-white dark:fill-emerald-100 stroke-1 stroke-emerald-600 dark:stroke-emerald-400" />
        </g>

        {/* NÓS DE MARCO MOBILE */}
        {MOBILE_MILESTONES.map((m) => (
          <g key={m.id} transform={`translate(${m.x}, ${m.y})`}>
            <circle
              r="3.5"
              className="fill-white dark:fill-[#05080C] stroke-1 stroke-emerald-600 dark:stroke-emerald-400 shadow-sm"
            />
            <circle
              r="1.5"
              className="fill-emerald-600 dark:fill-emerald-400"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
