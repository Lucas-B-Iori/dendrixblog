"use client";

import React from "react";
import { motion, useScroll, useSpring } from "motion/react";

interface ScrollProgressBarProps {
  className?: string;
}

/**
 * Barra de progresso de leitura fixa no topo (Fase 1 / Skiper UI inspired).
 * Acompanha a rolagem de 0% a 100% com física de mola (spring lerp),
 * gradiente esmeralda/ciano e ponto focal luminoso na ponta.
 * Projetada para a landing page e modular para os futuros artigos do Blog.
 */
export function ScrollProgressBar({ className = "" }: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 350,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 h-[2.5px] pointer-events-none bg-black/5 dark:bg-white/5 ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-[#0F2B48] via-[#0284C7] to-[#10B981] relative"
        style={{ scaleX }}
      >
        {/* Ponto focal de luz (glow tip) na ponta da barra */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#34D399] shadow-[0_0_8px_#34D399,0_0_16px_#0284C7]" />
      </motion.div>
    </div>
  );
}
