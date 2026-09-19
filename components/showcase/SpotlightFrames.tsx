"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
    title: "Leitura de Autos & OCR",
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
    tag: "Precisão Jurídica",
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
              transition={{
                layout: { type: "spring", stiffness: 135, damping: 21, mass: 0.65 },
              }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer border flex flex-col justify-between p-6 lg:p-7 select-none transition-colors duration-400 ${
                isActive
                  ? "flex-[3.5] bg-white dark:bg-[#0A121A] border-emerald-500/40 shadow-xl dark:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
                  : "flex-1 bg-slate-100/80 dark:bg-[#070D14]/70 border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 hover:bg-white dark:hover:bg-[#0A121A]/50"
              }`}
            >
              {/* Brilho de fundo temático */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${frame.accent} pointer-events-none transition-opacity duration-400 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Cabeçalho do Card */}
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400/80 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 whitespace-nowrap">
                    FASE {frame.step}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white/80 shrink-0">
                    <Icon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  </div>
                </div>

                <h3 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                  {frame.title}
                </h3>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.p
                      key="subtitle"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2"
                    >
                      {frame.subtitle}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Conteúdo Expandido (Apenas Ativo) */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="details-list"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 my-4 space-y-2.5"
                  >
                    {frame.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Rodapé com Métrica de Destaque */}
              <div className="relative z-10 pt-4 border-t border-slate-200 dark:border-white/[0.08] flex items-end justify-between min-h-[58px]">
                <AnimatePresence mode="wait" initial={false}>
                  {isActive ? (
                    <motion.div
                      key={`metric-${frame.id}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="font-mono text-3xl font-extrabold text-slate-900 dark:text-white block tracking-tight">
                        {frame.metric}
                      </span>
                      <span className="text-[11px] font-sans text-slate-500 dark:text-slate-400 block mt-0.5 whitespace-nowrap">
                        {frame.metricLabel}
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`tag-${frame.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="text-left"
                    >
                      <span className="font-mono text-xl font-bold text-slate-800 dark:text-emerald-400 block tracking-tight">
                        {frame.metric}
                      </span>
                      <span className="font-mono text-[10.5px] font-medium text-slate-500 dark:text-slate-400 block whitespace-nowrap mt-0.5">
                        {frame.tag}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shrink-0 mb-1 ${
                    isActive
                      ? "bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_#34D399] scale-110"
                      : "bg-slate-300 dark:bg-white/20"
                  }`}
                />
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
            <motion.div
              key={frame.id}
              onClick={() => setActiveId(isActive ? "" : frame.id)}
              layout
              transition={{ layout: { type: "spring", stiffness: 220, damping: 26 } }}
              className={`rounded-2xl p-5 border cursor-pointer transition-colors duration-300 ${
                isActive
                  ? "bg-white dark:bg-[#0A121A] border-emerald-500/50 shadow-lg dark:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                  : "bg-slate-50 dark:bg-[#070D14] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {frame.step} • {frame.tag}
                </span>
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{frame.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">{frame.subtitle}</p>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="mobile-expanded"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 py-3 border-t border-slate-200 dark:border-white/10 my-2">
                      {frame.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 text-xs border-t border-slate-100 dark:border-white/5">
                      <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold text-sm">
                        {frame.metric}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 text-[11px]">{frame.metricLabel}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
