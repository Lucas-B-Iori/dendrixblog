"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { FileSearch, PenTool, BellRing, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

interface FrameItem {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  tag: string;
  accent: string;
  details: string[];
  metric: string;
  metricLabel: string;
}

const FRAMES: FrameItem[] = [
  {
    id: "ocr",
    step: "01",
    title: "Leitura Forense & OCR",
    subtitle: "Digerir 1.200 páginas em 8 segundos sem perder uma linha dos autos.",
    icon: FileSearch,
    tag: "Extração Instantânea",
    accent: "from-blue-600/20 via-blue-500/10 to-transparent",
    details: [
      "Indexação completa de PDFs desconfigurados e digitalizações borradas",
      "Mapeamento automático de petições, despachos e documentos comprobatórios",
      "Destaque de folhas dos autos com citação exata para a peça",
    ],
    metric: "8s",
    metricLabel: "tempo médio de processamento por volume",
  },
  {
    id: "redator",
    step: "02",
    title: "Redator Assistido com IA",
    subtitle: "Minutas fundamentadas na jurisprudência real do STJ e TST.",
    icon: PenTool,
    tag: "Precisão Forense",
    accent: "from-emerald-600/20 via-emerald-500/10 to-transparent",
    details: [
      "Sugestão de teses embasadas em acórdãos vigentes e súmulas vinculantes",
      "Redação em tom jurídico culto, respeitando o estilo da sua banca",
      "Zero alucinação: cada citação é confrontada com a base oficial",
    ],
    metric: "100%",
    metricLabel: "precedentes verificados antes da citação",
  },
  {
    id: "djen",
    step: "03",
    title: "Monitor DJEN & Prazos",
    subtitle: "Varredura diária das publicações com cálculo de tempestividade.",
    icon: BellRing,
    tag: "Tempestividade Absoluta",
    accent: "from-amber-600/20 via-amber-500/10 to-transparent",
    details: [
      "Captura automática no Diário de Justiça Eletrônico Nacional às 06h00",
      "Contagem de prazos fatais considerando feriados locais e suspensões",
      "Alertas escalonados para o advogado responsável e sócio do caso",
    ],
    metric: "0",
    metricLabel: "prazos perdidos sob a esteira Dendrix",
  },
  {
    id: "seguranca",
    step: "04",
    title: "Governança & Sigilo",
    subtitle: "Isolamento absoluto de dados e criptografia de padrão bancário.",
    icon: ShieldCheck,
    tag: "Art. 34 CED-OAB",
    accent: "from-purple-600/20 via-purple-500/10 to-transparent",
    details: [
      "Tenant isolado por escritório sem compartilhamento de repositório",
      "Criptografia AES-256 em repouso e TLS 1.3 em trânsito",
      "Nenhum dado é usado para treinar modelos de inteligência pública",
    ],
    metric: "LGPD",
    metricLabel: "conformidade total e auditoria de acessos",
  },
];

/**
 * SpotlightFrames (Inspirado em OriginKit Spotlight Frames)
 * Acordeão de lâminas verticais interativas com tracking de foco,
 * expansão dinâmica elástica e acabamento de vidro fosco nobre.
 */
export function SpotlightFrames() {
  const [activeId, setActiveId] = useState<string>("ocr");

  return (
    <div className="w-full">
      {/* Visualização Desktop: Lâminas Verticais Expansíveis */}
      <div className="hidden lg:flex gap-3 h-[480px] w-full">
        {FRAMES.map((frame) => {
          const isActive = activeId === frame.id;
          const Icon = frame.icon;

          return (
            <motion.div
              key={frame.id}
              onClick={() => setActiveId(frame.id)}
              onMouseEnter={() => setActiveId(frame.id)}
              layout
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 flex flex-col justify-between p-7 ${
                isActive
                  ? "flex-[3.5] bg-[#0A121A] border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                  : "flex-1 bg-[#070D14]/70 border-white/[0.08] hover:border-white/20 hover:bg-[#0A121A]/50"
              }`}
            >
              {/* Brilho de fundo temático */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${frame.accent} pointer-events-none transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Cabeçalho do Card */}
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs font-bold text-emerald-400/80 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    FASE {frame.step}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/80">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                  {frame.title}
                </h3>

                {isActive && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-slate-300 mt-2 line-clamp-2"
                  >
                    {frame.subtitle}
                  </motion.p>
                )}
              </div>

              {/* Conteúdo Expandido (Apenas Ativo) */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="relative z-10 my-4 space-y-2.5"
                >
                  {frame.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Rodapé com Métrica de Destaque */}
              <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-end justify-between">
                {isActive ? (
                  <div>
                    <span className="text-2xl font-bold font-mono text-emerald-400 tracking-tight block">
                      {frame.metric}
                    </span>
                    <span className="text-[11px] text-slate-400 font-sans block">
                      {frame.metricLabel}
                    </span>
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-xs">{frame.metric}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Visualização Mobile: Cards Verticais Elegantes com Toque */}
      <div className="lg:hidden flex flex-col gap-3">
        {FRAMES.map((frame) => {
          const isActive = activeId === frame.id;
          const Icon = frame.icon;

          return (
            <div
              key={frame.id}
              onClick={() => setActiveId(frame.id)}
              className={`rounded-2xl p-5 border transition-all duration-200 ${
                isActive
                  ? "bg-[#0A121A] border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                  : "bg-[#070D14] border-white/10"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {frame.step} • {frame.tag}
                </span>
                <Icon className="w-5 h-5 text-slate-300" />
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{frame.title}</h3>
              <p className="text-xs text-slate-300 mb-3">{frame.subtitle}</p>

              {isActive && (
                <div className="space-y-2 py-3 border-t border-white/10 my-2">
                  {frame.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 text-xs">
                <span className="text-emerald-400 font-mono font-bold">{frame.metric}</span>
                <span className="text-slate-400 text-[11px]">{frame.metricLabel}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
