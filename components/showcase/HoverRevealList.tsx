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
 * Lista interativa de tribunais com card flutuante que acompanha
 * o cursor do mouse com física de mola (spring physics) e rotação inercial.
 */
export function HoverRevealList() {
  const [activeItem, setActiveItem] = useState<IntegrationItem | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 350, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 350, damping: 25 });
  const rotateSpring = useSpring(0, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    // Rotação sutil proporcional ao deslocamento horizontal
    const centerX = rect.width / 2;
    const rotate = ((x - centerX) / centerX) * 8;
    rotateSpring.set(rotate);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-6"
    >
      <div className="mb-6 px-4 sm:px-0">
        <span className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          Ecossistema Integrado
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
          Tribunais & Diários Oficiais Conectados ao Seu Escritório
        </h3>
      </div>

      {/* Lista de Itens com Efeito Hover */}
      <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
        {INTEGRATIONS.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setActiveItem(item)}
            onMouseLeave={() => setActiveItem(null)}
            className="group relative flex flex-col sm:flex-row sm:items-center justify-between py-5 px-4 sm:px-6 hover:bg-white/[0.03] transition-colors cursor-pointer rounded-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                <item.icon className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {item.name}
                  </h4>
                  <span className="font-mono text-[10px] text-slate-400 px-2 py-0.5 rounded bg-white/[0.05] hidden sm:inline-block">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">{item.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 sm:mt-0 justify-between sm:justify-end">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-slate-300">{item.status}</span>
              </div>
              <span className="font-mono text-xs text-emerald-400/80 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                {item.latency}
              </span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>

      {/* Card Flutuante Seguidor de Cursor (Desktop Apenas) */}
      {activeItem && (
        <motion.div
          style={{
            left: springX,
            top: springY,
            rotate: rotateSpring,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none fixed z-50 hidden lg:flex flex-col gap-2 p-4 w-72 rounded-2xl bg-[#09131C]/95 border border-emerald-500/40 shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-xl -translate-x-1/2 -translate-y-full -mt-4"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
              {activeItem.status}
            </span>
            <span className="font-mono text-[10px] text-slate-400">{activeItem.latency}</span>
          </div>

          <h5 className="text-sm font-bold text-white mt-1">{activeItem.name}</h5>
          <p className="text-xs text-slate-300 leading-relaxed">{activeItem.description}</p>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>Protocolo Seguro TLS 1.3</span>
            <span className="text-emerald-400 font-bold">Auditado</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
