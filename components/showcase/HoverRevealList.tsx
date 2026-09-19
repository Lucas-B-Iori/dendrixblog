"use client";

import React, { useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { ArrowUpRight, Scale, Landmark, BellRing, Database, FileCheck } from "lucide-react";

interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  status: string;
  latency: string;
  description: string;
  icon: React.ElementType;
  badge: string;
}

const INTEGRATIONS: IntegrationItem[] = [
  {
    id: "stj",
    name: "Superior Tribunal de Justiça (STJ & STF)",
    category: "Jurisprudência & Precedentes",
    status: "Conexão Ativa",
    latency: "< 1.2s",
    description: "Sincronização em tempo real de teses repetitivas, temas e súmulas vinculantes.",
    icon: Scale,
    badge: "100% dos Temas",
  },
  {
    id: "tst",
    name: "Tribunal Superior do Trabalho (TST & TRTs)",
    category: "Contencioso Trabalhista",
    status: "Conexão Ativa",
    latency: "< 850ms",
    description: "Varredura contínua de orientações jurisprudenciais e súmulas trabalhistas.",
    icon: Landmark,
    badge: "24 Regiões",
  },
  {
    id: "djen",
    name: "Diário de Justiça Eletrônico Nacional (DJEN)",
    category: "Intimações & Publicações",
    status: "Varredura 06h00",
    latency: "Automática",
    description: "Captura matinal de todas as publicações vinculadas aos CPFs e OABs da banca.",
    icon: BellRing,
    badge: "Diário Unificado",
  },
  {
    id: "estaduais",
    name: "Tribunais Estaduais (TJSP, TJRJ, TJMG e +24)",
    category: "Sistemas e-SAJ e Projudi",
    status: "Conexão Ativa",
    latency: "< 1.5s",
    description: "Leitura de andamentos, certidões de distribuição e publicação de acórdãos.",
    icon: Database,
    badge: "Brasil Inteiro",
  },
  {
    id: "pje",
    name: "Processo Judicial Eletrônico (PJe & TRFs 1 a 6)",
    category: "Justiça Federal",
    status: "Conexão Ativa",
    latency: "< 1.0s",
    description: "Integração nativa com os webservices e portais de peticionamento eletrônico.",
    icon: FileCheck,
    badge: "6 Regiões Federais",
  },
];

/**
 * HoverRevealList (Inspirado em Skiper 6 / Hover members)
 * Lista interativa de tribunais com card flutuante posicionado exatamente ao lado
 * do cursor do mouse, com física de mola (spring physics) e rotação inercial.
 */
export function HoverRevealList() {
  const [activeItem, setActiveItem] = useState<IntegrationItem | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 450, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 30 });
  const rotateSpring = useSpring(0, { stiffness: 350, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    // Coordenadas absolutas de viewport para sincronia com position: fixed
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);

    // Rotação sutil baseada na movimentação horizontal
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const rotate = ((e.clientX - centerX) / (rect.width / 2)) * 6;
      rotateSpring.set(rotate);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-6"
    >
      <div className="mb-6 px-4 sm:px-0">
        <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
          Ecossistema Integrado
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
          Tribunais & Diários Oficiais Conectados ao Seu Escritório
        </h3>
      </div>

      {/* Lista de Itens com Efeito Hover */}
      <div className="divide-y divide-slate-200 dark:divide-white/[0.08] border-y border-slate-200 dark:border-white/[0.08]">
        {INTEGRATIONS.map((item) => (
          <div
            key={item.id}
            onMouseEnter={(e) => {
              mouseX.set(e.clientX);
              mouseY.set(e.clientY);
              setActiveItem(item);
            }}
            onMouseLeave={() => setActiveItem(null)}
            className="group relative flex flex-col sm:flex-row sm:items-center justify-between py-5 px-4 sm:px-6 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer rounded-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                <item.icon className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                    {item.name}
                  </h4>
                  <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.05] hidden sm:inline-block">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{item.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 sm:mt-0 justify-between sm:justify-end">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-slate-700 dark:text-slate-300">{item.status}</span>
              </div>
              <span className="font-mono text-xs text-emerald-700 dark:text-emerald-400/90 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                {item.latency}
              </span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>

      {/* Card Flutuante Seguidor de Cursor — Agora posicionado exatamente ao lado do cursor */}
      {activeItem && (
        <motion.div
          style={{
            left: springX,
            top: springY,
            rotate: rotateSpring,
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none fixed z-50 hidden lg:flex flex-col gap-2 p-4 w-72 rounded-2xl bg-white/95 dark:bg-[#09131C]/95 border border-emerald-500/40 shadow-[0_15px_35px_rgba(0,0,0,0.15),0_0_20px_rgba(16,185,129,0.15)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-xl translate-x-6 -translate-y-1/2"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              {activeItem.status}
            </span>
            <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">{activeItem.latency}</span>
          </div>

          <h5 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{activeItem.name}</h5>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{activeItem.description}</p>

          <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
            <span>Protocolo Seguro TLS 1.3</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Auditado</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
