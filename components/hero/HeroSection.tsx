import React from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Skiper6Hero } from "./Skiper6Hero";

export function HeroSection() {
  return (
    <SectionWrapper
      id="hero"
      width="wide"
      spacing="hero"
      className="relative overflow-hidden min-h-[92vh] flex flex-col items-center justify-center"
    >
      {/* Brilho Radial Atmosférico Jurídico Suave */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20 dark:opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(16,185,129,0.18) 0%, rgba(2,132,199,0.08) 45%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full">
        <Skiper6Hero />
      </div>
    </SectionWrapper>
  );
}
