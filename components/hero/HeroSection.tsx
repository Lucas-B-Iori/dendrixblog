import React from "react";
import Image from "next/image";
import { Skiper6Hero } from "./Skiper6Hero";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="w-full relative overflow-hidden min-h-[94vh] pt-8 sm:pt-12 lg:pt-16 pb-20 sm:pb-28 lg:pb-32 flex flex-col items-center justify-center"
    >
      {/* 
        Background Cinematográfico Edge-to-Edge (100% da Largura da Tela)
        Posicionado como filho direto da section para cobrir de ponta a ponta sem restrição de container.
      */}
      <div
        className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        {/* Vídeo / Imagem em Loop Infinito em Tela Cheia */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero/hero_bg_mesh.jpg"
          className="w-full h-full object-cover object-center opacity-30 dark:opacity-45 scale-[1.02] transition-opacity duration-1000"
          style={{
            maskImage:
              "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.15) 80%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.15) 80%, transparent 100%)",
          }}
        >
          <source src="/videos/hero_bg_loop.mp4" type="video/mp4" />
          {/* Fallback de imagem caso o navegador desabilite autoplay */}
          <Image
            src="/images/hero/hero_bg_mesh.jpg"
            alt="Ambiente Atmosférico Dendrix"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </video>

        {/* Gradientes de Fusão Perfeita com o Fundo Geral do Site */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-canvas)]/40 via-transparent to-[var(--surface-canvas)]" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[var(--surface-canvas)]/80" />
      </div>

      {/* Brilho Radial Atmosférico Jurídico Suave */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[650px] rounded-full opacity-20 dark:opacity-35 blur-3xl z-[1]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(16,185,129,0.22) 0%, rgba(2,132,199,0.08) 45%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Container de Conteúdo Ergonômico Centralizado */}
      <div className="relative z-20 mx-auto px-4 sm:px-6 lg:px-8 max-w-[1360px] w-full">
        <Skiper6Hero />
      </div>
    </section>
  );
}
