"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, FileText, CheckCircle, Scale, Clock, Shield } from "lucide-react";

interface SlideItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: React.ElementType;
  meta: { label: string; val: string }[];
  snippet: string;
  accentColor: string;
}

const SLIDES: SlideItem[] = [
  {
    id: "peticao",
    tag: "Peça Processual",
    title: "Petição Inicial Trabalhista",
    subtitle: "Estruturação automática com reflexos em DSR, FGTS e precedentes do TST.",
    badge: "Minuta Pronta",
    icon: FileText,
    meta: [
      { label: "Páginas Lidas", val: "148 fls." },
      { label: "Jurisprudência", val: "Súmula 338 TST" },
      { label: "Conferência", val: "100% Válida" },
    ],
    snippet:
      "EXCELENTÍSSIMO SENHOR DOUTOR JUIZ DO TRABALHO DA 2ª VARA DE SÃO PAULO/SP\nReclamante: M.A.S. | Reclamada: Logística Express S/A\nObjeto: Horas extraordinárias além da 8ª diária e intervalo intrajornada...",
    accentColor: "from-blue-500/20 to-cyan-500/5",
  },
  {
    id: "stj",
    tag: "Jurisprudência IA",
    title: "STJ: AgInt no AREsp 3.070.579",
    subtitle: "Dano moral in re ipsa por inscrição indevida em cadastro restritivo.",
    badge: "Acórdão Vinculante",
    icon: Scale,
    meta: [
      { label: "Relator", val: "Min. Humberto Martins" },
      { label: "Órgão Julgador", val: "Segunda Turma" },
      { label: "Data de Julgamento", val: "18/06/2024" },
    ],
    snippet:
      "AGRAVO INTERNO NO AGRAVO EM RECURSO ESPECIAL. CONSUMIDOR. INSCRIÇÃO INDEVIDA EM ÓRGÃOS DE PROTEÇÃO AO CRÉDITO. DANO MORAL IN RE IPSA. DESNECESSIDADE DE PROVA DO PREJUÍZO...",
    accentColor: "from-emerald-500/20 to-teal-500/5",
  },
  {
    id: "djen",
    tag: "Diário Oficial",
    title: "Publicação DJEN & Prazo Fatal",
    subtitle: "Varredura das 06h00 com contagem regressiva em dias úteis (CPC/15).",
    badge: "Tempestividade Auditada",
    icon: Clock,
    meta: [
      { label: "Disponibilização", val: "18/09/2026" },
      { label: "Publicação", val: "19/09/2026" },
      { label: "Prazo Final", val: "09/10/2026 (15d úteis)" },
    ],
    snippet:
      "TRIBUNAL REGIONAL FEDERAL DA 3ª REGIÃO - DJEN nº 4128/2026\nProcesso nº 5001284-82.2025.4.03.6100\nFica a parte apelante intimada para contrarrazões ao recurso de apelação no prazo legal...",
    accentColor: "from-amber-500/20 to-orange-500/5",
  },
  {
    id: "ocr",
    tag: "Mesa de Leitura & OCR",
    title: "Espelho de Triagem de Autos",
    subtitle: "Indexação de 842 páginas em 8 segundos com extração cronológica.",
    badge: "OCR 100% Concluído",
    icon: Shield,
    meta: [
      { label: "Volume Total", val: "842 páginas" },
      { label: "Despachos", val: "18 peças" },
      { label: "Tempo de Leitura", val: "7.8 segundos" },
    ],
    snippet:
      "MAPA DE FATOS EXTRAÍDOS:\n• Fls. 12/28: Contrato social com cláusula de eleição de foro válida\n• Fls. 94/110: Comprovante de quitação com quitação parcial\n• Fls. 215: Laudo pericial médico favorável ao cliente...",
    accentColor: "from-indigo-500/20 to-purple-500/5",
  },
];

/**
 * SmoothScrollSlider (Inspirado em OriginKit Smooth Scroll Slider)
 * Trilho horizontal inercial com efeito de ampliação focal no centro,
 * vinhetagem lateral e navegação tátil suave em Desktop e Mobile.
 */
export function SmoothScrollSlider() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, SLIDES.length - 1));
    setActiveIndex(nextIndex);
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(".slider-card");
    if (cards[nextIndex]) {
      cards[nextIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const handleNext = () => scrollToIndex(activeIndex + 1);
  const handlePrev = () => scrollToIndex(activeIndex - 1);

  return (
    <div className="relative w-full py-6">
      {/* Controles de Navegação */}
      <div className="flex items-center justify-between mb-6 px-4 sm:px-0">
        <div>
          <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            Galeria de Peças Processuais
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            Evidências & Documentos Reais na Mesa
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#0B131C] text-slate-800 dark:text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-[#111C2A] hover:border-emerald-500/30 transition-colors shadow-xs"
            aria-label="Item anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={activeIndex === SLIDES.length - 1}
            className="w-10 h-10 rounded-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#0B131C] text-slate-800 dark:text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-[#111C2A] hover:border-emerald-500/30 transition-colors shadow-xs"
            aria-label="Próximo item"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Trilho de Scroll com Vinhetagem Lateral */}
      <div className="relative">
        {/* Vinhetas de fade nas bordas (adaptadas para Light e Dark Mode) */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#F8FAFC] dark:from-[#05080C] to-transparent z-10 pointer-events-none hidden sm:block" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#F8FAFC] dark:from-[#05080C] to-transparent z-10 pointer-events-none hidden sm:block" />

        <div
          ref={containerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 px-4 sm:px-8 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {SLIDES.map((slide, idx) => {
            const isSelected = activeIndex === idx;
            const Icon = slide.icon;

            return (
              <motion.div
                key={slide.id}
                onClick={() => scrollToIndex(idx)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className={`slider-card snap-center shrink-0 w-[310px] sm:w-[420px] rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-white dark:bg-[#0B141E] border-emerald-500/50 shadow-xl dark:shadow-[0_0_35px_rgba(16,185,129,0.18)] scale-[1.02]"
                    : "bg-white/90 dark:bg-[#070D14]/90 border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 shadow-xs"
                }`}
              >
                {/* Cabeçalho do Card */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      {slide.tag}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.05]">
                      {slide.badge}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                        {slide.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Metadados Processuais em Pílulas */}
                  <div className="grid grid-cols-3 gap-2 my-4 py-3 px-3 rounded-xl bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/[0.06]">
                    {slide.meta.map((m, i) => (
                      <div key={i} className="text-center">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{m.label}</span>
                        <span className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 block truncate">
                          {m.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pré-visualização do Documento (Efeito Papel Digital Escuro) */}
                <div className="mt-2 p-3.5 rounded-xl bg-[#04080D] border border-slate-800 dark:border-white/[0.06] font-mono text-[11px] text-slate-300 leading-relaxed overflow-hidden">
                  <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-white/[0.06] text-[10px] text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Dendrix Security Engine • Visualização Segura</span>
                  </div>
                  <pre className="whitespace-pre-wrap font-mono text-[10.5px] text-slate-300 selection:bg-emerald-500/30 max-h-24 overflow-hidden">
                    {slide.snippet}
                  </pre>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Indicadores de Paginação */}
      <div className="flex items-center justify-center gap-1.5 mt-5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === i ? "w-7 bg-emerald-500 dark:bg-emerald-400" : "w-2 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40"
            }`}
            aria-label={`Ir para documento ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
