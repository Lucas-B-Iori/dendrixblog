"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

interface ScrubbedTextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}

function Word({ children, progress, range, className = "" }: WordProps) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [3, 0]);

  return (
    <span className="relative inline-block mr-[0.28em] my-[0.1em]">
      <motion.span
        style={{ opacity, y }}
        className={`inline-block transition-colors duration-150 ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * ScrubbedTextReveal (Inspirado em Skiper 70 / Text Reveal Box)
 * Revela cada palavra progressivamente com base no scroll milimétrico do usuário.
 * Calibrado para que 100% das palavras fiquem visíveis enquanto a seção ainda está
 * perfeitamente centralizada na tela, sem exigir rolagem excessiva.
 */
export function ScrubbedTextReveal({
  text,
  className = "",
  wordClassName = "",
}: ScrubbedTextRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Calibração milimétrica: inicia em start 0.88 e completa em start 0.35
    // garantindo visibilidade total com a seção no campo de visão ideal.
    offset: ["start 0.88", "start 0.35"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={`relative leading-relaxed ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1 / words.length);
        return (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[start, end]}
            className={wordClassName}
          >
            {word}
          </Word>
        );
      })}
    </div>
  );
}
