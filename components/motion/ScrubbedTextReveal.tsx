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
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [4, 0]);

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
 * Cria uma experiência hipnótica e forçada de leitura de manifesto forense.
 */
export function ScrubbedTextReveal({
  text,
  className = "",
  wordClassName = "",
}: ScrubbedTextRevealProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={`relative leading-relaxed ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
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
