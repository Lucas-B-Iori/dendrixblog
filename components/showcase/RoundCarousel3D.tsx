"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Briefcase, Building2, HeartHandshake, Landmark, Users, Scale, ArrowLeft, ArrowRight } from "lucide-react";

interface SpecialtyItem {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  description: string;
  stat: string;
  badge: string;
  tagColor: string;
}

const SPECIALTIES: SpecialtyItem[] = [
  {
    id: "trabalhista",
    title: "Trabalhista Estratégico",
    category: "Contencioso de Alto Volume",
    icon: Briefcase,
    description: "Apuração automática de horas extras, reflexos em verbas e precedentes TST.",
    stat: "148 teses",
    badge: "Súmulas TST",
    tagColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "civel",
    title: "Cível & Consumidor",
    category: "Responsabilidade Civil",
    icon: Scale,
    description: "Dano moral por negativação indevida e vícios com jurisprudência STJ conferida.",
    stat: "99.4% precisão",
    badge: "Precedentes STJ",
    tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "familia",
    title: "Família & Sucessões",
    category: "Direito Patrimonial",
    icon: HeartHandshake,
    description: "Estruturação de inventários complexos, partilhas e alimentos sem pontas soltas.",
    stat: "Zero retrabalho",
    badge: "CPC/15",
    tagColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    id: "tributario",
    title: "Tributário Contencioso",
    category: "Defesa Fiscal",
    icon: Landmark,
    description: "Teses de compensação, repercussão geral STF e teses repetitivas mapeadas.",
    stat: "STF / STJ",
    badge: "Repetitivos",
    tagColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    id: "empresarial",
    title: "Societário & M&A",
    category: "Governança Corporativa",
    icon: Building2,
    description: "Auditoria de contratos, due diligence de passivos e minutas de atos societários.",
    stat: "Due Diligence",
    badge: "Auditoria",
    tagColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    id: "previdenciario",
    title: "Previdenciário",
    category: "Benefícios & Aposentadoria",
    icon: Users,
    description: "Cruzamento de CNIS, cálculo de tempo especial e aplicação de regras de transição.",
    stat: "CNIS Match",
    badge: "INSS",
    tagColor: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
];

/**
 * RoundCarousel3D (Inspirado em OriginKit Round Carousel / 3D Cylinder Gallery)
 * Cilindro tridimensional giratório em torno do eixo Y com perspectiva espacial,
 * física de arrasto inercial e cartas com profundidade.
 */
export function RoundCarousel3D() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startRotationRef = useRef(0);

  const total = SPECIALTIES.length;
  const anglePerItem = 360 / total;

  // Raio do cilindro adaptativo para não cortar em telas menores
  const [radius, setRadius] = useState(380);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(230);
      } else if (window.innerWidth < 1024) {
        setRadius(320);
      } else {
        setRadius(390);
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    startRotationRef.current = rotation;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    setRotation(startRotationRef.current + deltaX * 0.4);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const rotatePrev = () => setRotation((prev) => prev + anglePerItem);
  const rotateNext = () => setRotation((prev) => prev - anglePerItem);

  return (
    <div className="w-full py-8 select-none">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 px-4 sm:px-0 gap-4">
        <div>
          <span className="font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Visão Tridimensional de Áreas
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
            Especialidades Jurídicas com Inteligência Dedicada
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Arraste para girar a galeria 3D e explorar como o Dendrix molda o raciocínio forense de cada ramo da sua banca.
          </p>
        </div>

        {/* Controles de Rotação */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={rotatePrev}
            className="w-10 h-10 rounded-full border border-white/10 bg-[#0B131C] text-white flex items-center justify-center hover:bg-[#111C2A] hover:border-emerald-500/30 transition-colors shadow-xs"
            aria-label="Girar anterior"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={rotateNext}
            className="w-10 h-10 rounded-full border border-white/10 bg-[#0B131C] text-white flex items-center justify-center hover:bg-[#111C2A] hover:border-emerald-500/30 transition-colors shadow-xs"
            aria-label="Girar próximo"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Palco 3D do Cilindro */}
      <div
        className="relative h-[420px] sm:h-[460px] w-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ perspective: 1200 }}
      >
        <div
          className="relative w-0 h-0 transition-transform duration-200 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
          }}
        >
          {SPECIALTIES.map((spec, index) => {
            const angle = index * anglePerItem;
            const Icon = spec.icon;

            return (
              <div
                key={spec.id}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[280px] h-[340px] rounded-2xl p-6 border border-white/10 bg-[#081018]/95 backdrop-blur-md shadow-2xl flex flex-col justify-between"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Cabeçalho do Card da Especialidade */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full border ${spec.tagColor}`}
                    >
                      {spec.badge}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/80">
                      <Icon className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 block mb-1">
                    {spec.category}
                  </span>
                  <h4 className="text-lg font-bold text-white tracking-tight leading-snug">
                    {spec.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {spec.description}
                  </p>
                </div>

                {/* Rodapé com Métrica e Indicador */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-sans">Capacidade</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {spec.stat}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-1 rounded">
                    Módulo Ativo
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
