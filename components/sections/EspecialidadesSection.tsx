"use client";

import React from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { RoundCarousel3D } from "@/components/showcase/RoundCarousel3D";
import { HoverRevealList } from "@/components/showcase/HoverRevealList";

/**
 * EspecialidadesSection (V4 Feature Suite)
 * Reúne o RoundCarousel3D (OriginKit) para visualização tridimensional
 * dos módulos por ramo do direito e o HoverRevealList (Skiper 6) para os
 * tribunais e sistemas judiciais conectados ao escritório.
 */
export function EspecialidadesSection() {
  return (
    <SectionWrapper
      id="especialidades"
      className="border-t border-slate-200 dark:border-white/[0.08] bg-transparent text-slate-900 dark:text-white relative overflow-hidden"
      spacing="default"
    >
      {/* Brilho de Fundo Esmeralda & Ciano */}
      <div
        className="pointer-events-none absolute right-1/4 -top-24 w-[650px] h-[650px] rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(2,132,199,0.1) 50%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* 01. Cilindro 3D de Especialidades (OriginKit Round Carousel) */}
      <div className="relative z-10 mb-16">
        <RoundCarousel3D />
      </div>

      {/* 02. Lista Interativa com Cursor Follower dos Tribunais Conectados (Skiper 6) */}
      <div className="relative z-10 pt-12 border-t border-slate-200 dark:border-white/[0.08]">
        <HoverRevealList />
      </div>
    </SectionWrapper>
  );
}
