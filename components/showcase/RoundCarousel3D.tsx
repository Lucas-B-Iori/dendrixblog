"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Briefcase,
  Building2,
  HeartHandshake,
  Landmark,
  Users,
  Scale,
  ShieldAlert,
  ShoppingCart,
  FileCheck2,
  GitPullRequest,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
} from "lucide-react";

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
    id: "civel",
    title: "Cível & Obrigações",
    category: "Contencioso Geral",
    icon: Scale,
    description: "Ações de cobrança, indenizatórias, cumprimento de sentença e execuções de título.",
    stat: "Prazos CPC/15",
    badge: "Cível",
    tagColor: "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "criminal",
    title: "Direito Penal",
    category: "Defesa Criminal",
    icon: ShieldAlert,
    description: "Acompanhamento de inquéritos, audiências de custódia, pedidos de liberdade e defesas prévias.",
    stat: "CPP & Súmulas",
    badge: "Criminal",
    tagColor: "text-rose-700 dark:text-rose-400 bg-rose-500/10 border-rose-500/20",
  },
  {
    id: "familias",
    title: "Família & Sucessões",
    category: "Direito Patrimonial & Pessoal",
    icon: HeartHandshake,
    description: "Inventários judiciais e extrajudiciais, partilhas de bens, divórcios e alimentos sem retrabalho.",
    stat: "Partilha Ágil",
    badge: "Famílias",
    tagColor: "text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    id: "previdenciario",
    title: "Direito Previdenciário",
    category: "Benefícios & Aposentadoria",
    icon: Users,
    description: "Análise de vínculos CNIS, cálculo de tempo especial, RMI e regras de transição.",
    stat: "CNIS Match",
    badge: "Previdenciário",
    tagColor: "text-teal-700 dark:text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
  {
    id: "trabalhista",
    title: "Trabalhista Estratégico",
    category: "Contencioso de Alto Volume",
    icon: Briefcase,
    description: "Apuração automática de horas extras, reflexos em verbas e precedentes vigentes do TST.",
    stat: "Súmulas TST",
    badge: "Trabalhista",
    tagColor: "text-blue-700 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "consumidor",
    title: "Direito do Consumidor",
    category: "Relações de Consumo",
    icon: ShoppingCart,
    description: "Inscrição indevida, vícios de produto, repetição de indébito e aplicação estratégica do CDC.",
    stat: "Dano Moral",
    badge: "Consumidor",
    tagColor: "text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    id: "tributario",
    title: "Tributário Contencioso",
    category: "Defesa Fiscal",
    icon: Landmark,
    description: "Teses de compensação, repercussão geral, defesas fiscais e precedentes CARF/STJ.",
    stat: "Teses STJ/STF",
    badge: "Tributário",
    tagColor: "text-purple-700 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    id: "franquias",
    title: "Direito de Franquias",
    category: "Franchising & Expansão",
    icon: Building2,
    description: "Análise de Circular de Oferta (COF), contratos de franquia e disputas entre franqueador e franqueado.",
    stat: "Lei 13.966",
    badge: "Franquias",
    tagColor: "text-orange-700 dark:text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
  {
    id: "contratos",
    title: "Contratos & Negócios",
    category: "Direito Contratual",
    icon: FileCheck2,
    description: "Elaboração e revisão de minutas, cláusulas de risco, garantias reais e due diligence.",
    stat: "Due Diligence",
    badge: "Contratos",
    tagColor: "text-indigo-700 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    id: "recursos",
    title: "Recursos aos Superiores",
    category: "STJ & STF",
    icon: GitPullRequest,
    description: "Prequestionamento, recursos especiais e extraordinários, agravos e teses repetitivas.",
    stat: "Súmulas 7 e 282",
    badge: "Recursos Especiais",
    tagColor: "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "bancario",
    title: "Direito Bancário",
    category: "Operações Financeiras",
    icon: CreditCard,
    description: "Revisão de contratos de financiamento, cédulas de crédito bancário e teses de juros remuneratórios.",
    stat: "Teses STJ",
    badge: "Bancário",
    tagColor: "text-sky-700 dark:text-sky-400 bg-sky-500/10 border-sky-500/20",
  },
];

/**
 * RoundCarousel3D (Inspirado em OriginKit Round Carousel / 3D Cylinder Gallery)
 * Cilindro tridimensional giratório em torno do eixo Y com rotação automática contínua,
 * física de arrasto inercial e suporte às 11 áreas reais do Dendrix.
 */
export function RoundCarousel3D() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const startXRef = useRef(0);
  const startRotationRef = useRef(0);

  const total = SPECIALTIES.length;
  const anglePerItem = 360 / total;

  // Raio adaptativo
  const [radius, setRadius] = useState(450);

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 640) {
        setRadius(260);
      } else if (window.innerWidth < 1024) {
        setRadius(360);
      } else {
        setRadius(460);
      }
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Rotação automática suave contínua
  useEffect(() => {
    if (!isAutoPlay || isHovered || isDragging) return;

    let animationFrameId: number;
    const speed = 0.12; // Velocidade suave cinematográfica

    const spin = () => {
      setRotation((prev) => prev - speed);
      animationFrameId = requestAnimationFrame(spin);
    };

    animationFrameId = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoPlay, isHovered, isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    startRotationRef.current = rotation;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    setRotation(startRotationRef.current + deltaX * 0.35);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const mobileScrollRef = useRef<HTMLDivElement | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  const rotatePrev = () => {
    setRotation((prev) => prev + anglePerItem);
    if (mobileScrollRef.current) {
      const target = Math.max(0, activeMobileIndex - 1);
      const cardWidth = 276;
      mobileScrollRef.current.scrollTo({ left: target * cardWidth, behavior: "smooth" });
      setActiveMobileIndex(target);
    }
  };

  const rotateNext = () => {
    setRotation((prev) => prev - anglePerItem);
    if (mobileScrollRef.current) {
      const target = Math.min(SPECIALTIES.length - 1, activeMobileIndex + 1);
      const cardWidth = 276;
      mobileScrollRef.current.scrollTo({ left: target * cardWidth, behavior: "smooth" });
      setActiveMobileIndex(target);
    }
  };

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const cardWidth = 276;
    const index = Math.round(scrollLeft / cardWidth);
    if (index !== activeMobileIndex && index >= 0 && index < SPECIALTIES.length) {
      setActiveMobileIndex(index);
    }
  };

  return (
    <div className="w-full py-8 select-none">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 px-4 sm:px-0 gap-4">
        <div>
          <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            Visão de Áreas Especializadas
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            As 11 Áreas de Atuação do Dendrix no Seu Escritório
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
            Explore como o Dendrix apoia o raciocínio, teses e a gestão técnica de cada área da sua banca jurídica.
          </p>
        </div>

        {/* Controles de Rotação e Autoplay */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="hidden md:flex h-10 px-3 rounded-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#0B131C] text-slate-800 dark:text-white items-center gap-1.5 text-xs font-mono hover:bg-slate-100 dark:hover:bg-[#111C2A] transition-colors shadow-xs"
            aria-label={isAutoPlay ? "Pausar rotação automática" : "Ativar rotação automática"}
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Play className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />}
            <span>{isAutoPlay ? "Pausar" : "Girar"}</span>
          </button>
          <button
            type="button"
            onClick={rotatePrev}
            className="w-10 h-10 rounded-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#0B131C] text-slate-800 dark:text-white flex items-center justify-center hover:bg-slate-100 dark:hover:bg-[#111C2A] hover:border-emerald-500/30 transition-colors shadow-xs"
            aria-label="Girar anterior"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={rotateNext}
            className="w-10 h-10 rounded-full border border-slate-300 dark:border-white/10 bg-white dark:bg-[#0B131C] text-slate-800 dark:text-white flex items-center justify-center hover:bg-slate-100 dark:hover:bg-[#111C2A] hover:border-emerald-500/30 transition-colors shadow-xs"
            aria-label="Girar próximo"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 1. VISUALIZAÇÃO DESKTOP: Palco 3D do Cilindro Giratório (Apenas md e acima) */}
      <div
        className="hidden md:flex relative h-[440px] sm:h-[480px] w-full items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ perspective: 1200 }}
      >
        <div
          className="relative w-0 h-0 transition-transform duration-150 ease-out"
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
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[260px] h-[330px] rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#081018]/95 backdrop-blur-md shadow-xl dark:shadow-2xl flex flex-col justify-between"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Cabeçalho do Card da Especialidade */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full border ${spec.tagColor}`}
                    >
                      {spec.badge}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white/80">
                      <Icon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    </div>
                  </div>

                  <span className="text-[10.5px] font-mono text-slate-500 dark:text-slate-400 block mb-1">
                    {spec.category}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                    {spec.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed line-clamp-3">
                    {spec.description}
                  </p>
                </div>

                {/* Rodapé com Métrica e Indicador */}
                <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans">Destaque</span>
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      {spec.stat}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.04] px-2 py-1 rounded">
                    Módulo Ativo
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. VISUALIZAÇÃO MOBILE: Slider Horizontal de Toque Responsivo (Apenas telas < md) */}
      <div className="block md:hidden w-full">
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex gap-3.5 overflow-x-auto snap-x snap-mandatory px-4 pb-4 scrollbar-none"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {SPECIALTIES.map((spec) => {
            const Icon = spec.icon;

            return (
              <div
                key={spec.id}
                className="snap-center shrink-0 w-[82vw] max-w-[280px] h-[310px] rounded-2xl p-5 border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#081018]/95 backdrop-blur-md shadow-lg flex flex-col justify-between"
              >
                {/* Cabeçalho do Card */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`font-mono text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${spec.tagColor}`}
                    >
                      {spec.badge}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white/80">
                      <Icon className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1">
                    {spec.category}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                    {spec.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                    {spec.description}
                  </p>
                </div>

                {/* Rodapé com Métrica e Status */}
                <div className="pt-3 border-t border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-sans">Destaque</span>
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      {spec.stat}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
                    Módulo Ativo
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicador de Paginação por Pontos no Mobile */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {SPECIALTIES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                if (mobileScrollRef.current) {
                  mobileScrollRef.current.scrollTo({ left: idx * 276, behavior: "smooth" });
                  setActiveMobileIndex(idx);
                }
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeMobileIndex
                  ? "w-6 bg-emerald-500 dark:bg-emerald-400"
                  : "w-1.5 bg-slate-300 dark:bg-white/20"
              }`}
              aria-label={`Ir para especialidade ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
