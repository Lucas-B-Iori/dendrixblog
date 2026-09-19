"use client";

import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Lock, Cpu, Server, EyeOff, FileKey, Check } from "lucide-react";

/**
 * AppleFeatureCard (Inspirado em Skiper 76 / Apple Feature Block)
 * Card de apresentação de feature estilo Apple Keynote (iPhone 17 Pro)
 * com vidro fosco denso, bordas com reflexo especular de luz (specular highlight),
 * micro-badges metálicos e arquitetura de segurança de padrão bancário.
 */
export function AppleFeatureCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.PointerEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const specs = [
    { label: "Criptografia de Dados", value: "AES-256 em Repouso", icon: Lock },
    { label: "Trânsito de Informações", value: "TLS 1.3 End-to-End", icon: Server },
    { label: "Isolamento de Base", value: "Tenant Dedicado por Banca", icon: Cpu },
    { label: "Privacidade OAB", value: "Zero Treinamento com Seus Autos", icon: EyeOff },
  ];

  return (
    <div
      ref={cardRef}
      onPointerMove={handleMouseMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-white/10 bg-gradient-to-b from-[#0B1520]/90 via-[#070D14]/95 to-[#04070B] shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
    >
      {/* Specular Highlight reativo ao mouse (Efeito de brilho de borda Apple) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.18), transparent 40%)`,
        }}
        aria-hidden="true"
      />

      {/* Conteúdo Central */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Coluna Esquerda: Manifesto de Segurança Apple-Grade */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DENDRIX FORENSICS CORE • ART. 34 CED-OAB</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            Arquitetura de Segurança Máxima.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Seus autos nunca treinam IA pública.
            </span>
          </h3>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            Projetado sob as premissas mais estritas do sigilo profissional da advocacia brasileira.
            Cada escritório opera em uma câmara de dados isolada com chaves exclusivas e trilha imutável de auditoria.
          </p>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {["Tenant Isolado", "Conformidade LGPD", "Auditoria de Acessos", "Backup Georredundante"].map(
              (badge, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-200"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  {badge}
                </span>
              )
            )}
          </div>
        </div>

        {/* Coluna Direita: Painel Técnico de Especificações (Glassmorphism Apple) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl p-6 bg-black/40 border border-white/10 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="font-mono text-xs font-semibold text-slate-400">
                ESPECIFICAÇÕES DE GOVERNANÇA
              </span>
              <FileKey className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="space-y-3.5">
              {specs.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs text-slate-300 font-medium">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-emerald-400 text-right shrink-0">
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-slate-400 font-mono">
                Chaves de encriptação rotacionadas a cada 90 dias
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
