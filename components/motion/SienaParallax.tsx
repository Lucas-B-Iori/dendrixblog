"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface SienaParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // e.g. -50 to 50
}

/**
 * SienaParallax (Inspirado em Skiper 29 / Siena Parallax)
 * Camada de translação com velocidade descompassada vinculada ao scroll,
 * criando profundidade espacial sem impacto em performance (utiliza transform puro).
 */
export function SienaParallax({
  children,
  className = "",
  speed = -40,
}: SienaParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <div ref={ref} className={`relative overflow-visible ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}
